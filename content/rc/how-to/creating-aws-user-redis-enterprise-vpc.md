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

# Using CloudFormation
The simplest method to create the necessary resources is to use CloudFormation and the following template. The outputs of this template can be copied/pasted directly and used to configure your RedisCloud account.

{{%expand "View RedisLabsCloudFormationTemplate.yaml" %}}
AWSTemplateFormatVersion: 2010-09-09
Description: |
  A template to construct all the necessary resources to enable RedisCloud to manage clusters in your AWS
  account, as per https://docs.redislabs.com/latest/rc/how-to/creating-aws-user-redis-enterprise-vpc/
  
Resources:
  RedisLabsClusterNodeRole:
    Type: "AWS::IAM::Role"
    Properties:
      AssumeRolePolicyDocument: 
        Version: 2012-10-17
        Statement:
          - Effect: Allow
            Principal:
              Service:
              - ec2.amazonaws.com
            Action:
              - 'sts:AssumeRole'
      Description: Role used by EC2 instances managed by RedisLabs 
      Policies:
        - PolicyDocument: |
            {
              "Version": "2012-10-17",
              "Statement": [
                {
                  "Sid": "EC2",
                  "Effect": "Allow",
                  "Action": [
                    "ec2:DescribeAvailabilityZones",
                    "ec2:DescribeRegions",
                    "ec2:DescribeSecurityGroups",
                    "ec2:DescribeTags",
                    "ec2:DescribeVolumes"
                  ],
                  "Resource": "*"
                },
                {
                  "Sid": "EC2Tagged",
                  "Effect": "Allow",
                  "Action": [
                    "ec2:AuthorizeSecurityGroupEgress",
                    "ec2:AuthorizeSecurityGroupIngress",
                    "ec2:DeleteSecurityGroup",
                    "ec2:RevokeSecurityGroupEgress",
                    "ec2:RevokeSecurityGroupIngress"
                  ],
                  "Resource": "*",
                  "Condition": {
                    "StringEquals": {
                      "ec2:ResourceTag/RedisLabsIdentifier": "Redislabs-VPC"
                    }
                  }
                },
                {
                  "Sid": "EBSVolumeActions",
                  "Effect": "Allow",
                  "Action": [
                    "ec2:AttachVolume",
                    "ec2:CreateVolume",
                    "ec2:CreateTags",
                    "ec2:DescribeTags"
                  ],
                  "Resource": "*"
                },
                {
                  "Sid": "S3Object",
                  "Effect": "Allow",
                  "Action": [
                    "s3:PutObject",
                    "s3:PutObjectAcl",
                    "s3:GetObject",
                    "s3:GetObjectAcl",
                    "s3:DeleteObject",
                    "s3:ListBucket",
                    "s3:GetBucketLocation"
                  ],
                  "Resource": "*"
                },
                {
                  "Sid": "IAM",
                  "Effect": "Allow",
                  "Action": [
                    "iam:GetPolicy",
                    "iam:ListPolicies"
                  ],
                  "Resource": "*"
                }
              ]
            }
          PolicyName: RedisLabsInstanceRolePolicy
      Tags:
        - Key: UsedBy
          Value: RedisLabs

  RedislabsIAMUserRestrictedPolicy:
    Type: "AWS::IAM::ManagedPolicy"
    Properties:
      Description: Policy used by RedisLabs users
      PolicyDocument: |
        {
          "Version": "2012-10-17",
          "Statement": [
              {
                  "Sid": "Ec2DescribeAll",
                  "Effect": "Allow",
                  "Action": "ec2:Describe*",
                  "Resource": "*"
              },
              {
                  "Sid": "CloudWatchReadOnly",
                  "Effect": "Allow",
                  "Action": [
                      "cloudwatch:Describe*",
                      "cloudwatch:Get*",
                      "cloudwatch:List*"
                  ],
                  "Resource": "*"
              },
              {
                  "Sid": "IamUserOperations",
                  "Effect": "Allow",
                  "Action": [
                      "iam:GetUser",
                      "iam:GetUserPolicy",
                      "iam:ChangePassword"
                  ],
                  "Resource": "arn:aws:iam::*:user/${aws:username}"
              },
              {
                  "Sid": "RolePolicyUserReadActions",
                  "Action": [
                      "iam:GetRole",
                      "iam:GetPolicy",
                      "iam:ListUsers",
                      "iam:ListPolicies",
                      "iam:ListRolePolicies",
                      "iam:ListAttachedRolePolicies",
                      "iam:ListInstanceProfiles",
                      "iam:ListInstanceProfilesForRole",
                      "iam:SimulatePrincipalPolicy"
                  ],
                  "Effect": "Allow",
                  "Resource": "*"
              },
              {
                  "Sid": "KeyPairActions",
                  "Effect": "Allow",
                  "Action": [
                      "ec2:CreateKeyPair",
                      "ec2:DeleteKeyPair",
                      "ec2:ImportKeyPair"
                  ],
                  "Resource": "*"
              },
              {
                  "Sid": "CreateInstancesVolumesAndTags",
                  "Effect": "Allow",
                  "Action": [
                      "ec2:CreateVolume",
                      "ec2:AttachVolume",
                      "ec2:StartInstances",
                      "ec2:RunInstances",
                      "ec2:CreateTags"
                  ],
                  "Resource": "*"
              },
              {
                  "Sid": "PassRlClusterNodeRole",
                  "Effect": "Allow",
                  "Action": "iam:PassRole",
                  "Resource": "arn:aws:iam::*:role/redislabs-cluster-node-role"
              },
              {
                  "Sid": "NetworkAccess",
                  "Effect": "Allow",
                  "Action": [
                      "ec2:*Vpc*",
                      "ec2:*VpcPeering*",
                      "ec2:*Subnet*",
                      "ec2:*Gateway*",
                      "ec2:*Vpn*",
                      "ec2:*Route*",
                      "ec2:*Address*",
                      "ec2:*SecurityGroup*",
                      "ec2:*NetworkAcl*",
                      "ec2:*DhcpOptions*"
                  ],
                  "Resource": "*"
              },
              {
                  "Sid": "DeleteInstancesVolumesAndTagsWithIdentiferTag",
                  "Effect": "Allow",
                  "Action": [
                      "ec2:RebootInstances",
                      "ec2:StopInstances",
                      "ec2:TerminateInstances",
                      "ec2:DeleteVolume",
                      "ec2:DetachVolume",
                      "ec2:DeleteTags"
                  ],
                  "Resource": "*",
                  "Condition": {
                      "StringEquals": {
                          "ec2:ResourceTag/RedisLabsIdentifier": "Redislabs-VPC"
                      }
                  }
              },
              {
                  "Sid": "Support",
                  "Effect": "Allow",
                  "Action": "support:*",
                  "Resource": "*"
              }
          ]
        }


  RedisLabsUser:
    Type: "AWS::IAM::User"
    Properties:
      ManagedPolicyArns:
        - !Ref RedislabsIAMUserRestrictedPolicy
      Tags:
        - Key: UsedBy
          Value: RedisLabs

  RedisLabsUserAccessKey:
    Type: "AWS::IAM::AccessKey"
    Properties:
      UserName: !Ref RedisLabsUser


  RedisLabsCrossAccountRole:
    Type: "AWS::IAM::Role"
    Properties:
      AssumeRolePolicyDocument: |
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "AWS": "arn:aws:iam::168085023892:root"
              },
              "Action": "sts:AssumeRole",
              "Condition": {}
            }
          ]
        }
      Description: String
      ManagedPolicyArns:
        - !Ref RedislabsIAMUserRestrictedPolicy
      Tags:
        - Key: UsedBy
          Value: RedisLabs
  
