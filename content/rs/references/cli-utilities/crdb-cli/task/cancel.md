---
Title: crdb-cli task cancel
linkTitle: cancel
description: Attempts to cancel a specified Active-Active database task.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases:
---

Cancels the Active-Active database task specified by the task ID.

```sh
crdb-cli task status --task-id <task_id>
```

### Parameters

| Parameter           | Value  | Description                         |
|---------------------|--------|-------------------------------------|
| task-id \<task_id\>  | string | An Active-Active database task ID (required) |

### Returns

Attempts to cancel an Active-Active database task.

Because tasks happen asynchronously, it's possible a task may complete before it can be cancelled.

### Example

```sh
$ crdb-cli task cancel --crdb-guid 2901c2a3-2828-4717-80c0-6f27f1dd2d7c 
```
