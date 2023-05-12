---
Title: Monitoring with metrics and alerts
linkTitle: Monitoring
description: Use the metrics that measure the performance of your Redis Enterprise Software (RS) clusters, nodes, databases, and shards to track the performance of your databases.
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

Make sure you read the [definition of each metric]({{< relref "/rs/references/metrics/" >}})
so that you understand exactly what it represents.

## Real-time metrics

You can see the metrics of the cluster in:

- **Cluster > Metrics**
- **Node > Metrics** for each node
- **Database > Metrics** for each database, including the shards for that database

The scale selector at the top of the page allows you to set the X-axis (time) scale of the graph.

To choose which metrics to display in the two large graphs at the top of the page:

1. Hover over the graph you want to show in a large graph.
1. Click on the right or left arrow to choose which side to show the graph.

We recommend that you show two similar metrics in the top graphs so you can compare them side-by-side.

## Cluster alerts

In **Cluster > Alert Settings**, you can enable alerts for node or cluster events, such as high memory usage or throughput.

Configured alerts are shown:

- As a notification on the status icon ( <img src="/images/rs/icon_warning.png#no-click" alt="Warning" width="18px"> ) for the node and cluster
- In the **log**
- In email notifications, if you configure [email alerts](#sending-alerts-by-email)

{{< note >}}
If you enable alerts for "Node joined" or "Node removed" actions,
you must also enable "Receive email alerts" so that the notifications are sent.
{{< /note >}}

To enable alerts for a cluster:

1. In **Cluster > Alert Settings**, click **Edit**. 
1. Select the alerts that you want to show for the cluster and click **Save**.

## Database alerts

For each database, you can enable alerts for database events, such as high memory usage or throughput.

Configured alerts are shown:

- As a notification on the status icon ( <img src="/images/rs/icon_warning.png#no-click" alt="Warning" width="18px"> ) for the database
- In the **log**
- In emails, if you configure [email alerts](#sending-alerts-by-email)

To enable alerts for a database:

1. In **Configuration** for the database, click **Edit**.
1. Select the **Alerts** section to open it.
1. Select the alerts that you want to show for the database and click **Save**.

## Sending alerts by email

To send cluster and database alerts by email:

1. In **Cluster > Alert Settings**, click **Edit**.
1. Select **Set an email** to configure the [email server settings]({{< relref "/rs/clusters/configure/cluster-settings#configuring-email-server-settings" >}}).
1. In **Configuration** for the database, click **Edit**.
1. Select the **Alerts** section to open it.
1. Select **Receive email alerts** and click **Save**.
1. In **Access Control**, select the [database and cluster alerts]({{< relref "/rs/security/access-control/manage-users" >}}) that you want each user to receive.
