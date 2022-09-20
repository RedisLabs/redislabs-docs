---
Title: Create and manage subscriptions
description: This article describes how to create and manage a subscription using `cURL` commands.
weight: 10
alwaysopen: false
categories: ["RC"]
aliases: /rv/api/how-to/create-and-manage-subscriptions/
         /rc/api/how-to/create-and-manage-subscriptions/
         /rc/api/how-to/create-and-manage-subscriptions.md         
         /rc/api/example/manage-subscriptions/
         /rc/api/examples/manage-subscriptions.md
---

You can use the Redis Enterprise Cloud REST API to create and manage a subscription.

## Create a subscription

Use `POST /v1/subscriptions` to create a subscription.

```sh
POST "https://[host]/v1/subscriptions"
{
    "name": "Basic subscription example",
    "paymentMethodId": <payment_id>,
    "cloudProviders": [
      {
        "cloudAccountId": <account_id>,
        "regions": [
          {
            "region": "us-east-1",
            "networking": {
              "deploymentCIDR": "10.0.0.0/24"
            }
          }
        ]
      }
    ],
    "databases": [
      {
        "name": "Redis-database-example",
        "memoryLimitInGb": 1.1
      }
    ]
}
```

To use the sample JSON document in your own account, you must modify these parameters:

- **`paymentMethodId`** - Specify a payment method that is defined for your account.

    You can look up the payment method identifier using the `GET /payment-methods` API operation.

    If you subscribed to Redis Enterprise Cloud through the GCP Marketplace, you do not need to pass this field in your API requests.

- **`cloudAccountId`** - Specify a cloud account that is defined for your account.

    You can look up cloud account identifiers using the `GET /cloud-accounts` API operation or use `"cloudAccountId": 1` to use internal resources.

    If you subscribed to Redis Enterprise Cloud through the GCP Marketplace, use the value `1` for this field.

- The JSON document contains two primary segments: subscription specification and databases specification.
- When you create a subscription, you must specify one or more databases in the "`databases`" array of the above JSON file.
- You can [copy-and-paste]({{< relref  "/rc/api/get-started/use-rest-api.md#swagger-user-interface" >}}) the contents of the JSON file into the `POST /subscriptions` operation in the [Swagger UI](https://api.redislabs.com/v1/swagger-ui.html).

{{< note >}}
The Swagger UI generates default JSON examples for `POST` and `PUT` operations. You can reference these examples and modify them to fit your specific needs and account settings. The examples will fail if used as-is.
{{< /note >}}

The POST request returns a JSON document with a `taskId` of the task that is creating the subscription. You can use `GET /v1/tasks/<taskId>` to track the status of this task.

## Update a subscription

Use `PUT /v1/subscriptions/<susbscriptionId>` to update a subscription.

```sh
PUT "https://[host]/v1/subscriptions/<susbscriptionId>"
{
    "name": "new-subscription-name",
    "paymentMethodId": <payment_id>
}
```

You can only change the following settings with this endpoint:
- **`name`** - Specify a new name for your subscription.

- **`paymentMethodId`** - Specify a different payment method that is defined for your account.

    You can look up a payment method identifier using the `GET /payment-methods` API operation.

The PUT request returns a JSON document with a `taskId` of the task that is updating the subscription. You can use `GET /v1/tasks/<taskId>` to track the status of this task.
