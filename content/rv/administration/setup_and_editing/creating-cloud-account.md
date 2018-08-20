---
Title: Creating a Redis Enterprise VPC (RV) Cloud Account
description: 
weight: $weight
alwaysopen: false
---
## What is a Cloud Account?

A RV Cloud Account contains all necessary credentials and information
for an account with your cloud provider. This Cloud Account enables RV
to create, manage, and monitor Cloud resources automatically on your
behalf.

Once a Cloud Account is set up you can reuse it with several
subscriptions.

## Create a new Cloud Account

To create a RV Cloud Account, please select **Cloud Accounts** from the
right side menu. Please follow [our
instructions](/redis-cloud-private-documentation/how-to/creating-aws-user-redis-cloud-private/)
on how to set up a user for RV to use on your AWS account.\
To create a new Cloud Account, click on the '**+**' button.

Please enter the following details:

1.  Account Name - Give the account a name so you could recognize him
2.  AWS\_ACCESS\_KEY\_ID - RV user's AWS access key
3.  AWS\_SECRET\_ACCESS\_KEY - RV user's AWS secret key
4.  AWS Console User - RV AWS UI console user
5.  AWS Console password - RV AWS UI console user's password
6.  IAM Users sign-in link - This is the link you use to log into the
    AWS console (e.g.
    https://ACCOUNT-ID-WITHOUT-HYPENS.signin.aws.amazon.com/console)
