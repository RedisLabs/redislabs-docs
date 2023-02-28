---
Title: Redis Stack and Redis Enterprise
linkTitle: Redis Stack
description: Describes Redis Stack.
weight: 9
alwaysopen: false
categories: ["Modules"]
aliases: /modules/redis-stack/
         /modules/redis-stack.md
---

[Redis Stack](https://redis.io/docs/stack) simplifies installation and deployment of multiple modules with open source Redis databases.

Redis Enterprise Cloud and Redis Enterprise Software support all capabilities of [Redis Stack](https://redis.io/docs/stack).

For Fixed or Free subscriptions, Redis Enterprise Cloud supports Redis Stack through the [Create database]({{< relref "/rc/databases/create-database" >}}) workflow.

When you create a new database in a Fixed or Free Redis Enterprise Cloud subscription, you can set the **Type** property to _Redis Stack_.  
 
{{<image filename="images/rc/new-database-general-type-free-stack.png" alt="For Fixed and Free subscriptions, the Type setting in the General section includes an option for Redis Stack." width="75%">}}{{< /image >}}

This automatically adds the following modules to the new database:

- [RediSearch]({{< relref "/modules/redisearch/" >}})
- [RedisJSON]({{< relref "/modules/redisjson/" >}})
- [RedisGraph]({{< relref "/modules/redisgraph/" >}})
- [RedisTimeSeries]({{< relref "/modules/redistimeseries/" >}})
- [RedisBloom]({{< relref "/modules/redisbloom/" >}})

Flexible or Annual Redis Cloud subscriptions and Redis Enterprise Software also support all capabilities of Redis Stack.  

When creating new databases for Redis Enterprise Software or for Flexible/Annual Redis Enterprise Cloud subscriptions, you select the specific modules that support your specific scenario.

Each module is available to the database; combine them to meet your needs.

(At this time, RedisGraph cannot be combined with other modules in sharded databases.)

To learn more, see:

- The [Redis Stack](https://redis.io/docs/stack) docs on [redis.io](https://redis.io/).
- The [Create database]({{< relref "/rc/databases/create-database" >}}) topic for Redis Enterprise Cloud.
