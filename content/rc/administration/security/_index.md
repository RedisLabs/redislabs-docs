---
Title: Securing Your Database
description:
weight: 25
alwaysopen: false
categories: ["RC"]
aliases: /rv/administration/configuration/securing-your-database/
         /rv/administration/configuration/security/
         /rc/administration/configuration/securing-your-database/
         /rc/administration/configure/security/
         /rc/administration/configuration/security/
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

You can [secure your database connections]({{< relref "/rc/administration/security/securing-redis-cloud-connections.md" >}}) with SSL/TLS.

## Default User

When you [enable the default user]({{< relref "/rc/administration/setup/create-database.md" >}}) for your database,
all connections to the database must use the [AUTH command](https://redis.io/commands/auth) to authenticate with the default user password.
If you also configure data access control, connections can specify other users for authentication
and requests are allowed according to the Redis ACLs specified for that user.

You can click on ![icon_view](/images/rc/icon_view.png#no-click "View") to see the password in plain text.

## Data Access Control

You can [create users with ACLs]({{< relref "/rc/administration/security/data-access-control.md" >}}) that limit the commands and keys that each user can access for specific databases.
When your client authenticates with one of these data access users,
only the defined commands and keys are allowed.

## AWS Security groups

If you use AWS EC2 classic instance,
you can use the Group Name and the AWS Account ID to identify the security group and secure your database.
