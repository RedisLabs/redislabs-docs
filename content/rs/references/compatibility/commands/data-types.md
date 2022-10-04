---
Title: Data type commands compatibility
linkTitle: Data types
description: Lists the data type commands compatible with Redis Enterprise Software.
weight: 10
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: 
---

## Bitmap commands

| Command | Redis Enterprise Software | Active-Active databases | Description |
|---------|---------------------------|-------------------------|------------|
| [x](https://redis.io/commands/) |  |  |  |

## Geospatial indices commands

| Command | Redis Enterprise Software | Active-Active databases | Description |
|---------|---------------------------|-------------------------|------------|
| [x](https://redis.io/commands/) |  |  |  |

## Hash commands

| Command | Redis Enterprise Software | Active-Active databases | Description |
|---------|---------------------------|-------------------------|------------|
| [HDEL](https://redis.io/commands/hdel) | &#x2705; Yes | &#x2705; Yes |  |
| [HEXISTS](https://redis.io/commands/hexists) | &#x2705; Yes | &#x2705; Yes |  |
| [HGET](https://redis.io/commands/hget) | &#x2705; Yes | &#x2705; Yes |  |
| [HGETALL](https://redis.io/commands/hgetall) | &#x2705; Yes | &#x2705; Yes |  |
| [HINCRBY](https://redis.io/commands/hincrby) | &#x2705; Yes | &#x2705; Yes |  |
| [HINCRBYFLOAT](https://redis.io/commands/hincrbyfloat) | &#x2705; Yes | &#x2705; Yes |  |
| [HKEYS](https://redis.io/commands/hkeys) | &#x2705; Yes | &#x2705; Yes |  |
| [HLEN](https://redis.io/commands/hlen) | &#x2705; Yes | &#x2705; Yes |  |
| [HMGET](https://redis.io/commands/hmget) | &#x2705; Yes | &#x2705; Yes |  |
| [HMSET](https://redis.io/commands/hmset) | &#x2705; Yes | &#x2705; Yes |  |
| [HRANDFIELD](https://redis.io/commands/hrandfield) | &#x2705; Yes | &#x2705; Yes |  |
| [HSCAN](https://redis.io/commands/hscan) | &#x2705; Yes | &#x2705; Yes |  |
| [HSET](https://redis.io/commands/hset) | &#x2705; Yes | &#x2705; Yes |  |
| [HSETNX](https://redis.io/commands/hsetnx) | &#x2705; Yes | &#x2705; Yes |  |
| [HSTRLEN](https://redis.io/commands/hstrlen) | &#x2705; Yes | &#x2705; Yes |  |
| [HVALS](https://redis.io/commands/hvals) | &#x2705; Yes | &#x2705; Yes |  |

## HyperLogLog commands

| Command | Redis Enterprise Software | Active-Active databases | Description |
|---------|---------------------------|-------------------------|------------|
| [x](https://redis.io/commands/) |  |  |  |

## List commands

| Command | Redis Enterprise Software | Active-Active databases | Description |
|---------|---------------------------|-------------------------|------------|
| [x](https://redis.io/commands/) |  |  |  |

## Set commands

| Command | Redis Enterprise Software | Active-Active databases | Description |
|---------|---------------------------|-------------------------|------------|
| [SADD](https://redis.io/commands/sadd) | &#x2705; Yes | &#x2705; Yes |  |
| [SCARD](https://redis.io/commands/scard) | &#x2705; Yes | &#x2705; Yes |  |
| [SDIFF](https://redis.io/commands/sdiff) | &#x2705; Yes | &#x2705; Yes |  |
| [SDIFFSTORE](https://redis.io/commands/sdiffstore) | &#x2705; Yes | &#x2705; Yes |  |
| [SINTER](https://redis.io/commands/sinter) | &#x2705; Yes | &#x2705; Yes |  |
| [SINTERCARD](https://redis.io/commands/sintercard) | &#x2705; Yes | &#x2705; Yes |  |
| [SINTERSTORE](https://redis.io/commands/sinterstore) | &#x2705; Yes | &#x2705; Yes |  |
| [SISMEMBER](https://redis.io/commands/sismember) | &#x2705; Yes | &#x2705; Yes |  |
| [SMEMBERS](https://redis.io/commands/smembers) | &#x2705; Yes | &#x2705; Yes |  |
| [SMISMEMBER](https://redis.io/commands/sismember) | &#x2705; Yes | &#x2705; Yes |  |
| [SMOVE](https://redis.io/commands/smove) | &#x2705; Yes | &#x2705; Yes |  |
| [SPOP](https://redis.io/commands/spop) | &#x2705; Yes | &#x2705; Yes |  |
| [SRANDMEMBER](https://redis.io/commands/srandmember) | &#x2705; Yes | &#x2705; Yes |  |
| [SREM](https://redis.io/commands/srem) | &#x2705; Yes | &#x2705; Yes |  |
| [SSCAN](https://redis.io/commands/sscan) | &#x2705; Yes | &#x2705; Yes |  |
| [SUNION](https://redis.io/commands/sunion) | &#x2705; Yes | &#x2705; Yes |  |
| [SUNIONSTORE](https://redis.io/commands/sunionstore) | &#x2705; Yes | &#x2705; Yes |  |

## Sorted set commands

| Command | Redis Enterprise Software | Active-Active databases | Description |
|---------|---------------------------|-------------------------|------------|
| [x](https://redis.io/commands/) |  |  |  |

## Stream commands

| Command | Redis Enterprise Software | Active-Active databases | Description |
|---------|---------------------------|-------------------------|------------|
| [x](https://redis.io/commands/) |  |  |  |

## String commands

| Command | Redis Enterprise Software | Active-Active databases | Description |
|---------|---------------------------|-------------------------|------------|
| [APPEND](https://redis.io/commands/append) | &#x2705; Yes | &#x2705; Yes |  |
| [DECR](https://redis.io/commands/decr) | &#x2705; Yes | &#x2705; Yes |  |
| [DECRBY](https://redis.io/commands/decrby) | &#x2705; Yes | &#x2705; Yes |  |
| [GET](https://redis.io/commands/get) | &#x2705; Yes | &#x2705; Yes |  |
| [GETDEL](https://redis.io/commands/getdel) | &#x2705; Yes | &#x2705; Yes |  |
| [GETEX](https://redis.io/commands/getex) | &#x2705; Yes | &#x2705; Yes |  |
| [GETRANGE](https://redis.io/commands/getrange) | &#x2705; Yes | &#x2705; Yes |  |
| [GETSET](https://redis.io/commands/getset) | &#x2705; Yes | &#x2705; Yes |  |
| [INCR](https://redis.io/commands/incr) | &#x2705; Yes | &#x2705; Yes |  |
| [INCRBY](https://redis.io/commands/incrby) | &#x2705; Yes | &#x2705; Yes |  |
| [INCRBYFLOAT](https://redis.io/commands/incrbyfloat) | &#x2705; Yes | &#x2705; Yes |  |
| [LCS](https://redis.io/commands/lcs) | &#x2705; Yes |  |  |
| [MGET](https://redis.io/commands/mget) | &#x2705; Yes | &#x2705; Yes |  |
| [MSET](https://redis.io/commands/mset) | &#x2705; Yes | &#x2705; Yes |  |
| [MSETNX](https://redis.io/commands/msetnx) | &#x2705; Yes | &#x2705; Yes |  |
| [PSETEX](https://redis.io/commands/psetex) | &#x2705; Yes | &#x2705; Yes |  |
| [SET](https://redis.io/commands/set) | &#x2705; Yes | &#x2705; Yes |  |
| [SETEX](https://redis.io/commands/setex) | &#x2705; Yes | &#x2705; Yes |  |
| [SETNX](https://redis.io/commands/setnx) | &#x2705; Yes | &#x2705; Yes |  |
| [SETRANGE](https://redis.io/commands/setrange) | &#x2705; Yes | &#x2705; Yes |  |
| STRALGO | &#x274c; No | &#x274c; No |  |
| [STRLEN](https://redis.io/commands/strlen) | &#x2705; Yes | &#x2705; Yes |  |
| [SUBSTR](https://redis.io/commands/substr) | &#x274c; No | &#x274c; No | (Deprecated) |
