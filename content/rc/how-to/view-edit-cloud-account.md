---
Title: Create and Edit a Cloud Account for Redis Cloud Ultimate
description:
weight: 20
alwaysopen: false
categories: ["RC"]
aliases: /rv/how-to/view-edit-cloud-account/
        /rv/how-to/creating-cloud-account/
        /rc/how-to/creating-cloud-account/
---
In Redis Cloud Ultimate subscriptions, most customers build their subscriptions in our AWS accounts
so that we can take responsibility to make sure that the infrastructure is in optimal condition.
If you need to build your subscriptions in your own AWS accounts,
we need to have access to your AWS account to help with monitoring, maintenance and technical support.

To provide us with secure authorization to access your AWS accounts, you need to:

1. Create a programmatic user and provide us with the access key and secret access key for that user.
1. Create a console role and provide us with that role name.

To create or edit a cloud account in Redis Cloud:

1. In **Cloud Accounts**, either:
    - Click ![Add](/images/rs/icon_add.png#no-click "Add") to create an new account.
    - Click on the account that you want to edit and then click **Edit**.
1. Enter the cloud account details:
    - **Account Name** - A meaningful name for the account.
    - **AWS_ACCESS_KEY_ID** - The AWS access key for the programmatic user
    - **AWS_SECRET_ACCESS_KEY** - The AWS secret access key for the programmatic user
    - **IAM Role Name** - The name of the console role with access to the console
1. Click **Save**.

You can click **Delete** to delete your Cloud Account from Redis Cloud,
but only if it has no active subscription related to it.
