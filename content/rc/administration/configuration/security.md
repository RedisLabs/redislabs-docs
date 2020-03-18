---
Title: Securing Your Database
description:
weight: 10
alwaysopen: false
categories: ["RC"]
aliases: /rv/administration/configuration/securing-your-database/
         /rv/administration/configuration/security/
         /rc/administration/configuration/securing-your-database/
         /rc/administration/configure/security/
---
The security controls for your database are:

## Access Control by Source IP/Subnet

The number of source IP rules that you can add depends on the Redis Cloud plan that you purchased.
For example, the 1GB plan allows up to 8 source IP authentication rules.
These rules can contain either IP or [CIDR notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation).

![Source IP/Subnet](/images/rc/source_ip_subnet-1.png)

In case you require more source IP rules than your current Redis Cloud plan entitles you to,
you can upgrade to [another plan](https://redislabs.com/pricing) that supports the number of source IP rules that you need.

You may change your subscription at any time by going to Databases -> Configuration -> Edit -> Access Control & Security.

**Note:** Only the account owner can change the subscription.

## Securing Connection to Your Database with SSL/TLS

You can [secure your database connections]({{< relref "/rc/securing-redis-cloud-connections.md" >}}) with SSL/TLS.

## Redis Password

We recommend that you add a password for your database.
This password is only for access to the data in the database, and not for database or cluster administration.

One feature often overlooked is the little eye icon on the right side of
the form field that can be used to view the password.

![redis
password](/images/rc/redis_password.png?width=600&height=42)

## AWS Security groups

If you use AWS EC2 classic instance,
you can use the Group Name and the AWS Account ID to identify the security group and secure your database.
