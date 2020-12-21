---
Title: Updating the Database Configuration
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
You can change the configuration of a Redis Enterprise Software (RS) database at any time.

To edit the configuration of a database:

1. Go to **Database** and select the database that you want to edit.
1. Go to **Configuration** and click **Edit** at the bottom of the page.
    The database settings appear.
1. Change the any of the [configurable database settings]({{< relref "/rs/administering/creating-databases/_index.md" >}}).

    {{< note >}}
For [Active-Active database instances](#updating-crdb-configuration), most database settings only apply to the instance that you are editing.
    {{< /note >}}

1. Click **Update**.

## Editing Active-Active database configuration

An Active-Active database (formerly known as CRDB) is a database that spans multiple Redis Enterprise clusters.
The clusters that host instances of the Active-Active database are called participating clusters.
When you create an Active-Active database you must specify the participating clusters that host the Active-Active database instances.

When you edit the database configurations of an Active-Active database,
most database settings only apply to the Active-Active database instance that you are editing, including:

- Memory limit
- Data persistence
- Redis password
- Number of shards
- TLS mode
- Periodic backup

You can change the global configuration of the Active-Active database from the command-line with the crdb-cli.

## Participating clusters

You can add and remove participating clusters of an Active-Active database to change the Active-Active topology.
Use the participating clusters list to manage the changes to Active-Active topology in the UI.
You can make multiple changes at once to the list of participating clusters.
The changes you make to the list are committed when the database configuration is saved.

![add-active-active-participants](/images/rs/add-active-active-participants.png)

All of the existing participating clusters must be online and in a syncing state when you add new participating clusters.

After you add new participating clusters to an existing Active-Active database,
the new Active-Active database instance can accept connections and read operations.
The new instance does not accept write operations until it is in the syncing state.
New participating clusters create the Active-Active database instance based on the global Active-Active database configuration.

All of the existing participating clusters must be online and in a syncing state when you remove an online participating clusters.
If you must remove offline participating clusters, you can do this with forced removal.
If a participating cluster that was removed forcefully returns attempts to re-join the cluster,
it will have an out of date on Active-Active database membership.
The joined participating clusters reject updates sent from the removed participating cluster.

## TLS authentication and encryption

To prevent unauthorized access to your data, you can configure RS to secure communications with TLS protocol
(the more secure successor to SSL).
When you create Active-Active databases, you can specify TLS in two ways:

1. [Require TLS for All Communications]({{< relref "/rs/administering/designing-production/security/tls-configuration#configuring-tls-for-replica-of-communication-only-on-the-source-database" >}}) -
    This configures the Active-Active database to support TLS for both data access operations performed
    on the database as well as inter-cluster Active-Active database communications.
1. [Require TLS for CRDB Communications Only]({{< relref "/rs/administering/designing-production/security/tls-configuration#configuring-tls-for-all-communication-on-the-source-database" >}}) -
    This configures the Active-Active database to support TLS for only inter-cluster Active-Active database communications.
