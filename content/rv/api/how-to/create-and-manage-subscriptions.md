---
Title: Create and manage Subscriptions
description: This article describes how to create and manage a subscription using `cURL` commands.
weight: 60
alwaysopen: false
categories: ["RC Pro"]
---
This article describes how to create and manage a subscription using `cURL` commands.

For an introduction to using `cURL` with API operations, see "[Using the cURL HTTP client]({{< relref  "/rv/api/how-to/using-curl#using-the-curl-http-client" >}})".

## Create a subscription

The API operation that creates a subscription is `POST /subscriptions`.

The following Linux shell script sends a `POST /subscriptions` and waits for a subscription Id. When the subscription Id is received, the **processing phase** is completed and the subscription is in the **provisioning phase** (in the `pending` status).

### Prerequisites

- Define the expected variables needed to use the API:

```shell
{{% embed-code "rv/api/05-set-variables.sh" %}}
```

### Subscription creation script

You can run the **create subscription** script using a command line `bash path/script-name.sh`.

Below is the sample script that you can use as a reference to calling the API operation to create a subscription. The script contains 3 primary steps that are explained below.

Note that the script relies on the pre-requisite variables to be set (see above), as well as on the `jq` tool (JSON command-line processor)

```shell
{{% embed-code "rv/api/10-create-subscription.sh" %}}
```

#### Notes on the subscription creation script

##### Step 1

Executes a `POST` request to `subscriptions` with the defined parameters and a JSON body located within a separate JSON file.

The POST response is a JSON document that contains the `taskId`, which is stored in a variable called `TASK_ID` that is used later to track the progress of the request's processing.

##### Step 2

Query the API for the status of the subscription creation request, identified by the `taskId` (whose value is stored in the `$TASK_IS` variable).

##### Step 3

As soon as the status changes from `processing-in-progress` to `processing-completed` (or `processing-error`), print the `response` , including the `resourceId` (which in this case is a Subscription Id).

At this point, if the processing phase completed successfully, the subscription is visible in the [Redis Labs management site](https://app.redislabs.com) in the `pending` status, indicating that it is being provisioned.

You can continue tracking the created subscription throughout its provisioning phase until it reaches the "`active`" state using the "`GET /subscriptions/{subscriptionId}`" API operation.

### Subscription JSON body

The created subscription is defined by a JSON document that is sent as the body of the `POST subscriptions` request.

In the example above, that JSON document is stored in the `create-subscription-basic.json` file:

```shell
{{% embed-code "rv/api/create-subscription-basic.json" %}}
```

#### Notes

- To use the sample JSON document in your own Account, you must modify the following parameters:
    - **`paymentMethodId`** - Specify a payment method that is defined for your account. You can lookup the payment method identifier using the "`GET /payment-methods`" API operation.
    - **`cloudAccountId`** - Specify a cloud account that is defined for your account. You can lookup the cloud accounts identifiers using the "`GET /cloud-accounts`" API operation.(or use "`"cloudAccountId": 1`" to specify that you wish to use Redis Labs internal resources)
- The JSON document contain 2 primary segments: Subscription specification, and Databases specification
- When creating a subscription, you must specify one or more databases in the "`databases`" array of the above JSON file
- you can copy-and-paste the contents of the JSON file into the `POST /subscriptions` operation in the [Swagger UI](https://api-beta1.redislabs.com/beta1/swagger-ui.html). For details, see "[Using API with the Swagger User Interface]({{< relref  "/rv/api/how-to/using-curl#swagger-user-interface" >}})"

{{% note %}}
The Swagger UI generates default JSON examples for `POST` and `PUT` operations. You can reference these examples and modify them to fit your specific needs and account settings. The examples will fail if used as-is.
{{% /note %}}
