---
Title: OSS Cluster API Architecture
description:
weight: $weight
alwaysopen: false
aliases: /rs/concepts/data-access/cluster-api/
categories: ["RS"]
---
{{%excerpt%}}The Redis OSS Cluster API support in Redis Enterprise Software (RS)
provides a simple mechanism for cluster-aware Redis clients to learn
and know the cluster topology. This enables clients to connect directly
to an RS proxy on the node hosting the master shard for the data being
operated on.{{% /excerpt%}} The result is that for all but the initial call to get the
cluster topology or the call to reacquire the location of the master shard, the
client will connect to the RS endpoint proxy where the master shard is
located.

For example, the initial connection from a client might be to cluster
node 1, but the client derives from the information it receives that it
needs to go directly to another node in the cluster to interact directly
with the data for the query. This process can dramatically reduce access
times and latency, but also offers near-linear scalability.

When combined with the other RS high availability features,
this solution provides high performance and low latency, all
while giving applications the ability to cope with topology
changes, including add node, remove node, and node failover.

For more about working with the OSS Cluster API, see [Using the OSS Cluster API]({{< relref "/rs/administering/designing-production/networking/using-oss-cluster-api.md" >}}).
