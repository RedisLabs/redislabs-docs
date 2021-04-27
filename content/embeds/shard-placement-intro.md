In addition to the shard placement policy, considerations that determine shard placement are:

- Separation of master and slave shards
- Available persistence and Redis on Flash (RoF) storage
- [Rack awareness]({{< relref "/rs/concepts/high-availability/rack-zone-awareness.md" >}})
- Memory available to host the database when fully populated

The shard placement policies are:

- dense - Place as many shards as possible on the smallest number of nodes to reduce the latency between the proxy and the database shards;
    Recommended for Redis on RAM databases to optimize memory resources
- sparse - Spread the shards across as many nodes in the cluster as possible to spread the traffic across cluster nodes;
    Recommended for Redis on Flash databases to optimize disk resources

When you create an RS cluster, the default shard placement policy (**dense**) is assigned to all databases that you create on the cluster.
You can:

- Change the default shard placement policy for the cluster to **sparse** so that the cluster applies that policy to all databases that you create
- Change the shard placement policy for each database after the database is created