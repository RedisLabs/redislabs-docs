---
Title: RedisTimeSeries Quick Start Tutorial
description:
weight: 20
alwaysopen: false
categories: ["Modules"]
aliases: /rs/getting-started/creating-database/redistimeseries/
---
For this quick start tutorial, you need:

- Either:
    - A Redis Cloud database [with the RedisTimeSeries module]({{< relref "/rc/databases/create-database.md" >}})

        You can [set up a free Redis Cloud database]({{< relref "/modules/modules-quickstart.md" >}}) to see the module in action.
    - A Redis Enterprise Software database [with the RedisTimeSeries module]({{< relref "/modules/add-module-to-database.md" >}})
- redis-cli with connectivity to a redis database

{{< embed-md "tryout-redistimeseries.md" >}}
