---
Title: Configure shard placement
linktitle: Configure shard placement
description:
weight: 61
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/administering/designing-production/performance/shard-placement.md,
    /rs/administering/designing-production/performance/shard-placement/,
    /rs/databases/configure/shard-placement.md,
    /rs/databases/configure/shard-placement/,

]
---
In Redis Enterprise Software , the location of master and slave shards on the cluster nodes can impact the database and node performance.
Master shards and their corresponding slave shards are always placed on separate nodes for data resiliency.
The [shard placement policy]({{< relref "/rs/databases/configure/shard-placement-policy.md" >}}) helps to maintain optimal performance and resiliency.

{{< embed-md "shard-placement-intro.md"  >}}

## Default shard placement policy

When you create a new cluster, the cluster configuration has a `dense` default shard placement policy.
When you create a database, this default policy is applied to the new database.

To see the current default shard placement policy, run `rladmin info cluster`:

![shard_placement_info_cluster](/images/rs/shard_placement_info_cluster.png)

To change the default shard placement policy so that new databases are created with the `sparse` shard placement policy, run:

```sh
rladmin tune cluster default_shards_placement [ dense | sparse ]
```

## Shard placement policy for a database

To see the shard placement policy for a database in `rladmin status`.

![shard_placement_rladmin_status](/images/rs/shard_placement_rladmin_status.png)

To change the shard placement policy for a database, run:

```sh
rladmin placement db [ database name | database ID ] [ dense | sparse ]
```
