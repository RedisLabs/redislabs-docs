---
Title: Prometheus integration with Redis Cloud
linkTitle: Prometheus integration
description: To collect and display metrics data from your databases, you can connect your Prometheus or Grafana server to your Redis Cloud databases.
weight: $weight
alwaysopen: false
categories: ["RC"]
---

To collect and display metrics data from your databases, you can connect your Prometheus or Grafana server to your Redis Cloud subscription.

- [Prometheus](https://prometheus.io/) is an open source systems monitoring and alerting toolkit that can scrape metrics from different sources.
- [Grafana](https://grafana.com/) is an open source metrics dashboard and graph editor that can process Prometheus data.

Redis Cloud has an Prometheus compatible endpoint available in order to pull metrics. It is only available on the internal network so [VPC peering](({{< relref "/rc/security/vpc-peering" >}})) is required. VPC peering is only available with Flexible or Annual subscriptions. Because VPC peering is not available on Fixed or Free subscriptions, Prometheus and Grafana cannot connect to databases on Fixed or Free subscriptions.

For more information on how Prometheus communicates with Redis Enterprise clusters, see [Prometheus integration with Redis Enterprise Software]({{< relref "/rs/clusters/monitoring/prometheus-integration" >}}).

## Quick start

You can quickly set up Prometheus and Grafana for testing using the Prometheus and Grafana Docker images. 

### Prerequisites

1. Create a [Flexible]({{< relref "/rc/subscriptions/create-flexible-subscription" >}}) or Annual subscription with a database. 

1. Set up [VPC peering]({{< relref "/rc/security/vpc-peering" >}}) for your subscription.

1. Create an instance to run Prometheus and Grafana on the same provider as your Redis Cloud subscription (Amazon Web Services or Google Cloud Project). This instance must:
    - Exist in the same region as your Redis Cloud subscription.
    - Connect to the VPC subnet that is peered with your Redis Cloud subscription.
    - Allow outbound connections to port 8070, so that Prometheus can scrape the Redis Cloud server for data.
    - Allow inbound connections to port 9090 for Prometheus and 3000 for Grafana.

### Set up Prometheus

To get started with custom monitoring with Prometheus on Docker:

1. Create a directory on the Prometheus instance called `prometheus` and create a `prometheus.yml` file in that directory.

1. In the [Redis Cloud console](https://app.redislabs.com/), under the [Configuration tab]({{< relref "/rc/databases/view-edit-database#configuration-details-tab" >}}) of your database, copy the Private endpoint to your database.

1. Add the following contents to `prometheus.yml`. Replace `<instance_ip>` with the IP address of the instance. Replace `internal.<cluster_name>` with the Private endpoint to your database and remove the port information.

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
                - targets: ["<instance_ip>:9090"]

        # scrape Redis Cloud
        - job_name: redis-cloud
            scrape_interval: 30s
            scrape_timeout: 30s
            metrics_path: /
            scheme: https
            static_configs:
                - targets: ["internal.<cluster_name>:8070"]
    ```

1. Create a `docker-compose.yml` file with instructions to set up the Prometheus and Grafana Docker images.

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
1. In your browser, sign in to Prometheus at http://<instance_ip>:9090 to make sure the server is running.
1. Select **Status** and then **Targets** to check that Prometheus is collecting data from the Redis Cloud cluster.

    {{<image filename="images/rs/prometheus-target.png" alt="The Redis Enterprise target showing that Prometheus is connected to the Redis Enterprise Cluster.">}}{{< /image >}}

    If Prometheus is connected to the cluster, you can type **node_up** in the Expression field on the Prometheus home page to see the cluster metrics.

See [Prometheus Metrics]({{< relref "/rs/clusters/monitoring/prometheus-metrics-definitions" >}}) for a list of metrics that Prometheus collects from Redis Enterprise clusters.

### Set up Grafana

Once the Prometheus and Grafana Docker containers are running, and Prometheus is connected to your Redis Cloud subscription, you can set up your Grafana dashboards.

1. Sign in to Grafana. If you installed Grafana with Docker, go to http://<instance_ip>:3000 and sign in with:

    - Username: admin
    - Password: secret

1. In the Grafana configuration menu, select **Data Sources**.

1. Select **Add data source**.

1. Select **Prometheus** from the list of data source types.

    {{<image filename="images/rs/prometheus-datasource.png" alt="The Prometheus data source in the list of data sources on Grafana.">}}{{< /image >}}

1. Enter the Prometheus information:

    - Name: `redis-cloud`
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
    1. Select **Import**.
    1. Copy and enter one of the following configuration files into the **Paste JSON** field.
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
    1. In the Import options, select the `redis-cloud` data source and select **Import**.

These examples create sample dashboards. For more information about configuring dashboards, see the [Grafana documentation](https://grafana.com/docs/).