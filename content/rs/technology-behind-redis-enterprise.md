---
Title: The Technology Behind Redis Enterprise Software (RS)
description:
weight: 10
alwaysopen: false
categories: ["RS"]
---
RS's unique and patented technology was developed to meet these main
objectives:

- Decouple data path from cluster management
- Ensure consistent top performance
- Simplify and automate operations

## Decouple data path from cluster management

RS's architecture completely decouples the data path from the cluster
management in order to optimize the operations of each of these
components.

### Data path

The data path is based on multiple zero-latency, multi-threaded proxies
that reside on each of the cluster nodes to mask the underlying complexity
of the system. This model supports multiple proxies per Redis
database and permits the use of any regular or cluster-aware Redis
client. This allows the user's code base to work as-is. Each proxy
forwards client requests to the relevant Redis servers (shards). When
new shards are added to a database, the proxy handles the new routing
rules for the application's requests transparently, by immediately
scaling the database performance and memory capacity without any changes
to the application itself.

The proxies also support Memcached's text and binary protocols and
perform in-flight translation between Memcached and Redis protocol
semantics. This allows Memcached users to enjoy many of the features
that are not available with open source Memcached, such as built-in
replication, auto-failover, data persistence backups and scaling
(out/in) without losing data.

### Cluster management

The cluster manager is a sophisticated governing function that provides
capabilities such as resharding, rebalancing, auto-failover,
rack-awareness, database provisioning, resource management, data
persistence configuration, backup and recovery. The cluster manager
employs multiple watchdog mechanisms at the cluster node level and at
the process level, which guarantees an instant response to events such
as node, rack and data center failures, and can handle multiple failover
events at the same time. Because the cluster manager is entirely
decoupled from the data path components, changes to its software
components do not affect the data path components.

## Consistent top performance

Multiple techniques are implemented by RS to provide consistent top
performance for Redis:

- A shared-nothing architecture maximizes the performance of each
    database. Automatic migration of shards between nodes is performed
    when needed.
- The zero-latency proxy utilizes several mechanisms for improving
    performance, including just-in-time pipelining, socket connections,
    connection pooling, and multiplexing.
- Improvements to AOF data persistence and optimized rewrite
    algorithms.
- Diskless replication is employed between master and slave shards,
    instead of using the default file-based data streaming.
- File-system-level improvements enable optimal access to storage and
    support burst write operations without degrading (or blocking)
    database performance.

## Simplified and automated operations

RS boosts the productivity of developers and DevOps by simplifying and
automating certain complex and time-consuming ops-related tasks, including
provisioning new databases, updating database configuration,
resharding existing databases and rebalancing shards across cluster
nodes.

The homogeneous, symmetric cluster architecture of RS enables the underlying
infrastructure to be fully heterogeneous, where each node in the cluster
can be physical or virtual, with variations in RAM capacity, storage
devices, and the number of compute cores. This freedom of configuration
allows the operator to roll out clusters that make the most efficient
use of the resources, with minimal system limitations. For example, a
cluster may be based on a few permanent bare-metal servers with
additional virtual servers for scaling out (or in) when load increases
or decreases. Built-in configurable monitoring functions help the
administrator keep an eye on the resource utilization levels in the cluster.

RS also makes sure that there is uninterrupted operation of Redis databases by protecting
against out-of-memory events and tuning memory fragmentation
automatically.

All of the above is complemented by an easy-to-use web-based user
interface, CLI tools, and APIs. Special experience or knowledge is not
required to create, manage and monitor Redis clusters, nodes, and
databases in RS.

You can read more about the architecture of RS in [Concepts and
Architecture]({{< relref "/rs/concepts/_index.md" >}}).
