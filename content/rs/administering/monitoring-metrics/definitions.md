---
Title: Metrics Definitions
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Redis Enterprise Software (RS) includes many useful metrics that can be
tracked to give you a detailed picture of what is going on in the
cluster/node/database. Below are some of the metrics for RS and Redis on
Flash (RoF). Also included is a list of metrics that are important how
they are computed from other metrics. For example, if I need the know
the RAM hit ratio you can dive the Request served from RAM by the total
number of requests.

## Redis Enterprise Software Metrics

| Metric | Components measured | Description | More information |
| ------ | ------ | ------ | ------ |
| Connections | Cluster, Node, Database | Number of connections used to access the database |  |
| CPU usage | Cluster, Node | Percent usage of the CPU |  |
| Evicted objects/sec | Database, Shard | Number of objects evicted per second | The eviction process is taken place if:<br>1. The database reaches its memory_limit;<br><br>2. The eviction policy allows eviction; i.e. it is not configured to ‘no-eviction’<br><br>3. The dataset keys are compliant with the selected eviction policy. e.g. volatile-lru eviction policy, only applied to keys which are violated, i.e. with TTL set. |
| Expired objects/sec | Database, Shard | Number of expired objects per second (An expired object is an object with expired TTL that was deleted from the database) | This is more relevant for caching use cases.<br>Redis implements 2 expiry mechanisms:<br><br>1. Lazy expiry – on every access to an object Redis first checks whether the object has already been expired by looking at its TTL, and if ‘yes’ Redis deletes it<br><br>2. Active expiry – Redis constantly selects random keys and deletes them if it finds they were expired |
| Fork CPU usage | Database, Shard | CPU usage of Redis child forks (for replication, BGSAVA...) |  |
| Free disk space | Cluster, Node | Remaining unused disk space |  |
| Free ephemeral disk space | Cluster, Node | Remaining unused disk space on the ephemeral path |  |
| Free RAM | Cluster, Node | Remaining unused RAM memory |  |
| Hit ratio | Database, Shard | Calculated as number of ops on existing keys out of the total number of ops | `number_of_ops_on_exsiting_keys` / `total_ops` |
| Incoming traffic | Cluster, Node, Database | Total incoming traffic (in bytes/sec) to the database |  |
| Incoming traffic compressed | CRDB | Total incoming compressed traffic (in bytes/sec) to the database |  |
| Incoming traffic uncompressed | CRDB | Total incoming uncompressed traffic (in bytes/sec) to the database |  |
| Latency | Database | Latency per operation | The graph shows average, min, max and last values are also shown |
| Main Thread CPU usage | Database, Shard | Percent usage of the CPU by the main thread |  |
| Memory limit | Database | Memory size limit of the database, enforced on `used_memory` | Note – used memory doesn’t include:<br>1. Fragmentation ratio<br>2. Replication buffer – it is `auto_slavebuf_ratio` % of `used_memory`.The default `auto_slavebuf_ratio` is 10%. And there is `auto_slavebuf_min` and `auto_slavebuf_max` which are `64MB` and `2048MB` by default, it will never exceed these in both directions.<br>3. Lua memory limit which has 2 thresholds:<br>  - A Garbage Collection threshold triggered when Lua memory crosses 0.5GB<br>  - A hard 1GB 1GB the Lua will never cross |
| Memory usage | Database | Calculated as used memory out of the memory limit | `used_memory` / `memory_limit` |
| Ops/sec | Cluster, Node, Database, Shard | Number of total operations per second | Where operations means:<br>1. read operations<br>2. write operations<br>3. other commands operations |
| Other cmds/sec | Database | Number of other commands per second | e.g.: PING, AUTH, INFO |
| Other commands latency | Database | Latency per other command | The graph shows average, min, max and last values are also shown |
| Outgoing traffic | Cluster, Node, Database | Total outgoing traffic (in bytes/sec) from the database |  |
| Pending writes max | CRDB | Maximum number of writes queued |  |
| Pending writes min | CRDB | Minimum number of writes queued |  |
| RAM fragmentation | Database, Shard | Ratio between the used (allocated) memory and the actual physical RAM that is used. |  |
| Read misses/sec | Database, Shard | Number of read operations (per sec) on non-existing keys | This metric is more relevant for caching use cases. |
| Reads latency | Database | Latency per read operation | The graph shows average, min, max and last values are also shown |
| Reads/sec | Database | Number of total reads per second | e.g. get |
| Total CPU usage | Database, Shard | Percent usage of the CPU |  |
| Total keys | Database, Shard | Total number of keys in the dataset (not including replication, even if replication enabled) | Calculated as the sum of all keys of all master shards. |
| Used memory | Database, Shard | Total memory used by the database, including RAM, Flash (if enabled) and replication (if enabled) | Note – used memory doesn’t include:<br>1. The fragmentation overhead<br><br>2. The slave replication buffers at the masters<br><br>3. Memory used by Lua scripts<br><br>4. Copy On Write (COW) operation that can be triggered by:<br><br>  - A full replication process is started<br><br>  - A database snapshot process is started<br><br>  - AOF rewrite process is started |
| Write misses/sec | Database, Shard | Number of write operations (per sec) on non-existing keys | This metric is more relevant for caching use cases. |
| Writes latency | Database | Latency per write operation |  |
| Writes/sec | Database | Number of total writes per second | e.g. set |

## Redis on Flash Metrics

| Metric | Description |
| ------ | ------ |
| Flash fragmentation | The level of fragmentation for the flash memory portion of the database. |
| RAM dataset overhead | Includes the ‘keys’ and the ‘keys overhead’ |
| Non values RAM overhead | The percentage of RAM used for storing everything rather than pure values. I.e. keys, Redis dictionary and other key/value overheads. |
| RAM fragmentation | The level of fragmentation for the RAM portion of the database. |
| RAM hit ratio | Calculated as: `requests_served_from_ram` / `total_requests`;<br>Where:<br>1. requests_served_from_ram – refers to all requests processed values directly from RAM (i.e. without touching the Flash)<br>2. total_requests – refers to all requests processed by the database |
| RAM limit | The RAM size limit of the database, enforced on `used_ram`. |
| RAM usage | Calculated as: `used_ram` / `ram_limit`. |
| Used Flash | The total size of values stored in Flash. |
| Used RAM | The total size of data stored in RAM, including keys, values, overheads and including replication if enabled. |
| Values in Flash | The number of keys with values stored in Flash (not including replication even if replication enabled). |
| Values in RAM | The number of keys with values stored in RAM (not including replication even if replication enabled). |
| **What we can calculate and what we should know from the above** | |
| Redis on Flash average key size (+ overhead) | Redis on Flash keeps all the keys and their overheads in RAM. Use the following steps to calculate the average size of a single key (including its overhead):<br>1. `total_keys_size` = `non_values_ram_overhead` * `used_ram`<br>2. `avg_key_size` = `total_keys_size` / (`total_keys` * 2) |
| Redis on Flash average value size, when the value is in RAM | Use following steps to calculate the average size of a value in RAM:<br>`total_size_of_values_in_ram` = (1 – `non_values_ram_overhead`) * `used_ram` `avg_value_size_in_ram` = `total_szie_of_values_in_ram` / (`values_in_ram` * 2) |
| Redis on Flash average value size, when the value is in Flash | This is calculated as: used_flash / values_in_flash<br>**Note** – values in Flash are serialized and will always be smaller than in RAM. |
| In Redis on Flash how come:<br>`value_in_ram` + `value_in_flash` > `total_keys` | Calculated as: `used_flash` / `flash_limit`. |