---
Title: Maintenance Mode for Cluster Nodes
description: Prepare node for maintenance, and restore it to previous state
weight: $weight
alwaysopen: false
categories: ["RS"]
---
When you need to do hardware or operating system maintenance on a server that hosts an Redis Enterprise Software (RS) node,
it is important that you move all of the shards on that node to another node to protect the data.
You can use maintenance mode to handle this process simply and efficiently.

For example, when you have a 3 node cluster with 4 shards, the status of the cluster is:

```sh
redislabs@rp1_node1:/opt$ rladmin status
CLUSTER NODES:
NODE:ID   ROLE     ADDRESS       EXTERNAL_ADDRESS     HOSTNAME    SHARDS
*node:1   master   172.17.0.2                         rp1_node1   2/100
node:2    slave    172.17.0.4                         rp3_node1   2/100
node:3    slave    172.17.0.3                         rp2_node1   0/100
```

When you turn on maintenance mode for node 2, RS takes a snapshot and then moves the shards and endpoints from node 2 to another node. In our example, they are moved to node 3.

The node in maintenance mode shows that 0/0 shards are on the node because no shards can be accepted on node 2. A node in quorum_only mode also shows 0/0 shards.

```sh
redislabs@rp1_node1:/opt$ rladmin node 2 maintenance_mode on
Performing maintenance_on action on node:2: 0%
created snapshot NodeSnapshot<name=maintenance_mode_2019-03-14_09-50-59,time=None,node_uid=2>

node:2 will not accept any more shards
Performing maintenance_on action on node:2: 100%
OK
redislabs@rp1_node1:/opt$ rladmin status
CLUSTER NODES:
NODE:ID   ROLE     ADDRESS       EXTERNAL_ADDRESS     HOSTNAME    SHARDS
*node:1   master   172.17.0.2                         rp1_node1   2/100
node:2    slave    172.17.0.4                         rp3_node1   0/0
node:3    slave    172.17.0.3                         rp2_node1   2/100
```

## Turning maintenance mode ON

When you turn maintenance mode on, RS:

1. Checks whether shutdown of the node causes quorum loss in the current cluster state. If so, maintenance mode is not turned on.

    {{< warning >}}
Maintenance mode does not protect against quorum loss. If you enable maintenance mode for the majority of nodes in a cluster and restart them simultaneously,
the quorum is lost and it can result data loss.
    {{< /warning >}}

1. Takes a snapshot of the node configuration as a record of which shards and endpoints are on the node at that time.
1. Marks the node as a quorum node to prevent shards and endpoints from migrating into the node.
    The maintenance node entry in the rladmin status output is colored yellow to indicate that it cannot accept shard migration, just as a quorum_only node.
    ![maintenance_mode](/images/rs/maintenance_mode.png)
1. Migrates shards to other nodes and binds endpoints to other nodes, if space is available on other nodes.

{{< note >}}
If the node is the master node in the cluster, maintenance mode does not demote the node.
As usual, the cluster elects a new master node when the master node is restarted.
{{< /note >}}

To turn maintenance mode on, on one of the nodes in the cluster run:

```sh
rladmin node <node_id> maintenance_mode on
```

After all of the shards and endpoints are moved from the node, it is safe to do maintenance on the server if there are enough nodes up to maintain the quorum.

### Prevent slave shard migration

If you do not have enough resources in other cluster nodes to migrate all of the shards to other nodes,
you can turn maintenance mode on without migrating the slave shards.

{{< warning >}}
If you prevent slave shard migration, the slave shards are kept on the node during maintenance.
If the maintenance node fails, the master shards do not have slave shards for data redundancy and high availability.
{{< /warning >}}

To turn maintenance mode on and prevent slave shard migration, on one of the nodes in the cluster run:

```sh
rladmin node <node_id> maintenance_mode on keep_slave_shards
```

### Demoting a master node in maintenance mode

When you turn maintenance mode on for a master node in order to do maintenance that interrupts connectivity to the master node,
you can demote the master node so that another node becomes the master.
When you demote the master node, it takes less time for the cluster to elect a new master than if the cluster detects that the master not available.

To demote a master node when you turn on maintenance mode:

```sh
rladmin node <node_id> maintenance_mode on demote_node
```

## Turning maintenance mode OFF

When you turn maintenance mode off, RS:

1. Loads the latest snapshot, unless a snapshot is specified.
1. Unmarks the node as a quorum node to allow shards and endpoints to migrate into the node.
1. Restores the shards and endpoints that were in node at the time when the snapshot was taken.
1. Deletes the snapshot.

To turn maintenance mode off after you finish the server maintenance, on one of the nodes in the cluster run:

```sh
rladmin node <node_id> maintenance_mode off
```

### Specifying a snapshot

Each time maintenance mode is turned on, a snapshot of the node configuration is saved.
If there are multiple snapshots, you can restore a specified snapshot when you turn maintenance mode off.

To specify a snapshot when you turn maintenance mode off, on one of the nodes in the cluster run:

```sh
rladmin node <node_id> maintenance_mode off snapshot_name <snapshot_name>
```

{{< note >}}
If an error happens when you turn on maintenance mode, the snapshot is not deleted.
When you re-run the command,
we recommend that you use the snapshot from the initial attempt because it contains the original state of the node.
{{< /note >}}

To see the list of available snapshots, run:

```sh
rladmin node <node_id> snapshot list
```

### Skipping shard restoration

If you do not want to change the distribution of shards and endpoints in the cluster when you turn maintenance mode off,
you can turn maintenance mode off and prevent the shards and endpoints from moving back to the node.

To turn maintenance mode off and skip shard restoration, on one of the nodes in the cluster run:

```sh
rladmin node <node_id> maintenance_mode off skip_shards_restore
```
