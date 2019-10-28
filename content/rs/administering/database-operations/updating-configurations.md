---
Title: Updating database configuration
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
You can change the configuration of a Redis Enterprise Software database at any time.

To edit the configuration of a database:

1. Go to **Database** and select the database that you want to edit.
1. Go to **Configuration** and click **Edit** at the bottom of the page.
    The database settings appear.
1. Change the any of the [configurable database settings]({{< relref "/rs/administering/database-operations/creating-database.md" >}}).

    {{% note %}}
For [CRDB instances](#updating-crdb-configuration), most database settings only apply to the instance that you are editing.
    {{% /note %}}

1. Click **Update**.

## Editing CRDB Configuration

A Conflict-Free Replicated Database (CRDB) is a global database that spans multiple Redis Enterprise clusters
The clusters that host instances of the CRDB are called participating clusters.
When you create a CRDB you must specify the participating clusters that host the CRDB instances.

When you edit the database configurations of a CRDB,
most database settings only apply to the CRDB instance that you are editing, including:

- Memory limit
- Data persistence
- Redis password
- Number of shards
- TLS mode
- Periodic backup

## Participating Clusters

If the CRDB topology needs to change, you can add and remove Participating Clusters of a CRDB.
Use the Participating Clusters list to manage the changes to CRDB topology in the UI.
You can make one or more changes at any one time to the Participating Cluster list.
The changes you make to the list are committed when the database configuration is saved.

![pasted-image-0-1](/images/rs/pasted-image-0-1.png?width=1534&height=233)

When adding new Participating Clusters, a CRDB requires that all
existing participating clusters are online and in a syncing state. If
you need to remove one or more offline Participating Clusters, all
remaining Participating Clusters need to be online and in a syncing
state.

After any new Participating Clusters are added to an existing CRDB, the
new CRDB instance does allow connections and read operations, however it
does not allow write operations until it catches up to the syncing
state.

It is recommended that removals are done when all Participating
Clusters of the CRDB are online. However it is possible to remove
offline Participating Clusters using forced removal. Participating
Cluster removed forcefully may later resurrect back to life. However the
forcefully removed Participating Cluster will be out of date on CRDB
membership. Even though, it still thinks it is part of the CRDBonce a
Participating Cluster is removed, all updates received by remaining CRDB
Instances from the removed CRDB instance, are
rejected.

## TLS Authentication and Encryption

To prevent unauthorized access to your data, you can configure RS to secure
communications with TLS protocol (the more secure successor to SSL). When you create
CRDBs, you can specify TLS in two ways:

1. [Require TLS for All Communications]({{< relref "/rs/administering/designing-production/security/tls-configuration.md#configuring-tls-for-replica-of-communication-only-on-the-source-database" >}}) -
    This configures the CRDB to support TLS for both data access operations performed
    on the database as well as inter-cluster CRDB communications.
1. [Require TLS for CRDB Communications Only]({{< relref "/rs/administering/designing-production/security/tls-configuration.md#configuring-tls-for-all-communication-on-the-source-database" >}}) -
    This configures the CRDB to support TLS for only inter-cluster CRDB communications.
