---
Title: High Availability for Slave Shards
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
When you enable [database replication]({{< relref "/rs/concepts/high-availability/replication.md" >}}) for your database,
Redis Enterprise Software replicates your data to a slave node to make sure that your data is highly available.
If the slave node fails or if the master node fails and the slave is promoted to master,
the remaining master node is a single point of failure.<!--more-->

You can configure high availability for slave shards (slave HA) so that the cluster automatically migrates the slave shards to an available node.
An available node is a node that:

1. Meets slave migration requirements, such as [rack-awareness]({{< relref "/rs/concepts/high-availability/rack-zone-awareness.md" >}}).
1. Has enough available RAM to store the slave shard.
1. Does not also contain the master shard.

In practice, slave migration creates a new slave shard and replicates the data from the master shard to the new slave shard.
For example:

1. Node:2 has a master shard and node:3 has the corresponding the slave shard.
1. Either:

    - Node:2 fails and the slave shard on node:3 is promoted to master.
    - Node:3 fails and the master shard is no longer replicated to the slave shard on the failed node.

1. If slave HA is enabled, a new slave shard is created on an available node.
1. The data from the master shard is replicated to the new slave shard.

{{< note >}}
- Slave HA follows all prerequisites of slave migration, such as [rack-awareness]({{< relref "/rs/concepts/high-availability/rack-zone-awareness.md" >}}).
- Slave HA migrates as many shards as possible based on available DRAM in the target node. When no DRAM is available, slave HA stops migrating slave shards to that node.
{{< /note >}}

## Configuring high availability for slave shards

Using rladmin or the REST API, slave HA is controlled on the database level and on the cluster level.
You can enable or disable slave HA for a database or for the entire cluster.

When slave HA is enabled for both the cluster and a database,
slave shards for that database are automatically migrated to another node in the event of a master or slave shard failure.
If slave HA is disabled at the cluster level,
slave HA will not migrate slave shards even if slave HA is enabled for a database.

{{< note >}}
By default, slave HA is enabled for the cluster and disabled for each database.
{{< /note >}}

{{< note >}}
For Active-Active databases, slave HA is enabled for the database by default to make sure that slave shards are available for Active-Active replication.
{{< /note >}}

To enable slave HA for a cluster using rladmin, run:

    rladmin tune cluster slave_ha enabled

To disable slave HA for a specific database using rladmin, run:

    rladmin tune db <bdb_uid> slave_ha disabled

## Slave HA configuration options

You can see the current configuration options for slave HA with: `rladmin info cluster`

### Grace period

By default, slave HA has a 10-minute grace period after node failure and before new slave shards are created.
To configure this grace period from rladmin, run:

    rladmin tune cluster slave_ha_grace_period <time_in_seconds>

### Shard priority

Slave shard migration is based on priority so that, in the case of limited memory resources,
the most important slave shards are migrated first.
Slave HA migrates slave shards for databases according to this order of priority:

1. slave_ha_priority - The slave shards of the database with the higher slave_ha_priority
    integer value are migrated first.

    To assign priority to a database, run:

    ```
    rladmin tune db <bdb_uid> slave_ha_priority <positive integer>
    ```

1. Active-Active databases - Active-Active database synchronization uses slave shards to synchronize between the replicas.
1. Database size - It is easier and more efficient to move slave shards of smaller databases.
1. Database UID - The slave shards of databases with a higher UID are moved first.

### Cooldown periods

Both the cluster and the database have cooldown periods.
After node failure, the cluster cooldown period prevents another slave migration due to another node failure for any
database in the cluster until the cooldown period ends (Default: 1 hour).

After a database is migrated with slave HA,
it cannot go through another slave migration due to another node failure until the cooldown period for the database ends (Default: 2 hours).

To configure this grace period from rladmin, run:

- For the cluster:

    ```
    rladmin tune cluster slave_ha_cooldown_period <time_in_seconds>
    ```

- For all databases in the cluster:

    ```
    rladmin tune cluster slave_ha_bdb_cooldown_period <time_in_seconds>
    ```

### Alerts

The following alerts are sent during slave HA activation:

- Shard migration begins after the grace period.
- Shard migration fails because there is no available node (Sent hourly).
- Shard migration is delayed because of the cooldown period.
