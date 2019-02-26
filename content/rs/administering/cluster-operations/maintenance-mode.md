---
Title: Maintenance Mode for Cluster Nodes
description: Prepare node for maintenance, and restore it to previous state
weight: $weight
alwaysopen: false
categories: ["RS"]
---
When you need to do hardware or operating system maintenance on an RS server,
it is important that you move all of the shards on that server to another node to avoid the risk of data loss.
You can use maintenance mode to handle this process simply and efficiently.

## Turning Maintenance Mode ON

When you turn maintenance mode on, RS:

1. Checks whether shutdown of the node causes quorum loss. If so, maintenance mode is not turned on.
1. Takes a snapshot of the node configuration as a record of which shards and endpoints are on node at that time.
1. Marks the node as a quorum node to prevent shards from migrating into the node.
1. Migrates shards to other nodes and binds endpoints to other nodes.

{{% note %}}
If the node is the master node in the cluster, maintenance mode does not demote the node.
As usual, the cluster elects a new master node when the master node is restarted.
{{% /note %}}

To turn maintenance mode on, on one of the nodes in the cluster run:

```src
$ rladmin node <node_id> maintenance_mode on
```

After all of the shards are moved from the node, it is safe to do maintenance on the server.

### Prevent slave shard migration

If you do not have enough resources in other cluster nodes to migrate all of the shards to other nodes,
you can turn maintenance mode on without migrating the slave shards.

{{% warning %}}
If you prevent slave shard migration, the slave shards are kept on the node during maintenance.
If the node fails, the master shards will not have slave shards for data redundancy.
{{% /warning %}}

To turn maintenance mode on and prevent slave shard migration, on one of the nodes in the cluster run:

```src
$ rladmin node <node_id> maintenance_mode on keep_slave_shards
```

## Turning Maintenance Mode OFF

When you turn maintenance mode off, RS:

1. Loads the latest snapshot, unless a snapshot is specified.
1. Unmarks the node as a quorum node to allow shards to migrate into the node.
1. Restores the shards and endpoints that were in node at the time when the snapshot was taken.
1. Deletes the configuration snapshot.

To turn maintenance mode off after you finish the server maintenance, on one of the nodes in the cluster run:

```src
$ rladmin node <node_id> maintenance_mode off
```

### Specifying a snapshot

Each time maintenance mode is turned on, a snapshot of the node configuration is saved.
If there are multiple snapshots, you can restore a specified snapshot when you turn maintenance mode off.

To specify a snapshot when you turn maintenance mode off, on one of the nodes in the cluster run:

```src
$ rladmin node <node_id> maintenance_mode off snapshot_name <snapshot_name>
```

We recommend that you use the earliest snapshot available because it contains the original state of the node.

### Skipping shard restoration

If you do not want to change the distribution of shards in the cluster when you turn maintenance mode off,
you can turn maintenance mode off and prevent the shards from moving back to the node.

To skip shard restoration, on one of the nodes in the cluster run:

```src
$ rladmin node <node_id> maintenance_mode off skip_shards_restore
```
