---
Title: Prometheus integration with Redis Enterprise Software
linkTitle: Prometheus integration
description: To collect and display metrics data from your databases and other cluster components, you can connect your Prometheus or Grafana server to your Redis Enterprise cluster.
weight: 30
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/administering/monitoring-metrics/prometheus-integration/,
    /rs/administering/monitoring-metrics/prometheus-integration.md,
    /rs/monitoring-metrics/prometheus-integration.md,
    /rs/monitoring-metrics/prometheus-integration/,
]
---
To collect and display metrics data from your databases and other cluster components,
you can connect your Prometheus or Grafana server to your Redis Enterprise Software cluster.
Metrics are exposed at the node, database, shard and proxy levels.

- [Prometheus](https://prometheus.io/) is an open-source systems monitoring and alerting toolkit that can scrape metrics from different sources.
- [Grafana](https://grafana.com/) is an open-source, feature-rich metrics dashboard and graph editor that can process Prometheus data.

You can use Prometheus and Grafana to:
- Collect and display data metrics not available in the [admin console]({{< relref "/rs/clusters/monitoring/console-metrics-definitions.md" >}})

- Set up automatic alerts for node or cluster events

- Display Redis Enterprise Software metric data alongside data from other applications

{{<image filename="images/rs/grafana-prometheus.png" alt="Graphic showing how Prometheus and Grafana collect and display data from a Redis Enterprise Cluster. Prometheus scrapes metrics from the Redis Enterprise cluster and Grafana queries those metrics for visualization.">}}{{< /image >}}

In each cluster, the metrics_exporter component listens on port 8070 and serves as a Prometheus scraping endpoint for obtaining metrics.

## Quick start

To get started with custom monitoring:

1. Create a directory called 'prometheus' on your local machine.

1. Within that directory, create a file called `prometheus.yml`.
1. Add the following contents to the yml file and replace `<cluster_name>` with your Redis cluster's FQDN:

    {{< note >}}

This is for development testing only (running in Docker).

    {{< /note >}}

    ```yml
    global:
      scrape_interval: 15s
      evaluation_interval: 15s

    # Attach these labels to any time series or alerts when communicating with
    # external systems (federation, remote storage, Alertmanager).
      external_labels:
        monitor: "prometheus-stack-monitor"

    # Load and evaluate rules in this file every 'evaluation_interval' seconds.
    #rule_files:
    # - "first.rules"
    # - "second.rules"

    scrape_configs:
    # scrape Prometheus itself
      - job_name: prometheus
        scrape_interval: 10s
        scrape_timeout: 5s
        static_configs:
          - targets: ["localhost:9090"]

    # scrape Redis Enterprise
      - job_name: redis-enterprise
        scrape_interval: 30s
        scrape_timeout: 30s
        metrics_path: /
        scheme: https
        tls_config:
          insecure_skip_verify: true
        static_configs:
          - targets: ["<cluster_name>:8070"]
    ```

1. Set up your Prometheus and Grafana servers.
    To set up Prometheus and Grafana on Docker containers:
    1. Create a _docker-compose.yml_ file:

        ```yml
        version: '3'
        services:
            prometheus-server:
                image: prom/prometheus
                ports:
                    - 9090:9090
                volumes:
                    - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml

            grafana-ui:
                image: grafana/grafana
                ports:
                    - 3000:3000
                environment:
                    - GF_SECURITY_ADMIN_PASSWORD=secret
                links:
                    - prometheus-server:prometheus
        ```

    1. To start the containers, run:

    ```sh
    $ docker compose up -d
    ```

    1. To check that all the containers are up, run: `docker ps`
    1. In your browser, sign in to Prometheus at http://localhost:9090 to make sure the server is running.
    1. Select **Status** and then **Targets** to check that Prometheus is collecting data from the Redis Enterprise cluster.

        {{<image filename="images/rs/prometheus-target.png" alt="The Redis Enterprise target showing that Prometheus is connected to the Redis Enterprise Cluster.">}}{{< /image >}}

        If Prometheus is connected to the cluster, you can type **node_up** in the Expression field on the Prometheus home page to see the cluster metrics.

1. Configure the Grafana datasource:
    1. Sign in to Grafana. If you installed Grafana locally, go to http://localhost:3000 and sign in with:

        - Username: admin
        - Password: secret

    1. In the Grafana configuration menu, select **Data Sources**.

    1. Select **Add data source**.

    1. Select **Prometheus** from the list of data source types.

    {{<image filename="images/rs/prometheus-datasource.png" alt="The Prometheus data source in the list of data sources on Grafana.">}}{{< /image >}}

    1. Enter the Prometheus information:

        - Name: `redis-enterprise`
        - URL: `http://<your prometheus address>:9090`
        - Access: `Server`

        {{<image filename="images/rs/prometheus-connection.png" alt="The Prometheus connection form in Grafana.">}}{{< /image >}}

    {{< note >}}

- If the network port is not accessible to the Grafana server, select the **Browser** option from the Access menu.
- In a testing environment, you can select **Skip TLS verification**.

    {{< /note >}}

1. Add dashboards for cluster, node, and database metrics.
    To add preconfigured dashboards:
    1. In the Grafana dashboards menu, select **Manage**.
    1. Click **Import**.
    1. Copy one of the configurations into the **Paste JSON** field.
        {{% expand "database.json" %}}

```json
{{% embed-code "/rs/database.json" %}}
```

        {{% /expand%}}
        {{%expand "node.json" %}}

```json
{{% embed-code "/rs/node.json" %}}
```

        {{% /expand%}}
        {{%expand "cluster.json" %}}

```json
{{% embed-code "/rs/cluster.json" %}}
```

        {{% /expand%}}
    1. In the Import options, select the `redis-enterprise` datasource and click **Import**.

The dashboards that you create from the configurations are sample dashboards.
For more information about configuring dashboards, see the [Grafana documentation](http://docs.grafana.org).
