---
Title: Create IAM Resources
linkTitle: Create IAM Resources
description:
weight: 30
categories: ["RC"]
---
We offer three ways to create Cloud Accounts. 

{{< note >}}
Only one Cloud Account is allowed per AWS Account and the following methods assume that this restriction is being followed. If you attempt to construct the IAM resources for two Cloud Accounts you'll run into various AWS errors.
{{< /note >}}

- Via [CloudFormation]({{<relref "cloudformation.md">}}) - the 'AWS native' automation tool. The simplest for those experienced with CloudFormation and perhaps the least error-prone of any of the methods. 
- Via [Terraform]({{<relref "terraform.md">}}) - this has the most extensive support for further automation within the Redis world (and is the fastest mechanism for creating these IAM resources).
- Via the [AWS Console]({{<relref "creating-aws-user-redis-enterprise-vpc.md">}}) - the mechanism requiring the least knowledge and experience. 
