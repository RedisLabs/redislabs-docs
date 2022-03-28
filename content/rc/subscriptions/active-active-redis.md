---
Title: Active-Active Redis
description: Overview of the Active-Active feature for Redis Cloud.
weight: 35
alwaysopen: false
categories: ["RC"]
aliases:

---

Active-Active databases store data across multiple regions and availability zones.  This improves scalability, performance, and availability, especially when compared to standalone databases.
To create Active-Active databases, you need a Flexible (or Annual) Redis Enterprise Cloud subscription that enables Active-Active Redis and defines the regions for each copy of your databases.  This is defined when you create a new subscription.

Active-Active databases are distributed across multiple regions (geo-distribution).  This improves performance by reducing latency for nearby users and improves availability by protecting against data loss in case of network or resource failure.

Active-Active databases allow read and write operations in each copy.  Each copy eventually reflects changes made in other copies (consistency).  Conflict-free data types (CRDTs) synchronize read and write operations between copies.  CRDTs ensure consistency and resolve conflicts.

## Active-Active geo-distributed replication

Active-Active databases use both clustering and replication to strengthen your database. Active-Active Redis also has additional features like geo-distribution, multiple active proxies, conflict resolution, and automatic failover to provide you with a more durable and scalable database.

### Multi-zone

Geo-distributed replication maintains copies of both primary and replica shards in multiple clusters. These clusters can be spread across multiple availability zones as well. Active-Active Redis uses zone awareness to spread your primary and replica shards across zones, which helps protect against data loss from regional outages.

### Multiple active proxies

Active-Active databases use a multi-primary architecture, which lets you read and write to a primary shard in any of your participating clusters. Having multiple active proxies allows users to connect to the cluster closest to them, reducing latency.

### Conflict resolution

Active-Active databases use special data types called conflict-free data types (CRDT). These automatically resolve conflicts that occur when writes are made to different clusters at the same time.

### Automatic failover

After a failure at any level (process, node, or zone), Active-Active databases automatically promote replica shards to replace failed primaries, copy data to new replica shards, and migrate shards to new nodes as needed. This reduces downtime and makes the most of your computing resources, even in the event of a failure.  
