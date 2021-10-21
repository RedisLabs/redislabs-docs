---
Title: BDB object
linkTitle: bdb
description: An object that represents a database
weight: $weight
alwaysopen: false
categories: ["RS"]
---

An API object that represents a managed database in the cluster.

| Name | Type/Value | Description |
|------|------------|-------------|
| uid | integer | Cluster unique ID of database. Can be set on Create, but cannot be updated. |
| shard_list | array of integers | Cluster unique IDs of all database shards. |
| name | string | Database name |
| type | **'redis'**<br />'memcached' | Type of database |
| version | string | Database compatibility version: full Redis/memcached version number, e.g. 6.0.6 |
| redis_version | string | Version of the redis-server processes: e.g. 6.0, 5.0-big |
| bigstore | boolean (default:&nbsp;false) | Database bigstore option |
| created_time | string | The date and time the database was created (read-only) |
| last_changed_time | string | Last administrative configuration change (read-only) |
| [status]({{<relref "/rs/references/rest-api/objects/bdb/status">}}) | 'pending'<br />'active'<br />'active-change-pending'<br />'delete-pending'<br />'import-pending'<br />'creation-failed'<br />'recovery' | Database lifecycle status (read-only) |
| import_status | 'idle'<br />'initializing'<br />'importing'<br />'succeeded'<br />'failed' | Database import process status (read-only) |
| import_progress | number, <nobr>(range: 0-100)</nobr> | Database import progress (percentage) (read-only) |
| import_failure_reason | 'download-error'<br />'file-corrupted'<br />'general-error'<br />'file-larger-than-mem-limit:\<n bytes of expected dataset>:\<n bytes configured bdb limit>'<br />'key-too-long'<br />'invalid-bulk-length'<br />'out-of-memory' | Import failure reason (read-only) |
| backup_status | 'exporting'<br />'succeeded'<br />'failed' | Status of scheduled periodic backup process (read-only) |
| backup_progress | number, <nobr>(range: 0-100)</nobr> | Database scheduled periodic backup progress (percentage) (read-only) |
| backup_failure_reason | 'no-permission'<br />'wrong-file-path'<br />'general-error' | Reason of last failed backup process (read-only) |
| export_status | 'exporting'<br />'succeeded'<br />'failed' | Status of manually triggered export process (read-only) |
| export_progress | number, <nobr>(range: 0-100)</nobr> | Database manually triggered export progress (percentage) (read-only) |
| export_failure_reason | 'no-permission'<br />'wrong-file-path'<br /> 'general-error' | Reason of last failed export process (read-only) |
| last_export_time | string | Time of last successful export (read-only) |
| dataset_import_sources | [complex object]({{<relref "/rs/references/rest-api/objects/bdb/dataset_import_sources">}}) | Array of source file location description objects to import from when performing an import action. This is write-only and cannot be read after set. <br />Call GET /jsonschema to retrieve the object's structure. |
| memory_size | integer (default:&nbsp;0) | Database memory limit (0 is unlimited), expressed in bytes. |
| bigstore_ram_size | integer (default:&nbsp;0) | Memory size of bigstore RAM part. |
| eviction_policy | 'volatile-lru'<br />'volatile-ttl'<br />'volatile-random'<br />'allkeys-lru'<br />'allkeys-random'<br />'noeviction'<br />'volatile-lfu'<br />'allkeys-lfu' | Database eviction policy (Redis style).<br />**Redis DB default**:&nbsp;'volatile-lru'<br />**memcached DB default**:&nbsp;'allkeys-lru' |
| replication | boolean (default:&nbsp;false) | In-memory database replication mode |
| data_persistence | **'disabled'**<br />'snapshot'<br />'aof' | Database on-disk persistence policy. For snapshot persistence, a [snapshot_policy]({{<relref "/rs/references/rest-api/objects/bdb/snapshot_policy">}}) must be provided |
| snapshot_policy | array of [snapshot_policy]({{<relref "/rs/references/rest-api/objects/bdb/snapshot_policy">}}) objects | Policy for snapshot-based data persistence. A dataset snapshot will be taken every N secs if there are at least M writes changes in the dataset |
| aof_policy | **'appendfsync-every-sec'**<br />'appendfsync-always' | Policy for Append-Only File data persistence |
| max_aof_load_time | integer (default:&nbsp;3600) | Maximum time shard's AOF reload should take (seconds). |
| max_aof_file_size | integer | Maximum size for shard's AOF file (bytes). Default 300GB, (on bigstore DB 150GB) |
| backup | boolean (default:&nbsp;false) | Policy for periodic database backup |
| backup_location | [complex object]({{<relref "/rs/references/rest-api/objects/bdb/backup_location">}}) | Target for automatic database backups. <br />Call `GET`&nbsp;`/jsonschema` to retrieve the object's structure. |
| backup_interval | integer | Interval in seconds in which automatic backup will be initiated |
| backup_interval_offset | integer | Offset (in seconds) from round backup interval when automatic backup will be initiated (should be less than backup_interval) |
| backup_history | integer (default:&nbsp;0) | Backup history retention policy (number of days, 0 is forever) |
| last_backup_time | string | Time of last successful backup (read-only) |
| hash_slots_policy | 'legacy'<br />**'16k'** | The policy used for hash slots handling<br />**'legacy'**: slots range is '1-4096'<br />**'16k'**: slots range is '0-16383' |
| oss_cluster | boolean (default:&nbsp;false) | OSS Cluster mode option. Cannot be enabled with `'hash_slots_policy': 'legacy'` |
| shard_block_foreign_keys | boolean (default:&nbsp;true) | In Lua scripts, `foreign_keys` prevent use of keys which could reside in a different shard (foreign keys) |
| shard_block_crossslot_keys | boolean (default:&nbsp;false) | In Lua scripts, prevent use of keys from different hash slots within the range owned by the current shard |
| disabled_commands | string (default: ) | Redis commands which are disabled in db |
| oss_cluster_api_preferred_ip_type | **'internal'**<br />'external' | Internal/external IP type in OSS cluster API. Default value for new endpoints |
| sharding | boolean (default:&nbsp;false) | Cluster mode (server-side sharding). When true, shard hashing rules must be provided by either `oss_sharding` or `shard_key_regex` |
| shards_count | integer, <nobr>(range: 1-512)</nobr> (default:&nbsp;1) | Number of database server-side shards |
| shards_placement | **'dense'**<br />'sparse' | Control the density of shards <br />**'dense'**: Shards reside on as few nodes as possible <br />**'sparse'**: Shards reside on as many nodes as possible |
| shard_key_regex | {{<code>}}
[{
  "regex": string
}, ...]
{{</code>}} <br /><br />To use the default rules you should set the value to: {{<code>}}
[
  { “regex”: “.*\\{(?< tag >.*)\\}.*” }, 
  { “regex”: “(?< tag >.*)” }
] {{</code>}} | Custom keyname-based sharding rules.  |
| oss_sharding | boolean (default:&nbsp;false) | An alternative to `shard_key_regex` for using the common case of the OSS shard hashing policy |
| auto_upgrade | boolean (default:&nbsp;false) | Should upgrade automatically after a cluster upgrade |
| internal | boolean (default:&nbsp;false) | Is this a bdb used by the cluster internally |
| tags | {{<code>}}	
[{
  "key": string,
  "value": string
}, ...]
{{</code>}} | Optional list of tags objects attached to the database<br />**key**: Represents the tag's meaning and must be unique among tags (pattern does not allow special characters &,\<,>,")<br />**value**: The tag's value |
| action_uid | string | Currently running action's uid (read-only) |
| authentication_redis_pass | string | Redis AUTH password authentication |
| authentication_sasl_uname | string | Binary memcache SASL username (pattern does not allow special characters &,\<,>,") |
| authentication_sasl_pass | string | Binary memcache SASL password |
| authentication_admin_pass | string | Password for administrative access to the BDB (used for SYNC from the BDB) |
| ssl | boolean (default:&nbsp;false) | Require SSL authenticated and encrypted connections to the database (deprecated) |
| tls_mode | 'enabled'<br />**'disabled'**<br />'replica_ssl' | Require SSL authenticated and encrypted connections to the database |
| enforce_client_authentication | **'enabled'**<br />'disabled' | Require authentication of client certificates for SSL connections to the database. If set to 'enabled', a certificate should be provided in either authentication_ssl_client_certs or authentication_ssl_crdt_certs |
| authentication_ssl_client_certs | {{<code>}}	
[{
  "client_cert": string
}, ...]
{{</code>}} | List of authorized client certificates<br />**client_cert**: X.509 PEM (base64) encoded certificate |
| authorized_names | array of strings | Additional certified names |
| authentication_ssl_crdt_certs | {{<code>}}
[{
  "client_cert": string
}, ...]
{{</code>}} | List of authorized crdt certificates<br />**client_cert**: X.509 PEM (base64) encoded certificate |
| roles_permissions | {{<code>}}
[{
  "role_uid": integer,
  "redis_acl_uid": integer
}, ...]
{{</code>}} | |
| default_user | boolean (default:&nbsp;true) | Allow/disallow a default user to connect |
| data_internode_encryption | boolean | Should the data plane internode communication for this database be encrypted |
| port | integer | TCP port on which the database is available. Generated automatically if omitted and returned as 0 |
| dns_address_master | string | Database private address endpoint FQDN (read-only) (deprecated) |
| endpoints | array | List of database access endpoints (read-only) |
| endpoint_node | integer | Node UID hosting the BDB's endpoint (read-only) (deprecated) |
| endpoint_ip | complex object | External IP addresses of node hosting the BDB's endpoint. `GET`&nbsp;`/jsonschema` to retrieve the object's structure. (read-only) (deprecated) |
| max_connections | integer (default:&nbsp;0) | Maximum number of client connections allowed (0 unlimited) |
| implicit_shard_key | boolean (default:&nbsp;false) | Controls the behavior of what happens in case a key does not match any of the regex rules. <br />**true**: if a key does not match any of the rules, the entire key will be used for the hashing function <br />**false**: if a key does not match any of the rules, an error will be returned. |
| replica_sources | array of [syncer_sources]({{<relref "/rs/references/rest-api/objects/bdb/syncer_sources">}}) objects | Remote endpoints of database to sync from. See the 'bdb -\> replica_sources' section |
| crdt_sources | array of [syncer_sources]({{<relref "/rs/references/rest-api/objects/bdb/syncer_sources">}}) objects | Remote endpoints/peers of CRDB database to sync from. See the 'bdb -\> replica_sources' section |
| gradual_src_mode | 'enabled'<br />'disabled' | Indicates if gradual sync (of sync sources) should be activated |
| gradual_src_max_sources | integer (default:&nbsp;1) | Sync a maximum N sources in parallel (gradual_src_mode should be enabled for this to take effect) |
| gradual_sync_mode | 'enabled'<br />'disabled'<br />'auto' | Indicates if gradual sync (of source shards) should be activated ('auto' for automatic decision) |
| gradual_sync_max_shards_per_source | integer (default:&nbsp;1) | Sync a maximum of N shards per source in parallel (gradual_sync_mode should be enabled for this to take effect) |
| sync_sources | {{<code>}}
[{
  "uid": integer,
  "uri": string,
  "compression": integer,
  "status": string,
  "rdb_transferred": integer,
  "rdb_size": integer,
  "last_update": string,
  "lag": integer,
  "last_error": string
}, ...]
{{</code>}} | (deprecated, instead use replica_sources or crdt_sources) Remote endpoints of database to sync from. See the 'bdb -\> replica_sources' section<br />**uid**: Numeric unique identification of this source<br />**uri**: Source Redis URI<br />**compression**: Compression level for the replication link<br />**status**: Sync status of this source<br />**rdb_transferred**: Number of bytes transferred from the source's RDB during the syncing phase<br />**rdb_size**: The source's RDB size to be transferred during the syncing phase<br />**last_update**: Time last update was received from the source<br />**lag**: Lag in millisec between source and destination (while synced)<br />**last_error**: Last error encountered when syncing from the source |
| [replica_sync]({{<relref "/rs/references/rest-api/objects/bdb/replica_sync">}}) | 'enabled'<br />**'disabled'**<br />'paused'<br />'stopped' | Enable, disable, or pause syncing from specified replica_sources |
| crdt_sync | 'enabled'<br />**'disabled'**<br />'paused'<br />'stopped' | Enable, disable, or pause syncing from specified crdt_sources. Applicable only for CRDB bdb. See [replica_sync]({{<relref "/rs/references/rest-api/objects/bdb/replica_sync">}}) for more details. |
| sync | 'enabled'<br />**'disabled'**<br />'paused'<br />'stopped' | (deprecated, use [replica_sync]({{<relref "/rs/references/rest-api/objects/bdb/replica_sync">}}) or crdt_sync instead) Enable, disable, or pause syncing from specified sync_sources |
| bigstore_ram_weights | {{<code>}}	
[{
  "shard_uid": integer,
  "weight": number
}, ...]
{{</code>}} | List of shard UIDs and their bigstore RAM weights;<br />**shard_uid**: Shard UID;<br />**weight**: Relative weight of RAM distribution |
| email_alerts | boolean (default:&nbsp;false) | Send email alerts for this DB |
| rack_aware | boolean (default:&nbsp;false) | Require the database to always replicate across multiple racks |
| proxy_policy | 'single'<br />'all-master-shards'<br />'all-nodes' | The default policy used for proxy binding to endpoints |
| use_nodes | array of strings | Cluster node uids to use for bdb's shards and bound endpoints |
| avoid_nodes | array of strings | Cluster node uids to avoid when placing the bdb's shards and binding its endpoints |
| endpoint | string | Latest bound endpoint. Used when reconfiguring an endpoint via update |
| wait_command | boolean (default:&nbsp;true) | Supports Redis wait command (read-only) |
| background_op | {{<code>}}
[{
  "status": string,
  "name": string,
  "error": object,
  "progress": number
}, ...]
{{</code>}} | (read-only); **progress**: Percent of completed steps in current operation |
| module_list | {{<code>}}
[{
  "module_id": string,
  "module_args": [u'string', u'null'],
  "module_name": string,
  "semantic_version": string
}, ...]
{{</code>}} | List of modules associated with database<br />**module_id**: Module UID <br />**module_args**: Module command line arguments (pattern does not allow special characters &,\<,>,")<br />**module_name**: Module's name<br />**semantic_version**: Module's semantic version |
| crdt | boolean (default:&nbsp;false) | Use CRDT-based data types for multi-master replication |
| crdt_replica_id | integer | Local replica-id, for internal use only. |
| crdt_replicas | string | Replica-set configuration, for internal use only. |
| crdt_ghost_replica_ids | string | Removed replicas IDs, for internal use only. |
| crdt_causal_consistency | boolean (default:&nbsp;false) | Causal consistent CRDB. |
| crdt_syncer_auto_oom_unlatch | boolean (default:&nbsp;true) | Syncer automatically attempts to recover synchronisation from peers after this BDB got Out-Of-Memory. Otherwise, the syncer exits |
| crdt_config_version | integer | Replica-set configuration version, for internal use only. |
| crdt_protocol_version | integer | CRDB active Protocol version |
| crdt_featureset_version | integer | CRDB active FeatureSet version |
| crdt_guid | string | GUID of CRDB this bdb is part of, for internal use only. |
| slave_ha | boolean | Enable replica high availability mechanism for this bdb (default takes the cluster setting) |
| slave_ha_priority | integer | Priority of the BDB in replica high availability mechanism |
| skip_import_analyze | 'enabled'<br />'disabled' | Enable/disable skipping the analysis stage when importing an RDB file |
| mkms | boolean (default:&nbsp;true) | Are MKMS (Multi Key Multi Slots) commands supported? |
| account_id | integer | SM account ID |
| mtls_allow_weak_hashing | boolean | An optional mTLS relaxation flag for certs verification |
| mtls_allow_outdated_certs | boolean | An optional mTLS relaxation flag for certs verification |
| metrics_export_all | boolean | Enable/disable exposing all shard metrics through the metrics exporter |
| replica_sync_dist | boolean | Enable/disable distributed syncer in replica-of |
| crdt_sync_dist | boolean | Enable/disable distributed syncer in master-master |
| syncer_mode | 'distributed'<br />'centralized' | The syncer for replication between database instances is either on a single node (centralized) or on each node that has a proxy according to the proxy policy (distributed). (read-only) |
| generate_text_monitor | boolean | Enable/disable generation of syncer monitoring information |
| repl_backlog_size | string | Redis replication backlog size ('auto' or size in bytes) |
| crdt_repl_backlog_size | string | Active-Active replication backlog size ('auto' or size in bytes) |