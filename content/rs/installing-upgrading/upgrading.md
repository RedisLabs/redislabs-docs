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

{{< warning >}}
Always check the [release notes]({{< relref "/rs/release-notes/_index.md" >}}) before upgrading to a newer version of Redis Enterprise Software. Pay attention to any upgrade notices (for example, the [Redis Enterprise 6.0 upgrade notes]({{< relref "/rs/release-notes/rs-6-0-may-2020#upgrade" >}})).
{{< /warning >}}

Version requirements:

- To upgrade your cluster to v6.0, your cluster must first be on 5.4.0 or above
    and the databases must be running Redis 5.
- To upgrade your cluster to v5.6, your cluster must first be on 5.0.2-30 or above.
- To upgrade your cluster to v5.4, your cluster must first be on 5.0 or above.
- To upgrade your cluster to v5.2, your cluster must first be on 4.5 or above.

The upgrade process for a Redis Enterprise Software cluster is "ongoing" when the nodes in the cluster have mixed versions.
The upgrade is only considered complete when all of the nodes are upgraded to the new version.

{{< warning >}}

Using features from the newer version before all nodes are upgraded can produce unexpected results or cause failures in the cluster.

{{< /warning >}}

## Upgrading a node

Upgrading the software on a node requires installing the [RS installation
package]({{< relref "/rs/installing-upgrading/_index.md" >}})
on all of the machines on which RS is installed.

{{< warning >}}

- You must upgrade the master node before you upgrade the other nodes.
We recommend that you plan to keep all nodes up until the upgrade is completed
on all nodes. The node role is shown in the output of the `rladmin status
nodes` command.
- You cannot change the installation path or user during upgrade.
- Node upgrade fails if the SSL certificates were configured in version 5.0.2 or above by manually updating the certificates on the disk instead of updating them through the API. For assistance with this issue, contact [Support](https://support.redislabs.com).

{{< /warning >}}

You run install.sh from the directory where you untarred the media
just like you do for a new installation. The software recognizes this is
an upgrade and proceeds accordingly.

Just like for a new installation, you must sudo or be root to do the
upgrade.

To upgrade a node run:

```sh
sudo ./install.sh
```

The node upgrade process restarts the services running RS, which causes
a short interruption to connections to the proxy, node and databases.

{{< warning >}}In order to ensure cluster and databases' availability, it is
important to upgrade the nodes one by one, and **not attempt to upgrade
more than one node at a time**.
{{< /warning >}}

To make sure that the node is functioning properly, run [`rlcheck`]({{< relref "/rs/references/rlcheck.md" >}}) and `rladmin status extra all`
on the node both before and after the upgrade.

If you have the RS management UI open in the browser while you are
upgrading the nodes, make sure that you refresh the browser before trying
to work with the UI again.

## Upgrading a database

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

To check whether your Redis database versions match the latest Redis
version supported by RS:

- In the [rladmin CLI]({{< relref "/rs/references/rladmin.md" >}}),
    run the `status` command.
    If the Redis version is not the latest supported, an indication
    appears in the command output next to the database's status.
- In the Management UI, go to the **Cluster \> Configuration** page.
    The page lists the latest Redis version supported.

If the Redis database versions are older than the version supported by
RS, Redis Labs recommends that you upgrade your Redis databases.

To upgrade your database:

1. Make sure that all of the nodes in the RS cluster are [upgraded](#upgrading-nodes).
    You cannot upgrade databases before all of the nodes in the cluster are upgraded.
1. In the [rladmin CLI]({{< relref "/rs/references/rladmin.md" >}})
    on any node in the cluster, run this command for each database: `rladmin upgrade db <database_name | database_ID>`

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

## Upgrading Active-Active databases {#upgrading-activeactive-databases}

When you upgrade an Active-Active (CRDB) database, you can also upgrade:

- **Protocol version** - RS 5.4.2 and higher include a new CRDB protocol version to support new Active-Active features.
    The CRDB protocol is backward-compatible so that RS 5.4.2 CRDB instances can understand write-operations that come from instances with the older CRDB protocol, but CRDB instances with the older protocol cannot understand write-operations of instances with the newer protocol version.
    As a result, after you upgrade the CRDB protocol on one instance,
    instances that were not upgraded yet cannot receive write updates from the upgraded instance.
    The upgraded instance receives updates from upgraded and non-upgraded instances.

    {{< note >}}

- Upgrade all instances of a specific CRDB within a reasonable time frame to avoid temporary inconsistencies between the instances.
- Make sure that you upgrade all instances of a specific CRDB before you do global operations on the CRDB, such as removing instances and adding new instances.
- Protocol version 0 is deprecated on RS 6.0.20 or later.
- To avoid a failed upgrade, make sure all your Active-Active databases are configured with the latest protocol version before upgrading to Redis Enterprise Software 6.0.20 or later.

    {{< /note >}}

    After you upgrade an instance to use the new protocol version,
    it automatically receives any missing write-operations.

- **Feature set version** - RS 5.6.0 and higher include a new feature set version to support new Active-Active features.
    When you update the feature set version for an Active-Active database, the feature set version is updated for all of the database instances.
    
    {{< note >}}

- Feature set version 0 is deprecated on RS 6.0.20 or later.
- To avoid a failed upgrade, make sure all your Active-Active databases are configured with the latest feature set version before upgrading to Redis Enterprise Software 6.0.20 or later.
    {{< /note >}}

To upgrade a CRDB instance:

1. [Upgrade RS](#upgrading-a-node) on each node in the clusters where the CRDB instances are located.

1. To see the status of your CRDB instances, run: `rladmin status`

    The statuses of the CRDB instances on the node can indicate:

    - `OLD REDIS VERSION`
    - `OLD CRDB PROTOCOL VERSION`
    - `OLD CRBD FEATURESET VERSION`

    ![crdb-upgrade-node](/images/rs/crdb-upgrade-node.png)

1. To upgrade each CRDB instance including the Redis version and CRDB protocol version, run:

    ```sh
    rladmin upgrade db <database_name | database_ID>
    ```

    If the protocol version is old, read the warning message carefully and confirm.
    ![crdb-upgrade-protocol](/images/rs/crdb-upgrade-protocol.png)

    The CRDB instance uses the new Redis version and CRDB protocol version.

    {{% expand "To upgrade the CRDB instance without upgrading the protocol version:" %}}
You can use the `keep_crdt_protocol_version` option to upgrade the database
without upgrading the CRDB protocol version and continue using the old version.
If you use this option, make sure that you upgrade the CRDB protocol soon after with the `rladmin upgrade db` command.

You must upgrade the CRDB protocol before you update the CRDB feature set version.
    {{% /expand %}}

1. If the feature set version is old, you must upgrade all of the CRDB instances. Then, to update the feature set for each active-active database, run:

    ```sh
    crdb-cli crdb update --crdb-guid <CRDB-GUID> --featureset-version yes
    ```

    You can retrieve the `<CRDB-GUID>` with the following command:

    ```sh
    crdb-cli crdb list
    ```

    Look for the fully qualified domain name (CLUSTER-FDQN) of your cluster and use the associated GUID:

    ```sh
    CRDB-GUID                             NAME    REPL-ID  CLUSTER-FQDN
    700140c5-478e-49d7-ad3c-64d517ddc486  aatest  1        aatest1.example.com
    700140c5-478e-49d7-ad3c-64d517ddc486  aatest  2        aatest2.example.com
    ```
