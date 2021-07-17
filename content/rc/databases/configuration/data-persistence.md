---
Title: Data Persistence
description: Data persistence enables recovery in the event of memory loss or other catastrophic failure.  Here, you learn data persistence options, when they're available, and how to apply specific settings to individual databases. 
weight: $weight
alwaysopen: false
categories: ["RC"]
aliases: /rv/concepts/data-persistence/
         /rc/concepts/data-persistence-redis-cloud/
         /rc/concepts/data-persistence/         
         /rc/concepts/data-persistence.md        
---
Redis Enterprise Cloud can persist data to enable recovery in the event of memory loss or other catastrophic failure.  When you enable data persistence, in-memory data is copied to persistent storage attached to the underlying cloud instance.

## Persistence options

Data can be persisted in one of two ways:

- An _Append-Only File_ (AOF) maintains a record (sometimes called a _redo log_ or _journal_) of write operations.  This allows the data to be restored by using the record to reconstruct the database up to the point of failure.

    The AOF file records write operations made to the database; it can be updated every second or on every write (_Flexible or Annual plans only_).  

    AOF files allow recovery nearly to the point of failure; however, recovery takes longer as the database is reconstructed from the record.

- Snapshots are copies of the in-memory database, taken at periodic intervals (one, six, or twelve hours).  

    Snapshot recovery is faster, however, there's a greater risk of data loss depending on the time between failure and the most recent snapshot.
    
AOF files require more resources than snapshots; they provide greater protection (durability) at the cost of resources and recovery time.  Snapshots provide faster recovery while risking greater data loss.

Data persistance can be also disabled.  In such cases, data is lost when the database goes down.

## Configure data persistence 

In Redis Enterprise Cloud, data persistence is a database configuration setting that can be changed by editing your database settings.

The availability of the setting depends on your [subscription]({{<relref "/rc/subscriptions/_index.md">}}):

- Free subscriptions do not support data persistence; the setting is disabled entirely.

- For Fixed plans, persistence requires a standard plan and is not available for cache subscriptions.

    Use the **Plan description** setting to determine your subscription type.  You might need to change your subscription type to enable data persistence.

- Flexible and Annual plans enable data persistence settings for every database.

When enabled, you can change the **Data persistence** setting to one of the following values:

| **Options** | **Description** |
|------------|-----------------|
|  None | Data is not persisted to disk at all. |
|  Append Only File (AoF) every write | _(Flexible and Annual subscriptions only)_ Every write is recorded (synchronized to disk using `fsync`) |
|  Append Only File (AoF) every 1 second | Record is updated every second (synchronized to disk using `fsync`)|
|  Snapshot every 1 hour | A snapshot of the database is created every hour |
|  Snapshot every 6 hours | A snapshot of the database is created every 6 hours |
|  Snapshot every 12 hours | A snapshot of the database is created every 12 hours |

When you save changes to data persistence settings, the updates are applied in the background.  This means there is a brief delay while the new settings are applied.

When replication is enabled for a database, persistence is performed against replicas (copies) to reduce performance impact on the primary (_master_) database. 

