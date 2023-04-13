---
Title: Rack-zone awareness in Redis Enterprise Software
linkTitle: Rack-zone awareness
description: Rack-zone awareness ensures high availability in the event of a rack or zone failure.
weight: 70
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/concepts/high-availability/rack-zone-awareness.md,
    /rs/concepts/high-availability/rack-zone-awareness/,
    /rs/clusters/configure/rack-zone-awareness.md,
    /rs/clusters/configure/rack-zone-awareness/,
]
---
Rack-zone awareness helps ensure high availability in the event of a rack or zone failure.

When you enable rack-zone awareness in a Redis Enterprise Software cluster, you assign
a rack-zone ID to each node. This ID is used to map the node to a
physical rack or logical zone. The cluster can then ensure that master shards, corresponding replica shards, and associated endpoints are placed on nodes in different racks or zones.

In the event of a rack or zone failure, the replicas and endpoints in the remaining racks and zones are promoted. This ensures high availability when a rack or zone fails.

There is no limitation on the number of racks and zones per cluster. Each
node can belong to a different rack or multiple nodes can belong to the
same rack.

Rack-zone awareness affects various cluster, node, and database actions, such as node rebalancing, node removal, node replacement, shard and endpoint migration, and database failover.

## Cluster and node configuration

To enable rack-zone awareness, you need to configure it at the
cluster, node, and database levels.

1. Enable rack-zone awareness when you initially create the cluster.

1. Every time you add a new node to the cluster, define a **rack-zone ID** for the node.

The rack-zone ID must comply with the following rules:

- Maximum length of 63 characters.
- Characters consist of letters, digits, and hyphens ('-'). Underscores ('_') are also accepted as of Redis Enterprise Software [6.4.2-61]({{<relref "/rs/release-notes/rs-6-4-2-releases/rs-6-4-2-61">}}).
- ID starts with a letter and ends with a letter or a digit.

{{< note >}}
Rack-zone IDs are **case-insensitive** (uppercase and lowercase letter are treated as the same).
{{< /note >}}

### Node layout

If a Redis Enterprise Software cluster consists of three nodes (the recommended minimum), consider the following:

- For high availability, these three nodes must be distributed across three *distinct* racks or zones.

- When using availability zones, all three zones should exist within the same *region* to avoid potential latency issues.

Keep in mind that one of the nodes in your cluster can be a quorum-only node, assuming compute resources are limited. Therefore, the minimum rack-zone aware Redis Enterprise Software deployment consists of two data nodes and one quorum-only node, where each node exists in a distinct rack or zone.

## Database configuration

After configuring the cluster to support rack-zone awareness, you can create a rack-zone aware database.

Rack-zone awareness is relevant only for databases that have replication enabled (such as databases with replica shards). After you
enable replication for a database, you can also enable rack-zone awareness.

## Shard placement without rack-zone awareness

Even if a database has rack-zone awareness turned off, the cluster still ensures that master and replica shards are placed on distinct nodes.
