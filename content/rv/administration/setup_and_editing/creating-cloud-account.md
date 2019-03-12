---
Title: Creating a Cloud Account
description: 
weight: 10
alwaysopen: false
categories: ["RV"]
---

A Redis Cloud Pro Cloud Account which runs on your cloud infrastructure will need all necessary credentials and information
of your cloud account. This Cloud Account enables Redis Cloud Pro to create, manage, and monitor Cloud resources automatically on your behalf.

Once a Cloud Account is set up you can reuse it with several subscriptions.

## Create a new Cloud Account

To create an Redis Cloud Pro Cloud Account, please select **Cloud Accounts** from the
right side menu. Please follow [our
instructions]({{< relref "/rv/how-to/creating-aws-user-redis-enterprise-vpc.md" >}})
on how to set up a user for Redis Cloud Pro to use on your AWS account.
To create a new Cloud Account, click on the '**+**' button.

Please enter the following details:

1. Account Name - Give the account a name so you could recognize it
1. AWS_ACCESS_KEY_ID - Redis Cloud Pro user's AWS access key
1. AWS_SECRET_ACCESS_KEY - Redis Cloud Pro user's AWS secret key
1. AWS Console User - Redis Cloud Pro AWS UI console user
1. AWS Console password - Redis Cloud Pro AWS UI console user's password
1. IAM Users sign-in link - This is the link you use to log into the
    AWS console (e.g.
    https://<YOUR-ACCOUNT-ID-WITHOUT-HYPHENS>.signin.aws.amazon.com/console)
