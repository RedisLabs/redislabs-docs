---
Title: Monitoring guide
linkTitle: Monitoring
description: Monitor RDI Engine and data processing jobs
weight: 70
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

RDI Engine accumulates operating statistics that you can: 

* Observe and analyze to discover various types of problems.
* Use for optimization purposes.

## Console metrics

Some basic RDI operating metrics can be displayed using the [`redis-di status`]({{<relref "/rdi/reference/cli/redis-di-status">}}) command. The command provides information about the current RDI Engine status, target database configuration and processing statistics broken down by stream. This tool is intended to be used by an Operator to get the current snapshot of the system.

## Prometheus integration

RDI allows exporting its metrics to [Prometheus](https://prometheus.io/) and visualizing them in [Grafana](https://grafana.com/). Currently, RDI relies on the external [OSS Redis Exporter](https://github.com/oliver006/redis_exporter) that connects to RDI database to source the metrics and serve them for Prometheus job scraping. The diagram below describes this flow and components involved.

![Metrics architecture](/images/rdi/monitoring-architecture.png)

> Note: The host names and ports above are examples only and can be changed as needed.

## Install and configure the Exporter

OSS Metrics Exporter is available as a [pre-built docker container](https://hub.docker.com/r/oliver006/redis_exporter) so that you integrate it into container-based or Kubernetes environments. Alternatively, you can be [build and install](https://hub.docker.com/r/oliver006/redis_exporter) it as a binary to any compute node that has access to an RDI database that needs to be monitored.

To connect OSS Metrics Exporter to the RDI database, provide the following information by using the command-line options or environment variables:

| Variable Name         | Description                                                                                      | Example                  |
| --------------------- | ------------------------------------------------------------------------------------------------ | ------------------------ |
| REDIS_ADDR            | RDI database host/port                                                                           | redis://localhost:12001  |
| REDIS_USER            | RDI database user (optional, if `default` is used)                                               | RedisUser                |
| REDIS_PASSWORD        | RDI database password                                                                            | Redis123                 |
| REDIS_EXPORTER_SCRIPT | Lua script that triggers the Metrics Collector [(see below)](#lua-script-for-metrics-collection) | /scripts/rdi_metrics.lua |

### Lua script for metrics collection

Create the following [Lua script](https://redis.io/docs/manual/programmability/eval-intro/) and make it available for the OSS Metrics Exporter by using the `REDIS_EXPORTER_SCRIPT` environment variable:

```lua
return (redis.call('RG.TRIGGER', 'GetMetrics', '*'))[1]
```

### Test OSS Metrics Exporter

Start the OSS Metrics Exporter and navigate to `http://localhost:9121/metrics` to see the exported metrics. You should be able to see the following metric:

```
redis_script_values{key="rdi_engine_status{status=RUNNING}"} 1
```

> Note: The actual value of the metric above can be 0, if you haven't started RDI Engine yet. You must have the RDI database created and configured before observing any metrics. If you are not seeing it or getting an error value instead, this indicates that either the OSS Metrics Exporter or the RDI database is not properly configured.

## Configure Prometheus

Next, configure the Prometheus scraper. Edit the `prometheus.yml` file to add the following scraper config:

```yaml
scrape_configs:
  # scrape OSS Metrics Exporter
  - job_name: redis-exporter
    static_configs:
      - targets: ["redis-exporter:9121"]
    metric_relabel_configs:
      - source_labels: [key]
        regex: ".+operation=([^,}]+).+"
        target_label: "operation"
        replacement: "${1}"
      - source_labels: [key]
        regex: ".+data_source=([^,]+).+"
        target_label: "data_source"
        replacement: "${1}"
      - source_labels: [key]
        regex: ".+status=([^,]+).+"
        target_label: "status"
        replacement: "${1}"
      - source_labels: [key]
        regex: "([^{]+){.+"
        target_label: "metric_name"
        replacement: "${1}"
      - source_labels: [__name__, metric_name]
        regex: "redis_script_values;(.*)"
        target_label: __name__
        replacement: "${1}"
      - action: labeldrop
        regex: "metric_name|key"
```

> Note: Make sure the `targets` value above points to the host and port you configured to run the OSS Metrics Exporter.

### Test Prometheus scraper

After the scraper config is added to the Prometheus configuration, you should now be able to navigate to `http://<HOSTNAME>:9090/graph` (replace `<HOSTNAME>` with a valid Prometheus hostname or IP address). 
Explore RDI metrics using the [expression browser](https://prometheus.io/docs/visualization/browser/). 

In the expression box, type in a metric name (for example, `rdi_engine_status`) and select `Enter` or the `Execute` button to see the following result:

```
rdi_engine_status{instance="redis-exporter:9121", job="redis-exporter", status="RUNNING"} 1
```

> Note: You may see more than just one RDI metric, if RDI Engine has already processed any data. If you do not see any metrics please check your scraper job configuration in Prometheus.

## Use Grafana to analyze metrics

Optionally, you may deploy the sample Grafana dashboard to monitor the status of RDI Engine and its individual jobs. Follow these steps to import the dashboard:

1. Download the **dashboard file** to your local machine.

1. Log into Grafana and navigate to the list of dashboards, then choose **New -> Import**:

![New dashboard creation](/images/rdi/monitoring-grafana-new-dash.png.png)

1. On the next screen, select **Upload JSON file** and upload the file you downloaded in step 1. Make sure you select the data source that is connected to the OSS Metrics Exporter:

![Data source connection](/images/rdi/monitoring-grafana-dash-configure.png)

1. Select **Import** and make sure you choose the jobs to monitor in a drop-down list (this will be empty if you don't have any jobs running yet):

![Dashboard running](/images/rdi/monitoring-grafana-dash-running.png)

## RDI metrics

This list shows exported RDI metrics along with their descriptions:

| Metric Name                 | Labels                                                                                                     | Values               | Description                                                                                                                                                                                                        |
| --------------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| rdi_engine_status           | {status=RUNNING \| STOPPED}                                                                                | 0, 1                 | Status of RDI Engine. 0 - RDI Engine is stopped, 1 - RDI Engine is running.                                                                                                                                        |
| rdi_incoming_entries        | {data_source=`<stream name>`, operation=pending \| inserted \| updated \| deleted \| filtered \| rejected} | `<count of records>` | Counters, indicating the number of operations performed for each stream.                                                                                                                                           |
| rdi_stream_event_latency_ms | {data_source=`<stream name>`}                                                                              | 0 - &infin;          | Latency calculated for each stream. Indicates the time in milliseconds the first available record has spent in the stream waiting to be processed by RDI Engine. If no records pending it will always return zero. |
