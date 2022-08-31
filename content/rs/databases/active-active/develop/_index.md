---
Title: Active-Active Redis applications
linktitle: Develop applications
description: General information to keep in mind while developing applications for an Active-Active database.
weight: 99
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/concepts/intercluster-replication.md,
    /rs/concepts/intercluster-replication/,
    /rs/databases/active-active/intercluster-replication.md,
    /rs/databases/active-active/intercluster-replication/,
    /rs/databases/active-active/develop/,
]
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
synchronization]({{< relref "/rs/databases/active-active/_index.md" >}}) for
each supported data type and [how to develop]({{< relref "/rs/databases/active-active/develop/develop-for-aa.md" >}}) with them on Redis Enterprise Software.
