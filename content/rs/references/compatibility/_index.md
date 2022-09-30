---
Title: Redis Enterprise Software compatibility with open source Redis
linkTitle: Open source compatibility
description: Redis Enterprise Software compatibility with open source Redis.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/concepts/compatibility.md,
    /rs/concepts/compatibility/,
    /rs/references/compatibility.md,
    /rs/references/compatibility/,
]
---
Redis Enterprise Software is compatible with open source
Redis (OSS Redis). Redis contributes extensively to the open source Redis
project and uses it inside of Redis Enterprise Software. As a rule, we adhere to
the open source project's specifications and update
Redis Enterprise Software with the latest version of open source Redis.

## Redis commands

See [Compatibility with open source Redis commands]({{<relref "/rs/references/compatibility/commands">}}) to learn which open source Redis commands are compatible with Redis Enterprise Software.

## Configuration settings

[Compatibility with open source Redis configuration settings]({{<relref "/rs/references/compatibility/config-settings">}}) lists the open source Redis configuration settings supported by Redis Enterprise Software.

## Redis clients

You can use any standard Redis client with Redis Enterprise Software.

## Compatibility with open source Redis Cluster API

Redis Enterprise Software supports [Redis OSS Cluster API]({{< relref "/rs/clusters/optimize/oss-cluster-api" >}}) if it is enabled for a database. For more information, see [Using the OSS Cluster API]({{< relref "/rs/databases/configure/oss-cluster-api" >}}).
