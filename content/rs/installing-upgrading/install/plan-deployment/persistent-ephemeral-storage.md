---
Title: Persistent and ephemeral node storage
linktitle: Persistent node storage
description: Configure paths for persistent storage and ephemeral storage.
weight: 50
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: [
    /rs/administering/designing-production/persistent-ephemeral-storage.md,
    /rs/administering/designing-production/persistent-ephemeral-storage/,
    /rs/installing-upgrading/persistent-ephemeral-storage.md,
    /rs/installing-upgrading/persistent-ephemeral-storage/,
    
]
---
For each node in the cluster, you can configure paths for both persistent
storage and ephemeral storage.

{{< note >}}
The persistent storage and ephemeral storage discussed in this document are not related
to Redis persistence or AWS ephemeral drives.
{{< /note >}}

## Persistent storage

Persistent storage is mandatory. The cluster uses persistent storage to store
information that needs to persist even if a shard or a node fails,
such as server logs, configurations, and files.

For example, if you configure [persistence]({{< relref "/rs/databases/configure/database-persistence.md" >}})
for a database,
then the persistence information is stored in this location.
    
The persistent volume must be a storage area network (SAN)
using an EXT4 or XFS file system and be connected as an external storage volume.
    
When using append-only file (AOF) persistence, use flash-based storage
for the persistent volume.

## Ephemeral storage

Ephemeral storage is optional. If configured, the cluster stores in the ephemeral storage any temporary information that does not need to be persisted.
This improves performance and helps reduce the load on the persistent storage.

Ephemeral storage must be a locally attached volume on each node.

## Disk size requirements

For disk size requirements, see:

- [Hardware
    requirements]({{< relref "/rs/installing-upgrading/install/plan-deployment/hardware-requirements.md" >}})
    for general guidelines regarding the ideal disk size for each type of
    storage
- [Disk size requirements for extreme write
    scenarios]({{< relref "/rs/clusters/optimize/disk-sizing-heavy-write-scenarios.md" >}})
    for special considerations when dealing with a high rate of write
    commands
