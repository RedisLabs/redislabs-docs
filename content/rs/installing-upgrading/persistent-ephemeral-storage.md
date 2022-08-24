---
Title: Node persistent and ephemeral storage
linktitle: Persistent node storage
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/administering/designing-production/persistent-ephemeral-storage.md,
    /rs/administering/designing-production/persistent-ephemeral-storage/,
    
]
---
For each node in the cluster, you can configure both persistent
storage and ephemeral storage paths.

- Persistent storage is mandatory. It is used by the cluster to store
    information that needs to persist even if a shard or a node fails,
    including server logs, configurations, files.
    For example, if you configure [persistence]({{< relref "/rs/databases/configure/database-persistence.md" >}})
    for a database,
    then the persistence information is stored in this location.
    
    The persistent volume must be a SAN (Storage Area Network)
    using an EXT4 or XFS file system and be connected as an external storage volume.
    
    When using AOF persistence, we recommend that you use flash-based storage
    for the persistent volume.
    
- Ephemeral storage is optional. If configured, the cluster stores temporary information
    that does not need to persist in the ephemeral storage.
    This improves performance and helps to reduce the load on the persistent storage.
    
    Ephemeral storage must be a locally attached volume on each node.

{{< note >}}
Persistent and ephemeral storage discussed here is not related
to Redis persistence or AWS ephemeral drives.
{{< /note >}}

For disk size requirements, see:

- [Hardware
    requirements]({{< relref "/rs/administering/designing-production/hardware-requirements.md" >}})
    for general guidelines regarding the ideal disk size each type of
    storage
- [Disk size requirements for extreme write
    scenarios]({{< relref "/rs/clusters/optimize/disk-sizing-heavy-write-scenarios.md" >}})
    for special considerations when dealing with a high rate of write
    commands
