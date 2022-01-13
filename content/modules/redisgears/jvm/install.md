---
Title: Install RedisGears and the JVM plugin 
linkTitle: Install 
description:
weight: 20
alwaysopen: false
toc: "true"
categories: ["Modules"]
---

Before you can use RedisGears with the JVM, you need to install the RedisGears module and JVM plugin on your Redis Enterprise cluster and enable them for a database.

## Prerequisites

1. Redis Enterprise v6.0.0 or later

1. Created a Redis Enterprise cluster

1. Added nodes to the cluster

## Install RedisGears and the JVM plugin

If your cluster uses Redis Enterprise v6.0.12 or later, you only need to download the RedisGears package. The JVM plugin will install automatically if you make a `POST`request to the `/v2/modules` REST API endpoint.

For earlier versions of Redis Enterprise, you need to download both the RedisGears and the JVM plugin packages and use a `POST /v1/modules` request.

After the install is complete, RedisGears will appear in the list of available modules on the Redis Enterprise admin console's **settings** and **create database** pages.

### Redis Enterprise v6.0.12 or later

1. Download the RedisGears package from the [download center](https://redis.com/redis-enterprise-software/download-center/modules/).

1. Upload the package to a node in the cluster.

1. Add RedisGears to the cluster with a `POST` request to the `/v2/modules` REST API endpoint:

    ```sh
    $ curl -k -u "<user>:<password>" -F "module=@/tmp/redisgears.linux-centos7-x64.1.2.1.zip" https://localhost:9443/v2/modules
    ```

{{<note>}}
The `POST /v2/modules` request automatically downloads the RedisGears JVM plugin as a dependency.
{{</note>}}

### Redis Enterprise v6.0.8 or earlier

1. Download the RedisGears JVM plugin package from the [download center](https://redis.com/redis-enterprise-software/download-center/modules/).

1. Upload the package to a node in the cluster.

1. As the root user, create a `deps` directory for RedisGears:

    ```sh
    # mkdir -p $modulesdatadir/rg/<version_integer>/deps/
    ```

    {{<note>}}
Replace `<version_integer>` with the version of the RedisGears package you downloaded, formatted as an integer.
<br></br>
For example, 10201 is the version integer for version 1.2.1.
    {{</note>}}

1. Extract the JVM plugin package in the `deps` directory:

    ```sh
    # tar -xvf /<path>/redisgears-dependencies.linux-bionic-x64.<version>.tgz -C $modulesdatadir/rg/<version_integer>/deps
    ```

1. Download the RedisGears package from the [download center](https://redis.com/redis-enterprise-software/download-center/modules/).

1. From the Redis Enterprise admin console, [upload the RedisGears module]({{<relref "/modules/add-module-to-cluster#admin-console-method">}}) to the cluster.

## Enable RedisGears for a database

1. From the Redis Enterprise admin console's **databases** page, select the **Add** button to create a new database:

    {{<image filename="images/rs/icon_add.png" width="30px" alt="The Add icon">}}{{</image>}}

1. Confirm that you want to create a new Redis database with the **Next** button.

1. On the **create database** page, give your database a name.

1. For **Redis Modules**, select the **Add** button and choose RedisGears from the **Module** dropdown list.

1. Select **Add Configuration**, enter "Plugin gears_jvm" in the box, then select the **OK** button:

    {{<image filename="images/rs/icon_save.png" width="30px" alt="The Save icon">}}{{</image>}}

1. Select the **Activate** button.

## Verify the install

Run the `RG.JSTATS` command from a database shard to view statistics and verify that you set up RedisGears and the JVM plugin correctly:

```sh
$ shard-cli 3
172.16.0.1:12345> RG.JSTATS
```
