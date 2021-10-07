---
Title: Add a module to a cluster
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
    go to the [Redis Download Center](https://redislabs.com/download-center/modules/).
- Custom packaged modules - Either download the [custom packaged module](https://redislabs.com/community/redis-modules-hub/) from the developer or [package the module yourself]({{< relref "/modules/packaging-modules.md" >}}).

## Adding a module to a Redis Enterprise Software cluster

You can add a module to your cluster using:

- The REST API - For all modules, but modules with dependencies must use the `/v2/modules` endpoint.

```sh
**Note:** The /v2/modules endpoint only exists for Redis Enterprise Software v6.0.12 and above. If you are on an older version, you must perform a manual installation of the module and its dependencies 
Example: [Installing RedisGears](https://docs.redislabs.com/latest/modules/redisgears/installing-redisgears/)
```

- The admin console - For modules without dependencies, such as RedisGraph.

### Adding a module using the REST API

Modules that have dependencies can only be added from the REST API.
The `module.json` file in the module package lists the dependencies for the module and the URL to download each dependency.
When you add the module, the master node downloads and installs the dependencies.
Then the other nodes in the cluster copy the dependencies from the master node.

{{< note >}}
- If your master node does not have connectivity to the internet, copy the dependencies to `<modulesdatadir>/<module_name>/<version_integer>/deps/`. `modulesdatadir` is depending on where Redis Enterprise is installed (`/var/opt/redislabs/modules/` by default), `module_name` is the module name you want to install (`rg` for RedisGears), and `version_integer` is an integer format xxyyzz (xyyzz if x < 10). You can calculate this number using the formula 10000*x + 100*y + z. For example, RedisGears 1.0.7 dependencies need to be placed under `/var/opt/redislabs/modules/rg/10007/deps`.
- To remove a module with dependencies from a cluster, you must use a DELETE action with the `/v2/modules` endpoint.
{{< /note >}}

To add a module package to the cluster using the REST API:

1. Copy the module package to a node in the cluster, for example:

    ```sh
    curl https://redismodules.s3.amazonaws.com/redisgears/redisgears.linux-bionic-x64.1.0.3.zip -o /tmp/redisgears.linux-bionic-x64.1.0.3.zip
    ```

1. POST the modules to the `/v2/modules` endpoint, for example:

    ```sh
    curl -k -u "admin@redislabs.com:<password>" -F "module=@/tmp/redisgears.linux-bionic-x64.1.0.3.zip" https://localhost:9443/v2/modules
    ```

    The response includes an action ID that you can use with the `/v1/actions` endpoint to see the progress of the action, such as:

    ```sh
    $ curl -k -u "admin@redislabs.com:<password>" https://localhost:9443/v1/actions/d1b6d8c2-7a95-4a4d-8ce8-6e6b6f12308f
    {"action_uid":"d1b6d8c2-7a95-4a4d-8ce8-6e6b6f12308f","module_uid":"9f52147d8036b08903ca3a8bca87da00","name":"module_installation","progress":"100","status":"completed","task_id":"d1b6d8c2-7a95-4a4d-8ce8-6e6b6f12308f"}
    ```

    {{< note >}}
You can also use the `/v1/modules` endpoint, but modules with dependencies are blocked from using that endpoint.
    {{< /note >}}

1. When the action is complete, log into the cluster admin console and go to `settings` > `redis modules` to see the module in the list.

### Adding a module using the admin console

To add a module package to the cluster using the admin console:

1. In the Redis Enterprise admin console, go to the: **settings**
1. In **redis modules**, click **Add Module**.

    ![upgrade_module](/images/rs/upgrade_module.png)

1. Browse to the packaged module and upload it.
1. Note the version number of the new module version.

    If you don't see the updated module version, refresh the page.

## Upgrading the module for the database

After you add an updated module to the cluster, go to the configuration of the databases that use the module.
The database configuration shows that a new version of the module is available for the database.

![update_available-1](/images/rs/update_available.png?width=1346&height=1600)

{{< note >}}
After you upgrade the module for a database, the database shards are restarted.
This causes a short interruption in the availability of this database across the cluster.
{{< /note >}}

To upgrade a module that is installed on a cluster:

1. Connect to the terminal of a node in the cluster
1. Run `rladmin status` to list the databases on the node.
1. Copy the name of the database that uses the module that you want to upgrade.

    ![rladmin_status](/images/rs/rladmin_status.png)

1. Find the exact module name and version:

    1. Extract the module archive (zip) file.
    1. Open the JSON file.
    1. Find the module name and version number in the file.

    An example of the JSON file for the RediSearch module is:

    ![module_info](/images/rs/module_info.png)

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
.
