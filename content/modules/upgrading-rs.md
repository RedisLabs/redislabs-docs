---
Title: Upgrading a Module in Redis Enterprise Software
description:
weight: 3
alwaysopen: false
categories: ["Modules"]
aliases:
  - /modules/upgrading/rs
  - /rs/developing/modules/upgrading/
---
We are constantly working to improve the modules.
To get the latest features and fixes for a module, you must upgrade the module in Redis.

{{% note %}}
Modules are not supported in Redis Enterprise Software on RHEL/CentOS 6.x.
{{% /note %}}

## Getting the Packaged Modules

- Redis Enterprise modules - To download the upgrades to the modules,
    go to the [Redis Labs Download Center](https://redislabs.com/download-center/modules/).
- Custom packaged modules - Either download the [custom packaged module](https://redislabs.com/community/redis-modules-hub/) from the developer or [package the module yourself]({{< relref "/modules/_index.md" >}}).

## Deploying the Packaged Module into Redis Enterprise Software

To deploy an upgraded package:

1. In the Redis Enterprise web UI, go to the: **settings**
1. In **redis<sup>e</sup> modules**, click **Add Module**.

    ![upgrade_module-1](/images/rs/upgrade_module-1.png?width=1600&height=956)

1. Browse to the packaged module and upload
    it.
1. Note the version number of the new module version.
1. In **databases**, select the configuration section.

    The database configuration shows that a new version of the module is available for the database.

    ![update_available-1](/images/rs/update_available-1.png?width=1346&height=1600)

## Upgrading the Module for the Database

{{% note %}}
After you upgrade the module for a database, the database shards are restarted.
This causes a short interruption in the availability of this database across the cluster.
{{% /note %}}

1. Connect to the terminal of a node in the cluster
1. Run `rladmin status` to list the databases on the node.
1. Copy the name of the database that uses the module that you want to upgrade.

    ![rladmin_status-1](/images/rs/rladmin_status-1.png?width=1000&height=214)

1. Find the exact module name and version:

    1. Extract the module archive (zip) file.
    1. Open the JSON file.
    1. Find the module name and version number in the file.

    An example of the JSON file for the RediSearch module is:

    ![module_info-1](/images/rs/module_info-1.png?width=1000&height=382)

1. To upgrade the module for the database, run:

    ```src
    rladmin upgrade module db_name <database_name> module_name <module_name> version <new_module_version_number> module_args <module arguments>
    ```

## Examples

Here are some examples of module upgrades:

- To upgrade the version of RediSearch to 10017:

    ```src
    rladmin upgrade module db_name MyAwesomeDB module_name ft version 10017 module_args "PARTITIONS AUTO"
    ```

- To upgrade RedisBloom to version 10100:

    ```src
    rladmin upgrade module db_name MyDB module_name bf version 10100 module_args ""
    ```

- To upgrade RedisJSON to 10002:

    ```src
    rladmin upgrade module db_name MyDB module_name ReJSON version 10002 module_args ""
    ```
