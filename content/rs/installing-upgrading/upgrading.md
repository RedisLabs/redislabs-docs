---
Title: Upgrading Redis Enterprise Software
description:
weight: 60
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/installing-upgrading/upgrading/
---
To upgrade the Redis Enterprise Software (RS) software on a cluster,
you must upgrade each of the nodes and then upgrade each of the databases in the cluster.

{{% warning %}}
Before you upgrade, you must read the [RS 5.4 release notes]({{< relref "/rs/release-notes/rs-5-4-december-2018.md" >}}),
including the [5.4 upgrade notes]({{< relref "/rs/release-notes/rs-5-4-december-2018.md#upgrade" >}}).
{{% /warning %}}

Version requirements:

- To upgrade your cluster to v5.6, your cluster must first be on 5.0.2 or above.
- To upgrade your cluster to v5.4, your cluster must first be on 5.0 or above.
- To upgrade your cluster to v5.2, your cluster must first be on 4.5 or above.
- To upgrade your cluster to v5.0, your cluster must first be on 4.4.2 or above.

A Redis Enterprise Software cluster upgrade is considered to be
"ongoing" when nodes within a cluster have mixed versions. The upgrade
is only considered complete when all nodes of the cluster are upgraded
to the new version.

{{% warning %}}Using features from the newer version before all nodes are upgraded
can produce unexpected results or cause failures in the cluster.{{% /warning %}}

## Upgrading a Node

Upgrading the software on a node requires installing the [RS installation
package]({{< relref "/rs/installing-upgrading/_index.md" >}})
on all of the machines on which RS is installed.

{{% warning %}}You must upgrade the master node before you upgrade the other nodes.
We recommend that you plan to keep all nodes up until the upgrade is completed
on all nodes.

The node role is shown in the output of the 'rladmin status
nodes' command.
{{% /warning %}}

You run install.sh from the directory where you untarred the media
just like you do for a new install. The software recognizes this is
an upgrade and proceed accordingly.

Just like for a new installation, you must sudo or be root to do the
upgrade.

```src
sudo ./install.sh
```

The node upgrade process restarts the services running RS, which causes
a short interruption to connections to the proxy, node and databases.

{{% warning %}}In order to ensure cluster and databases' availability, it is
important to upgrade the nodes one by one, and **not attempt to upgrade
more than one node at a time**.
{{% /warning %}}

To make sure that the node is functioning properly, run [`rlcheck`]
({{< relref "/rs/references/rlcheck.md" >}}) and `rladmin status extra all`
on the node both before and after the upgrade.

If you have the RS management UI open in the browser while you are
upgrading the nodes, make sure that you refresh the browser before trying
to work with the UI again.

## Upgrading a Database

Some RS upgrades add support for new Redis versions. In these cases,
Redis Labs recommends that you upgrade the databases to the new Redis
version, although this is not mandatory because RS upgrades are backward
compatible. RS also supports a mix of Redis database versions.

RS always supports two Redis versions. By default, new Redis databases
are created with the latest version, and existing databases get upgraded
to the latest version according to the instructions detailed below. If
you would like to change the default Redis version to the previous
version supported, you should use the `tune cluster default_redis_version`
command in the rladmin CLI and set it to the previous Redis version supported.

**To check whether your Redis database versions match the latest Redis
version supported by RS:**

- In the [rladmin CLI]({{< relref "/rs/references/rladmin.md" >}}),
    run the status command.
    If the Redis version is not the latest supported, an indication
    appears in the command output next to the database's status.
- In the Management UI, go to the **Cluster \> Configuration** page.
    The page lists the latest Redis version supported.

If the Redis database versions are older than the version supported by
RS, Redis Labs recommends that you upgrade your Redis databases.

**To upgrade your database:**

1. Make sure that all of the nodes in the RS cluster are [upgraded](#upgrading-nodes).
    You cannot upgrade databases before all of the nodes in the cluster are upgraded.
1. In the [rladmin CLI]({{< relref "/rs/references/rladmin.md" >}})
    on any node in the cluster, run this command for each database: `rladmin upgrade db <db-name>`

During the database upgrade process, the database is restarted. As
a result:

- For databases that have [replication]({{< relref "/rs/concepts/high-availability/replication.md" >}})
    enabled, a failover is done before the master database restarts to make sure that
    there is no downtime.
- For databases without replication but with persistence enabled,
    the database is unavailable during the restart because data is restored from the persistence file.
    The length of the downtime is different for each persistence option.
    For example, AOF usually takes longer than an RDB file.
- For databases that have neither replication nor [persistence]({{< relref "/rs/concepts/data-access/persistence.md" >}})
    enabled, the database loses all its data after it is restarted.

## Upgrading CRDBs

When you upgrade from RS 5.4.0 or lower to 5.4.2 or higher,
the upgrade includes fundamental changes in the CRDB protocol so you must upgrade your CRDBs to use the new CRDB capabilities. This is an exceptional case and no similar upgrades are expected.

CRDB protocol is backward-compatible,
which means that RS 5.4.2 CRDB instances that use the new protocol can understand write-operations that come from instances on clusters installed with RS versions below 5.4.2.
However, the protocol is not forward-compatible,
so CRDB instances with the old protocol cannot understand write-operations of instances with the newer protocol version.
As a result, after you upgrade the CRDB protocol on one instance,
instances that were not upgraded yet cannot receive write updates from the upgraded instance.
The upgraded instance receives updates from upgraded and non-upgraded instances.

{{% note %}}
- Upgrade all instances of a specific CRDB within a reasonable time frame to avoid temporary inconsistencies between the instances.
- Make sure that you upgrade all instances of a specific CRDB before you do global operations on the CRDB, such as removing instances and adding new instances.
{{% /note %}}

After you upgrade an instance to use the new protocol version,
it automatically receives any missing write-operations.

To upgrade a CRDB instance:

1. [Upgrade the nodes in the cluster](#upgrading-nodes) where the CRDB instance is located.

    If you run `rladmin status`,
    the status if the CRDB instances on the node indicates that an `OLD REDIS VERSION` and an `OLD CRDB PROTOCOL VERSION` are used.
    ![crdb-upgrade-node](/images/rs/crdb-upgrade-node.png)

1. To upgrade the CRDB and its protocol, run: `rladmin upgrade db <crdb_name>`

    This warning is shown:
    ![crdb-upgrade-protocol](/images/rs/crdb-upgrade-protocol.png)

1. Read the warning message carefully and confirm.

The upgrade is done, and the specific CRDB instance uses the new CRDB protocol version.
    ![crdb-upgrade-done](/images/rs/crdb-upgrade-done.png)

{{% note %}}
You can use the `keep_crdt_protocol_version` option to upgrade the database
without upgrading the CRDB protocol version and continue using the old version.
If you use this option, make sure that you upgrade the CRDB protocol soon after with the ‘rladmin upgrade db’ command.
{{% /note %}}
