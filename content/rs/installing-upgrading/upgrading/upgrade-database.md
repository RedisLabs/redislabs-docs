---
Title: Upgrade a Redis Enterprise Software database
linkTitle: Upgrade database
description: Upgrade a Redis Enterprise Software database.
weight: 50
alwaysopen: false
categories: ["RS"]
aliases: 
---

## Default Redis database versions {#default-db-versions}

When you upgrade an existing database or create a new one, it uses the default Redis version (`default_redis_version`) unless you specify the database version explicitly with `redis_version` in the [REST API]({{<relref "/rs/references/rest-api/requests/bdbs">}}) or [`rladmin upgrade db`]({{<relref "/rs/references/cli-utilities/rladmin/upgrade#upgrade-db">}}).

Redis Enterprise Software v6.x includes two Redis database versions: 6.0 and 6.2.
As of version 7.2, Redis Enterprise Software includes three Redis database versions.

To view available Redis database versions:

- In the admin console, see **Redis database versions** on the **Cluster > Configuration** screen.

- Send a [`GET /nodes` REST API request]({{<relref "/rs/references/rest-api/requests/nodes">}}) and see `supported_database_versions` in the response.

The default Redis database version differs between Redis Enterprise releases as follows:

| Redis<br />Enterprise | Bundled Redis<br />DB versions | Default DB version<br />(upgraded/new databases) |
|-------|----------|-----|
| 7.2 | 6.0, 6.2, 7.2 | 7.2 |
| 6.4.2 | 6.0, 6.2 | 6.2 |
| 6.2.x | 6.0, 6.2 | 6.0 |


The upgrade policy is only relevant for Redis Enterprise Software versions 6.2.4 through 6.2.18. For more information about upgrade policies, see the [6.2 version of this document](https://docs.redis.com/6.2/rs/installing-upgrading/upgrading/#redis-upgrade-policy).

## Upgrade prerequisites

Before upgrading a database:

- Review the relevant [release notes]({{< relref "/rs/release-notes" >}}) for any preparation instructions.

- Verify that the database version meets the minimums specified earlier.

    To determine the database version:

    - Use the admin console to open the **Configuration** tab for the database and select <img src="/images/rs/icons/info-icon.png#no-click" alt="The About database button" width="18px"> **About**.

    - _(Optional)_ Use the [`rladmin status extra all`]({{<relref "/rs/references/cli-utilities/rladmin/status">}}) command to display configuration details:

        ```sh
        rladmin status extra all
        ```
    
        When the database compatibility version is outdated, <nobr>`OLD REDIS VERSION`</nobr> appears in the command output.

- Verify the cluster is fully upgraded and operational.

    Use the admin console to display the **Configuration** tab for the cluster. The tab displays the cluster version information and the Redis database compatibility version.

- Check client compatibility with the database version.

    If you run Redis Stack commands with Go-Redis versions 9 and later or Lettuce versions 6 and later, set the client’s protocol version to RESP2 before upgrading your database to Redis version 7.2 to prevent potential application issues due to RESP3 breaking changes. See [Client prerequisites for Redis 7.2 upgrade]({{<relref "/rs/references/compatibility/resp#client-prerequisites-for-redis-72-upgrade">}}) for more details and examples.

- To avoid data loss during the upgrade, [back up your data]({{<relref "/rs/databases/import-export/schedule-backups">}}).  

    You can [export the data]({{<relref "/rs/databases/import-export/export-data">}}) to an external location, [enable replication]({{<relref "/rs/databases/durability-ha/replication">}}), or [enable persistence]({{<relref "/rs/databases/configure/database-persistence">}}).

    When choosing how to back up data, keep the following in mind:

    - To reduce downtime when replication is enabled, a failover is performed before restarting the primary (master) database.

    - When persistence is enabled without replication, the database is unavailable during restart because the data is restored from the persistence file. AOF persistence restoration is slower than snapshot restoration.

## Upgrade database

To upgrade a database:

1.  _(Optional)_  Back up the database to minimize the risk of data loss.

1.  Use [`rladmin`]({{<relref "/rs/references/cli-utilities/rladmin/upgrade">}}) to upgrade the database. During the upgrade process, the database will restart without losing any data.

    - To upgrade a database without modules:

        ``` shell
        rladmin upgrade db <database name | database ID>
        ```

        Example of a successful upgrade:

        ``` shell
        rladmin> upgrade db demo
        Monitoring d194c4a3-631c-4726-b799-331b399fc85c
        active - SMUpgradeBDB init
        active - SMUpgradeBDB wait_for_version
        active - SMUpgradeBDB configure_shards
        completed - SMUpgradeBDB
        Done
        ```

    - If the database has modules enabled and new module versions are available in the cluster, run `rladmin upgrade db` with additional parameters to upgrade the module versions when you upgrade the database. See [Upgrade modules]({{<relref "/stack/install/upgrade-module">}}) for more details.

    - To upgrade the database to a version other than the default version, use the `redis_version` parameter:

        ```sh
        rladmin upgrade db <database name | database ID> redis_version <version>
        ```

1. Check the Redis database compatibility version for the database to confirm the upgrade.  

    To do so:

    - Use the admin console to open the **Configuration** tab for the database and select <img src="/images/rs/icons/info-icon.png#no-click" alt="The About database button" width="18px"> **About**.

    - Use [`rladmin status databases extra all`]({{<relref "/rs/references/cli-utilities/rladmin/status#status-databases">}}) to display a list of the databases in your cluster and their current Redis database compatibility version:

        ```sh
        rladmin status databases extra all
        ```

    Verify that the Redis version is set to the expected value.
