---
Title: Redis OSS Cluster API Architecture
description:
weight: $weight
alwaysopen: false
aliases: /rs/concepts/data-access/cluster-api/
categories: ["RS"]
---
{{< embed-md "oss-cluster-api-intro.md"  >}}

{{<note>}}
You cannot use [RediSearch]({{<relref "/modules/redisearch">}}) with the OSS Cluster API.
{{</note>}}

You can use Redis OSS Cluster API along with other Redis Enterprise Software high availability
to get high performance with low latency
and let applications stay current with cluster topology changes, including add node, remove node, and node failover.

For more about working with the OSS Cluster API, see [Using the OSS Cluster API]({{< relref "/rs/administering/designing-production/networking/using-oss-cluster-api.md" >}}).
