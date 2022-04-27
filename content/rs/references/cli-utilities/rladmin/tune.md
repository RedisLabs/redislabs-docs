---
Title: rladmin tune
linkTitle: tune
description: Configures parameters for databases, proxies, nodes, and clusters.
weight: $weight
alwaysopen: false
toc: "true"
headerRange: "[1-2]"
categories: ["RS"]
aliases:
---

`rladmin tune` configures parameters for databases, proxies, nodes, and clusters.

## `tune cluster`

`rladmin tune cluster` configures cluster parameters.

``` sh
rladmin tune cluster
        [ repl_diskless { enabled | disabled } ]
        [ redis_provision_node_threshold <size> ]
        [ redis_migrate_node_threshold <size> ]
        [ redis_provision_node_threshold_percent <percent> ]
        [ redis_migrate_node_threshold_percent <percent> ]
        [ max_simultaneous_backups <size> ]
        [ watchdog_profile { cloud | local-network } ]
        [ slave_ha <enabled/disabled> ]
        [ slave_ha_grace_period <seconds> ]
        [ slave_ha_cooldown_period <seconds> ]
        [ slave_ha_bdb_cooldown_period <seconds> ]
        [ max_saved_events_per_type <value> ]
        [ parallel_shards_upgrade <value> ]
        [ default_concurrent_restore_actions <value> ]
        [ show_internals { enabled | disabled } ]
        [ expose_hostnames_for_all_suffixes { enabled | disabled } ]
        [ redis_upgrade_policy { latest | major } ]
        [ default_redis_version <value> ]
        [ data_internode_encryption { enabled | disabled } ]
```

### Parameters

| Parameters                             | Type/Value                        | Description                                                                                                                  |
|----------------------------------------|-----------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| data_internode_encryption              | 'enabled'<br />'disabled'       | Activates or deactivates [internode encryption]({{ < relref "/rs/security/internode-encryption.md" >}}) for new databases    |
| default_concurrent_restore_actions     | integer<br />'all'              | Default number of concurrent actions during node restore from a snapshot (positive integer or "all")                         |
| default_redis_version                  | version number                    | The default Redis database compatibility version used to create new databases.<br/><br/>  The value parameter should be a version number in the form of "x.y" where _x_ represents the major version number and _y_ represents the minor version number.  The final value corresponds to the desired version of Redis.<br/><br/>You cannot set _default_redis_version_ to a value higher than that supported by the current _redis_upgrade_policy_ value. |
| expose_hostnames_for_all_suffixes      | 'enabled'<br />'disabled'       | Exposes hostnames for all DNS suffixes                                                                                       |
| login_lockout_counter_reset_after      | time in seconds                   | Time after failed login attempt before counter resets to 0                                                                   |
| login_lockout_duration                 | time in seconds                   | Time a locked account remains locked ( "0" means account can only be unlocked by an admin)                                   |
| login_lockout_threshold                | integer                           | Number of failed sign-in attempts to trigger locking a user account ("0" to specify never to lock account)                   |
| max_saved_events_per_type              | integer                           | Maximum number of events each type saved in CCS per object type                                                              |
| max_simultaneous_backups               | integer                           | Number of backups allowed to happen at once                                                                                  |
| parallel_shards_upgrade                | integer<br />'all'              | Number of shards upgraded in parallel during DB upgrade (positive integer or "all")                                          |
| redis_migrate_node_threshold           | size in MB                        | Memory (in MBs by default, or can be specified) needed to migrate a database between nodes                                   |
| redis_migrate_node_threshold_percent   | percentage                | Memory (in percentage) needed to migrate a database between nodes                                                            |
| redis_provision_node_threshold         | size in MB                        | Memory (in MBs by default, or can be specified) needed to provision a new database                                           |
| redis_provision_node_threshold_percent | percentage                | Memory (in percentage) needed to provision a new database                                                                    |
| redis_upgrade_policy                   | 'latest'<br />'major'           | When you upgrade or create a new Redis database, this policy determines which version of Redis database compatibility is used.<br /><br />Supported values are:<ul><li><p>`latest`, which applies the most recent Redis compatibility update \(_effective default prior to v6.2.4_)<p></li><li>`major`, which applies the most recent major-release compatibility update (_default as of v6.2.4_).</li></ul>                                                                                                                 |
| repl_diskless                          | 'enabled'<br />'disabled'       | Activates or deactivates diskless replication (can be overwritten per database)                                              |
| show_internals                         | 'enabled'<br />'disabled'       | Controls the visibility of internal databases that are only used for the cluster's management                                |
| slave_ha                               | 'enabled' <br /> 'disabled'   | Activates or deactivates replica high-availability                                                                           |
| slave_ha_bdb_cooldown_period           | time in seconds                   | Time (in seconds) after shard relocation during which databases can't be relocated to another node                           |
| slave_ha_cooldown_period               | time in seconds                   | Time (in seconds) after shard relocation during which the replica high-availability mechanism can't relocate to another node |
| slave_ha_grace_period                  | time in seconds                   | Time (in seconds) between when a node fails and when replica high-availability starts relocating shards to another node      |
| watchdog_profile                       | 'cloud' <br /> 'local-network' | Activates pre-configured watchdog profiles (cloud or local-network)                                                          |

