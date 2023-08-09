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
| uid | integer | Cluster unique ID of database. Can be set during creation but cannot be updated. |
| account_id | integer | SM account ID |
| action_uid | string | Currently running action's UID (read-only) |
| aof_policy | **'appendfsync-every-sec'** <br />'appendfsync-always' | Policy for Append-Only File data persistence |
| authentication_admin_pass | string | Password for administrative access to the BDB (used for SYNC from the BDB) |
| authentication_redis_pass | string | Redis AUTH password authentication.  <br/>Use for Redis databases only.  Ignored for memcached databases. (deprecated, replaced with multiple passwords feature in version 6.0.X) |
| authentication_sasl_pass | string | Binary memcache SASL password |
| authentication_sasl_uname | string | Binary memcache SASL username (pattern does not allow special characters &,\<,>,") |
| authentication_ssl_client_certs | {{<code>}}	
[{
  "client_cert": string
}, ...]
{{</code>}} | List of authorized client certificates<br />**client_cert**: X.509 PEM (base64) encoded certificate |
| authentication_ssl_crdt_certs | {{<code>}}
[{
  "client_cert": string
}, ...]
{{</code>}} | List of authorized CRDT certificates<br />**client_cert**: X.509 PEM (base64) encoded certificate |
| authorized_names | array of strings | Additional certified names (deprecated as of Redis Enterprise v6.4.2; use authorized_subjects instead) |
| authorized_subjects | {{<code>}}
[{
  "CN": string,
  "O": string,
  "OU": [array of strings],
  "L": string,
  "ST": string,
  "C": string
}, ...]
{{</code>}} | A list of valid subjects used for additional certificate validations during TLS client authentication. All subject attributes are case-sensitive.<br />**Required subject fields**:<br />"CN" for Common Name<br />**Optional subject fields:**<br />"O" for Organization<br />"OU" for Organizational Unit (array of strings)<br />"L" for Locality (city)<br />"ST" for State/Province<br />"C" for 2-letter country code  |
| avoid_nodes | array of strings | Cluster node UIDs to avoid when placing the database's shards and binding its endpoints |
| background_op | {{<code>}}
[{
  "status": string,
  "name": string,
  "error": object,
  "progress": number
}, ...]
{{</code>}} | (read-only); **progress**: Percent of completed steps in current operation |
| backup | boolean (default:&nbsp;false) | Policy for periodic database backup |
| backup_failure_reason | 'no-permission'<br />'wrong-file-path'<br />'general-error' | Reason of last failed backup process (read-only) |
| backup_history | integer (default:&nbsp;0) | Backup history retention policy (number of days, 0 is forever) |
| backup_interval | integer | Interval in seconds in which automatic backup will be initiated |
| backup_interval_offset | integer | Offset (in seconds) from round backup interval when automatic backup will be initiated (should be less than backup_interval) |
| backup_location | [complex object]({{<relref "/rs/references/rest-api/objects/bdb/backup_location">}}) | Target for automatic database backups. <br />Call `GET`&nbsp;`/jsonschema` to retrieve the object's structure. |
| backup_progress | number, <nobr>(range: 0-100)</nobr> | Database scheduled periodic backup progress (percentage) (read-only) |
| backup_status | 'exporting'<br />'succeeded'<br />'failed' | Status of scheduled periodic backup process (read-only) |
| bigstore | boolean (default:&nbsp;false) | Database bigstore option |
| bigstore_ram_size | integer (default:&nbsp;0) | Memory size of bigstore RAM part. |
| bigstore_ram_weights | {{<code>}}	
[{
  "shard_uid": integer,
  "weight": number
}, ...]
{{</code>}} | List of shard UIDs and their bigstore RAM weights;<br /> **shard_uid**: Shard UID;<br /> **weight**: Relative weight of RAM distribution |
| client_cert_subject_validation_type | **disabled**<br />san_cn<br />full_subject | Enables additional certificate validations that further limit connections to clients with valid certificates during TLS client authentication.<br />**disabled**: Authenticates clients with valid certificates. No additional validations are enforced.<br />**san_cn**: A client certificate is valid only if its Common Name (CN) matches an entry in the list of valid subjects. Ignores other Subject attributes.<br />**full_subject**: A client certificate is valid only if its Subject attributes match an entry in the list of valid subjects. |
| crdt | boolean (default:&nbsp;false) | Use CRDT-based data types for multi-master replication |
| crdt_causal_consistency | boolean (default:&nbsp;false) | Causal consistent CRDB. |
| crdt_config_version | integer | Replica-set configuration version, for internal use only. |
| crdt_featureset_version | integer | CRDB active FeatureSet version |
| crdt_ghost_replica_ids | string | Removed replicas IDs, for internal use only. |
| crdt_guid | string | GUID of CRDB this database belongs to, for internal use only. |
| crdt_protocol_version | integer | CRDB active Protocol version |
| crdt_repl_backlog_size | string | Active-Active replication backlog size ('auto' or size in bytes) |
| crdt_replica_id | integer | Local replica ID, for internal use only. |
| crdt_replicas | string | Replica set configuration, for internal use only. |
| crdt_sources | array of [syncer_sources]({{<relref "/rs/references/rest-api/objects/bdb/syncer_sources">}}) objects | Remote endpoints/peers of CRDB database to sync from. See the 'bdb -\> replica_sources' section |
| crdt_sync | 'enabled'<br /> **'disabled'** <br />'paused'<br />'stopped' | Enable, disable, or pause syncing from specified crdt_sources. Applicable only for Active-Active databases. See [replica_sync]({{<relref "/rs/references/rest-api/objects/bdb/replica_sync">}}) for more details. |
| crdt_sync_dist | boolean | Enable/disable distributed syncer in master-master |
| crdt_syncer_auto_oom_unlatch | boolean (default:&nbsp;true) | Syncer automatically attempts to recover synchronisation from peers after this database throws an Out-Of-Memory error. Otherwise, the syncer exits |
| created_time | string | The date and time the database was created (read-only) |
| data_internode_encryption | boolean | Should the data plane internode communication for this database be encrypted |
| data_persistence | **'disabled'** <br />'snapshot'<br />'aof' | Database on-disk persistence policy. For snapshot persistence, a [snapshot_policy]({{<relref "/rs/references/rest-api/objects/bdb/snapshot_policy">}}) must be provided |
| dataset_import_sources | [complex object]({{<relref "/rs/references/rest-api/objects/bdb/dataset_import_sources">}}) | Array of source file location description objects to import from when performing an import action. This is write-only and cannot be read after set. <br />Call GET /jsonschema to retrieve the object's structure. |
| db_conns_auditing | boolean | Enables/deactivates [database connection auditing]({{<relref "/rs/security/audit-events">}}) |
| default_user | boolean (default:&nbsp;true) | Allow/disallow a default user to connect |
| disabled_commands | string (default: ) | Redis commands which are disabled in db |
| dns_address_master | string | Database private address endpoint FQDN (read-only) (deprecated) |
| email_alerts | boolean (default:&nbsp;false) | Send email alerts for this DB |
| endpoint | string | Latest bound endpoint. Used when reconfiguring an endpoint via update |
| endpoint_ip | complex object | External IP addresses of node hosting the BDB's endpoint. `GET`&nbsp;`/jsonschema` to retrieve the object's structure. (read-only) (deprecated) |
| endpoint_node | integer | Node UID hosting the BDB's endpoint (read-only) (deprecated) |
| endpoints | array | List of database access endpoints (read-only) |
| enforce_client_authentication | **'enabled'** <br />'disabled' | Require authentication of client certificates for SSL connections to the database. If set to 'enabled', a certificate should be provided in either authentication_ssl_client_certs or authentication_ssl_crdt_certs |
| eviction_policy | 'volatile-lru'<br />'volatile-ttl'<br />'volatile-random'<br />'allkeys-lru'<br />'allkeys-random'<br />'noeviction'<br />'volatile-lfu'<br />'allkeys-lfu' | Database eviction policy (Redis style).<br />**Redis DB default**:&nbsp;'volatile-lru'<br />**memcached DB default**:&nbsp;'allkeys-lru' |
| export_failure_reason | 'no-permission'<br />'wrong-file-path'<br /> 'general-error' | Reason of last failed export process (read-only) |
| export_progress | number, <nobr>(range: 0-100)</nobr> | Database manually triggered export progress (percentage) (read-only) |
| export_status | 'exporting'<br />'succeeded'<br />'failed' | Status of manually triggered export process (read-only) |
| generate_text_monitor | boolean | Enable/disable generation of syncer monitoring information |
| gradual_src_max_sources | integer (default:&nbsp;1) | Sync a maximum N sources in parallel (gradual_src_mode should be enabled for this to take effect) |
| gradual_src_mode | 'enabled'<br />'disabled' | Indicates if gradual sync (of sync sources) should be activated |
| gradual_sync_max_shards_per_source | integer (default:&nbsp;1) | Sync a maximum of N shards per source in parallel (gradual_sync_mode should be enabled for this to take effect) |
| gradual_sync_mode | 'enabled'<br />'disabled'<br />'auto' | Indicates if gradual sync (of source shards) should be activated ('auto' for automatic decision) |
| hash_slots_policy | 'legacy'<br /> **'16k'** | The policy used for hash slots handling<br /> **'legacy'**: slots range is '1-4096'<br /> **'16k'**: slots range is '0-16383' |
| implicit_shard_key | boolean (default:&nbsp;false) | Controls the behavior of what happens in case a key does not match any of the regex rules. <br /> **true**: if a key does not match any of the rules, the entire key will be used for the hashing function <br /> **false**: if a key does not match any of the rules, an error will be returned. |
| import_failure_reason | 'download-error'<br />'file-corrupted'<br />'general-error'<br />'file-larger-than-mem-limit:\<n bytes of expected dataset>:\<n bytes configured bdb limit>'<br />'key-too-long'<br />'invalid-bulk-length'<br />'out-of-memory' | Import failure reason (read-only) |
| import_progress | number, <nobr>(range: 0-100)</nobr> | Database import progress (percentage) (read-only) |
| import_status | 'idle'<br />'initializing'<br />'importing'<br />'succeeded'<br />'failed' | Database import process status (read-only) |
| internal | boolean (default:&nbsp;false) | Is this a database used by the cluster internally |
| last_backup_time | string | Time of last successful backup (read-only) |
| last_changed_time | string | Last administrative configuration change (read-only) |
| last_export_time | string | Time of last successful export (read-only) |
| max_aof_file_size | integer | Maximum size for shard's AOF file (bytes). Default 300GB, (on bigstore DB 150GB) |
| max_aof_load_time | integer (default:&nbsp;3600) | Maximum time shard's AOF reload should take (seconds). |
| max_connections | integer (default:&nbsp;0) | Maximum number of client connections allowed (0 unlimited) |
| memory_size | integer (default:&nbsp;0) | Database memory limit (0 is unlimited), expressed in bytes. |
| metrics_export_all | boolean | Enable/disable exposing all shard metrics through the metrics exporter |
| mkms | boolean (default:&nbsp;true) | Are MKMS (Multi Key Multi Slots) commands supported? |
| module_list | {{<code>}}
[{
  "module_id": string,
  "module_args": [u'string', u'null'],
  "module_name": string,
  "semantic_version": string
}, ...]
{{</code>}} | List of modules associated with database<br />**module_id**: Module UID <br />**module_args**: Module command line arguments (pattern does not allow special characters &,\<,>,")<br />**module_name**: Module's name<br />**semantic_version**: Module's semantic version |
| mtls_allow_outdated_certs | boolean | An optional mTLS relaxation flag for certs verification |
| mtls_allow_weak_hashing | boolean | An optional mTLS relaxation flag for certs verification |
| name | string | Database name |
| oss_cluster | boolean (default:&nbsp;false) | OSS Cluster mode option. Cannot be enabled with `'hash_slots_policy': 'legacy'` |
| oss_cluster_api_preferred_ip_type | **'internal'** <br />'external' | Internal/external IP type in OSS cluster API. Default value for new endpoints |
| oss_sharding | boolean (default:&nbsp;false) | An alternative to `shard_key_regex` for using the common case of the OSS shard hashing policy |
| port | integer | TCP port on which the database is available. Generated automatically if omitted and returned as 0 |
| proxy_policy | 'single'<br />'all-master-shards'<br />'all-nodes' | The default policy used for proxy binding to endpoints |
| rack_aware | boolean (default:&nbsp;false) | Require the database to always replicate across multiple racks |
| redis_version | string | Version of the redis-server processes: e.g. 6.0, 5.0-big |
| repl_backlog_size | string | Redis replication backlog size ('auto' or size in bytes) |
| replica_sources | array of [syncer_sources]({{<relref "/rs/references/rest-api/objects/bdb/syncer_sources">}}) objects | Remote endpoints of database to sync from. See the 'bdb -\> replica_sources' section |
| [replica_sync]({{<relref "/rs/references/rest-api/objects/bdb/replica_sync">}}) | 'enabled'<br /> **'disabled'** <br />'paused'<br />'stopped' | Enable, disable, or pause syncing from specified replica_sources |
| replica_sync_dist | boolean | Enable/disable distributed syncer in replica-of |
| replication | boolean (default:&nbsp;false) | In-memory database replication mode |
| resp3 | boolean (default:&nbsp;true) | Enables or deactivates RESP3 support |
| roles_permissions | {{<code>}}
[{
  "role_uid": integer,
  "redis_acl_uid": integer
}, ...]
{{</code>}} | |
| shard_block_crossslot_keys | boolean (default:&nbsp;false) | In Lua scripts, prevent use of keys from different hash slots within the range owned by the current shard |
| shard_block_foreign_keys | boolean (default:&nbsp;true) | In Lua scripts, `foreign_keys` prevent use of keys which could reside in a different shard (foreign keys) |
| shard_key_regex | {{<code>}}
[{
  "regex": string
}, ...]
{{</code>}} <br /><br />To use the default rules you should set the value to: {{<code>}}
[
  { “regex”: “.*\\{(?< tag >.*)\\}.*” }, 
  { “regex”: “(?< tag >.*)” }
] {{</code>}} | Custom keyname-based sharding rules.  |
| shard_list | array of integers | Cluster unique IDs of all database shards. |
| sharding | boolean (default:&nbsp;false) | Cluster mode (server-side sharding). When true, shard hashing rules must be provided by either `oss_sharding` or `shard_key_regex` |
| shards_count | integer, <nobr>(range: 1-512)</nobr> (default:&nbsp;1) | Number of database server-side shards |
| shards_placement | **'dense'** <br />'sparse' | Control the density of shards <br /> **'dense'**: Shards reside on as few nodes as possible <br /> **'sparse'**: Shards reside on as many nodes as possible |
| skip_import_analyze | 'enabled'<br />'disabled' | Enable/disable skipping the analysis stage when importing an RDB file |
| slave_ha | boolean | Enable replica high availability mechanism for this database (default takes the cluster setting) |
| slave_ha_priority | integer | Priority of the BDB in replica high availability mechanism |
| snapshot_policy | array of [snapshot_policy]({{<relref "/rs/references/rest-api/objects/bdb/snapshot_policy">}}) objects | Policy for snapshot-based data persistence. A dataset snapshot will be taken every N secs if there are at least M writes changes in the dataset |
| ssl | boolean (default:&nbsp;false) | Require SSL authenticated and encrypted connections to the database (deprecated) |
| [status]({{<relref "/rs/references/rest-api/objects/bdb/status">}}) | 'pending'<br />'active'<br />'active-change-pending'<br />'delete-pending'<br />'import-pending'<br />'creation-failed'<br />'recovery' | Database lifecycle status (read-only) |
| sync | 'enabled'<br /> **'disabled'** <br />'paused'<br />'stopped' | (deprecated, use [replica_sync]({{<relref "/rs/references/rest-api/objects/bdb/replica_sync">}}) or crdt_sync instead) Enable, disable, or pause syncing from specified sync_sources |
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
| syncer_mode | 'distributed'<br />'centralized' | The syncer for replication between database instances is either on a single node (centralized) or on each node that has a proxy according to the proxy policy (distributed). (read-only) |
| tags | {{<code>}}	
[{
  "key": string,
  "value": string
}, ...]
{{</code>}} | Optional list of tags objects attached to the database<br />**key**: Represents the tag's meaning and must be unique among tags (pattern does not allow special characters &,\<,>,")<br />**value**: The tag's value |
| tls_mode | 'enabled'<br /> **'disabled'** <br />'replica_ssl' | Require TLS-authenticated and encrypted connections to the database |
| type | **'redis'** <br />'memcached' | Type of database |
| use_nodes | array of strings | Cluster node UIDs to use for database shards and bound endpoints |
| version | string | Database compatibility version: full Redis/memcached version number, such as 6.0.6. This value can only change during database creation and database upgrades.|
| wait_command | boolean (default:&nbsp;true) | Supports Redis wait command (read-only) |



