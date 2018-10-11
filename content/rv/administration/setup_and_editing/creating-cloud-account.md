---
Title: Creating a Redis Enterprise VPC (RV) Cloud Account
description: 
weight: $weight
alwaysopen: false
---
## What is a Cloud Account?

An RV Cloud Account contains all necessary credentials and information
for an account with your cloud provider. This Cloud Account enables RV
to create, manage, and monitor Cloud resources automatically on your
behalf.

Once a Cloud Account is set up you can reuse it with several
subscriptions.

## Create a new Cloud Account

To create an RV Cloud Account, please select **Cloud Accounts** from the
right side menu. Please follow [our
instructions]({{< relref "/rv/how-to/creating-aws-user-redis-enterprise-vpc.md" >}})
on how to set up a user for RV to use on your AWS account.\
To create a new Cloud Account, click on the '**+**' button.

Please enter the following details:

1. Account Name - Give the account a name so you could recognize it
1. AWS\_ACCESS\_KEY\_ID - RV user's AWS access key
1. AWS\_SECRET\_ACCESS\_KEY - RV user's AWS secret key
1. AWS Console User - RV AWS UI console user
1. AWS Console password - RV AWS UI console user's password
1. IAM Users sign-in link - This is the link you use to log into the
    AWS console (e.g.
    https://ACCOUNT-ID-WITHOUT-HYPHENS.signin.aws.amazon.com/console)
