---
Title: Data persistence
description:
weight: $weight
alwaysopen: false
categories: ["RC"]
aliases: /rv/concepts/data-persistence/
         /rc/concepts/data-persistence-redis-cloud/
---
Redis Cloud supports persisting your data to disk on a per-database basis and in multiple ways.
Unlike a few cloud providers' Redis offerings,
Redis Cloud has two options for persistence: Append Only File (AOF) and Snapshot (RDB).
Data persistence is always performed over a persistent storage that is attached to the cloud instance (e.g. AWS EBS).
This ensures that there is no data lost in case of a node failure event
because the new cloud instance will be attached to the existing persistent storage volume.

Data persistence, via AOF or snapshots, is used solely to restore the
database if it fails. This is necessary as Redis is an in-memory
database and when the process stops, everything in RAM is lost. Data
persistence is optional and can be disabled.

AOF writes the latest 'write' commands into a file every second. This
file can be "replayed" in order to recover from a crash (not unlike a
traditional RDBMS's redo log).

A snapshot (RDB) on the other hand, is performed every one, six, or
twelve hours. The snapshot is a dump of the data and, though there is a
possibility of losing up to one hour of data, is dramatically faster to
recover from when compared to AOF recovery time.

Persistence can be configured either at the time of the database
creation or by editing an existing database's configuration. While the
persistence model can be changed dynamically, just know that it can take
time for your database to switch from one persistence model to the
other. It depends on what you are switching from and to, as well as
the size of your database.

{{< note >}}
For performance reasons, if you are going to be using AOF, it is
highly recommended you make sure replication is enabled for that
database as well. When these two features are enabled, persistence is done
on the slave instance and does not reduce the performance of the
master.
{{< /note >}}

## Options for configuring data persistence

The options for persistence in Redis Cloud are:

| **Options** | **Description** |
|------------|-----------------|
|  None | Data is not persisted to disk at all. |
|  Append Only File (AoF) every write | (RC Pro only) Data is fsynced to disk every write. |
|  Append Only File (AoF) every 1 second | Data is fsynced to disk every second. |
|  Snapshot every 1 hour | A snapshot of the database is created every hour. |
|  Snapshot every 6 hours | A snapshot of the database is created every 6 hours. |
|  Snapshot every 12 hours | A snapshot of the database is created every 12 hours. |

First, you should determine if you even need persistence at all.
Persistence is used to recover from a catastrophic failure, so if the
database is only being used as a cache, you may not want to incur the
overhead that comes with using persistence. If you do need persistence,
then you need to identify the best type for your use case.

## Append Only File (AOF) vs snapshot (RDB)

Use these details to determine which options best meet your needs:

| **AOF (Append Only File)** | **RDB (Snapshot)** |
|------------|-----------------|
| More resource intensive | Less resource intensive |
| Provides better durability (recover latest point in time) | Less durable |
| Slower time to recover (larger files) | Faster recovery time |
