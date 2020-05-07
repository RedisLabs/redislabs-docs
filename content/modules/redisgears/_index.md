---
Title: RedisGears
description:
weight: 55
alwaysopen: false
categories: ["Modules"]
---
## What is RedisGears?

RedisGears is an engine for data processing in Redis. RedisGears supports both batch processing and real-time, event-driven processing for Redis data. To use RedisGears, you write functions that describe how your data should be processed. You then submit this code to your Redis deployment for remote execution.

As of the v0.99.1 release, code for RedisGears must be written in Python. Support for other languages, including Java and JavaScript, is being planned.

## Getting Started with RedisGears

RedisGears is implemented by a Redis module. To use RedisGears, you'll need to make sure that your Redis deployment has the module installed. [Redis Cloud](https://redislabs.com/redis-enterprise-cloud/) and [Redis Enterprise](https://docs.redislabs.com/latest/rs/) both support the module natively. If you're running Redis Enterprise on-premises, see the [RedisGears installation docs]({{< relref "/modules/redisgears/redisgears-installation.md" >}}) for all the relevant details.

If you're running open source Redis, you'll also need to [install the module](https://oss.redislabs.com/redisgears/quickstart.html) before using it.

To get stated with RedisGears, see our [RedisGears Quick Start Tutorial]({{< relref "/modules/redisgears/redisgears-quickstart.md" >}}). To learn more about the RedisGears API and understand how it works under the hood, see of the [RedisGears docs](https://oss.redislabs.com/redisgears/).

## Write-Behind Caching Patterns

Redis users typically implement caching by using the look-aside pattern. However, with RedisGears, you can implement write-behind and read-through caching strategies, as well.

Redis Labs publishes RedisGears recipes to support write-behind. You can learn how to use these recipes in our [write-behind caching]({{< relref "/modules/redisgears/write-behind.md" >}}) guide.
