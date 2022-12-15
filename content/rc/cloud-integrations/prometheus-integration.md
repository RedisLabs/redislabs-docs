---
Title: Prometheus integration with Redis Cloud
linkTitle: Prometheus integration
description: To collect and display metrics data from your databases, you can connect your Prometheus or Grafana server to your Redis Cloud databases.
weight: $weight
alwaysopen: false
categories: ["RC"]
---

To collect and display metrics data from your databases, you can connect your Prometheus or Grafana server to your Redis Cloud subscription.

- [Prometheus](https://prometheus.io/) is an open-source systems monitoring and alerting toolkit that can scrape metrics from different sources.
- [Grafana](https://grafana.com/) is an open-source, feature-rich metrics dashboard and graph editor that can process Prometheus data.

For more information on how Prometheus communicates with Redis Enterprise Software clusters, see [Prometheus integration with Redis Enterprise Software]({{< relref "/rs/clusters/monitoring/prometheus-integration" >}}).

{{< note >}}

You must [enable VPC peering]({{< relref "/rc/security/vpc-peering" >}}) for your subscription to connect Prometheus and Grafana to your Redis Cloud databases. VPC peering is available only with Flexible or Annual subscriptions.  Prometheus and Grafana cannot connect to databases on Fixed or Free subscriptions.

{{< /note >}}

## Quick start

To get started with custom monitoring with Prometheus on Docker:

1. To connect Prometheus and Grafana to your Redis Cloud databases, they must be running on an machine that:
    - Is running on the same cloud provider as your Redis Cloud subscription
    - Is located in the same region as your Redis Cloud subscription
    - Is connected to the VPC subnet that is peered with your Redis Cloud subscription
    - Allows outbound connections to port 8070, so that Prometheus can scrape the Redis Cloud server for data
    - Allows inbound connections to port 9090 for Prometheus and 3000 for Grafana

    Create a directory on this machine called `prometheus`.

1. Within that directory, create a file called `prometheus.yml`.

1. Add the following contents to `prometheus.yml`. Replace `<instance_ip>` with the IP address of the machine and `<cluster_name>` with the FQDN portion of your database endpoint.

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
    1. In your browser, sign in to Prometheus at http://<instance_ip>:9090 to make sure the server is running.
    1. Select **Status** and then **Targets** to check that Prometheus is collecting data from the Redis Enterprise cluster.

        {{<image filename="images/rs/prometheus-target.png" alt="The Redis Enterprise target showing that Prometheus is connected to the Redis Enterprise Cluster.">}}{{< /image >}}

        If Prometheus is connected to the cluster, you can type **node_up** in the Expression field on the Prometheus home page to see the cluster metrics.

1. Configure the Grafana datasource: 
    1. Sign in to Grafana. If you installed Grafana with Docker, go to http://<instance_ip>:3000 and sign in with:

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