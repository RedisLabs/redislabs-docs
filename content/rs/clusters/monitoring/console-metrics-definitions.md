---
Title: Metrics in the admin console
linkTitle: Console metrics
description: The Redis Enterprise Software (RS) admin console shows metrics with information about the performance of the cluster, node, database, and shard.
weight: 20
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/monitoring-metrics/definitions/
         /rs/administering/database-operations/metrics/database-metrics/
         /rs/administering/database-operations/metrics/
         /rs/administering/monitoring-metrics/definitions/
         /rs/administering/database-operations/metrics/shard-metrics/
         /rs/administering/cluster-operations/cluster-metrics/
         /rs/administering/cluster-operations/node-metrics/
         /rs/administering/monitoring-metrics/console-metrics-definitions/
         /rs/monitoring-metrics/console-metrics-definitions/
         /rs/clusters/monitoring/console-metrics-definitions/
         /rs/clusters/monitoring/console-metrics-definitions.md

---
The Redis Enterprise Software admin console shows metrics with information about the performance of the cluster, node, database, and shard.

## Standard metrics

| Metric | Components measured | Description | More information |
| ------ | ------ | ------ | ------ |
| Connections | Cluster, Node, Database | Number of connections used to access the database |  |
| CPU usage | Cluster, Node | Percent usage of the CPU |  |
| Evicted objects/sec[^1] | Database, Shard | Number of objects evicted per second | Objects are evicted if:<br><ol><li>The database reaches its memory_limit</li><li>The [eviction policy]({{< relref "/rs/databases/memory-performance/eviction-policy" >}}) is not configured to `no-eviction`</li><li>The dataset keys are compliant with the selected eviction policy. For exmaple, with the `volatile-lru` eviction policy, Redis evicts expired keys.</li></ol> |
| Expired objects/sec[^1] | Database, Shard | Number of expired objects per second |  |
| Fork CPU usage | Database, Shard | CPU usage of Redis child forks |  |
| Free disk space | Cluster, Node | Remaining unused disk space |  |
| Free ephemeral disk space | Cluster, Node | Remaining unused disk space on the ephemeral path |  |
| Free RAM | Cluster, Node | RAM available for system use |  |
| Hit ratio | Database, Shard | Calculated as number of operations on existing keys out of the total number of operations | `number_of_ops_on_exsiting_keys` / `total_ops` |
| Incoming traffic[^1] | Cluster, Node, Database | Total incoming traffic (in bytes/sec) to the database |  |
| Incoming traffic compressed[^1] | Active-Active | Total incoming compressed traffic (in bytes/sec) to the database |  |
| Incoming traffic uncompressed[^1] | Active-Active | Total incoming uncompressed traffic (in bytes/sec) to the database |  |
| Latency | Database | Latency per operation | The graph shows average, min, max and last latency values |
| Main Thread CPU usage | Database, Shard | Percent usage of the CPU by the main thread |  |
| Memory limit | Database | Memory size limit of the database, enforced on `used_memory` | Used memory does not include:<br><ol><li>Fragmentation ratio</li><li>Replication buffer - By default, set to 10% of used memory and is between 64MB and 2048 MB.</li><li>Lua memory limit - Does not exceed 1MB.  |
| Memory usage[^1] | Database | Calculated as used memory out of the memory limit | `used_memory` / `memory_limit` |
| Ops/sec | Cluster, Node, Database, Shard | Number of total operations per second | Where operations means:<br><ol><li>read operations</li><li>write operations</li><li>other commands operations</li></ol> |
| Other cmds/sec | Database | Number of other commands per second | For example: PING, AUTH, INFO |
| Other commands latency | Database | Latency per other command | The graph shows average, min, max and last latency values |
| Outgoing traffic[^1] | Cluster, Node, Database | Total outgoing traffic (in bytes/sec) from the database |  |
| Pending writes max | Active-Active | Maximum number of write opreations queued |  |
| Pending writes min | Active-Active | Minimum number of write operations queued |  |
| RAM fragmentation | Database, Shard | Ratio between the used (allocated) memory and the physical RAM that is used. |  |
| Read misses/sec[^1] | Database, Shard | Number of read operations (per sec) on non-existing keys |  |
| Reads latency | Database | Latency per read operation | The graph shows average, min, max and last latency values |
| Reads/sec | Database | Number of total read operations per second | For example: GET |
| Total CPU usage | Database, Shard | Percent usage of the CPU |  |
| Total keys[^1] | Database, Shard | Total number of keys in the dataset (not including replication, even if replication enabled) | Calculated as the sum of all keys of all master shards. |
| Used memory | Database, Shard | Total memory used by the database, including RAM, Flash (if enabled) and replication (if enabled) | Does not include:<ol><li>Fragmentation overhead</li><li>Replica replication buffers at the primary nodes</li><li>Memory used by Lua scripts</li><li>Copy On Write (COW) operation that can be triggered by:<br><ul><li>A full replication process</li><li>A database snapshot process</li><li>AOF rewrite process</li></ul></li></ol> |
| Write misses/sec[^1] | Database, Shard | Number of write operations (per sec) on non-existing keys |  |
| Writes latency | Database | Latency per write operation |  |
| Writes/sec | Database | Number of total write operation per second | For example: SET |

