---
Title: Database alerting
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
In the *Alerts* section of the Redis Enterprise Software database page,
you can designate which database events will trigger alert
notifications.

For instructions on configuring alerts at the cluster level, refer to
[Managing cluster
alerts]({{< relref "/rs/administering/cluster-operations/settings/alerts.md" >}}).

Some alerts can only be turned on or off, such as **[Periodic
backup]({{< relref "/rs/administering/database-operations/database-backup.md" >}})
failed**. Some alerts require setting a threshold, such as **Dataset
size has reached a certain percentage of its limit**.

Configured alerts appear in the database **Status **field, in
the **Log **page, and can also be sent by **email**.

**To enable receiving email alerts**:

1. Select the checkbox at the bottom of the section.
1. Add the relevant users on the **Team** page, and make sure that the
    checkbox Email Alerts is selected (for additional details, refer to
    [Account
    Management]({{< relref "/rs/administering/designing-production/security/account-management.md" >}}).
1. Configure the email server settings on the **General** page (for
    additional details, refer to [general
    settings]({{< relref "/rs/administering/cluster-operations/settings/_index.md" >}})).

Note: if you enable alerts on "Node Joined" and/or "Node removed", you
must also enable "Receive email alerts" to actually be alerted to these.
