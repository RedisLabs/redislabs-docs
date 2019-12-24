---
Title: Creating a Cloud Account
description:
weight: 10
alwaysopen: false
categories: ["Cloud"]
---

A Redis Cloud Cloud Account which runs on your cloud infrastructure needs all necessary credentials and information
of your cloud account. This Cloud Account enables Redis Cloud to create, manage, and monitor Cloud resources automatically on your behalf.

Once a Cloud Account is set up you can reuse it with several subscriptions.

## Create a new Cloud Account

To create a Redis Cloud Cloud Account, please select **Cloud Accounts** from the
right side menu. Please follow [our
instructions]({{< relref "/rc/how-to/creating-aws-user-redis-enterprise-vpc.md" >}})
on how to set up a user for Redis Cloud to use on your AWS account.
To create a new Cloud Account, click on the '**+**' button.

Please enter the following details:

1. Account Name - Give the account a name so you could recognize it
1. AWS_ACCESS_KEY_ID - Redis Cloud user's AWS access key
1. AWS_SECRET_ACCESS_KEY - Redis Cloud user's AWS secret key
1. AWS Console User - Redis Cloud AWS UI console user
1. AWS Console password - Redis Cloud AWS UI console user's password
1. IAM Users sign-in link - This is the link you use to log into the
    AWS console (e.g.
    https://\<YOUR-ACCOUNT-ID-WITHOUT-HYPHENS>.signin.aws.amazon.com/console)
