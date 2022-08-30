---
Title: Durability and high availability
linktitle: Durability and availability
description: Overview of Redis Enterprise durability features such as replication, clustering, and rack-zone awareness. 
weight: 62
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/concepts/high-availability/_index.md,
    /rs/concepts/high-availability/,
    /rs/databases/durability-ha.md,
    /rs/databases/durability-ha/,
    /rs/databases/essentials/durability-ha,
    /rs/databases/essentials/durability-ha.md,

]
---
Redis Enterprise Software comes with several features that make your data more durable and accessible. The following features can help protect your data in cases of failures or outages and help keep your data available when you need it.

## [Replication]({{<relref "/rs/databases/essentials/replication.md">}})

When you replicate your database, each database instance (shard) is copied one or more times. Your database will then have one primary shard, and one or more replica shards. The primary handles both writes and reads from users. The replicas receive copies of changes from the primary to stay consistent with the primary.

When a primary shard fails, Redis Enterprise automatically promotes the replica shard to primary. When the failed shard comes back into a stable state, the data is copied to it and it becomes the new replica.

For more details, see [Replication]({{<relref "/rs/databases/essentials/replication.md">}}).

## [Clustering]({{<relref "/rs/databases/essentials/clustering.md">}})

Clustering (or sharding) breaks your database into individual instances (shards) that are then spread across several nodes. As you increase the number of shards, your throughput and memory will also increase. Scaling out this way allows you to scale your database as you add computing and resources to your cluster.

Clustering also helps stop node failure from causing data availability loss. The cluster automatically syncs between nodes to make sure the replicas are up to date with their primary shards, even if they don’t reside on the same node.

For more details, see [Clustering]({{<relref "/rs/databases/essentials/clustering.md">}}).

## [Database persistence]({{<relref "/rs/databases/configure/database-persistence.md">}})

Database persistence gives your database durability against process or server failures by persisting data information to disk at set intervals. There are two persistence strategies available for each database: append-only files (AoF) and snapshots. Snapshots write a snapshot of your database to disk at set intervals of time (every 1, 6, or 12 hours). Append-only files append new write operations to a file after every write or every second.

For more details, see [Database persistence]({{<relref "/rs/databases/configure/database-persistence.md">}}).

## [Active-Active geo-distribution]({{<relref "/rs/databases/active-active/_index.md">}})

Redis Enterprise Active-Active geo-replication distributes your replicated data across multiple nodes and availability zones. This increases the durability of your database by reducing the likelihood of data or availability loss. It also reduces the latency of your data access.

For more details, see [Active-Active geo-distributed Redis]({{<relref "/rs/databases/active-active/_index.md">}}).

## [Rack-zone awareness]({{<relref "/rs/clusters/configure/rack-zone-awareness.md">}})

Rack-zone awareness maps each node in your Redis Enterprise cluster to a physical rack or logical zone. The cluster then uses that information to distribute primary shards and their replica shards in different racks or zones. This protects your data and ensures data availability if there is rack or zone failure.

For more details, see [Rack-zone awareness]({{<relref "/rs/clusters/configure/rack-zone-awareness.md">}}).