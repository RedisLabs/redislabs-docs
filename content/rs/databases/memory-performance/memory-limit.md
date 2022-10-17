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
]
---
When you set a database's memory limit, you define the maximum size the
database can reach in the cluster, across all database replicas and
shards, including both primary and replica shards. 

If the total size of the database in the cluster reaches the memory
limit, the data eviction policy is
applied.

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
- **flash to RAM ratio**: 

- [**database persistence**]({{<relref "/rs/databases/configure/database-persistence/">}}): Redis on Flash uses dual database persistence where both the primary and replica shards persist to disk. This may add some processor and network overhead, especially in cloud configurations with network attached storage.

## What happens when Redis Enterprise Software is low on RAM?

If a node is low on RAM, RS follows this order of priority:

1. If there are other nodes available, your shards migrate to other nodes.
2. If the eviction policy allows eviction, shards start to release memory,
which can result in data loss.
3. If the eviction policy does not allow eviction, you'll receive
out of memory (OOM) messages.
4. If shards can't free memory, RS relies on the OS processes to stop replicas,
but tries to avoid stopping primary shards.

We recommend that you have a [monitoring platform]({{<relref "content/rs/clusters/monitoring/">}}) that alerts you before a system gets low on RAM.
You must maintain sufficient free memory to make sure that you have a healthy RS installation.

## Memory metrics

The admin console provides metric information 

Free RAM
RAM fragmentation
Used memory
Memory usage
Memory limit

## Use case examples

The following examples show how different database configurations affect
the total database size.

### Example 1

You create a database and:

- Set the memory limit to 4 GB
- Enable database replication in order to ensure high-availability

The cluster creates two shards: a primary and a replica. Each 
shard has a maximum size of 2 GB. In this case, the maximum
dataset size that you can store in the database is 2 GB.

### Example 2

You create a database and:

- Set the memory limit to 6 GB
- Enable database clustering and configure the database to have three shards
- Do not enable replication

The cluster creates three shards. Each of these shards can have a
different size depending on the amount of data stored in it, as long as
the total size across all shards does not exceed 6 GB. In this case, the
maximum dataset size you can store in the database is 6 GB.

### Example 3

You create a database and:

- Set the memory limit to 6 GB
- Enable database clustering and configure the database to have three shards
- Enable database replication in order to ensure high-availability

The cluster creates 6 shards in total - three primary shards and three replica 
shards. Each of these shards can have a different size depending on the
amount of data stored in it, as long as the total size across all primary
shards does not exceed 3 GB. In this case, the maximum dataset size you
can store in the database is 3 GB.

{{< warning >}}
If you edit an existing database that already has data in it,
some updates might fail as they could cause the total database size to exceed the memory limit.
For example, enabling replication doubles the existing database size,
which may then exceed the memory limit.<br/><br/>
In these cases, you must update the memory limit before you can make the change.
{{< /warning >}}
