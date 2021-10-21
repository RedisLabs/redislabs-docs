---
Title: Shard object
linkTitle: shard
description: An object that represents a database shard
weight: $weight
alwaysopen: false
categories: ["RS"]
---

An API object that represents a Redis shard in a bdb.

| Name | Type/Value | Description |
|------|------------|-------------|
| uid                  | string                          | Cluster unique ID of shard |
| status               | 'active'<br />'inactive'<br />'trimming' | The current status of the shard |
| detailed_status      | 'ok'<br />'importing'<br />'timeout'<br />'loading'<br />'busy'<br />'down'<br />'trimming'<br />'unknown' | A more detailed status of the shard |                                         
| bdb_uid              | integer                         | The ID of the bdb this shard belongs to |
| node_uid             | string                          | The ID of the node this shard is located on |
| role                 | 'master'<br />'slave'        | Role of this shard |
| assigned_slots       | string                          | Shards hash slot range |
| bigstore_ram_weight  | number                          | Shards RAM distribution weight |
| sync                 | [sync]({{<relref "/rs/references/rest-api/objects/shard/sync.md">}}) object | Shard's current sync status and progress |
| loading              | [loading]({{<relref "/rs/references/rest-api/objects/shard/loading">}}) object      | Current status of dump file loading |
| backup               | [backup]({{<relref "/rs/references/rest-api/objects/shard/backup">}}) object        | Current status of scheduled periodic backup process |
| report_timestamp     | string                          | The time in which the shard's info was collected (read-only) |
| redis_info           | redis_info object               | A sub-dictionary of the [Redis INFO command](https://redis.io/commands/info) |
