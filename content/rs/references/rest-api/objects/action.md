---
Title: Action object
linkTitle: action
description: An object that represents cluster actions
weight: $weight
alwaysopen: false
categories: ["RS"]
---

The cluster allows you to invoke general maintenance actions such as rebalancing, taking a node offline by moving all of its entities to other nodes, etc.

Actions are implemented as tasks in the cluster. Every task has a
unique `task_id` assigned by the cluster, a task name which
describes the task, a status, and additional task-specific parameters.

The REST API provides a simplified interface that allows callers to
invoke actions and query their status without a specific `task_id`.

The action lifecycle is based on the following status and status
transitions:

![Action lifecycle](/images/rs/rest-api-action-cycle.png#no-click "Action lifecycle")

| Name | Type/Value | Description |
|------|------------|-------------|
| status          | queued | Requested operation and added it to the queue to await processing |
|                 | starting | Picked up operation from the queue and started processing                  |
|                 | running | Currently executing operation |
|                 | cancelling | Operation cancellation is in progress |
|                 | cancelled | Operation cancelled |
|                 | completed | Operation completed |
|                 | failed | Operation failed |
| progress        | integer <nobr>(range: 0-100)</nobr> | Represents percent completed  |

When a task fails, the `error_code` and `error_message` fields describe the encountered error.

Possible `error_code` values:

 Code                    | Description                                    |
|-------------------------|------------------------------------------------|
| internal_error          | An internal error that cannot be mapped to a more precise error code
| insufficient_resources  | The cluster does not have sufficient resources to complete the required operation

