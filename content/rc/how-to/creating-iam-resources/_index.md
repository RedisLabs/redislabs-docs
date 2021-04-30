---
Title: Creating IAM Entities for AWS Cloud Accounts
description:
weight: 30
categories: ["RC"]
---
For most Redis Enterprise Cloud Flexible or Annual subscriptions deployed to Amazon Web Services (AWS), we manage the supporting infrastructure for you in dedicated AWS accounts.
Redis Enterprise Cloud Annual subscriptions let you manage this infrastructure with your own AWS accounts.
You'll want these accounts to be separate from any AWS application accounts
and you'll need to create some dedicated [identity and access management](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html) (IAM) entities to allow us manage the infrastructure for you.

In the new AWS account, you need to create:

- An **instance role**
- A user with an **access key**
- A role that grants **AWS console access**

Make sure that you save the access key in a secure location so that you can enter the key when you create the Redis Cloud account.

{{< warning >}}
We use the provided credentials to configure your AWS environment and provision required resources.

To make sure that we can manage your AWS resources, you must not:

- Manually change the configurations of provisioned resources, such as security groups
- Manually stop or terminate provisioned instances
{{< /warning >}}

For more about creating an AWS user, see the [AWS IAM documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).

We offer three methods for creating these IAM resources:

- Via [CloudFormation]({{<relref "/rc/how-to/creating-iam-resources/cloudformation.md">}}) - the 'AWS native' automation tool
- Via [Terraform]({{<relref "/rc/how-to/creating-iam-resources/terraform.md">}}) - this has the most extensive support for further automation within the Redis world
- Via the [AWS Console]({{<relref "/rc/how-to/creating-iam-resources/creating-aws-user-redis-enterprise-vpc.md">}})
