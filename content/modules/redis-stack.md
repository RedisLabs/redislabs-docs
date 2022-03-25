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

[Redis Stack](https://redis.io/docs/stack) enables new data types and use cases for Redis databases.

Redis Enterprise Cloud supports Redis Stack through the [Create database]({{< relref "/rc/databases/create-database" >}}) workflow for Fixed and Free subscriptions.

When you create a new database in a Fixed or Free Redis Enterprise Cloud subscription, you can set the **Type** property to _Redis Stack_.  

{{<image filename="images/rc/new-database-general-type-free-stack.png" alt="For Fixed and Free subscriptions, the Type setting in the General section includes an option for Redis Stack." width="75%">}}{{< /image >}}

This automatically adds the following modules to the new database:

- RediSearch 2
- RedisJSON
- RedisGraph
- RedisTimeSeries
- RedisBloom

To learn more, see:

- The [Redis Stack](https://redis.io/docs/stack) home page on redis.io.
- The [Create database]({{< relref "/rc/databases/create-database" >}}) topic for Redis Enterprise Cloud.

