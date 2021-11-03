---
Title: CRDB task object
linkTitle: crdb_task
description: An object that represents a CRDB task
weight: $weight
alwaysopen: false
categories: ["RS"]
---

An object that represents an Active-Active (CRDB) task.

| Name | Type/Value | Description |
|------|------------|-------------|
| id | string | CRDB task ID (read only) |
| crdb_guid | string | Globally unique Active-Active database ID (GUID) (read-only) |
| errors | {{<code>}}
[{
  "cluster_name": string,
  "description": string,
  "error_code": string
}, ...] {{</code>}} | Error details for errors that occurred on a cluster |
| status | 'queued' <br />'started' <br />'finished' <br />'failed' | CRDB task status (read only) |
