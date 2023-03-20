In addition to the shard placement policy, considerations that determine shard placement are:

- Separation of master and replica shards
- Available persistence and [Redis on Flash]({{<relref "/rs/databases/redis-on-flash">}}) storage
- [Rack awareness]({{< relref "/rs/clusters/configure/rack-zone-awareness.md" >}})
- Memory available to host the database when fully populated

## Shard placement policies

The shard placement policies are:

- [`dense`]({{<relref "/rs/references/policies/default-shards-placement#dense-shard-placement">}}) - Place as many shards as possible on the smallest number of nodes to reduce the latency between the proxy and the database shards.

    {{<note>}}
For standard (RAM-only) Redis databases, use `dense` shard placement to optimize memory resources.
    {{</note>}}

- [`sparse`]({{<relref "/rs/references/policies/default-shards-placement#sparse-shard-placement">}}) - Spread the shards across as many nodes in the cluster as possible to spread the traffic across cluster nodes.

    {{<note>}}
For [Redis on Flash]({{<relref "/rs/databases/redis-on-flash">}}) databases, use `sparse` shard placement to optimize disk resources.
    {{</note>}}

## Default shard placement policy

When you create a Redis Enterprise Software cluster, the [default shard placement policy]({{<relref "/rs/references/policies/default-shards-placement">}}) (`dense`) is assigned to all databases that you create on the cluster.

You can:

- Change the cluster's [default shard placement policy]({{<relref "/rs/references/policies/default-shards-placement">}}) to `sparse` so the policy applies to all databases you create in the cluster.
- Override the shard placement policy for existing databases on an individual basis.