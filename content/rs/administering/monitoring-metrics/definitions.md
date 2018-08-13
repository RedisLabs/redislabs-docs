---
Title: Metrics Definitions
description: $description
weight: $weight
alwaysopen: false
---
Redis Enterprise Software (RS) includes many useful metrics that can be
tracked to give you a detailed picture of what is going on in the
cluster/node/database. Below are some of the metrics for RS and Redis on
Flash (RoF). Also included is a list of metrics that are important how
they are computed from other metrics. For example, if I need the know
the RAM hit ratio you can dive the Request served from RAM by the total
number of requests.

+-----------------------+-----------------------+-----------------------+
| Metric                | Description           | More Info             |
+-----------------------+-----------------------+-----------------------+
| Ops/sec               | Number of total       | Where operations      |
|                       | operations per sec    | means:                |
|                       |                       |                       |
|                       |                       | 1.  1.  read          |
|                       |                       |         operations    |
|                       |                       |     2.  write         |
|                       |                       |         operations    |
|                       |                       |     3.  other         |
|                       |                       |         commands      |
|                       |                       |         operations    |
+-----------------------+-----------------------+-----------------------+
| Reads/sec             | Number of total reads | e.g. get              |
|                       | per sec               |                       |
+-----------------------+-----------------------+-----------------------+
| Writes/sec            | Number of total       | e.g. set              |
|                       | writes per sec        |                       |
+-----------------------+-----------------------+-----------------------+
| Other cmds            | Number of other       | e.g.: PING, Auth,     |
|                       | commands per sec      | INFO                  |
+-----------------------+-----------------------+-----------------------+
| Latency               | Latency per operation | The graph shows       |
|                       |                       | average, min, max and |
|                       |                       | last values are also  |
|                       |                       | shown                 |
+-----------------------+-----------------------+-----------------------+
| Reads latency         | Latency per read      | The graph shows       |
|                       | operation             | average, min, max and |
|                       |                       | last values are also  |
|                       |                       | shown                 |
+-----------------------+-----------------------+-----------------------+
| Writes latency        | Latency per write     | The graph shows       |
|                       | operation             | average, min, max and |
|                       |                       | last values are also  |
|                       |                       | shown                 |
+-----------------------+-----------------------+-----------------------+
| Other cmds latency    | Latency per other     | The graph shows       |
|                       | command               | average, min, max and |
|                       |                       | last values are also  |
|                       |                       | shown                 |
+-----------------------+-----------------------+-----------------------+
| Used memory           | The total memory used | Note -- used memory   |
|                       | by the database,      | doesn't include:      |
|                       | including RAM, Flash  |                       |
|                       | (if enabled) and      | 1.  The fragmentation |
|                       | replication (if       |     overhead          |
|                       | enabled).             | 2.  The slave         |
|                       |                       |     replication       |
|                       |                       |     buffers at the    |
|                       |                       |     masters           |
|                       |                       | 3.  Memory used by    |
|                       |                       |     Lua scripts       |
|                       |                       | 4.  Copy On Write     |
|                       |                       |     (COW) operation   |
|                       |                       |     that can be       |
|                       |                       |     triggered by:     |
|                       |                       |     -   A full        |
|                       |                       |         replication   |
|                       |                       |         process is    |
|                       |                       |         started       |
|                       |                       |     -   A database    |
|                       |                       |         snapshot      |
|                       |                       |         process is    |
|                       |                       |         started       |
|                       |                       |     -   AOF rewrite   |
|                       |                       |         process is    |
|                       |                       |         started       |
+-----------------------+-----------------------+-----------------------+
| Memory limit          | The memory size limit | Note -- used memory   |
|                       | of the database,      | doesn't include:      |
|                       | enforced on           |                       |
|                       | \`used\_memory\`.     | 1.  Fragmentation     |
|                       |                       |     ratio             |
|                       |                       | 2.  Replication       |
|                       |                       |     buffer -- it is   |
|                       |                       |     \`auto\_slavebuf\ |
|                       |                       | _ratio\`              |
|                       |                       |     % of              |
|                       |                       |     \`used\_memory\`. |
|                       |                       | The                   |
|                       |                       |     default           |
|                       |                       |     \`auto\_slavebuf\ |
|                       |                       | _ratio\`              |
|                       |                       |     is 10%. And there |
|                       |                       |     is                |
|                       |                       |     \`auto\_slavebuf\ |
|                       |                       | _min\`                |
|                       |                       |     and               |
|                       |                       |     \`auto\_slavebuf\ |
|                       |                       | _max\`                |
|                       |                       |     which are         |
|                       |                       |     \`64MB\` and      |
|                       |                       |     \`2048MB\` by     |
|                       |                       |     default, it will  |
|                       |                       |     never exceed      |
|                       |                       |     these in both     |
|                       |                       |     directions.       |
|                       |                       | 3.  Lua memory limit  |
|                       |                       |     which has 2       |
|                       |                       |     thresholds:       |
|                       |                       |     -   A Garbage     |
|                       |                       |         Collection    |
|                       |                       |         threshold     |
|                       |                       |         triggered     |
|                       |                       |         when Lua      |
|                       |                       |         memory        |
|                       |                       |         crosses 0.5GB |
|                       |                       |     -   A hard 1GB    |
|                       |                       |         1GB the Lua   |
|                       |                       |         will never    |
|                       |                       |         cross         |
+-----------------------+-----------------------+-----------------------+
| Memory usage          | Calculated as:        |                       |
|                       | \`used\_memory\` /    |                       |
|                       | \`memory\_limit\`     |                       |
+-----------------------+-----------------------+-----------------------+
| Total keys            | The total number of   | Calculated as the sum |
|                       | keys in the dataset   | of all keys of all    |
|                       | (not including        | master shards.        |
|                       | replication, even if  |                       |
|                       | replication enabled)  |                       |
+-----------------------+-----------------------+-----------------------+
| Hit ratio             | Calculated as:        |                       |
|                       | \`number\_of\_ops\_on |                       |
|                       | \_exsiting\_keys\`    |                       |
|                       | / \`total\_ops\`      |                       |
+-----------------------+-----------------------+-----------------------+
| Connections           | Number of connections |                       |
|                       | used to access the    |                       |
|                       | database.             |                       |
+-----------------------+-----------------------+-----------------------+
| Writes misses/sec     | Number of write       | This metric is more   |
|                       | operations (per sec)  | relevant for caching  |
|                       | on non-existing keys  | use cases.            |
+-----------------------+-----------------------+-----------------------+
| Reads misses / sec    | Number of read        | This metric is more   |
|                       | operations (per sec)  | relevant for caching  |
|                       | on non-existing keys. | use cases.            |
+-----------------------+-----------------------+-----------------------+
| Expired objects / sec | Number of expired     | This is more relevant |
|                       | objects per sec. An   | for caching use       |
|                       | expired object is an  | cases.                |
|                       | object with expired   |                       |
|                       | TTL that was deleted  | Redis implements 2    |
|                       | from the database.    | expiry mechanisms:    |
|                       |                       |                       |
|                       |                       | 1.  Lazy expiry -- on |
|                       |                       |     every access to   |
|                       |                       |     an object Redis   |
|                       |                       |     first checks      |
|                       |                       |     whether the       |
|                       |                       |     object has        |
|                       |                       |     already been      |
|                       |                       |     expired by        |
|                       |                       |     looking at its    |
|                       |                       |     TTL, and if 'yes' |
|                       |                       |     Redis deletes it  |
|                       |                       | 2.  Active expiry --  |
|                       |                       |     Redis constantly  |
|                       |                       |     selects random    |
|                       |                       |     keys and deletes  |
|                       |                       |     them if it finds  |
|                       |                       |     they were expired |
+-----------------------+-----------------------+-----------------------+
| Evicted objects / sec | Number of objects     | The eviction process  |
|                       | evicted per sec.      | is taken place if:    |
|                       |                       |                       |
|                       |                       | 1.  The database      |
|                       |                       |     reaches its       |
|                       |                       |     memory\_limit;    |
|                       |                       | 2.  The eviction      |
|                       |                       |     policy allows     |
|                       |                       |     eviction; i.e. it |
|                       |                       |     is not configured |
|                       |                       |     to 'no-eviction'  |
|                       |                       | 3.  The dataset keys  |
|                       |                       |     are compliant     |
|                       |                       |     with the selected |
|                       |                       |     eviction policy.  |
|                       |                       |     e.g. volatile-lru |
|                       |                       |     eviction policy,  |
|                       |                       |     only applied to   |
|                       |                       |     keys which are    |
|                       |                       |     violated, i.e.    |
|                       |                       |     with TTL set.     |
+-----------------------+-----------------------+-----------------------+
| Incoming traffic      | The total incoming    |                       |
|                       | traffic (in           |                       |
|                       | bytes/sec) to the     |                       |
|                       | database.             |                       |
+-----------------------+-----------------------+-----------------------+
| Outgoing traffic      | The total outgoing    |                       |
|                       | traffic (in           |                       |
|                       | bytes/sec) from the   |                       |
|                       | database.             |                       |
+-----------------------+-----------------------+-----------------------+

Redis on Flash Metrics
======================

Metric

Description

Used RAM

The total size of data stored in RAM, including keys, values, overheads
and including replication if enabled.

RAM limit

The RAM size limit of the database, enforced on \`used\_ram\`.

RAM usage

Calculated as: \`used\_ram\` / \`ram\_limit\`.

RAM hit ratio

Calculated as: \`requests\_served\_from\_ram\` / \`total\_requests\`;

Where:

1.  requests\_served\_from\_ram -- refers to all requests processed
    values directly from RAM (i.e. without touching the Flash)
2.  total\_requests -- refers to all requests processed by the database

Values in RAM

The number of keys with values stored in RAM (not including replication
even if replication enabled).

Values in Flash

The number of keys with values stored in Flash (not including
replication even if replication enabled).

Non values RAM overhead

The percentage of RAM used for storing everything rather than pure
values. I.e. keys, Redis dictionary and other key/value overheads.

Used Flash

The total size of values stored in Flash.

Flash limit

The Flash size limit of the database, enforced on \`used\_flash\`

Flash usage

Calculated as: \`used\_flash\` / \`flash\_limit\`.

RAM dataset overhead

Includes the 'keys' and the 'keys overhead'

RAM fragmentation

The level of fragmentation for the RAM portion of the database.

Flash fragmentation

The level of fragmentation for the flash memory portion of the database.

**What we can calculate and what we should know from the above**

Redis on Flash average key size (+ overhead)

Redis on Flash keeps all the keys and their overheads in RAM. Use the
following steps to calculate the average size of a single key (including
its overhead):

1.  \`total\_keys\_size\` = \`non\_values\_ram\_overhead\` \*
    \`used\_ram\`
2.  \`avg\_key\_size\` = \`total\_keys\_size\` / (\`total\_keys\` \* 2)

Redis on Flash average value size, when the value is in RAM

Use following steps to calculate the average size of a value in RAM:

1.  \`total\_size\_of\_values\_in\_ram\` = (1 --
    \`non\_values\_ram\_overhead\`) \* \`used\_ram\`
2.  \`avg\_value\_size\_in\_ram\` = \`total\_szie\_of\_values\_in\_ram\`
    / (\`values\_in\_ram\` \* 2)

Redis on Flash average value size, when the value is in Flash

This is calculated as: used\_flash / values\_in\_flash

\*\*Note\*\* -- values in Flash are serialized and will always be
smaller than in RAM.

In Redis on Flash how come:

\`value\_in\_ram\` + \`value\_in\_flash\` \> \`total\_keys\`

Calculated as: \`used\_flash\` / \`flash\_limit\`.