Outputs:
  AwsSecretAccessKey:
    Description: The AWS secret access key for the programmatic user
    Value: !Sub ${RedisLabsUserAccessKey.SecretAccessKey}
  AwsAccessKey:
    Description: The AWS access key for the programmatic user
    Value: !Sub ${RedisLabsUserAccessKey}
  IamRoleName:
    Description: The name of the console role with access to the console
    Value: !Ref RedisLabsCrossAccountRole

# Using the AWS Console
## Step 1: Create the IAM Instance Policy

First, create a policy to use for the new instance role:

{{< video "/images/rc/create-instance-role-policy.mp4" "Create an instance role policy" >}}

1. In the AWS IAM console, go to **Policies** > **Create policy**.
1. In the **JSON** tab, paste the contents of the RedisLabsInstanceRolePolicy.json policy file.

    {{%expand "View RedisLabsInstanceRolePolicy.json" %}}
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "EC2",
                "Effect": "Allow",
                "Action": [
                    "ec2:DescribeAvailabilityZones",
                    "ec2:DescribeRegions",
                    "ec2:DescribeSecurityGroups",
                    "ec2:DescribeTags",
                    "ec2:DescribeVolumes"
                ],
                "Resource": "*"
            },
            {
                "Sid": "EC2Tagged",
                "Effect": "Allow",
                "Action": [
                    "ec2:AuthorizeSecurityGroupEgress",
                    "ec2:AuthorizeSecurityGroupIngress",
                    "ec2:DeleteSecurityGroup",
                    "ec2:RevokeSecurityGroupEgress",
                    "ec2:RevokeSecurityGroupIngress"
                ],
                "Resource": "*",
                "Condition": {
                    "StringEquals": {
                        "ec2:ResourceTag/RedisLabsIdentifier": "Redislabs-VPC"
                    }
                }
            },
            {
                "Sid": "EBSVolumeActions",
                "Effect": "Allow",
                "Action": [
                    "ec2:AttachVolume",
                    "ec2:CreateVolume",
                    "ec2:CreateTags",
                    "ec2:DescribeTags"
                ],
                "Resource": "*"
            },
            {
                "Sid": "S3Object",
                "Effect": "Allow",
                "Action": [
                    "s3:PutObject",
                    "s3:PutObjectAcl",
                    "s3:GetObject",
                    "s3:GetObjectAcl",
                    "s3:DeleteObject",
                    "s3:ListBucket",
                    "s3:GetBucketLocation"
                ],
                "Resource": "*"
            },
            {
                "Sid": "IAM",
                "Effect": "Allow",
                "Action": [
                    "iam:GetPolicy",
                    "iam:ListPolicies"
                ],
                "Resource": "*"
            }
        ]
    }
    {{% /expand%}}

