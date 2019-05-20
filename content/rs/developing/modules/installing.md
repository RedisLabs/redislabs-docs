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
    1. [ReBloom]({{< relref "/rs/developing/modules/bloom-filters.md" >}})
    1. [RedisGraph](https://oss.redislabs.com/redisgraph/#quickstart)
    1. [ReJSON]({{< relref "/rs/developing/modules/rejson.md" >}})
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

Note: before creating a new DB with modules, it is recommend to download
and [upgrade the currently installed
modules]({{< relref "/rs/developing/modules/upgrading.md" >}})
to the newest versions.

1. Navigate to **databases** tab
1. Click on the **+** sign, if necessary, then **create database**
1. On the create database screen, check the box for Redis Modules and
    select the module you want to use for this database.

    ![select_module](/images/rs/select_module.png?width=794&height=554)
1. Click **Show advanced options** and put **12544** for the port.
1. Click the **activate** button
