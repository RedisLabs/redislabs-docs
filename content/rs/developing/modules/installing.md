---
Title: Installing a Module
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Before you can install a module, it must be packaged to be used in Redis
Enterprise Software (RS). There are two types

1. Redis Labs pre-packaged modules - To download these modules, go to
    the [Redis Enterprise downloads
    page](https://redislabs.com/redis-enterprise/software/downloads/#tabTwo). For more specific
    information on each module:
    1. [RedisBloom]({{< relref "/rs/developing/modules/bloom-filters.md" >}})
    1. [RedisGraph](https://oss.redislabs.com/redisgraph/#quickstart)
    1. [RedisJSON]({{< relref "/rs/developing/modules/redisjson.md" >}})
    1. [RediSearch Enterprise]({{< relref "/rs/developing/modules/redisearch.md" >}})
1. Custom packaged modules - For instructions on packing up any module
    from redismodules.com, see [Developing with
    Modules]({{< relref "/rs/developing/modules/_index.md" >}}).

Once you have acquired the package (it will be in zip format) proceed to
the next step of adding the module to Redis Enterprise Software.

## Add Module to the Cluster

1. Log into the Redis Enterprise Software web UI
1. Navigate to the **settings** -\> **redis<sup>e</sup> modules**
1. Click on **Add Module** button and navigate to where you downloaded
    the module package

    ![add_module](/images/rs/add_module.png?width=800&height=318)
1. Click on the **Upload** button and notice the name and version

    ![upload_module](/images/rs/upload_module.png?width=800&height=321)

### Create a new database that uses the Module

Note: Before you create a new DB with modules,
we recommend that you [upgrade the currently installed modules]({{< relref "/rs/developing/modules/upgrading.md" >}})
to the newest versions.

1. Go to **databases**.
1. Click ![Add](/images/rs/icon_add.png#no-click "Add") and click **create database**.
1. In the Redis Modules field, click ![Add](/images/rs/icon_add.png#no-click "Add").
1. Select the module that you want to add.
1. If you want the module to use a custom configuration,
click **Add configuration** and enter the optional custom configuration.
1. Click ![Save](/images/rs/icon_save.png#no-click "Save").

    {{< video "/images/rs/multiple-modules.mp4" "Adding multiple modules" >}}

1. Click **Show advanced options** and put **12543** for the port.
1. Click the **activate** button
