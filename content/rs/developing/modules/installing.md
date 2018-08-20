---
Title: Installing a Module
description: 
weight: $weight
alwaysopen: false
---
Before you can install a module, it must be packaged to be used in Redis
Enterprise Software (RS). There are two types

1.  Redis Labs pre-packaged modules - To download these modules, go to
    the [Redis Enterprise downloads
    page](/products/redis-pack/downloads/). For more specific
    information on each module:
    a.  [ReJSON](/redis-enterprise-documentation/developing/modules/rejson/)
    b.  [RediSearch
        Enterprise](/redis-enterprise-documentation/developing/modules/redisearch/)
    c.  [ReBloom](/redis-enterprise-documentation/developing/modules/bloom-filters/)
2.  Custom packaged modules - For instructions on packing up any module
    from redismodules.com, see [Developing with
    Modules](/redis-enterprise-documentation/developing/modules/).

Once you have acquired the package (it will be in zip format) proceed to
the next step of adding the module to Redis Enterprise Software.

## Add Module to the Cluster

1.  Log into the Redis Enterprise Software web UI
2.  Navigate to the **settings** -\> **redis^e^ modules**
3.  Click on **Add Module** button and navigate to where you downloaded
    the module package\

    ![](/images/rs/add_module.png?width=800&height=318)
4.  Click on the **Upload** button and notice the name and version\

    ![](/images/rs/upload_module.png?width=800&height=321)

### Create a new database that uses the Module

 

Note: before creating a new DB with modules, it is recommend to download
and [upgrade the currently installed
modules](https://redislabs.com/redis-enterprise-documentation/developing/modules/upgrading/)
to the newest versions.

 

1.  Navigate to **databases** tab
2.  Click on the **+** sign, if necessary, then **create database**
3.  On the create database screen, check the box for Redis Modules and
    select the module you want to use for this database.\
    
    ![](/images/rs/create_database-1.png?width=794&height=554)
4.  Click **Show advanced options** and put **12544** for the port.
5.  Click the **activate** button
