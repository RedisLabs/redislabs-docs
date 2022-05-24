---
Title: Synchronize cluster node clocks
linktitle: Sync node clocks
description:
weight: 30
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/administering/designing-production/synchronizing-clocks.md,
    /rs/administering/designing-production/synchronizing-clocks,
    /rs/clusters/configure/sync-clocks.md,
    /rs/clusters/configure/sync-clocks,
]
---
To avoid problems with internal cluster communications that can impact your data integrity,
make sure that the clocks on all of the cluster nodes are synchronized using Chrony and/or NTP.

When you install Redis Enterprise Software,
the install script checks if Chrony or NTP is running.
If they are not, the installation process asks for permission to configure a scheduled Cron job.
This should make sure that the node's clock is always synchronized.
If you did not confirm configuring this job during the installation process,
you must use the Network Time Protocol (NTP) regularly to make sure that all server clocks are synchronized.

To synchronize the server clock, run the command that is appropriate for your operating system.
For example, in Ubuntu, the following command can be used to synchronize a server's clock to an NTP server:

```sh
sudo /etc/network/if-up.d/ntpdate
```

If you are using Active-Active databases, you must use [Network Time Service (ntpd)]({{< relref "/rs/databases/active-active/_index.md#network-time-service-ntp-or-chrony" >}})
to synchronize OS clocks consistent across clusters to handle conflict resolution according to the OS time.
