---
Title: Cluster metrics
linkTitle: cluster metrics
description: Documents the cluster metrics used with Redis Enterprise Software REST API calls.
weight: $weight
alwaysopen: false
categories: ["RS"]
---

| Metric name | Type | Description |
|-------------|------|-------------|
| free_memory | float | Sum of free memory in all cluster nodes (bytes) |
| available_memory | float | Sum of available_memory in all nodes (bytes) |
| provisional_memory | float | Sum of provisional_memory in all nodes (bytes) |
| available_flash | float | Sum of available_flash in all nodes (bytes) |
| provisional_flash | float | Sum of provisional_flash in all nodes (bytes) | 
| cpu_user | float | CPU time portion spent by users-pace processes on the cluster. The value is weighted between all nodes based on number of cores in each node (0-1, multiply by 100 to get percent). |
| cpu_system | float | CPU time portion spent in kernel on the cluster, the value is weighted between all nodes based on number of cores in each node (0-1, multiply by 100 to get percent) |
| cpu_idle | float | CPU idle time portion, the value is weighted between all nodes based on number of cores in each node (0-1, multiply by 100 to get percent) |
| ephemeral_storage_avail | float | Sum of disk space available to RLEC processes on configured ephemeral disk on all cluster nodes (bytes) |
| persistent_storage_avail | float | Sum of disk space available to RLEC processes on configured persistent disk on all cluster nodes (bytes) |
| ephemeral_storage_free | float | Sum of free disk space on configured ephemeral disk on all cluster nodes (bytes) | 
| persistent_storage_free | float | Sum of free disk space on configured persistent disk on all cluster nodes (bytes) | 
| total_req | float | Request rate handled by all endpoints on the cluster (ops/sec) |
| avg_latency | float | Average latency of requests handled by all cluster endpoints (micro-sec); returned only when there is traffic |
| conns | float | Total number of clients connected to all cluster endpoints |
| ingress_bytes | float | Sum of rate of incoming network traffic on all cluster nodes (bytes/sec) |
| egress_bytes | float | Sum of rate of outgoing network traffic on all cluster nodes (bytes/sec) |
| bigstore_kv_ops | float | Rate of value read/write operations against back-end flash for all shards which are part of a flash based DB (BigRedis) in cluster (ops/sec); only returned when BigRedis is enabled |
| bigstore_iops | float | Rate of i/o operations against backend flash for all shards which are part of a flash-based DB (BigRedis) in the cluster (ops/sec); returned only when BigRedis is enabled |
| bigstore_throughput | float | Throughput I/O operations against backend flash for all shards which are part of a flash-based DB (BigRedis) in the cluster (bytes/sec); only returned when BigRedis is enabled |
| bigstore_free | float | Sum of free space of backend flash (used by flash DB's BigRedis) on all cluster nodes (bytes); only returned when BigRedis is enabled |
