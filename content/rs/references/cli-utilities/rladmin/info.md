---
Title: rladmin info
linkTitle: info
description: Shows the current configuration of a cluster, database, node, or proxy.
weight: $weight
alwaysopen: false
toc: "true"
headerRange: "[1-2]"
categories: ["RS"]
aliases:
---

Shows the current configuration of specified databases, proxies, clusters, or nodes.

## `info cluster`

Lists the current configuration for the cluster.

```sh
rladmin info cluster
```

### Parameters

None

### Returns

Returns the current configuration for the cluster.

| Parameter | Type/Value | Description |
|-----------|------------|-------------|
| acl_pubsub_default | `resetchannels`<br /> `allchannels` | Default pub/sub ACL rule for all databases in the cluster:<br />•`resetchannels` blocks access to all channels (restrictive)<br />•`allchannels` allows access to all channels (permissive) |
| bigstore_driver | speedb | |
| cm_port | 8443 | UI server listening port |
| cm_session_timeout_minutes | 15 | Timeout in minutes for the CM session |
| cnm_http_port | 8080 | HTTP REST API server listening port |
| cnm_https_port | 9443 | HTTPS REST API server listening port |
| data_internode_encryption | `enabled`<br />`disabled` | Activates or deactivates [internode encryption]({{<relref "/rs/security/internode-encryption">}}) for new databases |
| db_conns_auditing | `enabled`<br /> `disabled` | Activates or deactivates database [connection auditing]({{<relref "/rs/security/audit-events">}}) for a database |
| default_concurrent_restore_actions | integer<br />`all` | Default number of concurrent actions when restoring a node from a snapshot (positive integer or "all") |
| default_fork_evict_ram | `enabled` <br /> `disabled` | |
| default_non_sharded_proxy_policy | single | |
| default_provisioned_redis_version | 7.2 | |
| default_sharded_proxy_policy | single | |
| default_shards_placement | dense | |
| endpoint_rebind_propagation_grace_time | 15 | |
| envoy_admin_port | 8002 | Envoy admin port. Changing this port during runtime might result in an empty response because envoy serves as the cluster gateway. |
| envoy_mgmt_server_port | 8004 | Envoy management server port |
| expose_hostnames_for_all_suffixes | `enabled`<br />`disabled` | Exposes hostnames for all DNS suffixes |
| failure_detection_sensitivity | `high`<br />`low` | Predefined thresholds and timeouts for failure detection (previously known as `watchdog_profile`)<br />• `high` (previously `local-network`) – high failure detection sensitivity, lower thresholds, faster failure detection and failover<br />• `low` (previously `cloud`) – low failure detection sensitivity, higher tolerance for latency variance (also called network jitter) |
| gossip_envoy_admin_port | 8006 | Gossip envoy admin port |
| http support | `enabled`<br />`disabled` | Enable or turn off using HTTP for REST API connections |
| login_lockout_counter_reset_after | time in seconds | Time after failed login attempt before the counter resets to 0 |
| login_lockout_duration | time in seconds | Time a locked account remains locked ( "0" means only an admin can unlock the account) |
| login_lockout_threshold | integer | Number of failed sign-in attempts to trigger locking a user account ("0" means never lock the account) |
| max_simultaneous_backups | integer | Number of database backups allowed to run at the same time. Combines with `max_redis_forks` (set by [`tune node`](#tune-node)) to determine the number of shard backups allowed to run simultaneously. |
| parallel_shards_upgrade | integer<br />`all` | Number of shards upgraded in parallel during DB upgrade (positive integer or "all") |
| persistent_node_removal | `enabled` <br /> `disabled` | |
| private key encryption | `enabled` <br /> `disabled` | |
| redis_migrate_node_threshold | size | Memory needed to migrate a database between nodes |
| redis_migrate_node_threshold_percent | percentage | Memory (in percentage) needed to migrate a database between nodes |
| redis_provision_node_threshold | size | Memory (in MBs by default or can be specified) needed to provision a new database |
| redis_provision_node_threshold_percent | percentage | Memory (in percentage) needed to provision a new database |
| redis_upgrade_policy | `latest`<br />`major` | When you upgrade or create a new Redis database, this policy determines which version of Redis database compatibility is used.<br /><br />Supported values are:<ul><li><p>`latest`, which applies the most recent Redis compatibility update \(_effective default prior to v6.2.4_)<p></li><li>`major`, which applies the most recent major release compatibility update (_default as of v6.2.4_).</li></ul> |
| repl_diskless | `yes`<br />`no` | Activates or deactivates diskless replication (can be overridden per database) |
| reserved_ports | list of integers | list of ports | List of reserved ports to avoid using for database endpoints |
| resp3_default | `enabled` <br /> `disabled` | Determines the default value of the `resp3` option upon upgrading a database to version 7.2 (defaults to `enabled`) |
| shards_overbooking | `enabled` <br /> `disabled` | |
| show_internals | `enabled` <br /> `disabled` | Controls the visibility of internal databases that are only used for the cluster's management |
| slave_ha | `enabled` <br /> `disabled` | Activates or deactivates [replica high availability]({{<relref "/rs/databases/configure/replica-ha">}}) in the cluster<br />(enabled by default; use [`rladmin tune db`](#tune-db) to change `slave_ha` for a specific database) |
| slave_ha_bdb_cooldown_period | time in seconds | Time (in seconds) a database must wait after its shards are relocated by [replica high availability]({{<relref "/rs/databases/configure/replica-ha">}}) before it can go through another shard migration if another node fails (default is 2 hours) |
| slave_ha_cooldown_period | time in seconds | Time (in seconds) [replica high availability]({{<relref "/rs/databases/configure/replica-ha">}}) must wait after relocating shards due to node failure before performing another shard migration for any database in the cluster (default is 1 hour) |
| slave_ha_grace_period | time in seconds | Time (in seconds) between when a node fails and when [replica high availability]({{<relref "/rs/databases/configure/replica-ha">}}) starts relocating shards to another node |
| slow_log_max_len | 1024 | |
| system_reserved_ports | list of integers | |
| upgrade mode | `enabled` <br /> `disabled` | Enable or turn off upgrade mode on the cluster |
| watchdog profile | `cloud` <br /> `local-network` | Watchdog profiles with preconfigured thresholds and timeouts (deprecated as of Redis Enterprise Software v6.4.2-69; use `failure_detection_sensitivity` instead)<br />• `cloud` is suitable for common cloud environments and has a higher tolerance for latency variance (also called network jitter).<br />• `local-network` is suitable for dedicated LANs and has better failure detection and failover times. |

### Example

``` sh
$ rladmin info cluster
Cluster configuration:
    repl_diskless: yes
    shards_overbooking: disabled
    default_non_sharded_proxy_policy: single
    default_sharded_proxy_policy: single
    default_shards_placement: dense
    default_fork_evict_ram: enabled
    default_provisioned_redis_version: 7.2
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
    slow_log_max_len: 1024
    acl_pubsub_default: allchannels
    persistent_node_removal: disabled
    failure_detection_sensitivity: high
    resp3_default: enabled
    watchdog profile: local-network
    http support: enabled
    upgrade mode: disabled
    private key encryption: disabled
    cm_session_timeout_minutes: 15
    bigstore_driver: speedb
    cm_port: 8443
    cnm_http_port: 8080
    cnm_https_port: 9443
    envoy_admin_port: 8002
    envoy_mgmt_server_port: 8004
    gossip_envoy_admin_port: 8006
    reserved_ports: []
    system_reserved_ports: [3333, 3334, 3335, 3336, 3339, 3340, 3341, 3342, 3343, 3344, 8000, 8001, 8002, 8004, 8006, 8070, 8071, 8080, 8443, 8444, 9080, 9081, 9090, 9125, 9443, 10050, 36379]
```

## `info db`

Shows the current configuration for databases.

```sh
rladmin info db [ {db:<id> | <name>} ]
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| db:id     | ID of the specified database (optional) |
| name      | Name of the specified database (optional) |

### Returns

Returns the current configuration for all databases.

If `db:<id>` or `<name>` is specified, returns the current configuration for the specified database.

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
    resp3: enabled
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
    syncer_mode: centralized
```

## `info node`

Lists the current configuration for all nodes.

```sh
rladmin info node [ <id> ]
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| id     | ID of the specified node |

### Returns

Returns the current configuration for all nodes.

If `<id>` is specified, returns the current configuration for the specified node.

### Example

``` sh
$ rladmin info node 3
Command Output: node:3
    address: 198.51.100.17
    external addresses: N/A
    recovery path: N/A
    quorum only: disabled
    max redis servers: 100
    max listeners: 100
```

## `info proxy`

Lists the current configuration for a proxy.

``` sh
rladmin info proxy { <id> | all }
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| id      | ID of the specified proxy |
| all       | Show the current configuration for all proxies (optional) |

### Returns

If no parameter is specified or the `all` option is specified, returns the current configuration for all proxies.

If `<id>`is specified, returns the current configuration for the specified proxy.

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
