---
Title: Configure high availability for replica shards
linkTitle: Replica high availability
description: Configure high availability for replica shards so that the cluster automatically migrates the replica shards to an available node.
weight: 50
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/administering/database-operations/slave-ha.md,
    /rs/administering/database-operations/slave-ha/,
    /rs/administering/database-operations/replica-ha.md,
    /rs/administering/database-operations/replica-ha/,
    /rs/databases/configure/replica-ha.md,
    /rs/databases/configure/replica-ha/,
    
         
]
---
When you enable [database replication]({{< relref "/rs/databases/durability-ha/replication.md" >}}),
Redis Enterprise Software copies your data to a replica node to make your data highly available.
If the replica node fails or if the primary (master) node fails and the replica is promoted to primary,
the remaining primary node is a single point of failure.<!--more-->

You can configure high availability for replica shards so that the cluster automatically migrates the replica shards to an available node.  This process is known as _replica high availability_ or _replica\_ha_.

An available node:

1. Meets replica migration requirements, such as [rack-awareness]({{< relref "/rs/clusters/configure/rack-zone-awareness.md" >}}).
1. Has enough available RAM to store the replica shard.
1. Does not also contain the master shard.

In practice, replica migration creates a new replica shard and copies the data from the master shard to the new replica shard.

For example:

1. Node:2 has a master shard and node:3 has the corresponding replica shard.
1. Either:

    - Node:2 fails and the replica shard on node:3 is promoted to master.
    - Node:3 fails and the master shard is no longer replicated to the replica shard on the failed node.

1. If replica HA is enabled, a new replica shard is created on an available node.
1. The data from the master shard is replicated to the new replica shard.

{{< note >}}
- Replica HA follows all prerequisites of replica migration, such as [rack-awareness]({{< relref "/rs/clusters/configure/rack-zone-awareness.md" >}}).
- Replica HA migrates as many shards as possible based on available DRAM in the target node. When no DRAM is available, replica HA stops migrating replica shards to that node.
{{< /note >}}

## Configure high availability for replica shards

You can enable or turn off replica high availability for a database or for the entire cluster using the Cluster Manager UI, `rladmin`, or the REST API.

When replica HA is enabled for both the cluster and a database,
replica shards for that database are automatically migrated to another node in the event of a master or replica shard failure.
If replica HA is disabled at the cluster level,
replica HA will not migrate replica shards even if replica HA is enabled for a database.

{{< note >}}
By default, replica HA is enabled for the cluster but not enabled for each database.
{{< /note >}}

{{< note >}}
For Active-Active databases, replica HA is enabled for the database by default to make sure that replica shards are available for Active-Active replication.
{{< /note >}}

### Configure cluster policy for replica HA

To enable or turn off replica high availability by default for the entire cluster, use one of the following methods:

- Cluster Manager UI:

    1. On the **Databases** screen, select <img src="/images/rs/buttons/button-toggle-actions-vertical.png#no-click" alt="Toggle actions button" width="22px"> to open a list of additional actions.

    1. Select **Database defaults**.

    1. Enable or turn off **Replica High Availability**.

    1. Select **Save**.

- [rladmin tune cluster]({{<relref "/rs/references/cli-utilities/rladmin/tune#tune-cluster">}}): 
    
    ```sh
    rladmin tune cluster slave_ha { enabled | disabled }
    ```

- [Update cluster policy]({{<relref "/rs/references/rest-api/requests/cluster/policy#put-cluster-policy">}}) REST API request:

    ```sh
    PUT /v1/cluster/policy 
    { "slave_ha": <boolean> }
    ```

### Turn off replica HA for a database

To disable replica HA for a specific database using `rladmin`, run:

``` text
rladmin tune db <bdb_uid> slave_ha disabled
```

## Configuration options

You can see the current configuration options for replica HA with:

``` text
rladmin info cluster
```

### Grace period

By default, replica HA has a 10-minute grace period after node failure and before new replica shards are created.

To configure this grace period from rladmin, run:

``` text
rladmin tune cluster slave_ha_grace_period <time_in_seconds>
```

{{<note>}}The default grace period is 30 minutes for containerized applications using [Redis Enterprise Software for Kubernetes]({{<relref "/kubernetes/">}}).{{</note>}}

### Shard priority

Replica shard migration is based on priority.  When memory resources are limited, the most important replica shards are migrated first:

1. `slave_ha_priority` - Replica shards with higher 
    integer values are migrated before shards with lower values.

    To assign priority to a database, run:

    ``` text
    rladmin tune db <bdb_uid> slave_ha_priority <positive integer>
    ```

1. Active-Active databases - Active-Active database synchronization uses replica shards to synchronize between the replicas.
1. Database size - It is easier and more efficient to move replica shards of smaller databases.
1. Database UID - The replica shards of databases with a higher UID are moved first.

### Cooldown periods

Both the cluster and the database have cooldown periods.

After node failure, the cluster cooldown period (`slave_ha_cooldown_period`) prevents another replica migration due to another node failure for any
database in the cluster until the cooldown period ends. The default is one hour.

After a database is migrated with replica HA,
it cannot go through another migration due to another node failure until the cooldown period for the database (`slave_ha_bdb_cooldown_period`) ends. The default is two hours.

To configure cooldown periods, use [`rladmin tune cluster`]({{<relref "/rs/references/cli-utilities/rladmin/tune#tune-cluster">}}):

- For the cluster:

    ``` text
    rladmin tune cluster slave_ha_cooldown_period <time_in_seconds>
    ```

- For all databases in the cluster:

    ``` text
    rladmin tune cluster slave_ha_bdb_cooldown_period <time_in_seconds>
    ```

### Alerts

The following alerts are sent during replica HA activation:

- Shard migration begins after the grace period.
- Shard migration fails because there is no available node (sent hourly).
- Shard migration is delayed because of the cooldown period.
