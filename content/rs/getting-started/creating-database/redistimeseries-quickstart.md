---
Title: RedisTimeSeries Quick Start Tutorial
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/getting-started/creating-database/redistimeseries/
---
For this quick start, you will need the following:

- [A Redis Enterprise Software cluster with set up already
    complete]({{< relref "/rs/getting-started/quick-setup.md" >}})
- Any redis-cli or RedisJSON enabled client

## Create a new database that uses the Module

1. In the Redis Modules field, click ![Add](/images/rs/icon_add.png#no-click "Add").
1. Select the RedisTimeSeries module.
1. If you want the module to use a custom configuration,
click **Add configuration** and enter the optional custom configuration.
1. Click ![Save](/images/rs/icon_save.png#no-click "Save").

    For example:
    {{< video "/images/rs/multiple-modules.mp4" "Adding multiple modules" >}}

1. Click the **Activate** button

{{< embed-md "tryout-redistimeseries.md" >}}
