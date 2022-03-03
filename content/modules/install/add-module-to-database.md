---
Title: Enable a module for a database
linkTitle: Enable for a database
description:
weight: 30
alwaysopen: false
toc: "true"
categories: ["Modules"]
aliases:
  - /modules/rs
  - /rs/developing/modules/upgrading/
  - /rs/developing/modules/installing/
  - /modules/create-database-rs/
  - /modules/add-module-to-database/

---

Modules add additional functionality to Redis databases for specific use cases. You can enable modules when you create a database.

## Prerequisites

- [Installed the module on the cluster]({{<relref "/modules/install/add-module-to-cluster">}})
- [Upgraded the module]({{<relref "/modules/install/upgrade-module">}}) to the latest version

## Create a database with a module

{{<note>}}
You can only add modules to a database when you first create it. You cannot add modules to an existing database.
{{</note>}}

In the Redis Enterprise admin console, follow these steps to add modules to a database:

1. From the **databases** page, select the **Add** button to create a new database:

    {{<image filename="images/rs/icon_add.png" width="30px" alt="The Add icon">}}{{</image>}}

1. Confirm that you want to create a new Redis database with the **Next** button.

1. Configure the database settings.

1. For **Redis Modules**:

    1. Select the **Add** button:

        {{<image filename="images/rs/icon_add.png" width="30px" alt="The Add icon">}}{{</image>}}
    
    1. Select the module from the **Module** dropdown list.

    1. To use custom configuration with a module, select **Add configuration** and enter the [configuration options](#module-configuration-options).

    1. Select the **OK** button to confirm that you want to enable the module:

        {{<image filename="images/rs/icon_save.png" width="30px" alt="The Save icon">}}{{</image>}}

    1. Repeat these steps to add additional modules to the database.

        {{<note>}}
You cannot use RediSearch 1.x and RediSearch 2.x in the same database.
        {{</note>}}

1. Select **Show advanced options** and enter a port number for the database, such as **12543**.

    {{<note>}}
Depending on the [features supported by an enabled module]({{<relref "/modules/enterprise-capabilities#module-feature-support">}}), certain database configuration fields may not be available.
    {{</note>}}

1. Select the **Activate** button.

## Module configuration options

- [RediSearch configuration options](https://oss.redis.com/redisearch/Configuring#redisearch_configuration_options)

- [RedisGraph configuration options](https://oss.redis.com/redisgraph/configuration#redisgraph-configuration-options)

- [RedisTimeSeries configuration options](https://oss.redislabs.com/redistimeseries/configuration#redistimeseries-configuration-options)