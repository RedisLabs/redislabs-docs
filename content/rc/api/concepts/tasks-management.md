---
Title: Task Management
description: A task is an API operation that is performed asynchronously because it exceeds the time allowed for the synchronous request/response model.
weight: 30
alwaysopen: false
categories: ["RC"]
aliases: /rv/api/concepts/tasks-management/
---
A task is an API operation that is performed asynchronously because it exceeds the time allowed for the synchronous request/response model.

Examples of API operations that use tasks are:

- create subscription
- create database
- update database
- delete database

All create, update, and delete API operations (`POST`, `PUT` and `DELETE`) and some query operations (`GET`) use tasks.

After you request an asynchronous operation, the operations returns a `taskId` that identities the specific task, and contains contextual and status data on the API operation performed by the task.

Tasks are part of the API [processing and provisioning lifecycle]({{< relref "/rc/api/concepts/provisioning-lifecycle#asynchronous-operations" >}}).

### Task information

When you query a task of an asynchronous API operation,
the response to the request includes the task status and additional information about the task:

```json
{
  "taskId": "f3ec0e7b-0548-46e3-82f3-1977012ec738",
  "commandType": "subscriptionCreateRequest",
  "status": "received",
  "description": "Task request received and is being queued for processing.",
  "timestamp": "2019-08-08T09:07:39.826Z",
  "_links": {
    "task": {
      "href": "https://api.redislabs.com/v1/tasks/f3ec0e7b-0548-46e3-82f3-1977012ec738",
      "title": "getTaskStatusUpdates",
      "type": "GET"
    }
  }
}
```

Where:

- `taskId` - The unique identifier (UUID) of the specific task
- `commandType` - The request (command) type
- `status` - The [status]({{< relref "/rc/api/concepts/provisioning-lifecycle#provisioning-statuses">}}) of the task
- `description` - A description of the status
- `timestamp` - The time of the response in ISO-8601 date format and in the UTC timezone
- `_links` - URI links to resources related to the task including:
    - A link to itself
    - Additional links based on the context of the response

### Task status updates

With the task ID, you can query the task status for updates and progress information.
The response in the above example shows a URL with the title `getTaskStatusUpdates`.
The URL in the `href` property returns updates for the specified task.

This request returns the updated status of the task identifier, using the value in the `$TASK_ID` environment variable:

```bash
curl -s -X GET "https://$HOST/tasks/$TASK_ID" \
    -H "accept: application/json" \
    -H "x-api-key: $ACCOUNT_KEY" \
    -H "x-api-secret-key: $SECRET_KEY"
```

The response to the `getTaskStatusUpdates` request shows:

```json
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
      "href": "https://api.redislabs.com/v1/subscriptions/77899",
      "title": "getSubscriptionInformation",
      "type": "GET"
    },
    "self": {
      "href": "https://api.redislabs.com/v1/tasks/36d4b04d-72d4-4404-8600-a223120a553e",
      "type": "GET"
    }
  }
}
```

This response example shows:

- The `status` value is `"processing-completed"`.
- The `response` field contains the resource identifier of the subscription resource changed by this task.
- The `links` array contains another `getSubscriptionInformation` URL that links to the newly created subscription.
    This link queries the subscription status during [provisioning]({{< relref "/rc/api/concepts/provisioning-lifecycle.md" >}}))

### Tasks list

You can use the API operation `GET /tasks` to list the recently submitted and completed tasks for the current account.

This API operation returns a list of tasks for the current account, sorted by most recent status update.

```bash
curl -s -X GET "https://$HOST/tasks" \
    -H "accept: application/json" \
    -H "x-api-key: $ACCOUNT_KEY" \
    -H "x-api-secret-key: $SECRET_KEY"
```

The result returns all the tasks submitted during the past 10 days.
