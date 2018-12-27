---
Title: Redis Enterprise Software Integration with Prometheus
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
From Redis Enterprise Software version 5.0.2 and higher, you can connect your Prometheus or Grafana server to your Redis Enterprise cluster in order to collect and display metrics data. Metrics are exposed at the node, database, shard and proxy levels.

-   Prometheus ([https://prometheus.io/](https://prometheus.io/)) is an open-source systems monitoring and alerting toolkit that can scrape metrics from different sources.
-   Grafana ([https://grafana.com/](https://grafana.com/)) is an open-source, feature-rich metrics dashboard and graph editor that can process Prometheus data.

![grafana-prometheus](/images/rs/grafana-prometheus.png?width=500)

In each cluster, the metrics_exporter component listens on port 8070 and serves as a Prometheus scraping endpoint for obtaining metrics.

## Quick Start 

To get started with custom monitoring:

1. Copy this Prometheus configuration into `./prometheus/prometheus.yml` in your current folder:

    - If you already have Prometheus installed, just copy the 'redis-enterprise' job into your existing Prometheus configuration and skip the next step.
    - Replace `<cluster_name>` with your actual cluster FQDN.

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

1. Setup your Prometheus and Grafana servers.
    To setup Prometheus and Grafana on Docker containers:
    1. Create a _docker-compose.yml_ file with this yaml contents:

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
    1. To start the containers, run: `docker-compose up -d`
    1. To check that all the containers are up, run: `docker ps`
    1. In your browser, login to Prometheus at http://localhost:9090 to make sure the server is running.
    1. Enter **node_up** in the Expression field.
        If Prometheus is connected to the Redis Enterprise cluster, the cluster metrics are shown.

1. Configure the Grafana datasource:
    1. Login to Grafana. If you installed Grafana locally, go to http://localhost:3000 and login with:

     - Username: admin
     - Password: secret

    1. In the Grafana configuration menu, select **Data Sources**.

        ![data-sources](/images/rs/data-sources.png?width=300)

    1. Add a new data source with:

        - Name: `redis-enterprise`
        - Type: `Prometheus`
        - URL: `http://<your prometheus address>:9090`
        - Access: `Server`

    NOTES:

    - If the network port is not accessible to the Grafana server, 
    select the 'Browser' option from the Access menu.
    - In a testing environment, you can select 'Skip TLS verification'.

    ![prometheus-connection](/images/rs/prometheus-connection.png?width=500)

1. Add dashboards for cluster, node, and database metrics.
    To add preconfigured dashboards:
    1. In the Grafana dashboards menu, select **Manage**.
    1. Click **Import**.
    1. Copy one of the configurations into the **Paste JSON** field.
        {{%expand "database.json" %}}
    {
        "annotations": {
            "list": [
            {
                "builtIn": 1,
                "datasource": "-- Grafana --",
                "enable": true,
                "hide": true,
                "iconColor": "rgba(0, 211, 255, 1)",
                "name": "Annotations & Alerts",
                "type": "dashboard"
            }
            ]
        },
        "editable": true,
        "gnetId": null,
        "graphTooltip": 1,
        "id": 3,
        "iteration": 1542895933169,
        "links": [
            {
            "icon": "external link",
            "includeVars": true,
            "keepTime": true,
            "targetBlank": true,
            "type": "dashboards"
            }
        ],
        "panels": [
            {
            "collapsed": false,
            "gridPos": {
                "h": 1,
                "w": 24,
                "x": 0,
                "y": 0
            },
            "id": 57,
            "panels": [],
            "repeat": null,
            "title": "Dashboard Row",
            "type": "row"
            },
            {
            "content": "<b style=\"font-size: 20pt\">$status<b>\n<b style=\"font-size: 20pt\">$newStatus<b>",
            "editable": true,
            "error": false,
            "gridPos": {
                "h": 4,
                "w": 4,
                "x": 0,
                "y": 1
            },
            "id": 9,
            "links": [],
            "mode": "html",
            "style": {
                "font-size": "72pt"
            },
            "title": "Status for BDB:$bdb",
            "type": "text"
            },
            {
            "cacheTimeout": null,
            "colorBackground": false,
            "colorValue": false,
            "colors": [
                "rgba(245, 54, 54, 0.9)",
                "rgba(237, 129, 40, 0.89)",
                "rgba(50, 172, 45, 0.97)"
            ],
            "decimals": null,
            "editable": true,
            "error": false,
            "format": "decbytes",
            "gauge": {
                "maxValue": 100,
                "minValue": 0,
                "show": false,
                "thresholdLabels": false,
                "thresholdMarkers": true
            },
            "gridPos": {
                "h": 4,
                "w": 4,
                "x": 4,
                "y": 1
            },
            "id": 4,
            "interval": null,
            "links": [],
            "mappingType": 1,
            "mappingTypes": [
                {
                "name": "value to text",
                "value": 1
                },
                {
                "name": "range to text",
                "value": 2
                }
            ],
            "maxDataPoints": 100,
            "nullPointMode": "connected",
            "nullText": null,
            "postfix": "",
            "postfixFontSize": "50%",
            "prefix": "",
            "prefixFontSize": "50%",
            "rangeMaps": [
                {
                "from": "null",
                "text": "N/A",
                "to": "null"
                }
            ],
            "repeat": null,
            "sparkline": {
                "fillColor": "rgba(31, 118, 189, 0.18)",
                "full": false,
                "lineColor": "rgb(31, 120, 193)",
                "show": true
            },
            "tableColumn": "",
            "targets": [
                {
                "expr": "scalar(bdb_used_memory{bdb=\"$bdb\", cluster=\"$cluster\"})",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "",
                "refId": "A",
                "step": 600
                }
            ],
            "thresholds": "",
            "title": "BDB:$bdb used memory",
            "type": "singlestat",
            "valueFontSize": "80%",
            "valueMaps": [
                {
                "op": "=",
                "text": "N/A",
                "value": "null"
                }
            ],
            "valueName": "current"
            },
            {
            "cacheTimeout": null,
            "colorBackground": false,
            "colorValue": false,
            "colors": [
                "rgba(245, 54, 54, 0.9)",
                "rgba(237, 129, 40, 0.89)",
                "rgba(50, 172, 45, 0.97)"
            ],
            "editable": true,
            "error": false,
            "format": "none",
            "gauge": {
                "maxValue": 100,
                "minValue": 0,
                "show": false,
                "thresholdLabels": false,
                "thresholdMarkers": true
            },
            "gridPos": {
                "h": 4,
                "w": 4,
                "x": 8,
                "y": 1
            },
            "id": 5,
            "interval": null,
            "links": [],
            "mappingType": 1,
            "mappingTypes": [
                {
                "name": "value to text",
                "value": 1
                },
                {
                "name": "range to text",
                "value": 2
                }
            ],
            "maxDataPoints": 100,
            "nullPointMode": "connected",
            "nullText": null,
            "postfix": "",
            "postfixFontSize": "50%",
            "prefix": "",
            "prefixFontSize": "50%",
            "rangeMaps": [
                {
                "from": "null",
                "text": "N/A",
                "to": "null"
                }
            ],
            "sparkline": {
                "fillColor": "rgba(31, 118, 189, 0.18)",
                "full": false,
                "lineColor": "rgb(31, 120, 193)",
                "show": true
            },
            "tableColumn": "",
            "targets": [
                {
                "expr": "scalar(bdb_no_of_keys{bdb=\"$bdb\", cluster=\"$cluster\"})",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "",
                "refId": "A",
                "step": 600
                }
            ],
            "thresholds": "",
            "title": "BDB:$bdb #Keys",
            "type": "singlestat",
            "valueFontSize": "80%",
            "valueMaps": [
                {
                "op": "=",
                "text": "N/A",
                "value": "null"
                }
            ],
            "valueName": "current"
            },
            {
            "cacheTimeout": null,
            "colorBackground": false,
            "colorValue": false,
            "colors": [
                "rgba(245, 54, 54, 0.9)",
                "rgba(237, 129, 40, 0.89)",
                "rgba(50, 172, 45, 0.97)"
            ],
            "editable": true,
            "error": false,
            "format": "none",
            "gauge": {
                "maxValue": 100,
                "minValue": 0,
                "show": false,
                "thresholdLabels": false,
                "thresholdMarkers": true
            },
            "gridPos": {
                "h": 4,
                "w": 4,
                "x": 12,
                "y": 1
            },
            "id": 6,
            "interval": null,
            "links": [],
            "mappingType": 1,
            "mappingTypes": [
                {
                "name": "value to text",
                "value": 1
                },
                {
                "name": "range to text",
                "value": 2
                }
            ],
            "maxDataPoints": 100,
            "nullPointMode": "connected",
            "nullText": null,
            "postfix": "",
            "postfixFontSize": "50%",
            "prefix": "",
            "prefixFontSize": "50%",
            "rangeMaps": [
                {
                "from": "null",
                "text": "N/A",
                "to": "null"
                }
            ],
            "sparkline": {
                "fillColor": "rgba(31, 118, 189, 0.18)",
                "full": false,
                "lineColor": "rgb(31, 120, 193)",
                "show": true
            },
            "tableColumn": "",
            "targets": [
                {
                "expr": "scalar(bdb_conns{bdb=\"$bdb\", cluster=\"$cluster\"})",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "",
                "refId": "A",
                "step": 600
                }
            ],
            "thresholds": "",
            "title": "BDB:$bdb #Connections",
            "type": "singlestat",
            "valueFontSize": "80%",
            "valueMaps": [
                {
                "op": "=",
                "text": "N/A",
                "value": "null"
                }
            ],
            "valueName": "current"
            },
            {
            "cacheTimeout": null,
            "colorBackground": false,
            "colorValue": false,
            "colors": [
                "rgba(245, 54, 54, 0.9)",
                "rgba(237, 129, 40, 0.89)",
                "rgba(50, 172, 45, 0.97)"
            ],
            "editable": true,
            "error": false,
            "format": "none",
            "gauge": {
                "maxValue": 100,
                "minValue": 0,
                "show": false,
                "thresholdLabels": false,
                "thresholdMarkers": true
            },
            "gridPos": {
                "h": 4,
                "w": 4,
                "x": 16,
                "y": 1
            },
            "id": 7,
            "interval": null,
            "links": [],
            "mappingType": 1,
            "mappingTypes": [
                {
                "name": "value to text",
                "value": 1
                },
                {
                "name": "range to text",
                "value": 2
                }
            ],
            "maxDataPoints": 100,
            "nullPointMode": "connected",
            "nullText": null,
            "postfix": "",
            "postfixFontSize": "50%",
            "prefix": "",
            "prefixFontSize": "50%",
            "rangeMaps": [
                {
                "from": "null",
                "text": "N/A",
                "to": "null"
                }
            ],
            "sparkline": {
                "fillColor": "rgba(31, 118, 189, 0.18)",
                "full": false,
                "lineColor": "rgb(31, 120, 193)",
                "show": false
            },
            "tableColumn": "",
            "targets": [
                {
                "expr": "count(listener_total_req{bdb=\"$bdb\", cluster=\"$cluster\"})",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "",
                "refId": "A",
                "step": 600
                }
            ],
            "thresholds": "",
            "title": "BDB:$bdb #Listeners",
            "type": "singlestat",
            "valueFontSize": "80%",
            "valueMaps": [
                {
                "op": "=",
                "text": "N/A",
                "value": "null"
                }
            ],
            "valueName": "current"
            },
            {
            "cacheTimeout": null,
            "colorBackground": false,
            "colorValue": false,
            "colors": [
                "rgba(245, 54, 54, 0.9)",
                "rgba(237, 129, 40, 0.89)",
                "rgba(50, 172, 45, 0.97)"
            ],
            "format": "none",
            "gauge": {
                "maxValue": 100,
                "minValue": 0,
                "show": false,
                "thresholdLabels": false,
                "thresholdMarkers": true
            },
            "gridPos": {
                "h": 4,
                "w": 4,
                "x": 20,
                "y": 1
            },
            "id": 12,
            "interval": null,
            "links": [],
            "mappingType": 1,
            "mappingTypes": [
                {
                "name": "value to text",
                "value": 1
                },
                {
                "name": "range to text",
                "value": 2
                }
            ],
            "maxDataPoints": 100,
            "nullPointMode": "connected",
            "nullText": null,
            "postfix": "",
            "postfixFontSize": "50%",
            "prefix": "",
            "prefixFontSize": "50%",
            "rangeMaps": [
                {
                "from": "null",
                "text": "N/A",
                "to": "null"
                }
            ],
            "sparkline": {
                "fillColor": "rgba(31, 118, 189, 0.18)",
                "full": false,
                "lineColor": "rgb(31, 120, 193)",
                "show": true
            },
            "tableColumn": "",
            "targets": [
                {
                "expr": "count(redis_no_of_keys{cluster=\"$cluster\", bdb=\"$bdb\"}) or count(redis_used_memory{cluster=\"$cluster\", bdb=\"$bdb\"})",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "",
                "refId": "A",
                "step": 600
                }
            ],
            "thresholds": "",
            "title": "BDB:$bdb #Shards",
            "type": "singlestat",
            "valueFontSize": "80%",
            "valueMaps": [
                {
                "op": "=",
                "text": "N/A",
                "value": "null"
                }
            ],
            "valueName": "current"
            },
            {
            "collapsed": false,
            "gridPos": {
                "h": 1,
                "w": 24,
                "x": 0,
                "y": 5
            },
            "id": 58,
            "panels": [],
            "repeat": null,
            "title": "Dashboard Row",
            "type": "row"
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "fill": 1,
            "gridPos": {
                "h": 7,
                "w": 8,
                "x": 0,
                "y": 6
            },
            "id": 1,
            "legend": {
                "alignAsTable": true,
                "avg": true,
                "current": true,
                "max": true,
                "min": true,
                "show": true,
                "sort": "current",
                "sortDesc": true,
                "total": false,
                "values": true
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "connected",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [
                {
                "alias": "bdb_avg_latency_max",
                "fill": 0
                }
            ],
            "spaceLength": 10,
            "stack": false,
            "steppedLine": false,
            "targets": [
                {
                "expr": "bdb_avg_latency{bdb=\"$bdb\", cluster=\"$cluster\"}",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "bdb_avg_latency",
                "metric": "",
                "refId": "A",
                "step": 240
                },
                {
                "expr": "bdb_avg_write_latency{bdb=\"$bdb\", cluster=\"$cluster\"}",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "bdb_avg_write_latency",
                "metric": "",
                "refId": "B",
                "step": 240
                },
                {
                "expr": "bdb_avg_read_latency{bdb=\"$bdb\", cluster=\"$cluster\"}",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "bdb_avg_read_latency",
                "metric": "",
                "refId": "C",
                "step": 240
                },
                {
                "expr": "bdb_avg_other_latency{bdb=\"$bdb\", cluster=\"$cluster\"}",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "bdb_avg_other_latency",
                "metric": "",
                "refId": "D",
                "step": 240
                },
                {
                "expr": "bdb_avg_latency_max{bdb=\"$bdb\", cluster=\"$cluster\"}",
                "format": "time_series",
                "interval": "",
                "intervalFactor": 2,
                "legendFormat": "bdb_avg_latency (max)",
                "refId": "E",
                "step": 240
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "Avg latency for BDB:$bdb",
            "tooltip": {
                "msResolution": false,
                "shared": true,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "s",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "fill": 1,
            "gridPos": {
                "h": 7,
                "w": 8,
                "x": 8,
                "y": 6
            },
            "id": 55,
            "legend": {
                "alignAsTable": true,
                "avg": true,
                "current": true,
                "max": true,
                "min": true,
                "show": true,
                "sort": "current",
                "sortDesc": true,
                "total": false,
                "values": true
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "connected",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [],
            "spaceLength": 10,
            "stack": false,
            "steppedLine": false,
            "targets": [
                {
                "expr": "listener_acc_latency{bdb=\"$bdb\", cluster=\"$cluster\"}",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "listener {{proxy}}  node {{node}}",
                "metric": "",
                "refId": "A",
                "step": 240
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "Avg listener latency for BDB:$bdb",
            "tooltip": {
                "msResolution": false,
                "shared": true,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "µs",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "fill": 1,
            "gridPos": {
                "h": 7,
                "w": 8,
                "x": 16,
                "y": 6
            },
            "id": 44,
            "legend": {
                "alignAsTable": false,
                "avg": false,
                "current": false,
                "max": false,
                "min": false,
                "show": false,
                "total": false,
                "values": false
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "connected",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [],
            "spaceLength": 10,
            "stack": false,
            "steppedLine": false,
            "targets": [
                {
                "expr": "bdb_used_memory{bdb=\"$bdb\", cluster=\"$cluster\"}",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "",
                "metric": "",
                "refId": "A",
                "step": 240
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "Used Memory for BDB:$bdb",
            "tooltip": {
                "msResolution": false,
                "shared": true,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "decbytes",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "collapsed": false,
            "gridPos": {
                "h": 1,
                "w": 24,
                "x": 0,
                "y": 13
            },
            "id": 59,
            "panels": [],
            "repeat": null,
            "title": "Dashboard Row",
            "type": "row"
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "fill": 1,
            "gridPos": {
                "h": 8,
                "w": 12,
                "x": 0,
                "y": 14
            },
            "id": 10,
            "legend": {
                "alignAsTable": true,
                "avg": true,
                "current": true,
                "max": true,
                "min": true,
                "show": true,
                "sort": "current",
                "sortDesc": true,
                "total": false,
                "values": true
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "connected",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [],
            "spaceLength": 10,
            "stack": false,
            "steppedLine": false,
            "targets": [
                {
                "expr": "bdb_conns{bdb=\"$bdb\", cluster=\"$cluster\"}",
                "format": "time_series",
                "interval": "",
                "intervalFactor": 2,
                "legendFormat": "Total",
                "metric": "",
                "refId": "A",
                "step": 120
                },
                {
                "expr": "listener_conns{bdb=\"$bdb\", cluster=\"$cluster\"}",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "listener: {{listener}} node: {{node}}",
                "metric": "",
                "refId": "B",
                "step": 120
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "BDB:$bdb Connections",
            "tooltip": {
                "msResolution": false,
                "shared": true,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "none",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": "0",
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "fill": 1,
            "gridPos": {
                "h": 8,
                "w": 12,
                "x": 12,
                "y": 14
            },
            "id": 13,
            "legend": {
                "alignAsTable": true,
                "avg": true,
                "current": true,
                "max": true,
                "min": true,
                "show": true,
                "sort": "current",
                "sortDesc": true,
                "total": false,
                "values": true
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "null as zero",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [],
            "spaceLength": 10,
            "stack": false,
            "steppedLine": false,
            "targets": [
                {
                "expr": "(delta(redis_process_cpu_system_seconds_total{bdb=\"$bdb\",cluster=\"$cluster\"}[60s]) + delta(redis_process_cpu_user_seconds_total{bdb=\"$bdb\",cluster=\"$cluster\"}[60s]))/60*100 or redis_cpu_percent{bdb=\"$bdb\", cluster=\"$cluster\"}",
                "format": "time_series",
                "interval": "",
                "intervalFactor": 2,
                "legendFormat": "shard: {{redis}} role: {{role}} node:{{node}}",
                "refId": "B",
                "step": 120
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "CPU usage by shards for bdb:$bdb",
            "tooltip": {
                "shared": true,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "percent",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": "0",
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "collapsed": false,
            "gridPos": {
                "h": 1,
                "w": 24,
                "x": 0,
                "y": 22
            },
            "id": 60,
            "panels": [],
            "repeat": null,
            "title": "Dashboard Row",
            "type": "row"
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "fill": 1,
            "gridPos": {
                "h": 5,
                "w": 6,
                "x": 0,
                "y": 23
            },
            "id": 17,
            "legend": {
                "alignAsTable": true,
                "avg": false,
                "current": true,
                "hideEmpty": false,
                "hideZero": false,
                "max": true,
                "min": true,
                "rightSide": false,
                "show": true,
                "sort": "current",
                "sortDesc": true,
                "total": false,
                "values": true
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "connected",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [],
            "spaceLength": 10,
            "stack": false,
            "steppedLine": false,
            "targets": [
                {
                "expr": "redis_no_of_keys{bdb=\"$bdb\", cluster=\"$cluster\"} or redis_db0_keys{bdb=\"$bdb\", cluster=\"$cluster\"}",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "redis #{{redis}}",
                "metric": "",
                "refId": "A",
                "step": 240
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "# keys/shard",
            "tooltip": {
                "msResolution": false,
                "shared": true,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "fill": 1,
            "gridPos": {
                "h": 5,
                "w": 6,
                "x": 6,
                "y": 23
            },
            "id": 11,
            "legend": {
                "alignAsTable": false,
                "avg": true,
                "current": true,
                "hideEmpty": false,
                "hideZero": false,
                "max": true,
                "min": true,
                "show": true,
                "total": false,
                "values": true
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "connected",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [],
            "spaceLength": 10,
            "stack": false,
            "steppedLine": false,
            "targets": [
                {
                "expr": "bdb_no_of_keys{bdb=\"$bdb\", cluster=\"$cluster\"}",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "num of keys",
                "metric": "",
                "refId": "A",
                "step": 240
                },
                {
                "expr": "sum(redis_db0_expires{bdb=\"$bdb\", cluster=\"$cluster\"})",
                "format": "time_series",
                "interval": "",
                "intervalFactor": 2,
                "legendFormat": "num of volatile keys",
                "refId": "B",
                "step": 240
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "#Keys for BDB",
            "tooltip": {
                "msResolution": false,
                "shared": true,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": false
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "fill": 1,
            "gridPos": {
                "h": 5,
                "w": 6,
                "x": 12,
                "y": 23
            },
            "id": 20,
            "legend": {
                "alignAsTable": true,
                "avg": false,
                "current": true,
                "hideEmpty": false,
                "hideZero": false,
                "max": false,
                "min": false,
                "show": true,
                "total": false,
                "values": true
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "connected",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [],
            "spaceLength": 10,
            "stack": false,
            "steppedLine": false,
            "targets": [
                {
                "expr": "bdb_evicted_objects{bdb=\"$bdb\", cluster=\"$cluster\"}",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "BDB:$bdb",
                "metric": "",
                "refId": "A",
                "step": 240
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "Evicted objects for BDB:$bdb",
            "tooltip": {
                "msResolution": false,
                "shared": true,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": false
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "fill": 1,
            "gridPos": {
                "h": 5,
                "w": 6,
                "x": 18,
                "y": 23
            },
            "id": 21,
            "legend": {
                "alignAsTable": true,
                "avg": false,
                "current": true,
                "hideEmpty": false,
                "hideZero": false,
                "max": false,
                "min": false,
                "show": false,
                "total": false,
                "values": true
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "connected",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [],
            "spaceLength": 10,
            "stack": false,
            "steppedLine": false,
            "targets": [
                {
                "expr": "bdb_expired_objects{bdb=\"$bdb\", cluster=\"$cluster\"}",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "BDB:$bdb",
                "metric": "",
                "refId": "A",
                "step": 240
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "Expired objects for BDB:$bdb",
            "tooltip": {
                "msResolution": false,
                "shared": true,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": false
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "collapsed": false,
            "gridPos": {
                "h": 1,
                "w": 24,
                "x": 0,
                "y": 28
            },
            "id": 61,
            "panels": [],
            "repeat": null,
            "title": "Dashboard Row",
            "type": "row"
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "fill": 1,
            "gridPos": {
                "h": 11,
                "w": 8,
                "x": 0,
                "y": 29
            },
            "id": 14,
            "legend": {
                "alignAsTable": true,
                "avg": true,
                "current": true,
                "max": true,
                "min": true,
                "show": true,
                "sort": "current",
                "sortDesc": true,
                "total": false,
                "values": true
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "null",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [],
            "spaceLength": 10,
            "stack": false,
            "steppedLine": false,
            "targets": [
                {
                "expr": "bdb_total_req{cluster=\"$cluster\",bdb=\"$bdb\"}",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "total requests",
                "refId": "A",
                "step": 240
                },
                {
                "expr": "bdb_other_req{cluster=\"$cluster\",bdb=\"$bdb\"}",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "other requests",
                "refId": "B",
                "step": 240
                },
                {
                "expr": "bdb_read_req{cluster=\"$cluster\",bdb=\"$bdb\"}",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "read requests",
                "refId": "C",
                "step": 240
                },
                {
                "expr": "bdb_write_req{cluster=\"$cluster\",bdb=\"$bdb\"}",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "write requests",
                "refId": "D",
                "step": 240
                },
                {
                "expr": "bdb_total_req_max{cluster=\"$cluster\",bdb=\"$bdb\"}",
                "format": "time_series",
                "interval": "",
                "intervalFactor": 2,
                "legendFormat": "total requests (max)",
                "refId": "E",
                "step": 240
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "Requests[total,read,write,other] for bdb:$bdb",
            "tooltip": {
                "shared": true,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "fill": 1,
            "gridPos": {
                "h": 11,
                "w": 8,
                "x": 8,
                "y": 29
            },
            "id": 16,
            "legend": {
                "alignAsTable": true,
                "avg": true,
                "current": true,
                "max": true,
                "min": true,
                "show": true,
                "sort": "current",
                "sortDesc": true,
                "total": false,
                "values": true
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "null",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [
                {
                "alias": "Egress",
                "yaxis": 2
                }
            ],
            "spaceLength": 10,
            "stack": false,
            "steppedLine": false,
            "targets": [
                {
                "expr": "bdb_egress_bytes{bdb=\"$bdb\",cluster=\"$cluster\"}",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "Egress",
                "refId": "A",
                "step": 240
                },
                {
                "expr": "bdb_ingress_bytes{bdb=\"$bdb\",cluster=\"$cluster\"}",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "Ingress",
                "refId": "B",
                "step": 240
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "BDB:$bdb Ingress/Egress",
            "tooltip": {
                "shared": true,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "Bps",
                "label": "Ingress",
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                },
                {
                "format": "Bps",
                "label": "Egress",
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "fill": 1,
            "gridPos": {
                "h": 11,
                "w": 8,
                "x": 16,
                "y": 29
            },
            "id": 53,
            "legend": {
                "alignAsTable": true,
                "avg": false,
                "current": true,
                "max": true,
                "min": true,
                "rightSide": false,
                "show": true,
                "sort": "current",
                "sortDesc": true,
                "total": false,
                "values": true
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "null",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [],
            "spaceLength": 10,
            "stack": false,
            "steppedLine": false,
            "targets": [
                {
                "expr": "redis_used_memory{bdb=\"$bdb\",cluster=\"$cluster\"}",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "redis:{{redis}}, bdb:{{bdb}},  role:{{role}}",
                "metric": "redis_used_memory",
                "refId": "A",
                "step": 240
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "Sizes of shards for bdb:$bdb",
            "tooltip": {
                "shared": true,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "decbytes",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": false
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "collapsed": false,
            "gridPos": {
                "h": 1,
                "w": 24,
                "x": 0,
                "y": 40
            },
            "id": 62,
            "panels": [],
            "repeat": null,
            "title": "Dashboard Row",
            "type": "row"
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "fill": 1,
            "gridPos": {
                "h": 7,
                "w": 8,
                "x": 0,
                "y": 41
            },
            "id": 48,
            "legend": {
                "avg": false,
                "current": false,
                "max": false,
                "min": false,
                "show": true,
                "total": false,
                "values": false
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "null",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [],
            "spaceLength": 10,
            "stack": false,
            "steppedLine": false,
            "targets": [
                {
                "expr": "delta(redis_aof_rewrites{cluster=\"$cluster\", bdb=\"$bdb\"}[1m])",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "Redis {{redis}} node {{node}}",
                "refId": "A",
                "step": 240
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "Shard AOF Rewrites",
            "tooltip": {
                "shared": true,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "fill": 1,
            "gridPos": {
                "h": 7,
                "w": 8,
                "x": 8,
                "y": 41
            },
            "id": 18,
            "legend": {
                "alignAsTable": true,
                "avg": true,
                "current": true,
                "max": true,
                "min": true,
                "rightSide": false,
                "show": true,
                "total": false,
                "values": true
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "null",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [],
            "spaceLength": 10,
            "stack": true,
            "steppedLine": false,
            "targets": [
                {
                "expr": "bdb_bigstore_io_reads{bdb=\"$bdb\", cluster=\"$cluster\"}",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "Reads",
                "refId": "A",
                "step": 240
                },
                {
                "expr": "bdb_bigstore_io_writes{bdb=\"$bdb\", cluster=\"$cluster\"}",
                "format": "time_series",
                "interval": "",
                "intervalFactor": 2,
                "legendFormat": "Writes",
                "refId": "B",
                "step": 240
                },
                {
                "expr": "bdb_bigstore_io_dels{bdb=\"$bdb\", cluster=\"$cluster\"}",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "Deletes",
                "refId": "C",
                "step": 240
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "IOPS",
            "tooltip": {
                "shared": true,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "fill": 1,
            "gridPos": {
                "h": 7,
                "w": 8,
                "x": 16,
                "y": 41
            },
            "id": 19,
            "legend": {
                "alignAsTable": true,
                "avg": true,
                "current": true,
                "max": true,
                "min": true,
                "rightSide": false,
                "show": true,
                "total": false,
                "values": true
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "null",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [],
            "spaceLength": 10,
            "stack": true,
            "steppedLine": false,
            "targets": [
                {
                "expr": "bdb_bigstore_io_read_bytes{bdb=\"$bdb\", cluster=\"$cluster\"}",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "Reads",
                "refId": "A",
                "step": 240
                },
                {
                "expr": "bdb_bigstore_io_write_bytes{bdb=\"$bdb\", cluster=\"$cluster\"}",
                "format": "time_series",
                "interval": "",
                "intervalFactor": 2,
                "legendFormat": "Writes",
                "refId": "B",
                "step": 240
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "IO Banwidth",
            "tooltip": {
                "shared": true,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "fill": 1,
            "gridPos": {
                "h": 8,
                "w": 8,
                "x": 0,
                "y": 48
            },
            "id": 33,
            "legend": {
                "alignAsTable": false,
                "avg": false,
                "current": false,
                "max": false,
                "min": false,
                "show": true,
                "total": false,
                "values": false
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "null",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [],
            "spaceLength": 10,
            "stack": false,
            "steppedLine": false,
            "targets": [
                {
                "expr": "sum(rate(redis_wait_busy_key{bdb=\"$bdb\",cluster=\"$cluster\"}[1m]))",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "bdb:{{$bdb}}",
                "refId": "A",
                "step": 240
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "BDB sum redis wait busy key",
            "tooltip": {
                "shared": true,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "fill": 1,
            "gridPos": {
                "h": 8,
                "w": 8,
                "x": 8,
                "y": 48
            },
            "id": 43,
            "legend": {
                "alignAsTable": false,
                "avg": false,
                "current": false,
                "max": false,
                "min": false,
                "show": true,
                "total": false,
                "values": false
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "null",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [],
            "spaceLength": 10,
            "stack": false,
            "steppedLine": false,
            "targets": [
                {
                "expr": "bdb_main_thread_cpu_system{bdb=\"$bdb\",cluster=\"$cluster\"} + bdb_main_thread_cpu_user{bdb=\"$bdb\",cluster=\"$cluster\"}",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "main threads",
                "metric": "",
                "refId": "A",
                "step": 120
                },
                {
                "expr": "bdb_shard_cpu_system{bdb=\"$bdb\",cluster=\"$cluster\"} + bdb_shard_cpu_user{bdb=\"$bdb\",cluster=\"$cluster\"}",
                "format": "time_series",
                "hide": false,
                "interval": "",
                "intervalFactor": 2,
                "legendFormat": "all threads",
                "refId": "B",
                "step": 120
                },
                {
                "expr": "bdb_fork_cpu_system{bdb=\"$bdb\",cluster=\"$cluster\"} + bdb_fork_cpu_user{bdb=\"$bdb\",cluster=\"$cluster\"}",
                "format": "time_series",
                "hide": false,
                "interval": "",
                "intervalFactor": 2,
                "legendFormat": "all forks",
                "refId": "C",
                "step": 120
                },
                {
                "expr": "bdb_main_thread_cpu_system_max{bdb=\"$bdb\",cluster=\"$cluster\"} + bdb_main_thread_cpu_user_max{bdb=\"$bdb\",cluster=\"$cluster\"}",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "main threads (max)",
                "refId": "D",
                "step": 120
                },
                {
                "expr": "bdb_shard_cpu_system_max{bdb=\"$bdb\",cluster=\"$cluster\"} + bdb_shard_cpu_user_max{bdb=\"$bdb\",cluster=\"$cluster\"}",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "all threads (max)",
                "refId": "E",
                "step": 120
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "BDB main thread CPU utilization",
            "tooltip": {
                "shared": true,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "percentunit",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": "0",
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "fill": 1,
            "gridPos": {
                "h": 8,
                "w": 8,
                "x": 16,
                "y": 48
            },
            "id": 23,
            "legend": {
                "alignAsTable": true,
                "avg": false,
                "current": true,
                "max": false,
                "min": false,
                "show": true,
                "sort": "current",
                "sortDesc": true,
                "total": false,
                "values": true
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "connected",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [],
            "spaceLength": 10,
            "stack": false,
            "steppedLine": false,
            "targets": [
                {
                "expr": "redis_fragmentation{bdb=\"$bdb\", cluster=\"$cluster\"} or redis_mem_fragmentation_ratio{bdb=\"$bdb\", cluster=\"$cluster\"} ",
                "format": "time_series",
                "interval": "",
                "intervalFactor": 2,
                "legendFormat": "Redis {{redis}} ({{role}})",
                "metric": "",
                "refId": "A",
                "step": 240
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "Shard RSS fragmentation",
            "tooltip": {
                "shared": true,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "percentunit",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": false
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            }
        ],
        "refresh": false,
        "schemaVersion": 16,
        "style": "dark",
        "templating": {
            "list": [
            {
                "allValue": null,
                "hide": 0,
                "includeAll": false,
                "label": null,
                "multi": false,
                "name": "cluster",
                "options": [],
                "query": "label_values(node_up,cluster)",
                "refresh": 1,
                "regex": "",
                "skipUrlSync": false,
                "sort": 1,
                "tagValuesQuery": null,
                "tags": [],
                "tagsQuery": null,
                "type": "query",
                "useTags": false
            },
            {
                "allValue": null,
                "current": {
                "text": "1",
                "value": "1"
                },
                "hide": 0,
                "includeAll": false,
                "label": "BDB Id",
                "multi": false,
                "name": "bdb",
                "options": [],
                "query": "label_values(bdb_conns{cluster=\"$cluster\"}, bdb)",
                "refresh": 1,
                "regex": "",
                "skipUrlSync": false,
                "sort": 1,
                "tagValuesQuery": null,
                "tags": [],
                "tagsQuery": null,
                "type": "query",
                "useTags": false
            },
            {
                "allValue": null,
                "current": {
                "isNone": true,
                "text": "None",
                "value": ""
                },
                "hide": 2,
                "includeAll": false,
                "label": null,
                "multi": false,
                "name": "status",
                "options": [],
                "query": "label_values(bdb_status{bdb=\"$bdb\", cluster=\"$cluster\"}, status)",
                "refresh": 1,
                "regex": "",
                "skipUrlSync": false,
                "sort": 0,
                "tagValuesQuery": null,
                "tags": [],
                "tagsQuery": null,
                "type": "query",
                "useTags": false
            },
            {
                "allValue": null,
                "current": {
                "text": "active",
                "value": "active"
                },
                "hide": 2,
                "includeAll": false,
                "label": null,
                "multi": false,
                "name": "newStatus",
                "options": [],
                "query": "label_values(bdb_up{bdb=\"$bdb\", cluster=\"$cluster\"}, status)",
                "refresh": 1,
                "regex": "",
                "skipUrlSync": false,
                "sort": 0,
                "tagValuesQuery": null,
                "tags": [],
                "tagsQuery": null,
                "type": "query",
                "useTags": false
            }
            ]
        },
        "time": {
            "from": "now-6h",
            "to": "now"
        },
        "timepicker": {
            "refresh_intervals": [
            "5s",
            "10s",
            "30s",
            "1m",
            "5m",
            "15m",
            "30m",
            "1h",
            "2h",
            "1d"
            ],
            "time_options": [
            "5m",
            "15m",
            "1h",
            "6h",
            "12h",
            "24h",
            "2d",
            "7d",
            "30d"
            ]
        },
        "timezone": "utc",
        "title": "BDB Dashboard",
        "version": 1
    }
        {{% /expand%}}
        {{%expand "node.json" %}}
    {
        "annotations": {
            "list": [
            {
                "builtIn": 1,
                "datasource": "-- Grafana --",
                "enable": true,
                "hide": true,
                "iconColor": "rgba(0, 211, 255, 1)",
                "name": "Annotations & Alerts",
                "type": "dashboard"
            }
            ]
        },
        "editable": true,
        "gnetId": null,
        "graphTooltip": 1,
        "id": 6,
        "iteration": 1542896609510,
        "links": [
            {
            "icon": "external link",
            "includeVars": true,
            "keepTime": true,
            "tags": [
                "RLEC"
            ],
            "targetBlank": true,
            "type": "dashboards"
            }
        ],
        "panels": [
            {
            "collapsed": false,
            "gridPos": {
                "h": 1,
                "w": 24,
                "x": 0,
                "y": 0
            },
            "id": 23,
            "panels": [],
            "repeat": null,
            "title": "Dashboard Row",
            "type": "row"
            },
            {
            "cacheTimeout": null,
            "colorBackground": false,
            "colorValue": false,
            "colors": [
                "rgba(245, 54, 54, 0.9)",
                "rgba(237, 129, 40, 0.89)",
                "rgba(50, 172, 45, 0.97)"
            ],
            "decimals": null,
            "format": "short",
            "gauge": {
                "maxValue": 100,
                "minValue": 0,
                "show": false,
                "thresholdLabels": false,
                "thresholdMarkers": true
            },
            "gridPos": {
                "h": 5,
                "w": 4,
                "x": 0,
                "y": 1
            },
            "id": 5,
            "interval": null,
            "links": [],
            "mappingType": 1,
            "mappingTypes": [
                {
                "name": "value to text",
                "value": 1
                },
                {
                "name": "range to text",
                "value": 2
                }
            ],
            "maxDataPoints": 100,
            "nullPointMode": "connected",
            "nullText": null,
            "postfix": "",
            "postfixFontSize": "50%",
            "prefix": "",
            "prefixFontSize": "50%",
            "rangeMaps": [
                {
                "from": "null",
                "text": "N/A",
                "to": "null"
                }
            ],
            "sparkline": {
                "fillColor": "rgba(31, 118, 189, 0.18)",
                "full": false,
                "lineColor": "rgb(31, 120, 193)",
                "show": false
            },
            "tableColumn": "",
            "targets": [
                {
                "expr": "count(count_values(\"bdb\", redis_used_memory{cluster=\"$cluster\", node=\"$node\"}))",
                "format": "time_series",
                "hide": false,
                "intervalFactor": 2,
                "legendFormat": "",
                "metric": "",
                "refId": "A",
                "step": 3600
                }
            ],
            "thresholds": "",
            "title": "# BDBs",
            "type": "singlestat",
            "valueFontSize": "80%",
            "valueMaps": [
                {
                "op": "=",
                "text": "N/A",
                "value": "null"
                }
            ],
            "valueName": "current"
            },
            {
            "cacheTimeout": null,
            "colorBackground": false,
            "colorValue": false,
            "colors": [
                "rgba(245, 54, 54, 0.9)",
                "rgba(237, 129, 40, 0.89)",
                "rgba(50, 172, 45, 0.97)"
            ],
            "decimals": null,
            "format": "short",
            "gauge": {
                "maxValue": 100,
                "minValue": 0,
                "show": false,
                "thresholdLabels": false,
                "thresholdMarkers": false
            },
            "gridPos": {
                "h": 5,
                "w": 4,
                "x": 4,
                "y": 1
            },
            "id": 7,
            "interval": null,
            "links": [],
            "mappingType": 1,
            "mappingTypes": [
                {
                "name": "value to text",
                "value": 1
                },
                {
                "name": "range to text",
                "value": 2
                }
            ],
            "maxDataPoints": 100,
            "nullPointMode": "connected",
            "nullText": null,
            "postfix": "",
            "postfixFontSize": "50%",
            "prefix": "",
            "prefixFontSize": "50%",
            "rangeMaps": [
                {
                "from": "null",
                "text": "N/A",
                "to": "null"
                }
            ],
            "sparkline": {
                "fillColor": "rgba(31, 118, 189, 0.18)",
                "full": false,
                "lineColor": "rgb(31, 120, 193)",
                "show": false
            },
            "tableColumn": "",
            "targets": [
                {
                "expr": "count(redis_used_memory{cluster=\"$cluster\", node=\"$node\"})",
                "format": "time_series",
                "hide": false,
                "intervalFactor": 2,
                "legendFormat": "",
                "metric": "",
                "refId": "A",
                "step": 3600
                }
            ],
            "thresholds": "",
            "title": "# Shards",
            "type": "singlestat",
            "valueFontSize": "80%",
            "valueMaps": [
                {
                "op": "=",
                "text": "N/A",
                "value": "null"
                }
            ],
            "valueName": "current"
            },
            {
            "cacheTimeout": null,
            "colorBackground": false,
            "colorValue": false,
            "colors": [
                "rgba(50, 172, 45, 0.97)",
                "rgba(237, 129, 40, 0.89)",
                "rgba(245, 54, 54, 0.9)"
            ],
            "decimals": 2,
            "format": "percentunit",
            "gauge": {
                "maxValue": 100,
                "minValue": 0,
                "show": true,
                "thresholdLabels": false,
                "thresholdMarkers": true
            },
            "gridPos": {
                "h": 5,
                "w": 6,
                "x": 8,
                "y": 1
            },
            "id": 9,
            "interval": null,
            "links": [],
            "mappingType": 1,
            "mappingTypes": [
                {
                "name": "value to text",
                "value": 1
                },
                {
                "name": "range to text",
                "value": 2
                }
            ],
            "maxDataPoints": 100,
            "nullPointMode": "connected",
            "nullText": null,
            "postfix": "",
            "postfixFontSize": "50%",
            "prefix": "",
            "prefixFontSize": "50%",
            "rangeMaps": [
                {
                "from": "null",
                "text": "N/A",
                "to": "null"
                }
            ],
            "sparkline": {
                "fillColor": "rgba(31, 118, 189, 0.18)",
                "full": false,
                "lineColor": "rgb(31, 120, 193)",
                "show": false
            },
            "tableColumn": "",
            "targets": [
                {
                "expr": "1-node_cpu_idle{node=\"$node\",cluster=\"$cluster\"}",
                "format": "time_series",
                "intervalFactor": 1,
                "legendFormat": "",
                "metric": "",
                "refId": "A",
                "step": 1800
                }
            ],
            "thresholds": "70,85",
            "title": "CPU Utilization",
            "type": "singlestat",
            "valueFontSize": "70%",
            "valueMaps": [
                {
                "op": "=",
                "text": "N/A",
                "value": "null"
                }
            ],
            "valueName": "current"
            },
            {
            "cacheTimeout": null,
            "colorBackground": false,
            "colorValue": false,
            "colors": [
                "rgba(245, 54, 54, 0.9)",
                "rgba(237, 129, 40, 0.89)",
                "rgba(50, 172, 45, 0.97)"
            ],
            "decimals": null,
            "format": "bytes",
            "gauge": {
                "maxValue": 100,
                "minValue": 0,
                "show": false,
                "thresholdLabels": false,
                "thresholdMarkers": true
            },
            "gridPos": {
                "h": 5,
                "w": 6,
                "x": 14,
                "y": 1
            },
            "id": 10,
            "interval": null,
            "links": [],
            "mappingType": 1,
            "mappingTypes": [
                {
                "name": "value to text",
                "value": 1
                },
                {
                "name": "range to text",
                "value": 2
                }
            ],
            "maxDataPoints": 100,
            "nullPointMode": "connected",
            "nullText": null,
            "postfix": "",
            "postfixFontSize": "50%",
            "prefix": "",
            "prefixFontSize": "50%",
            "rangeMaps": [
                {
                "from": "null",
                "text": "N/A",
                "to": "null"
                }
            ],
            "sparkline": {
                "fillColor": "rgba(31, 118, 189, 0.18)",
                "full": false,
                "lineColor": "rgb(31, 120, 193)",
                "show": false
            },
            "tableColumn": "",
            "targets": [
                {
                "expr": "node_available_memory{cluster=\"$cluster\",node=\"$node\"}",
                "format": "time_series",
                "intervalFactor": 2,
                "refId": "A",
                "step": 3600
                }
            ],
            "thresholds": "",
            "title": "Free RAM",
            "type": "singlestat",
            "valueFontSize": "80%",
            "valueMaps": [
                {
                "op": "=",
                "text": "N/A",
                "value": "null"
                }
            ],
            "valueName": "current"
            },
            {
            "content": "<b style=\"font-size: 20pt\">$version<b>",
            "gridPos": {
                "h": 5,
                "w": 4,
                "x": 20,
                "y": 1
            },
            "id": 14,
            "links": [],
            "mode": "html",
            "title": "Node version",
            "type": "text"
            },
            {
            "collapsed": false,
            "gridPos": {
                "h": 1,
                "w": 24,
                "x": 0,
                "y": 6
            },
            "id": 24,
            "panels": [],
            "repeat": null,
            "title": "Dashboard Row",
            "type": "row"
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "decimals": 2,
            "fill": 1,
            "gridPos": {
                "h": 8,
                "w": 24,
                "x": 0,
                "y": 7
            },
            "id": 3,
            "legend": {
                "alignAsTable": true,
                "avg": true,
                "current": true,
                "hideEmpty": false,
                "hideZero": false,
                "max": false,
                "min": true,
                "rightSide": false,
                "show": true,
                "total": false,
                "values": true
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "null",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [],
            "spaceLength": 10,
            "stack": false,
            "steppedLine": false,
            "targets": [
                {
                "expr": "1- node_cpu_idle{cluster=\"$cluster\", node=\"$node\"}",
                "format": "time_series",
                "intervalFactor": 1,
                "legendFormat": "CPU usage ",
                "refId": "A",
                "step": 120
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "CPU Usage on node",
            "tooltip": {
                "shared": true,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "percentunit",
                "label": "percents",
                "logBase": 1,
                "max": "1.5",
                "min": "0",
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "collapsed": false,
            "gridPos": {
                "h": 1,
                "w": 24,
                "x": 0,
                "y": 15
            },
            "id": 25,
            "panels": [],
            "repeat": null,
            "title": "Dashboard Row",
            "type": "row"
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "description": "display the egress and ingress traffic on the node's NIC",
            "fill": 1,
            "gridPos": {
                "h": 8,
                "w": 24,
                "x": 0,
                "y": 16
            },
            "id": 4,
            "legend": {
                "alignAsTable": true,
                "avg": true,
                "current": true,
                "max": true,
                "min": true,
                "rightSide": true,
                "show": true,
                "sort": "current",
                "sortDesc": true,
                "total": false,
                "values": true
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "null",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "repeat": null,
            "seriesOverrides": [
                {
                "alias": "/Ingress.*/",
                "yaxis": 2
                }
            ],
            "spaceLength": 10,
            "stack": false,
            "steppedLine": false,
            "targets": [
                {
                "expr": "node_ingress_bytes{cluster=\"$cluster\", node=\"$node\"}",
                "format": "time_series",
                "hide": false,
                "intervalFactor": 2,
                "legendFormat": "Ingress for node {{node}}",
                "metric": "",
                "refId": "A",
                "step": 240
                },
                {
                "expr": "node_egress_bytes{cluster=\"$cluster\", node=\"$node\"}",
                "format": "time_series",
                "hide": false,
                "intervalFactor": 2,
                "legendFormat": "egress for node {{node}}",
                "metric": "",
                "refId": "B",
                "step": 240
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "Node $node In/Out Traffic",
            "tooltip": {
                "shared": false,
                "sort": 0,
                "value_type": "individual"
            },
            "transparent": false,
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": [
                "max"
                ]
            },
            "yaxes": [
                {
                "format": "Bps",
                "label": "Egress bytes/sec ",
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                },
                {
                "format": "Bps",
                "label": "Ingress bytes/sec ",
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "collapsed": false,
            "gridPos": {
                "h": 1,
                "w": 24,
                "x": 0,
                "y": 24
            },
            "id": 26,
            "panels": [],
            "repeat": null,
            "title": "Dashboard Row",
            "type": "row"
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "fill": 1,
            "gridPos": {
                "h": 7,
                "w": 24,
                "x": 0,
                "y": 25
            },
            "id": 12,
            "legend": {
                "alignAsTable": true,
                "avg": true,
                "current": true,
                "max": true,
                "min": false,
                "rightSide": true,
                "show": true,
                "sort": "current",
                "sortDesc": true,
                "total": false,
                "values": true
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "null as zero",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [
                {
                "alias": "/Ingress.*/",
                "yaxis": 2
                }
            ],
            "spaceLength": 10,
            "stack": false,
            "steppedLine": false,
            "targets": [
                {
                "expr": "topk(10, listener_egress_bytes{node=\"$node\", cluster=\"$cluster\"})",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "Egress listener {{listener}} for {{bdb}}",
                "refId": "A",
                "step": 240
                },
                {
                "expr": "topk(10, listener_ingress_bytes{node=\"$node\", cluster=\"$cluster\"})",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "Ingress listener {{listener}} for {{bdb}}",
                "refId": "B",
                "step": 240
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "Top 10 listeners Egress/Ingrees",
            "tooltip": {
                "shared": true,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "Bps",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                },
                {
                "format": "Bps",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "collapsed": false,
            "gridPos": {
                "h": 1,
                "w": 24,
                "x": 0,
                "y": 32
            },
            "id": 27,
            "panels": [],
            "repeat": null,
            "title": "BIGSTORE IOPS",
            "type": "row"
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "fill": 1,
            "gridPos": {
                "h": 9,
                "w": 24,
                "x": 0,
                "y": 33
            },
            "id": 1,
            "legend": {
                "alignAsTable": true,
                "avg": true,
                "current": true,
                "max": true,
                "min": true,
                "rightSide": true,
                "show": true,
                "sort": "current",
                "sortDesc": true,
                "total": false,
                "values": true
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "null as zero",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [],
            "spaceLength": 10,
            "stack": false,
            "steppedLine": false,
            "targets": [
                {
                "expr": "topk(10, redis_used_memory{cluster=\"$cluster\", node=\"$node\"})",
                "format": "time_series",
                "hide": false,
                "intervalFactor": 2,
                "legendFormat": "redis:{{redis}}, bdb:{{bdb}},  role:{{role}}",
                "metric": "",
                "refId": "A",
                "step": 240
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "Top 10 shards by used memory",
            "tooltip": {
                "shared": true,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "bytes",
                "label": "",
                "logBase": 1,
                "max": null,
                "min": "0",
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "collapsed": false,
            "gridPos": {
                "h": 1,
                "w": 24,
                "x": 0,
                "y": 42
            },
            "id": 28,
            "panels": [],
            "repeat": null,
            "title": "Dashboard Row",
            "type": "row"
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "fill": 1,
            "gridPos": {
                "h": 9,
                "w": 12,
                "x": 0,
                "y": 43
            },
            "id": 11,
            "legend": {
                "alignAsTable": true,
                "avg": true,
                "current": true,
                "max": true,
                "min": true,
                "rightSide": false,
                "show": true,
                "sort": "current",
                "sortDesc": true,
                "total": false,
                "values": true
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "null as zero",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [],
            "spaceLength": 10,
            "stack": false,
            "steppedLine": false,
            "targets": [
                {
                "expr": "topk(10, listener_conns{cluster=\"$cluster\", node=\"$node\"})",
                "format": "time_series",
                "hide": false,
                "intervalFactor": 2,
                "legendFormat": "listener {{listener}} for  bdb {{bdb}}",
                "metric": "",
                "refId": "A",
                "step": 600
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "Top 10 active listeners by connections",
            "tooltip": {
                "shared": true,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "ops",
                "label": "",
                "logBase": 1,
                "max": null,
                "min": "0",
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "fill": 1,
            "gridPos": {
                "h": 9,
                "w": 12,
                "x": 12,
                "y": 43
            },
            "id": 17,
            "legend": {
                "alignAsTable": true,
                "avg": true,
                "current": true,
                "max": true,
                "min": true,
                "rightSide": false,
                "show": true,
                "sort": "current",
                "sortDesc": true,
                "total": false,
                "values": true
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "null as zero",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [],
            "spaceLength": 10,
            "stack": false,
            "steppedLine": false,
            "targets": [
                {
                "expr": "topk(10, listener_total_req{cluster=\"$cluster\", node=\"$node\"})",
                "format": "time_series",
                "hide": false,
                "intervalFactor": 2,
                "legendFormat": "listener {{listener}} for  bdb {{bdb}}",
                "metric": "",
                "refId": "A",
                "step": 600
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "Top 10 active listeners by requests",
            "tooltip": {
                "shared": true,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "ops",
                "label": "",
                "logBase": 1,
                "max": null,
                "min": "0",
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "collapsed": false,
            "gridPos": {
                "h": 1,
                "w": 24,
                "x": 0,
                "y": 52
            },
            "id": 29,
            "panels": [],
            "repeat": null,
            "title": "Dashboard Row",
            "type": "row"
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "fill": 1,
            "gridPos": {
                "h": 7,
                "w": 12,
                "x": 0,
                "y": 53
            },
            "id": 6,
            "legend": {
                "avg": false,
                "current": false,
                "max": false,
                "min": false,
                "show": true,
                "total": false,
                "values": false
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "null",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [],
            "spaceLength": 10,
            "stack": true,
            "steppedLine": false,
            "targets": [
                {
                "expr": "count(redis_used_memory{cluster=\"$cluster\", node=\"$node\"}) by (bdb)",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "bdb:{{bdb}}",
                "refId": "A",
                "step": 600
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "#Shards per BDB",
            "tooltip": {
                "shared": true,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "fill": 1,
            "gridPos": {
                "h": 7,
                "w": 12,
                "x": 12,
                "y": 53
            },
            "id": 8,
            "legend": {
                "alignAsTable": true,
                "avg": true,
                "current": true,
                "max": true,
                "min": true,
                "rightSide": false,
                "show": true,
                "total": false,
                "values": true
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "null",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [],
            "spaceLength": 10,
            "stack": false,
            "steppedLine": false,
            "targets": [
                {
                "expr": "node_available_memory{cluster=\"$cluster\",node=\"$node\"}",
                "format": "time_series",
                "hide": false,
                "intervalFactor": 2,
                "legendFormat": "available memory",
                "metric": "",
                "refId": "A",
                "step": 600
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "Available Memory",
            "tooltip": {
                "shared": true,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "bytes",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": "0",
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "collapsed": false,
            "gridPos": {
                "h": 1,
                "w": 24,
                "x": 0,
                "y": 60
            },
            "id": 30,
            "panels": [],
            "repeat": null,
            "title": "Dashboard Row",
            "type": "row"
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "fill": 1,
            "gridPos": {
                "h": 10,
                "w": 24,
                "x": 0,
                "y": 61
            },
            "id": 13,
            "legend": {
                "alignAsTable": true,
                "avg": false,
                "current": true,
                "max": false,
                "min": false,
                "show": true,
                "sortDesc": true,
                "total": false,
                "values": true
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "null as zero",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [],
            "spaceLength": 10,
            "stack": false,
            "steppedLine": false,
            "targets": [
                {
                "expr": "redis_used_memory{cluster=\"$cluster\", node=\"$node\"}",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "redis:{{redis}}, bdb:{{bdb}},  role:{{role}}",
                "metric": "redis_used_memory",
                "refId": "A",
                "step": 240
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "Size of shards on node (Ability for sorting like by size)",
            "tooltip": {
                "shared": true,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "bytes",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": false
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "collapsed": false,
            "gridPos": {
                "h": 1,
                "w": 24,
                "x": 0,
                "y": 71
            },
            "id": 31,
            "panels": [],
            "repeat": null,
            "title": "Dashboard Row",
            "type": "row"
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "fill": 1,
            "gridPos": {
                "h": 7,
                "w": 24,
                "x": 0,
                "y": 72
            },
            "id": 16,
            "legend": {
                "alignAsTable": true,
                "avg": true,
                "current": true,
                "max": false,
                "min": true,
                "show": true,
                "sort": "current",
                "sortDesc": true,
                "total": false,
                "values": true
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "null as zero",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [],
            "spaceLength": 10,
            "stack": true,
            "steppedLine": false,
            "targets": [
                {
                "expr": "(delta(redis_process_cpu_system_seconds_total{node=\"$node\",cluster=\"$cluster\"}[60s]) + delta(redis_process_cpu_user_seconds_total{node=\"$node\",cluster=\"$cluster\"}[60s]))/60*100",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "shard: {{redis}} role: {{role}} bdb: {{bdb}}",
                "refId": "A",
                "step": 240
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "Shard's CPU on Node",
            "tooltip": {
                "shared": true,
                "sort": 2,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "percent",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "collapsed": false,
            "gridPos": {
                "h": 1,
                "w": 24,
                "x": 0,
                "y": 79
            },
            "id": 32,
            "panels": [],
            "repeat": null,
            "title": "ROF metrics",
            "type": "row"
            },
            {
            "collapsed": false,
            "gridPos": {
                "h": 1,
                "w": 24,
                "x": 0,
                "y": 80
            },
            "id": 33,
            "panels": [],
            "repeat": null,
            "title": "ROF metrics",
            "type": "row"
            },
            {
            "collapsed": false,
            "gridPos": {
                "h": 1,
                "w": 24,
                "x": 0,
                "y": 81
            },
            "id": 34,
            "panels": [],
            "repeat": null,
            "title": "Dashboard Row",
            "type": "row"
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "fill": 6,
            "gridPos": {
                "h": 7,
                "w": 24,
                "x": 0,
                "y": 82
            },
            "id": 22,
            "legend": {
                "alignAsTable": true,
                "avg": false,
                "current": false,
                "max": false,
                "min": false,
                "rightSide": true,
                "show": false,
                "total": false,
                "values": false
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "null",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [
                {
                "alias": "/.*cow.*/",
                "fill": 0
                },
                {
                "alias": "/.*mem.*/",
                "fill": 8
                }
            ],
            "spaceLength": 10,
            "stack": false,
            "steppedLine": false,
            "targets": [
                {
                "expr": "redis_rdb_last_cow_size{node=\"$node\",cluster=\"$cluster\"}",
                "format": "time_series",
                "hide": false,
                "interval": "",
                "intervalFactor": 2,
                "legendFormat": "shard last RDB cow - redis: {{redis}}",
                "refId": "A",
                "step": 240
                },
                {
                "expr": "redis_aof_last_cow_size{node=\"$node\",cluster=\"$cluster\"}",
                "format": "time_series",
                "hide": false,
                "interval": "",
                "intervalFactor": 2,
                "legendFormat": "shard last AOF cow - redis: {{redis}}",
                "refId": "B",
                "step": 240
                },
                {
                "expr": "redis_mem_aof_buffer{node=\"$node\",cluster=\"$cluster\"}",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "shard aofrw buffers - redis: {{redis}}",
                "refId": "C",
                "step": 240
                },
                {
                "expr": "redis_mem_clients_slaves{node=\"$node\",cluster=\"$cluster\"}",
                "format": "time_series",
                "interval": "",
                "intervalFactor": 2,
                "legendFormat": "shard salve buffers - redis: {{redis}}",
                "refId": "D",
                "step": 240
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "fork memory",
            "tooltip": {
                "shared": true,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "bytes",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            }
        ],
        "refresh": "30s",
        "schemaVersion": 16,
        "style": "dark",
        "tags": [
            "RLEC"
        ],
        "templating": {
            "list": [
            {
                "allValue": null,
                "hide": 0,
                "includeAll": false,
                "label": null,
                "multi": false,
                "name": "cluster",
                "options": [],
                "query": "label_values(node_up,cluster)",
                "refresh": 1,
                "regex": "",
                "skipUrlSync": false,
                "sort": 0,
                "tagValuesQuery": "",
                "tags": [],
                "tagsQuery": "",
                "type": "query",
                "useTags": false
            },
            {
                "allValue": null,
                "current": {
                "text": "1",
                "value": "1"
                },
                "hide": 0,
                "includeAll": false,
                "label": null,
                "multi": false,
                "name": "node",
                "options": [],
                "query": "label_values(node_up{cluster=\"$cluster\"}, node)",
                "refresh": 1,
                "regex": "",
                "skipUrlSync": false,
                "sort": 3,
                "tagValuesQuery": "",
                "tags": [],
                "tagsQuery": "",
                "type": "query",
                "useTags": false
            },
            {
                "allValue": null,
                "current": {
                "text": "5.2.0-14",
                "value": "5.2.0-14"
                },
                "hide": 2,
                "includeAll": false,
                "label": null,
                "multi": false,
                "name": "version",
                "options": [],
                "query": "label_values(node_up{cluster=\"$cluster\",node=\"$node\"}, cnm_version)",
                "refresh": 1,
                "regex": "",
                "skipUrlSync": false,
                "sort": 0,
                "tagValuesQuery": "",
                "tags": [],
                "tagsQuery": "",
                "type": "query",
                "useTags": false
            }
            ]
        },
        "time": {
            "from": "now-2d",
            "to": "now"
        },
        "timepicker": {
            "refresh_intervals": [
            "5s",
            "10s",
            "30s",
            "1m",
            "5m",
            "15m",
            "30m",
            "1h",
            "2h",
            "1d"
            ],
            "time_options": [
            "5m",
            "15m",
            "1h",
            "6h",
            "12h",
            "24h",
            "2d",
            "7d",
            "30d"
            ]
        },
        "timezone": "utc",
        "title": "Node Dashboard",
        "version": 1
    }
        {{% /expand%}}
        {{%expand "cluster.json" %}}
    {
        "annotations": {
            "list": [
            {
                "builtIn": 1,
                "datasource": "-- Grafana --",
                "enable": true,
                "hide": true,
                "iconColor": "rgba(0, 211, 255, 1)",
                "name": "Annotations & Alerts",
                "type": "dashboard"
            }
            ]
        },
        "editable": true,
        "gnetId": null,
        "graphTooltip": 1,
        "id": 7,
        "iteration": 1542896807675,
        "links": [
            {
            "icon": "external link",
            "includeVars": true,
            "keepTime": true,
            "tags": [
                "RLEC"
            ],
            "targetBlank": true,
            "type": "dashboards"
            }
        ],
        "panels": [
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "editable": true,
            "error": false,
            "fill": 3,
            "gridPos": {
                "h": 7,
                "w": 12,
                "x": 0,
                "y": 0
            },
            "id": 2,
            "legend": {
                "alignAsTable": true,
                "avg": false,
                "current": false,
                "max": false,
                "min": false,
                "show": true,
                "total": false,
                "values": false
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "connected",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [
                {
                "alias": "Total Available",
                "fill": 0,
                "yaxis": 2
                }
            ],
            "spaceLength": 10,
            "stack": true,
            "steppedLine": false,
            "targets": [
                {
                "expr": "sum(bdb_used_memory{cluster=\"$cluster\"})",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "Total Used",
                "refId": "A",
                "step": 240
                },
                {
                "expr": "sum(node_available_memory{cluster=\"$cluster\"})",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "Total Available",
                "refId": "B",
                "step": 240
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "Used Memory",
            "tooltip": {
                "msResolution": false,
                "shared": true,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "decbytes",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                },
                {
                "format": "bytes",
                "label": "",
                "logBase": 1,
                "max": null,
                "min": "0",
                "show": true
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "aliasColors": {},
            "bars": true,
            "dashLength": 10,
            "dashes": false,
            "editable": true,
            "error": false,
            "fill": 1,
            "gridPos": {
                "h": 7,
                "w": 12,
                "x": 12,
                "y": 0
            },
            "id": 10,
            "legend": {
                "alignAsTable": true,
                "avg": false,
                "current": false,
                "hideEmpty": true,
                "hideZero": true,
                "max": true,
                "min": false,
                "rightSide": false,
                "show": true,
                "sort": "max",
                "sortDesc": true,
                "total": false,
                "values": true
            },
            "lines": false,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "null",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [],
            "spaceLength": 10,
            "stack": false,
            "steppedLine": false,
            "targets": [
                {
                "expr": "sum(delta(bdb_used_memory{cluster=\"$cluster\"}[1m])) by (bdb) > 100 * 1024*1024",
                "format": "time_series",
                "interval": "1m",
                "intervalFactor": 2,
                "legendFormat": "BDB #{{bdb}}",
                "refId": "A",
                "step": 120
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "Grow over 1min (Over 100MiB)",
            "tooltip": {
                "msResolution": false,
                "shared": true,
                "sort": 1,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "decbytes",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "editable": true,
            "error": false,
            "fill": 1,
            "gridPos": {
                "h": 7,
                "w": 24,
                "x": 0,
                "y": 7
            },
            "id": 4,
            "legend": {
                "alignAsTable": true,
                "avg": true,
                "current": true,
                "hideEmpty": true,
                "hideZero": false,
                "max": true,
                "min": true,
                "rightSide": false,
                "show": true,
                "sort": "current",
                "sortDesc": true,
                "total": false,
                "values": true
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "null as zero",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [
                {}
            ],
            "spaceLength": 10,
            "stack": false,
            "steppedLine": false,
            "targets": [
                {
                "expr": "topk(10, sum(bdb_total_req{cluster=\"$cluster\"}) by (bdb) > 0)",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "#{{bdb}}",
                "metric": "",
                "refId": "A",
                "step": 120
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "Top 10 Requests by BDB",
            "tooltip": {
                "msResolution": false,
                "shared": false,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "ops",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": "0",
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "editable": true,
            "error": false,
            "fill": 1,
            "gridPos": {
                "h": 7,
                "w": 24,
                "x": 0,
                "y": 14
            },
            "id": 6,
            "legend": {
                "avg": false,
                "current": false,
                "max": true,
                "min": true,
                "show": false,
                "total": false,
                "values": true
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "connected",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "repeat": "node",
            "scopedVars": {
                "node": {
                "selected": false,
                "text": "1",
                "value": "1"
                }
            },
            "seriesOverrides": [
                {}
            ],
            "spaceLength": 10,
            "stack": false,
            "steppedLine": false,
            "targets": [
                {
                "expr": "100 - node_cpu_idle{cluster=\"$cluster\", node=\"$node\"}*100",
                "intervalFactor": 2,
                "legendFormat": "",
                "refId": "A",
                "step": 240
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "CPU Usage for node $node",
            "tooltip": {
                "msResolution": false,
                "shared": false,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": [
                "total"
                ]
            },
            "yaxes": [
                {
                "format": "percent",
                "label": "",
                "logBase": 1,
                "max": "100",
                "min": "0",
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": false
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "fill": 1,
            "gridPos": {
                "h": 7,
                "w": 24,
                "x": 0,
                "y": 21
            },
            "id": 15,
            "legend": {
                "alignAsTable": true,
                "avg": true,
                "current": true,
                "max": false,
                "min": true,
                "show": true,
                "sort": "current",
                "sortDesc": true,
                "total": false,
                "values": true
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "null as zero",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [],
            "spaceLength": 10,
            "stack": false,
            "steppedLine": false,
            "targets": [
                {
                "expr": "topk(10, listener_total_req{cluster=\"$cluster\"})",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "{{listener}} for bdb {{bdb}}",
                "refId": "A",
                "step": 120
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "Top 10 Requests Per Listener",
            "tooltip": {
                "shared": true,
                "sort": 1,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "short",
                "label": "",
                "logBase": 1,
                "max": null,
                "min": "0",
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": false
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "fill": 5,
            "gridPos": {
                "h": 7,
                "w": 24,
                "x": 0,
                "y": 28
            },
            "id": 19,
            "legend": {
                "alignAsTable": true,
                "avg": true,
                "current": true,
                "max": true,
                "min": true,
                "show": true,
                "sort": "current",
                "sortDesc": true,
                "total": false,
                "values": true
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "null as zero",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "repeat": "node",
            "scopedVars": {
                "node": {
                "selected": false,
                "text": "1",
                "value": "1"
                }
            },
            "seriesOverrides": [],
            "spaceLength": 10,
            "stack": true,
            "steppedLine": true,
            "targets": [
                {
                "expr": "redis_used_memory{node=\"$node\", cluster=\"$cluster\"}",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "BDB: {{bdb}} Redis: {{redis}}",
                "metric": "redis_used_memory",
                "refId": "A",
                "step": 240
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "Used Mem By redis for Node $node",
            "tooltip": {
                "shared": true,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "decbytes",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "columns": [
                {
                "text": "Avg",
                "value": "avg"
                },
                {
                "text": "Current",
                "value": "current"
                }
            ],
            "filterNull": false,
            "fontSize": "100%",
            "gridPos": {
                "h": 7,
                "w": 8,
                "x": 0,
                "y": 35
            },
            "id": 23,
            "links": [],
            "pageSize": null,
            "scroll": true,
            "showHeader": true,
            "sort": {
                "col": 2,
                "desc": true
            },
            "styles": [
                {
                "dateFormat": "YYYY-MM-DD HH:mm:ss",
                "pattern": "Time",
                "type": "date"
                },
                {
                "colorMode": null,
                "colors": [
                    "rgba(245, 54, 54, 0.9)",
                    "rgba(237, 129, 40, 0.89)",
                    "rgba(50, 172, 45, 0.97)"
                ],
                "decimals": 2,
                "pattern": "/.*/",
                "thresholds": [],
                "type": "number",
                "unit": "decbytes"
                }
            ],
            "targets": [
                {
                "expr": "bdb_used_memory{cluster=\"$cluster\"}",
                "intervalFactor": 2,
                "legendFormat": "BDB {{bdb}}",
                "refId": "A",
                "step": 240
                }
            ],
            "title": "List of BDBs",
            "transform": "timeseries_aggregations",
            "type": "table"
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "fill": 5,
            "gridPos": {
                "h": 7,
                "w": 16,
                "x": 8,
                "y": 35
            },
            "id": 28,
            "legend": {
                "alignAsTable": true,
                "avg": true,
                "current": true,
                "max": true,
                "min": true,
                "show": true,
                "sort": "current",
                "sortDesc": true,
                "total": false,
                "values": true
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "null as zero",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [],
            "spaceLength": 10,
            "stack": true,
            "steppedLine": true,
            "targets": [
                {
                "expr": "bdb_used_memory{cluster=\"$cluster\"} > 30 * 1024 * 1024",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "BDB: {{bdb}} ",
                "metric": "bdb_used_memory",
                "refId": "A",
                "step": 240
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "Used Mem By BDB over 30MB",
            "tooltip": {
                "shared": true,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "decbytes",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            },
            {
            "aliasColors": {},
            "bars": false,
            "dashLength": 10,
            "dashes": false,
            "fill": 5,
            "gridPos": {
                "h": 7,
                "w": 24,
                "x": 0,
                "y": 42
            },
            "id": 35,
            "legend": {
                "alignAsTable": true,
                "avg": true,
                "current": true,
                "max": true,
                "min": true,
                "show": true,
                "sort": "current",
                "sortDesc": true,
                "total": false,
                "values": true
            },
            "lines": true,
            "linewidth": 1,
            "links": [],
            "nullPointMode": "null as zero",
            "percentage": false,
            "pointradius": 5,
            "points": false,
            "renderer": "flot",
            "seriesOverrides": [],
            "spaceLength": 10,
            "stack": true,
            "steppedLine": true,
            "targets": [
                {
                "expr": "topk(10, bdb_conns{cluster=\"$cluster\"})",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "Conns for BDB: {{bdb}} ",
                "metric": "bdb_conns",
                "refId": "A",
                "step": 120
                },
                {
                "expr": "topk(10, listener_conns{bdb=\"$bdb\", cluster=\"$cluster\"})",
                "format": "time_series",
                "intervalFactor": 2,
                "legendFormat": "listener #{{listener}}",
                "refId": "B",
                "step": 120
                }
            ],
            "thresholds": [],
            "timeFrom": null,
            "timeShift": null,
            "title": "Top 10 Used conns By BDB",
            "tooltip": {
                "shared": true,
                "sort": 0,
                "value_type": "individual"
            },
            "type": "graph",
            "xaxis": {
                "buckets": null,
                "mode": "time",
                "name": null,
                "show": true,
                "values": []
            },
            "yaxes": [
                {
                "format": "none",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                },
                {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
                }
            ],
            "yaxis": {
                "align": false,
                "alignLevel": null
            }
            }
        ],
        "refresh": false,
        "schemaVersion": 16,
        "style": "dark",
        "tags": [
            "RLEC"
        ],
        "templating": {
            "list": [
            {
                "allValue": null,
                "hide": 0,
                "includeAll": false,
                "label": null,
                "multi": false,
                "name": "cluster",
                "options": [],
                "query": "label_values(node_up,cluster)",
                "refresh": 1,
                "regex": "",
                "skipUrlSync": false,
                "sort": 1,
                "tagValuesQuery": "",
                "tags": [],
                "tagsQuery": "",
                "type": "query",
                "useTags": false
            },
            {
                "allValue": null,
                "current": {
                "text": "All",
                "value": "$__all"
                },

                "hide": 0,
                "includeAll": true,
                "label": null,
                "multi": true,
                "name": "node",
                "options": [],
                "query": "label_values(node_up{cluster=\"$cluster\"}, node)",
                "refresh": 1,
                "regex": "",
                "skipUrlSync": false,
                "sort": 3,
                "tagValuesQuery": null,
                "tags": [],
                "tagsQuery": null,
                "type": "query",
                "useTags": false
            }
            ]
        },
        "time": {
            "from": "now-24h",
            "to": "now"
        },
        "timepicker": {
            "refresh_intervals": [
            "5s",
            "10s",
            "30s",
            "1m",
            "5m",
            "15m",
            "30m",
            "1h",
            "2h",
            "1d"
            ],
            "time_options": [
            "5m",
            "15m",
            "1h",
            "6h",
            "12h",
            "24h",
            "2d",
            "7d",
            "30d"
            ]
        },
        "timezone": "utc",
        "title": "Cluster Dashboard",
        "version": 1
    }
        {{% /expand%}}
    1. In the Import options, select the `redis-enterprise` datasource and click **Import**.
   
The dashboards that you create from the configurations are sample dashboards. 
For more information about configuring dashboards, see the [Grafana documentation](http://docs.grafana.org).

## Metrics

These are the metrics available:

### Database Metrics

| Metric | Description |
|  ------ | :------ |
|  bdb_avg_latency | Average latency of operations on the DB (microsecond); returned only when there is traffic |
|  bdb_avg_latency_max | Highest value of average latency of operations on the DB (microsecond); returned only when there is traffic |
|  bdb_avg_read_latency | Average latency of read operations (microsecond); returned only when there is traffic |
|  bdb_avg_read_latency_max | Highest value of average latency of read operations (microsecond); returned only when there is traffic |
|  bdb_avg_write_latency | Average latency of write operations (microsecond); returned only when there is traffic |
|  bdb_avg_write_latency_max | Highest value of average latency of write operations (microsecond); returned only when there is traffic |
|  bdb_conns | Number of client connections to DB |
|  bdb_egress_bytes | Rate of outgoing network traffic to DB (bytes/sec) |
|  bdb_egress_bytes_max | Highest value of rate of outgoing network traffic to DB (bytes/sec) |
|  bdb_evicted_objects | Rate of key evictions from DB (evictions/sec) |
|  bdb_evicted_objects_max | Highest value of rate of key evictions from DB (evictions/sec) |
|  bdb_expired_objects | Rate keys expired in DB (expirations/sec) |
|  bdb_expired_objects_max | Highest value of rate keys expired in DB (expirations/sec) |
|  bdb_fork_cpu_system | % cores utilization in system mode for all redis shard fork child processes of this database |
|  bdb_fork_cpu_system_max | Highest value of % cores utilization in system mode for all redis shard fork child processes of this database |
|  bdb_fork_cpu_user | % cores utilization in user mode for all redis shard fork child processes of this database |
|  bdb_fork_cpu_user_max | Highest value of % cores utilization in user mode for all redis shard fork child processes of this database |
|  bdb_ingress_bytes | Rate of incoming network traffic to DB (bytes/sec) |
|  bdb_ingress_bytes_max | Highest value of rate of incoming network traffic to DB (bytes/sec) |
|  bdb_instantaneous_ops_per_sec | Request rate handled by all shards of DB (ops/sec) |
|  bdb_main_thread_cpu_system | % cores utilization in system mode for all redis shard main threas of this database |
|  bdb_main_thread_cpu_system_max | Highest value of % cores utilization in system mode for all redis shard main threas of this database |
|  bdb_main_thread_cpu_user | % cores utilization in user mode for all redis shard main threads of this database |
|  bdb_main_thread_cpu_user_max | Highest value of % cores utilization in user mode for all redis shard main threads of this database |
|  bdb_mem_frag_ratio | RAM fragmentation ratio (RSS / allocated RAM) |
|  bdb_mem_size_lua | Redis lua scripting heap size (bytes) |
|  bdb_monitor_sessions_count | Number of client connected in monitor mode to the DB |
|  bdb_no_of_keys | Number of keys in DB |
|  bdb_other_req | Rate of other (non read/write) requests on DB (ops/sec) |
|  bdb_other_req_max | Highest value of rate of other (non read/write) requests on DB (ops/sec) |
|  bdb_other_res | Rate of other (non read/write) responses on DB (ops/sec) |
|  bdb_other_res_max | Highest value of rate of other (non read/write) responses on DB (ops/sec) |
|  bdb_pubsub_channels | Count the pub/sub channels with subscribed clients. |
|  bdb_pubsub_channels_max | Highest value of count the pub/sub channels with subscribed clients. |
|  bdb_pubsub_patterns | Count the pub/sub patterns with subscribed clients. |
|  bdb_pubsub_patterns_max | Highest value of count the pub/sub patterns with subscribed clients. |
|  bdb_read_hits | Rate of read operations accessing an existing key (ops/sec) |
|  bdb_read_hits_max | Highest value of rate of read operations accessing an existing key (ops/sec) |
|  bdb_read_misses | Rate of read operations accessing a non-existing key (ops/sec) |
|  bdb_read_misses_max | Highest value of rate of read operations accessing a non-existing key (ops/sec) |
|  bdb_read_req | Rate of read requests on DB (ops/sec) |
|  bdb_read_req_max | Highest value of rate of read requests on DB (ops/sec) |
|  bdb_read_res | Rate of read responses on DB (ops/sec) |
|  bdb_read_res_max | Highest value of rate of read responses on DB (ops/sec) |
|  bdb_shard_cpu_system | % cores utilization in system mode for all redis shard processes of this database |
|  bdb_shard_cpu_system_max | Highest value of % cores utilization in system mode for all redis shard processes of this database |
|  bdb_shard_cpu_user | % cores utilization in user mode for the redis shard process |
|  bdb_shard_cpu_user_max | Highest value of % cores utilization in user mode for the redis shard process |
|  bdb_total_connections_received | Rate of new client connections to DB (connections/sec) |
|  bdb_total_connections_received_max | Highest value of rate of new client connections to DB (connections/sec) |
|  bdb_total_req | Rate of all requests on DB (ops/sec) |
|  bdb_total_req_max | Highest value of rate of all requests on DB (ops/sec) |
|  bdb_total_res | Rate of all responses on DB (ops/sec) |
|  bdb_total_res_max | Highest value of rate of all responses on DB (ops/sec) |
|  bdb_used_memory | Memory used by db (in bigredis this includes flash) (bytes) |
|  bdb_write_hits | Rate of write operations accessing an existing key (ops/sec) |
|  bdb_write_hits_max | Highest value of rate of write operations accessing an existing key (ops/sec) |
|  bdb_write_misses | Rate of write operations accessing a non- existing key (ops/sec) |
|  bdb_write_misses_max | Highest value of rate of write operations accessing a non- existing key (ops/sec) |
|  bdb_write_req | Rate of write requests on DB (ops/sec) |
|  bdb_write_req_max | Highest value of rate of write requests on DB (ops/sec) |
|  bdb_write_res | Rate of write responses on DB (ops/sec) |
|  bdb_write_res_max | Highest value of rate of write responses on DB (ops/sec) |

### Node Metrics

| Metric | Description |
|  ------ | :------ |
|  node_avg_latency | Average latency of requests handled by endpoints on node (micro-sec); returned only when there is traffic |
|  node_conns | Number of clients connected to endpoints on node |
|  node_cpu_idle | CPU idle time portion (0-1, multiply by 100 to get percent) |
|  node_cpu_idle_max | Highest value of CPU idle time portion (0-1, multiply by 100 to get percent) |
|  node_cpu_idle_median | Average value of CPU idle time portion (0-1, multiply by 100 to get percent) |
|  node_cpu_idle_min | Lowest value of CPU idle time portion (0-1, multiply by 100 to get percent) |
|  node_cpu_system | CPU time portion spent in kernel (0-1, multiply by 100 to get percent) |
|  node_cpu_system_max | Highest value of CPU time portion spent in kernel (0-1, multiply by 100 to get percent) |
|  node_cpu_system_median | Average value of CPU time portion spent in kernel (0-1, multiply by 100 to get percent) |
|  node_cpu_system_min | Lowest value of CPU time portion spent in kernel (0-1, multiply by 100 to get percent) |
|  node_cpu_user | CPU time portion spent by users-pace processes (0-1, multiply by 100 to get percent) |
|  node_cpu_user_max | Highest value of CPU time portion spent by users-pace processes (0-1, multiply by 100 to get percent) |
|  node_cpu_user_median | Average value of CPU time portion spent by users-pace processes (0-1, multiply by 100 to get percent) |
|  node_cpu_user_min | Lowest value of CPU time portion spent by users-pace processes (0-1, multiply by 100 to get percent) |
|  node_cur_aof_rewrites | Number of aof rewrites that are currently performed by shards on this node |
|  node_egress_bytes | Rate of outgoing network traffic to node (bytes/sec) |
|  node_egress_bytes_max | Highest value of rate of outgoing network traffic to node (bytes/sec) |
|  node_egress_bytes_median | Average value of rate of outgoing network traffic to node (bytes/sec) |
|  node_egress_bytes_min | Lowest value of rate of outgoing network traffic to node (bytes/sec) |
|  node_ephemeral_storage_avail | Disk space available to RLEC processes on configured ephemeral disk (bytes) |
|  node_ephemeral_storage_free | Free disk space on configured ephemeral disk (bytes) |
|  node_free_memory | Free memory in node (bytes) |
|  node_ingress_bytes | Rate of incoming network traffic to node (bytes/sec) |
|  node_ingress_bytes_max | Highest value of rate of incoming network traffic to node (bytes/sec) |
|  node_ingress_bytes_median | Average value of rate of incoming network traffic to node (bytes/sec) |
|  node_ingress_bytes_min | Lowest value of rate of incoming network traffic to node (bytes/sec) |
|  node_persistent_storage_avail | Disk space available to RLEC processes on configured persistent disk (bytes) |
|  node_persistent_storage_free | Free disk space on configured persistent disk (bytes) |
|  node_total_req | Request rate handled by endpoints on node (ops/sec) |
|  node_up | Node is part of the cluster and is connected |

### Proxy Metrics

| Metric | Description |
|  ------ | :------ |
|  listener_acc_latency | Accumulative latency of all types of commands on DB |
|  listener_acc_latency_max | Highest value of accumulative latency of all types of commands on DB |
|  listener_acc_other_latency | Accumulative latency of commands that are classified as "other" type on DB |
|  listener_acc_other_latency_max | Highest value of accumulative latency of commands that are classified as "other" type on DB |
|  listener_acc_read_latency | Accumulative latency of read type of commands on DB |
|  listener_acc_read_latency_max | Highest value of accumulative latency of read type of commands on DB |
|  listener_acc_write_latency | Accumulative latency of write type of commands on DB |
|  listener_acc_write_latency_max | Highest value of accumulative latency of write type of commands on DB |
|  listener_auth_cmds | Number of memcached AUTH commands sent to the DB |
|  listener_auth_cmds_max | Highest value of number of memcached AUTH commands sent to the DB |
|  listener_auth_errors | Number of error responses to memcached AUTH commands  |
|  listener_auth_errors_max | Highest value of number of error responses to memcached AUTH commands  |
|  listener_cmd_flush | Number of memcached FLUSH_ALL commands sent to the DB |
|  listener_cmd_flush_max | Highest value of number of memcached FLUSH_ALL commands sent to the DB |
|  listener_cmd_get | Number of memcached GET commands sent to the DB |
|  listener_cmd_get_max | Highest value of number of memcached GET commands sent to the DB |
|  listener_cmd_set | Number of memcached SET commands sent to the DB |
|  listener_cmd_set_max | Highest value of number of memcached SET commands sent to the DB |
|  listener_cmd_touch | Number of memcached TOUCH commands sent to the DB |
|  listener_cmd_touch_max | Highest value of number of memcached TOUCH commands sent to the DB |
|  listener_conns | Number of clients connected to endpoints |
|  listener_egress_bytes | Rate of outgoing network traffic to endpoint (bytes/sec) |
|  listener_egress_bytes_max | Highest value of rate of outgoing network traffic to endpoint (bytes/sec) |
|  listener_ingress_bytes | Rate of incoming network traffic to endpoint (bytes/sec) |
|  listener_ingress_bytes_max | Highest value of rate of incoming network traffic to endpoint (bytes/sec) |
|  listener_last_req_time | Time of last command sent to the DB |
|  listener_last_res_time | Time of last response sent from the DB |
|  listener_max_connections_exceeded | Number of times the Number of clients connected to the db at the same time has exeeded the max limit |
|  listener_max_connections_exceeded_max | Highest value of number of times the Number of clients connected to the db at the same time has exeeded the max limit |
|  listener_monitor_sessions_count | Number of client connected in monitor mode to the endpoint |
|  listener_other_req | Rate of other (non read/write) requests on endpoint (ops/sec) |
|  listener_other_req_max | Highest value of rate of other (non read/write) requests on endpoint (ops/sec) |
|  listener_other_res | Rate of other (non read/write) responses on endpoint (ops/sec) |
|  listener_other_res_max | Highest value of rate of other (non read/write) responses on endpoint (ops/sec) |
|  listener_other_started_res | Number of responses sent from the DB of type "other" |
|  listener_other_started_res_max | Highest value of number of responses sent from the DB of type "other" |
|  listener_read_req | Rate of read requests on endpoint (ops/sec) |
|  listener_read_req_max | Highest value of rate of read requests on endpoint (ops/sec) |
|  listener_read_res | Rate of read responses on endpoint (ops/sec) |
|  listener_read_res_max | Highest value of rate of read responses on endpoint (ops/sec) |
|  listener_read_started_res | Number of responses sent from the DB of type "read" |
|  listener_read_started_res_max | Highest value of number of responses sent from the DB of type "read" |
|  listener_total_connections_received | Rate of new client connections to endpoint (connections/sec) |
|  listener_total_connections_received_max | Highest value of rate of new client connections to endpoint (connections/sec) |
|  listener_total_req | Request rate handled by endpoint (ops/sec) |
|  listener_total_req_max | Highest value of rate of all requests on endpoint (ops/sec) |
|  listener_total_res | Rate of all responses on endpoint (ops/sec) |
|  listener_total_res_max | Highest value of rate of all responses on endpoint (ops/sec) |
|  listener_total_started_res | Number of responses sent from the DB of all types |
|  listener_total_started_res_max | Highest value of number of responses sent from the DB of all types |
|  listener_write_req | Rate of write requests on endpoint (ops/sec) |
|  listener_write_req_max | Highest value of rate of write requests on endpoint (ops/sec) |
|  listener_write_res | Rate of write responses on endpoint (ops/sec) |
|  listener_write_res_max | Highest value of rate of write responses on endpoint (ops/sec) |
|  listener_write_started_res | Number of responses sent from the DB of type "write" |
|  listener_write_started_res_max | Highest value of number of responses sent from the DB of type "write" |

### Shard Metrics

| Metric | Description |
|  ------ | :------ |
|  redis_active_defrag_running | Automatic memory defragmentation current aggressiveness (% cpu) |
|  redis_allocator_active | Total used memory including external fragmentation |
|  redis_allocator_allocated | Total allocated memory |
|  redis_allocator_resident | Total resident memory (RSS) |
|  redis_aof_last_cow_size | Last AOFR, CopyOnWrite memory |
|  redis_aof_rewrite_in_progress | The number of simultaneous AOF rewrites that are in progress. |
|  redis_aof_rewrites | Number of AOF rewrites this process executed |
|  redis_blocked_clients | Count the clients waiting on a blocking call. |
|  redis_connected_clients | Number of client connections to the specific shard. |
|  redis_connected_slaves | Number of connected slaves |
|  redis_db0_avg_ttl | Average TTL of all volatile keys |
|  redis_db0_expires | Total count of volatile keys |
|  redis_db0_keys | Total key count |
|  redis_evicted_keys | Keys evicted so far (since restart) |
|  redis_expired_keys | Keys expired so far (since restart) |
|  redis_forwarding_state | Shard forwarding state (on or off) |
|  redis_master_link_status | Indicates if the slave is connected to its master |
|  redis_max_memory | Current memory limit configured by redis_mgr according to db memory limits |
|  redis_max_process_mem | Current memory limit configured by redis_mgr according to node free memory |
|  redis_mem_aof_buffer | Current size of AOF buffer |
|  redis_mem_clients_normal | Current memory used for input and output buffers of non-slave clients |
|  redis_mem_clients_slaves | Current memory used for input and output buffers of slave clients |
|  redis_mem_fragmentation_ratio | Memory fragmentation ratio (1.3 means 30% overhead) |
|  redis_mem_replication_backlog | Size of replication backlog |
|  redis_process_cpu_system_seconds_total | Shard Process system CPU time spent in seconds. |
|  redis_process_cpu_usage_percent | Shard Process cpu usage precentage |
|  redis_process_cpu_user_seconds_total | Shard user CPU time spent in seconds. |
|  redis_process_main_thread_cpu_system_seconds_total | Shard main thread system CPU time spent in seconds. |
|  redis_process_main_thread_cpu_user_seconds_total | Shard main thread user CPU time spent in seconds. |
|  redis_process_max_fds | Shard Maximum number of open file descriptors. |
|  redis_process_open_fds | Shard Number of open file descriptors |
|  redis_process_resident_memory_bytes | Shard Resident memory size in bytes. |
|  redis_process_start_time_seconds | Shard Start time of the process since unix epoch in seconds. |
|  redis_process_virtual_memory_bytes | Shard virtual memory in bytes |
|  redis_rdb_bgsave_in_progress | Indication if bgsave is currently in progress |
|  redis_rdb_last_cow_size | Last bgwave (or SYNC fork) used CopyOnWrite memory |
|  redis_rdb_saves | Total count of bgsaves since process was restarted (including slave fullsync and persistence) |
|  redis_up | Shard is up and running |
|  redis_used_memory | Memory used by shard (in bigredis this includes flash) (bytes) |
