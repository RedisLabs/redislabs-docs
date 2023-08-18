---
Title: Real-time metrics
linkTitle: Metrics
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

In the Redis Enterprise admin console, you can see real-time metrics and configure alerts that send notifications based on alert parameters. Select the **Metrics** tab to view the metrics for each component. For more information, see [Monitoring with metrics and alerts]({{< relref "/rs/clusters/monitoring" >}}).

See the following topics for metrics definitions:
- [Database operations]({{< relref "/rs/references/metrics/database-operations" >}}) for database metrics
- [Resource usage]({{< relref "/rs/references/metrics/resource-usage" >}}) for resource and database usage metrics
- [Auto Tiering]({{< relref "/rs/references/metrics/auto-tiering" >}}) for additional metrics for [Auto Tiering ]({{< relref "/rs/databases/auto-tiering" >}}) databases

## [Prometheus metrics]({{< relref "/rs/clusters/monitoring/prometheus-metrics-definitions" >}})

To collect and display metrics data from your databases and other cluster components,
you can connect your [Prometheus](https://prometheus.io/) and [Grafana](https://grafana.com/) server to your Redis Enterprise Software cluster.

We recommend you use Prometheus and Grafana to view metrics history and trends.

See [Prometheus integration]({{< relref "/rs/clusters/monitoring/prometheus-integration" >}}) to learn how to connect Prometheus and Grafana to your Redis Enterprise database.

## Limitations

### Shard limit

Metrics information is not shown for clusters with more than 128 shards. For large clusters, we recommend you use [Prometheus and Grafana]({{< relref "/rs/clusters/monitoring/prometheus-integration" >}}) to view metrics.

### Metrics not shown during shard migration

The following metrics are not measured during [shard migration]({{< relref "/rs/databases/configure/replica-ha" >}}). If you view these metrics while resharding, the graph will be blank.

- [Evicted objects/sec]({{< relref "/rs/references/metrics/database-operations#evicted-objectssec" >}})
- [Expired objects/sec]({{< relref "/rs/references/metrics/database-operations#expired-objectssec" >}})
- [Read misses/sec]({{< relref "/rs/references/metrics/database-operations#read-missessec" >}})
- [Write misses/sec]({{< relref "/rs/references/metrics/database-operations#write-missessec" >}})
- [Total keys]({{< relref "/rs/references/metrics/database-operations#total-keys" >}})
- [Incoming traffic]({{< relref "/rs/references/metrics/resource-usage#incoming-traffic" >}})
- [Outgoing traffic]({{< relref "/rs/references/metrics/resource-usage#outgoing-traffic" >}})
- [Used memory]({{< relref "/rs/references/metrics/resource-usage#used-memory" >}})