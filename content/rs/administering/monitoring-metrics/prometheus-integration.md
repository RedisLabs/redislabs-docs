---
Title: Redis Enterprise Software Integration with Prometheus
description: 
weight: $weight
alwaysopen: false
---
Redis Enterprise lets you connect your Prometheus or Grafana server to your Redis Enterprise cluster in order to collect and display metrics data. Metrics are exposed at the node, database, shard and proxy levels.

*   Prometheus ([https://prometheus.io/](https://prometheus.io/)) is an open-source systems monitoring and alerting toolkit that can scrape metrics from different sources.
*   Grafana ([https://grafana.com/](https://grafana.com/)) is an open-source, feature-rich metrics dashboard and graph editor that can process Prometheus data.

![grafana-prometheus](/images/rs/grafana-prometheus.png)

In each cluster, the metrics_exporter component listens on port 8070 and serves as a prometheus scraping endpoint that send metrics out.

## Quick Start

To get started with custom monitoring:

1. If you don't already have Prometheus and Grafana installed, setup the Prometheus and Grafana servers:
    1. You can use this _docker-compose.yml_ file to define the containers:

        ```
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
    1. To start the containers, run: `docker-compose up -d`
    1. To check that all the containers are up, run: `docker ps`
    1. In your browser, login to Prometheus at `localhost:9090` to make sure the server is running.
    1. Look for the **node_up** metric to make sure that you are receiving statistics from Redis Enterprise.
1. Copy this Prometheus configuration into `./prometheus/prometheus.yml` in your current folder:

	NOTES:
        
    * If you already have prometheus install, just copy the 'redis-enterprise' job into your existing Prometheus configuration.
    * Replace `<your cluster FQDN>` with your actual cluster FQDN.

    ```
    global:
    scrape_interval:     15s
    evaluation_interval: 15s

    # Attach these labels to any time series or alerts when communicating with
    # external systems (federation, remote storage, Alertmanager).
    external_labels:
        monitor: 'prometheus-stack-monitor'

    # Load and evaluate rules in this file every 'evaluation_interval' seconds.
    #rule_files:
    # - "first.rules"
    # - "second.rules"

    scrape_configs:
    # scrape Prometheus itself
    - job_name: 'prometheus'
        scrape_interval: 10s
        scrape_timeout: 5s
        static_configs:
        - targets: ['localhost:9090']

    # scrape Redis Enterprise
    - job_name: 'redis-enterprise'
        scrape_interval: 30s
        scrape_timeout: 30s
        metrics_path: /
        scheme: https
        tls_config:
        insecure_skip_verify: true
        static_configs:
        - targets: ['<your cluster FQDN>:8070']
    ```

1. Configure the Grafana datasource and dashboards:
    1. Login to Grafana. If you installed Grafana locally, go to `localhost:3000` and login with:

    	Username: admin
    	Password: secret

1. Click **Data Sources**.

    ![data-sources](/images/rs/data-sources.png)

1. Add a new data source with:

        Name: `redis-enterprise`
        Type: `Prometheus`
        URL: `http://<your prometheus address>:9090`
        Access: `server`

    NOTES:

    * Make sure it is accessible to the grafana server, otherwise use 'browser' option.
    * In testing environments, you can also select 'Skip TLS verification'.

    ![prometheus-connection](/images/rs/prometheus-connection.png)

1. Add dashboard for cluster, node, and database metrics.

## Metrics

These are the metrics available: