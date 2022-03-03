---
Title: Upgrade modules
linkTitle: Upgrade modules
description:
weight: 50
alwaysopen: false
categories: ["Modules"]
aliases:
    - /modules/upgrading/rs/
    - /rs/developing/modules/upgrading/
    - /modules/upgrading-rs/
---

Upgrade a module in Redis Enterprise to get the latest features and fixes.

{{<note>}}
- If you upgrade a single-node cluster, it does not load the new modules that are bundled with the new cluster version.

- Before you upgrade a database with the RediSearch module enabled to Redis 5.0, you must upgrade the RediSearch module to version 1.4.2 or later.
{{</note>}}

## Prerequisites

Before you upgrade a module enabled in a database, [install the new version of the module on the cluster]({{<relref "/modules/install/add-module-to-cluster">}}).

## Upgrade a module for a database

After you install an updated module on the cluster, go to the configuration of the databases that use the module.
The database configuration shows that a new version of the module is available.

![update_available-1](/images/rs/update_available.png?width=1346&height=1600)

{{<warning>}}
After you upgrade the module for a database, the database shards restart. This causes a short interruption in the availability of this database across the cluster.
{{</warning>}}

To upgrade a module enabled for a database:

1. Connect to the terminal of a node in the cluster.
1. Run `rladmin status` to list the databases on the node.
1. Copy the name of the database that uses the module that you want to upgrade.

    ![rladmin_status](/images/rs/rladmin_status.png)

1. Find the exact module name and version:

    1. Extract the module archive (zip) file.
    1. Open the JSON file.
    1. Find the module name and version number in the file.

    Here's an example of the JSON file for the RediSearch module:

    ![module_info](/images/rs/module_info.png)

1. To see the versions of the modules on the cluster, run either:

    - `rladmin status modules` - Shows the latest modules available on the cluster and the modules used by databases.
    - `rladmin status modules all` - Shows all of the modules available on the cluster and the modules used by databases.

1. To upgrade a database to the latest version of Redis and its modules to the latest version without changing the module arguments, run:

    ```sh
    rladmin upgrade db < database_name | database_ID > latest_with_modules
    ```

    {{<warning>}}
The upgrade process does not validate the module upgrade arguments, and incorrect arguments can cause unexpected downtime. Test module upgrade commands in a test environment before you upgrade modules in production. 
    {{</warning>}}

    - Use `keep_redis_version` to upgrade the modules without upgrading the database to the latest Redis version.

    - To specify the modules to upgrade, add the following for each module:

        ```sh
        and module module_name <module_name> version <new_module_version_number> module_args "<module arguments>"
        ```

        For the module arguments, use one of the following:

        - `module_args "<module_arguments>"` to replace the existing module arguments.

        - `module_args ""` without arguments to remove the existing module arguments.

        - `module_args keep_args` to use the existing module arguments.

## Examples

Here are some module upgrade examples:

- Keep the current version of Redis and upgrade to the latest version of the enabled modules:

    ```sh
    rladmin upgrade db shopping_cart keep_redis_version latest_with_modules
    ```

- Upgrade the database to the latest Redis version and upgrade RediSearch to 1.6.7 with the specified arguments:

    ```sh
    rladmin upgrade db shopping_cart and module db_name shopping_cart module_name ft version 10607 module_args "PARTITIONS AUTO"
    ```

- Upgrade the database to the latest Redis version and upgrade RedisBloom to version 2.2.1 without arguments:

    ```sh
    rladmin upgrade db db:3 and module db_name shopping_cart module_name bf version 20201 module_args ""
    ```

- Upgrade RedisJSON to 1.0.4 with the existing arguments and RedisBloom to version 2.2.1 without arguments:

    ```sh
    rladmin upgrade module db_name MyDB module_name ReJSON version 10004 module_args keep_args and module db_name MyDB module_name bf version 20201 module_args ""
    ```

- Upgrade the database to use the latest version of Redis and use the latest version of the enabled modules:

    ```sh
    rladmin upgrade db shopping_cart latest_with_modules
    ```
