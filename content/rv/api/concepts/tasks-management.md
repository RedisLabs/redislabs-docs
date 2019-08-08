---
Title: Tasks management
description: 
weight: 30
alwaysopen: false
categories: ["RC Pro"]
---

A Task is an API operation that is performed asynchronously (since its completion requires an amount of time the exceeds the synchronous request/response model). 

Examples of API operations that use Tasks are subscription and database creation, update and deletion. In essence, all of the create / update / delete API operations (`POST`, `PUT` and `DELETE`) rely on Tasks, and some of the query operations (`GET`) also rely on tasks.

A task is identified using a `taskId` - a universally unique identifier (UUID) that idenfities the specific task, and contains contentual and status data on the API operation performed by the task.

For a detailed description on how Tasks fit into the API processing and provisioning lifecycle, see "[Asynchronous operations]({{< relref  "rv/api/concepts/provisioning-lifecycle#asynchronous-operations">}})"

### Task information

When calling an API operation that is processed asynchronously using a task, the response to the request will include a Task status response:

```
{
  "taskId": "f3ec0e7b-0548-46e3-82f3-1977012ec738",
  "commandType": "subscriptionCreateRequest",
  "status": "received",
  "description": "Task request received and is being queued for processing.",
  "timestamp": "2019-08-08T09:07:39.826Z",
  "_links": {
    "task": {
      "href": "https://api-beta1-qa.redislabs.com/beta1/tasks/f3ec0e7b-0548-46e3-82f3-1977012ec738",
      "title": "getTaskStatusUpdates",
      "type": "GET"
    }
  }
}
```

The response contains the following information:

* `taskId` - a universally unique identifier (UUID) that idenfities the specific task 
* `commandType` - a string description that identifies the request (AKA "command") type
* `status` - the status of the task. For a list of supported status values for tasks, see "[Asynchronous operations]({{< relref  "rv/api/concepts/provisioning-lifecycle#asynchronous-operations">}})"
* `description` - a description of the status and its meaning
* `timestamp` - a time indicator in ISO-8601 date format, in the UTC timezone
* `_links` - URI links to resources related to the task (by default: a link to itself; additional links are added based on context of response)

### Task status updates

Using the information provided by the Task response, it is possible to query the task status for updates and progress information.

The above example contains the link with the title `getTaskStatusUpdates`. The URI contained in that links `href` property can be queried to retrieve any updates for the specified task (identified by the Task ID in UUID format).

For example, the following request returns the updated status of the task identifier (using the value in the `$TASK_ID` environment variable):

```
curl -s -X GET "https://$HOST/tasks/$TASK_ID" \
    -H "accept: application/json" \
    -H "x-api-key: $ACCOUNT_KEY" \
    -H "x-api-secret-key: $SECRET_KEY"
```

An example of a response to the above `getTaskStatusUpdates` request:

```
{
  "taskId": "36d4b04d-72d4-4404-8600-a223120a553e",
  "commandType": "subscriptionCreateRequest",
  "status": "processing-completed",
  "description": "Request processing completed successfully and its resources are now being provisioned / de-provisioned.",
  "timestamp": "2019-08-08T06:49:15.929Z",
  "response": {
    "resourceId": 77899
  },
  "_links": {
    "resource": {
      "href": "https://api-beta1.redislabs.com/beta1/subscriptions/77899",
      "title": "getSubscriptionInformation",
      "type": "GET"
    },
    "self": {
      "href": "https://api-beta1.redislabs.com/beta1/tasks/36d4b04d-72d4-4404-8600-a223120a553e",
      "type": "GET"
    }
  }
}
```

The above respons example, note the following changes: 

* `status` value if `"processing-completed"`
* `response` field contains the resource identifier of the resource impacted by this task (in this case: a newly created subscription)
* The `links` array contains an additional link titled `getSubscriptionInformation` that with the URI that links to the newly created subscription. Using this link it is possible to continue querying the subscription status as it is being provisioned (as described in the [Processing & Provisioning Lifecycle]({{< relref  "rv/api/concepts/provisioning-lifecycle">}})")


### Listing tasks

The list of recently submitted & completed tasks for the current account can be queried using the API operation `GET /tasks`.

This API operation returns a list of tasks for the current account, sorted by descending status update (i.e. most recently updated tasks appear first).


```
curl -s -X GET "https://$HOST/tasks" \
    -H "accept: application/json" \
    -H "x-api-key: $ACCOUNT_KEY" \
    -H "x-api-secret-key: $SECRET_KEY"
```

The result returns all the tasks submitted during the past 10 days.