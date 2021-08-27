---
Title: Upgrade an existing Redis Enterprise Software deployment
linkTitle: Upgrade existing deployment
description:
weight: 60
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/installing-upgrading/upgrading/
---
To upgrade Redis Enterprise Software on a cluster,
you must upgrade each of the nodes and then upgrade each of the databases in the cluster.

For Active-Active clusters, you must upgrade all the nodes on all clusters first, and then upgrade each of the databases in each cluster.

## Upgrade planning

The upgrade process requires a bit of planning:

1.  Always check the [release notes]({{< relref "/rs/release-notes/_index.md" >}}) before upgrading to a newer version of Redis Enterprise Software. 

     In particular, take note of any upgrade notes, such as the [Redis Enterprise 6.0 upgrade notes]({{< relref "/rs/release-notes/rs-6-0-may-2020#upgrade" >}}).

2.  Verify version requirements:

    - To upgrade your cluster to v6.2, your cluster must first be on 6.0 or above _and_ your database nodes must be running Redis 6.

    - To upgrade your cluster to v6.0.20, your cluster must first be on 5.6.0

    - To upgrade your cluster to v6.0, your cluster must first be on 5.4.0 or above _and_ the databases must be running Redis 5.

    - To upgrade your cluster to v5.6, your cluster must first be on 5.0.2-30 or above.

    - To upgrade your cluster to v5.4, your cluster must first be on 5.0 or above.

    - To upgrade your cluster to v5.2, your cluster must first be on 4.5 or above.

3.  Avoid using features introduced in the newer version until after all nodes have been upgraded; otherwise, unexpected results or cluster failures can occur.

## Upgrade process

The upgrade process includes several tasks, including upgrading:

