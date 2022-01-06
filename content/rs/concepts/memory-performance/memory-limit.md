---
Title: Database memory limits
linktitle: Memory limits
description:
weight: 10
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/administering/database-operations/memory-limit/, 
    /rs/administering/database-operations/memory-limit.md, 
    /rs/concepts/memory-architecture/memory-limit/,
    /rs/concepts/memory-architecture/memory-limit.md,
    /rs/concepts/memory-performance/memory-limit.md,
    /rs/concepts/memory-performance/memory-limit/,
]
---
When you set a database's memory limit, you define the maximum size the
database can reach in the cluster, across all database replicas and
shards, including:

- Replica shards (if database replication is enabled)
- Database shards (if database clustering is enabled)<!--more-->

If the total size of the database in the cluster reaches the memory
limit, the data eviction policy that was defined for the database is
applied.

The following examples show how different database configurations affect
the total database size.

## Example 1

You create a database and:

- Set the memory limit to 4 GB
- Enable database replication in order to ensure high-availability

The cluster creates two shards: a primary and a replica. Each 
shard has a maximum size of 2 GB. In this case, the maximum
dataset size that you can store in the database is 2 GB.

## Example 2

You create a database and:

- Set the memory limit to 6 GB
- Enable database clustering and configure the database to have three shards
- Do not enable replication

The cluster creates three shards. Each of these shards can have a
different size depending on the amount of data stored in it, as long as
the total size across all shards does not exceed 6 GB. In this case, the
maximum dataset size you can store in the database is 6 GB.

## Example 3

You create a database and:

- Set the memory limit to 6 GB
- Enable database clustering and configure the database to have three shards
- Enable database replication in order to ensure high-availability

The cluster creates 6 shards in total - three primary shards and three replica 
shards. Each of these shards can have a different size depending on the
amount of data stored in it, as long as the total size across all master
shards does not exceed 3 GB. In this case, the maximum dataset size you
can store in the database is 3 GB.

{{< warning >}}
If you edit an existing database that already has data in it,
some updates might fail as they could cause the total database size to exceed the memory limit.
For example, enabling replication doubles the existing database size,
which may then exceed the memory limit.<br/><br/>
In these cases, you must update the memory limit before you can make the change.
{{< /warning >}}
