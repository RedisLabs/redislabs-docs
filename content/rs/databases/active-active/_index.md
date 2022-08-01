---
Title: Active-Active geo-distributed Redis
linktitle: Active-Active 
description: Overview of the Active-Active database in Redis Enterprise Software
weight: 65
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/administering/intercluster-replication/crdbs/,
    /rs/administering/active-active/,
    /rs/administering/designing-production/active-active.md,
    /rs/administering/designing-production/active-active/,
    /rs/databases/active-active/,
    /rs/databases/active-active/_index.md,
    /rs/databases/active-active/_index/,
    ]
---
In Redis Enterprise, Active-Active geo-distribution is based on [CRDT technology](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type).
The Redis Enterprise implementation of CRDT is called an Active-Active database (formerly known as CRDB).
With Active-Active databases, applications can read and write to the same data set from different geographical locations seamlessly and with latency less than one millisecond (ms),
without changing the way the application connects to the database.

Active-Active databases also provide disaster recovery and accelerated data read-access for geographically distributed users.

{{< note >}}
Active-Active databases do not replicate the entire database, only the data.
Database configurations, LUA scripts, and other support info are not replicated.
{{< /note >}}

## High availability

The [high availability]({{<relref "/rs/databases/durability-ha.md">}}) that Active-Active replication provides is built upon a number of Redis Enterprise Software’s features (such as [clustering]({{<relref "/rs/databases/configure/clustering.md">}}), [replication]({{<relref "/rs/databases/configure/replication.md">}}), and [replicaHA]({{<relref "/rs/databases/configure/replica-ha.md">}})) as well as some features unique to Active-Active ([multi-primary replication]({{<relref "#multi-primary-replication/">}}), [automatic conflict resolution]({{<relref "#conflict-resolution/">}}), and [strong eventual consistency]({{<relref "#strong-eventual-consistency/">}})).

Clustering and replication are used together in Active-Active databases to distribute multiple copies of the dataset across multiple nodes and multiple clusters. This helps reduce the risk of a node or cluster becoming a single point of failure. If a primary node or primary shard fails, a replica will automatically be promoted to primary. The [replicaHA]({{<relref "/rs/databases/configure/replica-ha.md">}}) feature (enabled by default), will automatically migrate replica shards to available nodes to avoid one node holding all copies of certain data.

## Multi-primary replication

In Redis Enterprise Software, replication copies data from primary shards to replica shards. Active-Active geo-distributed replication also copies both primary and replica shards to other clusters. Each Active-Active database needs to span at least two clusters; these are called participating clusters.

Each participating cluster hosts an instance of your database, and each instance has its own primary node. Having multiple primary nodes means you can connect to the proxy in any of your participating clusters. Connecting to the closest cluster geographically enables near-local latency. Multi-primary replication (previous referred to as multi-master replication) also means that your users still have access to the database if one of the participating clusters fails.

{{< note >}}
Active-Active databases do not replicate the entire database, only the data.
Database configurations, LUA scripts, and other support info are not replicated.
{{< /note >}}

## Syncer

Keeping multiple copies of the dataset consistent across multiple clusters is no small task. Redis Active-Active geo-distributed replication uses a process called the [syncer]({{<relref "content/rs/databases/active-active/syncer.md">}}), to achieve consistency between participating clusters.

The syncer keeps a [replication backlog]({{<relref "">}}), which stores changes to the dataset that the syncer sends to other participating clusters. The syncer uses partial syncs to keep replicas up to date with changes, or a full sync in the event a replica or primary is lost.

## Conflict resolution

Because you can connect to any participating cluster to perform a write operation, concurrent and conflicting writes are always possible. Conflict resolution is an important part of the Active-Active technology. Active-Active databases only use [conflict-free replicated data types (CRDTs)](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type). These data types provide a predictable conflict resolution and don't require any additional work from the application or client side.

There are some important differences to consider when developing with CRDTs for Active-Active databases. See [Develop applications with Active-Active databases]({{<relref "/rs/databases/active-active/develop/_index.md">}}) for more detail.


## Strong eventual consistency

Maintaining strict strong consistency for replicated databases comes with trades off in scalability and availability. Redis Active-Active databases use a strong eventual consistency model, which means that local values may differ across replicas for short periods of time, but they will all eventually converge to one consistent state. Redis uses vector clocks and the CRDT conflict resolution to strengthen consistency between replicas. You can also enable the causal consistency feature to preserve the order of operations as they are synchronized among replicas.

Other Redis Enterprise Software features can also be used to enhance the performance, scalability, or durability of your Active-Active database. These include [data persistence]({{<relref "/rs/databases/configure/database-persistence.md">}}), [multiple active proxies]({{<relref "/rs/databases/configure/proxy-policy.md">}}), [distributed synchronization]({{<relref "/rs/databases/active-active/synchronization-mode.md">}}), [the OSS Cluster API]({{<relref "/rs/databases/configure/enable-oss-cluster-api.md">}}), and [rack-zone awareness]({{<relref "/rs/clusters/configure/rack-zone-awareness.md">}}).

## Next steps

- [Plan your Active-Active deployment]({{<relref "/rs/databases/active-active/aa-planning.md">}})
- [Get Started with Active-Active]({{<relref "/rs/databases/active-active/get-started-active-active.md">}})
- [Create an Active-Active database]({{<relref "/rs/databases/active-active/create-active-active.md">}})