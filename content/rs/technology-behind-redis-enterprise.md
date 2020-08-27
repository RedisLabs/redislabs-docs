---
Title: Redis Enterprise Technical Overview
description:
weight: 10
alwaysopen: false
categories: ["RS"]
---

Redis Enterprise is designed to simplify operations while providing seamless scalability, top performance, and high availability.

Here are some of the features and design decisions that make this possible.

## Data access and cluster management

A Redis Enterprise cluster separates data access from cluster
management. This decoupled architecture results in increased reliability,
top performance, and simplified operations.

### Data access

A Redis Enterprise Cluster hosts one or more Redis databases. Access to these databases runs through a multi-threaded proxy that lives on each cluster node. These proxies efficiently and transparently route queries to the appropriate underlying Redis instance.

You can use any standard Redis client to access a Redis Enterprise database via the proxy. The proxies also support cluster-aware clients for applications requiring the lowest possible latency.

In addition, the proxies understand Memcached's text and binary protocols. Applications using Memcached can immediately start using Redis Enterprise and take advantage of its many features, including built-in replication, auto-failover, data persistence, backups, and linear scaling.

### Cluster management

The cluster manager consists of a number of software components that monitor
and configure the many Redis instances that make up a cluster.

The cluster manager handles resharding, rebalancing, auto-failover,
rack-awareness, database provisioning, resource management, data
persistence configuration, backup, and recovery.

## High performance and availability

Redis Enterprise uses several techniques to optimize performance and availability.

- The cluster uses a shared-nothing architecture, which increases reliability and availability and makes it easy to add and remove nodes.
- The proxy implements just-in-time pipelining, connection pooling, and multiplexing.
- Redis instances have improved AOF data persistence and optimized rewrite
    algorithms.
- Instead of the default file-based replication, master and replica shards employ diskless replication.
- File-system-level improvements enable optimal access to storage and
    support burst write operations without blocking
    database writes.
- The cluster prevents out-of-memory events using automatic memory defragmentation.

You can read more about these features in our [architecture guide]({{< relref "/rs/concepts/_index.md" >}}).

## Operational simplicity

Redis Enterprise simplifies and automates many tasks including provisioning new databases, updating database configuration,
resharding existing databases, and rebalancing shards across cluster
nodes.

The symmetric, shared-nothing cluster architecture allows for a variety
of underlying infrastructures. Each cluster node can be physical or virtual, with variations in memory, storage devices, and number of compute cores. This freedom of configuration allows you to roll out clusters that most efficiently use your resources.

For example, a cluster may be based on a few permanent bare-metal servers with
additional virtual servers for scaling out when load increases
or decreases.

### Monitoring and alerting

Monitoring and alerting are built-in and configurable. You can use the included dashboards to monitor your cluster, and you can also [integrate with Nagios, Prometheus, and Grafana]({{< relref "/rs/administering/monitoring-metrics/_index.md" >}}).

### Admin console, APIs, and CLIs

You can administer a Redis Enterprise Software cluster using the web-based admin console,
the cluster REST API, and various CLI-based tools.
