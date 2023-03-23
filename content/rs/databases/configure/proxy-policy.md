---
Title: Configure proxy policy
linktitle: Proxy policy
description: Configure proxy policy.
weight: 40
alwaysopen: false
categories: ["RS"]
aliases: [
  /rs/administering/designing-production/networking/multiple-active-proxy.md,
  /rs/administering/designing-production/networking/multiple-active-proxy/,
  /rs/databases/configure/proxy-policy.md,
  /rs/databases/configure/proxy-policy/,

]
---
Redis Enterprise Software uses [proxies]({{<relref "/rs/references/terminology#proxy">}}) to manage and optimize access to database shards. Each node in the cluster runs a single proxy process, which can be active (receives incoming traffic) or passive (waits for failovers), depending on the database's [proxy policy]({{<relref "/rs/references/policies/proxy-policy">}}).

When you create a database, Redis Enterprise creates a [database endpoint]({{<relref "/rs/references/terminology#database-endpoint">}}), which receives traffic for all database operations. By default, Redis Enterprise binds the database endpoint to one of the proxies on a single node in the cluster. This proxy becomes an active proxy, which receives all the operations for the database. If the node with the active proxy fails, a new proxy on another node automatically takes over as part of the failover process.

## Proxy policies

A database can use one of the following proxy policies:

- `single` - only one active proxy for the database

- `all-master-shards` - multiple active database proxies, one on each node that hosts a master shard

- `all-nodes` - multiple active database proxies, one on each node in the cluster

See the [proxy policy reference]({{<relref "/rs/references/policies/proxy-policy">}}) for more information.

## View cluster proxy policy

Run [`rladmin info cluster`]({{<relref "/rs/references/cli-utilities/rladmin/info#info-cluster">}}) to view the current proxy policy for
sharded and non-sharded (single shard) databases.

```sh
$ rladmin info cluster
cluster configuration:
   repl_diskless: enabled
   default_non_sharded_proxy_policy: single
   default_sharded_proxy_policy: single
   default_shards_placement: dense
   default_shards_overbooking: disabled
   default_fork_evict_ram: enabled
   default_redis_version: 3.2
   redis_migrate_node_threshold: 0KB (0 bytes)
   redis_migrate_node_threshold_percent: 8 (%)
   redis_provision_node_threshold: 0KB (0 bytes)
   redis_provision_node_threshold_percent: 12 (%)
   max_simultaneous_backups: 4
   watchdog profile: local-network
```

## Change database proxy policy

You can configure a database's proxy policy using [`rladmin bind`]({{<relref "/rs/references/cli-utilities/rladmin/bind">}}).

{{<warning>}}
Any configuration change that unbinds proxies can disrupt established client connections.
{{</warning>}}

The following command binds a database called "db1" with the endpoint ID "1:1" to the `all-master-shards` proxy policy:

```sh
rladmin bind db db1 endpoint 1:1 policy all-master-shards
```

{{<note>}}
To find the endpoint ID, run [`rladmin status endpoints`]({{<relref "/rs/references/cli-utilities/rladmin/status#status-endpoints">}}).
{{</note>}}

## Reapply policy after topology changes

During regular cluster operations, certain actions (such as automatic migration or automatic failover) change which proxy needs to be bound to which database. When such actions take place, the cluster attempts to automatically change proxy bindings to follow the current proxy policy.

However, in an attempt to prevent any established client connections from disconnecting, the cluster might not strictly enforce the proxy policy. You can use `rladmin` to enforce the policy.

To reapply a proxy policy after topology changes such as node restarts, failovers, or migrations, run the following command to reset the policy:

```sh
rladmin bind db <db_name> endpoint <endpoint ID> policy <all-master-shards | all-nodes>
```

{{<note>}}
Databases that have the `single` proxy policy do not require you to reapply the proxy policy.
{{</note>}}

## Multiple active proxies

In most cases, a single proxy can handle a large number of operations
without consuming additional resources. However, under high load,
network bandwidth or a high rate of packets per second (PPS) on the
single active proxy can limit how fast database
operations can run.

To improve performance, you can set up multiple active
proxies across multiple nodes and map them to the same external database endpoint. Multiple active proxies can improve throughput and allow faster failover when proxies or nodes fail.

However, because shards and proxies are spread across multiple nodes in the cluster, multiple active proxies can increase
the latency of database operations.

{{< note >}}
When the network on a single active proxy limits your throughput,
consider enabling multiple NIC support. For
nodes that have multiple physical NICs (Network Interface Cards), you
can configure Redis Enterprise Software to separate internal and external traffic onto
independent physical NICs. For more details, see [Multi-IP and
IPv6]({{< relref "/rs/networking/multi-ip-ipv6" >}}).
{{< /note >}}
