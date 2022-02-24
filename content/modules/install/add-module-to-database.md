---
Title: Add a module to a database
linkTitle: Enable for a database
description:
weight: 30
alwaysopen: false
categories: ["Modules"]
aliases:
  - /modules/rs
  - /rs/developing/modules/upgrading/
  - /rs/developing/modules/installing/
  - /modules/create-database-rs/
  - /modules/add-module-to-database/

---
Modules add additional functionality to your databases for specific use cases.
You can add modules to the database when you create the database.

## Prerequisites

- [Added the module to the cluster]({{<relref "/modules/install/add-module-to-cluster">}})
- [Upgraded the module]({{<relref "/modules/install/add-module-to-cluster">}}) to the latest version

## Create a database with a module

{{<note>}}
You can only add modules to a database when you first create it, so you can't add modules to an existing database.
{{</note>}}

To add modules to a database:

1. From the **databases** page, select ![Add](/images/rs/icon_add.png#no-click "Add") and **create database**.
1. Configure the database settings.
1. In the **Redis Modules** field, select ![Add](/images/rs/icon_add.png#no-click "Add"):
    1. Select the module that you want to add from the dropdown list.
1. If you want the module to use a custom configuration, select **Add configuration** and enter the optional custom configuration.
        - RediSearch - You can find the configuration options in the [RediSearch documentation](https://oss.redislabs.com/redisearch/Configuring.html#redisearch_configuration_options).
        - RedisGraph - You can specify the number of threads to distribute the RediSearch queries to: `THREAD_COUNT X`

            By default, the thread count is the same as the number of cores on the node.
        - RedisTimeSeries - You can find the configuration options in the [RedisTimeSeries documentation](https://oss.redislabs.com/redistimeseries/configuration/#redistimeseries-configuration-options).
    1. Select ![Save](/images/rs/icon_save.png#no-click "Save").

    {{< video "/images/rs/multiple-modules.mp4" "Adding multiple modules" >}}

    {{<note>}}
Depending on the features supported by an enabled module, certain database configuration fields may not be available.
    {{</note>}}

    You can repeat these steps to add additional modules to the database.

    {{<note>}}
You cannot use RediSearch 1.x and RediSearch 2.x in the same database.
    {{</note>}}

1. Select **Show advanced options** and enter a port number for the database, such as **12543**.
1. Select **Activate**.
