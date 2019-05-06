---
Title: Processing & Provisioning lifecycle
description: 
weight: 20
alwaysopen: false
categories: ["RC Pro"]
---

## Types of API operations

The API performs various operations on underlying resources that include multiple servers, services and related infrastructure. As a result, these operations may take several minutes to complete. 

Therefore, for lengthy operations that modify resources (that is, mainly "create", "update" and "delete" operations) the API uses asynchronous processing and provisioning (or de-provisioning) of requests. 

For operations that do not create or modify resources (that is, mainly `GET` operations), the API uses standard REST request-response in a synchronous manner.

## Asynchrounous operations

The API uses two phases in order to perform various operations:

### Phase #1: Processing

During this phase, the request is received, evaluated, planned and executed.

When received, the response to the request includes a "`taskId`" that can be used to track the progress of the request's processing.

#### Tracking requests using Tasks

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

#### Task Id states

During the processing of a request, the task transitions between the following states:

* **received** - initial state
* **processing-in-progress** - request is being processed by a dedicated worker 
* **processing-completed** - request processing completed successfully. A "`response`" segment is included with the task status JSON response (will include a "`resourceId`" in the case of a request to create a resource like Subscription of Database)
* **processing-error** - request processing failed, with a detailed cause / reason included in the task status JSON response


### Phase #2: Provisioning

When the processing phase completes successfully (with the task in the "`processing-completed`" status), the provisioning phase begins.

During the provisioning phase, the API infrastructure orechestrates the construction of all infrastructure and resources requested (explicitly or implicitly) in the request.

The provisioning phase may require several minutes to complete. You can track progress of the provisioning phase by querying the resource identifier.

For example, when provisioning a new subscription, use the following `cURL` command to query the status of the subscription (replacing the "`{subscription-id}`" URI parameter with the resource identifier received when the task reported "`processing-completed`" at the end of the processing phase)

```shell
{{% embed-code "rv/api/40-get-subscription-by-id.sh" %}}
```

#### Provisioning states

During the provisioning of a resource (i.e. a subscription, database, cloud account etc.), the resource transitions between the following states:

* **pending** - provisionign in progress
* **active** - provisionign completed successfully
* **deleting** - de-provisionign and deletion in progress
* **error** - an error ocurred during the provisioning phase (with relevant information displayed)

