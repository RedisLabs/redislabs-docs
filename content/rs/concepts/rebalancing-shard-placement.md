---
Title: Rebalancing and Shard Placement
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Redis Enterprise Software (RS) cluster offer a few master and slave
shard placement policies that govern how shards of each database is
distributed and placed both at creation and at resharding.

## Shard Placement

The placement of shards governs how the node resources are utilized
across the cluster for each database.

There are two types of policies for placement of shards. The policies
can be set up at the cluster level to impact new databases on the
cluster or can be overridden on each database for finer grain control of
the placement policy.

### Dense Shard Placement Policy

"Dense" placement policy implies that as long as a node has enough quota
for the memory allocated to the database, shards are placed on the same
node. If a given node no longer has the ability to host all shards, then
a new node is engaged for the remaining shards of the database.

For example, with three nodes and dense shard placement policy, a
database with two master and two slave shards would end up occupying
node 1 and node 2. Node 1 holds the master shards and node 2 for all
slave shards. This policy would be useful in cases where you want to
engage fewer system resources and a single or only a few of the proxies
in the system for data access to this database.

![dense_placement_1-1](/images/rs/dense_placement_1-1.png?width=550&height=463)
*Figure: Three node Redis Enterprise Cluster with two master shards in
red
and two slave shards in gray with a dense placement policy*

### Sparse Shard Placement Policy

"Sparse" placement policy implies that a maximum number of nodes in the
system are utilized to distribute the shards of a database. Obviously,
if a given node no longer has the ability to host shards, then a new
node is engaged for the remaining shards of the database.

For example, with three nodes and sparse shard placement policy, a
database with two master and two slave shards would end up occupying all
nodes in the cluster. Node 1 holds one of the master shards, Node 2
holds the slave for the master shard. Node 3 holds the second master
shard and node 1 used for the slave shard for master shard 2. This
policy would be useful in cases where you want to engage as much of the
system resources and many proxies in the system for data access to this
database.

![sparse_placement_1-1](/images/rs/sparse_placement_1-1.png?width=555&height=474)
*Figure: Three node Redis Enterprise Cluster with two master shards in
red
and two slave shards in gray with sparse placement policy.*

## Slave Shard Placement

In a Redis Enterprise cluster, when replication is enabled on a
database, master and slave shards carry identical data and clusters
replication capabilities communicate all updates from the master shards
to the slave shard. As the goal of replication between master and slave
shards is high availability and protection against failures, Redis
Enterprise cluster makes sure that the master and slave shards are never
placed on the same node.

Administrators can also protect against rack or zone failures by
defining the rack or zone number for each node that signifies node
placement. When the rack id of two nodes are the same, the system
assumes the nodes are running in the same rack or zone and if rack ids
differ between nodes, the system understands that the nodes are on
different racks or zones. This added configuration can help place shards
for better protection against rack or zone failures. When rack and zone
protection is enabled, Redis Enterprise Software cluster makes sure that master
and slave shards are never placed in the same rack or zone. This means
if an entire node or rack fails and takes out a few nodes of the
cluster, Redis Enterprise can continue to function without downtime as
it can promote the slaves placed under other racks or zones.
