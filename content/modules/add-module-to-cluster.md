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

To get the latest features and fixes for a module, you must upgrade the module in Redis.

{{<note>}}

- Modules are not supported in Redis Enterprise Software on RHEL/CentOS 6.x.
- We recommend that you test module upgrade commands in a test environment before you upgrade modules in a production environment. The module upgrade arguments are not validated during the upgrade process and incorrect arguments can cause unexpected downtime.
- Upgrading a cluster with a single node does not load the new modules that are bundled with the new cluster version.
- Before you upgrade a database with RediSearch module to Redis 5.0, you must upgrade the RediSearch module to version 1.4.2 or above.

{{</note>}}

## Get packaged modules

To install or upgrade a module in a [Redis Enterprise]({{<relref "/rs">}}) cluster, you need a module package.

- For Redis Enterprise modules, download packages from the [Redis Download Center](https://redislabs.com/download-center/modules/).
- For custom-packaged modules, either download a [custom-packaged module](https://redislabs.com/community/redis-modules-hub/) from the developer or [package the module yourself]({{<relref "/modules/packaging-modules.md">}}).

## Add a module to a Redis Enterprise cluster

Use one of the following methods to add a module to your cluster:

- REST API [`POST` request to the `/v1/modules`]({{<relref "/rs/references/rest-api/requests/modules#post-module">}}) endpoint

- Redis Enterprise admin console

- For RedisGears, follow these [installation instructions]({{<relref "/modules/redisgears/installing-redisgears">}})

### REST API method

To add a module to the cluster using the REST API:

1. Download the module package from the [download center](https://redis.com/redis-enterprise-software/download-center/modules/).

1. Copy the package to a node in the cluster.

1. Add the module to the cluster with a [`POST` request to the `/v1/modules`]({{<relref "/rs/references/rest-api/requests/modules#post-module">}}) endpoint:

    ```sh
    curl -k -u "admin@redislabs.com:<password>" -F "module=@/tmp/redisearch.Linux-ubuntu16.04-x86_64.2.2.6.zip" https://localhost:9443/v1/modules
    ```

1. If the module installation succeeds, the `POST` request returns a [JSON object]({{<relref "/rs/references/rest-api/objects/module">}}) that represents the new module. If it fails, it may return a JSON object with an `error_code` and `description` with more details.

### Admin console method

To add a module to the cluster using the admin console:

1. In the Redis Enterprise admin console, select **settings**.
1. From **redis modules**, select the **Add module** button:

    {{<image filename="images/rs/button-add-module.png" alt="The Add module button">}}{{</image>}}

1. Use the file browser to select the packaged module.
1. Verify **Selected module** shows the correct filename and select the **Upload** button:

    {{<image filename="images/rs/button-upload-module.png" alt="The Upload module button">}}{{</image>}}

1. The new module version should appear in the list of Redis modules:


    {{<image filename="images/rs/settings-modules-list.png" width="300px" alt="The Redis modules list">}}{{</image>}}

    {{<note>}}
If you don't see the updated module version, refresh the page.
    {{</note>}}

## Upgrade the module for the database

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

### Examples

Here are some examples of module upgrades:

- To upgrade, keep the current version of Redis, and use the latest version of the modules that are used by the database:

    ```sh
    rladmin upgrade db shopping_cart keep_redis_version latest_with_modules
    ```

- To upgrade the database to the latest Redis version and upgrade RediSearch to 1.6.7 with the specified arguments:

    ```sh
    rladmin upgrade db shopping_cart and module db_name shopping_cart module_name ft version 10607 module_args "PARTITIONS AUTO"
    ```

- To upgrade the database to the latest Redis version and upgrade RedisBloom to version 2.2.1 without arguments:

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
