---
Title: Creating Databases on  Redis Cloud Essentials
description: 
weight: $weight
alwaysopen: false
categories: ["RC Essentials"]
---
Once you have a
[subscription]({{< relref "/rc/administration/setup-and-editing/create-subscription.md" >}}),
creating a Redis database in Redis Cloud Essentials is simple with the
steps below.

**Note**: You can have as many databases as you desire, up to the limit
of your subscription or the subscription plan size, whichever comes
first.

1. Select **Databases** from the top right menu in Redis Enterprise
    Cloud.
1. Click on the plus sign to add a database to a subscription.
1. Enter a **Database Name** that is up to 40 characters long.
    (Required)
1. If this database is created in a standard subscription, choose to
    enable or disable Replication (default is "on"). Replication enables
    instant failover by keeping a standby, in-memory replica. Be aware
    that by enabling this feature, your database will consume twice as
    much memory in your subscription.
1. Select your preferred [Data
    Persistence]({{< relref "/rc/concepts/data-persistence-redis-cloud.md" >}})
    option.
1. If this is a **Pay-as-You-Go** subscription, you will see [Database
    Clustering]({{< relref "/rc/concepts/clustering-redis-cloud.md" >}})
    as an option.
1. Enter a **password** if you would like to secure your database. This
    is highly recommended.
1. Enter a **Source IP/Subnet** that you would like to require source
    traffic to originate(e.g. your application server). The information
    is either a specific source IPv4 address or a source subnet in [CIDR
    notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing).
    (e.g. 10.0.1.45 or 10.0.1.1/24 respectively). Once edited, click the
    save icon on the right.
1. If your subscription is in AWS, you may add a pre-existing AWS
    Security Groups that you would like to use.
1. If you have contacted support to enable SSL/TLS certificates, you
    can add SSL Client Authentication to your database here. For
    specific information on this process, see [Securing Redis Enterprise
    Cloud Connections with
    SSL/TLS]({{< relref "/rc/securing-redis-cloud-connections.md" >}}).
1. For more advanced options, click on **More Options**.
1. Choose a [Data Eviction
    Policy]({{< relref "/rc/concepts/data-eviction-policies.md" >}})
    or accept the default.
1. If you would like periodic backups of your database, enter the path
    to storage here. For specific information visit [Configuring
    Database Backups for Redis Enterprise
    Cloud]({{< relref "/rc/administration/configure/backups.md" >}}).
1. You can add **Alert Settings** to your database so that you and your
    team can be alerted when thresholds are passed.
1. Click **Activate**.

Once activated, the screen presents detailed information as the system
is creating the database. There are two things you are looking for on
this page:

- The orange spinning icon on the top right to turn to a green
    checkmark
- The Endpoint issued for the new database

If you'd prefer to watch a video on this topic:

{{< youtube Z8KgtMsyNx0 >}}
