---
Title: Shard placement
linkTitle: Shard placement
description: Detailed info about shard placement.
weight: 30
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/concepts/rebalancing-shard-placement/,
    /rs/concepts/shard-placement-policy.md,
    /rs/concepts/shard-placement-policy/,
    /rs/concepts/memory-architecture/shard-placement-policy.md,
    /rs/concepts/memory-architecture/shard-placement-policy/,
    /rs/concepts/memory-performance/shard-placement-policy.md,
    /rs/concepts/memory-performance/shard-placement-policy/,
    /rs/databases/configure/shard-placement-policy.md,
    /rs/databases/configure/shard-placement-policy/,
    /rs/databases/memory-performance/shard-placement-policy.md,
    /rs/databases/memory-performance/shard-placement-policy.md,
]
---

In Redis Enterprise Software, the location of master and replica shards on the cluster nodes can impact the database and node performance.
Master shards and their corresponding replica shards are always placed on separate nodes for data resiliency.
The shard placement policy helps to maintain optimal performance and resiliency.

The following factors determine shard placement:

- [Shard placement policy]({{<relref "/rs/references/policies/default-shards-placement">}})

- Separation of master and replica shards

- Available persistence and Redis on Flash (RoF) storage

- [Rack awareness]({{<relref "/rs/clusters/configure/rack-zone-awareness">}})

- Memory available to host the database when fully populated

## More info

- [Shard placement policy reference]({{<relref "/rs/references/policies/default-shards-placement">}})

- [Configure the shard placement policy]({{<relref "/rs/databases/configure/shard-placement">}}) for each database
