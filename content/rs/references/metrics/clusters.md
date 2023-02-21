---
Title: Cluster, Node, and Shard Metrics
linkTitle: Clusters, Nodes, and Shards
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases:
---

## Connections

Number of connections to the database.

**Components measured**: Cluster, Node, and [Database]({{<relref "/rs/references/metrics/databases">}})

## CPU Usage

Percent of the node CPU used. 

**Components measured**:  Cluster and Node

## Free disk space

Remaining unused disk space.

**Components measured**:  Cluster and Node

## Free RAM

Available RAM for System use.

**Components measured**:  Cluster and Node

## Incoming traffic

Total incoming traffic to the database in bytes per second.

Incoming traffic is not collected during [shard migration]({{< relref "/rs/databases/configure/replica-ha" >}}). If you view the database or shard metrics while resharding, the graph is blank.

**Components measured**: Cluster, Node, and [Database]({{<relref "/rs/references/metrics/databases">}})

## Outgoing traffic

Total outgoing traffic from the database in bytes per second.

Outgoing traffic is not collected during [shard migration]({{< relref "/rs/databases/configure/replica-ha" >}}). If you view the database or shard metrics while resharding, the graph is blank.

**Components measured**: Cluster, Node, and [Database]({{<relref "/rs/references/metrics/databases">}})