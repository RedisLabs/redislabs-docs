---
Title: Redis Cloud Terraform provider
LinkTitle: Terraform
description: 
weight: $weight
alwaysopen: false
toc: "true"
headerRange: "[1-3]"
categories: []
aliases: 
---

[Terraform](https://developer.hashicorp.com/terraform) is an open source automation tool developed by Hashicorp that allows you to easily provision infrastructure as code.

Redis develops and maintains a [Terraform provider for Redis Cloud](https://registry.terraform.io/providers/RedisLabs/rediscloud/latest). The Redis Cloud Terraform provider allows many of the same actions as found in the [Redis Cloud API]({{< relref  "/rc/api" >}}).

{{< note >}}
The Redis Cloud Terraform provider supports Flexible subscriptions. It does not support Fixed subscriptions.
{{< /note >}}

See [Get started with Terraform]({{< relref  "/rc/cloud-integrations/terraform/get-started" >}}) for an example of how to use the Terraform provider.

## Data sources and Resources

The Terraform provider represents API actions as data sources and resources. Data sources are read-only and allow you to get information, while resources allow you to create and manage infrastructure.

The Redis Cloud Terraform provider allows for the following data sources:

- [Subscriptions](https://registry.terraform.io/providers/RedisLabs/rediscloud/latest/docs/data-sources/rediscloud_subscription)
- [Databases](https://registry.terraform.io/providers/RedisLabs/rediscloud/latest/docs/data-sources/rediscloud_database)
- [Database modules](https://registry.terraform.io/providers/RedisLabs/rediscloud/latest/docs/data-sources/rediscloud_database_modules)
- [Cloud accounts](https://registry.terraform.io/providers/RedisLabs/rediscloud/latest/docs/data-sources/rediscloud_cloud_account)
- [Supported persistence options](https://registry.terraform.io/providers/RedisLabs/rediscloud/latest/docs/data-sources/rediscloud_data_persistence)
- [Payment methods](https://registry.terraform.io/providers/RedisLabs/rediscloud/latest/docs/data-sources/rediscloud_payment_method)
- [Supported cloud provider regions](https://registry.terraform.io/providers/RedisLabs/rediscloud/latest/docs/data-sources/rediscloud_regions)
- [VPC peering connections](https://registry.terraform.io/providers/RedisLabs/rediscloud/latest/docs/data-sources/rediscloud_subscription_peerings)

It also allows you to create and manage the following resources:

- [Subscriptions](https://registry.terraform.io/providers/RedisLabs/rediscloud/latest/docs/resources/rediscloud_subscription)
- [Databases](https://registry.terraform.io/providers/RedisLabs/rediscloud/latest/docs/resources/rediscloud_subscription_database)
- [VPC peering connections](https://registry.terraform.io/providers/RedisLabs/rediscloud/latest/docs/resources/rediscloud_subscription_peering)
- [Cloud accounts](https://registry.terraform.io/providers/RedisLabs/rediscloud/latest/docs/resources/rediscloud_cloud_account)
- [Active-Active subscriptions](https://registry.terraform.io/providers/RedisLabs/rediscloud/latest/docs/resources/rediscloud_active_active_subscription)
- [Active-Active databases](https://registry.terraform.io/providers/RedisLabs/rediscloud/latest/docs/resources/rediscloud_active_active_subscription_database)
- [Active-Active regions](https://registry.terraform.io/providers/RedisLabs/rediscloud/latest/docs/resources/rediscloud_active_active_subscription_regions)
- [Active-Active VPC peering connections](https://registry.terraform.io/providers/RedisLabs/rediscloud/latest/docs/resources/rediscloud_active_active_subscription_peering)


## More info

- [Get started with Terraform]({{< relref  "/rc/cloud-integrations/terraform/get-started" >}})
- [Redis Cloud Terraform Registry](https://registry.terraform.io/providers/RedisLabs/rediscloud/latest/docs)
- [Terraform documentation](https://developer.hashicorp.com/terraform/docs)
- [Terraform configuration syntax](https://developer.hashicorp.com/terraform/language/syntax/configuration)