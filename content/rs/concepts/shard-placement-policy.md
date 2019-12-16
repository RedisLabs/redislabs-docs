---
Title: Shard Placement Policy
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/concepts/rebalancing-shard-placement/
---
{{< embed-md "shard-placement-intro.md"  >}}

## Shard Placement Policy

The shard placement policies are:

- dense - Place as many shards as possible on the smallest number of nodes to reduce the latency between the proxy and the database shards.
- sparse - Spread the shards across as many nodes in the cluster as possible to spread the traffic across cluster nodes.

When you create a cluster, the default shard placement policy on the cluster is **dense**.
The default policy is assigned to all databases that you create on the cluster.

### Dense Shard Placement Policy

In the dense policy, shards are placed on the same node
as long as the node has enough available memory for the memory allocated to the database.
When the node is not able to host all of the shards, some shards are moved to another node to maintain optimal node health.

For example, for a database with 2 master and 2 slave shards on a cluster with three nodes and a dense shard placement policy,
the 2 master shards are hosted on one node and the 2 slave shards are hosted on another node.

The dense policy helps to use less system resources and proxies for access to the database.

![dense_placement_1-1](/images/rs/dense_placement_1-1.png?width=550&height=463)

*Figure: Three nodes with two master shards (red) and two slave shards (grey) with a dense placement policy*

### Sparse Shard Placement Policy

In the sparse policy, shards are placed on separate nodes
to distribute the shards of a database across all available nodes.
When all nodes have database shards, the shards are distributed evenly across the nodes to maintain optimal node health.

For example, for a database with 2 master and 2 slave shards on a cluster with three nodes and a sparse shard placement policy:

- Node 1 hosts one of the master shards
- Node 2 hosts the slave for the first master shard
- Node 3 hosts the second master shard
- Node 1 hosts for the slave shard for master shard 2

The dense policy helps to use less system resources and proxies for access to the database.

![sparse_placement_1-1](/images/rs/sparse_placement_1-1.png)

*Figure: Three nodes with two master shards (red) and two slave shards (grey) with a sparse placement policy*
