---
Title: Configuring Shard Placement
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
{{< embed-md "shard-placement-intro.md"  >}}

## Default Shard Placement Policy

When you create a new cluster, the cluster configuration has a `dense` default shard placement policy.
When you create a database, this default policy is applied to the new database.

To see the current default shard placement policy, run `rladmin info cluster`:

![shard_placement_info_cluster](/images/rs/shard_placement_info_cluster.png)

To change the default shard placement policy so that new databases are created with the `sparse` shard placement policy, run:

```src
tune cluster default_shards_placement [ dense | sparse ]
```

## Shard Placement Policy for a Database

To see the shard placement policy for a database in `rladmin status`.

![shard_placement_rladmin_status](/images/rs/shard_placement_rladmin_status.png)

To change the shard placement policy for a database, run:

```src
rladmin placement db db1 [ dense | sparse ]
```
