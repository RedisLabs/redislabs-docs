---
Title: Redis Enterprise Modules on VMware Tanzu
description:
weight: 14
alwaysopen: false
hidden: true
aliases: 
---

## Redis Enterprise Modules Overview

Redis Enterprise Modules reduces the need to maintain a specialty database for each application use case by offering a separate, dedicated, and optimized engine for each data model.
Trusted, tested, and verified to work with Redis Enterprise, these modules include:

* **[RedisGraph](https://oss.redis.com/redisgraph/)**
* **[RedisJSON](https://oss.redis.com/redisjson/)**
* **[RedisTimeSeries](https://oss.redis.com/redistimeseries/)**
* **[RedisBloom](https://oss.redis.com/redisbloom/)**
* **[RediSearch](https://oss.redis.com/redisearch/)**

For more information please refer to the [Redis Enterprise Modules page](https://redis.com/redis-enterprise/modules/) on the [Redis](https://redis.com/) Website.

## Creating a Redis Enterprise Module Enabled Database instance via VMware Tanzu Apps Manager CLI

1. Perform 'cf login' to your foundation.

2. Run the command:

  ```
  cf create-service redislabs [SERVICE PLAN] [SERVICE INSTANCE] -c [PARAMETERS_AS_JSON]
  ```

  Where: *redislabs* is the default service name (in a Redis Enterprise Tile Manager multi-tile environment (Run `cf marketplace` to determine the service name.)

  * SERVICE PLAN uses one of the available Redis Enterprise service plans
  * SERVICE INSTANCE is the new service instance name
  * PARAMETERS_AS_JSON are the modules list to be loaded

3. Consult the list of available modules, their module names and semantic versions for the Redis Enterprise version installed on your foundation.

  This can be achieved by having an operator run the following on one of the Redis Enterprise nodes.

  ```
  curl -L -v -k GET https://localhost:9443/v1/modules -u "[CLUSTER ADMIN USERNAME]:[CLUSTER ADMIN PASSWORD]" -H "Content-Type: application/json"
  ```

See the [appendix](modules.html#appendix-module-list) for the list of module ids and their default arguments for release 6.2.84100001

{{<note>}} Some modules have mandatory configuration options that must be applied on database creation. Others have optional configuration options that can be used either at creation or post-creation. There are specified in the "module_args" structure. For more information, see [the add module to database article]({{<relref "/stack/install/add-module-to-database">}}) in the Redis Enterprise documentation.{{</note>}}

For example, to create a `small-redis` plan database with the RedisBloom module:

```
cf create-service redislabs small-redis RedisBloom -c '{"module_list":[{"module_name": "bf", "semantic_version": "2.2.6","module_args": ""}]}'
```

```
Creating service instance RedisBloom in org RedisLabs / space RL Space 1 as admin...
OK
```

Available service plans are listed in response to ``cf services`` or listed in either the tile's Ops Manager configuration, under **Settings** > **Service Plans** or in the Apps Manager > **Marketplace** screen:

![Service plans shown in tile configuration](/images/tas/pcf_ops_service_plan.png)

![Service plans shown in Apps Manager](/images/tas/pcf_apps_service_plans.png)

## <a id='modules-topic-3'></a> Creating a Redis Enterprise Module Enabled Database instance via VMware Tanzu Apps Manager UI

1. From VMware Tanzu Apps Manager go to Marketplace and select Redis Enterprise on VMware Tanzu.

  ![Marketplace in Apps Manager](/images/tas/pcf_apps_marketplace.png)

2. Select a plan from the available plans listed and click **Select This Plan**.

  ![Selecting a plan](/images/tas/pcf_apps_service_plan.png)

3. Select **Add Parameter** and turn on the **Enter as JSON** option. Enter the module list information in the same way as with the CLI option.

4. Write an instance name and optionally choose to bind to a deployed app then click **Create**.

  ![Creating an instance](/images/tas/pcf_apps_config_create_bf.png)

  ![Instance created](/images/tas/pcf_ops_service_plan_created_bf.png)

{{<note>}} We are constantly working to improve the modules. Redis Enterprise allows adding new, or upgrading, modules to the cluster. For more information on how to perform these actions, see [the add a module to a cluster article]({{<relref "/stack/install/add-module-to-cluster">}}) in the Redis Enterprise documentation.{{</note>}}

## Appendix: Module list for 6.2.84100001

```json
[
    {
        "author": "Redis Labs",
        "capabilities": [
            "types",
            "no_multi_key",
            "replica_of",
            "eviction_expiry",
            "failover_migrate",
            "flash",
            "backup_restore",
            "reshard_rebalance",
            "persistence_aof",
            "persistence_rdb",
            "hash_policy",
            "clustering"
        ],
        "command_line_args": "",
        "config_command": "",
        "dependencies": {},
        "description": "Native JSON Data Type for Redis",
        "display_name": "RedisJSON",
        "email": "redismodules@redislabs.com",
        "homepage": "http://redisjson.io",
        "is_bundled": true,
        "license": "Redis Source Available License Agreement",
        "min_redis_pack_version": "5.0",
        "min_redis_version": "4.0",
        "module_name": "ReJSON",
        "semantic_version": "1.0.7",
        "sha256": "48409b10611c65b35392ca079f1924d4e59867e6dd32217c554fbf69bcb6d99f",
        "uid": "3bf0fbcb6444a95f026ffebf794180cc",
        "version": 10007
    },
    {
        "author": "RedisLabs",
        "capabilities": [
            "types",
            "replica_of",
            "backup_restore",
            "hash_policy",
            "eviction_expiry",
            "failover_migrate",
            "persistence_aof",
            "persistence_rdb",
            "hash_policy",
            "clustering",
            "reshard_rebalance",
            "intershard_tls"
        ],
        "command_line_args": "",
        "config_command": "",
        "dependencies": {},
        "description": "Time-Series data structure for redis",
        "display_name": "RedisTimeSeries",
        "email": "danni@redislabs.com",
        "homepage": "https://oss.redislabs.com/redistimeseries/",
        "is_bundled": true,
        "license": "Redis Source Available License Agreement",
        "min_redis_pack_version": "6.0.12",
        "min_redis_version": "5.0",
        "module_name": "timeseries",
        "semantic_version": "1.4.9",
        "sha256": "18ef55576ecab96380deda61e2d0eb4b22b2e59ed3dc75fca2a816ab5d95af39",
        "uid": "d625bfec1b0b1db1904b3d904f604ecb",
        "version": 10409
    },
    {
        "author": "RedisLabs",
        "capabilities": [
            "types",
            "replica_of",
            "failover_migrate",
            "persistence_aof",
            "persistence_rdb",
            "clustering",
            "backup_restore",
            "reshard_rebalance",
            "flash",
            "crdb",
            "eviction_expiry",
            "hash_policy"
        ],
        "command_line_args": "PARTITIONS AUTO",
        "config_command": "_FT.CONFIG SET",
        "dependencies": {},
        "description": "High performance search index on top of Redis (with clustering)",
        "display_name": "RediSearch 2",
        "email": "meir@redislabs.com",
        "homepage": "http://redisearch.io",
        "is_bundled": true,
        "license": "Redis Source Available License Agreement",
        "min_redis_pack_version": "6.0.8",
        "min_redis_version": "6.0",
        "module_name": "search",
        "semantic_version": "2.0.8",
        "sha256": "4964fc507daf9019aab6c0990bb039565480f2b65e616b49f0f77997e4bb8b54",
        "uid": "185d404506c485d79a4d6a9ad461625e",
        "version": 20008
    },
    {
        "author": "Redis Labs",
        "capabilities": [
            "types",
            "no_multi_key",
            "replica_of",
            "eviction_expiry",
            "failover_migrate",
            "backup_restore",
            "reshard_rebalance",
            "persistence_aof",
            "persistence_rdb",
            "hash_policy",
            "clustering"
        ],
[
    {
        "author": "Redis Labs",
        "capabilities": [
            "types",
            "no_multi_key",
            "replica_of",
            "eviction_expiry",
            "failover_migrate",
            "flash",
            "backup_restore",
            "reshard_rebalance",
            "persistence_aof",
            "persistence_rdb",
            "hash_policy",
            "clustering",
            "intershard_tls"
        ],
        "command_line_args": "",
        "config_command": "",
        "dependencies": {},
        "description": "Native JSON Data Type for Redis",
        "display_name": "RedisJSON",
        "email": "redismodules@redislabs.com",
        "homepage": "http://redisjson.io",
        "is_bundled": true,
        "license": "Redis Source Available License Agreement",
        "min_redis_pack_version": "5.0",
        "min_redis_version": "4.0",
        "module_name": "ReJSON",
        "semantic_version": "1.0.8",
        "sha256": "09f5ad36fef711fa0e7d3e0f11e424423d74971fc818c5002ad14c8aae05a5a6",
        "uid": "4942f870bcd96678dd92cd55ae5d2801",
        "version": 10008
    },
    {
        "author": "RedisLabs",
        "capabilities": [
            "types",
            "replica_of",
            "backup_restore",
            "hash_policy",
            "eviction_expiry",
            "failover_migrate",
            "persistence_aof",
            "persistence_rdb",
            "hash_policy",
            "clustering",
            "reshard_rebalance",
            "intershard_tls"
        ],
        "command_line_args": "",
        "config_command": "",
        "dependencies": {},
        "description": "Time-Series data structure for redis",
        "display_name": "RedisTimeSeries",
        "email": "danni@redislabs.com",
        "homepage": "https://oss.redislabs.com/redistimeseries/",
        "is_bundled": true,
        "license": "Redis Source Available License Agreement",
        "min_redis_pack_version": "6.0.12",
        "min_redis_version": "5.0",
        "module_name": "timeseries",
        "semantic_version": "1.4.10",
        "sha256": "8172907f749ae2ac75ab55b1c444cb9d625fd6d64aa12442d93ff5d368dc4bb4",
        "uid": "6715acd18978c330bb2fb3f4193f070c",
        "version": 10410
    },
    {
        "author": "Redis Labs",
        "capabilities": [
            "types",
            "no_multi_key",
            "replica_of",
            "eviction_expiry",
            "failover_migrate",
            "backup_restore",
            "reshard_rebalance",
            "persistence_aof",
            "persistence_rdb",
            "hash_policy",
            "clustering",
            "flash",
            "intershard_tls"
        ],
        "command_line_args": "",
        "config_command": "",
        "dependencies": {},
        "description": "Bloom Filter Module for Redis",
        "display_name": "RedisBloom",
        "email": "redismodules@redislabs.com",
        "homepage": "http://redisbloom.io",
        "is_bundled": true,
        "license": "Redis Source Available License Agreement",
        "min_redis_pack_version": "5.0",
        "min_redis_version": "4.0",
        "module_name": "bf",
        "semantic_version": "2.2.6",
        "sha256": "89f46cf4f32c01aaa7c9acbc5bfa1b6f2f0537c1a85b772ada556833d724cf1f",
        "uid": "6473cca00689762ec6510fff9c7fba63",
        "version": 20206
    },
    {
        "author": "RedisLabs",
        "capabilities": [
            "types",
            "failover_migrate",
            "persistence_rdb",
            "persistence_aof",
            "clustering",
            "replica_of",
            "backup_restore",
            "no_multi_key",
            "intershard_tls"
        ],
        "command_line_args": "",
        "config_command": "GRAPH.CONFIG SET",
        "dependencies": {},
        "description": "A graph database on top of Redis which supports Open-Cypher query language.",
        "display_name": "RedisGraph",
        "email": "roi@redislabs.com",
        "homepage": "http://redisgraph.io",
        "is_bundled": true,
        "license": "Redis Source Available License Agreement",
        "min_redis_pack_version": "6.0.8",
        "min_redis_version": "6.0",
        "module_name": "graph",
        "semantic_version": "2.4.7",
        "sha256": "3d24d71f8cf7c5e1d4ce8b9da50a5f1dfd18788b1b3f2c1c59b012f1e84440b8",
        "uid": "29a7398e6a34cbeaa05c49435635ba30",
        "version": 20407
    },
    {
        "author": "RedisLabs",
        "capabilities": [
            "types",
            "replica_of",
            "failover_migrate",
            "persistence_aof",
            "persistence_rdb",
            "clustering",
            "backup_restore",
            "reshard_rebalance",
            "flash",
            "crdb",
            "eviction_expiry",
            "hash_policy",
            "intershard_tls"
        ],
        "command_line_args": "PARTITIONS AUTO",
        "config_command": "_FT.CONFIG SET",
        "dependencies": {},
        "description": "High performance search index on top of Redis (with clustering)",
        "display_name": "RediSearch 2",
        "email": "meir@redislabs.com",
        "homepage": "http://redisearch.io",
        "is_bundled": true,
        "license": "Redis Source Available License Agreement",
        "min_redis_pack_version": "6.0.8",
        "min_redis_version": "6.0",
        "module_name": "search",
        "semantic_version": "2.0.11",
        "sha256": "ddf20f03d7bd90301db4e4cbcd3fff8aef3316b3fac33e9676e034f4b21a5c63",
        "uid": "9f8e4b44fbd28838190dbee7935e964d",
        "version": 20011
    }
]
```

For more information about Redis Enterprise modules for VMware Tanzu, see the [Redis Enterprise documentation]({{<relref "/stack/">}}).