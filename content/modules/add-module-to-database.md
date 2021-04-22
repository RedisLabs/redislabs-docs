---
Title: Adding Modules to a Database
description:
weight: 8
alwaysopen: false
categories: ["Modules"]
aliases:
  - /modules/rs
  - /rs/developing/modules/upgrading/
  - /rs/developing/modules/installing/
  - /modules/create-database-rs/

---
Modules add additional functionality to your databases for specific use cases.
You can add modules to the database when you create the database.

## Add modules to a database

{{< note >}}
- Before you add a module to a database,
    we recommend that you [upgrade the module]({{< relref "/modules/add-module-to-cluster.md" >}}) to the latest version.
- After you add a module to the database,
    certain database fields for the database are disabled according to the supported capabilities of the module.
{{< /note >}}

To add modules to a database:

1. Go to: **databases**
1. Click ![Add](/images/rs/icon_add.png#no-click "Add") and **create database**
1. Configure the database settings.
1. In the Redis Modules field, click ![Add](/images/rs/icon_add.png#no-click "Add"):
    1. Select the module that you want to add.
    1. If you want the module to use a custom configuration, click **Add configuration** and enter the optional custom configuration.
        - RediSearch - You can find the configuration options in the [RediSearch documentation](https://oss.redislabs.com/redisearch/Configuring.html#redisearch_configuration_options).
        - RedisGraph - You can specify the number of threads to distribute the RediSearch queries to: `THREAD_COUNT X`

            By default, the thread count is the same as the number of cores on the node.
        - RedisTimeSeries - You can find the configuration options in the [RedisTimeSeries documentation](https://oss.redislabs.com/redistimeseries/configuration/#redistimeseries-configuration-options).
    1. Click ![Save](/images/rs/icon_save.png#no-click "Save").

    Here it is in action:
    {{< video "/images/rs/multiple-modules.mp4" "Adding multiple modules" >}}

1. Click **Show advanced options** and enter a port number for the database, such as: **12543**.
1. Click **Activate**.


## Upgrading the module for the database

{{< note >}}
After you upgrade the module, the database shards will restart and cause a short interruption in availability across the cluster.
{{< /note >}}

To upgrade a module that is installed on a cluster:

1. Connect to the terminal of a node in the cluster
1. From the terminal, run `rladmin status` to list the databases on the node.
1. Copy the name of the database that uses the module that you want to upgrade.

    ![rladmin_status-1](/images/rs/rladmin_status-1.png?width=1000&height=214)

1. Find the exact module name and version:

    1. Extract the module archive (zip) file.
    1. Open the JSON file.
    1. Find the module name and version number in the file.

    An example of the JSON file for the RediSearch module is:

    ![module_info-1](/images/rs/module_info-1.png?width=1000&height=382)

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
