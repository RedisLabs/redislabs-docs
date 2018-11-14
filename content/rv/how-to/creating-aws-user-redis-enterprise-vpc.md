---
Title: Creating an AWS User for Redis Enterprise VPC
description: 
weight: $weight
alwaysopen: false
---
Redis Enterprise VPC (RV) automatically manages your cluster and
provisions instances when needed. In order for RV to be able to manager AWS 
resources, you must have an AWS account that is separate from your AWS
application account and a user on that separate AWS account.

Within that new AWS account, you need to create an **instance role** and
a user with a specific **policy**. The user requires both **UI console access** 
and an **Access Key** so that RV can programmatically create
and manage AWS resources on your behalf. After you create the user,
generate an Access Key for the user and save the key in a secure location. 
These keys are required when you create an RV account.

For more about creating an AWS user, see the [AWS documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).

## Step 1 - Create the IAM Instance Policy

First, create a policy to use for the new instance role:

1. In the AWS IAM console, go to **Policies** > **Create policy**.
    ![create_policy-1](/images/rv/create_policy-1.png?width=700&height=621)
1. In the **JSON** tab, paste the contents of the RedisLabsInstanceRolePolicy.json policy file.

    {{%expand "View RedisLabsInstanceRolePolicy.json" %}}
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "EC2CommonReadonlyActions",
                "Effect": "Allow",
                "Action": [
                    "ec2:DescribeAvailabilityZones",
                    "ec2:DescribeRegions"
                ],
                "Resource": [
                    "*"
                ]
            },
            {
                "Sid": "EC2EBSActions",
                "Effect": "Allow",
                "Action": [
                    "ec2:AttachVolume",
                    "ec2:CreateVolume",
                    "ec2:DescribeVolumes"
                ],
                "Resource": [
                    "*"
                ]
            },
            {
                "Sid": "S3FullAccess",
                "Effect": "Allow",
                "Action": "s3:*",
                "Resource": "*"
            },
            {
                "Sid": "SecurityGroupAccessDescribeSecurityGroups",
                "Effect": "Allow",
                "Action": "ec2:DescribeSecurityGroups",
                "Resource": "*"
            },
            {
                "Sid": "SecurityGroupAccessActions",
                "Effect": "Allow",
                "Action": [
                    "ec2:AuthorizeSecurityGroupIngress",
                    "ec2:DeleteSecurityGroup",
                    "ec2:RevokeSecurityGroupIngress"
                ],
                "Resource": "*"
            },
            {
                "Sid": "TagResources",
                "Effect": "Allow",
                "Action": [
                    "ec2:CreateTags",
                    "ec2:DeleteTags",
                    "ec2:DescribeTags"
                ],
                "Resource": [
                    "*"
                ]
            },
            {
                "Sid": "GetPolicyInfo",
                "Effect": "Allow",
                "Action": [
                    "iam:ListPolicies",
                    "iam:GetPolicy"
                ],
                "Resource": "arn:aws:iam::*:policy/*"
            }
        ]
    }
    {{% /expand%}}

1. Validate it and press **Review Policy**.
1. Enter **RedisLabsInstanceRolePolicy** as the policy name and click **Create Policy**.
    ![review_role_policy](/images/rv/review_role_policy.png?width=700&height=270)

## Step 2 - Create the Role

Now create the role that uses the policy:

1. In AWS IAM console, go to **Roles** and click **Create Role**.
    ![create_role](/images/rv/create_role.png?width=700&height=636)
1. Select **AWS Service** as the trusted entity, **EC2** as the service
    and use case, and click **Next: Permissions**.
    ![select_service](/images/rv/select_service.png?width=700&height=625)
1. Enter `RedisLabsInstanceRolePolicy` in the search box to lookup the
    policy we just created, select it, and click **Next: Review**.
    ![attach_policies](/images/rv/attach_policies.png?width=700&height=348)
1. Name the role `redislabs-cluster-node-role` and click **Create Role**.

