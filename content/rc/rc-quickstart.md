---
Title: Redis Cloud Quick Start
description:
weight: 10
alwaysopen: false
categories: ["RC"]
linktitle: "Quick Start"
aliases: /rv/quick-setup/
         /rc/quick-setup-redis-cloud/
         /rc/quick-setup/
---
When you create a Redis Cloud subscription, you must choose:

- A cloud provider: **Amazon AWS**, **Microsoft Azure**, **Google Cloud Platform**
- The provider region
- Redis Cloud service level:
    - **Fixed** - Set pricing designed for low-throughput applications
    - **Flexible**  - "Pay as you go" plans for any dataset size or throughput
    - **Annual** - Predefined annual consumption commitments that provide substantial discounts over Flexible plans.

## Step 1: Create a new subscription

To create a new subscription:

1. In the Redis Cloud menu, click **Subscriptions**.
1. At the bottom of the page, click ![Add](/images/rs/icon_add.png#no-click "Add").
1. Select your subscription configuration:
    1. Select a cloud provider: **Amazon AWS**, **Microsoft Azure**, **Google Cloud Platform**
    1. Select the region that you want the subscription to use, for example: `us-central1`
    1. In the Redis Cloud service levels, select the memory or throughput limit for your subscription.
1. After you select a subscription configuration:
    1. Review the subscription configuration.
    1. Enter the IP range for the subscription in **Deployment CIDR**.
    1. Enter your **Credit card** information.
    1. Enter a name for the subscription.
1. Click **Create**.

    The cluster for your selected subscription is created.
    You can change the name and credit card information of the subscription after it is created.

The subscription shows a "Pending" status and takes approximately 10 to 15 minutes to provision.
You receive an email when your subscription is ready to use.

### Next steps

We recommend that you setup [VPC peering]({{< relref "/rc/administration/setup/edit-subscription#vpc-peering" >}}) with your application VPC.
VPC peering lets you route traffic between your VPCs using private IP addresses for improved security and performance.

You can also [edit these subscription settings]({{< relref "/rc/administration/setup/edit-subscription.md" >}}) after the subscription is created:

1. Subscription name
1. Payment information

## Step 2: Create a database

After you create a subscription, you can create a database:

1. Enter a name for the database.
1. Select the protocol (Redis or Memcached).
1. Review the databases settings.
1. Click **Activate**.

The database is in "Pending" status.
When the database is created, you can see the database settings, including:

- Endpoint - The address you use to connect to the database
- Redis Password - The password you must use in your application connections to authenticate with the database

To add more databases:

1. Go to **Databases**.
1. Click on your subscription in the list of subscriptions.
1. Click ![Add](/images/rs/icon_add.png#no-click "Add") and enter the databases settings.

## Step 3: Connect to your database

Now you can connect to the database with telnet, redis-cli, or an application.

### Using Telnet

As a quick smoke test, telnet to your assigned endpoint and port. Then
enter the Redis PING command. You should see something like this:

```sh
# telnet redis-19836.c9.us-east-1-2.ec2.cloud.redislabs.com 19836
Trying 54.89.217.184...
Connected to redis-19836.c9.us-east-1-2.ec2.cloud.redislabs.com.
Escape character is '^]'.
AUTH my_redis_password
PING
+PONG
```

{{< note >}}
We recommend loading the redis-cli command-line utility to use it for other things.
{{< /note >}}

### Using redis-cli {#using-rediscli}

```sh
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

```sh
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

```sh
$ python example_redis.py
bar
```

With that simple test complete, you change the host, port, password and SSL certificates
in any existing code or apps that use Redis and you are done.

## More information

- [Data Persistence with Redis Cloud]({{< relref "rc/concepts/data-persistence.md" >}})
- [Securing Your Redis Cloud Database]({{< relref "/rc/administration/security/_index.md" >}})
- [Creating Databases]({{< relref "/rs/administering/creating-databases/_index.md" >}})
- [Redis Cloud Pro Database Backups]({{< relref "/rc/administration/configuration/backups.md" >}})
- [Monitoring Redis Cloud Performance]({{< relref "/rc/administration/configuration/monitoring-performance.md" >}}).
