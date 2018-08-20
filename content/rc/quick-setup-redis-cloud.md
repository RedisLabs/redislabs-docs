---
Title: Quick Setup of Redis Enterprise Cloud
description: 
weight: 10
alwaysopen: false
---
The steps here are super simple and go as follows:

1.  Sign up for a Redis Enterprise Cloud account
2.  Create a new subscription
3.  Setup a database
4.  Connect to your Database

Step \#1 - Sign up for Redis Enterprise Cloud account
------------------------------------------------------

If you do not already have one, [sign up for a Redis Enterprise Cloud
account](https://app.redislabs.com/#/sign-up/tabs/redis-cloud?product=redis-cloud).

If you already have an account, [sign in to Redis Enterprise
Cloud](https://app.redislabs.com/#/login?).

Step \#2 - Create a new subscription
-------------------------------------

Add a new subscription to your account, if you do not already have one.
If you have an existing subscription, then proceed to Step 3.

For a new subscription, you will need to select the following:

1.  The cloud and region you desire your database(s) to be created in
2.  A subscription name
3.  One of three subscription plans:
    -   Cache plans provide highly available, low-latency caching for
        applications when the authoritative version of the data is
        stored in another database. Cache plans do not include
        replication or data persistence so failures may result in an
        empty cache
    -   Standard plans can have a diverse set of features including
        in-memory replication, auto-failover, data persistence, and
        backups. Selecting this option will double the memory size of
        your dataset.
    -   Multi-AZ (Availability Zone) plans offer all the benefits of
        Standard plans, as well as auto-failover and in-memory
        replication to another availability zone.
4.  Memory size - select from 30MB (free) to 5GB (\$33/mo), or a
    flexible pay-as-you-go model.

You can consider a quick overview of each tier's features upon
selection. For more specific information, see [Creating a
Subscription](/redis-cloud-documentation/administration/setup-editing/create-subscription/).

Once you have made your selections, click **Continue** to finalize your
subscription.

![](/images/rc/new_sub.png?width=600&height=466)

Step \#3 - Set up a database
-----------------------------

1.  Give your database a name.
2.  Click the "**Activate**" button to create your database.

Note: the Endpoint displayed on this page is very important because it
is your entry point to this database.

![](/images/rc/rc-view-database-endpoint.png?width=600&height=409)

Step \#4 - Reading and Writing Data
------------------------------------

### Using Telnet

As a quick smoke test, telnet to your assigned endpoint and port. Then
enter the Redis PING command. You should see something like this:

``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
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

``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
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
[here](/resources/how-to-redis-enterprise/)).

You first need to install the Redis client library for Python if you do
not have it already.

``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
$ sudo pip install redis
```

Next copy and paste this into a file named
"example\_redis.py":` #import the library import redis # Create connection object r = redis.Redis( host='pub-redis-10382.us-west-2-1.1.ec2.redislabs.com', port=10382, password='astrongpassword') # set a value for the foo object r.set('foo', 'bar') # retrieve and print the value for the foo object print(r.get('foo'))`

Now run the code:

``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
$ python example_redis.py
bar
```

With that simple test complete, if you have existing code or an app that
uses Redis, just change the host, port, password and SSL certificates
and you are done.

More Information
----------------

1.  [Data Persistence with Redis Enterprise
    Cloud](/redis-cloud-documentation/concepts/data-persistence-redis-cloud/).
2.  [Securing Your Redis Enterprise Cloud
    Database](/redis-cloud-documentation/administration/configuration/security/).
3.  [Creating a
    database](/redis-cloud-documentation/administration/setup-editing/creating-databases-redis-cloud/).
4.  [Redis Enterprise Cloud Database
    Backups](/redis-cloud-documentation/administration/configuration/backups/).
5.  [Monitoring Redis Enterprise Cloud
    Performance](/redis-cloud-documentation/administration/configuration/monitoring-alerting-metrics/).
