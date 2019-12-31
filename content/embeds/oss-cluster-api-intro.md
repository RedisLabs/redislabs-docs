The Redis OSS Cluster API provides a simple mechanism for Redis clients to know the cluster topology.
Clients must first connect to the master node to get the cluster topology,
but then they connect directly to the Redis proxy on the node that hosts the master shard.

Redis OSS Cluster API reduces access times and latency with near-linear scalability.

{{% note %}}
You must use a client that supports the OSS cluster API to connect to a database
that has the OSS cluster API enabled.
{{% /note %}}