### Returns

`Finished successfully` if cluster configuration was changed, `Error: No changes specified` otherwise.

Use [`rladmin info cluster`]({{<relref "/rs/references/cli-utilities/rladmin/info#info-cluster">}}) to verify the cluster configuration was changed.

### Example

``` sh
$ rladmin tune cluster slave_ha enabled
Finished successfully
$ rladmin info cluster | grep slave_ha
    slave_ha: enabled
```

## `tune db`

`rladmin tune db` configures database parameters.

``` sh
rladmin tune db { db:<id> | <name> }
        [ slave_buffer <valueMG | hard:soft:time> ]
        [ client_buffer <value> ]
        [ repl_backlog <valueMB | auto> ]
        [ crdt_repl_backlog <valueMB | auto> ]
        [ repl_timeout <seconds> ]
        [ repl_diskless { enabled | disabled | default } ]
        [ master_persistence { enabled | disabled } ]
        [ maxclients <value> ]
        [ schedpolicy { cmp | mru | spread | mnp } ]
        [ max_shard_pipeline <value> ]
        [ conns <value> ]
        [ conns_type <value> ]
        [ max_client_pipeline <value> ]
        [ max_connections <value> ]
        [ max_aof_file_size <size> ]
        [ oss_cluster { enabled | disabled } ]
        [ oss_cluster_api_preferred_ip_type <value> ]
        [ slave_ha { enabled | disabled } ]
        [ slave_ha_priority <value> ]
        [ skip_import_analyze { enabled | disabled } ]
        [ mkms { enabled | disabled } ]
        [ continue_on_error ]
        [ gradual_src_mode { enabled | disabled } ]
        [ gradual_sync_mode { enabled | disabled | auto } ]
        [ gradual_sync_max_shards_per_source <value> ]
        [ module_name <value> ] [ module_config_params <value> ]
        [ crdt_xadd_id_uniqueness_mode { liberal | semi-strict | strict } ]
        [ metrics_export_all { enabled | disabled } ]
        [ syncer_mode { distributed | centralized }]
        [ syncer_monitoring { enabled | disabled } ]
        [ mtls_allow_weak_hashing { enabled | disabled } ]
        [ mtls_allow_outdated_cert { enabled | disabled } ]
        [ data_internode_encryption { enabled | disabled } ]
        [ db_conns_auditing { enabled | disabled } ]
```

### Parameters

