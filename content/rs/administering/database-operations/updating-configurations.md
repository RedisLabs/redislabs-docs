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

A Conflict-Free Replicated Database (CRDB) is a global database that spans multiple Redis Enterprise clusters.
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

You can change the global configuration of the CRDB from the command-line with the crdb-cli.

## Participating Clusters

You can add and remove participating clusters of a CRDB to change the CRDB topology.
Use the participating clusters list to manage the changes to CRDB topology in the UI.
You can make multiple changes at once to the Participating Cluster list.
The changes you make to the list are committed when the database configuration is saved.

![pasted-image-0-1](/images/rs/pasted-image-0-1.png?width=1534&height=233)

All of the existing participating clusters must be online and in a syncing state when you add new participating clusters.

After you add new participating clusters to an existing CRDB,
the new CRDB instance can accept connections and read operations.
The new instance does not accept write operations until it is in the syncing state.
New participating clusters create the CRDB instance based on the global CRDB configuration.

All of the existing participating clusters must be online and in a syncing state when you remove an online participating clusters.
If you must remove offline participating clusters, you can do this with forced removal.
If a participating cluster that was removed forcefully returns attempts to re-join the cluster,
it will have an out of date on CRDB membership.
The joined participating clusters reject updates sent from the removed participating cluster.

## TLS Authentication and Encryption

To prevent unauthorized access to your data, you can configure RS to secure communications with TLS protocol
(the more secure successor to SSL).
When you create CRDBs, you can specify TLS in two ways:

1. [Require TLS for All Communications]({{< relref "/rs/administering/designing-production/security/tls-configuration.md#configuring-tls-for-replica-of-communication-only-on-the-source-database" >}}) -
    This configures the CRDB to support TLS for both data access operations performed
    on the database as well as inter-cluster CRDB communications.
1. [Require TLS for CRDB Communications Only]({{< relref "/rs/administering/designing-production/security/tls-configuration.md#configuring-tls-for-all-communication-on-the-source-database" >}}) -
    This configures the CRDB to support TLS for only inter-cluster CRDB communications.
