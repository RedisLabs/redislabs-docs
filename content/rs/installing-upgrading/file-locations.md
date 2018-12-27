---
Title: File Locations
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/installing-upgrading/file-locations/
---
Below is a table of which directories Redis Enterprise Software (RS)
installs into and/or utilizes.

| **Path** | **Description** |
|------------|-----------------|
| /opt/redislabs | This is the main installation directory for all Redis Enterprise Software binaries |
| /opt/redislabs/bin | Binaries for all the utilities for command line access and managements such as "rladmin" or "redis-cli" |
| /opt/redislabs/config | System configuration files |
| /opt/redislabs/lib | System library files |
| /opt/redislabs/sbin | System binaries for tweaking provisioning |
| /var/opt/redislabs | Default storage location for the cluster data, system logs, backups and ephemeral, persisted data |
| /var/opt/redislabs/log | System logs for Redis Enterprise Software |
| /etc/opt/redislabs | Default location for cluster manager configuration and certificates |
| /tmp | Temporary files |

Info: At this time, changing the directories RS installs to is not
supported.
