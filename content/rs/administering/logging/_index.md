---
Title: Logging and Audit Events
description:
weight: 70
alwaysopen: false
categories: ["RS"]
---
Management actions performed with Redis Enterprise are audited in order
to fulfill two major objectives:

1. To make sure that system management tasks are appropriately performed
    and/or monitored by the Administrators
1. To facilitate compliance with regulatory
    standards

In order to fulfill both objectives, the audit records contain the
following information:

1. Who performed the action?
1. What exactly was the performed action?
1. When was the action performed?
1. Did the action succeed or not?

To get the list of audit records/events, you can use the REST API or
the **Log** page in the UI. The Log page displays the system and user
events regarding alerts, notifications and
configurations.

![events-log](/images/rs/events-log.png)

If you need to look at the audit log of what a user on the cluster has
done, e.g. edited a DB configuration, this is where you could look.

- [Redis slow
    log]({{< relref "/rs/administering/logging/redis-slow-log.md" >}})
- [rsyslog logging]({{< relref "/rs/administering/logging/rsyslog-logging.md" >}})
