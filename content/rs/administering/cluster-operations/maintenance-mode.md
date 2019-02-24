---
Title: Maintenance Mode for Cluster Nodes
description: Prepare node for maintenance, and restore it to previous state
weight: $weight
alwaysopen: false
categories: ["RS"]
---
From time to time, a node requires maintenance, for reasons relating to
your organization, not to the Redis Enterprise cluster. The Maintenance
Mode is a process to simplify the process of moving Redis shards away
from node, and returning them after the maintenance is done.

## Basic Usage

Connect via SSH to the cluster, and use rladmin:

```src
$ rladmin node <id> maintenance_mode on
```

Wait for cluster to remove all Redis shards from node, and perform
maintenance. Once maintenance is done, use the following to return the
shards that were on the node back:

```src
$ rladmin node <id> maintenance_mode off
```

## Maintenance On Steps

1. Checks that node with that id exists in the cluster.
1. Checks that cluster will not lose quorum if node is shut off.
1. Cluster takes a snapshot of node. This is a record of which shards
and endpoints are on node at that time. This is not an RDB snapshot of
the actual data, but just the node configuration
1. Prevents shards from migrating into the node, by making it a quorum
node.
1. Cluster tries to evict node. By default, all shards will be migrated
to other nodes, and endpoints will be bound to other nodes.

**Note:**
If maintained node if the cluster's master node, process won't demote
it. If node is restarted, the cluster will automatically elect another
master node.


### dont_migrate_slave_shards flag
If flag is specified, cluster will not attempt to migrate shards out of
the node, but will failover all master shards. This is useful when you
have a small cluster, that does not have enough resources to migrate
all shards out of a maintained node. Be advised - this means there
might be slave shards on node during maintenance.

## Maintenance Off Steps

1. Checks that node with that id exists in the cluster, and is alive.
1. Checks if a specific snapshot was requested, and if not gets the
latest available one.
1. Allows shards to migrate into the node (turn off quorum only node).
1. Restore shards and endpoints that were in node at the time when
the snapshot was taken.
1. Delete the configuration snapshot.

### Specifying which snapshot to restore

If maintenance was turned on multiple times, you will end up with
multiple snapshots. If you want to request a specific snapshot, you can
do so by specifying which snapshot in the maintenance off command:

```src
$ rladmin node <id> maintenance_mode off restore_from_snapshot <snaphot name>
```

It is a good idea to choose the earliest snapshot in this case, as it
has the original state of the node, before maintenance mode was used.

### dont_restore flag

If you prefer not to restore the shards to the node that was in
maintenance, you can do this using the flag:

```src
$ rladmin node <id> maintenance_mode off dont_restore
```

You might want to skip the restoration phase if the original
distribution of shards was not better than the current one. This process
is much faster if shards are not returned to node.
