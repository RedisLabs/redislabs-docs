---
Title: Persistent and ephemeral storage
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
For each node in the cluster, you can configure both a persistent
storage and an ephemeral storage path.

- Persistent storage is mandatory; it is used by the cluster to store
    information that needs to persist even if a shard or a node fails,
    e.g server logs, configurations, files. For example, if you choose
    any type of persistence for a database, then the persistence
    information is stored in this location.
- Ephemeral storage is optional. If defined, it is used by the cluster
    to store information that does not need to persist. This aids in
    optimization and helps to reduce the load on the persistent storage.

Critical: **DO NOT** confuse persistent or ephemeral storage on this
page with Redis persistence or AWS ephemeral drives used in other areas
of Redis Enterprise Software.

For disk size requirements refer to the following sections:

- [Hardware
    requirements]({{< relref "/rs/administering/designing-production/hardware-requirements.md" >}})
    for general guidelines regarding the ideal disk size each type of
    storage
- [Disk size requirements for extreme write
    scenarios]({{< relref "/rs/administering/designing-production/performance/disk-sizing-heavy-write-scenarios.md" >}})
    for special considerations when dealing with a high rate of write
    commands
