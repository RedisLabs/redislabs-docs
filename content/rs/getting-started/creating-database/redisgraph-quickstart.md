---
Title: RedisGraph Quick Start Tutorial
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/getting-started/creating-database/redisgraph-quick-start//
---
For this quick start, you will need the following:

- [A Redis Enterprise Software cluster with set up already
    complete]({{< relref "/rs/getting-started/quick-setup.md" >}})
- redis-cli

## Create a new database that uses the module

1. In the Redis Modules field, click ![Add](/images/rs/icon_add.png#no-click "Add").
1. Select the RedisGraph module.
1. If you want the module to use a custom configuration,
click **Add configuration** and enter the optional custom configuration.
1. Click ![Save](/images/rs/icon_save.png#no-click "Save").

    For example:
    {{< video "/images/rs/multiple-modules.mp4" "Adding multiple modules" >}}

1. Click **Activate**.

{{< embed-md "tryout-redisgraph.md" >}}
