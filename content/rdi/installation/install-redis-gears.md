---
Title: Install RedisGears for Redis Data Integration
linkTitle: Install RedisGears
description: Install and set up RedisGears for a Redis Data Integration deployment.
weight: 70
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

# RedisGears Installation

> Note: If your Redis Enterprise Cluster version is 6.2.18 or higher, you can use the `redis-di create` command in RDI CLI to install RedisGears.

Redis Data Integration requires [RedisGears](https://redis.com/modules/redis-gears) module with [Python plugin](https://docs.redis.com/latest/modules/redisgears/python/) to be installed on the Redis Enterprise cluster.

The Python plugin can be installed explicitly or alongside with the [JVM plugin](https://docs.redis.com/latest/modules/redisgears/jvm/) if the latter is needed on the cluster for other purposes.

## Download RedisGears

Download RedisGears based on the Linux distribution of where Redis Enterprise is installed. As mentioned, Redis Data Integration only requires the Python plugin, so download only it unless the JVM plugin is also needed.

> Note: If your Redis Enterprise Cluster is version 6.2.18 or higher, please download the RedisGears bundle that includes the Python plugin.

### Ubuntu 20.04

```bash
curl -s https://redismodules.s3.amazonaws.com/redisgears/redisgears.Linux-ubuntu20.04-x86_64.{{<param rdi_redis_gears_current_version>}}-withdeps.zip -o /tmp/redis-gears.zip
```

### Ubuntu 18.04

```bash
curl -s https://redismodules.s3.amazonaws.com/redisgears/redisgears.Linux-ubuntu18.04-x86_64.{{<param rdi_redis_gears_current_semantic_version>}}-withdeps.zip -o /tmp/redis-gears.zip
```

### RHEL8

```bash
curl -s https://redismodules.s3.amazonaws.com/redisgears/redisgears.Linux-rhel8-x86_64.{{<param rdi_redis_gears_current_semantic_version>}}-withdeps.zip -o /tmp/redis-gears.zip
```


### RHEL7

```bash
curl -s https://redismodules.s3.amazonaws.com/redisgears/redisgears.Linux-rhel7-x86_64.{{<param rdi_redis_gears_current_semantic_version>}}-withdeps.zip -o /tmp/redis-gears.zip
```
