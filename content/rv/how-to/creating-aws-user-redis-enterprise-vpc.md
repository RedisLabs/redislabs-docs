---
Title: Creating an AWS User for Redis Enterprise VPC
description: $description
weight: $weight
alwaysopen: false
---
Redis Enterprise VPC (RV) automatically manages your cluster and
provisions instances when needed. In order for RV to be able to perform
its duties, you must have an AWS account that is separate from your AWS
application account, along with a user on that separate account.

Within that new AWS account, you need to create an **instance role** and
a user with a specific **policy**. The user requires both **UI console
access** and an **Access Key** so that RV can programmatically create
and manage AWS resources on your behalf. After the user is created,
generate an Access Key for the user. Save the keys in a secure location,
as these keys are required when creating an RV Cloud Account.

For assistance with creating the user, please see the [AWS documentation
on the
topic](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).

Step \#1 -- Create the IAM Instance Policy
------------------------------------------

First, let's create a policy that we will attach to the new instance
role that we create later:

1.  In AWS IAM console go to **Policies** -\> **Create policy**\
    ![](/wp-content/uploads/2017/05/create_policy-1.png){.alignnone
    .size-full .wp-image-30688 width="700" height="621"}
2.  Select the **JSON** tab and copy-paste the below policy or get it
    from our github.\
    **redislabs-cluster-node-role.json**\
3.  Validate it and press **Review Policy.**
4.  Enter **RedisLabsInstanceRolePolicy** as the policy name and save it
    by clicking **Create Policy\
    ![](/wp-content/uploads/2017/05/review_role_policy.png){.alignnone
    .size-full .wp-image-30690 width="700" height="270"}**

Step \#2 -- Create the Role
---------------------------

[Now that we have the policy, let's create the role that uses
it:]{style="font-weight: 400;"}

1.  [In AWS IAM console go to]{style="font-weight: 400;"} **Roles** [and
    click on]{style="font-weight: 400;"} **Create Role\
    ![](/wp-content/uploads/2017/05/create_role.png){.alignnone
    .size-full .wp-image-30689 width="700" height="636"}\
    **
2.  Select **AWS Service** as the trusted entity, **EC2** as the service
    and use case and click **Next: Permissions\
    ![](/wp-content/uploads/2017/05/select_service.png){.alignnone
    .size-full .wp-image-30691 width="700" height="625"}\
    **
3.  Type **RedisLabsInstanceRolePolicy** in the search box to lookup the
    policy we have just created, select it and click **Next: Review**.\
    ![](/wp-content/uploads/2017/05/attach_policies.png){.alignnone
    .size-full .wp-image-30692 width="700" height="348"}
4.  Name the role **redislabs-cluster-node-role** and save it by
    clicking on **Create Role.**

Step \#3 -- Create the User Policy
----------------------------------

Let's continue with creating a policy that will be assigned to the user
RV will utilize:

1.  In AWS IAM console go to **Policies** -\> **Create policy**
2.  Select the **JSON** tab and copy-paste the below policy or get it
    from our GitHub.\
    ***ATTENTION: Replace
    [ACCOUNT-ID-WITHOUT-HYPHENS]{style="text-decoration: underline;"}
    with the AWS account ID that RV will be using***\
    **RedislabsIAMUserRestrictedPolicy.json**\
    \
    ![](/wp-content/uploads/2017/05/edit_policy.png){.alignnone
    .size-full .wp-image-30693 width="700" height="214"}
3.  Validate it and press **Review Policy**
4.  Enter **RedislabsIAMUserRestrictedPolicy** as the policy name and
    save it by clicking **Create Policy\
    ![](/wp-content/uploads/2017/05/review_user_policy.png){.alignnone
    .size-full .wp-image-30694 width="700" height="292"}**

Step \#4 -- Create the User
---------------------------

Last, you will have to create a user and attach the policy you have
created before:

1.  In AWS IAM console go to **Users** -\> select **Add user\
    ![](/wp-content/uploads/2017/05/add_user.png){.alignnone .size-full
    .wp-image-30695 width="700" height="751"}\
    **
2.  Name it **redislabs-user** and select both options: **Programmatic
    access** and **AWS Management Console access**\
    ![](/wp-content/uploads/2017/05/select_access_type.png){.alignnone
    .size-full .wp-image-30696 width="700" height="393"}
3.  Set a password or auto-generate one and press **Next: Permissions**
4.  Select **Attach existing policies directly** and select
    **RedislabsIAMUserRestrictedPolicy** from the list (the policy you
    previously created)\
    ![](/wp-content/uploads/2017/05/set_permissions.png){.alignnone
    .size-full .wp-image-30697 width="700" height="477"}
5.  Press **Next: Review**
6.  Press **Create user**
7.  **Please make sure to save the user credentials**
