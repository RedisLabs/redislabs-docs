---
Title: Default shard placement policy
linkTitle: default_shards_placement
description: Detailed info about the shard placement policy.
weight: $weight
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: 
---

The [location of master and replica shards]({{<relref "/rs/databases/memory-performance/shard-placement">}}) on a Redis Enterprise cluster's nodes can impact the performance of databases and nodes. The shard placement policy helps maintain optimal performance and resiliency.

{{<note>}}
Master shards and their corresponding replica shards are always placed on separate nodes for data resiliency.
{{</note>}}

When you create a Redis Enterprise Software cluster, the default shard placement policy (`dense`) is assigned to all databases that you create on the cluster.

To change an existing database's shard placement policy, you can [override the cluster's default shard placement policy](#override-default-policy).

## Policy values

| Value | Description |
|-------|-----------------|
| dense | Place as many shards as possible on the smallest number of nodes to reduce the latency between the proxy and the database shards (default).<br/><br/>Recommended for Redis on RAM databases to optimize memory resources. |
| sparse | Spread the shards across as many nodes in the cluster as possible to spread the traffic across cluster nodes.<br/><br/>Recommended for Redis on Flash databases to optimize disk resources. |

## Examples

### Change default policy

To change the default shard placement policy so that new databases are created with the `sparse` shard placement policy, run [`rladmin tune cluster`]({{<relref "/rs/references/cli-utilities/rladmin/tune#tune-cluster">}}):

```sh
rladmin tune cluster default_shards_placement sparse
```

### Override default policy

To change the shard placement policy for an individual database, run [`rladmin placement`]({{<relref "/rs/references/cli-utilities/rladmin/placement">}}):

```sh
rladmin placement db db:ID sparse
```