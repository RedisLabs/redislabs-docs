---
Title: Compatibility with open source Redis configuration settings
linkTitle: Configuration settings
description: Lists the open source Redis configuration settings supported by Redis Enterprise Software. 
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: 
---

Only a subset of Redis configuration settings are applicable to Redis Software. Using [`CONFIG GET`](https://redis.io/commands/config-get/) or [`CONFIG SET`](https://redis.io/commands/config-set/) with other configuration settings returns an error.

## Supported configuration settings

- hash-max-ziplist-entries
- hash-max-ziplist-value
- list-max-ziplist-entries
- list-max-ziplist-value
- lua-time-limit (value must be between 0 and 60000)
- notify-keyspace-events
- set-max-intset-entries
- slowlog-log-slower-than (value must be larger than 1000)
- slowlog-max-len (value must be between 128 and 1024)
- zset-max-ziplist-entries
- zset-max-ziplist-value

