---
Title: crdb-cli task list
linkTitle: list
description: Lists active and recent Active-Active database tasks.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases:
---

Lists active and recent Active-Active database tasks.

```sh
crdb-cli task list
```

### Parameters

None

### Returns

A table listing current and recent Active-Active tasks.  Each entry includes the following:

| Column | Description |
|--------|-------------|
| Task ID | String containing the unique ID associated with the task |
| CRDB-GUID | String containing the unique ID associated with the Active-Active database affected by the task |
| Operation | String describing the task action |
| Status | String indicating the task status |
| Worker name | String identifying the process handling the task |
| Started | TimeStamp value indicating when the task started ([UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time)) |
| Ended | TimeStamp value indicating when the task ended (UTC) |

### Example

```sh
$ crdb-cli task list
```
