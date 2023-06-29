---
Title: The Pulumi Redis Cloud Provider
LinkTitle: Pulumi
description: Explains how to use Pulumi to provision Redis Cloud infrastructure
weight: $weight
alwaysopen: false
categories: ["RC"]
aliases: /rc/cloud-integrations/pulumi/
         /rc/cloud-integrations/pulumi.md
---

## Introduction to Pulumi

Pulumi has gained significant popularity within the developer community due to its innovative approach to infrastructure as code (IaC) and its ability to simplify and streamline the process of cloud resource provisioning and management. Unlike traditional IaC tools, Pulumi allows developers to write infrastructure code using familiar programming languages, such as Python, JavaScript, TypeScript, and Go, rather than using domain-specific languages.

## The Pulumi Redis Cloud Provider

With the [Redis Cloud Resource Provider](https://www.pulumi.com/registry/packages/rediscloud/), developers can create Redis Cloud resources in their favorite programming language. The Pulumi Redis Cloud Provider supports the following programming languages :

* TypeScript
* Python
* C#
* Java
* Go
* YAML

The Pulumi Redis Cloud Provider is based upon the TerraForm Redis Cloud Provider.

{{<note>}}
The provider supports the creation of "Flexible/Annual" subscriptions, but cannot be used to create "Fixed" subscriptions
{{</note>}}

## Resources and functions

Pulumi **resources** represent the fundamental units that make up cloud infrastructure. A provider can make **functions** available in its SDK and resource types. These functions are often used to acquire information that is not part of a resource.

### Resources

Pulumi Redis Cloud Provider `resources` include :

* `Subscription`: The basic building block of a Redis Cloud subscription.
* `SubscriptionDatabase` : Represents a Redis database which belongs to a specific Redis Cloud subscription.
* `SubscriptionPeering` : A VPC peering connection (AWS or GCP) to a specific Redis Cloud subscription.
* `CloudAccount` : Represents an AWS account in which you want to deploy Redis Cloud infrastructure components.

{{<note>}}
The "bring your own AWS account" option for Redis Cloud has been deprecated. The "CloudAccount" resource is only available for legacy Redis Cloud integrations.
{{</note>}}

* `ActiveActiveSubscription`: The basic building block of an active-active Redis Cloud subscription.
* `ActiveActiveSubscriptionDatabase`: Represents a Redis database which belongs to a specific Redis Cloud active-active subscription.
* `ActiveActiveSubscriptionRegions`: The different regions where the active-active subscription will be deployed.
* `ActiveActiveSubscriptionPeering`: A VPC peering connection (AWS or GCP) to a specific Redis Cloud active-active subscription.

### Functions

Pulumi Redis Cloud Provider `functions` include :

* `GetCloudAccount`: Get the information related to the AWS account.

{{<note>}}
The "bring your own AWS account" option for Redis Cloud has been deprecated. The "CloudAccount" resource is only available for legacy Redis Cloud integrations.
{{</note>}}

* `GetDataPersistence`: Get the type of database persistence.
* `GetDatabase`: Get the information related to a specific database.
* `GetDatabaseModules`: Get the modules for a specific database.
* `GetPaymentMethod`: Get the payment method related to the Redis Cloud account.
* `GetRegions`: Get the regions related to an active-active 
* `GetSubscription`: Get the information related to a specific subscription.
* `GetSubscriptionPeerings`: Get the VPC peerings (AWS or GCP) related to a specific subscription.

{{<note>}}
For more information on the different Redis Cloud Provider Resources and Functions, please refer to Pulumi's [official documentation for the Redis Cloud provider](https://www.pulumi.com/registry/packages/rediscloud/api-docs/).
{{</note>}}

## Pulumi quickstart Python project

Let's examine an example of creating a "Flexible" Redis Cloud subscription using Python.

1.  Make sure you have your [Pulumi environment installed](https://www.pulumi.com/docs/install/).

1.  In your Python project, create an empty folder and from this folder run `pulumi new rediscloud-python`.

1.  Enter a project name, description, and stack name.

1.  Enter your Redis Cloud access and secret keys.

Since Pulumi uses the Redis Cloud API in the background, an **access key** and **secret key** are required. For more information on creating these keys, please refer to [Cloud API Keys]({{< relref "/rc/api/get-started/manage-api-keys.md" >}})

1.  Enter the credit card type (Visa, Mastercard) on file with your Redis Cloud account.

1.  Enter the last four numbers of the card on file with your Redis Cloud account.

Once these steps are completed, the dependencies needed for the project will be installed and a Python virtual environment will be created.

### Project files

The Pulumi Python project includes three main files :

1.  `pulumi.yaml` : A metadata file which is used to help configure the Python runtime environment.

1.  `pulumi.YOUR_PROJECT_NAME.yaml`: Contains the information related to the Cloud API access and secret key, credit card type and last 4 digits.

1.  `__main__.py`: A Pulumi template file that creates a Redis Cloud flexible subscription. Use this template file as a starting point to create the subscription with a cloud provider and define specifications for the database (this includes memory, throughput, Redis modules etc).
