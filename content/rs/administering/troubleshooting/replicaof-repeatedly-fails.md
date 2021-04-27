---
Title: Replica Of Repeatedly Fails
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
**Problem**: The Replica Of process repeatedly fails and restarts

**Diagnostic**: A log entry in the Redis log of the source database shows repeated failures and restarts.

**Cause**: The Redis "client-output-buffer-limit" setting on the source database
is configured to a relatively small value, which causes the connection drop.

**Resolution**: Reconfigure the buffer on the source database to a bigger value:

- If the source is a Redis database on an RS cluster,
    increase the slave buffer size of the **source database** with:

    `rladmin tune db < db:id | name > slave_buffer < value >`

- If the source is a Redis database not on an RS cluster,
    use the [config set](http://redis.io/commands/config-set) command through
    redis-CLI to increase the client output buffer size of the **source database** with:

    `config set client-output-buffer-limit "slave <hard_limit> <soft_limit> <soft_seconds>"`

**Additional information**: [Top Redis Headaches for Devops - Replication Buffer](https://redislabs.com/blog/top-redis-headaches-for-devops-replication-buffer)
