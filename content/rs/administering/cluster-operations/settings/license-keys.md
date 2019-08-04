---
Title: Cluster License Keys
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
The cluster license key enables features and capacity within Redis
Enterprise Software. A key can be added, or updated at any time in a
cluster's life cycle. The absence of a key means the cluster is in trial
mode.

## Trial Mode

A cluster without a key is running in trial mode. Trial mode is limited
to thirty days and a total of four shards, including master and slave
shards. Any new installation starts its thirty-day clock from the day
the cluster setup was done (with the first cluster node provisioned).
This mode allows all features to be enabled, including Redis on Flash,
during the trial period.

## Adding or Updating a Cluster Key

A key can be input into the cluster either using rladmin during cluster
setup or afterward through the web UI. In the web UI, go to **Settings
-\> General** and paste your cluster key into the form field for it.
Click the **Save** button.

**Note**: Once a key is added, you can not remove or revert the cluster
to trial mode, but the key can be updated.

An existing cluster key can be updated at any time provided the new
cluster license key is valid. If saving of a new cluster key fails, the
operation returns the error "invalid license key". In this case, the
existing key stays in effect.

## Expired Cluster Key

If the current date is not between the start and end date embedded in
the key, the key has expired.

When the license has expired, you cannot do the following operations:

- Change database settings including security and config options
- Add/Remove new database
- Upgrade database to a new version
- Add/Remove new node

You can perform the following operations even if your key fails to
update:

- View the UI: cluster, node and database settings, metrics at any
    resolutions (sec to min to hour etc)
- Change cluster settings including license key, security for admins
    and cluster alerts.
- over when a node fails and explicitly migrate shard between nodes
- Upgrade node to a new version
