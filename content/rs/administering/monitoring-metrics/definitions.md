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

|  Metric | Description | More Info |
|  ------ | ------ | ------ |
|  Ops/sec | Number of total operations per sec | Where operations means:<br>1. read operations<br>2. write operations<br>3. other commands operations |
|  Reads/sec | Number of total reads per sec | e.g. get |
|  Writes/sec | Number of total writes per sec | e.g. set |
|  Other cmds | Number of other commands per sec | e.g.: PING, AUTH, INFO |
|  Latency | Latency per operation | The graph shows average, min, max and last values are also shown |
|  Reads latency | Latency per read operation | The graph shows average, min, max and last values are also shown |
|  Writes latency | Latency per write operation | The graph shows average, min, max and last values are also shown |
|  Other cmds latency | Latency per other command | The graph shows average, min, max and last values are also shown |
|  Used memory | The total memory used by the database, including RAM, Flash (if enabled) and replication (if enabled). | Note – used memory doesn’t include:<br>1. The fragmentation overhead<br><br>2. The slave replication buffers at the masters<br><br>3. Memory used by Lua scripts<br><br>4. Copy On Write (COW) operation that can be triggered by:<br><br>  - A full replication process is started<br><br>  - A database snapshot process is started<br><br>  - AOF rewrite process is started |
|  Memory limit | The memory size limit of the database, enforced on `used_memory`. | Note – used memory doesn’t include:<br>1. Fragmentation ratio<br>2. Replication buffer – it is `auto_slavebuf_ratio` % of `used_memory`.The default `auto_slavebuf_ratio` is 10%. And there is `auto_slavebuf_min` and `auto_slavebuf_max` which are `64MB` and `2048MB` by default, it will never exceed these in both directions.<br>3. Lua memory limit which has 2 thresholds:<br>  - A Garbage Collection threshold triggered when Lua memory crosses 0.5GB<br>  - A hard 1GB 1GB the Lua will never cross |
|  Memory usage | Calculated as: `used_memory` / `memory_limit` |  |
|  Total keys | The total number of keys in the dataset (not including replication, even if replication enabled) | Calculated as the sum of all keys of all master shards. |
|  Hit ratio | Calculated as: `number_of_ops_on_exsiting_keys` / `total_ops` |  |
|  Connections | Number of connections used to access the database. |  |
|  Writes misses/sec | Number of write operations (per sec) on non-existing keys | This metric is more relevant for caching use cases. |
|  Reads misses / sec | Number of read operations (per sec) on non-existing keys. | This metric is more relevant for caching use cases. |
|  Expired objects / sec | Number of expired objects per sec. An expired object is an object with expired TTL that was deleted from the database. | This is more relevant for caching use cases.<br>Redis implements 2 expiry mechanisms:<br><br>1. Lazy expiry – on every access to an object Redis first checks whether the object has already been expired by looking at its TTL, and if ‘yes’ Redis deletes it<br><br>2. Active expiry – Redis constantly selects random keys and deletes them if it finds they were expired |
|  Evicted objects / sec | Number of objects evicted per sec. | The eviction process is taken place if:<br>1. The database reaches its memory_limit;<br><br>2. The eviction policy allows eviction; i.e. it is not configured to ‘no-eviction’<br><br>3. The dataset keys are compliant with the selected eviction policy. e.g. volatile-lru eviction policy, only applied to keys which are violated, i.e. with TTL set. |
|  Incoming traffic | The total incoming traffic (in bytes/sec) to the database. |  |
|  Outgoing traffic | The total outgoing traffic (in bytes/sec) from the database. |  |

## Redis on Flash Metrics

|  Metric | Description |
|  ------ | ------ |
|  Used RAM | The total size of data stored in RAM, including keys, values, overheads and including replication if enabled. |
|  RAM limit | The RAM size limit of the database, enforced on `used_ram`. |
|  RAM usage | Calculated as: `used_ram` / `ram_limit`. |
|  RAM hit ratio | Calculated as: `requests_served_from_ram` / `total_requests`;<br>Where:<br>1. requests_served_from_ram – refers to all requests processed values directly from RAM (i.e. without touching the Flash)<br>2. total_requests – refers to all requests processed by the database |
|  Values in RAM | The number of keys with values stored in RAM (not including replication even if replication enabled). |
|  Values in Flash | The number of keys with values stored in Flash (not including replication even if replication enabled). |
|  Non values RAM overhead | The percentage of RAM used for storing everything rather than pure values. I.e. keys, Redis dictionary and other key/value overheads. |
|  Used Flash | The total size of values stored in Flash. |
|  Flash limit | The Flash size limit of the database, enforced on `used_flash` |
|  Flash usage | Calculated as: `used_flash` / `flash_limit`. |
|  RAM dataset overhead | Includes the ‘keys’ and the ‘keys overhead’ |
|  RAM fragmentation | The level of fragmentation for the RAM portion of the database. |
|  Flash fragmentation | The level of fragmentation for the flash memory portion of the database. |
|  **What we can calculate and what we should know from the above** | |
|  Redis on Flash average key size (+ overhead) | Redis on Flash keeps all the keys and their overheads in RAM. Use the following steps to calculate the average size of a single key (including its overhead):<br>1. `total_keys_size` = `non_values_ram_overhead` * `used_ram`<br>2. `avg_key_size` = `total_keys_size` / (`total_keys` * 2) |
|  Redis on Flash average value size, when the value is in RAM | Use following steps to calculate the average size of a value in RAM:<br>`total_size_of_values_in_ram` = (1 – `non_values_ram_overhead`) * `used_ram` `avg_value_size_in_ram` = `total_szie_of_values_in_ram` / (`values_in_ram` * 2) |
|  Redis on Flash average value size, when the value is in Flash | This is calculated as: used_flash / values_in_flash<br>**Note** – values in Flash are serialized and will always be smaller than in RAM. |
|  In Redis on Flash how come:<br>`value_in_ram` + `value_in_flash` > `total_keys` | Calculated as: `used_flash` / `flash_limit`. |