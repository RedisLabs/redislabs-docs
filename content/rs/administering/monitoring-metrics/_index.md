---
Title: Monitoring with Metrics and Alerts
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
You can use the metrics that measurement the performance of your clusters, nodes, databases and shards
to keep an eye on the performance of your databases.
In the management console, you can either see the real-time metrics or configure alerts to send you notifications based on alert parameters.

You can also access the metrics and configure alerts through the REST API so that you can integrate the RS metrics into your monitoring environment, for example [using Prometheus and Grafana]({{< relref "/rs/administering/monitoring-metrics/prometheus-integration.md" >}}).

Make sure you read the [definition of each metric]({{< relref "/rs/administering/monitoring-metrics/definitions.md" >}})
so that you understand exactly what it represents.

## Real-time Metrics

You can see the metrics of the cluster in:

- **Cluster > Metrics**, including individual nodes
- **Node > Metrics**
- **Database > Metrics**, including individual shards
- **Shards > Metrics**

The scale selector at the top of the page allows you to set the scale of the graphs' X-axis (time).

You can choose which metrics graph to display in the two large graphs at the top of the page:

1. Hover over the graph you want to show in a large graph.
1. Click on the right or left arrow to choose which side to show the graph.

We recommend that you show two similar metrics in the top graphs so you can compare them side-by-side.

## Cluster Alerts

In **settings** > **alerts**, you can enable alerts for node or cluster events, such as high memory usage or throughput.

Configured alerts are shown:

- As a warning icon (![Warning](/images/rs/icon_warning.png#no-click "Warning")) for the node and cluster
- In the **log**
- In email notifications, if you configure [email alerts](#sending-alerts-by-email)

{{< note >}}
If you enable alerts for "Node joined" or "Node removed" actions,
you must also enable "Receive email alerts" so that the alerts are sent.
{{< /note >}}

To enable alerts for a cluster:

- In **settings** > **alerts**, select the alerts that you want to show for the cluster and click **Save**.

## Database Alerts

For each database, you can enable alerts for database events, such as high memory usage or throughput.

Configured alerts are shown:

- As a warning icon (![Warning](/images/rs/icon_warning.png#no-click "Warning")) for the database
- In the **log**
- In emails, if you configure [email alerts](#sending-alerts-by-email)

To enable alerts for a database:

1. In **configuration** for each database, click **show adavnced options** to see the database alerts and select the alerts that you want to get for the database.
1. Click **Update**.

## Sending Alerts by Email

To send cluster or database alerts by email:

1. In **settings** > **alerts**, select **Receive email alerts** at the bottom of the page.
1. Configure the [email server settings]({{< relref "/rs/administering/cluster-operations/settings/_index.md" >}}).
1. In **access control**, select for each user [the database and cluster alerts]({{< relref "/rs/administering/designing-production/access-control/_index.md" >}}) that you want the user to receive.