## Step 3 - Create the User Policy

Now create a policy to assign to the user:

1. In AWS IAM console, go to **Policies** > **Create policy**.
1. In the **JSON** tab, paste the contents of the redislabsIAMUserRestrictedPolicy.json policy file.
    
    WARNING: Replace `ACCOUNT-ID-WITHOUT-HYPHENS` with the AWS account ID 
    that you use for RV.
    
    {{%expand "View RedislabsIAMUserRestrictedPolicy.json" %}}
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "GetUserInfo",
                "Effect": "Allow",
                "Action": [
                    "iam:GetPolicy",
                    "iam:GetUserPolicy",
                    "iam:GetUser",
                    "iam:ListUsers"
                ],
                "Resource": [
                    "arn:aws:iam::*:user/${aws:username}"
                ]
            },
            {
                "Sid": "AllowGetRole",
                "Action": [
                    "iam:GetRole",
                    "iam:ListAttachedRolePolicies",
                    "iam:ListRolePolicies"
                ],
                "Effect": "Allow",
                "Resource": "*"
            },
            {
                "Sid": "SimulatePolicy",
                "Effect": "Allow",
                "Action": [
                    "iam:ListInstanceProfiles",
                    "iam:ListInstanceProfilesForRole",
                    "iam:SimulatePrincipalPolicy"
                ],
                "Resource": [
                    "*"
                ]
            },
            {
                "Effect": "Allow",
                "Action": [
                    "ec2:Describe*",
                    "ec2:CreateKeyPair",
                    "ec2:DeleteKeyPair",
                    "ec2:ImportKeyPair"
                ],
                "Resource": [
                    "*"
                ]
            },
            {
                "Sid": "cloudWath",
                "Effect": "Allow",
                "Action": [
                    "cloudwatch:*"
                ],
                "Resource": [
                    "*"
                ]
            },
            {
                "Sid": "CreateDescTags",
                "Effect": "Allow",
                "Action": [
                    "ec2:CreateTags",
                    "ec2:DescribeTags"
                ],
                "Resource": [
                    "*"
                ]
            },
            {
                "Sid": "CreateSGAndVolumeAllow",
                "Effect": "Allow",
                "Action": [
                    "ec2:CreateSecurityGroup",
                    "ec2:CreateVolume",
                    "ec2:DescribeVolumes",
                    "ec2:AttachVolume",
                    "ec2:DeleteVolume"
                ],
                "Resource": [
                    "*"
                ]
            },
            {
                "Sid": "NeededIAMForChef",
                "Effect": "Allow",
                "Action": [
                    "iam:PassRole",
                    "iam:ListInstanceProfiles"
                ],
                "Resource": [
                    "*"
                ]
            },
            {
                "Sid": "NeededEC2ForChef",
                "Effect": "Allow",
                "Action": [
                    "ec2:RunInstances"
                ],
                "Resource": [
                    "*"
                ]
            },
            {
                "Sid": "OnlyCreateVPCNoDelete",
                "Effect": "Allow",
                "Action": [
                    "ec2:CreateVpc",
                    "ec2:*Subnet*",
                    "ec2:CreateInternetGateway",
                    "ec2:AttachInternetGateway",
                    "ec2:*Vpn*",
                    "ec2:*Route*",
                    "ec2:*Address*",
                    "ec2:CreateSecurityGroup",
                    "ec2:AuthorizeSecurityGroupIngress",
                    "ec2:AuthorizeSecurityGroupEgress",
                    "ec2:*NetworkAcl*",
                    "ec2:*DhcpOptions*"
                ],
                "Resource": [
                    "*"
                ]
            },
            {
                "Sid": "RoleAccessInstancesAllowBasedOnTag",
                "Effect": "Allow",
                "Action": [
                    "iam:PassRole",
                    "iam:ListInstanceProfiles"
                ],
                "Resource": [
                    "arn:aws:ec2:*:<ACCOUNT-ID-WITHOUT-HYPHENS>:instance/*"
                ],
                "Condition": {
                    "StringEquals": {
                        "ec2:ResourceTag/RedisLabsIdentifier": "RedisLabs"
                    }
                }
            },
            {
                "Sid": "VPCAccessWithTAG",
                "Effect": "Allow",
                "Action": [
                    "ec2:*Vpc*",
                    "ec2:*Subnet*",
                    "ec2:*Gateway*",
                    "ec2:*Vpn*",
                    "ec2:*Route*",
                    "ec2:*Address*",
                    "ec2:*SecurityGroup*",
                    "ec2:*NetworkAcl*",
                    "ec2:*DhcpOptions*",
                    "ec2:RunInstances",
                    "ec2:StartInstances",
                    "ec2:Describe*"
                ],
                "Resource": [
                    "*"
                ]
            },
            {
                "Sid": "ec2MinorActionsOnlyWithTag",
                "Effect": "Allow",
                "Action": [
                    "ec2:RevokeSecurityGroupEgress",
                    "ec2:RevokeSecurityGroupIngress"
                ],
                "Resource": [
                    "*"
                ],
                "Condition": {
                    "StringEquals": {
                        "ec2:ResourceTag/RedisLabsIdentifier": "RedisLabs"
                    }
                }
            },
            {
                "Sid": "AllowIngressSG",
                "Effect": "Allow",
                "Action": [
                    "ec2:AuthorizeSecurityGroupEgress",
                    "ec2:AuthorizeSecurityGroupIngress"
                ],
                "Resource": [
                    "*"
                ]
            },
            {
                "Sid": "InstanceActionsOnlyTaggedInstances",
                "Effect": "Allow",
                "Action": [
                    "ec2:AttachVolume",
                    "ec2:CreateVolume",
                    "ec2:DetachVolume",
                    "ec2:StartInstances",
                    "ec2:RunInstances"
                ],
                "Resource": [
                    "*"
                ]
            },
            {
                "Sid": "DeleteVolumesTagged",
                "Effect": "Allow",
                "Action": [
                    "ec2:DeleteVolume"
                ],
                "Resource": [
                    "*"
                ],
                "Condition": {
                    "StringEquals": {
                        "ec2:ResourceTag/RedisLabsIdentifier": "RedisLabs"
                    }
                }
            },
            {
                "Sid": "InstanceActionsOnlyBasedOnROLE",
                "Effect": "Allow",
                "Action": [
                    "ec2:RebootInstances",
                    "ec2:StopInstances",
                    "ec2:TerminateInstances"
                ],
                "Resource": [
                    "*"
                ]
            },
            {
                "Sid": "GetPolicyInfo",
                "Effect": "Allow",
                "Action": [
                    "iam:ListPolicies",
                    "iam:GetPolicy"
                ],
                "Resource": "arn:aws:iam::*:policy/*"
            }
        ]
    }
    {{% /expand%}}

    ![edit_policy](/images/rv/edit_policy.png?width=700&height=214)
1. Validate the policy and click **Review Policy**.
1. Enter `RedislabsIAMUserRestrictedPolicy` as the policy name and click **Create Policy**.
    ![review_user_policy](/images/rv/review_user_policy.png?width=700&height=292)

## Step 4 - Create the User

Last, create a user and attach the policy you created:

1. In AWS IAM console, go to **Users** > select **Add user**.
    ![add_user](/images/rv/add_user.png?width=700&height=751)
1. Name it **redislabs-user** and select both **Programmatic
    access** and **AWS Management Console access**.
    ![select_access_type](/images/rv/select_access_type.png?width=700&height=393)
1. Set a password or auto-generate one, and click **Next: Permissions**.
1. Select **Attach existing policies directly** and select
    **RedislabsIAMUserRestrictedPolicy** from the list.
    ![set_permissions](/images/rv/set_permissions.png?width=700&height=477)
1. Click **Next: Review**.
1. Click **Create user**.
1. Download the user credentials and store them in a secure location.
