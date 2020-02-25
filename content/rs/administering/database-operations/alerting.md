---
Title: Database Alert Emails
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
You can select alerts to log and receive emails about database status.
You can also select alerts on cluster status in the [cluster alerts]]({{< relref "/rs/administering/cluster-operations/settings/alerts.md" >}}).

Some alerts can only be turned on or off, such as [Periodic backup failed]({{< relref "/rs/administering/database-operations/database-backup.md" >}}).
Other alerts require that you set a threshold that triggers the notifiction, such as **Dataset size has reached a certain percentage of its limit**.

When you enable an alert, logs are shown in the **log** when the alert is triggered.
Alert emails can also be sent to users according to their [user settings]
({{< relref "/rs/administering/designing-production/security/account-management.md#adding-a-user" >}}).

To enable alerts for a database:

- In **configuration** for each database, click **show adavnced options** to see the database alerts and select the alerts that you want to get for the database.

To enable alert emails:

1. Configure the [email server settings]({{< relref "/rs/administering/cluster-operations/settings/_index.md" >}})).
1. In **settings** > **team**, select for each user [the database and cluster alerts]({{< relref "/rs/administering/designing-production/security/account-management.md" >}}) that the user receives.
