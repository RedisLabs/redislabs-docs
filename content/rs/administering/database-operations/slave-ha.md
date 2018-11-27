---
Title: High Availability for Slave Shards
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
When a master shard fails, a slave shard is automatically promoted to a master shard 
to maintain data availability. If there are no other slave shards in the database, 
this creates a single point of failure until a new slave shard is manually created.

To automatically avoid this single point of failure, you can configure the cluster 
to automatically relocate the slave shard to another available node. In practice, 
slave relocation creates a new slave shard and replicates the data from the master 
shard to the new slave shard. For example:

1. Node:2 has a master shard and node:3 has the corresponding the slave shard.
1. Node:2 fails and triggers a failover.
1. The slave shard on node:3 is promoted to master.
1. If slave HA is enabled, a new slave shard is created on an available node that 
that does not also have the master shard.
1. The data from the master shard is replicated to the new slave shard.

Note: If slave HA is enabled for a database that does not have any slave shards, 
the failover creates a new master on an available node. The data from the 
original master is lost but a new master is available for new transactions. This 
is a typical for caching use cases.

## Grace Period

By default, slave HA has a X second grace period before new slave shards are created. 
To configure this grace period from rladmin, run:

    rladmin tune cluster slave_ha_grace_period <time_in_seconds>

## Shard Priority

Slave HA creates new slave shards for databases according to this order of priority:

1. slave_ha_priority - You can assign a priority number to a specific database to 
make sure that its slave shards are created first. To assign priority to a database, run:

    rladmin tune db <bdb_uid> slave_ha_priority <positive integer>

1. Slave shards of CRDBs because their regional replication is critical, 
and relies on a working slave.
1. A cache database is unavailable if it is not moved to an available node.
1. Smaller databases are moved more easily than larger databases.
1. In the case of databases that match all other criteria, the database with a higher UID is moved first.

## Cooldown Periods

Both the cluster and the database have cooldown periods. Slave relocation cannot run 
on another node in a cluster until the cooldown period for the cluster passes. 
Similarly, the database cannot go through another slave relocation until the 
cooldown period for the database passes.

## Alerts

These alerts are sent during slave HA:

* Shard relocation begins after the grace period
* Shard relocation fails because there is no available node (Sent hourly)
* Shard relocation is delayed because of the cooldown period

## Configuring High Availability for Slave Shards

You can enable slave HA either for:

* Cluster - All databases in the cluster use slave HA
* Database - Only the specific database uses slave HA

By default, slave HA is set to disabled at the cluster level. You can enable it 
for a cluster and then disable slave HA for specific databases.

You can enable and disable slave HA using rladmin or using the REST API.

To enable slave HA for a cluster using rladmin, run:

    rladmin tune cluster slave_ha enabled

To disable slave HA for a specific database using rladmin, run:

    rladmin tune db <bdb_uid> slave_ha disabled