[^1]: These metrics are not collected during [shard migration]({{< relref "/rs/databases/configure/replica-ha" >}}). If you view the database or shard metrics while resharding, the graph will be blank.

## Redis on Flash (RoF) metrics

These metrics are available for [Redis on Flash (RoF)]({{< relref "/rs/databases/redis-on-flash" >}}) databases.

### Measured metrics

| Metric | Components measured | Description |
| ------ | ------ | ------ |
|  % Values in RAM | Database RoF, Shard RoF | Percent of keys whose values are stored in RAM |
|  Flash bytes/sec | Cluster RoF, Node RoF, Database RoF, Shard RoF | Read+write bytes per second on flash storage device |
|  Flash fragmentation | Database RoF, Shard RoF | Ratio between the (logical) used flash memory and the actual physical flash that is used |
|  Flash IOPS | Cluster RoF, Node RoF | Rate of Input/Output operations per second on flash storage device |
|  Flash KV ops | Node RoF | Rate of operations on flash key values (read + write + del) per second |
|  Flash ops/sec | Database RoF, Shard RoF | Rate of operations on flash key values (read + write + del) per second |
|  Free flash | Cluster RoF, Node RoF | Free space on flash storage |
|  RAM dataset overhead | Database RoF, Shard RoF | Percentage of the RAM limit that is used for anything other than values, such as key names, dictionaries and other overheads |
|  RAM hit ratio | Database RoF, Shard RoF | Ratio of requests processed directly from RAM to total number of requests processed |
|  RAM limit | Database RoF | RAM limit in bytes |
|  RAM usage | Database RoF | Percentage of the RAM limit usage |
|  RAM:Flash access ratio | Database RoF, Shard RoF | Ratio between logical redis key value operations, and actual flash key value operations |
|  Used Flash | Database RoF, Shard RoF | Total RAM used to store values in Flash |
|  Used RAM | Database RoF, Shard RoF | Total size of data stored in RAM, including keys, values, overheads and including replication, if enabled |
|  Values in Flash | Database RoF, Shard RoF | Number of keys with values stored in Flash, not including replication |
|  Values in RAM | Database RoF, Shard RoF | Number of keys with values stored in RAM, not including replication |

### Calculated metrics

You can calculate the following RoF metrics with [Measured metrics](#measured-metrics).

- RoF average key size with overhead

    ```sh
    avg_key_size = (ram_dataset_overhead * used_ram)
                    / (total_keys * 2)
    ```
- RoF average value size in RAM

    ```sh
    avg_ram_value_size = ((1 - ram_dataset_overhead) * used_ram)    
                        / (values_in_ram * 2)
    ```
- RoF average value size in Flash

    ```sh
    avg_flash_value_size = used_flash / values_in_flash    
    ```

<!--
    Individual footnotes are rendered below the following heading.  
    Thus, any additional sections need to be placed above this comment.
-->
## Footnotes
