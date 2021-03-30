---
Title: AWS Zone Mapping for Redis Cloud Essentials
description:
weight: $weight
alwaysopen: false
categories: ["RC"]
---
To get top performance from your Redis Cloud Essentials database,
you want to match the AWS availability zones of your application to your Redis Cloud Essentials database.

{{< note >}}
- If you have a Multi-AZ subscription,
you do not need to map AWS zones.
- AWS zone mapping is not yet supported for Redis Cloud Pro and Ultimate.
{{< /note >}}

## Why do zone mapping?

As you probably know, the [Amazon AWS cloud infrastructure](https://aws.amazon.com/about-aws/global-infrastructure/)
is divided into regions across the world and Availability Zones (AZ) inside each region.

The Availability Zones names can be the same for different AWS accounts,
but are actually hosted in different locations.
This can cause latency overhead when your app and your database are not located on the same physical infrastructure. Because your application runs in your AWS account and your Redis Cloud Essentials databases runs in the Redis Labs AWS account,
the AZs can be hosted in different locations and cause latency overhead.

To mitigate for this latency overhead, you can automatically map AZs that are designated to your AWS account
with the AZs in your Redis Cloud account.
This makes sure that your application and database are co-located on the same physical AZ.

## How to map zones

1. [Log in](https://app.redislabs.com/#/login) to your Redis Cloud Essentials account.
1. Go to **settings** > **account**.
1. Click **Map your AWS Zones**.
1. Enter the Access Key ID and Secret Access Key for an [unprivileged AWS user](#unprivileged-user-creation).
1. Click **Map Zones**.

The zone mapping takes a few minutes to complete as it maps the availability zones.
During the zone mapping you see:

![zone-mapping](/images/rc/zone-mapping.png)

After zone mapping is complete, the dropdown for **Cloud** in a new subscription shows the zone letter.

![after_zone_mapping](/images/rc/after_zone_mapping.png)

For existing subscriptions in Redis Cloud Essentials, you now see the Availability Zone they are using.
To reduce the latency described above:

1. [Create a new subscription]({{< relref "/rc/subscriptions/_index.md" >}}) in the AZ for your application.
1. [Create a new database]({{< relref "/rc/databases/create-database.md" >}}).
1. [Migrate your data]({{< relref "/rc/how-to/importing-data.md" >}}) to the new database.

While simple, this causes some downtime.
To prevent any downtime during the zone mapping, contact [support](mailto:support@redislabs.com?Subject=Zero%20Downtime%20DB%20Migration) for further assistance.

## Unprivileged user creation

Redis Cloud Essentials requires an AWS IAM user for the zone mapping.
We recommend that you create a new and restricted account to use for zone mapping.

To create a restricted IAM account for zone mapping:

1. Create a new user in your AWS account where your application is hosted.
1. Create access keys for that user.
1. Give the user this IAM policy:

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

1. After the zone mapping is completed, delete the user that you created for zone mapping.

For more information about creating IAM users, see the Amazon AWS documentation for IAM.
