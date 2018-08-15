---
Title: Securing Your Redis Enterprise Cloud Database
description: $description
weight: $weight
alwaysopen: false
---
Access Control by Source IP/Subnet
----------------------------------

The number of source IP rules that you can add depends on the Redis
Enterprise Cloud plan that you purchased. For example, the 1GB plan
allows up to 8 source IP authentication rules. These rules can contain
either IP or [CIDR
notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation).

![Source
IP/Subnet](/images/rc/source_ip_subnet-1.png){.alignnone
.size-full .wp-image-25136 width="600" height="102"}

In case you require more source IP rules than your current REC
plan entitles you to, you can see the different plans and the maximum
number of source IP rules that they support [here](/pricing).

You may change your subscription at any time by going to Databases =\>
Configuration =\> Edit =\> Access Control & Security.

**Note:** only the account owner can upgrade/downgrade the subscription.

Securing Connection to Your Database with SSL/TLS
-------------------------------------------------

There is a [dedicated
page](/redis-cloud-documentation/configuration/securing-redis-cloud-connections/)
on this topic with steps you need to achieve this.

Redis Password
--------------

You can and should add a password for your database. This password is
purely for full access to the data in the database.

One feature often overlooked is the little eye icon on the right side of
form field that can be used to view the password.

![redis
password](/images/rc/redis_password.png){.alignnone
.size-full .wp-image-25161 width="600" height="42"}

AWS Security groups
-------------------

This option accepts the Group Name and the AWS Account ID as input to
identify the security group and secure your database.

**Note:** This feature is only for use when your database subscription
is in Amazon Web Services and only for the rare times people run using
EC2 classic as AWS recommends people use VPCs most times these days.
