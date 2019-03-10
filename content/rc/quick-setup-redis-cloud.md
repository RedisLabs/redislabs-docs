---
Title: Quick Setup of Redis Enterprise Cloud
description: 
weight: 10
alwaysopen: false
categories: ["RC"]
---
The steps here are super simple and go as follows:

1. Sign up for a Redis Enterprise Cloud account
1. Create a new subscription
1. Setup a database
1. Connect to your Database

{{< youtube I9sPna1OOUg >}}

## Step 1: Sign up for Redis Enterprise Cloud account

If you do not already have one, [sign up for a Redis Enterprise Cloud
account](https://app.redislabs.com/#/sign-up/cloud?).

If you already have an account, [sign in to Redis Enterprise
Cloud](https://app.redislabs.com/#/login?).

## Step 2: Create a new subscription

Add a new subscription to your account, if you do not already have one.
If you have an existing subscription, then proceed to Step 3.

To create a new Redis Cloud Essentials subscription do the following:
1. Select 'Cloud (Hosted)' from the dropdown on the top of the page
1. Select 'Subscriptions' from the sidebar
1. If you have existing subscriptions- click on the '+' icon. If you don't have existing subsctiptions- proceed to the next step
1. Click on the 'Select' button inside the 'Essentials' box

New subscription details page will be opened. You will need to select the following:

1. The cloud and region you desire your database(s) to be created in
1. A subscription name
1. One of three subscription plans:
   - Cache plans provide highly available, low-latency caching for
        applications when the authoritative version of the data is
        stored in another database. Cache plans do not include
        replication or data persistence so failures may result in an
        empty cache
   - Standard plans can have a diverse set of features including
        in-memory replication, auto-failover, data persistence, and
        backups. Selecting this option will double the memory size of
        your dataset.
   - Multi-AZ (Availability Zone) plans offer all the benefits of
        Standard plans, as well as auto-failover and in-memory
        replication to another availability zone.
1. Memory size - select from 30MB (free) to 5GB ($33/mo), or a
    flexible pay-as-you-go model.

You can consider a quick overview of each tier's features upon
selection. For more specific information, see [Creating a
Subscription]({{< relref "/rc/administration/setup-and-editing/create-subscription.md" >}}).

Once you have made your selections, click **Continue** to finalize your
subscription.

![new_sub](/images/rc/new_sub.png?width=600&height=466)

## Step 3: Set up a database

1. Give your database a name.
1. Click the **Activate** button to create your database.

Note: the Endpoint displayed on this page is very important because it
is your entry point to this database.

![rc-view-database-endpoint](/images/rc/rc-view-database-endpoint.png?width=600&height=409)

## Step 4: Reading and Writing Data

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

Note: We recommend loading the redis-cli command-line utility for future
use as you will use it for other things.

### Using redis-cli

```src
$ redis-cli -h redis-19836.c9.us-east-1-2.ec2.cloud.redislabs.com 
-p 19836 -a astrongpassword
redis-19836.c9.us-east-1-2.ec2.cloud.redislabs.com:19836> PING
PONG
```

You can get redis-cli and other command-line Redis tools through your
favorite package manager or by installing Redis locally.

### Using Python

Once you have tested the connection to your Redis database, you can
start reading and writing data. The following code snippet writes the
value bar to the Redis key "foo", reads it back, and then prints it.
This snippet is written in Python, but you can use your favorite
language (for examples in other languages, go
[here](https://redislabs.com/resources/how-to-redis-enterprise/)).

You first need to install the Redis client library for Python if you do
not have it already.

```src
$ sudo pip install redis
```

Next copy and paste this into a file named
"example_redis.py":

```python
# import the library
import redis
# Create connection object
r = redis.Redis( host='pub-redis-10382.us-west-2-1.1.ec2.redislabs.com', port=10382, password='astrongpassword')
# Set a value for the foo object
r.set('foo', 'bar')
# retrieve and print the value for the foo object
print(r.get('foo'))
```

Now run the code:

```src
$ python example_redis.py
bar
```

With that simple test complete, if you have existing code or an app that
uses Redis, just change the host, port, password and SSL certificates
and you are done.

## More Information

1. [Data Persistence with Redis Enterprise
    Cloud]({{< relref "/rc/concepts/data-persistence-redis-cloud.md" >}}).
1. [Securing Your Redis Enterprise Cloud
    Database]({{< relref "/rc/administration/configure/security.md" >}}).
1. [Creating a
    database]({{< relref "/rc/administration/setup-and-editing/creating-databases.md" >}}).
1. [Redis Enterprise Cloud Database
    Backups]({{< relref "/rc/administration/configure/backups.md" >}}).
1. [Monitoring Redis Enterprise Cloud
    Performance]({{< relref "/rc/administration/configure/monitoring-alerting-metrics.md" >}}).
