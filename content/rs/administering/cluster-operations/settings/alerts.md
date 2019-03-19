---
Title: Managing Cluster Alerts in Redis Enterprise Software (RS)
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
The **Settings \> Alerts** allows you to designate which cluster-level
events trigger alert notifications.

**Note**: For instructions on configuring alerts at the database level,
refer to [Database
alerts]({{< relref "/rs/administering/database-operations/alerting.md" >}}).

Certain alerts, such as **Node failed** can only be turned on or off.
Some alerts require setting a threshold, such as **Node memory has
reached a certain percentage of its capacity**.

Configured alerts appear in the relevant **Cluster **or **Node
Status** fields, in the **Log **page, and can also be sent via email.

To enable receiving email alerts:

1. Select the checkbox at the bottom of the Alerts page.
1. Add the relevant users to the Team page, and make sure that the
    checkbox Email Alerts is selected (for additional details, refer to
    [Managing
    users]({{< relref "/rs/administering/designing-production/security/account-management.md" >}}).
1. Configure the email server settings on the General page (for
    additional details, refer to [Managing general
    settings]({{< relref "/rs/administering/cluster-operations/settings/_index.md" >}}).
