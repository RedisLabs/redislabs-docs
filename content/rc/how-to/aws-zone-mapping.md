---
Title: AWS Zone Mapping
description: 
weight: $weight
alwaysopen: false
categories: ["RC"]
---
If you are looking to squeeze every drop of performance out of your
Redis Cloud Essentials Database, then matching the AWS availability
zones of your application to your Redis Cloud Essentials database may be of interest. First
you should know why this process matters and if you need to bother with
it at all.

**Note:** If you have a Multi-AZ subscription in Redis Cloud Essentials,
you do not need to perform AWS Zone Mapping.

## Why Do Zone Mapping?

As you probably know, AWS operates regions across the world and
Availability Zones (AZ) inside each region where they host the [Amazon
AWS cloud
infrastructure](https://aws.amazon.com/about-aws/global-infrastructure/).

The Availability Zones may be named the same for different AWS accounts,
but under the hood are actually resides on different infrastructure.
This can cause latency overhead when your app and your database are not
located on the same physical infrastructure. Since your app runs under
your AWS account and your Redis Cloud Essentials databases is under Redis Labs' AWS account,
you may suffer from this issue.

To overcome this issue, we came up with an automatic process that can
map AZs that are designated to your AWS account and cross-reference them
with our AZ. This will allow us to make sure your app and database will
be co-located on the same physical AZ and by that reducing unnecessary
latency.

## How to MAP Zones

1. [Log in](https://app.redislabs.com/#/login) to your Redis Cloud Essentials account
1. Navigate to **Settings** page from the menu and then the **Account**
    tab
1. Press the **Map your AWS Zones** button
1. Enter the Access Key ID and Secret Access Key for an [unprivileged
    AWS user](#unprivileged-user-creation).
1. Press on **Map Zones** button.

Allow the process a few minutes to complete as it maps the availability
zones. Once complete, you will see this:

![zone-mapping](/images/rc/zone-mapping.png?width=600&height=359)

When the process is complete, the next time you go to create a new
subscription, the drop down for "Cloud" will have the zone letter in
them.

![after_zone_mapping](/images/rc/after_zone_mapping.png?width=600&height=192)

For existing subscriptions in Redis Cloud Essentials, you will now see the Availability Zone
they are using. If you desire to remove the latency discussed before,
you must

1. [Create a new
    subscription]({{< relref "/rc/administration/setup-and-editing/create-subscription.md" >}}) in
    the correct AZ
1. [Create a new
    database]({{< relref "/rc/administration/setup-and-editing/creating-databases.md" >}})
1. [Migrate your
    data]({{< relref "/rc/how-to/importing-dataset-redis-cloud.md" >}})
    over to the new database.

While simple, this will cause some downtime. If downtime is not an
option, [please contact
support](mailto:support@redislabs.com?Subject=Zero%20Downtime%20DB%20Migration)
for further assistance.

## Unprivileged user creation

Redis Cloud Essentials requires an AWS IAM user to perform the zone mapping. It is
recommended to create a new and restricted account for security reasons.
To do this:

1. Create a new user in your AWS account **where your application is
    hosted**.
1. Create access keys for that user.
1. Give the user [this IAM
    policy](/images/rc/zone-mapping-user-policy.json_.txt).

If you are unfamiliar on how to create a new user in AWS, please see
their documentation on the topic.

**Note:** Redis Cloud Essentials does not store these credentials and once the zone mapping
process is complete, please remove the created user
