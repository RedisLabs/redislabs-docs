---
Title: Creating IAM Entities for AWS Cloud Accounts
description:
weight: 30
alwaysopen: false
categories: ["RC"]
aliases: /rv/how-to/creating-aws-user-redis-enterprise-vpc/
---
In most Redis Cloud deployments, the infrastructure of your Redis Cloud subscriptions on AWS is created in dedicated AWS accounts that we manage for you.
In Redis Cloud Ultimate, you can choose to have this infrastructure on your own AWS accounts.
You'll want these accounts to be separate from any AWS application accounts,
and you'll need to create some dedicated IAM entities to let us manage the infrastructure for you.

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

## Step 1: Create the IAM instance policy

First, create a policy to use for the new instance role:

{{< video "/images/rc/create-instance-role-policy.mp4" "Create an instance role policy" >}}

1. In the AWS IAM console, go to **Policies** > **Create policy**.
1. In the **JSON** tab, paste the contents of the RedisLabsInstanceRolePolicy.json policy file.

    {{%expand "View RedisLabsInstanceRolePolicy.json" %}}
	{{% code-include file="rv/RedisLabsInstanceRolePolicy.json" language="js" %}}
    {{% /expand%}}

1. Validate it and press **Review Policy**.
1. Enter **RedisLabsInstanceRolePolicy** as the policy name and click **Create Policy**.

## Step 2: Create the service role

Now create the role that uses the policy:

{{< video "/images/rc/create-cluster-node-role.mp4" "Create a cluster node role" >}}

1. In AWS IAM console, go to **Roles** and click **Create Role**.
1. Select **AWS Service** as the trusted entity, **EC2** as the service
    and use case, and click **Next: Permissions**.
1. Enter `RedisLabsInstanceRolePolicy` in the search box to lookup the policy we just created,
    select it, and click **Next: Review**.
1. Name the role `redislabs-cluster-node-role` and click **Create Role**.

## Step 3: Create the user policy

Now create a policy to assign to the user:

{{< video "/images/rc/create-instance-user-policy.mp4" "Create an instance user policy" >}}

1. In AWS IAM console, go to **Policies** > **Create policy**.
1. In the **JSON** tab, paste the contents of the RedislabsIAMUserRestrictedPolicy.json policy file.

    {{%expand "View RedislabsIAMUserRestrictedPolicy.json" %}}
	{{% code-include file="rv/RedislabsIAMUserRestrictedPolicy.json" language="js" %}}
    {{% /expand%}}

1. Validate the policy and click **Review Policy**.
1. Enter `RedislabsIAMUserRestrictedPolicy` as the policy name and click **Create Policy**.

## Step 4: Create the programmatic access user

Create a user and attach the policy you created:

{{< video "/images/rc/create-programmatic-user.mp4" "Create programmatic user" >}}

1. In AWS IAM console, go to **Users** > select **Add user**.
1. Name it `redislabs-user` and check only the **Programmatic access** checkbox.
1. Click **Next: Permissions**.
1. Select **Attach existing policies directly** and select
    **RedislabsIAMUserRestrictedPolicy** from the list.
1. Click **Next: Review**.
1. Click **Create user**.
1. Download the user credentials and store them in a secure location.

## Step 5: Create the console access role

Last, create a role and attach the policy you created:

{{< video "/images/rc/create-console-access-role.mp4" "Create console access user" >}}

1. In AWS IAM console, go to **Roles** > select **Create role**.
1. Select the **Another AWS account**.
1. Under **Account ID** enter account number `168085023892` (Redis Cloud's AWS account).
1. Under Options, check the **Require MFA** checkbox only. *Do not check Require external ID*.
1. Click **Next: Permissions**.
1. Attach the policy **RedisLabsIAMUserRestrictedPolicy** to the role.
1. Click **Next: Review**.
1. Name the role `redislabs-role` and then click **Create role**.
