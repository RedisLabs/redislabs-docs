---
Title: Active-Active geo-distributed Redis
linktitle: Active-Active databases
description: Overview of the Active-Active database in Redis Enterprise Software
weight: 61
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
In Redis Enterprise, Active-Active geo-distribution is based on [CRDT technology](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type)(conflict-free replicated data type).
The Redis Enterprise implementation of CRDT is called an Active-Active database (formerly known as CRDB).
With Active-Active databases, applications can read and write to the same data set from different geographical locations seamlessly and with low latency,
without changing the way the application connects to the database.

Active-Active databases also provide disaster recovery and accelerated data read-access for geographically distributed users.

Active-Active databases are build upon other Redis Enterprise [high availability features](). Each Active-Active database is made up of instances of the data; each instance is stored on an Redis Enterprise cluster. Using [replication]() and [clustering] together aids in disaster recovery. Active-Active's multi-master replication and [multiple active proxies]() provide accelerated data access for geographically distributed users.

{{< note >}}
Active-Active databases do not replicate the entire database, only the data.
Database configurations, LUA scripts, and other support info are not replicated.
{{< /note >}}

You can create Active-Active databases on Redis Enterprise Software or Redis Cloud.



## Syncer process

Each node in a cluster containing an instance of an Active-Active database hosts a process called syncer.
The syncer process:

1. Connects to the other cluster proxy
1. Reads data from that database
1. Writes the data to the master shard of that database

Some replication capabilities are also included in [open source redis](https://redis.io/topics/replication).

The Master at the top of the master-replica tree creates a replication ID.
This replication ID is identical for all replicas in that tree.
When a new master is appointed, the replication ID changes but a partial sync from the previous ID is still possible.
In a partial sync, the backlog of operations since the offset are transferred as raw operations.
In a full sync, the data from the master is transferred to the replica as an RDB file which is followed by a partial sync.

Partial synchronization requires a backlog large enough to store the data operations until connection is restored.

### Syncer in Active-Active Replication

In the case of an Active-Active database:

- Multiple past replication IDs and offsets are stored to allow for multiple syncs
- The Active-Active backlog is also sent to the replica during a full sync

{{< warning >}}
Full sync triggers heavy data transfers between geo-replicated instances of an Active-Active database.
{{< /warning >}}

The scenarios in which an Active-Active database updates to other instances use partial synchronization are:

- Failover of master shard to replica shard
- Restart or crash of replica shard that requires sync from master
- Migrate replica shard to another node
- Migrate master shard to another node as a replica using failover and replica migration
- Migrate master shard and preserve roles using failover, replica migration, and second failover to return shard to master

{{< note >}}
Synchronization of data from the master shard to the replica shard is always a full synchronization.
{{< /note >}}
