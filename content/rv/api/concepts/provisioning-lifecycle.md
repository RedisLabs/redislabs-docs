---
Title: Processing & Provisioning lifecycle
description: 
weight: 20
alwaysopen: false
categories: ["RC Pro"]
---

## Type of API operations

The API performs various operations on underlying resources that include multiple servers, services and related infrastructure. As a result, these operations may take several minutes to complete. 

Therefore, for lengthy operations that modify resources (that is, mainly "create", "update" and "delete" operations) the API uses asynchronous processing and provisioning (or de-provisioning) of requests. 

For operations that do not create or modify resources (that is, mainly `GET` operations), the API uses standard REST request-response in a synchronous manner.

## Asynchrounous operations

The API uses two phases in order to perform various operations:

### Phase #1: Processing the request

During this phase, the request is received, evaluated, planned and executed.

Assuming all steps of this phase complete succssfully, TODO DDC

### Phase #2: Provisioning the request's resources





## Asynchrounous operations using Tasks

When requesting a an asyncronous operation (such as "create", "update" and "delete" operations) the response includes a "`taskId`" - a unique identifier that tracks the progress of the requested operation and reports its status.

You can track the status of a specific task by querying its "`taskId`" status:

```shell
{{% embed-code "rv/api/20-get-task-id.sh" %}}
```

In the above sample, the "`$TASK_ID`" variable holds the value of "`taskId`". For example:

```shell
TASK_ID=16627469-f35b-41ed-9128-7d753b642d63
```

You can also query the status of all active (or recently completed) tasks in your account:

```shell
{{% embed-code "rv/api/30-get-all-tasks.sh" %}}
```

## Processing 

When sending an API request for an asynchronous operation, 