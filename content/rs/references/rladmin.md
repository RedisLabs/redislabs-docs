---
Title: rladmin
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/cli-reference/rladmin/
---
`rladmin` is a command-line utility for performing administrative tasks such as failover, migration, and endpoint binding on a Redis Enterprise Software cluster. `rladmin` can also edit cluster and database configurations. Some of these tasks can also be performed through the admin console and some are unique to the `rladmin` CLI tool.

## rladmin Commands

| Command | Description |
| - | - |
| [rladmin](#use-the-rladmin-shell) | Enter the `rladmin` shell |
| [bind](#bind) | Bind an endpoint |
| [cluster](#cluster) | Cluster management commands |
| [exit](#use-the-rladmin-shell)| Exit `rladmin` shell |
| [failover](#failover) | Fail over a master shard to replica shard (previously slave shard) |
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
| all-master-shards | Multiple proxies, one on each master node (best for high traffic and multiple master shards)                     |
| all-nodes | Multiple proxies, one on each node of the cluster (increases traffic in the cluster, only used in special cases) |
| single | All traffic flows through a single proxy bound to the database endpoint (preferable in most cases)               |

```text
rladmin bind 
        [ db <db:id | name> ] 
        endpoint <id> [ include | exclude ] 
        proxy <id1 .. idN>
```

### `cluster`

`rladmin cluster` manages cluster configuration and administration. Most `rladmin cluster` commands are only for clusters that are already configured, while a few others are only for new clusters that have not been configured.

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
        [ cipher_suites <BoringSSL_cipher_list> ]
        [ cm_port <number> ]
        [ cm_session_timeout <minutes> ]
        [ cnm_http_port <number> ]
        [ cnm_https_port <number>]
        [ data_cipher_list <data-cipher-suites-str> ]
        [ debuginfo_path <path/to/directory> ]
        [ handle_redirects <enabled/disabled>]
        [ http_support <enabled/disabled>]
        [ ipv6 <enabled/disabled> ]
        [ min_control_TLS_version <control_tls_version>]
        [ min_data_TLS_version <data_tls_version> ]
        [ min_sentinel_TLS_version <sentinel_tls_version> ]
        [ s3_url <url> ]
        [ saslauthd_ldap_conf </tmp/ldap.conf> ]
        [ sentinel_ssl_policy <allowed/required/disabled> ]
        [ data_cipher_list <openSSL_cipher_list> ]
        [ sentinel_cipher_suites <golang_cipher_list>]
        [ services <cm_server | crdb_coordinator | crdb_worker | mdns_server | pdns_server | saslauthd | stats_archiver> <enabled | disabled> ]
        [ upgrade_mode < enabled | disabled> ]
```

| Optional Parameter | Description |
| - | - |
| cipher_suites | Cipher suites used for TLS connections to the admin console; specified in the format understood by the BoringSSL library |
| cm_port | Ui server listening port |
| cm_session_timeout | Timeout (in minutes) for the CM session |
| cmn_http_port | HTTP REST API server listening port |
| cnm_https_port | HTTPS REST API server listening port |
| data_cipher_list | Cipher suites used by the the data plane; specified in the format understood by the OpenSSL library |
| debuginfo_path | Path to local directory to place file when generating support packages |
| handle_redirects | Enable or disable handling DNS redirects when DNS is not configured and running behind a load balancer |
| http_support | Enable or disable using HTTP for REST API connections (info cluster) |
| ipv6 | Enable or disable IPv6 connections to the RS admin console |
| min_control_TLS_version | The minimum version of TLS protocol which is supported at the control path |
| min_data_TLS_version | The minimum version of TLS protocol which is supported at the data path |
| min_sentinel_TLS_version |  |
| s3_url | The URL of S3 export and import |
| saslauthd_ldap_conf | Updates LDAP authentication configuration for the cluster (see [Cluster-based LDAP Authentication]({{< relref "/rs/security/ldap/cluster-based-ldap-authentication.md" >}}) or [Kubernetes LDAP configuration]({{< relref "/kubernetes/security/ldap-on-k8s.md" >}})) |
| sentinel_cipher_suites | Cipher suites used by the sentinel service (supported ciphers are implemented by the [golang.org cipher suites package](https://golang.org/src/crypto/tls/cipher_suites.go)) |
| sentinel_ssl_policy | Define SSL policy for the Discovery Service: required/disabled/allowed |
| upgrade_mode |  |

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
        username <admin-email> 
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
| addr | Internal IP addresses of the node |
| ccs_persistent_path | Path to location of ccs snapshots (defaults to /var/opt/redislabs/persist) |
| ephemeral_path | Path to ephemeral storage location (defaults to /var/opt/redislabs) |
| external_addr | External IP addresses of the node |
| flash_enabled | Enables flash storage |
| flash_path | Path to flash storage location (defaults to /var/opt/redislabs/flash)|
| license_file | Path to RLEC license file |
| node_uid | Unique node ID |
| persistent_path | Path to persistent storage location (defaults to /var/opt/redislabs/persist) |
| rack_aware | Enables/disables rack awareness |
| rack_id | Rack ID of the rack |
| register_dns_suffix | Enables database mapping to both internal and external IP |

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
| accept_servers | Allows allocation of resources on the new node |
| addr | Internal IP addresses of the node |
| ccs_persistent_path | Path to ccs snapshot location (defaults to /var/opt/redislabs/persist) |
| cmn_http_port | Joins a cluster that has a non-default cnm_http_port |
| ephemeral_path | Path to ephemeral storage location (defaults to /var/opt/redislabs)|
| external_addr | External IP addresses of the node |
| flash_enabled | Enables flash storage |
| flash_path | Path to flash storage location (defaults to /var/opt/redislabs/flash) |
| override_rack_id | Manually overrides the existing default rack ID |
| override_repair | Enables joining a cluster with a dead node |
| persistent_path | Path to persistent storage location (defaults to /var/opt/redislabs/persist) |
| rack_id | Rack ID of the rack |
| replace_node | Replaces specified node with new node |

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
| addr | Internal IP addresses of the node |
| ccs_persistent_path | Path to location of ccs snapshots (default is same as persistent_path) |
| ephemeral_path | Path to ephemeral storage location (defaults to /var/opt/redislabs) |
| external_addr | External IP addresses of the node |
| flash_enabled | Enables flash storage |
| flash_path | Path to flash storage location (defaults to /var/opt/redislabs/flash) |
| override_rack_id | Manually overrides the existing default rack ID |
| persistent_path | Path to persistent storage location (defaults to /var/opt/redislabs/persist) |
| rack_id | Rack ID of the rack |

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
| commit | Perform the actions |
| db | Limits migration to specific database |
| max_concurrent_migrations | Sets maximum number of concurrent endpoint migrations |
| node | Limits migration to specific origin node |
| override_policy | Overrides rack aware policy and allows master and slave shards on the same node |
| preserve_roles | Performs an additional failover to guarantee roles of masters are preserved |
| restrict_target_node | Finds target node automatically |
| target_node | Migration target node |
| to_first_slot | Finds the node where the shard with the first hash slot (overrides endpoint_to_shard) |

#### Migrate shards

```text
rladmin migrate [ [db <db:id | name>] | [node <origin node:id>] ]
        shard <id1 .. idN> 
        [ preserve_roles ]
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

This command migrates database endpoints to the node where the majority of the shards reside.

### `node`

`rladmin node` manages the IP addresses (internal and external) assigned to a node. `rladmin node snapshot` manages snapshots of the current node state, including active endpoints and active shards.

```text
rladmin node <id> addr set <addr>
```

```text
rladmin node <id> enslave [ shards_only | endpoints_only ]
```

```text
rladmin node <id> external_addr set <addr1> <addr2>
```

```text
rladmin node <id> external_addr [ add | remove ] <addr>
```

```text
rladmin node <id> remove
```

```text
rladmin node <id> snapshot [ create | list | restore | delete ]
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
| all | Recovers data from all databases in recovery mode within the cluster|
| list | Lists all databases available for recovery within the cluster |
| only_configuration | Only recovers configuration data |

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
| discard_data | Allows discarding data if there is no persistence or replication |
| force_discard | Forcibly discards data even if there is persistence or replication |
| preserve_roles | Performs an additional failover to maintain shard roles |

### `status`

`rladmin status` displays the current cluster status and topology information.

```text
rladmin status
        [ extra <parameter> ]
        [ issues_only]
```

| `extra` parameter | Description |
| - | - |
| extra all | Shows all above `extra` information |
| extra backups | Shows periodic backup status |
| extra frag | Shows fragmented memory available after the restart |
| extra nodestats | Shows shards per node |
| extra rack_id | Shows `rack_id` if customer is not `rack_aware` |
| extra redis_version | Shows Redis version of all databases in the cluster |
| extra state_machines | Shows execution of state machine information  |
| extra watchdog | Shows watchdog status  |

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
| rladmin status databases | Filters to only databases |
| rladmin status endpoints | Filters to only endpoints |
| rladmin status nodes | Filters to only nodes |
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
| slaves | Notifies slave shards of changes in frontend DNS |
| use_aaaa_ns | Enables IPV6 address support |

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
        [ data_internode_encryption <enable | disable> ]
```

| Optional Parameters | Description |
| - | - |
| client_buffer | Redis client output buffer limits (in MB or hard:soft:time) |
| conns | Size of internal connection pool |
| conns_type | Specifies connection pool size as either per-thread or per-shard |
| continue_on_error | Flag that skips tuning shards that can't be reached |
| crdt_repl_backlog | Size of the Active-Active replication buffer  (in MB or auto) |
| crdt_xadd_id_uniqueness_mode | XADD's behavior in an Active-Active database, defined as liberal, semi-strict, or strict (see descriptions below) |
| data_internode_encryption | Enables or disables [internode encryption]({{< relref "/rs/security/internode-encryption.md" >}}) for the database |
| gradual_src_mode | Enables gradual sync of sources |
| gradual_sync_max_shards_per_source | Number of shards per sync source that can be replicated (positive integer) |
| gradual_sync_mode | Enables gradual sync of source shards |
| master_persistence | Enables/disables persistence of the master shard |
| max_aof_file_size | Maximum size (in MB) of [AoF]({{< relref "/glossary/_index.md#append-only_file_aof" >}}) file (min value is 10 GB)|
| max_client_pipeline | Maximum commands in the proxy's pipeline per client connection (max value is 2047, default value is 200)  |
| max_connections | Maximum client connections to database's endpoint (default value is 0 or unlimited) |
| max_shard_pipeline | Maximum commands in the proxy's pipeline per shard connection (default value is 200) |
| maxclients | Controls the maximum client connections between the proxy and shards |
| metrics_export_all | Enabled the exporter to expose all shard metrics |
| mkms | Enables multi-key multi-slot commands |
| module_name and module_config_params | Configures arguments of module in runtime |
| mtls_allow_no_xkusage | Allows extended key checks to be skipped |
| mtls_allow_outdated_cert | Enables outdated certificates in mTLS connections |
| mtls_allow_weak_hashing | Enables weak hashing (less than 2048 bits) in mTLS connections |
| oss_cluster | Enables OSS cluster API |
| oss_cluster_api_preferred_ip_type | IP type (internal or external) for endpoint and database in OSS cluster API (default is internal) |
| repl_backlog | Size of the replication buffer (in MB or auto)|
| repl_diskless | Enables/disables diskless replication |
| repl_timeout | Replication timeout (in seconds) |
| schedpolicy | Controls how server side connections are used when forwarding traffic to shards (values are `cmp`, `mru`, `spread`, or `mnp`) |
| skip_import_analyze | Skips the analyzing step when importing a database |
| slave_buffer | Redis slave output buffer limits (in MB or hard:soft:time) |
| slave_ha | Enables/disables slave high availability (defaults to cluster setting) |
| slave_ha_priority | Priority of database in slave high availability mechanism |
| syncer_mode | Configures syncer to run in distributed or centralized mode. For distributed syncer, DMC policy must be all-nodes or all-master-nodes |
| syncer_monitoring | Enables syncer monitoring |

| XADD behavior mode | Description |
| - | - |
| liberal | XADD will succeed with any valid ID (not recommended, allows duplicate IDs) |
| semi-strict | Will allow full ID. Partial IDs are completed with the unique database instance ID (not recommended, allows duplicate IDs) |
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
| max_threads | Maximum number of threads allowed |
| mode | Determines if proxy automatically adjusts number of threads based of size of the load |
| scale_duration | Time (in seconds) before automatic proxy automatically scales |
| scale_threshold | CPU utilization threshold that triggers spawning new threads |
| threads | Initial number of threads created at startup |

#### `tune cluster`

`rladmin tune cluster` configures cluster parameters.

```text
rladmin tune cluster
        [ repl_diskless <enabled | disabled> ] 
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
        [ redis_upgrade_policy <latest | major> ]
        [ default_redis_version <value> ]
        [ data_internode_encryption <enable | disable> ]

```

| Optional Parameters | Description |
| - | - |
| data_internode_encryption | Enables or disables [internode encryption]({{< relref "/rs/security/internode-encryption.md" >}}) for new databases |
| default_concurrent_restore_actions | Default number of concurrent actions during node restore from a snapshot (positive integer or "all") |
| default_redis_version | The default Redis database compatibility version used to create new databases.<br/><br/>  The value parameter should be a version number in the form of "x.y" where _x_ represents the major version number and _y_ represents the minor version number.  The final value corresponds to the desired version of Redis.<br/><br/>You cannot set _default_redis_version_ to a value higher than that supported by the current _redis_upgrade_policy_ value.  |
| expose_hostnames_for_all_suffixes |  |
| login_lockout_counter_reset_after | Time after failed login attempt before counter resets to 0 |
| login_lockout_duration | Time a locked account remains locked ( "0" means account can only be unlocked by an admin) |
| login_lockout_threshold | Number of failed sign-in attempts to trigger locking a user account (positive integer or "0" to specify never to lock account) |
| max_saved_events_per_type | Maximum number of events each type saved in CCS per object type |
| max_simultaneous_backups | Number of backups allowed to happen at once |
| parallel_shards_upgrade | Number of shards upgraded in parallel during DB upgrade (positive integer or "all") |
| redis_migrate_node_threshold | Memory (in MBs) needed to migrate a database between nodes |
| redis_migrate_node_threshold_percent | Memory (in percentage) needed to migrate a database between nodes |
| redis_provision_node_threshold | Memory (in MBs) needed to provision a new database |
| redis_provision_node_threshold_percent | Memory (in percentage) needed to provision a new database |
| redis_upgrade_policy | When you upgrade or create a new Redis database, this policy determines which version of Redis database compatibility is used.<br /><br />Supported values are:<ul><li><p>`latest`, which applies the most recent Redis compatibility update \(_effective default prior to v6.2.4_)<p></li><li>`major`, which applies the most recent major-release compatibility update (_default as of v6.2.4_).</li></ul>  |
| repl_diskless | Enables/disables diskless replication (can be overwritten per database) |
| show_internals |  |
| slave_ha | Enables/disables slave high availability |
| slave_ha_bdb_cooldown_period | Time (in seconds) after shard relocation during which databases can't be relocated to another node |
| slave_ha_cooldown_period | Time (in seconds) after shard relocation during which the slave high availibity mechanism can't relocate to another node  |
| slave_ha_grace_period | Time (in seconds) between when a node fails and when slave high availability starts relocating shards to another node |
| watchdog_profile | Enables pre-configured watchdog profiles ( cloud or local-network) |

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
| and module | Clause that allows upgrade of BDB and specified Redis module in a single step with only one restart (can be specified multiple times) |
| discard_data | Indicates that data will not be saved after the upgrade |
| force | Forces upgrade and skips warnings and confirmations |
| force_discard | Forces `discard_data` if there is replication or persistence enabled |
| keep_crdt_protocol_version | Keeps the current crdt protocol version |
| keep_current_version | Upgrades to a new patch release, not to the latest major.minor version |
| parallel_shards_upgrade |  |
| preserve_roles | Performs an additional failover to guarantee roles of masters are preserved |

As of v6.2.4, the default behavior for `upgrade db` has changed.  It is now controlled by a new parameter that sets the default upgrade policy used to create new databases and to upgrade ones already in the cluster.  To learn more, see [tune cluster default_redis_version](#tune).


### `verify`

`rladmin verify` prints verification reports for the cluster.

#### `verify balance`

`rladmin verify balance` prints a balance report that displays all of the unbalanced endpoints or nodes in the cluster. The [proxy policy]({{<relref "/rs/administering/designing-production/networking/multiple-active-proxy#proxy-policies">}}) determines which nodes or endpoints to report as unbalanced.

```text
rladmin verify balance [ node <id> ]
```

| Optional Parameters | Description |
| - | - |
| node | Specify a node ID to return a balance table for that node only |

A node is unbalanced if:
- `all-nodes` proxy policy and the node has no endpoint

An endpoint is unbalanced in the following cases:
- `single` proxy policy and one of the following is true:  
    - Shard placement is [`sparse`]({{<relref "/rs/concepts/memory-performance/shard-placement-policy#sparse-shard-placement-policy">}}) and none of the master shards are on the node
    - Shard placement is [`dense`]({{<relref "/rs/concepts/memory-performance/shard-placement-policy#dense-shard-placement-policy">}}) and some master shards are on a different node from the endpoint
- `all-master-shards` proxy policy and one of the following is true:  
    - None of the master shards are on the node
    - Some master shards are on a different node from the endpoint

#### `verify rack_aware`

`rladmin verify rack_aware` verifies that the cluster complies with the rack awareness policy and reports any discovered rack collisions, if [rack-zone awareness]({{<relref "rs/concepts/high-availability/rack-zone-awareness.md">}}) is enabled.

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
