---
Title: How many Redis databases can I create and manage?
description: 
weight: $weight
alwaysopen: false
---
The number of databases is unlimited. The limiting factor is the
available memory in the cluster, and the number of shards in the
subscription (for additional details, refer to [What do you mean by the
term
Shard?]({{< relref "/rs/faqs/what-do-you-mean-by-the-term-shard.md" >}}).

Note the impact of the specific database configuration on the number of
shards it consumes. For example:

- Enabling database replication, without enabling database clustering,
    creates two shards: a master shard and a slave shard.
- Enabling database clustering creates as many database shards as you
    configure.
- Enabling both database replication and database clustering creates
    double the number of database shards you configure.
