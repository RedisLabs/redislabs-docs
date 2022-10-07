---
Title: crdb-cli task status
linkTitle: status
description: Shows the status of a specified Active-Active database task.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases:
---

Shows the status of a specified Active-Active database task.

```sh
crdb-cli task status --task-id <task_id>
```

### Parameters

| Parameter           | Value  | Description                         |
|---------------------|--------|-------------------------------------|
| task-id \<task_id\>  | string | An Active-Active database task ID (required) |
| verbose              | N/A    | Returns detailed information when specified |
| no-verbose           | N/A    | Returns limited information when specified |

### Returns

Returns the status of an Active-Active database task.

The `--verbose` and `--no-verbose` options are mutually incompatible; specify one or the other.

### Example

```sh
$ crdb-cli task status --task-id 2901c2a3-2828-4717-80c0-6f27f1dd2d7c
Task-ID: 2901c2a3-2828-4717-80c0-6f27f1dd2d7c
CRDB-GUID: -
Status: finished
```
