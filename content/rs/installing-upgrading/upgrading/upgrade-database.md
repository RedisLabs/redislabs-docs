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

## Upgrade prerequisites

Before upgrading a database:

- Review the relevant [release notes]({{< relref "/rs/release-notes/_index.md" >}}) for any preparation instructions.

- Verify that the database version meets the minimums specified earlier.

    To determine the database version:

    - Use the admin console to open the **Configuration** tab for the database.

    - Use the [`rladmin status extra all`]({{<relref "/rs/references/cli-utilities/rladmin/status">}}) command to display configuration details:

        ```sh
        rladmin status extra all
        ```
    
        When the database compatibility version is outdated, <nobr>`OLD REDIS VERSION`</nobr> appears in the command output.

- Verify the cluster is fully upgraded and operational.

    Use the admin console to display the **Configuration** tab for the cluster. The tab displays the cluster version information and the Redis database compatibility version.

- To avoid data loss during the upgrade, [back up your data]({{<relref "/rs/databases/import-export/schedule-backups">}}).  

    You can [export the data]({{<relref "/rs/databases/import-export/export-data">}}) to an external location, [enable replication]({{<relref "/rs/databases/durability-ha/replication">}}), or [enable persistence]({{<relref "/rs/databases/configure/database-persistence">}}).

    When choosing how to back up data, keep the following in mind:

    - To reduce downtime when replication is enabled, a failover is performed before restarting the master database.

    - When persistence is enabled without replication, the database is unavailable during restart because the data is restored from the persistence file. AOF persistence restoration is slower than snapshot restoration.

## Upgrade database

To upgrade a database:

1.  Verify that the `redis_upgrade_policy` is set according to your preferences.

1.  _(Optional)_  Back up the database to minimize data loss.

1.  Use [`rladmin`]({{<relref "/rs/references/cli-utilities/rladmin/upgrade">}}) to upgrade the database:

    ``` shell
    rladmin upgrade db <database name | database ID>
    ```

    This restarts the database.  No data is lost.

    If the database has modules enabled and new module versions are available in the cluster, run `rladmin upgrade db` with the additional parameters to upgrade the module versions when you upgrade the database.

    {{<warning>}}
The upgrade process does not validate the module upgrade arguments, and incorrect arguments can cause unexpected downtime. Run module upgrade commands in a test environment before you upgrade modules in production. 
    {{</warning>}}

    To upgrade a database to the latest version of Redis and its modules to the latest versions without changing the module arguments:

    ```sh
    rladmin upgrade db <database_name | database_ID> latest_with_modules
    ```

    To specify which modules to upgrade, add the following parameters to the `rladmin upgrade db` command for each module you want to upgrade:

    ```sh
    and module module_name <module_name> version <new_module_version_number> module_args "<module arguments>"
    ```

    Replace `<module_name>` with:

    - `search` for RediSearch
    - `ReJSON` for RedisJSON
    - `graph` for RedisGraph
    - `timeseries` for RedisTimeSeries
    - `bf` for RedisBloom

    Replace `module_args "<module arguments>"` with:

    - `module_args "arg-name arg-value"` to update existing module arguments.

    - `module_args ""` without arguments to remove existing module arguments.

    - `module_args keep_args` to use the existing module arguments.

    For module upgrade examples, see [Upgrade modules]({{<relref "/modules/install/upgrade-module#examples">}}).

1. Check the Redis database compatibility version for the database to confirm the upgrade.  

    To do so:

    - Use the admin console to open the **Compatibility** tab for the database; the Redis version displays the Redis database compatibility version.

    - Use [`rladmin status databases extra all`]({{<relref "/rs/references/cli-utilities/rladmin/status#status-databases">}}) to display a list of the databases in your cluster and their current Redis database compatibility version:

        ```sh
        rladmin status databases extra all
        ```

    Verify that the Redis version is set to the expected value.
