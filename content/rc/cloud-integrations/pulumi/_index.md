---
Title: The Redis Cloud Pulumi provider
LinkTitle: Pulumi
description: Explains how to use Pulumi to provision Redis Cloud infrastructure
weight: $weight
alwaysopen: false
categories: ["RC"]
aliases: /rc/cloud-integrations/pulumi/
         /rc/cloud-integrations/pulumi.md
---

[Pulumi](https://www.pulumi.com/) is an automation tool that allows you to easily provision infrastructure as code. Pulumi allows developers to write infrastructure code using programming languages rather than using domain-specific languages.

With the [Redis Cloud Resource Provider](https://www.pulumi.com/registry/packages/rediscloud/), you can create Redis Cloud resources in a programming language. The Pulumi Redis Cloud Provider supports the following programming languages:

* TypeScript
* Python
* C#
* Java
* Go
* YAML

The Redis Cloud Pulumi provider is based on the [Redis Cloud Terraform provider]({{<relref "/rc/cloud-integrations/terraform">}}).

{{<note>}}
The Redis Cloud Pulumi Redis Cloud provider supports Flexible subscriptions. It does not support Fixed subscriptions.
{{</note>}}

See [Get started with Pulumi]({{< relref  "/rc/cloud-integrations/pulumi/get-started" >}}) for an example of how to use the Pulumi provider with Python.

## Resources and functions

Pulumi resources represent the fundamental units that make up cloud infrastructure. A provider can make functions available in its SDK and resource types. These functions are often used to acquire information that is not part of a resource.

The Redis Cloud Pulumi provider allows for the following resources:

* [`Subscription`](https://www.pulumi.com/registry/packages/rediscloud/api-docs/subscription/): The basic building block of a Redis Cloud subscription.
* [`SubscriptionDatabase`](https://www.pulumi.com/registry/packages/rediscloud/api-docs/subscriptiondatabase/): Represents a Redis database which belongs to a specific Redis Cloud subscription.
* [`SubscriptionPeering`](https://www.pulumi.com/registry/packages/rediscloud/api-docs/subscriptionpeering/): A VPC peering connection (AWS or GCP) to a specific Redis Cloud subscription.
* [`CloudAccount`](https://www.pulumi.com/registry/packages/rediscloud/api-docs/cloudaccount/): Represents an AWS account in which you want to deploy Redis Cloud infrastructure components.

    {{<note>}}
The "bring your own AWS account" option for Redis Cloud has been deprecated. The `CloudAccount` resource is only available for legacy Redis Cloud integrations.
    {{</note>}}

* [`ActiveActiveSubscription`](https://www.pulumi.com/registry/packages/rediscloud/api-docs/activeactivesubscription/): The basic building block of an active-active Redis Cloud subscription.
* [`ActiveActiveSubscriptionDatabase`](https://www.pulumi.com/registry/packages/rediscloud/api-docs/activeactivesubscriptiondatabase/): Represents a Redis database which belongs to a specific Redis Cloud active-active subscription.
* [`ActiveActiveSubscriptionRegions`](https://www.pulumi.com/registry/packages/rediscloud/api-docs/activeactivesubscriptionregions/): The different regions where the active-active subscription will be deployed.
* [`ActiveActiveSubscriptionPeering`](https://www.pulumi.com/registry/packages/rediscloud/api-docs/activeactivesubscriptionpeering/): A VPC peering connection (AWS or GCP) to a specific Redis Cloud active-active subscription.

It also allows for the following functions:

* [`GetCloudAccount`](https://www.pulumi.com/registry/packages/rediscloud/api-docs/getcloudaccount/): Get the information related to the AWS account.

    {{<note>}}
The "bring your own AWS account" option for Redis Cloud has been deprecated. The `CloudAccount` resource is only available for legacy Redis Cloud integrations.
    {{</note>}}

* [`GetDataPersistence`](https://www.pulumi.com/registry/packages/rediscloud/api-docs/getdatapersistence/): Get the type of database persistence.
* [`GetDatabase`](https://www.pulumi.com/registry/packages/rediscloud/api-docs/getdatabase/): Get the information related to a specific database.
* [`GetDatabaseModules`](https://www.pulumi.com/registry/packages/rediscloud/api-docs/getdatabasemodules/): Get the capabilities for a specific database.
* [`GetPaymentMethod`](https://www.pulumi.com/registry/packages/rediscloud/api-docs/getpaymentmethod/): Get the payment method related to the Redis Cloud account.
* [`GetRegions`](https://www.pulumi.com/registry/packages/rediscloud/api-docs/getregions/): Get the regions related to an active-active subscription
* [`GetSubscription`](https://www.pulumi.com/registry/packages/rediscloud/api-docs/getsubscription/): Get the information related to a specific subscription.
* [`GetSubscriptionPeerings`](https://www.pulumi.com/registry/packages/rediscloud/api-docs/getsubscriptionpeerings/): Get the VPC peerings (AWS or GCP) related to a specific subscription.

## More info

- [Get started with Pulumi]({{< relref  "/rc/cloud-integrations/pulumi/get-started" >}})
- [Redis Cloud Pulumi registry](https://www.pulumi.com/registry/packages/rediscloud/)
- [Pulumi documentation](https://www.pulumi.com/docs/)
