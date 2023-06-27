---
Title: The Pulumi Redis Cloud Resource Provider
LinkTitle: Pulumi
description: Explains how to use Pulumi to provision Redis Cloud resources
weight: $weight
alwaysopen: false
categories: ["RC"]
aliases: /rc/cloud-integrations/pulumi/
         /rc/cloud-integrations/pulumi.md
---

## Introduction to Pulumi

Pulumi has gained significant popularity within the developer community due to its innovative approach to infrastructure as code (IaC) and its ability to simplify and streamline the process of cloud resource provisioning and management. Unlike traditional IaC tools, Pulumi allows developers to write infrastructure code using familiar programming languages, such as Python, JavaScript, TypeScript, and Go, rather than using domain-specific languages.

This developer-friendly approach makes it easier for software engineers to leverage their existing programming skills and apply them to infrastructure provisioning, making the learning curve smoother. Pulumi's support for multiple programming languages also provides flexibility and caters to a wider range of developers, enabling teams to collaborate effectively and work with their preferred language.

## The Pulumi Redis Cloud Resource Provider

With the recent availability of the [Redis Cloud Resource Provider](https://www.pulumi.com/registry/packages/rediscloud/), developers can now take advantage of this popular technology to create Redis Cloud resources in their favorite programming language. As of this writing, the Pulumi Redis Cloud Provider supports the following programming languages :

* TypeScript
* Python
* C#
* Java
* Go
* YAML

The Pulumi Redis Cloud Provider is based upon the TerraForm Redis Cloud Provider, thus for those who have experience using the TerraForm provider should quickly grasp the concepts behind the Pulumi provider.

{{<note>}}
The provider supports the creation of "Flexible/Annual" subscriptions, but cannot be used to create "Fixed" subscriptions
{{</note>}}

Let's examine an example of creating a "Flexible" Redis Cloud subscription using Python.

1.  Make sure you have your [Pulumi environment installed](https://www.pulumi.com/docs/install/).

1.  In your Python project, create an empty folder and from this folder run `pulumi new rediscloud-python`.

1.  Next, enter a project name, description, and stack name.

1.  The next step will ask for your Redis Cloud access and secret keys. Since Pulumi uses the Redis Cloud API in the background, an **access Key** and **secret key** are required. For more information on creating these keys, please refer to [Cloud API Keys]({{< relref "/rc/api/get-started/manage-api-keys.md" >}})

1.  Next, enter the credit card type (Visa, Mastercard) of the card on file with your Redis Cloud account.

1.  Finally, enter the last four numbers of the card on file with your Redis Cloud account.

Once these steps are completed, the dependencies needed for the project will be installed and a Python virtual environment will be created.

The Pulumi Python project includes three main files :

1.  The **Pulumi.yaml** file : A metadata file which is used to help configure the Python runtime environment.

1.  The **Pulumi.YOUR_PROJECT_NAME.yaml** file : Contains the information related to the Cloud API access and secret key, credit card type and last 4 digits.

1.  The **__main__.py** file : A Pulumi template file which creates a **Redis Cloud Flexible subscription**. Use this template file as a starting point to create the subscription in a specified cloud provider and the specifications of the database (this includes memory, throughput, Redis modules etc).

## Pulumi Redis Cloud Provider Resources and Functions

Pulumi `resources` represent the **fundamental units that make up cloud infrastructure**. A provider may make `functions` available in its SDK as well as resource types. These `functions` are often **used to acquire information that is not part of a resource**. 

Pulumi Redis Cloud Provider `resources` include :

* `Subscription`: The basic building block of a Redis Cloud subscription.
* `SubscriptionDatabase` : Represents a Redis database which belongs to a specific Redis Cloud subscription.
* `SubscriptionPeering` : A VPC peering connection (AWS or GCP) to a specific Redis Cloud subscription.
* `CloudAccount` : Represents an AWS account in which you want to deploy Redis Cloud infrastructure components.

{{<note>}}
The "bring your own AWS account" for Redis Cloud has now been deprecated. The "CloudAccount" resource is only made available for legacy Redis Cloud integrations.
{{</note>}}

* `ActiveActiveSubscription`: The basic building block of an active-active Redis Cloud subscription.
* `ActiveActiveSubscriptionDatabase`: Represents a Redis database which belongs to a specific Redis Cloud active-active subscription.
* `ActiveActiveSubscriptionRegions`: The different regions where the active-active subscription will be deployed.
* `ActiveActiveSubscriptionPeering`: A VPC peering connection (AWS or GCP) to a specific Redis Cloud active-active subscription.

Pulumi Redis Cloud Provider `functions` include :

* `GetCloudAccount`: Get the information related to the AWS account.

{{<note>}}
The "bring your own AWS account" for Redis Cloud has now been deprecated. The "CloudAccount" resource is only made available for legacy Redis Cloud integrations.
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

## Redis Cloud Subscription Types

Using the Pulumi Redis Cloud Provider, you can provision two different types of Redis Cloud subscriptions :

### Basic Subscription

In order to create a minimal basic subscription, you will need to define the following resources in your configuration file :

* `rediscloud_subscription`: represents the Redis Cloud subscription you wish to create
  * **Cloud Provider Information**: The information related to the Cloud Provider you wish to deploy this subscription to.
  * **Creation Plan Information**: Metadata used to determine the most optimal cloud infrastructure footprint needed to support the different databases hosted in the subscription.

* `rediscloud_subscription`:

### Active-Active Subscriptions

In order to create an active-active subscription, you will need to define the following resources in your configuration file :