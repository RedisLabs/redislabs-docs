---
Title: Rack-zone awareness in Redis Enterprise Software
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Rack-zone awareness is a Redis Enterprise feature that helps to ensure high-availability in the event of a rack or zone failure.

When you enable rack-zone awareness in a Redis Enterprise Software (RS) cluster, you assign
a rack-zone ID to each node. This ID is used to map the node to a
physical rack or logical zone. The cluster can then ensure that master shards, corresponding slave shards, and associated endpoints are placed on nodes in different racks/zones.

In the event of a rack or zone failure, the slaves and endpoints in the remaining racks/zones will be promoted. This ensures high availability when a rack or zone fails.

There is no limitation on the number of rack-zones per cluster; each
node can belong to a different rack, or multiple nodes can belong to the
same rack.

Rack-zone awareness affects various cluster, node and database-related
actions, such as node rebalancing, node removal, node replacement, shard and endpoint migration, and database failover.

## Cluster and node configuration

To enable rack-zone awareness, you need to configure it at the
cluster, node, and database levels.

First, enable rack-zone awareness when you initially create the cluster.

Now, every time you add a new node to the cluster, define a **rack-zone ID** for the node.

The rack-zone ID must comply with the following rules:

- Maximum length of 63 characters.
- Characters consist of letters, digits, or hyphens ('-').
- ID starts with a letter and ends with a letter or a digit.

{{< note >}}
Rack-zone IDs are **case-insensitive** (uppercase and lowercase letter are treated as the same).
{{< /note >}}

### Node layout

Recall that the recommended minimum number of nodes in a RS deployment is three. For high availability, these three nodes must be distributed across three *distinct* racks or zones.

When using availability zones, note that all three zones should exist within the same *region* to avoid potential latency issues.

Keep in mind that one of the nodes in your cluster can be a quorum-only node, assuming compute resources are limited. What this means is that the minimum rack-zone aware RS deployment will consist of two data nodes and one quorum-only node, where each of these nodes is situated is a distinct rack or zone.

## Database configuration

Once the cluster has been configured to support rack-zone awareness, you can create a rack-zone aware database.

Rack-zone awareness is relevant only for databases that have replication enabled (i.e., databases with slave shards). Once you
enable replication for a database, you may also enable rack-zone awareness.

## Shard placement without rack-zone awareness

Note that even in the case of a database with rack-zone awareness disabled, the cluster will still ensure that master and slave shards are placed on distinct nodes.
