---
Title: Database alerting
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
You can select alerts to receive notifications about database status.
You can also select alerts on cluster status in the [cluster alerts]]({{< relref "/rs/administering/cluster-operations/settings/alerts.md" >}}).

Some alerts can only be turned on or off, such as [Periodic backup failed]({{< relref "/rs/administering/database-operations/database-backup.md" >}}).
Other alerts require that you set a threshold that triggers the notifiction, such as **Dataset size has reached a certain percentage of its limit**.

Configured alerts appear in the database **Status** field, in the **Log** page.
The notifications can also be sent by **email** to users according to their [user settings]
({{< relref "/rs/administering/designing-production/security/account-management.md#adding-a-user" >}}).

To enable an email alert:

1. Select the checkbox at the bottom of the section.
1. Add the relevant users on the **Team** page add the database to their [email alerts]({{< relref "/rs/administering/designing-production/security/account-management.md" >}}).
1. Configure the [email server settings]({{< relref "/rs/administering/cluster-operations/settings/_index.md" >}})).
