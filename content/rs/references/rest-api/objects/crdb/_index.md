---
Title: CRDB object
linkTitle: crdb
description: An object that represents an Active-Active database
weight: $weight
alwaysopen: false
categories: ["RS"]
---

An object that represents an Active-Active database.

| Name | Type/Value | Description |
|------|------------|-------------|
| causal_consistency | boolean | Enables causal consistency across crdt instances |
| default_db_config| [CRDB database_config]({{<relref "/rs/references/rest-api/objects/crdb/database_config">}}) object | Default database configuration |
| encryption | boolean | Encrypt communication |
| featureset_version | integer | Active-Active database active FeatureSet version
| guid | string | The GUID of the Active-Active database |
| instances | array of [CRDB instance_info]({{<relref "/rs/references/rest-api/objects/crdb/instance_info">}}) objects | |
| local_databases | {{<code>}}
[{
  "bdb_uid": string,
  "id": integer
}, ...] {{</code>}} | Mapping of instance IDs for local databases to local BDB IDs |
| name | string | Name of Active-Active database |
| protocol_version | integer | Active-Active database active protocol version |
