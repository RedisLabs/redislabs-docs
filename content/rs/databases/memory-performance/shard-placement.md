---
Title: Shard placement
linkTitle: Shard placement
description: Detailed info about shard placement.
weight: 30
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/concepts/rebalancing-shard-placement/,
    /rs/concepts/shard-placement-policy.md,
    /rs/concepts/shard-placement-policy/,
    /rs/concepts/memory-architecture/shard-placement-policy.md,
    /rs/concepts/memory-architecture/shard-placement-policy/,
    /rs/concepts/memory-performance/shard-placement-policy.md,
    /rs/concepts/memory-performance/shard-placement-policy/,
    /rs/databases/configure/shard-placement-policy.md,
    /rs/databases/configure/shard-placement-policy/,
    /rs/databases/memory-performance/shard-placement-policy.md,
    /rs/databases/memory-performance/shard-placement-policy.md,
]
---

In Redis Enterprise Software, the location of master and replica shards on the cluster nodes can impact the database and node performance.
Master shards and their corresponding replica shards are always placed on separate nodes for data resiliency.
The shard placement policy helps to maintain optimal performance and resiliency.

The following factors determine shard placement:

- [Shard placement policy]({{<relref "/rs/references/policies/default-shards-placement">}})

- Separation of master and replica shards

- Available persistence and Redis on Flash (RoF) storage

- [Rack awareness]({{<relref "/rs/clusters/configure/rack-zone-awareness">}})

- Memory available to host the database when fully populated

## Dense shard placement

With the `dense` shard placement policy, the cluster places database shards on as few nodes as possible.
When the node is not able to host all of the shards, the cluster moves some shards to another node.

For example, for a database with two master and two replica shards on a cluster with three nodes and a dense shard placement policy, the two master shards are hosted on one node and the two replica shards are hosted on another node.

![dense_placement](/images/rs/dense_placement.png)

*Figure: Three nodes with two master shards (red) and two replica shards (grey) with a dense placement policy*

{{<note>}}
For standard (RAM-only) Redis databases without the [OSS cluster API enabled]({{<relref "/rs/databases/configure/oss-cluster-api">}}), use the `dense` policy to optimize performance.
{{</note>}}

## Sparse shard placement

With the `sparse` shard placement policy, the cluster places shards on as many nodes as possible to distribute the shards of a database across all available nodes.
When all nodes have database shards, the shards are distributed evenly across the nodes.

For example, for a database with two master and two replica shards on a cluster with three nodes and a sparse shard placement policy:

- Node 1 hosts one of the master shards.
- Node 2 hosts the replica for the first master shard.
- Node 3 hosts the second master shard.
- Node 1 hosts the replica shard for master shard 2.

![sparse_placement](/images/rs/sparse_placement.png)

*Figure: Three nodes with two master shards (red) and two replica shards (grey) with a sparse placement policy*

{{<note>}}
For [Redis on Flash]({{<relref "/rs/databases/redis-on-flash">}}) databases and standard (RAM-only) Redis databases with the [OSS cluster API enabled]({{<relref "/rs/databases/configure/oss-cluster-api">}}), use the `sparse` policy to optimize performance.
{{</note>}}

## More info

- [Shard placement policy reference]({{<relref "/rs/references/policies/default-shards-placement">}})

- [Configure the shard placement policy]({{<relref "/rs/databases/configure/shard-placement">}}) for each database
