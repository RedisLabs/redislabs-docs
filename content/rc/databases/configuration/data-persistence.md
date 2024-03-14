---
Title: Data persistence
linkTitle: Data persistence
description: Data persistence enables recovery in the event of memory loss or other catastrophic failure.  Here, you learn data persistence options, when they're available, and how to apply specific settings to individual databases. 
weight: $weight
alwaysopen: false
categories: ["RC"]
aliases: /rv/concepts/data-persistence/
         /rc/concepts/data-persistence-redis-cloud/
         /rc/concepts/data-persistence/         
         /rc/concepts/data-persistence.md        
---
Redis Cloud can persist data to enable recovery in the event of memory loss or other catastrophic failure.  When you enable data persistence, in-memory data is copied to persistent storage attached to the underlying cloud instance.

## Persistence options

Data can be persisted in one of two ways:

- An _Append-Only File_ (AOF) maintains a record (sometimes called a _redo log_ or _journal_) of write operations.  This allows the data to be restored by using the record to reconstruct the database up to the point of failure.

    The AOF file records write operations made to the database; it can be updated every second or on every write (_Flexible or Annual plans only_).

- Snapshots are copies of the in-memory database, taken at periodic intervals (one, six, or twelve hours). You can restore data to the snapshot's point in time.


AOF files provide greater protection (durability) than snapshots at the cost of resources and recovery time. 
Although snapshot recovery is faster, the risk of data loss is higher, depending on the time between failure and the most recent snapshot.

{{<warning>}}
If you turn off data persistence, data is lost when the database goes down.
{{</warning>}}

## Configure data persistence 

In Redis Cloud, data persistence is a database configuration setting that can be changed by [editing your database]({{< relref "/rc/databases/view-edit-database.md" >}}) settings.

The availability of the setting depends on your plan:

- Free Redis Cloud Essentials plans do not support data persistence; the setting is disabled entirely.

- For paid Redis Cloud Essentials plans, persistence requires a standard plan and is not available for cache subscriptions.

    Use the **Plan description** setting to determine your subscription type.  You might need to change your subscription type to enable data persistence.

- Redis Cloud Pro enables data persistence settings for every database.

When enabled, you can change the **Data persistence** setting to one of the following values:

| **Options** | **Description** |
|------------|-----------------|
|  None | Data is not persisted to disk at all. |
|  Append Only File (AoF) every write | _(Redis Cloud Pro only)_ Every write is recorded (synchronized to disk using `fsync`) |
|  Append Only File (AoF) every 1 second | Record is updated every second (synchronized to disk using `fsync`)|
|  Snapshot every 1 hour | A snapshot of the database is created every hour |
|  Snapshot every 6 hours | A snapshot of the database is created every 6 hours |
|  Snapshot every 12 hours | A snapshot of the database is created every 12 hours |

When you save changes to data persistence settings, the updates are applied in the background.  This means there is a brief delay while the new settings are applied.

When replication is enabled for a database, persistence is performed against replicas (copies) to reduce performance impact on the primary (_master_) database. 

