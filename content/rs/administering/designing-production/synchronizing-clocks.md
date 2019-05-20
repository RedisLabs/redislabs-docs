---
Title: Synchronizing cluster node clocks
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
It is important to make sure that all cluster node's clocks are synchronized
using Chrony and/or NTP. Without this synchronization, there may be
problems with internal cluster communications and have downstream
impacts.

When you initially install Redis Enterprise Software, the install script
asks for permission to configure a scheduled Cron job if it does not
detect Chrony or NTP. This should make sure that the node's clock is always
synchronized. If you did not confirm configuring this job during the
installation process, you must use the Network Time Protocol (NTP)
regularly to make sure that all server clocks are synchronized.

To synchronize the server clock, run the command relevant to your host's
operating system. For example, in Ubuntu, the following command can be
used to synchronize a server's clock to an NTP server:

```src
$ sudo /etc/network/if-up.d/ntpdate
```

If you are using Geo-Replication, it is critical to use [Network Time Service (ntpd)]
({{< relref "/rs/administering/intercluster-replication/crdbs.md#network-time-service-ntp-or-chrony" >}})
to synchronize OS clocks consistent across clusters as well. Certain aspects of conflict
resolution are achieved using OS time.