| Parameter                            | Type/Value                       | Description                                                                                                                           |
|--------------------------------------|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| db:id                                | integer                          | ID of the specified database                                                                                                          |
| name                                 | string                           | Name of the specified database                                                                                                        |
| client_buffer                        | value in MB hard:soft:time       | Redis client output buffer limits                                                                                                     |
| conns                                | integer                          | Size of internal connection pool, specified per-thread or per-shard depending on conns_type                                           |
| conns_type                           | 'per-thread'<br /> 'per-shard'   | Specifies connection pool size as either per-thread or per-shard                                                                      |
| continue_on_error                    |                                  | Flag that skips tuning shards that can't be reached                                                                                   |
| crdt_repl_backlog                    | value in MB<br /> 'auto'         | Size of the Active-Active replication buffer                                                                                          |
| crdt_xadd_id_uniqueness_mode         | 'liberal'<br /> 'semi-strict'<br /> 'strict' | XADD's behavior in an Active-Active database, defined as liberal, semi-strict, or strict (see descriptions below)         |
| data_internode_encryption            | 'enabled'<br /> 'disabled'       | Activates or deactivates [internode encryption]({{< relref "/rs/security/internode-encryption.md" >}}) for the database               |
| db_conns_auditing                    | 'enabled'<br /> 'disabled'       | Activates or deactivates database connections auditing for a database                                                                 |
| gradual_src_mode                     | 'enabled'<br /> 'disabled'       | Activates or deactivates gradual sync of sources                                                                                      |
| gradual_sync_max_shards_per_source   | integer                          | Number of shards per sync source that can be replicated in parallel (positive integer)                                                |
| gradual_sync_mode                    | 'enabled'<br /> 'disabled'<br /> 'auto' | Activates, deactivates, or automatically determines gradual sync of source shards                                              |
| master_persistence                   | 'enabled'<br /> 'disabled'       | Activates or deactivates persistence of the primary shard                                                                             |
| max_aof_file_size                    | size in MB                       | Maximum size (in MB, if not specified) of [AoF]({{< relref "/glossary/_index.md#letter-a" >}}) file (min value is 10 GB)              |
| max_client_pipeline                  | integer                          | Maximum commands in the proxy's pipeline per client connection (max value is 2047, default value is 200)                              |
| max_connections                      | integer                          | Maximum client connections to database's endpoint (default value is 0, which is unlimited)                                            |
| max_shard_pipeline                   | integer                          | Maximum commands in the proxy's pipeline per shard connection (default value is 200)                                                  |
| maxclients                           | integer                          | Controls the maximum client connections between the proxy and shards (default value is 10000)                                         |
| metrics_export_all                   | 'enabled'<br /> 'disabled'       | Activates the exporter to expose all shard metrics                                                                                    |
| mkms                                 | 'enabled'<br /> 'disabled'       | Activates multi-key multi-slot commands                                                                                               |
| module_name and module_config_params | string                           | Configures arguments of a module in runtime. The module_config_params should be inside 'quotation marks'                              |
| mtls_allow_outdated_cert             | 'enabled'<br /> 'disabled'       | Activates outdated certificates in [mTLS connections]({{< relref "/rs/security/tls/_index.md" >}})                                    |
| mtls_allow_weak_hashing              | 'enabled'<br /> 'disabled'       | Activates weak hashing (less than 2048 bits) in [mTLS connections]({{< relref "/rs/security/tls/_index.md" >}})                       |
| oss_cluster                          | 'enabled'<br /> 'disabled'       | Activates OSS cluster API                                                                                                             |
| oss_cluster_api_preferred_ip_type    | 'internal'<br /> 'external'      | IP type (internal or external) for endpoint and database in OSS cluster API (default is internal)                                     |
| repl_backlog                         | size in MB<br /> 'auto'          | Size of the replication buffer (in MB or auto)                                                                                        |
| repl_diskless                        | 'enabled'<br /> 'disabled'<br /> 'default'   | Activates or deactivates diskless replication (takes cluster setting by default)                                          |
| repl_timeout                         | time in seconds                  | Replication timeout (in seconds)                                                                                                      |
| schedpolicy                          | 'cmp'<br /> 'mru'<br /> 'spread'<br /> 'mnp' | Controls how server-side connections are used when forwarding traffic to shards                                           |
| skip_import_analyze                  | 'enabled'<br /> 'disabled'       | Skips the analyzing step when importing a database                                                                                    |
| slave_buffer                         | value in MB<br /> hard:soft:time | Redis replica output buffer limits                                                                                                    |
| slave_ha                             | 'enabled'<br /> 'disabled'       | Activates or deactivates replica high-availability (defaults to cluster setting)                                                      |
| slave_ha_priority                    | integer                          | Priority of database in replica high-availability mechanism                                                                           |
| syncer_mode                          | 'distributed'<br /> 'centralized'| Configures syncer to run in distributed or centralized mode. For distributed syncer, DMC policy must be all-nodes or all-master-nodes |
| syncer_monitoring                    | 'enabled'<br /> 'disabled'       | Activates syncer monitoring                                                                                                           |

