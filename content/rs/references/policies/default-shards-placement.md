---
Title: Default shard placement policy
linkTitle: default_shards_placement
description: Detailed info about the shard placement policy.
weight: $weight
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: 
---

The location of master and replica shards on a Redis Enterprise cluster's nodes can impact the performance of databases and nodes. The shard placement policy helps maintain optimal performance and resiliency.

{{<note>}}
Master shards and their corresponding replica shards are always placed on separate nodes for data resiliency.
{{</note>}}

When you create a Redis Enterprise Software cluster, the default shard placement policy (`dense`) is assigned to all databases that you create on the cluster.

To change an existing database's shard placement policy, you can [override the cluster's default shard placement policy](#override-default-policy).

## Policy values

| Value | Description |
|-------|-----------------|
| dense | Place as many shards as possible on the smallest number of nodes to reduce the latency between the proxy and the database shards (default)<br/><br/>Recommended for Redis on RAM databases to optimize memory resources |
| sparse | Spread the shards across as many nodes in the cluster as possible to spread the traffic across cluster nodes<br/><br/>Recommended for Redis on Flash databases to optimize disk resources |

### Dense shard placement

With the `dense` shard placement policy, the cluster places database shards on as few nodes as possible.
When the node is not able to host all of the shards, the cluster moves some shards to another node.

For example, if a three-node cluster hosts a database with two master shards and two replica shards and the shard placement policy is `dense`, the cluster places both master shards on one node and the two replicas on another node.

![dense_placement](/images/rs/dense_placement.png)

*Figure: Three nodes with two master shards (red) and two replica shards (grey) with a dense placement policy*

{{<note>}}
For Redis on RAM databases without the OSS cluster API enabled, use the `dense` policy to optimize performance.
{{</note>}}

### Sparse shard placement

In the sparse policy, the cluster places shards on as many nodes as possible to distribute the shards of a database across all available nodes.
When all nodes have database shards, the shards are distributed evenly across the nodes to maintain optimal node health.

For example, for a database with two master and two replica shards on a cluster with three nodes and a sparse shard placement policy:

- Node 1 hosts one of the master shards
- Node 2 hosts the replica for the first master shard
- Node 3 hosts the second master shard
- Node 1 hosts for the replica shard for master shard 2

For Redis on RAM databases with OSS cluster API enabled and for Redis on Flash databases, use the sparse policy to optimize performance.

![sparse_placement](/images/rs/sparse_placement.png)

*Figure: Three nodes with two master shards (red) and two replica shards (grey) with a sparse placement policy*

## Examples

### Change default policy

To change the default shard placement policy so that new databases are created with the `sparse` shard placement policy, run [`rladmin tune cluster`]({{<relref "/rs/references/cli-utilities/rladmin/tune#tune-cluster">}}):

```sh
$ rladmin tune cluster default_shards_placement sparse
```

### Override default policy

To change the shard placement policy for an individual database, run [`rladmin placement`]({{<relref "/rs/references/cli-utilities/rladmin/placement">}}):

```sh
$ rladmin placement db db:ID sparse
Shards placement policy is now sparse
```