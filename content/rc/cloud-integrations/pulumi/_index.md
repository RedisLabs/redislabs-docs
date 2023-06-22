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
* Go
* YAML

The Pulumi Redis Cloud Provider is based upon the TerraForm Redis Cloud Provider, thus for those who have experience using the TerraForm provider should quickly grasp the concepts behind the Pulumi provider.

> NOTE : The provider supports the creation of "Flexible/Annual" subscriptions, but cannot be used to create "Fixed" subscriptions 

Let's examine an example of creating a "Flexible" Redis Cloud subscription using Python.

1.  Sign in to the [AWS console](https://console.aws.amazon.com/).

1.  Search AWS Marketplace for [Redis Enterprise Cloud - Flexible plan](https://aws.amazon.com/marketplace/pp/prodview-mwscixe4ujhkq).

    {{<image filename="images/rc/aws-marketplace-rc-flexible-plan.png" alt="The Redis Enterprise Cloud - Flexible plan listing on AWS Marketplace" >}}{{< /image >}}



If, for whatever reason, your AWS Marketplace account is disabled or otherwise unavailable, you won't be able to use your Flexible subscription until the billing method is updated.  For help, [contact support](https://redis.com/company/support/).
