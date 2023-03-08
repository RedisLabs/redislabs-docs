---
Title: Metrics
linkTitle: Real-time Metrics
description: Documents the metrics that are tracked with Redis Enterprise Software.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/monitoring-metrics/definitions/
         /rs/administering/database-operations/metrics/database-metrics/
         /rs/administering/database-operations/metrics/
         /rs/administering/monitoring-metrics/definitions/
         /rs/administering/database-operations/metrics/shard-metrics/
         /rs/administering/cluster-operations/cluster-metrics/
         /rs/administering/cluster-operations/node-metrics/
         /rs/administering/monitoring-metrics/console-metrics-definitions/
         /rs/monitoring-metrics/console-metrics-definitions/
         /rs/clusters/monitoring/console-metrics-definitions/
         /rs/clusters/monitoring/console-metrics-definitions.md
---

The Redis Enterprise Software admin console shows performance metrics for clusters, nodes, databases, and shards. 

In the RS admin console, you can see the real-time metrics and you can configure alerts that send notifications based on alert parameters. Select the metrics tab to view the metrics available for each component. For more information, see [Monitoring with Metrics and alerts]({{< relref "/rs/clusters/monitoring" >}})

See the following pages for metrics definitions:
- [Database operations]({{< relref "/rs/references/metrics/database-operations" >}}) for database metrics
- [Resource usage]({{< relref "/rs/references/metrics/resource-usage" >}}) for resource and database usage metrics
- [Redis on Flash]({{< relref "/rs/references/metrics/redis-on-flash" >}}) for additional metrics for [Redis on Flash (RoF)]({{< relref "/rs/databases/redis-on-flash" >}}) databases

## [Prometheus Metrics]({{< relref "/rs/clusters/monitoring/prometheus-metrics-definitions" >}})

To collect and display metrics data from your databases and other cluster components,
you can connect your [Prometheus](https://prometheus.io/) and [Grafana](https://grafana.com/) server to your Redis Enterprise Software cluster.

We recommend you use Prometheus and Grafana to view metrics history and trends.

See [Prometheus Integration]({{< relref "/rs/clusters/monitoring/prometheus-integration" >}}) to learn how to connect Prometheus and Grafana to your Redis Enterprise database.