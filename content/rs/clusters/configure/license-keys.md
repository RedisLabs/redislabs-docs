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
This mode allows all features to be enabled, including Redis on Flash,
during the trial period.

## View cluster license key

To view the cluster license key, use:

- admin console - Go to: **Cluster > Configuration > General** and scroll down to **License**

    The cluster license details are shown. Select **Change** to view the cluster license key.

- REST API - GET `https://localhost:9443/v1/license`

    The REST API response includes:
    - license - The cluster name (FQDN) in the key string
    - expired - If the cluster key is expired (True or False)
    - activation_date - The date of the cluster key activation
    - expiration_date - The date of the cluster key expiration
    - shards_limit - The number of shards allowed by the cluster key

## Update cluster license

{{< note >}}
After you add a cluster key, you cannot remove the key to return the cluster to trial mode.
{{< /note >}}

You can update the cluster license key:

- During cluster setup using the admin console or CLI

- After cluster setup using the admin console:

    1. Go to **Cluster > Configuration > General**.
    
    1. Scroll down to **License** and select **Change**.

    1. Upload or enter your cluster license key.
    
    1. Select **Save**.

An existing cluster key can be updated at any time provided the new
cluster license key is valid. If saving of a new cluster key fails, the
operation returns the error "invalid license key". In this case, the
existing key stays in effect.

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
