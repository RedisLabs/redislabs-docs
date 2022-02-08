---
Title: Enterprise feature compatibility for Redis modules
linkTitle: Enterprise feature compatibility
description: Describes the Redis Enterprise features supported by each Redis module.
weight: 8
alwaysopen: false
categories: ["Modules"]
aliases: /modules/enterprise-capabilities/
         /modules/enterprise-capabilities.md
---

This article describes Redis Enterprise feature compatibility for Redis modules.  Version numbers indicate the minimum module version required for feature support.  Footnotes provide additional information as needed.

## Redis Enterprise module support

The following table shows which modules are supported by Redis Enterprise Software and Redis Enterprise Cloud.

| Module | Redis Enterprise<br/>Software | Redis Enterprise<br/>Cloud |
|--------|:-------------------------:|:-----------------------:|
| [RediSearch]({{<relref "/modules/redisearch">}}) | Yes | Yes |
| [RedisJSON]({{<relref "/modules/redisjson">}})   | Yes | Yes |
| [RedisGraph]({{<relref "/modules/redisgraph">}}) | Yes | Yes |
| [RedisTimeSeries]({{<relref "/modules/redistimeseries">}}) | Yes | Yes |
| [RedisGears]({{<relref "/modules/redisgears">}}) | Yes | No |
| [RedisBloom]({{<relref "/modules/redisbloom">}}) | Yes | Yes |
| [RedisAI]({{<relref "/modules/redisai">}})       | Yes | No |

## Module feature support

The following tables show feature support for each Redis module.  

Version numbers indicate when the feature was first supported.  If you're using an earlier version than what's shown in the table, the feature is not supported.

For details about individual modules, see the corresponding documentation.

| Feature name/capability | [RediSearch]({{< relref  "/modules/redisearch" >}}) | [RedisJSON]({{< relref  "/modules/redisjson" >}})    |  [RedisGraph]({{< relref  "/modules/redisgraph" >}})   | 
|-------------------------|:--------------:|:------------:|:------------:|
| Active-Active (CRDB)    | Yes (v2.0)     | No           | No           |
| Backup/Restore          | Yes (v1.4)     | Yes (v1.0)   | Yes (v1.0)   |
| Clustering              | Yes (v1.6)     | Yes (v1.0)   | Yes (v2.2.3)[^1] |
| Custom hashing policy   | Yes (v2.0)     | Yes (v1.0)   | Yes (v1.0)   |
| Eviction expiration     | Yes (v2.0)     | Yes (v1.0)   | No           |
| Failover/migration      | Yes (v1.4)     | Yes (v1.0)   | Yes (v1.0)   |
| Internode encryption    | Yes (v2.0.11)  | Yes (v1.0.8) | Yes (v2.4)   |
| Module datatypes        | Yes            | Yes          | Yes          |
| Persistence (AOF)       | Yes (v1.4)     | Yes (v1.0)   | Yes (v2.0)   |
| Persistence (snapshot)  | Yes (v1.6)     | Yes (v1.0)   | Yes (v1.0)   |
| Redis on Flash (RoF)    | Yes (v2.0)     | Yes (v1.0)   | No           |
| Replica Of              | Yes (v1.6)[^2] | Yes (v1.0)   | Yes (v2.2)   |
| Reshard/rebalance       | Yes (v2.0)     | Yes (v1.0)   | No           |

[^1]: The RedisGraph module supports clustering; however, individual graphs contained in a key reside in a single shard, which can affect pricing.  To learn more, [contact support](https://redis.com/company/support/).

| Feature name/capability | [RedisTimeSeries]({{< relref  "/modules/redistimeseries" >}}) | [RedisGears]({{< relref  "/modules/redisgears" >}}) | [RedisBloom]({{< relref  "/modules/redisbloom" >}}) | [RedisAI]({{< relref "/modules/redisai" >}}) |
|-------------------------|:------------:|:----------:|:------------:|:----------:| 
| Active-Active (CRDB)    | No           | Yes (v1.0) | No           | No         | 
| Backup/Restore          | Yes (v1.2)   | Yes (v1.0) | Yes (v2.0)   | Yes (v1.0) | 
| Clustering              | Yes (v1.2)   | Yes (v1.0) | Yes (v2.0)   | Yes (v1.0) | 
| Custom hashing policy   | Yes (v1.2)   | Yes (v1.0) | Yes (v2.0)   | Yes (v1.0) | 
| Eviction expiration     | Yes (v1.2)   | Yes (v1.0) | Yes (v2.0)   | Yes (v1.0) | 
| Failover/migration      | Yes (v1.2)   | Yes (v1.0) | Yes (v2.0)   | Yes (v1.0) | 
| Internode encryption    | Yes (v1.4.9) | Yes (v1.2) | Yes (v2.2.6) | Yes (v1.2) | 
| Module datatypes        | Yes          | Yes        | Yes          | Yes        | 
| Persistence (AOF)       | Yes (v1.2)   | Yes (v1.0) | Yes (v2.0)   | Yes (v1.0) | 
| Persistence (snapshot)  | Yes (v1.2)   | Yes (v1.0) | Yes (v2.0)   | Yes (v1.0) | 
| Redis on Flash (RoF)    | No           | Yes (vTBD) | Yes (vTBD)   | No         | 
| Replica Of              | Yes (v1.2)   | No         | Yes (v2.0)   | Yes (v1.0) | 
| Reshard/rebalance       | Yes (v1.2)   | Yes (v1.0) | Yes (v2.0)   | No         | 

[^2]: In version 1.6, RediSearch supported Replica Of only between databases with the same number of shards.  This limitation was fixed in v2.0. 

## Feature descriptions

The following table briefly describes each feature shown in the earlier tables.

| Feature name/capability | Description |
|-------------------------|-------------|
| Active-Active (CRDB)    | Compatible with Active-Active (CRDB) databases  |
| Backup/Restore          | Supports import and export features |
| Clustering              | Compatible with sharded databases and shard migration |
| Custom hashing policy   | Compatible with databases using custom hashing policies |
| Eviction expiration     | Allows data to be evicted when the database reaches memory limits |
| Failover/migration      | Compatible with primary/replica failover and the migration of shards between nodes within the cluster |
| Internode encryption    | Compatible with encryption on the data plane |
| Persistence (AOF)       | Compatible with databases using AoF persistence |
| Persistence (snapshot)  | Compatible with databases using snapshot persistence | 
| Redis on Flash (RoF)    | Compatible with Redis on Flash (RoF) |
| Replica Of              | Compatible with Active-Passive replication | 
| Reshard/rebalance       | Compatible with database scaling for clustered databases, which redistributes data between the new shards. |

<!-- 
    Individual footnotes are rendered below the following heading.  
    Thus, any additional sections need to be placed above this comment.
-->
## Footnotes
