---
Title: Configuring Cluster Alerts
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
In **settings** > **alerts**, you can enable alerts for node or cluster events, such as high memory usage or throughput.

You can also enable alerts for databases in the [database configuration]
({{< relref "/rs/administering/database-operations/alerting.md" >}}).

Configured alerts are shown:

- As a warning icon (![Warning](/images/rs/icon_warning.png#no-click "Warning")) for the node and cluster
- In the **log**
- In emails, if you configure email alerts

{{% note %}}
If you enable alerts for "Node joined" or "Node removed" actions,
you must also enable "Receive email alerts" so that the alerts are sent.
{{% /note %}}

To enable alerts for a cluster:

- In **settings** > **alerts**, select the alerts that you want to get for the cluster and click **Save**.

To enable receiving email alerts:

1. In **settings** > **alerts**, select **Receive email alerts** at the bottom of the page.
2. Configure the [email server settings]({{< relref "/rs/administering/cluster-operations/settings/_index.md" >}}).
3. In **access control**, select for each user [the database and cluster alerts]({{< relref "/rs/administering/designing-production/access-control/_index.md" >}}) that the user receives.
