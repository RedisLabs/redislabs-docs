---
Title: crdb-cli task status
linkTitle: task status
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

### Returns

Returns the status of an Active-Active database task.

### Example

```sh
$ crdb-cli crdb flush --crdb-guid db6365b5-8aca-4055-95d8-7eb0105c0b35 --no-wait        
Task 2901c2a3-2828-4717-80c0-6f27f1dd2d7c created
$ crdb-cli task status --task-id 2901c2a3-2828-4717-80c0-6f27f1dd2d7c
Task-ID: 2901c2a3-2828-4717-80c0-6f27f1dd2d7c
CRDB-GUID: -
Status: started
$ crdb-cli task status --task-id 2901c2a3-2828-4717-80c0-6f27f1dd2d7c
Task-ID: 2901c2a3-2828-4717-80c0-6f27f1dd2d7c
CRDB-GUID: -
Status: finished
```
