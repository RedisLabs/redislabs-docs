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
a [rack-zone ID](#rack-zone-id-rules) to each node. This ID is used to map the node to a
physical rack or logical zone. The cluster can then ensure that master shards, corresponding replica shards, and associated endpoints are placed on [nodes in different racks or zones](#node-layout-guidelines).

In the event of a rack or zone failure, the replicas and endpoints in the remaining racks and zones are promoted. This ensures high availability when a rack or zone fails.

There is no limitation on the number of racks and zones per cluster. Each
node can belong to a different rack or multiple nodes can belong to the
same rack.

Rack-zone awareness affects various cluster, node, and database actions, such as node rebalancing, node removal, node replacement, shard and endpoint migration, and database failover.

## Rack-zone ID rules

The rack-zone ID must comply with the following rules:

- Maximum length of 63 characters.
- Characters consist of letters, digits, and hyphens ('-'). Underscores ('_') are also accepted as of Redis Enterprise Software [6.4.2-61]({{<relref "/rs/release-notes/rs-6-4-2-releases/rs-6-4-2-61">}}).
- ID starts with a letter and ends with a letter or a digit.

{{< note >}}
Rack-zone IDs are **case-insensitive** (uppercase and lowercase letter are treated as the same).
{{< /note >}}

## Node layout guidelines

If a Redis Enterprise Software cluster consists of three nodes (the recommended minimum), follow these guidelines:

- For high availability, the three nodes must be distributed across three *distinct* racks or zones.

- When using availability zones, all three zones should exist within the same *region* to avoid potential latency issues.

Keep in mind that one of the nodes in your cluster can be a quorum-only node, assuming compute resources are limited. Therefore, the minimum rack-zone aware Redis Enterprise Software deployment consists of two data nodes and one quorum-only node, where each node exists in a distinct rack or zone.

## Configure rack-zone awareness

To enable rack-zone awareness, you need to configure it for the
cluster, nodes, and databases.

### New cluster

During cluster creation, you can configure

1. When you [set up a new cluster]({{<relref "/rs/clusters/new-cluster-setup">}}), select **Enable rack-zone awareness**.

1. Enter a **Rack-zone ID** for the current node.

1. For every [node you add to the cluster]({{<relref "/rs/clusters/add-node">}}), assign a different **Rack-zone ID** when prompted.

### Existing cluster

If you did not configure rack-zone awareness during cluster creation, you can configure rack-zone awareness for existing clusters using the [REST API]({{<relref "/rs/references/rest-api">}}):

1. [Update the cluster policy]({{<relref "/rs/references/rest-api/requests/cluster/policy#put-cluster-policy">}}) to enable rack-zone awareness:

    ```sh
    PUT /v1/cluster/policy
    { "rack_aware": true }
    ```

1. For each node in the cluster, assign a different rack-zone ID using the REST API to [update the node]({{<relref "/rs/references/rest-api/requests/nodes#put-node">}}):

    ```sh
    PUT /v1/nodes/<node-ID>
    { "rack_id": "rack-zone-ID" }
    ```

## Enable database rack-zone awareness

After configuring the cluster to support rack-zone awareness, you can create a rack-zone aware database.

Rack-zone awareness is relevant only for databases that have replication enabled (such as databases with replica shards). After you
enable replication for a database, you can also enable rack-zone awareness.

## Shard placement without rack-zone awareness

Even if a database has rack-zone awareness turned off, the cluster still ensures that master and replica shards are placed on distinct nodes.
