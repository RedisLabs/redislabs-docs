---
Title: Configuring Shard Placement
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
{{< embed-md "shard-placement-intro.md"  >}}

## Default Shard Placement Policy

The cluster configuration includes a default policy for the shard placement policy.
When you create a database, this default policy is applied to the new database.
The initial policy for all new clusters is `dense`.

You can see the current default shard placement policy in `rladmin info cluster`:

```src
$ rladmin info cluster
cluster configuration:
   repl_diskless: enabled
   default_non_sharded_proxy_policy: single
   default_sharded_proxy_policy: single
   default_shards_placement: dense
   default_shards_overbooking: disabled
   default_fork_evict_ram: enabled
   default_redis_version: 3.2
   redis_migrate_node_threshold: 0KB (0 bytes)
   redis_migrate_node_threshold_percent: 8 (%)
   redis_provision_node_threshold: 0KB (0 bytes)
   redis_provision_node_threshold_percent: 12 (%)
   max_simultaneous_backups: 4
   watchdog profile: local-network
```

To change the default shard placement policy so that new databases are created with the `sparse` shard placement policy, run:

```src
tune cluster default_shards_placement [ dense | sparse ]
```

### Shard Placement Policy for a Database

You can change the shard placement policy for a database.
To see the shard placement policy for a database in `rladmin status`.

```src
DATABASES:
DB:ID NAME       TYPE  STATUS  SHARDS  PLACEMENT  REPLICATION  PERSISTENCE  ENDPOINT
db:1  db1        redis active  2       sparse     disabled     disabled     redis-10951.cluster1.local:10951    
db:2  db2        redis active  2       dense      disabled     disabled     redis-13868.cluster1.local:13868
```

To change the shard placement policy for a database, run:

```src
rladmin placement db db1 [ dense | sparse ]
```
