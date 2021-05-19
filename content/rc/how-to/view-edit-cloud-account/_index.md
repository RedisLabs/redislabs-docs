---
Title: Cloud Account Management (Only AWS)
description:
weight: 20
alwaysopen: false
categories: ["RC"]
---

The Redis Cloud management system builds Subscriptions in accounts at any of the big three Cloud Providers: AWS, Azure, GCP. Access to these accounts is secured by the normal access mechanisms and resources (users, roles, policies etc.) for the specific Cloud Provider. 

Such a collection of mechanisms is known with Redis Cloud as a `Cloud Account`. 

Normally the Cloud Provider accounts are owned and operated by Redislabs, and Redislabs manages the access resources. However, only in the case of AWS, it is possible to have the Cloud Provider account owned and managed by the customer. These two methods are known as 'hosted' and 'non-hosted' deployments, respectively (and thus one can see that 'non-hosted' deployments can only occur when the customer's Cloud Provider is AWS).

{{< warning >}}
We use the provided credentials to configure your AWS environment and provision required resources.

To make sure that we can manage your AWS resources, you must not:

- Manually change the configurations of provisioned resources, such as security groups
- Manually stop or terminate provisioned instances
{{< /warning >}}



## Create/Edit
To create or edit a Cloud Account in Redis Cloud via the admin console:

1. Use ONE of three methods to create the necessary IAM resources, as
detailed in [Create IAM
Entities](/rc/how-to/view-edit-cloud-account/creating-iam-resources),
and then use the outputs from the chosen method to continue the
process, as described below:
1. In **Cloud Accounts**, either:
    - Click ![Add](/images/rs/icon_add.png#no-click "Add") to create an new account.
    - Click on the account that you want to edit and then click **Edit**.
1. Enter the cloud account details:
    - **Account Name** - A meaningful name for the account.
    - **AWS_ACCESS_KEY_ID** - The AWS access key for the programmatic user
    - **AWS_SECRET_ACCESS_KEY** - The AWS secret access key for the programmatic user
    - **IAM Role Name** - The name of the console role with access to the console
1. Click **Save**.


It is possible to use the [REST API](/rc/api) to create Cloud Accounts, but that is covered elsewhere.

## Delete
You can click **Delete** to delete your Cloud Account from Redis Cloud,
but only if it has no active subscription related to it.
