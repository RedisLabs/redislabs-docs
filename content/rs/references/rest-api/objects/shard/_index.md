---
Title: Shard object
linkTitle: shard
description: An object that represents a database shard
weight: $weight
alwaysopen: false
categories: ["RS"]
---

An API object that represents a Redis shard in a database.

| Name | Type/Value | Description |
|------|------------|-------------|
| uid | string | Cluster unique ID of shard |
| assigned_slots | string | Shards hash slot range |
| backup | [backup]({{<relref "/rs/references/rest-api/objects/shard/backup">}}) object | Current status of scheduled periodic backup process |
| bdb_uid | integer | The ID of the database this shard belongs to |
| bigstore_ram_weight | number | Shards RAM distribution weight |
| detailed_status | 'busy'<br />'down'<br />'importing'<br />'loading'<br />'ok'<br />'timeout'<br />'trimming'<br />'unknown' | A more detailed status of the shard |
| loading | [loading]({{<relref "/rs/references/rest-api/objects/shard/loading">}}) object | Current status of dump file loading |
| node_uid | string | The ID of the node this shard is located on |
| redis_info | redis_info object | A sub-dictionary of the [Redis INFO command](https://redis.io/commands/info) |
| report_timestamp | string | The time in which the shard's info was collected (read-only) |
| role | 'master'<br />'slave' | Role of this shard |
| status | 'active'<br />'inactive'<br />'trimming' | The current status of the shard |
| sync | [sync]({{<relref "/rs/references/rest-api/objects/shard/sync.md">}}) object | Shard's current sync status and progress |
