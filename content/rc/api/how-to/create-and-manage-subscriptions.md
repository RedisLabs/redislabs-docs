---
Title: Create and manage Subscriptions
description: This article describes how to create and manage a subscription using `cURL` commands.
weight: 60
alwaysopen: false
categories: ["RC"]
aliases: /rv/api/how-to/create-and-manage-subscriptions/
---
You can use `cURL` commands to create and manage a subscriptions
with the [CURL HTTP client]({{< relref "/rc/api/how-to/using-curl#using-the-curl-http-client" >}}).

## Create a subscription

The API operation that creates a subscription is: `POST /subscriptions`

The following Linux shell script sends a `POST /subscriptions/` and waits for a cloud account ID.
When the cloud account ID is received, the processing phase is complete and the provisioning phase starts.

### Prerequisites

- Install `jq` on your machine: `sudo apt install jq`
- Define the expected variables needed to use the API:

```shell
{{% embed-code "rv/api/05-set-variables.sh" %}}
```

### Subscription JSON body

The created subscription is defined by a JSON document that is sent as the body of the `POST subscriptions` request.

In the example below, that JSON document is stored in the `create-subscription-basic.json` file:

```shell
{{% embed-code "rv/api/create-subscription-basic.json" %}}
```

### Subscription creation script

You can run the **create subscription** script from the command line with: `bash path/script-name.sh`

Below is the sample script that you can use as a reference to call the API operation to create a subscription.
The script contains the steps that are explained below.

```shell
{{% embed-code "rv/api/10-create-subscription.sh" %}}
```

#### Step 1 of the subscription creation script

This step executes a `POST` request to `subscriptions` with the defined parameters and a JSON body located within a separate JSON file.

The POST response is a JSON document that contains the `taskId`,
which is stored in a variable called `TASK_ID` that is used later to track the progress request.

#### Step 2 the subscription creation script

This step queries the API for the status of the subscription creation request based on the `taskId` stored in the `$TASK_IS` variable.

#### Step 3 the subscription creation script

When the status changes from `processing-in-progress` to `processing-completed` (or `processing-error`),
this step prints the `response`, including the `resourceId`.
In this case the `resourceId` is a subscription ID.

If the processing phase completed successfully, the subscription is visible
in the [Redis Labs management site](https://app.redislabs.com) in the `pending` status.
This status indicates that the subscription is being provisioned.

You can use the `GET /subscriptions/{subscriptionId}` API operation to track the created subscription
until it changes to the `active` state.

### Additional subscription parameters

To use the sample JSON document in your own account, you must modify these parameters:

- **`paymentMethodId`** - Specify a payment method that is defined for your account.
    You can lookup the payment method identifier using the `GET /payment-methods` API operation.
    If you subscribed to Redis Cloud through the GCP Marketplace, you do not need to pass this field in your API requests.
- **`cloudAccountId`** - Specify a cloud account that is defined for your account.
    You can lookup the cloud accounts identifiers using the `GET /cloud-accounts` API operation or use `"cloudAccountId": 1` to use Redis Labs internal resources.
    If you subscribed to Redis Cloud through the GCP Marketplace, use the value `1` for this field.

- The JSON document contains 2 primary segments: subscription specification and databases specification.
- When you create a subscription, you must specify one or more databases in the "`databases`" array of the above JSON file.
- You can [copy-and-paste]({{< relref  "/rc/api/how-to/using-curl#swagger-user-interface" >}}) the contents of the JSON file into the `POST /subscriptions` operation in the [Swagger UI](https://api.redislabs.com/v1/swagger-ui.html).

{{< note >}}
The Swagger UI generates default JSON examples for `POST` and `PUT` operations. You can reference these examples and modify them to fit your specific needs and account settings. The examples will fail if used as-is.
{{< /note >}}
