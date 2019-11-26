---
Title: Installing a Module
description:
weight: $weight
alwaysopen: false
categories: ["Modules"]
aliases: /rs/developing/modules/installing/
---
Redis modules are dedicated and optimized engines for specific data models.
You can use either:

1. [Redis Labs pre-packaged modules](https://redislabs.com/redis-enterprise/software/downloads/#tabTwo) - These modules are pre-packaged with RS:
    - [RedisBloom]({{< relref "/modules/redisbloom/_index.md" >}})
    - [RedisGraph]({{< relref "/modules/redisgraph/_index.md" >}})
    - [RedisJSON]({{< relref "/modules/redisjson/_index.md" >}})
    - [RediSearch]({{< relref "/modules/redisearch/_index.md" >}})
1. [Custom packaged modules](https://redislabs.com/community/redis-modules-hub/) - These modules are developed by the Redis community.

    You can download and install these modules or [develop your own modules]({{< relref "/rs/developing/modules/_index.md" >}}).

## Add a Module to the Cluster

1. Login to the Redis Enterprise Software web UI.
1. Go to: **settings** > **redis<sup>e</sup> modules**
1. Click **Add Module** and browse to the module package that you want to install.
    ![add_module](/images/rs/add_module.png)
1. Make sure that the module name and version are correct and click **Upload**.
    ![upload_module](/images/rs/upload_module.png)

## Create a Database that Uses a Module

{{% note %}}
Before you create a database with a module,
we recommend that you [upgrade the module]({{< relref "/modules/upgrading.md" >}}) to the latest version.
{{% /note %}}

To create a database that uses a module:

1. Go to: **databases**
1. Click ![Add](/images/rs/icon_add.png#no-click "Add") and **create database**.
1. Configure the database settings.
1. In the Redis Modules field, click ![Add](/images/rs/icon_add.png#no-click "Add"):
    1. Select the module that you want to add.
    1. If you want the module to use a custom configuration, click **Add configuration** and enter the optional custom configuration.
        - RediSearch - You can find the configuration options in the [RediSearch documentation](https://oss.redislabs.com/redisearch/Configuring.html#redisearch_configuration_options).
        - RedisGraph - You can specify the number of threads to distribute the RediSearch queries to: `THREAD_COUNT X`

            By default, the thread count is the same as the number of cores on the node.
        - RedisTimeSeries - You can find the configuration options in the [RedisTimeSeries documentation](https://oss.redislabs.com/redistimeseries/configuration/#redistimeseries-configuration-options).
    1. Click ![Save](/images/rs/icon_save.png#no-click "Save").

    {{< video "/images/rs/multiple-modules.mp4" "Adding multiple modules" >}}

1. Click **Show advanced options** and enter a port number for the database, such as: **12543**.
1. Click **Activate**.
