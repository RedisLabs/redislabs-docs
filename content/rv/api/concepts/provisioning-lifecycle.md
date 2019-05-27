---
Title: Processing & Provisioning Lifecycle
description: 
weight: 20
alwaysopen: false
categories: ["RC Pro"]
---

## Types of API operations

The API can run operations on basic resources, such as multiple servers, services and related infrastructure.
As a result, these operations can take several minutes to complete.

Operations that modify resources, including CREATE, UPDATE and DELETE operations, can take time to process.
The API asynchronously processes and provisions these operations to improve performance.
The API responds to the request with a task identifier that you can use to track the progress of the request through the phases of the asynchronous operation.

For operations that do not create or modify resources, such as GET operations, the API uses synchronous standard HTTP request-response.

## Asynchronous operations

The API uses two phases in response to a request that requires asynchronous processing: Processing and Provisioning.

![processing-and-provisioning](/images/rv/api/processing-and-provisioning.png)

### Task Processing

During this phase, the request is received, evaluated, planned and executed.

#### Tracking requests using tasks

When you request an asyncronous operation, including CREATE, UPDATE and DELETE operations, the response to the API REST request includes a `taskId`.
The `taskID` is a unique identifier that tracks the progress of the requested operation and reports its status.

You can query the `taskId` to track the status of a specific task:

```shell
{{% embed-code "rv/api/20-get-task-id.sh" %}}
```

In this example, the `$TASK_ID` variable holds the value of `taskId`. For example:

```bash
TASK_ID=166d7f69-f35b-41ed-9128-7d753b642d63
```

You can also query the status of all active tasks or the recently completed tasks in your account:

```shell
{{% embed-code "rv/api/30-get-all-tasks.sh" %}}
```

#### Task ID states

During the processing of a request, the task moves through these states:

- `received` - Request is received.
- `processing-in-progress` - A dedicated worker is processing the request.
- `processing-completed` - Request processing succeeded.
    A `response` segment is included with the task status JSON response.
    The response includes a `resourceId` for each resource that the request creates, such as Subscription of Database.
- `processing-error` - Request processing failed.
    A detailed cause or reason is included in the task status JSON response.


    {{% note %}}
A task that reaches the `received` state cannot be cancelled and it will await completion (i.e. processing and provisioning). If you wish to undo an operation that was performed by a task, perform a compensating action (for example: delete a subscription that was created unintentionally)
    {{% /note %}}


### Task Provisioning

When the processing phase succeeds and the task is in the `processing-completed` state, the provisioning phase starts.
During the provisioning phase, the API orchestrates all of infrastructure, resources, and dependencies required by the request.

The provisioning phase may require several minutes to complete. You can query the resource identifier to track the progress of the provisioning phase.

For example, when you provision a new subscription, use this `cURL` command to query the status of the subscription:

```shell
{{% embed-code "rv/api/40-get-subscription-by-id.sh" %}}
```

Where the `{subscription-id}` is the ID that you receive when the task is in the `processing-completed` state.

#### Provisioning states

During the provisioning of a resource, such as a subscription, database, or cloud account, the resource transitions through these states:

- `pending` - Provisioning is in progress.
- `active` - Provisionign completed successfully.
- `deleting` - De-provisioning and deletion is in progress.
- `error` - An error ocurred during the provisioning phase, including the details of the error.


