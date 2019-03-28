---
Title: Upgrading Redis Enterprise Software
description: 
weight: 60
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/installing-upgrading/upgrading/
---
To complete the upgrade process you must upgrade the Redis Enterprise Software (RS)
software on each of the nodes and then upgrade each of the databases in the cluster.

{{% warning %}}Before you upgrade, you must read the [RS 5.4 release notes]({{< relref "/rs/release-notes/rs-5-4-december-2018.md" >}}), including the [5.4 upgrade notes]({{< relref "/rs/release-notes/rs-5-4-december-2018.md#upgrade" >}}).{{% /warning %}}

Version requirements:

- To upgrade your cluster to v5.4, your cluster must first be on 5.0 or above
- To upgrade your cluster to v5.2, your cluster must first be on 4.5 or above
- To upgrade your cluster to v5.0, your cluster must first be on 4.4.2 or above

A Redis Enterprise Software cluster upgrade is considered to be
"ongoing" when nodes within a cluster have mixed versions. The upgrade
is only considered complete when all nodes of the cluster are upgraded
to the new version.

{{% warning %}}Using features from the newer version before all nodes are upgraded
can produce unexpected results or cause failures in the cluster.{{% /warning %}}

## Upgrading nodes

Upgrading the nodes' software requires installing the [RS installation
package]({{< relref "/rs/installing-upgrading/downloading-installing.md" >}})
on all of the machines on which RS is installed.

{{% warning %}}You must upgrade the master node before you upgrade the other nodes.
We recommend that you plan to keep all nodes up until the upgrade is completed
on all nodes.

The node role is shown in the output of the 'rladmin status
nodes' command.
{{% /warning %}}

You will run install.sh from the directory where you untarred the media
just like you do for a new install. The software will recognize this is
an upgrade and proceed accordingly.

Just like for a new installation, you must sudo or be root to do the
upgrade.

```src
$ sudo ./install.sh
```

The node upgrade process restarts the services running RS, which causes
a short interruption to connections to the proxy, node and databases.

{{% warning %}}In order to ensure cluster and databases' availability, it is
important to upgrade the nodes one by one, and **not attempt to upgrade
more than one node at a time**.
{{% /warning %}}

To make sure that the node is functioning properly, run [`rlcheck`]
({{< relref "/rs/references/cli-reference/rlcheck.md" >}}) and `rladmin status extra all`
on the node both before and after the upgrade.

If you have the RS management UI open in the browser while you are
upgrading the nodes, make sure that you refresh the browser before trying
to work with the UI again.

## Upgrading databases

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

- In the [rladmin CLI]({{< relref "/rs/references/cli-reference/rladmin.md" >}}),
    run the status command.
    If the Redis version is not the latest supported, an indication
    appears in the command output next to the database's status.
- In the Management UI, go to the **Cluster \> Configuration** page.
    The page lists the latest Redis version supported.

If the Redis database versions are older than the version supported by
RS, Redis Labs recommends that you upgrade your Redis databases.

**To upgrade your database:**

1. Make sure that all of the nodes in the RS cluster have been upgraded,
    as described in Upgrading nodes section above. Otherwise, you will
    not be able to upgrade the databases.
1. In the [rladmin CLI]({{< relref "/rs/references/cli-reference/rladmin.md" >}})
    on any node in the cluster, run this command for each database: `rladmin upgrade db <db-name>`

During the database upgrade process, the database will be restarted. As
a result:

- For databases that have [replication]({{< relref "/rs/concepts/high-availability/replication.md" >}})
    enabled, a failover occurs prior to restarting the database to make sure that
    there is no downtime.
- For databases that do not have replication enabled and persistence
    enabled, some downtime occurs while the database is restarting. The
    type of persistence chosen for this database is a variable in the
    time it will take for a database to come back up. For example, AOF
    usually takes longer than an RDB file.
- For databases that have neither replication nor [persistence]({{< relref "/rs/concepts/data-access/persistence.md" >}})
    enabled, the database loses all its data after it is restarted.
