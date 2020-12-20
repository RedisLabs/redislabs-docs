---
Title: Adding a Module to a Cluster
description:
weight: 4
alwaysopen: false
categories: ["Modules"]
aliases:
    - /modules/upgrading/rs/
    - /rs/developing/modules/upgrading/
    - /modules/upgrading-rs/
---
We are constantly working to improve the modules.
To get the latest features and fixes for a module, you must upgrade the module in Redis.

{{< note >}}

- Modules are not supported in Redis Enterprise Software on RHEL/CentOS 6.x.
- We recommend that you test module upgrade commands in a test environment before you upgrade modules in a production environment. The module upgrade arguments are not validated during the upgrade process and incorrect arguments can cause unexpected downtime.
- Upgrading a cluster with a single node does not load the new modules that are bundled with the new cluster version.
- Before you upgrade a database with RediSearch Module to Redis 5.0, you must upgrade the RediSearch Module to version 1.4.2 or above.

{{< /note >}}

## Getting the packaged modules

- Redis Enterprise modules - To download the upgrades to the modules,
    go to the [Redis Labs Download Center](https://redislabs.com/download-center/modules/).
- Custom packaged modules - Either download the [custom packaged module](https://redislabs.com/community/redis-modules-hub/) from the developer or [package the module yourself]({{< relref "/modules/packaging-modules.md" >}}).

## Adding a module to Redis Enterprise Software cluster

To deploy an upgraded package:

1. In the Redis Enterprise web UI, go to the: **settings**
1. In **redis modules**, click **Add Module**.

    ![upgrade_module-1](/images/rs/upgrade_module.png)

1. Browse to the packaged module and upload
    it.
1. Note the version number of the new module version.
1. In **databases**, select the configuration section.

    The database configuration shows that a new version of the module is available for the database.

    ![update_available-1](/images/rs/update_available.png)

## Upgrading the module for the database

{{< note >}}
After you upgrade the module for a database, the database shards are restarted.
This causes a short interruption in the availability of this database across the cluster.
{{< /note >}}

To upgrade a module that is installed on a cluster:

1. Connect to the terminal of a node in the cluster
1. Run `rladmin status` to list the databases on the node.
1. Copy the name of the database that uses the module that you want to upgrade.

    ![rladmin_status-1](/images/rs/rladmin_status.png)

1. Find the exact module name and version:

    1. Extract the module archive (zip) file.
    1. Open the JSON file.
    1. Find the module name and version number in the file.

    An example of the JSON file for the RediSearch module is:

    ![module_info-1](/images/rs/module_info.png)

1. To see the versions of the modules on the cluster, run either:

    - `rladmin status modules` - Shows the latest modules available on the cluster
        and the modules used by databases.
    - `rladmin status modules all` - Shows all of the modules available on the cluster
        and the modules used by databases.

1. To upgrade a database to the latest version of Redis
    and its modules to the latest version without changing the module arguments, run:

    ```sh
    rladmin upgrade db < database_name | database_ID > latest_with_modules
    ```

    - To upgrade the modules without upgrading the database to the latest Redis version, use `keep_redis_version` after you specify the database.
    - If you want to specify the modules to upgrade, use `and module module_name <module_name> version <new_module_version_number> module_args "<module arguments>" ]` for each module.
        For the modules arguments you can either use:
        - `module_args "<module_arguments>"` to replace the existing module arguments.
        - `module_args ""` without arguments to remove the existing module arguments.
        - `module_args keep_args` to use the existing module arguments.
    - If you want to update multiple modules, use the `and module` parameter for each module.

## Examples

Here are some examples of module upgrades:

- To upgrade keep the current version of Redis and use the latest version of the modules that are used by the database:

    ```sh
    rladmin upgrade db shopping_cart keep_redis_version latest_with_modules
    ```

- To upgrade the database to the latest Redis version and upgrade RediSearch to 1.6.7 with the specified arguments:

    ```sh
    rladmin upgrade db shopping_cart and module db_name shopping_cart module_name ft version 10607 module_args "PARTITIONS AUTO"
    ```

- To upgrade the database to the latest redis and upgrade RedisBloom to version 2.2.1 without arguments:

    ```sh
    rladmin upgrade db db:3 and module db_name shopping_cart module_name bf version 20201 module_args ""
    ```

- To upgrade RedisJSON to 1.0.4 with the existing arguments and RedisBloom to version 2.2.1 without arguments:

    ```sh
    rladmin upgrade module db_name MyDB module_name ReJSON version 10004 module_args keep_args and module db_name MyDB module_name bf version 20201 module_args ""
    ```

- To upgrade the database to use the latest version of Redis and use the latest version of the modules that are used by the database:

    ```sh
    rladmin upgrade db shopping_cart latest_with_modules
    ```
