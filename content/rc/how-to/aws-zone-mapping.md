---
Title: AWS zone mapping for Fixed plans
linkTitle: AWS zone mapping
description:
weight: $weight
alwaysopen: false
categories: ["RC"]
---

To achieve the best performance with a Redis Enterprise Cloud Fixed subscription deployed to Amazon Web Services (AWS), map your AWS availability zones to your database.

{{< note >}}
AWS zone mapping is not yet supported for Flexible or Annual subscriptions.
{{< /note >}}

## Why map zones?

[AWS cloud infrastructure](https://aws.amazon.com/about-aws/global-infrastructure/)
is divided into regions across the world; many regions are further divided into availability zones.

Availability zones name can be the duplicated between different AWS accounts, but are actually hosted in different locations.

Fixed accounts are hosted on shared infrastructure, there's a chance that your resources are hosted on separate server infrastructure.  Your AWS account hosts your application; however, your subscription databases are hosted in Redis&nbsp;Labs accounts, which may be deployed to different availability zones within the same region.

As a result, latency increases as multiple servers are negotiated.  

To mitigate this overhead, you can automatically map your AWS account availability zones to the availability zones associated with your Fixed subscription databases.  The ensures that your app and your databases are colocated to the same availability zone.

## How to map zones

1. [Sign in](https://app.redislabs.com/#/login) to your Fixed subscription.
1. Go to **Settings** > **Account**.
1. Select **Map your AWS Zones**.
1. Enter the Access Key ID and Secret Access Key for an [unprivileged AWS user](#unprivileged-user-creation).
1. Select **Map Zones**.

The zone mapping takes a few minutes to complete.  The **Mapping your availability zones** screen displays progress:

![zone-mapping](/images/rc/zone-mapping.png)

When mapping is complete, the dropdown for **Cloud** in a new subscription shows the zone letter as part of the region name.

![after_zone_mapping](/images/rc/after_zone_mapping.png)

Next, you need to migrate your data to a database created in the availability zone containing your app.  This may require a new subscription or a new database.

The general process is:

1.  Verify that your subscription is hosted in the availability zone containing your app.  If not, create a new subscription in the appropriate zone.

2.  Verify that your databases are hosted in a subscription located in the availability zone containing your app.  If not, create new databases in the appropriate subscription and then migrate the data to the new databases.  

3.  Once your data is migrated to the proper databases and subscription, remove the older resources.

This commonly leads to downtime.  For help, contact [support](mailto:support@redislabs.com?Subject=Zero%20Downtime%20DB%20Migration) for assistance.

## Unprivileged user creation

Fixed plans require an AWS IAM user for the zone mapping.

We recommend creating a new, restricted account:

1. Create a new user in your AWS account hosting your app.

1. Create access keys for the new user account.

1. Update the new user account IAM policy.

    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "RLZoneMapping",
                "Effect": "Allow",
                "Action": [
                    "ec2:DescribeRegions",
                    "ec2:DescribeReservedInstancesOfferings"
                ],
                "Resource": [
                    "*"
                ]
            }
        ]
    }

    ```

1. After the zone mapping is completed, delete the new user created for zone mapping.

To learn more about, see [Creating an IAM user in your AWS account](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) (AWS documentation).
