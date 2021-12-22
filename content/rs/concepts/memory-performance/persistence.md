---
Title: Database persistence with Redis Enterprise Software
linktitle: Database persistence
description:
weight: 30
alwaysopen: false
categories: ["RS"]
aliases: [
        /rs/concepts/data-access/persistence.md,
        /rs/concepts/data-access/persistence/,
        /rs/concepts/memory-performance/persistence.md,
        /rs/concepts/memory-performance/persistence/,
]
---
All data is stored and managed exclusively in either RAM or RAM + Flash Memory ([Redis on
Flash]({{< relref "/rs/concepts/memory-performance/redis-flash.md" >}})) and therefore, is at risk of being lost upon a process or server
failure. As Redis Enterprise Software is not just a caching solution, but also a full-fledged database, [persistence](https://redislabs.com/redis-enterprise/technology/durable-redis-2/) to disk
is critical. Therefore, Redis Enterprise Software supports persisting data to disk on a per-database basis and in multiple ways.

[Persistence](https://redislabs.com/redis-enterprise/technology/durable-redis-2/) can be configured either at time of database creation or by editing an existing
database's configuration. While the persistence model can be changed dynamically, just know that it can take time for your database to switch from one persistence model to the other. It depends on what you are switching from and to, but also on the size of your database.

## Options for configuring data persistence

There are six options for persistence in Redis Enterprise Software:

|  **Options** | **Description** |
|  ------ | ------ |
|  None | Data is not persisted to disk at all. |
|  Append Only File (AoF) on every write | Data is fsynced to disk with every write. |
|  Append Only File (AoF) one second | Data is fsynced to disk every second. |
|  Snapshot every 1 hour | A snapshot of the database is created every hour. |
|  Snapshot every 6 hours | A snapshot of the database is created every 6 hours. |
|  Snapshot every 12 hours | A snapshot of the database is created every 12 hours. |

## Selecting a persistence strategy

When selecting your persistence strategy, you should take into account your tolerance for data loss and performance needs. There will always be tradeoffs between the two.
The fsync() system call syncs data from file buffers to disk. You can configure how often Redis performs an fsync() to most effectively make tradeoffs between performance and durability for your use case.
Redis supports three fsync policies: every write, every second, and disabled.

Redis also allows snapshots through RDB files for persistence. Within Redis Enterprise, you can configure both snapshots and fsync policies.

For any high availability needs, replication may also be used to further reduce any risk of data loss and is highly recommended.

**For use cases where data loss has a high cost:**

1. Append-only file (AOF) - Fsync every everywrite - Redis Enterprise sets the open-source Redis directive `appendfsyncalways`.  With this policy, Redis will wait for the write and the fsync to complete prior to sending an acknowledgement to the client that the data has written. This introduces the performance overhead of the fsync in addition to the execution of the command. The fsync policy always favors durability over performance and should be used when there is a high cost for data loss.

**For use cases where data loss is tolerable only limitedly:**

1. Append-only file (AOF) - Fsync every 1 sec - Redis will fsync any newly written data every second. This policy balances performance and durability and should be used when minimal data loss is acceptable in the event of a failure. This is the default Redis policy. This policy could result in between 1 and 2 seconds worth of data loss but on average this will be closer to one second.

{{< note >}}
For performance reasons, if you are going to be using AOF, it is highly recommended to make sure replication is enabled for that database as well. When these two features are enabled, persistence is
performed on the database slave and does not impact performance on the master.
{{< /note >}}

**For use cases where data loss is tolerable or recoverable for extended periods of time:**

1. Snapshot, every 1 hour - Sets a full backup every 1 hour.
1. Snapshot, every 6 hour - Sets a full backup every 6 hours.
1. Snapshot, every 12 hour - Sets a full backup every 12 hours.
1. None - Does not backup or persist data at all.

## Append-only file (AOF) vs snapshot (RDB)

Now that you know the available options, to assist in making a decision
on which option is right for your use case, here is a table about the
two:

|  **Append-only File (AOF)** | **Snapshot (RDB)** |
|------------|-----------------|
|  More resource intensive | Less resource intensive |
|  Provides better durability (recover the latest point in time) | Less durable |
|  Slower time to recover (Larger files) | Faster recovery time |
|  More disk space required (files tend to grow large and require compaction) | Requires less resource (I/O once every several hours and no compaction required) |

## Configuring persistence for your database

1. In **databases**, either:
        - Click **Add** (+) to create a new database.
        - Click on the database that you want to configure and at the bottom of the page click edit.
1. Navigate to Persistence
1. Select your database persistence option
1. Select save or update

{{< video "/images/rs/persistence.mp4" "Persistence" >}}

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
following `rladmin` command:

```sh
rladmin tune db <database_ID_or_name> master_persistence disabled
```
