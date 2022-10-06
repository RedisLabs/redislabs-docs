---
Title: Data type commands compatibility
linkTitle: Data types
description: Data type commands compatibility (bitmaps, geospatial indices, hashes, HyperLogLogs, lists, sets, sorted sets, streams, strings).
weight: 10
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: 
---

The following tables show which open source Redis data type commands are compatible with standard and Active-Active databases in Redis Enterprise Software and Redis Enterprise Cloud.

## Bitmap commands

| Command | Redis<br />Enterprise | Redis<br />Cloud | Notes |
|:--------|:----------------------|:-----------------|:------|
| [BITCOUNT](https://redis.io/commands/bitcount) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [BITFIELD](https://redis.io/commands/bitfield) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [BITFIELD_RO](https://redis.io/commands/bitfield_ro) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [BITOP](https://redis.io/commands/bitop) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes  |  |
| [BITPOS](https://redis.io/commands/bitpos) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes  |  |
| [GETBIT](https://redis.io/commands/getbit) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [SETBIT](https://redis.io/commands/setbit) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |


## Geospatial indices commands

| Command | Redis<br />Enterprise | Redis<br />Cloud | Notes |
|:--------|:----------------------|:-----------------|:------|
| [GEOADD](https://redis.io/commands/geoadd) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [GEODIST](https://redis.io/commands/geodist) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [GEOHASH](https://redis.io/commands/geohash) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [GEOPOS](https://redis.io/commands/geopos) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [GEORADIUS](https://redis.io/commands/georadius) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | Deprecated as of Redis v6.2.0. |
| [GEORADIUS_RO](https://redis.io/commands/georadius_ro) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | Deprecated as of Redis v6.2.0. |
| [GEORADIUSBYMEMBER](https://redis.io/commands/georadiusbymember) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | Deprecated as of Redis v6.2.0. |
| [GEORADIUSBYMEMBER_RO](https://redis.io/commands/georadiusbymember_ro) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | Deprecated as of Redis v6.2.0. |
| [GEOSEARCH](https://redis.io/commands/geosearch) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [GEOSEARCHSTORE](https://redis.io/commands/geosearchstore) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |


## Hash commands

| Command | Redis<br />Enterprise | Redis<br />Cloud | Notes |
|:--------|:----------------------|:-----------------|:------|
| [HDEL](https://redis.io/commands/hdel) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [HEXISTS](https://redis.io/commands/hexists) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [HGET](https://redis.io/commands/hget) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [HGETALL](https://redis.io/commands/hgetall) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [HINCRBY](https://redis.io/commands/hincrby) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [HINCRBYFLOAT](https://redis.io/commands/hincrbyfloat) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [HKEYS](https://redis.io/commands/hkeys) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [HLEN](https://redis.io/commands/hlen) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [HMGET](https://redis.io/commands/hmget) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [HMSET](https://redis.io/commands/hmset) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | Deprecated as of Redis v4.0.0. |
| [HRANDFIELD](https://redis.io/commands/hrandfield) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [HSCAN](https://redis.io/commands/hscan) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [HSET](https://redis.io/commands/hset) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [HSETNX](https://redis.io/commands/hsetnx) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [HSTRLEN](https://redis.io/commands/hstrlen) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [HVALS](https://redis.io/commands/hvals) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |


## HyperLogLog commands

| Command | Redis<br />Enterprise | Redis<br />Cloud | Notes |
|:--------|:----------------------|:-----------------|:------|
| [PFADD](https://redis.io/commands/pfadd) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [PFCOUNT](https://redis.io/commands/pfcount) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [PFDEBUG](https://redis.io/commands/pfdebug) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [PFMERGE](https://redis.io/commands/pfmerge) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [PFSELFTEST](https://redis.io/commands/pfselftest) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |


## List commands

| Command | Redis<br />Enterprise | Redis<br />Cloud | Notes |
|:--------|:----------------------|:-----------------|:------|
| [BLMOVE](https://redis.io/commands/blmove) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [BLMPOP](https://redis.io/commands/blmpop) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [BLPOP](https://redis.io/commands/blpop) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [BRPOP](https://redis.io/commands/brpop) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [BRPOPLPUSH](https://redis.io/commands/brpoplpush) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | Deprecated as of Redis v6.2.0. |
| [LINDEX](https://redis.io/commands/lindex) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [LINSERT](https://redis.io/commands/linsert) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [LLEN](https://redis.io/commands/llen) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [LMOVE](https://redis.io/commands/lmove) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [LMPOP](https://redis.io/commands/lmpop) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [LPOP](https://redis.io/commands/lpop) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [LPOS](https://redis.io/commands/lpos) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [LPUSH](https://redis.io/commands/lpush) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [LPUSHX](https://redis.io/commands/lpushx) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [LRANGE](https://redis.io/commands/lrange) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [LREM](https://redis.io/commands/lrem) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [LSET](https://redis.io/commands/lset) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [LTRIM](https://redis.io/commands/ltrim) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [RPOP](https://redis.io/commands/rpop) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [RPOPLPUSH](https://redis.io/commands/rpoplpush) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | Deprecated as of Redis v6.2.0. |
| [RPUSH](https://redis.io/commands/rpush) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [RPUSHX](https://redis.io/commands/rpushx) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |


## Set commands

| Command | Redis<br />Enterprise | Redis<br />Cloud | Notes |
|:--------|:----------------------|:-----------------|:------|
| [SADD](https://redis.io/commands/sadd) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [SCARD](https://redis.io/commands/scard) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [SDIFF](https://redis.io/commands/sdiff) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [SDIFFSTORE](https://redis.io/commands/sdiffstore) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [SINTER](https://redis.io/commands/sinter) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [SINTERCARD](https://redis.io/commands/sintercard) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [SINTERSTORE](https://redis.io/commands/sinterstore) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [SISMEMBER](https://redis.io/commands/sismember) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [SMEMBERS](https://redis.io/commands/smembers) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [SMISMEMBER](https://redis.io/commands/sismember) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [SMOVE](https://redis.io/commands/smove) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [SPOP](https://redis.io/commands/spop) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [SRANDMEMBER](https://redis.io/commands/srandmember) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [SREM](https://redis.io/commands/srem) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [SSCAN](https://redis.io/commands/sscan) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [SUNION](https://redis.io/commands/sunion) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [SUNIONSTORE](https://redis.io/commands/sunionstore) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |


## Sorted set commands

| Command | Redis<br />Enterprise | Redis<br />Cloud | Notes |
|:--------|:----------------------|:-----------------|:------|
| [BZMPOP](https://redis.io/commands/bzmpop) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [BZPOPMAX](https://redis.io/commands/bzpopmax) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [BZPOPMIN](https://redis.io/commands/bzpopmin) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ZADD](https://redis.io/commands/zadd) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ZCARD](https://redis.io/commands/zcard) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ZCOUNT](https://redis.io/commands/zcount) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ZDIFF](https://redis.io/commands/zdiff) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ZDIFFSTORE](https://redis.io/commands/zdiffstore) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ZINCRBY](https://redis.io/commands/zincrby) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ZINTER](https://redis.io/commands/zinter) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ZINTERCARD](https://redis.io/commands/zintercard) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ZINTERSTORE](https://redis.io/commands/zinterstore) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ZLEXCOUNT](https://redis.io/commands/zlexcount) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ZMPOP](https://redis.io/commands/zmpop) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ZMSCORE](https://redis.io/commands/zmscore) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ZPOPMAX](https://redis.io/commands/zpopmax) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ZPOPMIN](https://redis.io/commands/zpopmin) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ZRANDMEMBER](https://redis.io/commands/zrandmember) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ZRANGE](https://redis.io/commands/zrange) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ZRANGEBYLEX](https://redis.io/commands/zrangebylex) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | Deprecated as of Redis v6.2.0. |
| [ZRANGEBYSCORE](https://redis.io/commands/zrangebyscore) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | Deprecated as of Redis v6.2.0. |
| [ZRANGESTORE](https://redis.io/commands/zrangestore) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ZRANK](https://redis.io/commands/zrank) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ZREM](https://redis.io/commands/zrem) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ZREMRANGEBYLEX](https://redis.io/commands/zremrangebylex) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ZREMRANGEBYRANK](https://redis.io/commands/zremrangebyrank) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ZREMRANGEBYSCORE](https://redis.io/commands/zremrangebyscore) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ZREVRANGE](https://redis.io/commands/zrevrange) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | Deprecated as of Redis v6.2.0. |
| [ZREVRANGEBYLEX](https://redis.io/commands/zrevrangebylex) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | Deprecated as of Redis v6.2.0. |
| [ZREVRANGEBYSCORE](https://redis.io/commands/zrevrangebyscore) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | Deprecated as of Redis v6.2.0. |
| [ZREVRANK](https://redis.io/commands/zrevrank) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ZSCAN](https://redis.io/commands/zscan) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ZSCORE](https://redis.io/commands/zscore) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ZUNION](https://redis.io/commands/zunion) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ZUNIONSTORE](https://redis.io/commands/zunionstore) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |


## Stream commands

| Command | Redis<br />Enterprise | Redis<br />Cloud | Notes |
|:--------|:----------------------|:-----------------|:------|
| [XACK](https://redis.io/commands/xack) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [XADD](https://redis.io/commands/xadd) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [XAUTOCLAIM](https://redis.io/commands/xautoclaim) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [XCLAIM](https://redis.io/commands/xclaim) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [XDEL](https://redis.io/commands/xdel) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [XGROUP](https://redis.io/commands/xgroup) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [XINFO](https://redis.io/commands/xinfo) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [XLEN](https://redis.io/commands/xlen) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [XPENDING](https://redis.io/commands/xpending) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [XRANGE](https://redis.io/commands/xrange) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [XREAD](https://redis.io/commands/xread) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [XREADGROUP](https://redis.io/commands/xreadgroup) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [XREVRANGE](https://redis.io/commands/xrevrange) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [XSETID](https://redis.io/commands/xsetid) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [XTRIM](https://redis.io/commands/xtrim) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |


## String commands

| Command | Redis<br />Enterprise | Redis<br />Cloud | Notes |
|:--------|:----------------------|:-----------------|:------|
| [APPEND](https://redis.io/commands/append) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [DECR](https://redis.io/commands/decr) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [DECRBY](https://redis.io/commands/decrby) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [GET](https://redis.io/commands/get) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [GETDEL](https://redis.io/commands/getdel) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [GETEX](https://redis.io/commands/getex) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes\* | \*Not supported for HyperLogLog |
| [GETRANGE](https://redis.io/commands/getrange) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [GETSET](https://redis.io/commands/getset) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | Deprecated as of Redis v6.2.0. |
| [INCR](https://redis.io/commands/incr) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [INCRBY](https://redis.io/commands/incrby) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [INCRBYFLOAT](https://redis.io/commands/incrbyfloat) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [MGET](https://redis.io/commands/mget) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [MSET](https://redis.io/commands/mset) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [MSETNX](https://redis.io/commands/msetnx) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [PSETEX](https://redis.io/commands/psetex) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [SET](https://redis.io/commands/set) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [SETEX](https://redis.io/commands/setex) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [SETNX](https://redis.io/commands/setnx) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [SETRANGE](https://redis.io/commands/setrange) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| STRALGO | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | Deprecated as of Redis v7.0.0. |
| [STRLEN](https://redis.io/commands/strlen) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [SUBSTR](https://redis.io/commands/substr) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | Deprecated as of Redis v2.0.0. |
