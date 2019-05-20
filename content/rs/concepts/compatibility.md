---
Title: Redis Enterprise Software Compatibility with Open Source Redis
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Redis Enterprise Software (RS) is fully compatible with open source
Redis. Redis Labs contributes extensively to the open source Redis
project and employs it inside of RS. As a rule, Redis Labs adheres to
the open source's specifications and makes every effort to update
RS with the latest version of Redis.

Any standard Redis client can be used with RS. That said, some of
Redis functionality is not applicable in the context of RS, as
follows:

- Shared databases are not supported in RS given their potential
    negative impact on performance. Redis Labs recommends using
    dedicated databases instead. Therefore the following commands are
    blocked and will produce an error when executed:
  - MOVE
  - SELECT
- Because data persistency and backups are managed from RS's
    management UI, the following commands are blocked:
  - BGREWRITEAOF
  - BGSAVE
  - LASTSAVE
  - SAVE
- Because replication is managed automatically by RS and because it
    could present a security risk, the following commands are blocked:
  - MIGRATE
  - REPLCONF
  - SLAVEOF
  - SYNC/PSYNC
- Commands that are not relevant for a hosted Redis instance are
    blocked:
  - CONFIG RESETSTAT
  - DEBUG OBJECT/SEGFAULT
  - OBJECT
  - SHUTDOWN
  - CLIENT PAUSE
  - COMMAND INFO
  - COMMAND COUNT
  - COMMAND GETKEYS
  - SCRIPT-DEBUG
  - LATENCY LATEST
  - LATENCY HISTORY
  - LATENCY RESET
  - LATENCY GRAPH
  - LATENCY DOCTOR
- Lastly, only a subset of Redis configuration settings (via CONFIG
    GET/SET) is applicable to RS. Attempts to get or set a
    configuration parameter that is not included in the following list
    will result in an error:
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

Compatibility with Open Source Redis Cluster
============================================

Redis Enterprise Software (RS) does not currently support Redis Cluster
protocol as RS has its own clustering technology that moves the
clustering, replication, sharding, HA, etc. from the client to the
server side. If you have existing Redis clients and code, they will work
directly against a RS cluster with only a connection string change. You
point a standard Redis client and code at a RS cluster, then scale the
cluster as needed.

For additional details regarding the RS architecture, refer to the
[System
architecture]({{< relref "/rs/concepts/_index.md" >}})
section.
