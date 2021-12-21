---
Title: Memory and performance
linktitle: Memory and performance
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Redis Enterprise Software has multiple mechanisms in its
architecture to help optimize storage and performance.

## Memory limits

Database memory limits define the maximum size your database can reach across all database replicas and [shards]({{<relref "rs/concepts/terminology/.md#redis-instance-shard">}}) on the cluster. This limit includes data values, keys, module data, and overhead for other features.

There are a number of factors to consider when sizing your database:

- dataset size: you want your limit to be above your dataset size to leave room for overhead.
- database throughput: high throughput needs a higher memory limit.
- modules: using modules with your database consumes more memory.
- database clustering: spreading your data into shards across multiple nodes means you cannot disable clustering or reduce the number of shards later.
- database replication: enabling replication doubles memory consumption
- Active-Active replication: enabling Active-Active replication requires double the memory of regular replication, which can be up to four times(4x) the original data size.

## Eviction policies

When a database exceeds its memory limit, eviction policies determine which data is removed. The eviction policy removes keys based on frequency of use, how recently used, randomly, expiration date, or a combination of these factors. The policy can also be set to `noeviction` to return a memory limit error when trying to insert more data.

The default eviction policy for databases is `volatile-lru` which evicts the least recently used keys out of all keys with the ‘expire’ field set.

For more information about eviction policies, see [{{<relref "/rs/administering/database-operations/eviction-policy.md”>}}]

## Persistence to disk

Both RAM memory and flash memory are at risk of data loss if a server or process fails. Persisting your data to disk helps protect it against loss in those situations. You can configure persistence at the time of database creation, or by editing the database’s configuration.

There are two main types of persistence strategies in Redis Enterprise Software: append-only files (AoF) and snapshots.

Append-only files (AoF) keep a record of data changes and writes each change to the end of a file, allowing you to recover the dataset by replaying the writes in the append-only log.

Snapshots capture all the data as it exists in one moment in time and writes it to disk, allowing you to recover the entire data set as it existed at that moment in time.

For more information about data persistence see [Database persistence with Redis Enterprise Software]({{<relref “/rs/concepts/data-access/persistence.md”>}}) or [Durable Redis](https://redis.com/redis-enterprise/technology/durable-redis/).

## Redis on Flash (RoF)

By default, Redis Enterprise Software stores your data entirely in [RAM](https://en.wikipedia.org/wiki/Random-access_memory) for improved performance. The [Redis on Flash]({{<relref "/rs/concepts/memory-architecture/redis-flash/">}}) feature enables your data to span both RAM and [SSD](https://en.wikipedia.org/wiki/Solid-state_drive) storage ([flash memory](https://en.wikipedia.org/wiki/Flash_memory)).

## Shard placement


## Metrics

From the Redis Enterprise Software admin console, you can monitor the performance of you clusters, nodes, databases, and shards with real-time metrics. You can also enable alerts for node, cluster, or database events such as high memory usage or throughput.

With the Redis Enterprise Software API, you can also integrate Redis Enterprise metrics into other monitoring environments, such as Prometheus.

For more info about monitoring with Redis Enterprise Software, see [Monitoring with metrics and alerts]({{<relref "/rs/administering/monitoring-metrics.md">}}), and [Memory statistics]({{<relref "/rs/concepts/memory-architecture/memory-management.md#memory-statistics">}})




