---
Title: Performing cost evaluations
description: How to evaluate the cost of a specific subscription or database (without impacting existing resources)
weight: 65
alwaysopen: false
categories: ["RC Pro"]
---
This article describes how to evaluate the cost of a specific subscription or database, without impacting any existing resources. 

This feature is referred to as a **dry-run request** and it is available for the following API operations:

* Create Subscription
* Create database (in an existing subscription)
* Update database

### Defining a dry-run request

An API operation that supports dry-run requests accepts a `dryRun` boolean parameter in the JSON request body. This parameter impacts the request as follows:

Following is a create subscription request's JSON body that includes the `dryRun=true` parameter.

```shell
{{% embed-code "rv/api/create-subscription-basic-dry-run.json" %}}
```

### Executing a dry-run request

The dry-run create subscription request behaves similarly to standard create subscription request. The only difference is that no changes are made to existing resources, and the result of a dry-run request processing is a cost evaluation report for the subscription.


| API Operation | `dryRun=false` (default) | `dryRun=true` | 
|---|---|---|
| Create Subscription  | Creates a subscription without pre-evaluation of of cost | Processes the request, and returns a cost evaluation report of the planned subscription, **without** actually creating the subscription (or any impact to existing resources) | 
| Create database  | Creates a new database in the subscription, without pre-evaluation of of cost | Processes the request, and returns a cost evaluation report of for the existing subscription in which the database evaluation is performed. The cost evaluation report applies to the subscription as a whole, including the impact (if any) of adding an additional database (for example, additional resources may be needed for the new database). Note the cost evaluation is performed **without** actually creating the database (or any changes to the existing subscription of its existing resources) | 
| Update database  | Modifies the database as requested | Processes the request, and evaluates whether the database modification requires additional resources. The cost evaluation report applies to the subscription as a whole, including the impact (if any) of modifying the existing database (for example, additional resources may be needed for a resized database). Note the cost evaluation is performed **without** actually modifying the database (or any changes to the existing subscription of its existing resources) | 


