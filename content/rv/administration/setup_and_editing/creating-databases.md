---
Title: Creating Databases on Redis Enterprise VPC (RV)
description: 
weight: $weight
alwaysopen: false
---
Once you have a subscription, you can easily create a database in Redis
Enterprise VPC by following these steps:

1.  Select **Databases** from the top right menu in Redis Enterprise
    VPC.
2.  Click on the **+** button to add a database to a Subscription.
3.  Protocol - Select whether the database will be **Redis** or
    **Memcached**
4.  Enter a **Database Name** that is up to 40 characters long;
5.  Enter a **Memory Limit**. Please take in mind that replication is
    on.
6.  If your database will run with [Redis on
    Flash]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}}),
    please specify your average item size(in bytes). This will allow us
    to configure your database in the most optimal way.
7.  Enter the required throughput. The minimum is 500,000 ops/sec or you
    can specify the number of shards needed.
8.  Select your preferred **Data Persistence** option.
9.  Enter a **password** to secure your database; **this is highly
    recommended**.
10. Enter a **Source IP/Subnet** that you would like to require source
    traffic (i.e. your application server) to come from.
11. Choose a **Redis** **Module** that you would like to use. If you
    select 'RediSearch' please provide the estimated number of documents
    you are about to index.
12. Choose a **Data Eviction Policy** or accept the default.
13. Periodic backups - If you would like periodic backups of your
    database, enter the path to storage here. For specific information
    visit Configuring Database Backups for Redis Enterprise Cloud.
14. You can add **Alert Settings** for your database so that you and
    your team can be alerted when thresholds are passed.
15. Click "**Activate**."

Once "**Activate**" is clicked, a few of things happen in the
background:

1.  RV will calculate the number of shards needed for this database.
2.  RV will calculate whether there is enough space to fit the database
    with the current infrastructure or expansion of the underlying
    infrastructure is required.
3.  It will also check that you have enough unused shards in your
    subscription.

If a new infrastructure needs to be deployed, or more shards need to be
purchased, you will be prompted with a popup showing you the additional
instances/shards that are needed for this database and their cost.
Please review this information and approve the addition. Once approved,
the activation will take place.

Once activated, the screen presents detailed information while the
system is creating the database. There are two things on this page to
look for:

-   An orange spinning icon on the top right to turn to a green
    checkmark
-   The **Endpoint** issued for the new database

If you’d prefer to watch a video on this topic:

{{< youtube Z8KgtMsyNx0 >}}