1. Validate it and press **Review Policy**.
1. Enter **RedisLabsInstanceRolePolicy** as the policy name and click **Create Policy**.

## Step 2: Create the Service Role

Now create the role that uses the policy:

{{< video "/images/rc/create-cluster-node-role.mp4" "Create a cluster node role" >}}

1. In AWS IAM console, go to **Roles** and click **Create Role**.
1. Select **AWS Service** as the trusted entity, **EC2** as the service
    and use case, and click **Next: Permissions**.
1. Enter `RedisLabsInstanceRolePolicy` in the search box to lookup the policy we just created,
    select it, and click **Next: Review**.
1. Name the role `redislabs-cluster-node-role` and click **Create Role**.

## Step 3: Create the User Policy

Now create a policy to assign to the user:

{{< video "/images/rc/create-instance-user-policy.mp4" "Create an instance user policy" >}}

1. In AWS IAM console, go to **Policies** > **Create policy**.
1. In the **JSON** tab, paste the contents of the RedislabsIAMUserRestrictedPolicy.json policy file.

    {{%expand "View RedislabsIAMUserRestrictedPolicy.json" %}}
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "Ec2DescribeAll",
                "Effect": "Allow",
                "Action": "ec2:Describe*",
                "Resource": "*"
            },
            {
                "Sid": "CloudWatchReadOnly",
                "Effect": "Allow",
                "Action": [
                    "cloudwatch:Describe*",
                    "cloudwatch:Get*",
                    "cloudwatch:List*"
                ],
                "Resource": "*"
            },
            {
                "Sid": "IamUserOperations",
                "Effect": "Allow",
                "Action": [
                    "iam:GetUser",
                    "iam:GetUserPolicy",
                    "iam:ChangePassword"
                ],
                "Resource": "arn:aws:iam::*:user/${aws:username}"
            },
            {
                "Sid": "RolePolicyUserReadActions",
                "Action": [
                    "iam:GetRole",
                    "iam:GetPolicy",
                    "iam:ListUsers",
                    "iam:ListPolicies",
                    "iam:ListRolePolicies",
                    "iam:ListAttachedRolePolicies",
                    "iam:ListInstanceProfiles",
                    "iam:ListInstanceProfilesForRole",
                    "iam:SimulatePrincipalPolicy"
                ],
                "Effect": "Allow",
                "Resource": "*"
            },
            {
                "Sid": "KeyPairActions",
                "Effect": "Allow",
                "Action": [
                    "ec2:CreateKeyPair",
                    "ec2:DeleteKeyPair",
                    "ec2:ImportKeyPair"
                ],
                "Resource": "*"
            },
            {
                "Sid": "CreateInstancesVolumesAndTags",
                "Effect": "Allow",
                "Action": [
                    "ec2:CreateVolume",
                    "ec2:AttachVolume",
                    "ec2:StartInstances",
                    "ec2:RunInstances",
                    "ec2:CreateTags"
                ],
                "Resource": "*"
            },
            {
                "Sid": "PassRlClusterNodeRole",
                "Effect": "Allow",
                "Action": "iam:PassRole",
                "Resource": "arn:aws:iam::*:role/redislabs-cluster-node-role"
            },
            {
                "Sid": "NetworkAccess",
                "Effect": "Allow",
                "Action": [
                    "ec2:*Vpc*",
                    "ec2:*VpcPeering*",
                    "ec2:*Subnet*",
                    "ec2:*Gateway*",
                    "ec2:*Vpn*",
                    "ec2:*Route*",
                    "ec2:*Address*",
                    "ec2:*SecurityGroup*",
                    "ec2:*NetworkAcl*",
                    "ec2:*DhcpOptions*"
                ],
                "Resource": "*"
            },
            {
                "Sid": "DeleteInstancesVolumesAndTagsWithIdentiferTag",
                "Effect": "Allow",
                "Action": [
                    "ec2:RebootInstances",
                    "ec2:StopInstances",
                    "ec2:TerminateInstances",
                    "ec2:DeleteVolume",
                    "ec2:DetachVolume",
                    "ec2:DeleteTags"
                ],
                "Resource": "*",
                "Condition": {
                    "StringEquals": {
                        "ec2:ResourceTag/RedisLabsIdentifier": "Redislabs-VPC"
                    }
                }
            },
            {
                "Sid": "Support",
                "Effect": "Allow",
                "Action": "support:*",
                "Resource": "*"
            }
        ]
    }
    {{% /expand%}}

1. Validate the policy and click **Review Policy**.
1. Enter `RedislabsIAMUserRestrictedPolicy` as the policy name and click **Create Policy**.

## Step 4: Create the Programmatic Access User

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

## Step 5: Create the Console Access Role

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
