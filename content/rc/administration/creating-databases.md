---
Title: Creating Databases on Redis Enterprise Cloud (RC)
description: $description
weight: $weight
alwaysopen: false
---
Once you have a
[subscription](/redis-cloud-documentation/administration/setup-editing/create-subscription/),
creating a Redis database in Redis Enterprise Cloud is simple with the
steps below.

**Note**: You can have as many databases as you desire, up to the limit
of your subscription or the subscription plan size, whichever comes
first.

1.  Select **Databases** from the top right menu in Redis Enterprise
    Cloud.
2.  Click on the plus sign to add a database to a subscription.
3.  Enter a **Database Name** that is up to 40 characters long.
    (Required)
4.  If this database is created in a standard subscription, choose to
    enable or disable Replication (default is "on"). Replication enables
    instant failover by keeping a standby, in-memory replica. Be aware
    that by enabling this feature, your database will consume twice as
    much memory in your subscription.
5.  Select your preferred [Data
    Persistence](/redis-cloud-documentation/concepts/data-persistence-redis-cloud/)
    option.
6.  If this is a **Pay-as-You-Go** subscription, you will see [Database
    Clustering](/redis-cloud-documentation/concepts/clustering-redis-cloud/)
    as an option.
7.  Enter a **password** if you would like to secure your database. This
    is highly recommended.
8.  Enter a **Source IP/Subnet** that you would like to require source
    traffic to originate(e.g. your application server). The information
    is either a specific source IPv4 address or a source subnet in [CIDR
    notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing).
    (e.g. 10.0.1.45 or 10.0.1.1/24 respectively). Once edited, click the
    save icon on the right.
9.  If your subscription is in AWS, you may add a pre-existing AWS
    Security Groups that you would like to use.
10. If you have contacted support to enable SSL/TLS certificates, you
    can add SSL Client Authentication to your database here. For
    specific information on this process, see [Securing Redis Enterprise
    Cloud Connections with
    SSL/TLS](/redis-cloud-documentation/administration/configuration/securing-redis-cloud-connections/).
11. For more advanced options, click on **More Options**.
12. Choose a [Data Eviction
    Policy](/redis-cloud-documentation/concepts/data-eviction-policies/)
    or accept the default.
13. If you would like periodic backups of your database, enter the path
    to storage here. For specific information visit [Configuring
    Database Backups for Redis Enterprise
    Cloud](/redis-cloud-documentation/administration/configuration/backups/).
14. You can add **Alert Settings** to your database so that you and your
    team can be alerted when thresholds are passed.
15. Click **Activate**.

Once activated, the screen presents detailed information as the system
is creating the database. There are two things you are looking for on
this page:

-   The orange spinning icon on the top right to turn to a green
    checkmark
-   The Endpoint issued for the new database

[]{#CreateDBVideo}\
If you'd prefer to watch a video on this topic:\

### 
