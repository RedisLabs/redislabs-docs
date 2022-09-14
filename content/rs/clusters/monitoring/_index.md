---
Title: Monitoring with metrics and alerts
linkTitle: Monitoring
description: You can use the metrics that measure the performance of your Redis Enterprise Software (RS) clusters, nodes, databases and shards to keep an eye on the performance of your databases.
weight: 96
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/database-operations/alerting/
         /rs/administering/cluster-operations/settings/alerts/
         /rs/administering/database-operations/metrics/shard-metrics/
         /rs/administering/monitoring-metrics/
         /rs/monitoring-metrics/
---
You can use the metrics that measure the performance of your Redis Enterprise Software (RS) clusters, nodes, databases and shards
to keep an eye on the performance of your databases.
In the RS admin console, you can see the real-time metrics and you can configure alerts that send notifications based on alert parameters.

You can also access the metrics and configure alerts through the REST API so that you can integrate the RS metrics into your monitoring environment, for example, using [Prometheus with Grafana]({{< relref "/rs/clusters/monitoring/prometheus-integration.md" >}}) or [Uptrace]({{< relref "/rs/clusters/monitoring/uptrace-integration.md" >}}).

Make sure you read the [definition of each metric]({{< relref "/rs/clusters/monitoring/console-metrics-definitions.md" >}})
so that you understand exactly what it represents.

## Real-time metrics

You can see the metrics of the cluster in:

- **Cluster > Metrics**, including individual nodes
- **Node > Metrics**
- **Database > Metrics**, including individual shards
- **Shards > Metrics**

The scale selector at the top of the page allows you to set the X-axis (time) scale of the graph.

To choose which metrics to display in the two large graphs at the top of the page:

1. Hover over the graph you want to show in a large graph.
1. Click on the right or left arrow to choose which side to show the graph.

We recommend that you show two similar metrics in the top graphs so you can compare them side-by-side.

## Cluster alerts

In **settings** > **alerts**, you can enable alerts for node or cluster events, such as high memory usage or throughput.

Configured alerts are shown:

- As a warning icon (![Warning](/images/rs/icon_warning.png#no-click "Warning")) for the node and cluster
- In the **log**
- In email notifications, if you configure [email alerts](#sending-alerts-by-email)

{{< note >}}
If you enable alerts for "Node joined" or "Node removed" actions,
you must also enable "Receive email alerts" so that the notifications are sent.
{{< /note >}}

To enable alerts for a cluster:

- In **settings** > **alerts**, select the alerts that you want to show for the cluster and click **Save**.

## Database alerts

For each database, you can enable alerts for database events, such as high memory usage or throughput.

Configured alerts are shown:

- As a warning icon (![Warning](/images/rs/icon_warning.png#no-click "Warning")) for the database
- In the **log**
- In emails, if you configure [email alerts](#sending-alerts-by-email)

To enable alerts for a database:

1. In **configuration** for each database, click **show advanced options** to see the database alerts and select the alerts that you want to get for the database.
1. Click **Update**.

## Sending alerts by email

To send cluster or database alerts by email:

1. In **settings** > **alerts**, select **Receive email alerts** at the bottom of the page.
1. Configure the [email server settings]({{< relref "/rs/administering/cluster-operations/settings/_index.md" >}}).
1. In **access control**, select for each user [the database and cluster alerts]({{< relref "/rs/administering/designing-production/access-control/_index.md" >}}) that you want the user to receive.
