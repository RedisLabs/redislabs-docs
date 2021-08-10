---
Title: Manage cloud accounts
LinkTitle: Cloud accounts
description: Describes how to provision your Redis Enterprise Cloud subscription to use existing cloud provider accounts.
weight: 40
alwaysopen: false
categories: ["RC"]
aliases: /rv/how-to/view-edit-cloud-account/
         /rv/how-to/creating-cloud-account/
         /rc/how-to/creating-cloud-account/
         /rc/how-to/view-edit-cloud-account/
         /rc/how-to/view-edit-cloud-account.md
         /rc/cloud-accounts/
         /rc/cloud-accounts.md
---

Many customers use cloud provider accounts provisioned and maintained by Redis Labs.  

Customers with existing Amazon Web Services (AWS) accounts can provision their Flexible or Annual subscriptions to use their existing AWS accounts.  

To do so, you associate your existing AWS account as a _cloud account_ for your subscription.  This requires setting up and entering credentials that enable monitoring, maintenance, and technical support of your subscription.

You need to create:

1. A programmatic user and provide us with the access key and secret access key for that user.
1. A console role and provide us with that role name.

These resources need to exist before adding the cloud account to your subscription.  To learn more, see [Create IAM resources]({{<relref "/rc/cloud-accounts/iam-resources/">}}).

{{<note>}}
Once an AWS account has been configured as a cloud account, you must _not_:
- Manually change the configuration of required resources, such as security groups<br/>
- Manually suspend or stop (terminate) provisioned resources</br></br>
{{</note>}}

## Add or edit a cloud account

To create or edit a cloud account in Redis Enterprise Cloud:

1. Sign into the [admin console](https://app.redislabs.com/) and then select the target subscription.

1. From the console menu, select **Cloud Accounts** and then either:

    - Select the ![Add](/images/rs/icon_add.png#no-click "Add") to add a new account.

    - Select the account that you want to edit and then select **Edit**.

1. Enter the cloud account details, which include:

    - **Account Name** - A meaningful name for the account
    - **AWS_ACCESS_KEY_ID** - The AWS access key for the programmatic user
    - **AWS_SECRET_ACCESS_KEY** - The AWS secret access key for the programmatic user
    - **IAM Role Name** - The name of the console role with access to the console

1. Select **Save**.

Use the **Delete** button to remove a cloud account from your subscription.

## Dedicated IAM resources

We recommend creating dedicated identity and access management (IAM) resources to manage the infrastructure of your subscriptions.

To learn more, see [Create IAM resources for AWS cloud accounts]({{<relref "/rc/cloud-accounts/iam-resources/">}}).
