---
Title: Geo-Distributed Active-Active Redis Applications
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Developing globally distributed applications can be challenging, as
developers have to think about race conditions and complex combinations
of events under geo-failovers and cross-region write conflicts. In Redis Enterprise Software (RS), Active-Active databases
simplify developing such applications by directly using built-in smarts
for handling conflicting writes based on the data type in use. Instead
of depending on just simplistic "last-writer-wins" type conflict
resolution, geo-distributed Active-Active databases (formerly known as CRDBs) combines techniques defined in CRDT
(conflict-free replicated data types) research with Redis types to
provide smart and automatic conflict resolution based on the data types
intent.

An Active-Active database is a globally distributed database that spans multiple Redis
Enterprise Software clusters. Each Active-Active database can have many Active-Active database instances
that come with added smarts for handling globally distributed writes
using the proven
[CRDT](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type)
approach.
[CRDT](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type)
research describes a set of techniques for creating systems that can
handle conflicting writes. CRDBs are powered by Multi-Master Replication
(MMR) provides a straightforward and effective way to replicate your
data between regions and simplify development of complex applications
that can maintain correctness under geo-failovers and concurrent
cross-region writes to the same data.

![geo replication world
map](/images/rs/crdbs.png)

Active-Active databases replicate data between multiple Redis Enterprise Software
clusters. Common uses for Active-Active databases include disaster recovery,
geographically redundant applications, and keeping data closer to your
user's locations. MMR is always multi-directional amongst the clusters
configured in the Active-Active database. For unidirectional replication, please see the
Replica Of capabilities in Redis Enterprise Software.

## Example of synchronization

In the example below, database writes are concurrent at the point in
times t1 and t2 and happen before a sync can communicate the changes.
However, writes at times t4 and t6 are not concurrent as a sync happened
in between.

|  **Time** | **CRDB Instance1** | **CRDB Instance2** |
|  ------: | :------: | :------: |
|  t1 | SET key1 “a” |  |
|  t2 |  | SET key1 “b” |
|  t3 | — Sync — | — Sync — |
|  t4 | SET key1 “c” |  |
|  t5 | — Sync — | — Sync — |
|  t6 |  | SET key1 “d” |

[Learn more about
synchronization]({{< relref "/rs/administering/designing-production/active-active.md" >}}) for
each supported data type and [how to develop]({{< relref "/rs/references/developing-for-active-active/_index.md" >}}) with them on RS.

## Terminology

1. **Active-Active database**: A
    type of Redis Enterprise Software database that spans clusters.
    There can be one or more member databases across many clusters that
    form a conflict-free replicated databases. Each local
    database can have different shard count, replica count, and other
    database options but contain identical information in steady-state.
1. **Active-Active Database Instance**: is a "member database" instance of a global Active-Active database
    which is made up of its own master and slave shards spanning a
    single cluster.
1. **Multi-master Replication (MMR):** is the multi-directional
    replication that power the efficient replication required to achieve
    active-active concurrent writes in Active-Active databases.
1. **Conflict-free Replicated Data Types (CRDT):** is the underlying
    research that describes techniques used by Redis data types in Active-Active databases
    that smartly handle conflicting concurrent writes across member
    Active-Active databases.
1. **Participating Clusters:** refers to clusters participating in the
    multi-master replication of an Active-Active database.
1. **Concurrent Writes or Concurrent Updates:** Concurrency or updates
    and writes refer to more than events that happen at the same wall
    clock time across member Active-Active databases. Concurrent updates refer to the fact
    that updates happen in between sync events that catch up member
    Active-Active databases with updates that happened on other member Active-Active databases.
