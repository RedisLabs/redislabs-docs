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

1. Redis Enterprise v6.0.12 or later

1. Created a Redis Enterprise cluster

1. Added nodes to the cluster

## Install RedisGears and the JVM plugin

If your cluster uses Redis Enterprise v6.0.12 or later and has internet access, you only need to download the RedisGears package. It automatically fetches dependencies like the JVM plugin during online installation.

Offline installation requires you to manually upload dependencies to the master node.

To install RedisGears and the JVM plugin:

1. Download the RedisGears package from the [download center](https://redis.com/redis-enterprise-software/download-center/modules/).

    {{<note>}}
For offline installation, you also need to download the packages for RedisGears dependencies.
    {{</note>}}

1. Upload the RedisGears package to a node in the cluster.

1. For offline installation only, copy the dependencies to the following directory on the master node: `$modulesdatadir/rg/<version_integer>/deps/`
    ```sh
    $ cp gears-jvm.linux-centos7-x64.0.1.0.tgz $modulesdatadir/rg/10201/deps/
    ```

    {{<note>}}
Skip this step unless your cluster does not have internet access. 
    {{</note>}}

1. Add RedisGears to the cluster with a [`POST` request to the `/v2/modules` REST API endpoint]({{<relref "/rs/references/rest-api/requests/modules#post-module-v2">}}):

    ```sh
    $ curl -k -u "<user>:<password>" -F "module=@/tmp/redisgears.linux-centos7-x64.1.2.1.zip" https://localhost:9443/v2/modules
    ```

After the install is complete, RedisGears will appear in the list of available modules on the **settings** and **create database** pages of the Redis Enterprise admin console.

## Enable RedisGears for a database

1. From the Redis Enterprise admin console's **databases** page, select the **Add** button to create a new database:

    {{<image filename="images/rs/icon_add.png" width="30px" alt="The Add icon">}}{{</image>}}

1. Confirm that you want to create a new Redis database with the **Next** button.

1. On the **create database** page, give your database a name.

1. For **Redis Modules**, select the **Add** button and choose RedisGears from the **Module** dropdown list.

1. Select **Add Configuration**, enter `Plugin gears_jvm` in the box, then select the **OK** button:

    {{<image filename="images/rs/icon_save.png" width="30px" alt="The Save icon">}}{{</image>}}

    {{<note>}}
You can configure additional JVM options in this box. For example:<br></br>
`Plugin gears_jvm JvmOptions `<nobr>`'-Dproperty1=value1`</nobr> <nobr>`-Dproperty2=value2'`</nobr>
    {{</note>}}

1. Select the **Activate** button.

## Verify the install

Run the `RG.JSTATS` command from a database shard to view statistics and verify that you set up RedisGears and the JVM plugin correctly:

```sh
$ shard-cli 3
172.16.0.1:12345> RG.JSTATS
```
