---
Title: Database replication
linktitle: Replication
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/concepts/high-availability/replication.md,
    /rs/concepts/high-availability/replication/,
    /rs/databases/configure/replication.md,
    /rs/databases/configure/replication/,
]
---
Database replication helps ensure high availability.
When replication is enabled, your dataset is replicated to a replica shard,
which is constantly synchronized with the primary shard. If the primary 
shard fails, an automatic failover happens and the replica shard is promoted.  That is, it becomes the new primary shard. 

When the old primary shard recovers, it becomes
the replica shard of the new primary shard. This auto-failover mechanism
guarantees that data is served with minimal interruption.

You can tune your high availability configuration with:

- [Rack/Zone
Awareness]({{< relref "/rs/clusters/configure/rack-zone-awareness.md" >}}) - When rack-zone awareness is used additional logic ensures that master and replica shards never share the same rack, thus ensuring availability even under loss of an entire rack.
- [High Availability for Replica Shards]({{< relref "/rs/databases/configure/replica-ha.md" >}}) - When high availability
for replica shards is used, the replica shard is automatically migrated on node failover to maintain high availability.

{{< warning >}}
Enabling replication has implications for the total database size,
as explained in [Database memory limits]({{< relref "/rs/databases/configure/memory-limit.md" >}}).
{{< /warning >}}

## Redis on Flash replication considerations

We recommend that you set the sequential replication feature using
`rladmin`. This is due to the potential for relatively slow replication
times that can occur with Redis on Flash enabled databases. In some
cases, if sequential replication is not set up, you may run out of memory. 

While it does not cause data loss on the
primary shards, the replication to replica shards may not succeed as long
as there is high write-rate traffic on the primary and multiple
replications at the same time.

The following `rladmin` command sets the number of primary shards eligible to
be replicated from the same cluster node, as well as the number of replica
shards on the same cluster node that can run the replication process at
any given time.

The recommended sequential replication configuration is two, i.e.:

```sh
rladmin tune cluster max_redis_forks 1 max_slave_full_syncs 1
```

{{< note >}}
This means that at any given time,
only one primary and one replica can be part of a full sync replication process.
{{< /note >}}
