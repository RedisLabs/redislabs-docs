---
Title: Redis Cloud compatibility with open source Redis
linkTitle: Open source compatibility
description: Redis Cloud compatibility with open source Redis.
weight: 90
alwaysopen: false
categories: ["RC"]
aliases: [

]
---

Both [Redis Enterprise Software]({{<relref "/rs">}}) and Redis Cloud are compatible with open source
Redis (OSS Redis). 

{{< embed-md "rc-rs-oss-compatibility.md"  >}}

## RESP compatibility

Redis Enterprise Software and Redis Cloud support RESP2 and RESP3. In Redis Cloud, you can choose between RESP2 and RESP3 when you [create a database]({{<relref "/rc/databases/create-database">}}) and you can change it when you [edit a database]({{<relref "/rc/databases/view-edit-database">}}). For more information about the different RESP versions, see the [Redis serialization protocol specification](https://redis.io/docs/reference/protocol-spec/#resp-versions).

## Compatibility with open source Redis Cluster API

Redis Cloud supports [Redis OSS Cluster API]({{< relref "/rc/databases/create-database#oss-cluster-api" >}}) on Flexible subscriptions if it is enabled for a database. Review [Redis OSS Cluster API architecture]({{< relref "/rs/clusters/optimize/oss-cluster-api" >}}) to determine if you should enable this feature for your database.