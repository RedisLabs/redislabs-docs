---
Title: High Availability for Slave Shards
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
When Replication is enabled and master shard fails, the slave shard is automatically promoted to a master shard 
to maintain data availability. This creates a single point of failure until a new slave shard is manually created.

To automatically avoid this single point of failure, you can configure high availability for slave shards (slave HA) for the cluster to automatically migrate the slave shard to another available node. In practice, 
slave migration creates a new slave shard and replicates the data from the master 
shard to the new slave shard. For example:

1. Node:2 has a master shard and node:3 has the corresponding the slave shard.
1. Node:2 fails and triggers a failover.
1. The slave shard on node:3 is promoted to master.
1. If slave HA is enabled, a new slave shard is created on an available node that does not hold the master shard.
    All of the constraints of shard migration apply, such as rack-awareness.
1. The data from the master shard is replicated to the new slave shard.

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

## Slave HA Configuration Options

You can see the current configuration options for slave HA with: `rladmin info cluster`

### Grace Period

By default, slave HA has a 15-minute grace period after node failure and before new slave shards are created. 
To configure this grace period from rladmin, run:

    rladmin tune cluster slave_ha_grace_period <time_in_seconds>

### Shard Priority

Slave HA creates new slave shards for databases according to this order of priority:

1. slave_ha_priority - You can assign a priority number to a specific database to 
make sure that its slave shards are created first. To assign priority to a database, run:

    rladmin tune db <bdb_uid> slave_ha_priority <positive integer>

1. Slave shards of CRDBs - because the sync between the various replicas is critical, 
and should be performed using slave shards.
1. Cache databases - because such databases are unavailable if it is not moved to an available node.
1. Smaller databases are moved more easily than larger databases.
1. In the case of databases that match all other criteria, the database with a higher UID is moved first.

### Cooldown Periods

Both the cluster and the database have cooldown periods. Slave migration cannot run 
on another node in a cluster until the cooldown period for the cluster passes (Default: 1 hour). 
Similarly, the database cannot go through another slave migration until the 
cooldown period for the database passes (Default: 24 hours).

To configure this grace period from rladmin, run:

    * For the cluster:

        rladmin tune cluster slave_ha_cooldown_period <time_in_seconds>
    
    * For all databases in the cluster:

        rladmin tune cluster slave_ha_bdb_cooldown_period <time_in_seconds>

### Alerts

These alerts are sent during slave HA:

* Shard migration begins after the grace period
* Shard migration fails because there is no available node (Sent hourly)
* Shard migration is delayed because of the cooldown period
