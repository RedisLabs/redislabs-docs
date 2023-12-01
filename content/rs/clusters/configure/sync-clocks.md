---
Title: Synchronize cluster node clocks
linktitle: Sync node clocks
description: Sync node clocks to avoid problems with internal custer communication.
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

## Set up NTP synchronization

To set up NTP synchronization, see the following sections for instructions for specific operating systems.

### Ubuntu 18.04 and Ubuntu 20.04

1. Install Chrony, a replacement for NTP: ```sudo apt install chrony```

2. Edit the Chrony configuration file: ```sudo nano /etc/chrony/chrony.conf```

3. Add `server pool.ntp.org` to the file, replace `pool.ntp.org` with your own NTP server, then save.

4. Restart the Chrony service: ```sudo systemctl restart chrony```

5. Check the Chrony service status: ```sudo systemctl status chrony```

For more details, refer to the official [Ubuntu 20.04 documentation](https://ubuntu.com/server/docs/network-ntp).

### RHEL 7

1. Install Chrony, a replacement for NTP: ```sudo yum install chrony```

2. Edit the Chrony configuration file: ```sudo nano /etc/chrony.conf```

3. Add `server pool.ntp.org` to the file, replace `pool.ntp.org` with your own NTP server, then save.

4. Enable and start the Chrony service: ```sudo systemctl enable chronyd && sudo systemctl start chronyd```

5. Check the Chrony service status: ```sudo systemctl status chronyd```

For more details, refer to the official [RHEL 7 documentation](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/system_administrators_guide/sect-using_chrony).

### RHEL 8 and RHEL 9

1. Install Chrony, a replacement for NTP: ```sudo dnf install chrony```

2. Edit the Chrony configuration file: ```sudo nano /etc/chrony.conf```

3. Add `server pool.ntp.org` to the file, replace `pool.ntp.org` with your own NTP server, then save.

4. Enable and start the Chrony service: ```sudo systemctl enable chronyd && sudo systemctl start chronyd```

5. Check the Chrony service status: ```sudo systemctl status chronyd```

For more details, refer to the official [RHEL 8 and 9 documentation](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/configuring_basic_system_settings/using-chrony-to-configure-ntp).

### Amazon Linux 2

1. Install Chrony, a replacement for NTP: ```sudo yum install chrony```

2. Edit the Chrony configuration file: ```sudo nano /etc/chrony.conf```

3. Add `server pool.ntp.org` to the file, replace `pool.ntp.org` with your own NTP server, then save.

4. Enable and start the Chrony service: ```sudo systemctl enable chronyd && sudo systemctl start chronyd```

5. Check the Chrony service status: ```sudo systemctl status chronyd```

For more details, refer to the official [Amazon Linux 2 documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/set-time.html).

If you are using Active-Active databases, you must use [Network Time Service (ntpd)]({{< relref "/rs/databases/active-active/_index.md#network-time-service-ntp-or-chrony" >}})
to synchronize OS clocks consistently across clusters to handle conflict resolution according to the OS time.
