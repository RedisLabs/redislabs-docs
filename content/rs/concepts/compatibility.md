---
Title: Redis Enterprise Software compatibility with open source Redis
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Redis Enterprise Software is compatible with open source
Redis (OSS Redis). Redis contributes extensively to the open source Redis
project and uses it inside of Redis Enterprise Software. As a rule, we adhere to
the open source project's specifications and makes every effort to update
Redis Enterprise Software with the latest version of open source Redis.

## Redis commands

Any standard Redis client can be used with Redis Software.
There is some Redis functionality (shown below) that's not applicable for Redis Software:

- Shared databases aren't supported in Redis Software, because of the potential for
    negative impact on performance. We recommend using
    dedicated databases instead. The following commands are
    blocked and produce an error when executed on a dedicated database:
    - MOVE
    - SELECT
- Data persistence and backups are managed from the Redis Software
    admin console. The following commands are blocked:
    - BGREWRITEAOF
    - BGSAVE
    - LASTSAVE
    - SAVE
- Access controls are managed from the Redis Software
    admin console. The following commands are blocked
    - ACL DELUSER
    - ACL SETUSER
    - ACL GENPASS
    - ACL LOG
    - ACL SAVE
    - ACL LOAD
- Replication is managed automatically by Redis Software. The following commands are blocked to prevent a security risk:
    - MIGRATE
    - REPLICAOF
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
- STRALGO LCS is not yet supported
- Only a subset of Redis configuration settings (listed below) are applicable to Redis Software. Using CONFIG GET/SET with other configuration settings will return an error. The commands that apply to Redis Software are listed below:
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

## Compatibility with open source Redis Cluster API

Redis Enterprise Software supports [Redis OSS Cluster API]({{< relref "/rs/concepts/data-access/oss-cluster-api.md" >}}) if it is enabled for a database. For more information, see [Using the OSS Cluster API]({{< relref "/rs/administering/designing-production/networking/using-oss-cluster-api.md" >}})
