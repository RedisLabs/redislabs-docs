---
Title: crdb-cli crdb get
linkTitle: get
description: Gets the configuration of an Active-Active database.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases:
---

`crdb-cli crdb get` gets the configuration of an Active-Active database.

```sh
crdb-cli crdb get --crdb_guid <guid>
```

### Parameters

| Parameter           | Value  | Description                         |
|---------------------|--------|-------------------------------------|
| crdb_guid \<guid\>  | string | The GUID of the database (required) |

### Returns

Returns the current configuration of the database.

### Example

```sh
$ crdb-cli crdb get --crdb-guid d84f6fe4-5bb7-49d2-a188-8900e09c6f66
CRDB-GUID: d84f6fe4-5bb7-49d2-a188-8900e09c6f66
Name: database1
Encryption: False
Causal consistency: False
Protocol version: 1
FeatureSet version: 5
Modules: []
Default-DB-Config:
  memory_size: 1073741824
  port: 12000
  replication: True
  shard_key_regex: [{'regex': '.*\\{(?<tag>.*)\\}.*'}, {'regex': '(?<tag>.*)'}]
  sharding: True
  shards_count: 1
  tls_mode: disabled
  rack_aware: None
  data_persistence: None
  authentication_redis_pass: None
  authentication_admin_pass: None
  oss_sharding: None
  oss_cluster: None
  proxy_policy: None
  shards_placement: None
  oss_cluster_api_preferred_ip_type: None
  bigstore: None
  bigstore_ram_size: None
  aof_policy: None
  snapshot_policy: None
  max_aof_load_time: None
  max_aof_file_size: None
Instance:
  Id: 1
  Cluster:
    FQDN: cluster1.redis.local
    URL: https://cluster1.redis.local:9443
    Replication-Endpoint: <Default>
    Replication TLS SNI: <Default>
  Compression: 3
  DB-Config:
    authentication_admin_pass: ZWVmNDk1MTJiMjZmZGYxNDU2N2NhOGNmOWM5MDhjZGRkOTQ1
    replication: None
    rack_aware: None
    memory_size: None
    data_persistence: None
    tls_mode: None
    authentication_redis_pass: None
    port: None
    shards_count: None
    shard_key_regex: None
    oss_sharding: None
    oss_cluster: None
    proxy_policy: None
    shards_placement: None
    oss_cluster_api_preferred_ip_type: None
    bigstore: None
    bigstore_ram_size: None
    aof_policy: None
    snapshot_policy: None
    max_aof_load_time: None
    max_aof_file_size: None
Instance:
  Id: 2
  Cluster:
    FQDN: cluster2.redis.local
    URL: https://cluster2.redis.local:9443
    Replication-Endpoint: <Default>
    Replication TLS SNI: <Default>
  Compression: 3
  DB-Config:
    authentication_admin_pass: YWE3MTQwY2M5ODRkZjFhNmQzODAwNjVmNjE4ZWE5MTA4YTFh
    replication: None
    rack_aware: None
    memory_size: None
    data_persistence: None
    tls_mode: None
    authentication_redis_pass: None
    port: None
    shards_count: None
    shard_key_regex: None
    oss_sharding: None
    oss_cluster: None
    proxy_policy: None
    shards_placement: None
    oss_cluster_api_preferred_ip_type: None
    bigstore: None
    bigstore_ram_size: None
    aof_policy: None
    snapshot_policy: None
    max_aof_load_time: None
    max_aof_file_size: None
```
