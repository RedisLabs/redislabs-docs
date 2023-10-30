---
Title: Active-Active Redis
description: Overview of the Active-Active feature for Redis Cloud.
weight: 05
alwaysopen: false
categories: ["RC"]
aliases: [
    "/rc/subscriptions/active-active-redis/",
    "/rc/subscriptions/active-active-redis.md"
]

---

Active Active databases store data across multiple regions and availability zones.  This improves scalability, performance, and availability, especially when compared to standalone databases.
To create Active Active databases, you need a Flexible (or Annual) [Redis Enterprise Cloud]({{<relref "/rc/subscriptions/create-active-active-subscription">}}) subscription that enables Active-Active Redis and defines the regions for each copy of your databases.  This is defined when you [create a new subscription]({{<relref "rc/subscriptions/create-flexible-subscription">}}).

Active Active databases are distributed across multiple regions (geo-distribution).  This improves performance by reducing latency for nearby users and improves availability by protecting against data loss in case of network or resource failure.

Active Active databases allow read and write operations in each copy.  Each copy eventually reflects changes made in other copies ([eventual consistency]({{<relref "/glossary#eventual-consistency">}})).  Conflict-free data types (CRDTs) synchronize read and write operations between copies.  CRDTs ensure consistency and resolve conflicts.

## Active Active geo-distributed replication highlights

### Multi-zone

Geo-distributed replication maintains copies of both primary and replica shards in multiple clusters. These clusters can be spread across multiple availability zones. Active-Active Redis uses zone awareness to spread your primary and replica shards across zones, which helps protect against data loss from regional outages.

### Local latency with unique endpoints

Applications can specify which copy of the database to connect to allowing for local latency.  This is done by specifying the desired database's unique endpoint in your application configuration.  Each database is a full copy of the data with read and write permissions and will sync data to all database copies in the participating Active Active clusters. 

### Conflict resolution

Active Active databases use special data types called conflict-free data types (CRDT). These automatically resolve conflicts that occur when writes are made to different clusters at the same time.

### Failover handling

After a failure at the process, node, or zone level, Active-Active databases automatically promote replica shards to replace failed primaries, copy data to new replica shards, and migrate shards to new nodes as needed. This reduces downtime and makes the most of your computing resources, even in the event of a failure.  

Active Active also provides a failover opportunity in the event an entire cluster fails.  Applications that are connected to a cluster in a state of failure can be programmed to redirect traffic to a non-failed state Active Active connected cluster.  When the original cluster recovers, the application can direct traffic back to the original cluster.  Redirecting the application traffic to alternate clusters is not handled automatically by Active Active.  However, data will automatically sync to the recovered clusters when it returns to a healthy state.