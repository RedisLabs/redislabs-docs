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
* Database - Only the specified database uses slave HA

By default, slave HA is set to disabled at the cluster level and enabled at the 
database level, with the cluster level overriding, so that:

* To enable slave HA for all databases in the cluster - Enable slave HA for the cluster
* To enable slave HA for only specified databases in the cluster:
    1. Enable slave HA for the cluster
    1. Disable slave HA for the databases for which you do not want slave HA enabled

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

Slave shard migration is based on priority so that, in the case of limited memory resources, the most important slave shards are migrated first. Slave HA migrates slave shards for databases according to this order of priority:

1. slave_ha_priority - The slave shards of the database with the higher slave_ha_priority 
    integer value are migrated first.
    
    To assign priority to a database, run:

    ```
    rladmin tune db <bdb_uid> slave_ha_priority <positive integer>
    ```

1. CRDBs - The CRDB synchronization uses slave shards to synchronize between the replicas.
1. Database size - It is easier and more efficient to move slave shards of smaller databases.
1. Database UID - The slave shards of databases with a higher UID is moved first.

### Cooldown Periods

Both the cluster and the database have cooldown periods. After node failure, the cluster 
cooldown period prevents another slave migration due to another node failure for any 
databases in the cluster until the cooldown period ends  (Default: 1 hour).

After a database is migrated with slave HA, it cannot go through another slave migration 
due to another node failure until the cooldown period for the database ends (Default: 24 
hours).

To configure this grace period from rladmin, run:

* For the cluster:
    
    ```
    rladmin tune cluster slave_ha_cooldown_period <time_in_seconds>
    ```

* For all databases in the cluster:

    ```
    rladmin tune cluster slave_ha_bdb_cooldown_period <time_in_seconds>
    ```

### Alerts

The following alerts are sent during slave HA activation:

* Shard migration begins after the grace period
* Shard migration fails because there is no available node (Sent hourly)
* Shard migration is delayed because of the cooldown period
