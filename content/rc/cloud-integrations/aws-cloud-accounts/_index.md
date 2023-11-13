---
Title: Manage AWS cloud accounts
LinkTitle: AWS cloud accounts
description: Describes how to provision your Redis Cloud subscription to use existing cloud provider accounts.
weight: 40
alwaysopen: false
hidden: true
bannerText: Self-managed AWS accounts are deprecated, so this article has been archived.
bannerChildren: true
categories: ["RC"]
aliases: /rv/how-to/view-edit-cloud-account/
         /rv/how-to/creating-cloud-account/
         /rc/how-to/creating-cloud-account/
         /rc/how-to/view-edit-cloud-account/
         /rc/how-to/view-edit-cloud-account.md
         /rc/cloud-accounts/
         /rc/cloud-accounts.md
---

Many customers use cloud provider accounts provisioned and maintained by Redis.  

Customers with existing Amazon Web Services (AWS) accounts can provision their Flexible or Annual subscriptions to use their existing AWS accounts.  

To do so, you associate your existing AWS account as a _cloud account_ for your subscription.  This requires setting up and entering credentials that enable monitoring, maintenance, and technical support of your subscription.

To do this, you need:

1. A programmatic user with an access key and a secret access key for that user.
1. A console role that allows administrative access to the cloud account.

These resources need to exist before adding the cloud account to your subscription.  To learn more, see [Create IAM resources]({{<relref "/rc/cloud-integrations/aws-cloud-accounts/iam-resources">}}).

{{<note>}}
Once an AWS account has been configured as a cloud account, you must _not_:
- Manually change the configuration of required resources, such as security groups<br/>
- Manually suspend or stop (terminate) provisioned resources</br>
{{</note>}}

## View cloud account settings

To create or edit a cloud account in Redis Cloud:

1. Sign in to the [admin console](https://app.redislabs.com/) and then select the target subscription.

1. From the console menu, select **Account Settings** and then select the **Cloud Account** tab.

    This displays a list of cloud accounts associated with your Redis Cloud subscription.

    {{<image filename="images/rc/account-settings-cloud-account-tab.png" alt="Use the Cloud Account tab of the Account Settings screen to define cloud accounts for your Redis Cloud subscription." width="75%">}}{{< /image >}}

The **Cloud account** tab lets you manage cloud accounts associated with your Redis Cloud subscription.

The **Cloud Account** tab is not available (or supported) for Free or Fixed Redis Cloud subscriptions.  If you do not see a **Cloud Account** tab on the Account Settings page, verify that you have selected a Flexible or Annual subscription. 

## Add a new cloud account

To add a new cloud account to your Redis Cloud subscription, select the **Add** button from the Cloud Account tab of the Account Settings screen.

{{<image filename="images/rc/icon-cloud-account-add.png" alt="Use the Add button to add new cloud accounts to your Redis Cloud subscription." width="36px">}}{{< /image >}}

This displays the **Add cloud account** dialog

{{<image filename="images/rc/account-settings-prompt-add-cloud-account.png" alt="Use the Add cloud account prompt to enter the details of the cloud account." width="50%">}}{{< /image >}}

Each of the following fields are required.

|Setting|Description|
|-------|-----------|
| _Account name_ | A descriptive name for your cloud account settings |
| _AWS&nbsp;access&nbsp;key_ | The AWS access key for the programmatic user created to support your cloud account settings |
| _AWS&nbsp;secret&nbsp;key_ | The AWS secret key for the programmatic user created to support your cloud account settings |
| _IAM role name_ | The name of the AWS console role with access to the AWS console |

Use the **Add account** button to save your cloud account details.

{{<image filename="images/rc/button-cloud-account-add.png" alt="Use the Add account button to save the details of your new cloud account." width="140px">}}{{< /image >}}

Be sure to create the resources before adding the cloud account to your subscription, as they're used to verify access to the cloud account.  The details can be saved only after access is verified.

When problems occur, an information icon appears and the field is highlighted in red.  When this happens, the icon includes a tooltip that explains the issue.

{{<image filename="images/rc/account-settings-prompt-cloud-account-error.png" alt="When errors occur, the field is highlighted in red and a notification icon appears.  The icon tooltip describes the problem." width="50%">}}{{< /image >}}

If the **Add account** button is inactive, verify that:

- You've specified all field values correctly
- The resources exist in your AWS account
- Each resource provides the required level of access

For help, see [Create IAM resources]({{<relref "/rc/cloud-integrations/aws-cloud-accounts/iam-resources">}}).

## Edit cloud account details

To update the details of a cloud account associated with your Redis Cloud subscription, select the cloud account from the **Cloud account** tab and then select the **Edit** button.

{{<image filename="images/rc/icon-cloud-account-edit.png" alt="Use the Edit button to update cloud account details." width="36px">}}{{< /image >}}

This displays the **Edit cloud account** dialog:

{{<image filename="images/rc/account-settings-prompt-edit-cloud-account.png" alt="Use the Edit cloud account prompt to update the details of the cloud account." width="50%">}}{{< /image >}}

|Setting|Description|
|-------|-----------|
| _Account name_ | A descriptive name for your cloud account settings |
| _AWS access key_ | The AWS access key for the programmatic user created to support your cloud account settings |
| _AWS secret key_ | The AWS secret key for the programmatic user created to support your cloud account settings |
| <nobr>_AWS console username_</nobr> | The username for the AWS console |
| _AWS console password_ | The password for AWS console access |

Use the **Update account** button to save your changes.

{{<image filename="images/rc/button-cloud-account-update.png" alt="Use the Update account button to save the updated cloud account details." width="140px">}}{{< /image >}}

## Delete cloud account details

To remove a cloud account from your Redis cloud subscription, select the cloud account from the **Cloud account** tab and then select the **Delete** button.

{{<image filename="images/rc/icon-cloud-account-delete.png" alt="Use the Delete button to remove cloud account details." width="36px">}}{{< /image >}}

## Dedicated IAM resources

We strongly recommend using dedicated identity and access management (IAM) resources to manage your AWS cloud accounts.  These resources should not be shared with any other task, account, or process.

To learn more, see [Create IAM resources for AWS cloud accounts]({{<relref "/rc/cloud-integrations/aws-cloud-accounts/iam-resources">}}).
