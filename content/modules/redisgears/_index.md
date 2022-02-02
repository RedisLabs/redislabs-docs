---
Title: RedisGears
description:
weight: 40
alwaysopen: false
categories: ["Modules"]
aliases: /redisgears/
         /redis-gears/
         /redis_gears/
---
## What is RedisGears?

RedisGears is an engine for data processing in Redis. RedisGears supports batch and event-driven processing for Redis data. To use RedisGears, you write functions that describe how your data should be processed. You then submit this code to your Redis deployment for remote execution.

As of v1.0.0, code for RedisGears must be written in Python. However, an internal C API exists and can be used by other Redis modules. Support for other languages is being planned.

## Getting started with RedisGears

RedisGears is implemented by a Redis module. To use RedisGears, you'll need to make sure that your Redis deployment has the module installed. [Redis Enterprise Software](https://docs.redislabs.com/latest/rs/) supports the module natively.

If you're running open source Redis, you'll also need to [install the RedisGears module]({{< relref "/modules/redisgears/installing-redisgears.md" >}}) before using it.

To get stated with RedisGears, see our [RedisGears Quick Start Tutorial]({{< relref "/modules/redisgears/redisgears-quickstart.md" >}}). To learn more about the RedisGears API and understand how it works under the hood, see of the [RedisGears docs](https://oss.redislabs.com/redisgears/).

## Write-behind caching patterns

Redis users typically implement caching by using the look-aside pattern. However, with RedisGears, you can implement write-behind caching strategies, as well.

Redis publishes RedisGears recipes to support write-behind. You can learn how to use these recipes in our [write-behind caching]({{< relref "/modules/redisgears/write-behind.md" >}}) guide.
