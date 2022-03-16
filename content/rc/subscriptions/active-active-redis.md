---
Title: Active-Active Redis
description: Overview of the Active-Active feature for Redis Cloud.
weight: 30
alwaysopen: false
categories: ["RC"]
aliases:

---

When you create a new subscription on Redis Cloud, you configure your subscription with Active-Active Redis under the Advanced options tab.

Redis Enterprise Active-Active databases provide better scalability, performance, and availability than standalone databases. Active-Active databases use geo-distribution, multiple active proxies, conflict resolution, and automatic failover to provide you with a more durable and scalable database.

Redis Enterprise Active-Active geo-replication distributes your replicated data across multiple nodes and availability zones. This increases the durability of your database by reducing the likelihood of data or availability loss.

Active-Active databases use conflict-free data types (CRDTs) that allow reads and writes to be distributed across multiple zones with automatic conflict resolution.

## Replication

Replicating your database creates copies of each database instance (shard). Your database will then have one primary shard, and one or more replica shards. The primary handles both writes and reads from users. The replicas receive copies of changes from the primary to stay consistent with the primary.

When a primary shard fails, Redis Enterprise automatically promotes the replica shard to primary. When the failed shard comes back into a stable state, the data is copied to it and it becomes the new replica

## Clustering

Clustering (or sharding) breaks your database into individual instances (shards) that are then spread across several nodes. As you increase the number of shards, your throughput and memory will also increase. Scaling out this way lets you increase memory for your database by adding shards to your cluster.

Clustering also helps stop node failure from causing data availability loss. The cluster automatically syncs between nodes to make sure the replicas are up to date with their primary shards, even if they don’t reside on the same node.

## Active-Active geo-distributed replication

### Multi-zone

Geo-distributed replication maintains copies of both primary and replica shards in multiple clusters. These clusters can be spread across multiple availability zones as well.

### Multiple active proxies

Active-Active databases use a multi-primary architecture, which lets you read and write to a primary shard in any of your participating clusters. Having multiple active proxies allows users to connect to the cluster closest to them, reducing latency.

### Conflict resolution

### Automatic failover
