---
Title: Processing & Provisioning Lifecycle
description: API requests follow specific lifecycle phases and states, based on the operation's complexity and length of execution.
weight: 20
alwaysopen: false
categories: ["RC Pro"]
---
## Types of API operations

The API can run operations involving many resources (such as multiple servers, services and related infrastructure). Such operations include CREATE, UPDATE and DELETE operations on Subscriptions, Databases and other entities.
As a result, these operations can take several minutes to process and complete.

The API asynchronously processes and provisions these operations to improve performance.
The API responds to the request with a task identifier that you can use to track the progress of the request through the phases of the asynchronous operation.

For operations that do not create or modify resources, such as most GET operations, the API uses standard synchronous HTTP request-response.

## Asynchronous operations

The API uses two phases in response to a request that requires asynchronous processing: Processing and Provisioning.

![processing-and-provisioning](/images/rv/api/processing-and-provisioning.png)

### Task Processing

During this phase, the request is received, evaluated, planned and executed.

#### Tracking requests using tasks

When you request an asynchronous operation, including CREATE, UPDATE and DELETE operations, the response to the API REST request includes a `taskId`.
The `taskId` is a unique identifier that allows you to track the progress of the requested operation and get information on its status.

You can query the `taskId` to track the status of a specific task:

```shell
{{% embed-code "rv/api/20-get-task-id.sh" %}}
```

In this example, the `$TASK_ID` variable is set to hold the value of `taskId`. For example:

```bash
TASK_ID=166d7f69-f35b-41ed-9128-7d753b642d63
```

You can also query the status of all active tasks or recently completed tasks in your account:

```shell
{{% embed-code "rv/api/30-get-all-tasks.sh" %}}
```

#### Task ID states

During the processing of a request, the task moves through these states:

- `received` - Request is received and awaits processing.
- `processing-in-progress` - A dedicated worker is processing the request.
- `processing-completed` - Request processing succeeded and the request is being provisioned (or de-provisioned, depending on the specific request).
    A `response` segment is included with the task status JSON response.
    The response includes a `resourceId` for each resource that the request creates, such as Subscription or Database ID.
- `processing-error` - Request processing failed.
    A detailed cause or reason is included in the task status JSON response.

{{% note %}}
A task that reaches the `received` state cannot be cancelled and it will await completion (i.e. processing and provisioning). If you wish to undo an operation that was performed by a task, perform a compensating action (for example: delete a subscription that was created unintentionally)
{{% /note %}}

### Task Provisioning

When the processing phase succeeds and the task is in the `processing-completed` state, the provisioning phase starts.
During the provisioning phase, the API orchestrates all of the infrastructure, resources, and dependencies required by the request. 

    {{% note %}}
The term "provisioning" refers to all infrastructure changes required in order to apply the request. This includes provisioning new or additional infrastructure, but (depending on the nature of the request) may also include de-provisioning (or releasing) currently used infrastructure.
    {{% /note %}}

The provisioning phase may require several minutes to complete. You can query the resource identifier to track the progress of the provisioning phase.

For example, when you provision a new subscription, use this `cURL` command to query the status of the subscription:

```shell
{{% embed-code "rv/api/40-get-subscription-by-id.sh" %}}
```

Where the `{subscription-id}` is the resource ID that you receive when the task is in the `processing-completed` state.

#### Provisioning states

During the provisioning of a resource (such as a subscription, database or cloud account) the resource transitions through these states:

- `pending` - Provisioning is in progress.
- `active` - Provisioning completed successfully.
- `deleting` - De-provisioning and deletion is in progress.
- `error` - An error ocurred during the provisioning phase, including the details of the error.

### Processing limitations

The following limitations apply to asynchronous operations:

- For each account, only one operation is **processed** concurrently. When multiple tasks are sent for the same account, they will be received and processed one after the other. 
- The provisioning phase can be performed in parallel. 
- For example: 
    - Concurrently sending 10 "create database" tasks will cause each task to be in the `received` state, awaiting processing.
    - When the first task starts processing it will be moved to the `processing-in-progress` state. 
    - When that first task is completed (either `processing-completed` or `processing-error`) the second task will start processing, and so on.  
    - Typically, the processing phase is much faster than the provisioning phase, and multiple tasks will be in provisioned concurrently.

    {{% note %}}
Concurrent processing limitations apply per account. Separate accounts will be processed (and provisioned) separately, each according to its own task processing order.
    {{% /note %}}
