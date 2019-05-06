---
Title: Create and manage Subscriptions
description: 
weight: 60
alwaysopen: false
categories: ["RC Pro"]
---

This articles describes how to create a subscription using `cURL` commands. 

For an introduction to using `cURL` with API operations, see "[Using the cURL HTTP client]({{< relref  "/rv/api/how-to/using-curl#using-the-curl-http-client" >}})".


# Create a subscription

The API operation that creates a subscription is `POST /subscriptions`.

The following Linux shell script sends a `POST /subscriptions` and waits until for a subscription Id. When the subscription Id is received, the **processing phase** is completed and the subscription is in the **provisioning phase** (in the `pending` status).  

## Pre-requisites

* Define the expected variables needed to use the API:

```shell
{{% embed-code "rv/api/05-set-variables.sh" %}}
```

## Run the subscription creation script

You can run the **create subscription** script using a command line `bash path/script-name.sh`.

```shell
{{% embed-code "rv/api/10-create-subscription.sh" %}}
```

### **Notes:**

#### Step 1

Executes a `POST` request to `subscriptions` with the defined parameters and a JSON body located within a separate JSON file.

The POST response is a JSON document that contains the `taskId`, which is stored in a variable called `TASK_ID` that is used later to track the progress of the request's processing.

#### Step 2

Query the API for the status of the subscription creation request, identified by the `taskId` (whose value is stored in the `$TASK_IS` variable).

#### Step 3

As soon as the status changes from `processing-in-progress` to `processing-completed` (or `processing-error`), print the `response` , including the `resourceId` (which in this case is a Subscription Id).


### Create subscription request JSON body

The created subscription is defined by a JSON document that is sent as the body of the `POST subscriptions` request.

In the example above, that JSON document is stored in the `create-subscription-basic.json` file:


```shell
{{% embed-code "rv/api/create-subscription-basic.json" %}}
```




