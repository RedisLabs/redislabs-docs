---
Title: rladmin
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/cli-reference/rladmin/
---
`rladmin` is a command-line utility for performing administrative tasks such as failover, migrate, and bind on a Redis Enterprise Software cluster. Some of these tasks can also be performed through the Management UI and some are unique to the `rladmin` CLI tool.

## rladmin Commands

| Command | Description |
| - | - |
| [rladmin](#use-the-rladmin-shell) | Enter the `rladmin` shell |
| [bind](#bind) | Bind an endpoint |
| [cluster](#cluster) | Cluster management commands |
| [exit](#use-the-rladmin-shell)| Exit `rladmin` shell |
| [failover](#failover) | Fail over master to replica |
| [help](#help) | Show available commands or specific command usage |
| [info](#info) | Show current parameters for a cluster, database, node, or proxy |
| [migrate](#migrate) | Migrate elements between nodes |
| [node](#node) | Node management commands |
| [placement](#placement) | Configure shards placement policy |
| [recover](#recover) | Recover databases |
| [restart](#restart) | Restart database shards |
| [status](#status) | Show status information |
| [suffix](#suffix) | Suffix management |
| [tune](#tune) | Tune system parameters |
| [upgrade](#upgrade) | Upgrade the Redis or module version for a database |
| [verify](#verify) | Cluster verification reports |

### `bind`

`rladmin bind` manages the proxy policy for the cluster or a specific database. It also can include or exclude endpoints from the proxy policy.

```text
rladmin bind 
        [ db <db:id | name> ] 
        endpoint <id> 
        policy <single | all-master-shards | all-nodes>
```

| Proxy policy | Description |
| - | - |
| single | All traffic flows through a single proxy bound to the database endpoint (preferable in most cases)               |
| all-master-shards | Multiple proxies, one on each master node (best for high traffic and multiple master shards)                     |
| all-nodes | Multiple proxies, one on each node of the cluster (increases traffic in the cluster, only used in special cases) |
| Legacy | Copies existing binding configuration from earlier versions

```text
rladmin bind 
        [ db <db:id | name> ] 
        endpoint <id> [ include | exclude ] 
        proxy <id1 .. idN>
```

### `cluster`

`rladmin cluster` manages cluster configuration and administration. Some `rladmin cluster` commands are only for clusters that are already configured, while others are only for new clusters that have not been configured.

| Command (for configured clusters) | Description |
| - | - |
| `cluster certificate` | Sets the cluster certificate |
| [`cluster config`](#cluster-config) | Updates configuration for the cluster |
| [`cluster reset_password`](#cluster-reset_password) | Changes the password for a given email |
| [`cluster stats_archiver`](#cluster-stats_archiver) | Enables/disables stats archiving |
| [`cluster debug_info`](#cluster-debug_info) | Creates a support package |
| `cluster running_actions` | Lists all active tasks |

| Command (for non-configured clusters) | Description |
| - | - |
| [`cluster create`](#cluster-create) | Creates a new cluster |
| [`cluster join`](#cluster-join) | Adds a node to an existing cluster |
| [`cluster recover_filename`](#cluster-recover_filename) | Recovers a cluster from a backup file |

#### `cluster certificate`

 `rladmin cluster certificate` sets the cluster certificate to a given file.

 ```text
 rladmin cluster certificate 
        set <certificate_name> 
        certificate_file <certificate_file> 
        [ key_file <certificate_file> ]
```

#### `cluster config`

`rladmin cluster config` updates the cluster configuration.

```text
 rladmin cluster config 
        [ cipher_suites '<openssl_cipher_list>' ]
        [ ipv6 <enabled/disabled> ]
        [ handle_redirects <enabled/disabled>]
        [ http_support <enabled/disabled>]
        [ cm_port <number> ]
        [ cnm_http_port <number> ]
        [ cnm_https_prot <number>]
        [ saslauthd_ldap_conf </tmp/ldap.conf> ]
        [ debuginfo_path <path/to/directory> ]
        [ min_control_TLS_version <control_tls_version>]
        [ min_data_TLS_version <data_tls_version> ]
        [ sentinel_ssl_policy <allowed/required/disabled> ]
        [ min_sentinel_TLS_version <sentinel_tls_version> ]
        [ data_cipher_list <data-cipher-suites-str> ]
        [ s3_url <url> ]
        [ cm_session_timeout <minutes> ]
```

| Optional Parameter | Description |
| - | - |
| cipher_suites | Cipher suite used for TLS connections to the RS admin console |
| data_cipher_list | Cipher suites used by the data plane |
| sentinel_cipher_suites | Cipher suites used by the sentinel service |
| ipv6 | Enable or disable IPv6 connections to the RS admin console |
| handle_redirects | Enable or disable handling DNS redirects when DNS is not configured and running behind a load balancer |
| http_support | Enable or disable using HTTP for REST API connections (info cluster) |
| cm_port | Ui server listening port |
| cmn_http_port | HTTP REST API server listening port |
| cnm_https_port | HTTPS REST API server listening port |
| saslauthd_ldap_conf | Updates LDAP authentication configuration for the cluster (see [Integrating LDAP Authentication]({{< relref "/rs/administering/designing-production/security/ldap-integration.md" >}}) or [Kubernetes LDAP configuration]({{< relref "/content/platforms/kubernetes/tasks/ldap-on-k8s.md" >}})) |
| debuginfo_path | Path to local directory to place file when generating support packages |
| min_control_TLS_version | The minimum version of TLS protocol which is supported at the control path |
| min_data_TLS_version | The minimum version of TLS protocol which is supported at the data path |
| sentinel_ssl_policy | Define SSL policy for the Discovery Service: required/disabled/allowed |
| s3_url | The URL of S3 export and import |
| cm_session_timeout | Timeout (in minutes) for the CM session |

#### `cluster reset_password`

`rladmin cluster reset_password` changes the password associated with e-mail address provided.

```text
rladmin cluster reset_password <user email>
```

<!--- #### `cluster stats_archiver` --->

#### `cluster debug_info`

`rladmin cluster debug_info` writes a support package to the specified path in the cluster configuration file.

```text
rladmin cluster debug_info [ path <path> ]
```

#### `cluster create`

`rladmin cluster create` creates a new cluster. The node from which the command is executed becomes the first node of the new cluster.

```text
cluster create 
        name <cluster-name>
        username <admin-user> 
        password <admin-password> 
        [ node_uid <node-uid> ] 
        [ rack_aware ] 
        [ rack_id <node-rack-id> ] 
        [ license_file <file> ] 
        [ ephemeral_path <path> ] 
        [ persistent_path <path> ]
        [ ccs_persistent_path <path> ] 
        [ register_dns_suffix ] 
        [ flash_enabled ] 
        [ flash_path <path> ] 
        [ addr <ip-address> ] 
        [ external_addr <ip-addresses> ]
```

| Optional Parameters | Description |
| - | - |
| node_uid | Unique node ID |
| rack_aware | Enables/disables rack awareness |
| rack_id | Rack ID of the rack |
| license_file | Path to RLEC license file |
| ephemeral_path | Path to ephemeral storage location (defaults to /var/opt/redislabs) |
| persistent_path | Path to persistent storage location (defaults to /var/opt/redislabs/persist) |
| ccs_persistent_path | Path to location of ccs snapshots (defaults to /var/opt/redislabs/persist) |
| register_nds_suffix | Enables database mapping to both internal and external IP |
| flash_enabled | Enables flash storage |
| flash_path | Path to flash storage location (defaults to /var/opt/redislabs/flash)|
| addr | Internal IP addresses of the node |
| external_addr | External IP addresses of the node |

#### `cluster join`

`rladmidn cluster join` adds a node to an existing cluster.

```text
rladmin cluster join 
        name <cluster-name> | nodes <node-address> 
        username <admin-user> 
        password <admin-password>
        [ ephemeral_path <path> ]
        [ persistent_path <path> ]
        [ ccs_persistent_path <path> ]
        [ rack_id <node-rack-id> ]
        [ override_rack_id ]
        [ replace_node <node-uid> ]
        [ flash_enabled ]
        [ flash_path <path> ]
        [ addr <ip-address> ]
        [ external_addr <ip-addresses> ]
        [ override_repair ]
        [ accept_servers <enable | disable> ]
        [ cmn_http_port <port> ]
```

| Optional Parameters | Description |
| - | - |
| ephemeral_path | Path to ephemeral storage location (defaults to /var/opt/redislabs)|
| persistent_path | Path to persistent storage location (defaults to /var/opt/redislabs/persist) |
| ccs_persistent_path | Path to ccs snapshot location (defaults to /var/opt/redislabs/persist) |
| rack_id | Rack ID of the rack |
| override_rack_id | Manually overrides the existing default rack ID |
| replace_node | Replaces specified node with new node |
| flash_enabled | Enables flash storage |
| flash_path | Path to flash storage location (defaults to /var/opt/redislabs/flash) |
| addr | Internal IP addresses of the node |
| external_addr | External IP addresses of the node |
| override_repair | Enables joining a cluster with a dead node |
| accept_servers | Allows allocation of resources on the new node |
| cmn_http_port | Joins a cluster that has a non-default cnm_http_port |

#### `cluster recover`

`rladmin cluster recover` recovers a cluster from a backup file. Configuration backup file's default location is `/var/opt/redislabs/persist/ccs/ccs-redis.rdb`.

```text
rladmin cluster recover 
        filename <recovery-file-name> 
        [ ephemeral_path <path> ] 
        [ persistent_path <path> ]
        [ ccs_persistent_path <path> ]
        [ ccs_persistent_path <path> ]
        [ rack_id <ID> ] 
        [ override_rack_id ] 
        [ node_uid <number> ] 
        [ flash_enabled ] 
        [ flash_path <path> ] 
        [ addr <ip-address> ] 
        [ external_addr <ip-addresses> ]
```

| Optional Parameters | Description |
| - | - |
| ephemeral_path | Path to ephemeral storage location (defaults to /var/opt/redislabs) |
| persistent_path | Path to persistent storage location (defaults to /var/opt/redislabs/persist) |
| ccs_persistent_path | Path to location of ccs snapshots (default is same as persistent_path) |
| rack_id | Rack ID of the rack |
| override_rack_id | Manually overrides the existing default rack ID |
| flash_enabled | Enables flash storage |
| flash_path | Path to flash storage location (defaults to /var/opt/redislabs/flash) |
| addr | Internal IP addresses of the node |
| external_addr | External IP addresses of the node |

#### `cluster services`

`rladmin cluster services` enables or disables selected cluster services.

```text
rladmin cluster services [ cm_server | crdb_coordinator | crdb_worker | mdns_server | pdns_server | saslauthd | stats_archiver <enabled | disabled> ]
```

### `failover`

`rladmin failover` performs a failover for master shards of a specific database, and promotes their respective replicas to new masters. The `immediate` flag performs the failover without verifying the replica shards are in full sync with the master shards.

```text
rladmin failover 
        [ db <db:id | name> ] 
        shard <id1 .. idN> 
        [ immediate ]
```

### `help`

`rladmin help` list all the options and parameters associated with the `rladmin` command.

### `info`

`rladmin info` lists configurable settings for specified databases, proxies, clusters, or nodes.

```text
rladmin info db <db:id | name>
```

```text
rladmin info proxy <id | all>
```

```text
rladmin info cluster
```

```text
rladmin info node <id>
```

### `migrate`

`rladmin migrate` migrates shards or endpoints to a new node within the same cluster.

| Optional Parameter | Description |
| - | - |
| db | Limits migration to specific database |
| node | Limits migration to specific origin node |
| target_node | Migration target node |
| restrict_target_node | Finds target node automatically |
| override_policy | Overrides rack aware policy and allows master and slave shards on the same node |
| to_first_slot | Finds the node where the shard with the first hash slot (overrides endpoint_to_shard) |
| commit | Perform the actions |
| max_concurrent_migrations | Sets maximum number of concurrent endpoint migrations |
| preserve_roles | Performs an additional failover to guarantee roles of masters are preserved |

#### Migrate shards

```text
rladmin migrate [ [db <db:id | name>] | [node <origin node:id>] ]
        shard <id1 .. idN> 
        [ preserve_roles ]
        target_node <id> 
        [ override_policy ]
```

#### Migrate endpoints

```text
rladmin migrate 
        [ [db <db:id | name>] | [node <origin node:id>] ]
        endpoint <id> 
        target_node <id> 
        [ override_policy ]
```

#### Migrate all slave shards

```text
rladmin migrate
        [ [db <db:id | name>] | [node <origin node:id>] ]
        all_slave_shards 
        target_node <id> 
        [ override_policy ]
```

#### Migrate all master shards

```text
rladmin migrate
        [ [db <db:id | name>] | [node <origin node:id>] ]
        all_master_shards 
        target_node <id> 
        [ override_policy ]
```

#### Migrate all shards

```text
rladmin migrate
        <origin node:id>
        all_shards
        target_node <id> 
        [ override_policy ]
```

#### Migrate endpoints to shard location

```text
rladmin migrate
        [ [db <db:id | name>] | [node <origin node:id>] ]
        endpoint_to_shards
        [ restrict_target_node <id> ] 
        [ override_policy ]
        [ commit ]
```

This command will migrate endpoints for databases to the node where the majority of the shards reside, use `endpoint_to_shard` parameter.

#### Migrate shards to endpoint location

```text
rladmin migrate
        [ [db <db:id | name>] | [node <origin node:id>] ]
        shards_to_endpoint
        [ restrict_target_node <id> ] [ override_policy ]
        [ to_first_slot ]
        [ commit ]
        [ max_concurrent_migrations <value> ]
```

This command will migrate shards to the node where the endpoint resides, use the `shards_to_endpoint` parameter.

### `node`

`rladmin node` manages the IP addresses (internal and external) assigned to a node. `rladmin node snapshot` manages snapshots of the current node state, including active endpoints and active shards.

```text
rladmin node <id> addr set <addr>
```

```text
rladmin node <id> external_addr set <addr1> <addr2>
```

```text
rladmin node <id> external_addr [ add | remove ] <addr>
```

```text
rladmin node <id> enslave [ shards_only | endpoints_only ]
```

```text
rladmin node <id> snapshot [ create | list | restore | delete ]
```

```text
rladmin node <id>  remove
```

### `placement`

`rladmin placement` manages the shard placement policy.

By default the placement policy applies to an all databases within a cluster. Specify the `db` parameter to define the policy for an individual database.

```text
rladmin placement [ db <db:id | name> ] [ dense | sparse ]
```

| Placement policy | Description |
| - | - |
| dense | Shards will be placed on the same node as long as it has resources |
| sparse | Shards will be placed on the maximum number of available nodes within the cluster |

### `recover`

`rladmin recover` manages databases in recovery mode and recovers data or configuration data.

```text
rladmin recover [ db <db:id | name> ] [ only_configuration ]
```

```text
rladmin recover all [ only_configuration ]
```

```text
rladmin recover list
```

| Parameter | Description |
| - | - |
| only_configuration | Only recovers configuration data |
| all | Recovers data from all databases in recovery mode within the cluster|
| list | Lists all databases available for recovery within the cluster |

### `restart`

`rladmin restart` restarts all the processes being used by a specific database.

```text
rladmin restart 
        db <db:id | name> 
        [ preserve_roles ] 
        [ discard_data ] 
        [ force_discard ]
```

| Parameter | Description |
| - | - |
| preserve_roles | Performs an additional failover to maintain shard roles |
| discard_data | Allows discarding data if there is no persistence or replication |
| force_discard | Forcibly discards data even if there is persistence or replication |

### `status`

`rladmin status` displays the current cluster status and topology information.

```text
rladmin status
        [ extra <parameter> ]
        [ issues_only]
```

| `extra` parameter | Description |
| - | - |
| extra state_machines | Shows execution of state machine information  |
| extra nodestats | Shows shards per node |
| extra backups | Shows periodic backup status |
| extra frag | Shows fragmented memory available after the restart |
| extra watchdog | Shows watchdog status  |
| extra rack_id | Shows `rack_id` if customer is not `rack_aware` |
| extra redis_version | Shows Redis version of all databases in the cluster |
| extra all | Shows all above `extra` information |

```text
rladmin status nodes 
        [ extra <parameters> ] 
        [ sort <column_titles> ] 
        [ issues_only ]
```

```text
rladmin status databases 
        [ extra <parameters> ] 
        [ sort <column_titles> ] 
        [ issues_only ]
```

```text
rladmin status endpoints 
        [ node <id> ] 
        [ extra <parameters> ] 
        [ sort <column_titles> ] 
        [ issues_only ]
```

```text
rladmin status shards
        [ node <id> ] 
        [ db <db:id | name> ]
        [ extra <parameters> ] 
        [ sort <column_titles> ] 
        [ issues_only ]
```

| Command | Description |
| - | - |
| rladmin status nodes | Filters to only nodes |
| rladmin status databases | Filters to only databases |
| rladmin status endpoints | Filters to only endpoints |
| rladmin status shards | Filters to only shards |

### `suffix`

`rladmin suffix` manages all DNS suffixes in the cluster.

#### `suffix list`

`rladmin suffix list` show all DNS suffixes defined in the cluster.

```text
rladmin suffix list
```

#### `suffix add`

`rladmin suffix add` adds a new DNS suffix to the cluster.

```text
rladmin suffix add 
        name <name>
        [ default ]
        [ internal ]
        [ mdns ]
        [ use_aaaa_ns ]
        [ slaves <ip>.. ]
```

| Optional parameter | Description |
| - | - |
| default | Sets given suffix as default |
| internal | Forces suffix to use private IPs |
| mdns | Enables Multicast DNS support |
| use_aaaa_ns | Enables IPV6 address support |
| slaves | Notifies slave shards of changes in frontend DNS |

#### `suffix delete`

`rladmin suffix delete` deletes an existing suffix from the cluster.

```text
rladmin suffix delete name <name>
```

### `tune`

`rladmin tune` configures parameters for databases, proxies, and clusters.

#### `tune db`

`rladmin tune db` configures database parameters.

```text
rladmin tune db <db:id | name>
        [ slave_buffer <valueMG | hard:soft:time> ] 
        [ client_buffer <value> ] 
        [ repl_backlog <valueMB | auto> ] 
        [ crdt_repl_backlog <valueMB | auto> ]
        [ repl_timeout <seconds> ] 
        [ repl_diskless <enabled | disabled | default> ] 
        [ master_persistence <enabled | disabled> ] 
        [ maxclients <value> ] 
        [ schedpolicy <cmp | mru | spread | mnp> ] 
        [ max_shard_pipeline <value> ] 
        [ conns <value> ] [ conns_type <value> ] 
        [ max_client_pipeline <value> ] 
        [ max_connections <value> ] 
        [ max_aof_file_size <size> ] 
        [ oss_cluster <enabled | disabled> ] 
        [ oss_cluster_api_preferred_ip_type <value> ] 
        [ slave_ha <enabled | disabled> ] 
        [ slave_ha_priority <value> ] 
        [ skip_import_analyze <enabled | disabled> ]
        [ mkms <enabled | disabled> ]
        [ continue_on_error ]
        [ gradual_src_mode <enabled | disabled> ]
        [ gradual_sync_mode <enabled | disabled | auto> ]
        [ gradual_sync_max_shards_per_source <value> ]
        [ module_name <value> ] [ module_config_params <value> ]
        [ crdt_xadd_id_uniqueness_mode <liberal | semi-strict | strict> ]
        [ metrics_export_all <enabled | disabled> ]
        [ syncer_mode <distributed | centralized>]
        [ syncer_monitoring <enabled | disabled> ]
        [ mtls_allow_weak_hashing <enabled | disabled> ]
        [ mtls_allow_outdated_cert <enabled | disabled> ]
```

| Optional Parameters | Description |
| - | - |
| slave_buffer | Redis slave output buffer limits (in MB or hard:soft:time) |
| client_buffer | Redis client output buffer limits (in MB or hard:soft:time) |
| repl_backlog | Size of the replication buffer (in MB or auto)|
| crdt_repl_backlog | Size of the Active-Active replication buffer  (in MB or auto) |
| repl_timeout | Replication timeout (in seconds) |
| repl_diskless | Enables/disables diskless replication |
| master_persistence | Enables/disables persistence of the master shard |
| maxclients | Controls the maximum client connections between the proxy and shards |
| schedpolicy | Controls how server side connections are used when forwarding traffic to shards (values are `cmp`, `mru`, `spread`, or `mnp`) |
| max_shard_pipeline | Maximum commands in the proxy's pipeline per shard connection (default value is 200) |
| conns | Size of internal connection pool |
| conns_type | Specifies connection pool size as either per-thread or per-shard |
| max_client_pipeline | Maximum commands in the proxy's pipeline per client connection (max value is 2047, default value is 200)  |
| max_connections | Maximum client connections to database's endpoint (default value is 0 or unlimited) |
| max_aof_file_size | Maximum size (in MB) of [AoF]({{< relref "/glossary/_index.md#append-only_file_aof" >}}) file (min value is 10 GB)|
| oss_cluster | Enables OSS cluster API |
| oss_cluster_api_preferred_ip_type | IP type (internal or external) for endpoint and database in OSS cluster API (default is internal) |
| slave_ha | Enables/disables slave high availability (defaults to cluster setting) |
| slave_ha_priority | Priority of database in slave high availability mechanism |
| skip_import_analyze | Skips the analyzing step when importing a database |
| mkms | Enables multi-key multi-slot commands |
| continue_on_error | Flag that skips tuning shards that can't be reached |
| gradual_src_mode | Enables gradual sync of sources |
| gradual_sync_mode | Enables gradual sync of source shards |
| gradual_sync_max_shards_per_source | Number of shards per sync source that can be replicated (positive integer) |
| module_name and module_config_params | Configures arguments of module in runtime |
|crdt_xadd_id_uniqueness_mode | XADD's behavior in an Active-Active database, defined as liberal, semi-strict, or strict (see descriptions below) |
| metrics_export_all | Enabled the exporter to expose all shard metrics |
| syncer_mode | Configures syncer to run in distributed or centralized mode. For distributed syncer, DMC policy must be all-nodes or all-master-nodes |
| syncer_monitoring | Enables syncer monitoring |
| mtls_allow_weak_hashing | Enables weak hashing (less than 2048 bits) in mTLS connections |
| mtls_allow_outdated_cert | Enables outdated certificates in mTLS connections |

| XADD behavior mode | Description |
| - | - |
| liberal | XADD will succeed with any valid ID (not recommended, allows duplicate IDs) |
|semi-strict | Will allow full ID. Partial IDs are completed with the unique database instance ID (not recommended, allows duplicate IDs) |
| strict | XADD will fail if a full ID is given. Partial IDs are completed using the unique database instance ID |

#### `tune proxy`

`rladmin tune proxy` configures proxy parameters.

```text
rladmin tune proxy <id | all> 
        [ mode <static | dynamic> ] 
        [ threads <value> ] 
        [ max_threads <value> ]
        [ scale_threshold <value> ] 
        [ scale_duration <seconds> ]
```

| Optional Parameters | Description |
| - | - |
| mode | Determines if proxy automatically adjusts number of threads based of size of the load |
| threads | Initial number of threads created at startup |
| max_threads | Maximum number of threads allowed |
| scale_threshold | CPU utilization threshold that triggers spawning new threads |
| scale_duration | Time (in seconds) before automatic proxy automatically scales |

#### `tune cluster`

`rladmin tune cluster` configures cluster parameters.

```text
rladmin tune cluster
        [ repl_diskless <enabled | disabled> ] 
        [ default_redis_version <version> ] 
        [ redis_provision_node_threshold <size> ] 
        [ redis_migrate_node_threshold <size> ] 
        [ redis_provision_node_threshold_percent <percent> ] 
        [ redis_migrate_node_threshold_percent <percent> ] 
        [ max_simultaneous_backups <size> ] 
        [ watchdog_profile <cloud | local-network> ] 
        [ slave_ha <enabled/disabled> ] 
        [ slave_ha_grace_period <seconds> ] 
        [ slave_ha_cooldown_period <seconds> ] 
        [ slave_ha_bdb_cooldown_period <seconds> ] 
        [ max_saved_events_per_type <value> ]
        [ parallel_shards_upgrade <value> ]
        [ default_concurrent_restore_actions <value> ]
        [ show_internals <enabled | disabled> ]
        [ expose_hostnames_for_all_suffixes <enabled | disabled> ]
```

| Optional Parameters | Description |
| - | - |
| repl_diskless | Enables/disables diskless replication (can be overwritten per database) |
| default_redis_version | Default Redis version for new databases |
| redis_provision_node_threshold | Memory (in MBs) needed to provision a new database |
| redis_migrate_node_threshold | Memory (in MBs) needed to migrate a database between nodes |
| redis_provision_node_threshold_percent | Memory (in percentage) needed to provision a new database |
| redis_migrate_node_threshold_percent | Memory (in percentage) needed to migrate a database between nodes |
| max_simultaneous_backups | Number of backups allowed to happen at once |
| watchdog_profile | Enables pre-configured watchdog profiles ( cloud or local-network) |
| slave_ha | Enables/disables slave high availability |
| slave_ha_grace_period | Time (in seconds) between when a node fails and when slave high availability starts relocating shards to another node |
| slave_ha_cooldown_period | Time (in seconds) after shard relocation during which the slave high availibity mechanism can't relocate to another node  |
| slave_ha_bdb_cooldown_period | Time (in seconds) after shard relocation during which databases can't be relocated to another node |
| max_saved_events_per_type | Maximum number of events each type saved in CCS per object type |
| parallel_shards_upgrade | Number of shards upgraded in parallel during DB upgrade (positive integer or "all") |
| login_lockout_threshold | Number of failed sign-in attempts to trigger locking a user account (positive integer or "0" to specify never to lock account) |
| login_lockout_duration | Time a locked account remains locked ( "0" means account can only be unlocked by an admin) |
| login_lockout_counter_reset_after | Time after failed login attempt before counter resets to 0 |
| default_concurrent_restore_actions | Default number of concurrent actions during node restore from a snapshot (positive integer or "all") |
| show_internals |  |
| expose_hostnames_for_all_suffixes |  |

Redis cluster watchdog supports two pre-configured profiles:
-  `cloud` profile is suitable for common cloud environments. It has a higher tolerance for network jitter.
- `local-network`profile is suitable for dedicated LANs and has a better failure detection and failover times.

### `upgrade`

`rladmin upgrade` schedules a restart of the master and slave processes to upgrade the Redis software for a specific database instance.

```text
rladmin upgrade db <db:id | name> 
        [ preserve_roles ] 
        [ keep_current_version ] 
        [ discard_data ] 
        [ force_discard ]
        [ parallel_shards_upgrade ]
        [ keep_crdt_protocol_version ]
        [ force ]
        [ and module module name <module name> version <version> module_args <args_str> ]
```

| Optional Parameters | Description |
| - | - |
| preserve_roles | Performs an additional failover to guarantee roles of masters are preserved |
| keep_current_version | Upgrades to a new patch release, not to the latest major.minor version |
| discard_data | Indicates that data will not be saved after the upgrade |
| force_discard | Forces `discard_data` if there is replication or persistence enabled |
| parallel_shards_upgrade |  |
| keep_crdt_protocol_version | Keeps the current crdt protocol version |
| force | Forces upgrade and skips warnings and confirmations |
| and module | Clause that allows upgrade of BDB and specified Redis module in a single step with only one restart (can be specified multiple times) |

### `verify`

`rladmin verify balance` prints a cluster shard balance report.

```text
rladmin verify balance [ node <id> ]
```

`rladmin verify rack_aware` prints a cluster rack aware verification report.

```text
rladmin verify rack_aware
```

## Use the rladmin shell

To open the rladmin shell:

1. Login to the Redis Enterprise Software host with an account that is a member of the **redislabs** OS group.

    The rladmin binary is located in `/opt/redislabs/bin`. If you don't have this directory in your PATH, you may want to add it. Otherwise, you can use `bash -l <username>` to log in as a user with permissions to that directory.

1. Run: `rladmin`

    {{< note >}}
If the CLI does not recognize the rladmin command,
you run this command to load the needed configuration first: `bash -l`
    {{< /note >}}

In the rladmin shell you can:

- Run a any `rladmin` command without prefacing it with `rladmin`.
- Enter `?` to view the full list of available commands.
- Enter `help` followed by the name of a command for a detailed explanation of the command and its usage.
- Press the Tab key for command completion.
- Enter `exit` or press Ctl+D to return to your terminal prompt.
