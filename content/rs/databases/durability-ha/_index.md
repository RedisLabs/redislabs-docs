---
Title: Durability and high availability
linktitle: Durability and availability
description: Overview of Redis Enterprise durability features such as replication, clustering, and rack-zone awareness. 
weight: 60
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/concepts/high-availability/_index.md,
    /rs/concepts/high-availability/,
    /rs/databases/durability-ha/,
    /rs/databases/configure/durability-ha.md,
    /rs/databases/configure/durability-ha/,
    /rs/databases/durability-ha/,

]
---
Redis Enterprise Software comes with several features that make your data more durable and accessible. The following features can help protect your data in cases of failures or outages and help keep your data available when you need it.

## [Replication]({{<relref "/rs/databases/durability-ha/replication.md">}})

When you replicate your database, each database instance (shard) is copied one or more times. Your database will have one primary shard and one or more replica shards. When a primary shard fails, Redis Enterprise automatically promotes a replica shard to primary. 

## [Clustering]({{<relref "/rs/databases/durability-ha/clustering.md">}})

Clustering (or sharding) breaks your database into individual instances (shards) and spreads them across several nodes. Clustering lets you add resources to your cluster to scale your database and prevents node failures from causing availability loss.

## [Database persistence]({{<relref "/rs/databases/configure/database-persistence.md">}})

Database persistence gives your database durability against process or server failures by saving data to disk at set intervals.

## [Active-Active geo-distributed replication]({{<relref "/rs/databases/active-active/_index.md">}})

Redis Enterprise Active-Active distributes your replicated data across multiple nodes and availability zones. This increases the durability of your database by reducing the likelihood of data or availability loss. It also reduces the latency of your data access.

## [Rack-zone awareness]({{<relref "/rs/clusters/configure/rack-zone-awareness.md">}})

Rack-zone awareness maps each node in your Redis Enterprise cluster to a physical rack or logical zone. The cluster uses this information to distribute primary shards and their replica shards in different racks or zones. This ensures data availability if a rack or zone fails.

## [Discovery service]({{<relref "/rs/databases/durability-ha/discovery-service.md">}})

The discovery service provides an IP-based connection management service used when connecting to Redis Enterprise Software databases. It lets your application discover which node hosts the database endpoint. The discovery service API complies with the [Redis Sentinel API](https://redis.io/docs/management/sentinel/#sentinel-api).