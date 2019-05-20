---
Title: Rack-zone awareness in Redis Enterprise Software
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
The rack-zone awareness feature enables more sophisticated placement of
database shards and endpoints in high-availability scenarios, as
compared to non-rack-zone aware configuration.

When you enable rack-zone awareness in the cluster, you need to assign
each node to a rack-zone ID. This ID is used for mapping the node to a
physical rack or a logical zone (which itself is mapped to a physical
rack). The cluster can then make sure that master shards and corresponding
slave shards, and similarly endpoints, are placed on nodes in different
racks. Thus, if a rack fails and master / slave failover takes place,
the slaves are much more likely to be available because they reside on
different racks.

There is no limitation on the number of racks-zones per cluster; each
node can belong to a different rack or multiple nodes can belong to the
same rack.

Rack-zone awareness affects various cluster, node and database-related
actions, such as node rebalancing, node removal, node replacement, shard
and endpoint migration, and database failover.

To benefit from rack-zone awareness, you need to configure it at the
cluster, node and database levels.

## Cluster/node configuration

In order for the cluster to support rack-zone awareness, you need to
enable it when initially creating the cluster. Afterwards, every time
you add a new node to the cluster you need to define a "rack-zone ID"
for the node.

The rack-zone ID must comply with the following rules:

- Length: up to 63 characters.
- Characters: only letters, digits and hyphen ('-') are allowed.
- Start with a letter and end with a letter or a digit.
- Case insensitive: note that uppercase and lowercase letter are
    treated exactly the same.

**Note**: The rack-zone ID is case-insensitive, i.e. uppercase and
lowercase letters are treated exactly the same.

## Database configuration

Once the cluster has been configured to support rack-zone awareness, and
it includes nodes with at least two different rack-zone IDs, you can
create a rack-zone aware database.

Rack-zone awareness is only relevant for databases that have slave
shards, meaning that the database has replication enabled. After you
enable replication for the database you can choose to also enable
rack-zone awareness as well.

If you do not enable rack-zone awareness for the database, the cluster
does not ensure the masters and corresponding slaves are placed on nodes
residing in different racks. However, the cluster still makes sure that master
and slaves are placed on different nodes, in order to ensure
high-availability, as it would in a non-rack-zone aware cluster.
