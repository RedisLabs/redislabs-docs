---
Title: Upgrade an existing Redis Enterprise Software deployment
linkTitle: Upgrade existing deployment
description:
weight: 60
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/installing-upgrading/upgrading/
---
To upgrade Redis Enterprise Software, you:

1.  Upgrade the software on all nodes of the cluster.

2.  _(Optional)_ Upgrade each database in the cluster.

You don't have to upgrade the databases in your cluster; however, new features and important fixes might not be enabled until you do so.

## Default Redis database versions {#default-db-versions}

When you upgrade an existing database or create a new one, it uses the default Redis version (`default_redis_version`) unless you specify the database version explicitly with `redis_version` in the [REST API]({{<relref "/rs/references/rest-api/requests/bdbs">}}) or [`rladmin upgrade db`]({{<relref "/rs/references/cli-utilities/rladmin/upgrade#upgrade-db">}}).

Redis Enterprise Software v6.x includes two Redis database versions: 6.0 and 6.2. The default Redis database version differs between Redis Enterprise releases as follows:

| Redis<br />Enterprise | Bundled Redis<br />DB versions | Default DB version<br />(upgraded/new databases) |
|-------|----------|-----|
| 6.2.x | 6.0, 6.2 | 6.0 |
| 6.4.2 | 6.0, 6.2 | 6.2 |

- v6.2.x: `default_redis_version` is 6.0.

    Setting `redis_upgrade_policy` to `major` enforces this default. However, if you change `redis_upgrade_policy` to `latest`, this enforces 6.2 as the default.
    
    The upgrade policy is only relevant for Redis Enterprise Software versions 6.2.4 through 6.2.18. For more information about upgrade policies, see the [6.2 version of this document](https://docs.redis.com/6.2/rs/installing-upgrading/upgrading/#redis-upgrade-policy).

- v6.4.2: `default_redis_version` is 6.2.

    Both `major` and `latest` upgrade policies use this new default.

    You can override the default version with [`rladmin tune cluster`]({{<relref "/rs/references/cli-utilities/rladmin/tune#tune-cluster">}}); however, this might limit future upgrade options:
    
    ```sh
    rladmin tune cluster default_redis_version 6.0
    ```

## Supported upgrade paths

The following upgrade paths are supported:

| Current<br/>cluster version | Upgrade to<br/>cluster version |
|:-----:|:-----:|
| 6.2.x | 6.4.2 |
| 6.0.x | 6.4.2<br />6.2.x |
| 5.6   | 6.0.x |

## Upgrade a cluster

### Upgrade prerequisites

Before upgrading a cluster:

- Verify that you meet the upgrade path requirements for your desired cluster version and review the relevant [release notes]({{< relref "/rs/release-notes/_index.md" >}}) for any preparation instructions.

- Identify the cluster master node and upgrade that node first.

    Use the [`rladmin status nodes`]({{<relref "/rs/references/cli-utilities/rladmin/status#status-nodes">}}) command or send a [`GET /nodes/status`]({{<relref "/rs/references/rest-api/requests/nodes/status#get-all-nodes-status">}}) request to the [REST API]({{<relref "/rs/references/rest-api">}}) to identify the master node.

### Cluster upgrade process

Starting with the master node, follow these steps for every node in the cluster.  (We recommend upgrading each node separately to ensure cluster availability.)

1.  Download the Redis Enterprise Software installation package to the machine running the node.  

    For help, see [Download the installation package]({{< relref "/rs/installing-upgrading#download-the-installation-package" >}})

1.  Untar the installation package.  Note that neither the installation path nor the user can be changed during the upgrade.

1.  Verify node operation with the following commands:

    ``` shell
    rlcheck
    rladmin status extra all
    ```

1.  Run the install command:

    ``` shell
    sudo ./install.sh -y
    ```

    The installation script automatically recognizes the upgrade and responds accordingly.

    The upgrade replaces all node processes, which might briefly interrupt any active connections.

1.  Verify node operation by repeating the commands from Step 3.

1.  If the admin console was open in a web browser during the upgrade, refresh the browser to reload the console.

When each node is upgraded, the cluster is fully upgraded.

## Upgrade a database

### Upgrade prerequisites

Before upgrading a database:

- Review the relevant [release notes]({{< relref "/rs/release-notes/_index.md" >}}) for any preparation instructions.

- Verify that the database version meets the minimums specified earlier.

    To determine the database version:

    - Use the admin console to open the Configuration tab for the database.

    - Use the `rladmin status all` command to display configuration details.  (An indicator appears in the command output when the database compatibility version is out-of-date.)

- Verify the cluster is fully upgraded and operational.

    Use the admin console to display the Configuration tab for the cluster.  The tab displays the cluster version information and the Redis database compatibility version.

- To avoid data loss during the upgrade, take care to back up the data.  

    You can export the data to an external location, enable replication, or enable persistence.

    When choosing how to back up data, keep the following in mind:

    - To reduce downtime when replication is enabled, a failover is performed before restarting the master database.

    - When persistence is enabled without replication, the database is unavailable during restart because the data is restored from the persistence file.  AOF persistence restoration is slower than snapshot restoration.

### Database upgrade process

To upgrade a database:

1.  Verify that the `redis_upgrade_policy` is set according to your preferences.

1.  _(Optional)_  Back up the database to minimize data loss.

1.  Use `rladmin` to upgrade the database:

    ``` shell
    rladmin upgrade db <database name | database ID>
    ```

    This restarts the database.  No data is lost.

1. Check the Redis database compatibility version for the database to confirm the upgrade.  

    To do so:

    - Use the admin console to open the Compatibility tab for the database; the Redis version displays the Redis database compatibility version.

    - Use `rladmin status databases extra all` to display a list of the databases in your cluster and their current Redis database compatibility version.

    Verify that the Redis version is set to the expected value.

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