- [Open source Redis](#upgrade-open-source-redis)
- [Each node](#upgrade-a-node) in the cluster
- [Each database](#upgrade-a-database)
- [Active-Active databases](#upgrade-activeactive-databases)

The following sections provide more info.

The upgrade process for a Redis Enterprise Software cluster is considered _ongoing_ when nodes in the cluster have mixed versions.

The upgrade process is only considered _complete_ when all nodes are upgraded to the new version.

### Upgrade open source Redis

Part of the Redis Enterprise Software upgrade process includes upgrading open source (OSS) Redis, also known as _core_ Redis.  

Each upgrade of Redis Enterprise Software includes _two_ versions of OSS Redis to help smooth the upgrade process:

- The _latest_ release reflects the most recent minor release (example: Redis 6.2), whether major (x.0 release) or minor (x.y).

- The last _major_ release reflects the most recent major release (example: 6.0).

When you upgrade OSS Redis, you can upgrade from:

- The previous major release to the current major release.

- The previous minor release to the current minor release.

If you're not currently using either of the supported previous releases included with the update, you need to separately update OSS Redis to one of those releases; otherwise, the update to Redis Enterprise Software fails.

You can use `rladmin` to choose which release  to install:

``` shell
tune cluster redis_upgrade_policy latest
```

Updating OSS Redis also updates the default version used to create or update databases.  For example, if you update to the example 6.2 release described earlier and then you create a database, its version is `6.2`.

Databases cannot be used by earlier versions of OSS Redis.  Later versions of OSS Redis can, for the most part, use older database versions.  (For details, review the relevant release notes.)

Use `rladmin` to change the default database version:

``` shell
tune cluster default_redis_version 6.2
```

To learn more, see the [rladmin reference]({{< relref "/rs/references/rladmin.md#tune-cluster" >}})

### Upgrade a node

Upgrading the software on a node requires installing the [RS installation
package]({{< relref "/rs/installing-upgrading/_index.md" >}})
on all of the machines on which RS is installed.

{{< warning >}}

- You must upgrade the master node before you upgrade the other nodes.
We recommend that you plan to keep all nodes up until the upgrade is completed
on all nodes. The node role is shown in the output of the `rladmin status
nodes` command.
- You cannot change the installation path or user during upgrade.

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

To make sure that the node is functioning properly, run [`rlcheck`]({{< relref "/rs/references/rlcheck.md" >}}) and <nobr>`rladmin status extra all`</nobr>
on the node both before and after the upgrade.

If you have the RS management UI open in the browser while you are
upgrading the nodes, make sure that you refresh the browser before trying
to work with the UI again.

### Upgrade a database

Some upgrades add support for new Redis versions. In these cases,
we recommend upgrading the databases to the new Redis
version, although this is not mandatory because upgrades are backward
compatible. Redis Software also supports a mix of Redis database versions.

Redis Software always supports two Redis versions. By default, new Redis databases
are created with the latest version, and existing databases get upgraded
to the latest version according to the instructions detailed below. 

To change the default Redis version to the previously supported version, use `rladmin` and run the <nobr>`tune cluster default_redis_version`</nobr> command.

To check whether your Redis database versions match the latest supported Redis
version:

- In the [rladmin CLI]({{< relref "/rs/references/rladmin.md" >}}),
    run the `status` command.
    If the Redis version is not the latest supported, an indication
    appears in the command output next to the database's status.
- In the Management UI, go to the **Cluster \> Configuration** page.
    The page lists the latest Redis version supported.

If the Redis database versions are older than the version supported by
Redis Enterprise Software, we recommend upgrading your Redis databases.

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

### Upgrade Active-Active databases 

When you upgrade an Active-Active (CRDB) database, you can also upgrade:

- **Protocol version** - Starting with version 5.4.2, a new CRDB protocol version helps support  Active-Active features.

    The CRDB protocol is backward-compatible, which means v5.4.2 CRDB instances can understand write-operations from instances using the the earlier CRDB protocol.  However, earlier CRDB instances (those using the older protocol cannot) understand write-operations from instances using the newer protocol version.

    Once you upgrade the CRDB protocol on one instance, non-upgraded instances cannot receive write updates from the upgraded instance.

    The upgraded instance receives updates from upgraded and non-upgraded instances.

    When upgraded to the latest protocol version, upgraded instances automatically receives any missing write-operations.

    _Guidelines:_

    - Upgrade all instances of a specific CRDB within a reasonable time frame to avoid temporary inconsistencies between the instances.

    - Make sure that you upgrade all instances of a specific CRDB before you do global operations on the CRDB, such as removing instances and adding new instances.

    - As of v6.0.20, protocol version 0 is deprecated; support will be removed in a future version.

    - To avoid upgrade failures, update all Active-Active databases to the latest protocol version _before_ upgrading Redis Enterprise Software to v6.0.20 or later.

- **Feature version** - Starting with version 5.6.0, a new feature version (also called a _feature set version_) helps support new Active-Active features.

    When you update the feature version for an Active-Active database, the feature version is updated for all of the database instances.
    
    _Guidelines:_

    - As of v6.0.20, feature version 0 is deprecated; support will be removed in a future version.

    - To avoid upgrade failures, update all Active-Active databases to the latest protocol version _before_ upgrading Redis Enterprise Software to v6.0.20 or later.

To upgrade a CRDB instance:

1. [Upgrade Redis Enterprise Software](#upgrading-a-node) on each node in the clusters where the CRDB instances are located.

1. To see the status of your CRDB instances, run: `rladmin status`

    The statuses of the CRDB instances on the node can indicate:

    - `OLD REDIS VERSION`
    - `OLD CRDB PROTOCOL VERSION`
    - `OLD CRBD FEATURESET VERSION`

    ![crdb-upgrade-node](/images/rs/crdb-upgrade-node.png)

1. To upgrade each CRDB instance, including the Redis version and CRDB protocol version, run:

    ```sh
    rladmin upgrade db <database_name | database_ID>
    ```

    If the protocol version is old, read the warning message carefully and confirm.

    ![crdb-upgrade-protocol](/images/rs/crdb-upgrade-protocol.png)

    The CRDB instance uses the new Redis version and CRDB protocol version.

    Use the `keep_crdt_protocol_version` option to upgrade the database feature version 
without upgrading the CRDB protocol version.

    If you use this option, make sure that you upgrade the CRDB protocol soon after with the `rladmin upgrade db` command.

    You must upgrade the CRDB protocol before you update the CRDB feature set version.

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
