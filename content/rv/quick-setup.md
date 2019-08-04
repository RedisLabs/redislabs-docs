---
Title: Quick Setup of Redis Cloud Pro
description:
weight: 10
alwaysopen: false
categories: ["RC Pro"]
---
The steps for creating a simple Redis Cloud Pro deployment are:

1. Sign up for a Redis Cloud Pro account.
1. Create a new Redis Cloud Pro subscription.
1. Create a new database definition.
1. Connect to your database.

{{% note %}}
If you are interested in running Redis Cloud Pro instances on your own [AWS account](/rv/how-to/creating-cloud-account/), contact Redis Labs [Support team](https://redislabs.com/company/support) to enable this functionality.
{{% /note %}}

## Step 1: Sign up for Redis Cloud Pro account

If you do not already have one, sign up for a [Redis Cloud Pro Account](https://app.redislabs.com/#/sign-up/vpc).

If you already have an account, sign in to [Redis Cloud Pro](https://app.redislabs.com/#/login?).

## Step 2: Create a new Redis Cloud Pro subscription

Add a new subscription to your account, if you do not already have one.

![new_subscription](/images/rv/new_subscription.png?width=800&height=406)

For a new subscription:

1. Enter a subscription name.
1. Select if you want to use [Redis on
    Flash]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}})
    or pure RAM Redis database.
1. Select the cloud region in which you want your databases to be created.
1. Select whether you want to use Multi-AZ for in-memory replication to another availability zone in the same region.
1. Enter the required Deployment CIDR.
    The [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation)
    an IPv4 subnet that you want Redis Cloud Pro to use for this subscription.
    For a standard deployment, you can specify 10.0.1.0/24. Make sure that the CIDR
    you provide does not conflict with your application VPC CIDR to avoid problems
    when you peer the VPC to your.
1. Select whether you want Persistent Storage Encription.
1. Click **Next** to finalize your subscription.

## Step 3: Create the database definition

Next, define the databases to provision. Each row in the table
represents a group of databases that share the same specification.

To start with a single database:

1. Enter the database name.
1. Select the protocol (Redis or Memcached).
1. Enter the dataset size - The estimated size of your data. You can specify 1GB
    for a small database.
1. Define if you want to have database replication (note that when enabling the database will consume twice the amount of memory).
1. Select [data persistence] (/rv/concepts/data-persistence/) policy.
1. Define if the database will support [OSS Cluster API] (/rs/concepts/data-access/oss-cluster-api/).
1. Throughput - You can define your estimated total throughput you expect from your database by either specifying the required ops/sec or number of shards needed.
1. Modules - You can select which Redis Module you want to load to your database. In case you select 'RediSearch' please provide the estimated number of documents you are going to index.
1. Enter the quantity of databases to create multiple databases on your Redis Cloud Pro subscription with the provided settings.
1. Click **Save** and enter the number of databases with these settings that you would like to provision. To add more rows, click the plus.

![add_database](/images/rv/add_database.png?width=800&height=444)

When you finish with all databases, click **Next**.

Behind the scenes, Redis Cloud Pro is performing a few operations based on your
inputs:

- Calculating the necessary resources
- Crafting a plan for an optimized cloud infrastructure based on those
    calculations

{{% note %}}
Plan creation may take a little time based on a your inputs.
{{% /note %}}

After planning is complete, review the presented subscription and
database information. This includes the expected infrastructure and shard prices.
Provide a payment method by selecting an existing one or click **+** to add
a new one.
A $100 credit will be assigned to the new subscription for a free trial.

![review_create](/images/rv/review_create.png?width=800&height=594)

Click **Continue** to create the subscription and deploy the
databases. The subscription shows a "Pending" status and may
take 10-15 minutes to build the infrastructure with the
generated optimization plan. You will receive an email when your
databases are ready to use.

## Step 4: Connect to your database

In the menu, go to the Databases page. Select one of the
databases, select the Configuration tab, and look for the database
endpoint.

![connect_to_database](/images/rv/connect_to_database.png?width=800&height=599)

### Using Telnet

As a quick smoke test, telnet to your assigned endpoint and port. Then
enter the Redis PING command. You should see something like this:

```src
# telnet redis-19836.c9.us-east-1-2.ec2.cloud.redislabs.com 19836
Trying 54.89.217.184...
Connected to redis-19836.c9.us-east-1-2.ec2.cloud.redislabs.com.
Escape character is '^]'.
AUTH my_redis_password
PING
+PONG
```

{{% note %}}
We recommend loading the redis-cli command-line utility for future
use as you will use it for other things.
{{% /note %}}

### Using redis-cli {#using-rediscli}

```src
$ redis-cli -h redis-19836.c9.us-east-1-2.ec2.cloud.redislabs.com
-p 19836 -a astrongpassword
redis-19836.c9.us-east-1-2.ec2.cloud.redislabs.com:19836> PING
PONG
```

You can get redis-cli and other command-line Redis tools through your
favorite package manager or by installing Redis locally.

### Using Python

After you test the connection to your Redis database, you can
start reading and writing data. The following code snippet writes the
value bar to the Redis key "foo", reads it back, and then prints it.
This snippet is written in Python, but you can use your favorite
language (for examples in other languages, go
[here](https://redislabs.com/resources/how-to-redis-enterprise/)).

You first need to install the Redis client library for Python if you do
not have it already.

```src
sudo pip install redis
```

Next, copy and paste this into a file named
**example_redis.py**:

```python
#import the library
import redis
# Create connection object
r = redis.Redis(host='pub-redis-10382.us-west-2-1.1.ec2.garantiadata.com', port=10382)
# set a value for the foo object
r.set('foo', 'bar')
# retrieve and print the value for the foo object
print(r.get('foo'))
```

Now run the code:

```src
$ python example_redis.py
bar
```

With that simple test complete, you change the host, port, password and SSL certificates
in any existing code or apps that use Redis and you are done.

## More Information

1. [Data Persistence with Redis Cloud Pro]({{< relref "/rv/concepts/data-persistence.md" >}})
1. [Securing Your Redis Cloud Pro
    Database]({{< relref "/rv/administration/configuration/securing-your-database.md" >}})
1. [Creating
    Databases]({{< relref "/rs/administering/database-operations/creating-database.md" >}})
1. [Redis Cloud Pro Database
    Backups]({{< relref "/rv/administration/configuration/backups.md" >}})
1. [Monitoring Redis Cloud Pro
    Performance]({{< relref "/rv/administration/configuration/monitoring-performance.md" >}}).
