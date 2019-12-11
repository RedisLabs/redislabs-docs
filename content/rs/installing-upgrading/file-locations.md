---
Title: File Locations
description:
weight: 40
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/installing-upgrading/file-locations/
---
Below is a table showing which directories Redis Enterprise Software is installed into. Note that, at this time (late 2019) it is not possible to install into any other directories.

| **Path** | **Description** |
|------------|-----------------|
| /opt/redislabs | This is the main installation directory for all Redis Enterprise Software binaries |
| /opt/redislabs/bin | Binaries for all the utilities for command line access and managements such as "rladmin" or "redis-cli" |
| /opt/redislabs/config | System configuration files |
| /opt/redislabs/lib | System library files |
| /opt/redislabs/sbin | System binaries for tweaking provisioning |

Below is a table showing the default directories used by Redis Enterprise Software for data and metadata. These locations can be changed (see [Change Location of Socket Files](rs/installing-upgrading/configuring/change-location-socket-files/), [New Cluster Setup](rs/administering/cluster-operations/new-cluster-setup/) and [Persistent and Ephemeral Storage](rs/administering/designing-production/persistent-ephemeral-storage/) for further details):

| **Path** | **Description** |
|------------|-----------------|
| /var/opt/redislabs | Default storage location for the cluster data, system logs, backups and ephemeral, persisted data |
| /var/opt/redislabs/log | System logs for Redis Enterprise Software |
| /etc/opt/redislabs | Default location for cluster manager configuration and certificates |
| /tmp | Temporary files |


