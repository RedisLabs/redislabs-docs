---
Title: CRDB instance info object
linkTitle: instance_info
description: An object that represents Active-Active instance info
weight: $weight
alwaysopen: false
categories: ["RS"]
---

An object that represents Active-Active instance info.

| Name | Type/Value | Description |
|------|------------|-------------|
| cluster | [CRDB cluster_info]({{<relref "/rs/references/rest-api/objects/crdb/cluster_info">}}) object | |
| compression | integer | Compression level when syncing from this source |
| db_config | [CRDB database_config]({{<relref "/rs/references/rest-api/objects/crdb/database_config">}}) object | Database configuration |
| db_uid | string | ID of local database instance. This field is likely to be empty for instances other than the local one. |
| id | integer | Unique instance ID |
