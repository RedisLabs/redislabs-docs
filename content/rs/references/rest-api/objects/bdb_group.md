---
Title: BDB group object
linkTitle: bdb_group
description: An object that represents a group of databases with a shared memory pool
weight: $weight
alwaysopen: false
categories: ["RS"]
---

An API object that represents a group of databases that share a memory
pool.

| Name | Type/Value | Description |
|------|------------|-------------|
| uid          | integer          | Cluster unique ID of the database group |
| memory_size  | integer          | The common memory pool size limit for all databases in the group, expressed in bytes |
| members      | array of strings  | A list of uids of member databases (read-only) |
