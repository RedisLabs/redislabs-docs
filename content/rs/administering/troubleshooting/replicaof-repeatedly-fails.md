---
Title: ReplicaOf Repeatedly Fails
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
There might be instances in which the Replica of process repeatedly
fails and restarts itself on Redis Enterprise Software (RS). This can
result from the Redis "client-output-buffer-limit" setting on the source
database being configured to a relatively small value, which causes the
connection to be dropped.

To identify this issue you can review the Redis log of the source
database and find an entry in the log describing this issue.

To resolve this issue, follow the instructions below to reconfigure the
buffer on the source database to a bigger value:

- If the source database is a Redis that is part of RS, run the
    following command in
    [rladmin]({{< relref "/rs/references/rladmin.md" >}}) to
    increase the slave buffer size of the **source database**:
    tune db \< db:id \| name \> slave_buffer \< value \>

<!-- -->

- If the source database is a Redis that is not part of RS, run the
    [config set](http://redis.io/commands/config-set) command through
    redis-CLI to increase the client output buffer size of the **source
    database**:
    config set client-output-buffer-limit "slave \< hard limit \> \<
    soft limit \> \< soft seconds \>"

For additional information about this issue and configuration, refer to
the following blog post: [Top Redis Headaches for Devops - Replication
Buffer](https://redislabs.com/blog/top-redis-headaches-for-devops-replication-buffer).
