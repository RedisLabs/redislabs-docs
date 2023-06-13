---
Title: File locations
linkTitle: File locations
description: Redis Enterprise Software file installation locations.
weight: 60
alwaysopen: false
categories: ["RS"]
aliases: ["/rs/administering/installing-upgrading/file-locations/",
    "/rs/installing-upgrading/file-locations/",
]
---
{{<warning>}}
To ensure that Redis Enterprise Software functions properly, be careful with the files in the application directories. If you modify or delete the application files, Redis Enterprise Software might not work as expected.
{{</warning>}}

## Application directories

The directories that Redis Enterprise Software installs into are:

| **Path** | **Description** |
|------------|-----------------|
| /opt/redislabs | Main installation directory for all Redis Enterprise Software binaries |
| /opt/redislabs/bin | Binaries for all the utilities for command-line access and management, such as [`rladmin`]({{<relref "/rs/references/cli-utilities/rladmin">}}) or [`redis-cli`]({{<relref "/rs/references/cli-utilities/redis-cli">}}) |
| /opt/redislabs/config | System configuration files |
| /opt/redislabs/lib | System library files |
| /opt/redislabs/sbin | System binaries for tweaking provisioning |

## Configuration and data directories

The default directories that Redis Enterprise Software uses for data and metadata are:

| **Path** | **Description** |
|------------|-----------------|
| /var/opt/redislabs | Default storage location for the cluster data, system logs, backups, and ephemeral, persisted data |
| /var/opt/redislabs/log | System logs for Redis Enterprise Software |
| /var/opt/redislabs/run | Socket files for Redis Enterprise Software |
| /etc/opt/redislabs | Default location for cluster manager configuration and certificates |
| /tmp | Temporary files |

You can change these file locations for:

- [Ephemeral and persistence storage]({{< relref "/rs/clusters/new-cluster-setup.md" >}}) during cluster setup
- [Socket files]({{< relref "/rs/installing-upgrading/configuring/change-location-socket-files.md" >}}) after cluster setup
