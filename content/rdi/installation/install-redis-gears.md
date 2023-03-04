---
Title: Install RedisGears for Redis Data Integration
linkTitle: Install RedisGears
description: Install and set up RedisGears for a Redis Data Integration deplyoment.
weight: 70
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

Redis Data Integration requires [RedisGears](https://redis.com/modules/redis-gears) module with [Python plugin](https://docs.redis.com/latest/modules/redisgears/python/) to be installed on the Redis Enterprise cluster.

The Python plugin can be installed explicitly or alongside with the [JVM plugin](https://docs.redis.com/latest/modules/redisgears/jvm/) if the latter is needed on the cluster for other purposes.

## Download RedisGears

Download RedisGears based on the Linux distribution of where Redis Enterprise is installed. As mentioned, Redis Data Integration only requires the Python plugin, so download only it unless the JVM plugin is also needed.

### [Ubuntu](https://ubuntu.com/)

#### 20.04

##### Python plugin only

```bash
curl -s https://redismodules.s3.amazonaws.com/redisgears/redisgears_python.Linux-ubuntu20.04-x86_64.{{ site.redis_gears_min_semantic_version }}.zip -o /tmp/redis-gears.zip
```

##### Python and JVM Plugins

```bash
curl -s https://redismodules.s3.amazonaws.com/redisgears/redisgears.Linux-ubuntu20.04-x86_64.{{ site.redis_gears_min_semantic_version }}.zip -o /tmp/redis-gears.zip
```

#### 18.04

##### Python plugin only

```bash
curl -s https://redismodules.s3.amazonaws.com/redisgears/redisgears_python.Linux-ubuntu18.04-x86_64.{{ site.redis_gears_min_semantic_version }}.zip -o /tmp/redis-gears.zip
```

##### Python and JVM plugins

```bash
curl -s https://redismodules.s3.amazonaws.com/redisgears/redisgears.Linux-ubuntu18.04-x86_64.{{ site.redis_gears_min_semantic_version }}.zip -o /tmp/redis-gears.zip
```

### [Red Hat Enterprise Linux](https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux)

#### RHEL8

##### Python plugin only

```bash
curl -s https://redismodules.s3.amazonaws.com/redisgears/redisgears_python.Linux-rhel8-x86_64.{{ site.redis_gears_min_semantic_version }}.zip -o /tmp/redis-gears.zip
```

##### Python and JVM plugins

```bash
curl -s https://redismodules.s3.amazonaws.com/redisgears/redisgears.Linux-rhel8-x86_64.{{ site.redis_gears_min_semantic_version }}.zip -o /tmp/redis-gears.zip
```

#### RHEL7

##### Python plugin only

```bash
curl -s https://redismodules.s3.amazonaws.com/redisgears/redisgears_python.Linux-rhel7-x86_64.{{ site.redis_gears_min_semantic_version }}.zip -o /tmp/redis-gears.zip
```

##### Python and JVM plugins

```bash
curl -s https://redismodules.s3.amazonaws.com/redisgears/redisgears.Linux-rhel7-x86_64.{{ site.redis_gears_min_semantic_version }}.zip -o /tmp/redis-gears.zip
```

## Install RedisGears 

```bash
curl -v -k -s -u "<REDIS_CLUSTER_USER>:<REDIS_CLUSTER_PASSWORD>" -F "module=@/tmp/redis-gears.zip" https://<REDIS_CLUSTER_HOST>:9443/v2/modules
```
