---
Title: Node object
linkTitle: node
description: An object that represents a node in the cluster
weight: $weight
alwaysopen: false
categories: ["RS"]
---

An API object that represents a node in the cluster.

| Name | Type/Value | Description |
|------|------------|-------------|
| uid                | integer         | Cluster unique ID of node (read-only) |
| status             | 'active'<br />'provisioning'<br />'decommissioning'<br />'down' | Node status (read-only) |
| addr               | string          | Internal IP address of node  |
| external_addr      | complex object  | External IP addresses of node. `GET`&nbsp;`/jsonschema` to retrieve the object's structure. |
| public_addr        | string          | Public IP address of node    |
| total_memory       | integer         | Total memory of node (bytes) (read-only) |
| cores              | integer         | Total number of CPU cores (read-only) |
| architecture       | string          | Hardware architecture (read-only) |
| bigstore_driver    | 'ibm-capi-ga1'<br />'ibm-capi-ga2'<br />'ibm-capi-ga4'<br />'rocksdb' | Bigstore driver name or none |
| bigstore_size      | integer         | Storage size of bigstore storage (read-only) |
| bigredis_storage_path | string       | Flash storage path (read-only) |
| ephemeral_storage_path | string      | Ephemeral storage path (read-only) |
| ephemeral_storage_size | number     | Ephemeral storage size (bytes) (read-only) |
| persistent_storage_path | string     | Persistent storage path (read-only) |
| persistent_storage_size | number    | Persistent storage size (bytes) (read- only) |
| recovery_path      | string          | Recovery files path          |
| software_version   | string          | Installed Redis Labs cluster software version (read-only) |
| supported_database_versions | {{<code>}}
[{
  "db_type": string,
  "version": string
}, ...]
{{</code>}} | Versions of open source databases supported by Redis Labs software on the node (read-only)<br />**db_type**: Type of database<br />**version**: Version of database |
| shard_list         | array of integers | Cluster unique IDs of all node shards |
| os_version         | string          | Installed OS version (human-readable) (read-only) |
| os_name            | string          | OS name (read-only)     |
| os_semantic_version | string         | Full version number (read-only) |
| shard_count        | integer         | Number of shards on the node (read-only) |
| uptime             | integer         | System uptime (seconds) (read-only) |
| system_time        | string          | System time (UTC) (read-only) |
| rack_id            | string          | Rack ID where node is installed |
| accept_servers     | boolean (default:&nbsp;true) | If true, no shards will be created on the node |
| max_redis_servers  | integer         | Maximum number of shards on the node |
| max_listeners      | integer         | Maximum number of listeners on the node |
