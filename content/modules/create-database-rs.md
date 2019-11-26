---
Title: Creating a database with modules in RS
description:
weight: 2
alwaysopen: false
categories: ["Modules"]
aliases:
  - /modules/rs
  - /rs/developing/modules/upgrading/
---

## Create a Database that Uses a Module

{{% note %}}
Before you create a database with a module,
we recommend that you [upgrade the module]({{< relref "/modules/upgrading-rs.md" >}}) to the latest version.
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
