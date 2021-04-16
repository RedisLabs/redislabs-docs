---
Title: Database Memory Limits
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
When you set a database's memory limit, you define the maximum size the
database can reach in the cluster, across all database replicas and
shards, including:

- Slave shards (if database replication is enabled)
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

The cluster creates 2 shards: a master and a slave. Each of the
shards have a maximum size of 2 GB. In this case, the maximum
dataset size that you can store in the database is 2 GB.

## Example 2

You create a database and:

- Set the memory limit to 6 GB
- Enable database clustering and configure the database to have 3
    shards
- Do not enable replication

The cluster creates 3 shards. Each of these shards can have a
different size depending on the amount of data stored in it, as long as
the total size across all shards does not exceed 6 GB. In this case, the
maximum dataset size you can store in the database is 6 GB.

## Example 3

You create a database and:

- Set the memory limit to 6 GB
- Enable database clustering and configure the database to have 3
    shards
- Enable database replication in order to ensure high-availability

The cluster creates 6 shards in total - 3 master shards and 3 slave
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
