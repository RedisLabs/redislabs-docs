---
Title: CRDB database config object
linkTitle: database_config
description: An object that represents the database configuration
weight: $weight
alwaysopen: false
categories: ["RS"]
---

An object that represents the database configuration.

| Name | Type/Value | Description |
|------|------------|-------------|
| aof_policy | string | Policy for Append-Only File data persistence |
| authentication_admin_pass | string | Administrative databases access token |
| authentication_redis_pass | string | Redis AUTH password |
| bigstore | boolean | Database driver is Redis on Flash |
| bigstore_ram_size | integer | Memory size of RAM size |
| data_persistence | string | Database on-disk persistence |
| max_aof_file_size | integer | Hint for maximum AOF file size |
| max_aof_load_time | integer | Hint for maximum AOF reload time |
| memory_size | integer | Database memory size limit, in bytes |
| oss_cluster | boolean | Enables OSS Cluster mode |
| oss_cluster_api_preferred_ip_type | string | Indicates preferred IP type in OSS cluster API: internal/external |
| oss_sharding | boolean | An alternative to shard_key_regex for using the common case of the OSS shard hashing policy |
| port | integer | TCP port for database access |
| proxy_policy | string | The policy used for proxy binding to the endpoint |
| rack_aware | boolean | Require the database to be always replicated across multiple racks |
| replication | boolean | Database replication |
| shard_key_regex | {{<code>}}
[{
  "regex": string
}, ...]
{{</code>}} <br /><br />To use the default rules you should set the value to: {{<code>}}
[
  { “regex”: “.*\\{(?< tag >.*)\\}.*” }, 
  { “regex”: “(?< tag >.*)” }
] {{</code>}} | Custom keyname-based sharding rules (required)  |
| shards_count | integer | Number of database shards |
| shards_placement | string | Control the density of shards: should they reside on as few or as many nodes as possible |
| snapshot_policy | array of [snapshot_policy]({{<relref "/rs/references/rest-api/objects/bdb/snapshot_policy">}}) objects | Policy for snapshot-based data persistence (required) |
| tls_mode | string | Encrypt communication |
