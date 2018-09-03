---
Title: Logging and Audit Events
description: 
weight: $weight
alwaysopen: false
---
Management actions performed with Redis Enterprise are audited in order
to fulfill two major objectives:

1.  To ensure that system management tasks are appropriately performed
    and/or monitored by the Administrator(s)
2.  To facilitate compliance with regulatory
    standards

In order to fulfill both objectives, the audit records contain the
following information:

1.  Who performed the action?]{style="font-weight: 400;"}
2.  [What exactly was the performed action?]{style="font-weight: 400;"}
3.  [When was the action performed?
4.  Did the action succeed or not?

[To get the list of audit records/events, you can use the REST API or
the **Log** page in the UI. The Log page displays the system and user
events regarding alerts, notifications and
configurations.]{style="font-weight: 400;"}

![](https://lh3.googleusercontent.com/7mYBah2_66GuMuFE4rm-po4ttoHJ41Mb8DClsJmdyw41NoLJOZSf10jiOV2b5IN0pGvfcT01kyb2o6v1e_FJH0iQrsRws2s7gTkn70BJIzx56EwUotx3JDHzWThPtHBb2MfcfOVd)

If you need to look at the audit log of what a user on the cluster has
done, e.g. edited a DB configuration, this is where you could look.

-   [Redis slow
    log]({{< relref "/rs/administering/logging/redis-slow-log.md" >}})
-   [rsyslog logging]({{< relref "/rs/administering/logging/rsyslog-logging.md" >}})
