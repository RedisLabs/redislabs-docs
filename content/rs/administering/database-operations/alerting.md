---
Title: Configuring Database Alerts
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
For each database, you can enable alerts for database events, such as high memory usage or throughput.

You can also enable alerts for the cluster and nodes in the [cluster alerts]]({{< relref "/rs/administering/cluster-operations/settings/alerts.md" >}}).

Configured alerts are shown:

- As a warning icon (![Warning](/images/rs/icon_warning.png#no-click "Warning") for the database
- In the **log**
- In emails, if you configure email alerts

To enable alerts for a database:

1. In **configuration** for each database, click **show adavnced options** to see the database alerts and select the alerts that you want to get for the database.
2. Click **Update**.

To enable alert emails:

1. Configure the [email server settings]({{< relref "/rs/administering/cluster-operations/settings/_index.md" >}})).
2. In **access control**, select for each user [the database and cluster alerts]({{< relref "/rs/administering/designing-production/access-control/_index.md" >}}) that the user receives.
