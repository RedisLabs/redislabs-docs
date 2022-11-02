---
Title: Database memory limits
linkTitle: Memory limits
description: When you set a database's memory limit, you define the maximum size the database can reach.
weight: 20
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/administering/database-operations/memory-limit/, 
    /rs/administering/database-operations/memory-limit.md, 
    /rs/concepts/memory-architecture/memory-limit/,
    /rs/concepts/memory-architecture/memory-limit.md,
    /rs/concepts/memory-performance/memory-limit.md,
    /rs/concepts/memory-performance/memory-limit/,
    /rs/databases/configure/memory-limit,
    /rs/databases/configure/memory-limit.md,
    /rs/databases/memory-performance/memory-limit.md,
    /rs/databases/memory-performance/memory-limit/,
    /rs/concepts/memory-architecture/memory-management/,
    /rs/concepts/memory-architecture/memory-management.md,
    /rs/concepts/memory-performance/memory-management/,
    /rs/concepts/memory-performance/memory-management.md,
    /rs/clusters/optimize/node-memory.md,
    /rs/clusters/optimize/node-memory/
]
---
When you set a database's memory limit, you define the maximum size the
database can reach in the cluster, across all database replicas and
shards, including both primary and replica shards.

If the total size of the database in the cluster reaches the memory
limit, the data eviction policy is
applied.

## Factors for sizing

Factors to consider when sizing your database:

- **dataset size**: you want your limit to be above your dataset size to leave room for overhead.
- **database throughput**: high throughput needs more shards, leading to a higher memory limit.
- [**modules**]({{<relref "/modules/_index.md">}}): using modules with your database consumes more memory.
- [**database clustering**]({{<relref "/rs/databases/durability-ha/clustering.md">}}): enables you to spread your data into shards across multiple nodes.
- [**database replication**]({{<relref "/rs/databases/durability-ha/replication.md">}}): enabling replication doubles memory consumption.

Additional factors for Active-Active databases:

- [**Active-Active replication**]({{<relref "/rs/databases/active-active/_index.md">}}): enabling Active-Active replication requires double the memory of regular replication, which can be up to two times (2x) the original data size per instance.
- [**database replication backlog**]({{<relref "/rs/databases/active-active/manage#replication-backlog/">}}) for synchronization between shards. By default, this is set to 1% of the database size.
- [**Active-Active replication backlog**]({{<relref "/rs/databases/active-active/manage.md">}}) for synchronization between clusters. By default, this is set to 1% of the database size.

  It's also important to know Active-Active databases have a lower threshold for activating the eviction policy, because it requires propagation to all participating clusters. The eviction policy starts to evict keys when one of the Active-Active instances reaches 80% of its memory limit.

Additional factors for Redis on Flash databases:

- [**database persistence**]({{<relref "/rs/databases/configure/database-persistence.md">}}): Redis on Flash uses dual database persistence where both the primary and replica shards persist to disk. This may add some processor and network overhead, especially in cloud configurations with network attached storage.

## What happens when Redis Enterprise Software is low on RAM?

Redis Enterprise Software manages node memory so that data is entirely in RAM (unless using Redis on Flash). If not enough RAM is available, RS prevents adding more data into the databases.

Redis Enterprise Software protects the existing data and prevents the database from being able to store data into the shards.

You can configure the cluster to move the data to another node, or even discard it according to the [eviction policy]({{< relref "/rs/databases/memory-performance/eviction-policy.md" >}}) set on each database by the administrator.

[Redis on Flash]({{< relref "/rs/databases/redis-on-flash/" >}})
manages memory so that you can also use flash memory (SSD) to store data.

### Order of events for low RAM

1. If there are other nodes available, your shards migrate to other nodes.
2. If the eviction policy allows eviction, shards start to release memory,
which can result in data loss.
3. If the eviction policy does not allow eviction, you'll receive
out of memory (OOM) messages.
4. If shards can't free memory, RS relies on the OS processes to stop replicas,
but tries to avoid stopping primary shards.

We recommend that you have a [monitoring platform]({{<relref "/rs/clusters/monitoring/">}}) that alerts you before a system gets low on RAM.
You must maintain sufficient free memory to make sure that you have a healthy RS installation.

## Memory metrics

The admin console provides metrics that can help you evaluate your memory use.

- Free RAM
- RAM fragmentation
- Used memory
- Memory usage
- Memory limit

See [console metrics]({{<relref "/rs/clusters/monitoring/console-metrics-definitions.md">}}) for more detailed information.

## Related info

- [Memory and performance]({{<relref "/rs/databases/memory-performance">}})
- [Disk sizing for heavy write scenarios({{<relref "/rs/clusters/optimize/disk-sizing-heavy-write-scenarios.md">}})
- [Turn off services to free system memory]({{<relref "/rs/clusters/optimize/turn-off-services.md">}})4
- [Eviction policy]({{<relref "/rs/databases/memory-performance/eviction-policy.md">}})
- [Shard placement policy]({{< relref "/rs/databases/memory-performance/shard-placement-policy.md ">}})
- [Database persistence]({{<relref "/rs/databases/configure/database-persistence.md">}})