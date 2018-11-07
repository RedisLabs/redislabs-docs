---
Title: Cluster API Architecture
description: 
weight: $weight
alwaysopen: false
---
The Redis Cluster API support in Redis Enterprise Software (RES)
provides a simple mechanism for Cluster enabled Redis clients to learn
and know the cluster topology. This enables clients to connect directly
to an RES proxy on the node hosting the master shard for the data being
operated on. The result is that for all but the initial call to get the
cluster topology or reacquire the location of the master shard, the
client will connect to the RES endpoint proxy where the master shard is
located.

For example, the initial connection from a client might be to cluster
node 1, but the client derives from the information it receives that it
needs to go directly to another node in the cluster to interact directly
with the data for the query. This process can dramatically reduce access
times and latency, but also offers near-linear scalability.

When combined with Redis Enterprise Software's other high availability
features, this solution provides high performance and low latency, all
while providing applications the capabilities to cope with topology
changes such as adding, removing of nodes, node failovers and so on.

For more about working with the Cluster API, see [Using the Cluster API]({{< relref "/rs/administering/designing-production/networking/using-cluster-api.md" >}}). 