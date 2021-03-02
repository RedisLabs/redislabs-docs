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

For example, the JSON body of a create subscription request body can include the `dryRun=true` parameter:


```shell
{{% embed-code "rv/api/create-subscription-dry-run-basic-request.json" %}}
```

## Executing a dry-run request

Dry-run requests behave like regular request except that no changes are made to existing resources.
A dry-run request produces a cost evaluation report for the subscription.

| API Operation | `dryRun=false` (default) | `dryRun=true` |
|---|---|---|
| **Create subscription** | Create a subscription | Returns a cost evaluation report of the planned subscription |
| **Create database** | Creates a new database in the subscription | Returns a cost evaluation report for the relevant subscription |
| **Update database** | Changes the specified database | Returns a cost evaluation report and evaluates whether the relevant subscription requires additional resources base on the database modification |


### Example of a dry-run request & response

This section demonstrates a complete example of a create subscription dry-run request and response. 

#### dry-run request body

Here is an example of the pricing request body:

```shell
{{% embed-code "rv/api/create-subscription-dry-run-request.json" %}}
```

1. The create subscription request contains the `"dryRun": true` parameter
2. The databases array contains the definitions of multiple database templates, named `database-a`,  `database-b`, `database-c` etc.
3. Note that the databases differ in structure (size, throughput measurement, replication, quantity etc.)

#### dry-run response

Here is an example of the pricing response section for the abve create subscription dry-run request:


```shell
{{% embed-code "rv/api/create-subscription-dry-run-response.json" %}}
```

{{</* note */>}}Some of the response content was omitted for brevity.{{</* /note */>}}

1. The `pricing` array contains an element for each database, containing the database name and cost evaluation related to that database
2. The database cost is measured in type and number of shards required for the specific database, as defined by the database template in the request. See [Cloud Pricing](https://redislabs.com/redis-enterprise-cloud/pricing)
3. The cost evaluation for each database is measured in quantity of the specific shard type required the requested database. The cost per shard is defined by the fields `pricePerUnit` (where `unit` is a shard of the specific type), `priceCurrency` and `pricePeriod`
4. For example, to calculate the total hourly cost of a database, use the following formula:  `pricePerUnit` * `quantity` 
5. The structure of the pricing response depends on the cloud account used by the request. There are two types of cloud accounts: a cloud account owned, named and managed by the customer (AWS only) and a "Redis Labs resources" cloud account (All cloud providers)
6. For a customer provided cloud account - The cost evaluation response lists the AWS resources required (storage and compute instances) without pricing data (which depends on the specific details of the customer's AWS account)
7. For a Redis Labs internal cloud account (defined a `cloudAccountId = 1` in the create subscription request) - The cost evaluation response includes a `MinimumPrice` element. This indicates the minimal hourly cost of the entire subscription. This minimum price will be charged if the sum of all shards for all the subscription's databases is less than the specified minimum price


### Viewing actual subscription cost

The `Get subscriptions` and `Get subscription by id` JSON response contains an element named `subscriptionPricing` that details the latest calculated cost of a subscription, grouped by shard type for all the databases in the subscription. 