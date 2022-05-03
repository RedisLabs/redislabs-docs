---
Title: Redis Stack on Redis Enterprise
linkTitle: Redis Stack
description: Describes Redis Stack.
weight: 9
alwaysopen: false
categories: ["Modules"]
aliases: /modules/redis-stack/
         /modules/redis-stack.md
---

[Redis Stack](https://redis.io/docs/stack) enables multiple modules to be used with open source Redis databases; it simplifies installation and deployment.

Redis Enterprise Cloud and Redis Enterprise Software support all capabilities of [Redis Stack](https://redis.io/docs/stack).

For Fixed for Free subscriptions, Redis Enterprise Cloud supports Redis Stack through the [Create database]({{< relref "/rc/databases/create-database" >}}) workflow.

When you create a new database in a Fixed or Free Redis Enterprise Cloud subscription, you can set the **Type** property to _Redis Stack_.  
 
{{<image filename="images/rc/new-database-general-type-free-stack.png" alt="For Fixed and Free subscriptions, the Type setting in the General section includes an option for Redis Stack." width="75%">}}{{< /image >}}

This automatically adds the following modules to the new database:

- [RediSearch 2]({{< relref "/modules/redisearch/" >}})
- [RedisJSON]({{< relref "/modules/redisjson/" >}})
- [RedisGraph]({{< relref "/modules/redisgraph/" >}})
- [RedisTimeSeries]({{< relref "/modules/redistimeseries/" >}})
- [RedisBloom]({{< relref "/modules/redisbloom/" >}})

Redis Enterprise Software and Redis Enterprise Flexible/Annual subscriptions also support all capabilities of Redis Stack.  Here, you select the specific modules that support your specific scenario.

Each module is available to the database and you can combine their capabilities to meet your needs.

To learn more, see:

- The [Redis Stack](https://redis.io/docs/stack) docs on [redis.io](https://redis.io/).
- The [Create database]({{< relref "/rc/databases/create-database" >}}) topic for Redis Enterprise Cloud.