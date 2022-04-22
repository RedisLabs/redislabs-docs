---
Title: rladmin info
linkTitle: info
description: Lists configurable settings for specified databases, proxies, clusters, or nodes.
weight: $weight
alwaysopen: false
toc: "true"
headerRange: "[1-2]"
categories: ["RS"]
aliases:
---

`rladmin info` lists configurable settings for specified databases, proxies, clusters, or nodes.

## `info db`

`rladmin info db` lists configurable settings for all databases.

`rladmin info db <db:id | name>` lists configurable settings for the specified database.

### Parameters

| Parameter | Description |
|-----------|-------------|
| db:id     | database id of the specified database |
| name      | database name of the specified database |

### Example

``` sh
$ rladmin info db db:1
db:1 [database1]:
    client_buffer_limits: 1GB (hard limit)/512MB (soft limit) in 30 seconds
    slave_buffer: auto
    pubsub_buffer_limits: 32MB (hard limit)/8MB (soft limit) in 60 seconds
    proxy_client_buffer_limits: 0KB (hard limit)/0KB (soft limit) in 0 seconds
    proxy_slave_buffer_limits: 1GB (hard limit)/512MB (soft limit) in 60 seconds
    proxy_pubsub_buffer_limits: 32MB (hard limit)/8MB (soft limit) in 60 seconds
    repl_backlog: 1.02MB (1073741 bytes)
    repl_timeout: 360 seconds
    repl_diskless: default
    master_persistence: disabled
    maxclients: 10000
    conns: 5
    conns_type: per-thread
    sched_policy: cmp
    max_aof_file_size: 300GB
    max_aof_load_time: 3600 seconds
    dedicated_replicaof_threads: 5
    max_client_pipeline: 200
    max_shard_pipeline: 2000
    max_connections: 0
    oss_cluster: disabled
    oss_cluster_api_preferred_ip_type: internal
    gradual_src_mode: disabled
    gradual_src_max_sources: 1
    gradual_sync_mode: auto
    gradual_sync_max_shards_per_source: 1
    slave_ha: disabled (database)
    mkms: enabled
    oss_sharding: disabled
    mtls_allow_weak_hashing: disabled
    mtls_allow_outdated_certs: disabled
    data_internode_encryption: disabled
    proxy_policy: single
    db_conns_auditing: disabled
```

## `info proxy`

`rladmin info proxy` lists configurable settings for the proxy.

### Example

``` sh
$ rladmin info proxy
proxy:1
    mode: dynamic
    scale_threshold: 80 (%)
    scale_duration: 30 (seconds)
    max_threads: 8
    threads: 3
```

## `info cluster`

`rladmin info cluster` lists configurable settings for the cluster.

### Example

``` sh
$ rladmin info cluster
Cluster configuration:
    repl_diskless: enabled
    shards_overbooking: disabled
    default_non_sharded_proxy_policy: single
    default_sharded_proxy_policy: single
    default_shards_placement: dense
    default_fork_evict_ram: enabled
    default_provisioned_redis_version: 6.0
    redis_migrate_node_threshold: 0KB (0 bytes)
    redis_migrate_node_threshold_percent: 4 (%)
    redis_provision_node_threshold: 0KB (0 bytes)
    redis_provision_node_threshold_percent: 12 (%)
    max_simultaneous_backups: 4
    slave_ha: enabled
    slave_ha_grace_period: 600
    slave_ha_cooldown_period: 3600
    slave_ha_bdb_cooldown_period: 7200
    parallel_shards_upgrade: 0
    show_internals: disabled
    expose_hostnames_for_all_suffixes: disabled
    login_lockout_threshold: 5
    login_lockout_duration: 1800
    login_lockout_counter_reset_after: 900
    default_concurrent_restore_actions: 10
    endpoint_rebind_propagation_grace_time: 15
    data_internode_encryption: disabled
    redis_upgrade_policy: major
    db_conns_auditing: disabled
    watchdog profile: local-network
    http support: enabled
    upgrade mode: disabled
    cm_session_timeout_minutes: 15
    cm_port: 8443
    cnm_http_port: 8080
    cnm_https_port: 9443
```

## `info node`

`rladmin info node` lists configurable settings for all nodes.

`rladmin info node <id>` lists configurable settings for a single node.

### Parameters

| Parameter | Description |
|-----------|-------------|
| id     | node id of the specified node |

### Example

``` sh
$ rladmin info node 3
Command Output: node:3
    address: 172.31.42.179
    external addresses: N/A
    recovery path: N/A
    quorum only: disabled
    max redis servers: 100
    max listeners: 100
```
