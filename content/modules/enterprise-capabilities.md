---
Title: Enterprise feature support
description: Describes the Redis Enterprise features supported by each Redis module.
weight: 8
alwaysopen: false
categories: ["Modules"]
aliases: /modules/packaging
---

While Redis modules support all features of open-source Redis, not every module is able to support all features of Redis Enterprise Software or Redis Enterprise Cloud.  In addition, each module gets new features over time.

Here, you'll find a list of common Redis Enterprise features and whether or not individual modules support those features.  Version numbers indicate the module version required for feature support.  Footnotes provide additional information as needed.

## Module feature support

The following tables show feature support for each Redis module.  

Version numbers indicate when the feature was supported.  If you're using an earlier version than shown in the table, the feature is not supported.

For details about individual modules, see the corresponding documentation.

| Feature name/capability | [RedisAI]({{< relref  "/modules/redisai" >}}) | [RedisBloom]({{< relref  "/modules/redisbloom" >}})  | [RedisGears]({{< relref  "/modules/redisgears" >}}) | [RedisGraph]({{< relref  "/modules/redisgraph" >}})   | 
|-------------------------|:----------:|:------------:|:----------:|:------------:|
|||||<br/>|
| Supported by Redis Enterprise Software | Yes | Yes | Yes | Yes | 
| Supported by Redis Enterprise Cloud    | No  | Yes | No  | Yes |
|||||<br/>|
| Active-Active (CRDB)    | No         | No           | Yes (v1.0) | No           |
| Backup/Restore          | Yes (v1.0) | Yes (v2.0)   | Yes (v1.0) | Yes (v1.0)   |
| Clustering              | Yes (v1.0) | Yes (v2.0)   | Yes (v1.0) | Yes (v2.2.3)[^1] |
| Custom hashing policy   | Yes (v1.0) | Yes (v2.0)   | Yes (v1.0) | Yes (v1.0)   |
| Eviction expiration     | Yes (v1.0) | Yes (v2.0)   | Yes (v1.0) | No           |
| Failover/migration      | Yes (v1.0) | Yes (v2.0)   | Yes (v1.0) | Yes (v1.0)   |
| Internode encryption    | Yes (v1.2) | Yes (v2.2.6) | Yes (v1.2) | Yes (v2.4)   |
| Module datatypes        | Yes        | Yes          | Yes        | Yes          |
| Multikey methods        | Yes (v1.0) | No           | Yes (v1.0) | No           |
| Persistence (AOF)       | Yes (v1.0) | Yes (v2.0)   | Yes (v1.0) | Yes (v2.0)   |
| Persistence (snapshot)  | Yes (v1.0) | Yes (v2.0)   | Yes (v1.0) | Yes (v1.0)   |
| Redis on Flash (RoF)    | No         | Yes (vTBD)   | Yes (vTBD) | No           |
| Replica Of              | Yes (v1.0) | Yes (v2.0)   | No         | Yes (v2.2)   |
| Reshard/rebalance       | No         | Yes (v2.0)   | Yes (v1.0) | No           |

[^1]: The RedisGraph module supports clustering, however, individual Graphs contained in a key reside in a single shard, which can affect pricing.  To learn more, contact support.

| Feature name/capability | [RedisJSON]({{< relref  "/modules/redisjson" >}})    | [RediSearch]({{< relref  "/modules/redisearch" >}})    | [RedisTimeSeries]({{< relref  "/modules/redistimeseries" >}}) |
|-------------------------|:------------:|:-------------:|:---------------:|
||||<br/>|
| Supported by Redis Enterprise Software | Yes | Yes | Yes | 
| Supported by Redis Enterprise Cloud    | Yes | Yes | Yes |
||||<br/>|
| Active-Active (CRDB)    | No           | Yes (v2.0)    | No           | 
| Backup/Restore          | Yes (v1.0)   | Yes (v1.4)    | Yes (v1.2)   | 
| Clustering              | Yes (v1.0)   | Yes (v1.6)    | Yes (v1.2)   | 
| Custom hashing policy   | Yes (v1.0)   | Yes (v2.0)    | Yes (v1.2)   | 
| Eviction expiration     | Yes (v1.0)   | Yes (v2.0)    | Yes (v1.2)   | 
| Failover/migration      | Yes (v1.0)   | Yes (v1.4)    | Yes (v1.2)   | 
| Internode encryption    | Yes (v1.0.8) | Yes (v2.0.11) | Yes (v1.4.9) | 
| Module datatypes        | Yes          | Yes           | Yes          | 
| Multikey methods        | No           | Yes (v2.0     | Yes (v1.2)   | 
| Persistence (AOF)       | Yes (v1.0)   | Yes (v1.4)    | Yes (v1.2)   | 
| Persistence (snapshot)  | Yes (v1.0)   | Yes (v1.6)    | Yes (v1.2)   | 
| Redis on Flash (RoF)    | Yes (v1.0)   | Yes (v2.0)    | Yes (v1.4.7) | 
| Replica Of              | Yes (v1.0)   | Yes (v1.6)[^2]    | Yes (v1.2)   | 
| Reshard/rebalance       | Yes (v1.0)   | Yes (v2.0)    | Yes (v1.2)   | 

[^2]: In version 1.6, RediSearch supported Replica Of only between databases with the same number of shards.  This limitation was fixed in v2.0. 

## Feature descriptions

The following table briefly describes each feature shown in the earlier tables.

| Feature name/capability | Description |
|-------------------------|-------------|
| Active-Active (CRDB)    | Supports Active-active (CRDB) databases  |
| Backup/Restore          | Supports import and export features |
| Clustering              | Supports sharded databases and shards that can be migrated |
| Custom hashing policy   | Supports databases with custom hashing policies |
| Eviction expiration     | Fully supports eviction policies and expiration |
| Failover/migration      | Supports databases in failover or migration status |
| Internode encryption    | Supports encryption on the data plane, when enabled for databases |
| Module datatypes        | Supports module-specific datatypes and existing Redis types |
| Multikey methods        | Includes methods that support multiple keys (inverted cells) |
| Persistence (AOF)       | Supports databases using AoF persistence |
| Persistence (snapshot)  | Supports databases using snapshot persistence | 
| Redis on Flash (RoF)    | Supports Redis on Flash (RoF) |
| Replica Of              | Supports databases using REPLICAOF  | 
| Reshard/rebalance       | Supports module is able to operate in a database that is resharded and rebalanced|

<!-- 
    Individual footnotes are rendered below the following heading.  
    Thus, any additional sections need to be placed above this comment.
-->
## Footnotes