---
Title: System requirements for RedisInsight
date: 2021-01-29 03:49:29 +0530
weight: 4
categories: ["RI"]
path: install/system-requirements/
---
This section of the documentation describes the recommended requirements for various Operating Systems for running RedisInsight.

## Windows

- Windows 10
- 8GB Memory (RAM)
- 32 bit or 64 bit (Application is 32 bit so it will work on both)
- No software pre-requisites. RI should install and run on a fresh Windows system, no need to install any .NET framework or anything like that.

## Mac

- Max OS X 10.9 or later
- 8GB Memory (RAM)
- 64 bit
- No software pre-requisites

{{< note >}}
RedisInsight is supported on Mac hardware with Intel chips, but not for Mac hardware with the Apple M1 (ARM) chip
{{< /note >}}

## Linux

- Ubuntu 18.04 LTS or later
- 15GB Memory (RAM)  
- 64 bit
- No software pre-requisites

{{< note >}}
Disk space: Having a few GBs free is always recommended for any application, but RI doesn’t store anything larger than a few megabytes. The exception to this is if you’re using [online memory analysis](https://docs.redislabs.com/latest/ri/using-redisinsight/memory-analysis/), in which case you’ll want to have enough space to store the RDB file for your Redis database, which is usually 10-50% of the Redis instance’s memory usage.
{{< /note >}}
