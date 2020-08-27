---
Title: Evaluating Cost Before Deployment
description: How to evaluate the cost of a specific subscription or database without changing existing resources.
weight: 65
alwaysopen: false
categories: ["RC"]
aliases: /rv/api/how-to/dry-run-cost-evaluations/
---
When you change your subscriptions and databases you also change the cost of your deployment.
With a **dry-run request**, you can evaluate the impact that subscription and databases changes cause before you deploy these changes:

- Create subscription
- Create a database
- Update a database

## Defining a dry-run request

API operations that support dry-run requests accept the `dryRun` boolean parameter in the JSON request body.

For example, the JSON body of a create subscription request can include the `dryRun=true` parameter:

```shell
{{% embed-code "rv/api/create-subscription-basic-dry-run.json" %}}
```

## Executing a dry-run request

Dry-run requests behave like regular request except that no changes are made to existing resources.
A dry-run request produces a cost evaluation report for the subscription.

| API Operation | `dryRun=false` (default) | `dryRun=true` |
|---|---|---|
| **Create subscription** | Create a subscription | Returns a cost evaluation report of the planned subscription |
| **Create database** | Creates a new database in the subscription | Returns a cost evaluation report for the relevant subscription |
| **Update database** | Changes the specified database | Returns a cost evaluation report and evaluates whether the relevant subscription requires additional resources base on the database modification |

### Example of a dry-run response

Here is an example of the pricing response section of a dry-run request:

```json
  "response": {
    "resource": {
      "pricing": [
        {
          "type": "Shards",
          "quantity": 2,
          "quantityMeasurement": "shards",
          "pricePerUnit": 0.308,
          "priceCurrency": "USD",
          "pricePeriod": "hour"
        },
        {
          "type": "EBS Volume",
          "quantity": 71,
          "quantityMeasurement": "GB"
        },
        {
          "type": "c5.xlarge",
          "quantity": 2,
          "quantityMeasurement": "instances"
        },
        {
          "type": "m5.large",
          "quantity": 1,
          "quantityMeasurement": "instances"
        }
      ]
    }
  }
```

The structure of the pricing response depends on the cloud account used by the request:

- For a customer provided cloud account - The response includes pricing data for the shards, and a lists the resources required (storage and compute instances) without pricing data
- For a Redis Labs internal cloud account (`cloudAccountId = 1`) - The response includes pricing data for both shards and the resources required (storage and compute instances)
