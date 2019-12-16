In Redis Enterprise Software (RS), the location of master and slave shards on the cluster nodes can impact the database and node performance.
Master shards are always hosted separately from their slave shards.
By default, all master shards for a database are hosted on the same node and all slave shards are hosted on a different node,
as long as the nodes have enough resources to host them.

This shard placement scheme attempts to maintain fast data retrieval because all of the data in the database is hosted together.
Also, the replicated data in the slave shards are separate from the master shards for data resiliency.

For larger and more complex database topologies, the shard placement policy helps to maintain optimal performance and resiliency.
In addition to the shard placement policy, considerations that determine shard placement are:

- Separation of master and slave shards
- Available persistence and Redis on Flash (RoF) storage
- [Rack awareness]({{< relref "/rs/concepts/high-availability/rack-zone-awareness.md" >}})
- Memory available to host the database when fully populated

In RS, you can change the default shard placement policy for the cluster or the shard placement policy for each database.