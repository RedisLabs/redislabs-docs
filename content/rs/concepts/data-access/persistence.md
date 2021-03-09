---
Title: Database Persistence with Redis Enterprise Software
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
All data is stored and managed exclusively in either RAM or RAM + Flash
Memory ([Redis on
Flash]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}}))
and therefore, is at risk of being lost upon a process or server
failure. As Redis Enterprise Software is not
just a caching solution, but also a full-fledged database,
[persistence](https://redislabs.com/redis-enterprise/technology/durable-redis-2/) to disk
is critical. Therefore, Redis Enterprise Software supports persisting
data to disk on a per-database basis and in multiple ways.

There are two options for persistence:

1. Append Only File (AOF) - A continuous writing of data to disk
1. Snapshot (RDB) - An automatic periodic snapshot writing to disk

Data persistence, via either mechanism, is used solely to rehydrate the
database if the database process fails for any reason. It is not a
replacement for backups, but something you do in addition to backups.
To disable data persistence, select **None**.

AOF writes the latest 'write' commands into a file every second, it 
resembles a traditional RDBMS's redo log, if you are familiar with that. 
This file can later be 'replayed' in order to recover from a crash.

A snapshot (RDB) on the other hand, is performed every one, six, or twelve
hours. The snapshot is a dump of the data and while there is a potential
of losing up to one hour of data, it is dramatically faster to recover
from a snapshot compared to AOF recovery.

[Persistence](https://redislabs.com/redis-enterprise/technology/durable-redis-2/) can be
configured either at time of database creation or by editing an existing
database's configuration. While the persistence model can be changed
dynamically, just know that it can take time for your database to switch
from one persistence model to the other. It depends on what you are
switching from and to, but also on the size of your database.

{{< note >}}
For performance reasons, if you are going to be using AOF,
it is highly recommended to make sure replication is enabled for that database as well.
When these two features are enabled, persistence is performed on the database slave
and does not impact performance on the master.
{{< /note >}}

## Options for configuring data persistence

There are six options for persistence in Redis Enterprise Software:

|  **Options** | **Description** |
|  ------ | ------ |
|  None | Data is not persisted to disk at all. |
|  Append Only File (AoF) on every write | Data is fsynced to disk with every write. |
|  Append Only File (AoF) one second | Data is fsynced to disk every second. |
|  Snapshot every 1 hour | A snapshot of the database is created every hour. |
|  Snapshot every 6 hours | A snapshot of the database is created every 6 hours. |
|  Snapshot every 12 hours | A snapshot of the database is created every 12 hours. |

The first thing you need to do is determine if you even need
persistence. Persistence is used to recover from a catastrophic failure,
so make sure that you need to incur the overhead of persistence before
you select it. If the database is being used as a cache, then you may
not need persistence. If you do need persistence, then you need to
identify which is the best type for your use case.

## Append only file (AOF) vs snapshot (RDB)

Now that you know the available options, to assist in making a decision
on which option is right for your use case, here is a table about the
two:

|  **Append Only File (AOF)** | **Snapshot (RDB)** |
|------------|-----------------|
|  More resource intensive | Less resource intensive |
|  Provides better durability (recover the latest point in time) | Less durable |
|  Slower time to recover (Larger files) | Faster recovery time |
|  More disk space required (files tend to grow large and require compaction) | Requires less resource (I/O once every several hours and no compaction required) |

## Data persistence and Redis on Flash

If you are enabling data persistence for databases running on Redis
Enterprise Flash, by default both master and slave shards are
configured to write to disk. This is unlike a standard Redis Enterprise
Software database where only the slave shards persist to disk. This
master and slave dual data persistence with replication is done to
better protect the database against node failures. Flash-based databases
are expected to hold larger datasets and repair times for shards can
be longer under node failures. Having dual-persistence provides better
protection against failures under these longer repair times.

However, the dual data persistence with replication adds some processor
and network overhead, especially in the case of cloud configurations
with persistent storage that is network attached (e.g. EBS-backed
volumes in AWS).

There may be times where performance is critical for your use case and
you don't want to risk data persistence adding latency. If that is the
case, you can disable data-persistence on the master shards using the
following *rladmin* command:

```sh
rladmin tune db <database_ID_or_name> master_persistence disabled
```
