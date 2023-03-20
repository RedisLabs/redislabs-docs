---
Title: Configure shard placement
linktitle: Shard placement
description: Configure shard placement to improve performance.
weight: 60
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/administering/designing-production/performance/shard-placement.md,
    /rs/administering/designing-production/performance/shard-placement/,
    /rs/databases/configure/shard-placement.md,
    /rs/databases/configure/shard-placement/,

]
---
In Redis Enterprise Software, the location of master and replica shards on the cluster nodes can impact the database and node performance.
Master shards and their corresponding replica shards are always placed on separate nodes for data resiliency.
The [shard placement policy]({{<relref "/rs/references/policies/default-shards-placement">}}) helps to maintain optimal performance and resiliency.

## Shard placement considerations

{{< embed-md "shard-placement-intro.md"  >}}

### View default policy

To see the current default shard placement policy, run [`rladmin info cluster`]({{<relref "/rs/references/cli-utilities/rladmin/info#info-cluster">}}):

```sh
$ rladmin info cluster
Cluster configuration:
    ...
    default_shards_placement: dense
    ...
```

### Change default policy

To change the default shard placement policy so that new databases are created with the `sparse` shard placement policy, run [`rladmin tune cluster`]({{<relref "/rs/references/cli-utilities/rladmin/tune#tune-cluster">}}):

```sh
rladmin tune cluster default_shards_placement [ dense | sparse ]
```

### Override default policy

To see the shard placement policy for a database, run [`rladmin status`]({{<relref "/rs/references/cli-utilities/rladmin/status">}}):

![shard_placement_rladmin_status](/images/rs/shard_placement_rladmin_status.png)

To change the shard placement policy for a database, run [`rladmin placement`]({{<relref "/rs/references/cli-utilities/rladmin/placement">}}):

```sh
rladmin placement db [ database name | database ID ] [ dense | sparse ]
```
