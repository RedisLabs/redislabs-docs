---
Title: Redis Enterprise compatibility with open source Redis
linkTitle: Open source compatibility
description: Redis Enterprise compatibility with open source Redis.
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
Both Redis Enterprise Software and [Redis Cloud]({{<relref "/rc">}}) are compatible with open source
Redis (OSS Redis). 

{{< embed-md "rc-rs-oss-compatibility.md"  >}}

## Compatibility with open source Redis Cluster API

Redis Enterprise supports [Redis OSS Cluster API]({{< relref "/rs/clusters/optimize/oss-cluster-api" >}}) if it is enabled for a database. For more information, see [Enable OSS Cluster API]({{< relref "/rs/databases/configure/oss-cluster-api" >}}).
