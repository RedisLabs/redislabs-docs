---
Title: Memory and performance
linktitle: Memory and performance
description:
weight: 73
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/concepts/memory-architecture/_index.md,
    /rs/concepts/memory-architecture/_index/,
    /rs/administering/designing-production/performance/_index.md,
    /rs/administering/designing-production/performance/_index/,
    /rs/concepts/memory-performance/_index.md,
    /rs/concepts/memory-performance/,
    /rs/databases/memory-performance.md,
    /rs/databases/memory-performance/,
    /rs/databases/essentials/memory-performance.md,
    /rs/databases/essentials/memory-performance/,

]
---
Redis Enterprise Software has multiple mechanisms in its
architecture to help optimize storage and performance.

## Memory limits

Database memory limits define the maximum size your database can reach across all database replicas and [shards]({{<relref "/rs/references/terminology.md#redis-instance-shard">}}) on the cluster. Your memory limit will also determine the number of shards you'll need.

Besides your dataset, the memory limit must also account for replication, Active-Active overhead, and module overhead. These features can significantly increase your database size, sometimes increasing it by four times or more.

Factors to consider when sizing your database:

- **dataset size**: you want your limit to be above your dataset size to leave room for overhead.
- **database throughput**: high throughput needs more shards, leading to a higher memory limit.
- [**modules**]({{<relref "/modules/_index.md">}}): using modules with your database consumes more memory.
- [**database clustering**]({{<relref "/rs/databases/essentials/clustering.md">}}): spreading your data into shards across multiple nodes (scaling out) means you cannot disable clustering or reduce the number of shards later (scaling in).
- [**database replication**]({{<relref "/rs/databases/essentials/replication.md">}}): enabling replication doubles memory consumption
- [**Active-Active replication**]({{<relref "/rs/databases/active-active/_index.md">}}): enabling Active-Active replication requires double the memory of regular replication, which can be up to four times (4x) the original data size.

For more information on memory limits, see [Memory management with Redis Enterprise Software]({{<relref "/rs/clusters/optimize/node-memory.md">}}) or [Database memory limits]({{<relref "/rs/databases/memory-performance/memory-limit.md">}}).

## Eviction policies

When a database exceeds its memory limit, eviction policies determine which data is removed. The eviction policy removes keys based on frequency of use, how recently used, randomly, expiration date, or a combination of these factors. The policy can also be set to `noeviction` to return a memory limit error when trying to insert more data.

The default eviction policy for databases is `volatile-lru` which evicts the least recently used keys out of all keys with the ‘expire’ field set. The default for Active-Active databases is `noeviction`.

For more information, see [eviction policies]({{<relref "/rs/databases/memory-performance/eviction-policy.md">}}).

## Database persistence

Both RAM memory and flash memory are at risk of data loss if a server or process fails. Persisting your data to disk helps protect it against loss in those situations. You can configure persistence at the time of database creation, or by editing the database’s configuration.

There are two main types of persistence strategies in Redis Enterprise Software: append-only files (AoF) and snapshots.

Append-only files (AoF) keep a record of data changes and writes each change to the end of a file, allowing you to recover the dataset by replaying the writes in the append-only log.

Snapshots capture all the data as it exists in one moment in time and writes it to disk, allowing you to recover the entire dataset as it existed at that moment in time.

For more info on data persistence see [Database persistence with Redis Enterprise Software]({{<relref "/rs/databases/configure/database-persistence.md">}}) or [Durable Redis](https://redis.com/redis-enterprise/technology/durable-redis/).

## Redis on Flash (RoF)

By default, Redis Enterprise Software stores your data entirely in [RAM](https://en.wikipedia.org/wiki/Random-access_memory) for improved performance. The [Redis on Flash]({{<relref "/rs/databases/redis-on-flash/">}}) feature enables your data to span both RAM and [SSD](https://en.wikipedia.org/wiki/Solid-state_drive) storage ([flash memory](https://en.wikipedia.org/wiki/Flash_memory)). Keys are always stored in RAM, but Redis on Flash manages the location of their values. Frequently used (hot) values are stored on RAM, but infrequently used (warm) values are moved to flash memory. This saves on expensive RAM space, which give you comparable performance at a lower cost for large datasets.

For more info, see [Redis on Flash]({{<relref "/rs/databases/redis-on-flash/">}}).

## Shard placement

The location of the primary and replica shards on the cluster nodes can impact your database performance.
Primary shards and their corresponding replica shards are always placed on separate nodes for data resiliency and high availability.
The shard placement policy helps to maintain optimal performance and resiliency.

Redis Enterprise Software has two shard placement policies available:

- **dense**: puts as many shards as possible on the smallest number of nodes
- **sparse**: spread the shards across as many nodes as possible

For more info about the shard placement policy, see [Shard placement policy]({{<relref "content/rs/databases/memory-performance/shard-placement-policy.md.md">}})

## Metrics

From the Redis Enterprise Software admin console, you can monitor the performance of your clusters, nodes, databases, and shards with real-time metrics. You can also enable alerts for node, cluster, or database events such as high memory usage or throughput.

With the Redis Enterprise Software API, you can also integrate Redis Enterprise metrics into other monitoring environments, such as Prometheus.

For more info about monitoring with Redis Enterprise Software, see [Monitoring with metrics and alerts]({{<relref "/rs/clusters/monitoring/_index.md">}}), and [Memory statistics]({{<relref "/rs/clusters/optimize/node-memory.md#memory-statistics">}}).

## Scaling databases

Each Redis Enterprise cluster can contain multiple databases. In Redis,
databases represent data that belong to a single application, tenant, or
microservice. Redis Enterprise is built to scale to 100s of databases
per cluster to provide flexible and efficient multi-tenancy models.

Each database can contain few or many Redis shards. Sharding is
transparent to Redis applications. Master shards in the database process
data operations for a given subset of keys. The number of shards per
database is configurable and depend on the throughput needs of the
applications. Databases in Redis Enterprise can be resharded into more
Redis shards to scale throughput while maintaining sub-millisecond
latencies. Resharding is performed without downtime.

![Sharding diagram](/images/rs/sharding.png)

*Figure 2*
*Redis Enterprise places master node (M) and replicas (R) in separate
nodes, racks and zones and use in-memory replication to protect data
against failures.*

In Redis Enterprise, each database has a quota of RAM. The quota cannot
exceed the limits of the RAM available on the node. However, with Redis
Enterprise Flash, RAM is extended to the local flash drive (SATA, NVMe
SSDs etc). The total quota of the database can take advantage of both
RAM and Flash drive. The administrator can choose the RAM vs Flash ratio
and adjust that anytime in the lifetime of the database without
downtime.

With Redis on Flash, instead of storing all keys and data for a
given shard in RAM, less frequently accessed values are pushed to flash.
If applications need to access a value that is in flash, Redis
Enterprise automatically brings the value into RAM. Depending on the
flash hardware in use, applications experience slightly higher latency
when bringing values back into RAM from flash. However subsequent
accesses to the same value is fast, once the value is in RAM.