| XADD behavior mode | Description |
| - | - |
| liberal | XADD will succeed with any valid ID (not recommended, allows duplicate IDs) |
| semi-strict | Will allow full ID. Partial IDs are completed with the unique database instance ID (not recommended, allows duplicate IDs) |
| strict | XADD will fail if a full ID is given. Partial IDs are completed using the unique database instance ID |

### Returns

`Finished successfully` if database configuration was changed, `Error: No changes specified` otherwise.

Use [`rladmin info db`]({{<relref "/rs/references/cli-utilities/rladmin/info#info-db">}}) to verify the database configuration was changed.

### Example

``` sh
$ rladmin tune db db:4 repl_timeout 300
Tuning database: o
Finished successfully
$ rladmin info db db:4 | grep repl_timeout
  repl_timeout: 300 seconds
```

## `tune node`

`rladmin tune node` configures node parameters.

``` sh
tune node  { <id> | all }
                    [max_listeners <value>]
                    [max_redis_forks <value>]
                    [max_redis_servers <value>]
                    [max_slave_full_syncs <value>]
                    [quorum_only <enabled/disabled>]

```

### Parameters

| Parameter            | Type/Value | Description                                                                                                                      |
|----------------------|------------|----------------------------------------------------------------------------------------------------------------------------------|
| id                   | integer    | ID of the specified node                                                                                                         |
| all                  |            | Configures settings for all nodes                                                                                                |
| max_listeners        | integer    | Maximum number of endpoints that may be bound to the node                                                                        |
| max_redis_forks      | integer    | Maximum number of background processes forked from shards that may exist on the node at any given time                           |
| max_redis_servers    | integer    | Maximum number of shards allowed to reside on the node                                                                           |
| max_slave_full_syncs | integer    | Maximum number of simultaneous replica full-syncs that may be running at any given time (0: Unlimited, -1: Use cluster settings) |
| quorum_only          | 'enabled'<br /> 'disabled' | If activated, configures the node as a [quorum-only node]({{< relref "/glossary/_index.md#letter-p" >}})                         |

### Returns

`Finished successfully` if node configuration was changed, `Error: No changes specified` otherwise.

Use [`rladmin info node`]({{<relref "/rs/references/cli-utilities/rladmin/info#info-node">}}) to verify the node configuration was changed.

### Example

``` sh
$ rladmin tune node 3 max_redis_servers 120
Finished successfully
$ rladmin info node 3 | grep "max redis servers"
    max redis servers: 120
```

## `tune proxy`

`rladmin tune proxy` configures proxy parameters.

``` sh
rladmin tune proxy { <id> | all }
        [ mode { static | dynamic } ]
        [ threads <value> ]
        [ max_threads <value> ]
        [ scale_threshold <value> ]
        [ scale_duration <seconds> ]
```

### Parameters

| Parameter       | Type/Value                 | Description                                                                         |
|-----------------|----------------------------|-------------------------------------------------------------------------------------|
| id              | integer                    | ID of the specified proxy                                                           |
| all             |                            | Configures settings for all proxies                                                 |
| max_threads     | integer                    | Maximum number of threads allowed                                                   |
| mode            | 'static'<br /> 'dynamic' | Determines if proxy automatically adjusts the number of threads based on load size  |
| scale_duration  | time in seconds            | Time of scale_threshold CPU utilization before automatic proxy automatically scales |
| scale_threshold | percentage                 | CPU utilization threshold that triggers spawning new threads                        |
| threads         | integer                    | Initial number of threads created at startup                                        |

### Returns

`OK` if proxy configuration was changed, `Error` otherwise.

Use [`rladmin info proxy`]({{<relref "/rs/references/cli-utilities/rladmin/info#info-proxy">}}) to verify the proxy configuration was changed.

### Example

``` sh
$ rladmin tune proxy 2 scale_threshold 75
Configuring proxies:
  - proxy:2: ok
$ rladmin info proxy 2 | grep scale_threshold
    scale_threshold: 75 (%)
```
