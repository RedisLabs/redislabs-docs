---
Title: Adding Modules to a Database
description:
weight: 8
alwaysopen: false
categories: ["Modules"]
aliases:
  - /modules/rs
  - /rs/developing/modules/upgrading/
  - /rs/developing/modules/installing/
  - /modules/create-database-rs/

---
Modules add additional functionality to your databases for specific use cases.
You can add modules to the database when you create the database.

## Add modules to a database

{{< note >}}
- Before you add a module to a database,
    we recommend that you [upgrade the module]({{< relref "/modules/add-module-to-cluster.md" >}}) to the latest version.
- After you add a module to the database,
    certain database fields for the database are disabled according to the supported capabilities of the module.
{{< /note >}}

To add modules to a database:

1. Go to: **databases**
1. Click ![Add](/images/rs/icon_add.png#no-click "Add") and **create database**
1. Configure the database settings.
1. In the Redis Modules field, click ![Add](/images/rs/icon_add.png#no-click "Add"):
    1. Select the module that you want to add.
    1. If you want the module to use a custom configuration, click **Add configuration** and enter the optional custom configuration.
        - RediSearch - You can find the configuration options in the [RediSearch documentation](https://oss.redislabs.com/redisearch/Configuring.html#redisearch_configuration_options).
        - RedisGraph - You can specify the number of threads to distribute the RediSearch queries to: `THREAD_COUNT X`

            By default, the thread count is the same as the number of cores on the node.
        - RedisTimeSeries - You can find the configuration options in the [RedisTimeSeries documentation](https://oss.redislabs.com/redistimeseries/configuration/#redistimeseries-configuration-options).
    1. Click ![Save](/images/rs/icon_save.png#no-click "Save").

    Here it is in action:
    {{< video "/images/rs/multiple-modules.mp4" "Adding multiple modules" >}}

1. Click **Show advanced options** and enter a port number for the database, such as: **12543**.
1. Click **Activate**.
