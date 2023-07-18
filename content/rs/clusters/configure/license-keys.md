---
Title: Cluster license keys
linktitle: License keys
description: The cluster key (or license) enables features and capacity within Redis Enterprise Software
weight: 20
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/administering/cluster-operations/license-keys.md,
    /rs/administering/cluster-operations/license-keys/,
    /rs/clusters/configure/license-keys.md,
    /rs/clusters/configure/license-keys/,
]
---
The cluster key (or license) enables features and capacity within Redis Enterprise Software.
You can add or update a cluster key at any time in a cluster lifecycle.
When the cluster does not have a cluster key, the cluster is in trial mode.

## Trial mode

Trial mode is limited to thirty days and a total of four shards, including master and replica
shards. Any new installation starts its thirty-day clock from the day
the cluster setup was done (with the first cluster node provisioned).
This mode allows all features to be enabled, including Auto Tiering,
during the trial period.

## View cluster license key

To view the cluster license key, use:

- Admin console

    1. Go to **Cluster > Configuration > General > License** to see the cluster license details.

    1. Select **Change** to view the cluster license key.

- REST API - GET `https://localhost:9443/v1/license`

    The REST API response includes:
    - license - The cluster name (FQDN) in the key string
    - expired - If the cluster key is expired (True or False)
    - activation_date - The date of the cluster key activation
    - expiration_date - The date of the cluster key expiration
    - shards_limit - The total number of shards allowed by the cluster key
    - ram_shards_limit - The number of RAM shards allowed by the cluster key (starting v7.2)
    - flash_shards_limit - The number of Flash shards (Auto Tiering) allowed by the cluster key (starting v7.2)

Starting v7.2, Redis Enteprise will enforce the shard limits by their types (RAM, Flash) rather than total number of shards.


## Update cluster license

{{< note >}}
After you add a cluster key, you cannot remove the key to return the cluster to trial mode.
{{< /note >}}

You can update the cluster license key:

- During cluster setup using the admin console or CLI

- After cluster setup using the admin console:

    1. Go to **Cluster > Configuration > General > License**.
    
    1. Select **Change**.

    1. Upload or enter your cluster license key.
    
    1. Select **Save**.

You can update an existing cluster key at any time.
Redis Enterprise checks the validay of it in terms of:
- cluster name
- activation and expiration dates
- shard usage and limits
- features
If saving a new cluster key fails, the operation returns an error including failure reason.
In this case, the existing key stays in effect.

## Expired cluster license

When the license is expired:

- You cannot do these actions:

    - Change database settings including security and configuration options
    - Add/remove a database
    - Upgrade a database to a new version
    - Add/remove a node

- You can do these actions:

    - Login to the admin console and view settings and metrics at all resolutions
        for the cluster, nodes and databases
    - Change cluster settings including license key, security for administrators, and cluster alerts
    - Failover when a node fails and explicitly migrate shard between nodes
    - Upgrade node to a new version of Redis Enterprise Software
 
## Monitor cluster license
Starting v7.2, Redis Enterprise exposes the license quotas and the shards consumption metrics via the [Prometheus integration]({{< relref "/rs/clusters/monitoring/prometheus-integration.md" >}}).

The 'cluster_shards_limit' metric displays the total shard limit by the license by shard type (ram / flash).
Examples:
- cluster_shards_limit{cluster="mycluster.local",shard_type="ram"} 100.0
- cluster_shards_limit{cluster="mycluster.local",shard_type="flash"} 50.0

The 'bdb_shards_used' metric displays the used shard count by database and by shard type (ram / flash).
Examples:
- bdb_shards_used{bdb="2",cluster="mycluster.local",shard_type="ram"} 86.0
- bdb_shards_used{bdb="3",cluster="mycluster.local",shard_type="flash"} 23.0

