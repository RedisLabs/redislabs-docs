---
Title: Database replication
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Database replication provides a mechanism to ensure high availability.
When replication is enabled, your dataset is replicated to a slave node,
which is constantly synchronized with the master node. If the master
node fails, an automatic failover occurs and the slave node is promoted
to be the new master node. When the old master node recovers, it becomes
the slave node of the new master node. This auto-failover mechanism
guarantees that data is served with minimal to no interruption.

You can tune your high availability configuration with:

- [Rack/Zone
Awareness]({{< relref "/rs/concepts/high-availability/rack-zone-awareness.md" >}}) - When rack-zone awareness is used, there is additional and more advanced
logic used for determining which nodes get designated as the master or
slave.
- [High Availability for Slave Shards]({{< relref "/rs/administering/database-operations/slave-ha.md" >}}) - When high availability 
for slave shards is used, the slave is automatically migrated on node failover to maintain high availability.

**Note**: Enabling replication has implications for the total database
size, as explained in [Database memory
limit]({{< relref "/rs/administering/database-operations/memory-limit.md" >}}).

## Redis on Flash Replication Considerations

We recommend that you set the sequential replication feature using
rladmin. This is due to the potential for relatively slow replication
times that can occur with Redis on Flash enabled databases. In some
cases, if sequential replication is not set up, there is a risk of an
Out Of Memory (OOM) situation. While it will not cause data loss on the
master shards, the replication to slave shards may not succeed as long
as there is high write-rate traffic on the master and multiple
replications at the same time.

The rladmin command below sets the number of master shards eligible to
be replicated from the same cluster node, as well as the number of slave
shards on the same cluster node that can run the replication process at
any given time.

The recommended sequential replication configuration is two, i.e.:

```src
$ rladmin tune cluster max_redis_forks 1 max_slave_full_syncs 1
```

Note: This means that at any given time, only one master and one slave
can be part of a full sync replication process
