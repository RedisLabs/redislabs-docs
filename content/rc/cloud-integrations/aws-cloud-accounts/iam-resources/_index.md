---
Title: Create IAM resources for AWS cloud accounts
linkTitle: Create IAM resources
description:
weight: $weight
categories: ["RC"]
aliases: /rc/how-to/creating-iam-resources
         /rc/cloud-accounts/iam-entities/
         /rc/cloud-accounts/iam-entities.md


---
For most Redis Enterprise Cloud Flexible or Annual subscriptions deployed to Amazon Web Services (AWS), we manage the supporting infrastructure for you in dedicated AWS accounts.

You can manage this infrastructure with your own AWS accounts.  

You'll want these accounts to be separate from any AWS application accounts 
and you'll need to create dedicated [identity and access management](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html) (IAM) resources to allow us to manage the infrastructure.

In the new AWS account, you need to create:

- An **instance role**
- A user with an **access key**
- A role that grants **AWS console access**

Save the access key in a secure location so that you can enter it when you [register the cloud account]({{<relref "/rc/cloud-integrations/aws-cloud-accounts/">}}) with your the Redis Enterprise Cloud subscription.

{{< warning >}}
We use the provided credentials to configure your AWS environment and provision required resources.

To make sure that we can manage your AWS resources, you must not:

- Manually change the configurations of provisioned resources, such as security groups
- Manually stop or terminate provisioned instances
{{< /warning >}}

For help creating an AWS user, see the [AWS IAM documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).

You can use one of the following tools to create IAM resources:

- [CloudFormation]({{<relref "/rc/cloud-integrations/aws-cloud-accounts/iam-resources/cloudformation.md">}}) - The AWS automation tool
- [Terraform]({{<relref "/rc/cloud-integrations/aws-cloud-accounts/iam-resources/terraform.md">}}) - Widely supported in the Redis community for additional automation
- The [AWS Console]({{<relref "/rc/cloud-integrations/aws-cloud-accounts/iam-resources/aws-console.md">}})
