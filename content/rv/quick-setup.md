---
Title: Quick Setup of Redis Enterprise VPC
description: 
weight: 10
alwaysopen: false
categories: ["RV"]
---
The steps for creating a simple Redis Enterprise VPC (RV) deployment are
as follows:

1. Sign up for an RV account
1. Create a dedicated AWS account/User for RV - hide this item for unification (do not remove, only hide)
1. Create a new RV subscription
1. Create a new database definition
1. Connect to your database

## Step 1: Sign up for Redis Enterprise VPC account

If you do not already have one, sign up for a [Redis Enterprise VPC
account](https://app.redislabs.com/#/sign-up/vpc).
If you already have an account, sign in to [Redis Enterprise
VPC](https://app.redislabs.com/#/login?).

## Step 2: Create an AWS account for RV to use - hide 'Step 2' section for unification

RV requires a dedicated AWS account to perform operations on your
behalf. Inside of that account, [create an AWS user in IAM]({{< relref "/rv/how-to/creating-aws-user-redis-enterprise-vpc.md" >}}).

## Step 3: Create a new RV subscription

Add a new subscription to your account, if you do not already have one.
If you do have an existing RV subscription, then proceed to Step 4.

![new_subscription](/images/rv/new_subscription.png?width=800&height=406)

For a new subscription, you will need to provide the following:

1. A subscription name
1. The cloud region in which you want your databases to be created
1. Whether you want to use [Redis on
    Flash]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}})
    or pure RAM Redis database
1. The Cloud Account to be used. Use the AWS user created above in Step
    #2 for setting up your RV Cloud Account - hide this step for unification
1. Please provide the required Deployment CIDR - this is an IPv4
    subnet with /24 subnet mask, in [CIDR
    notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation),
    that you would like RV to use. For a standard deployment, you can
    specify 10.0.1.0/24. Later on, you will have to create a VPC peering
    link to your application, therefore, please make sure that the CIDR
    you provide does not conflict with your application VPC CIDR.

Once your selections are made, click **Continue** to finalize your
subscription. RV will authenticate the credentials with AWS, then
proceed to the next step.

## Step 4: Create the database definition

Next, define the databases to provision. Each row in the table
represents a group of databases that share the same specification.

To start with a single database, provide the following details:

1. Database name
1. Dataset size - The estimated size of your data. You can specify 1GB
    for a small database.
1. Throughput - The estimated total throughput you expect from your
    database. You can specify 10,000 ops/sec to start with a small
    deployment.

Optionally, you can specify replication and a data persistence policy
for your database, then enter the quantity of databases to create
multiple databases on your RV subscription with the provided settings.

Once selections are made, save the settings entered row by clicking on
the **Add** button. You can add more rows by clicking on the plus
button.

![add_database](/images/rv/add_database.png?width=800&height=444)

Once done with all databases, click on **Continue**.

Behind the scenes, RV is performing a few operations based on your
inputs:

- Calculating the necessary resources
- Crafting a plan for an optimized cloud infrastructure based on those
    calculations

**Note**: Plan creation may take a little time base on a few factors,
e.g. your inputs, AWS response times, etc.

Once planning is complete, please review the presented subscription and
database information. Either select **Free Trial** or provide a payment
method by selecting an existing one or click on the **+** button to add
a new one.

![review_create](/images/rv/review_create.png?width=800&height=594)

Select the **Continue** button to create the subscription and deploy the
database(s). The subscription will display a "Pending" status and may
take ten to fifteen minutes to construct the infrastructure using the
generated optimization plan. You will receive an email once your
databases are ready to use.

## Step 5: Connect to your database

Using the menu, navigate to the Databases page. Select one of the
databases and select the Configuration tab and look for the database
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

With that simple test complete, if you have existing code or an app that
uses Redis, just change the host, port, password and SSL certificates
and you are done.

## More Information

1. [Data Persistence with Redis Enterprise
    VPC]({{< relref "/rv/concepts/data-persistence.md" >}})
1. [Securing Your Redis Enterprise VPC
    Database]({{< relref "/rv/administration/configuration/securing-your-database.md" >}})
1. [Creating
    Databases]({{< relref "/rs/administering/database-operations/creating-database.md" >}})
1. [Redis Enterprise Cloud Database
    Backups]({{< relref "/rv/administration/configuration/backups.md" >}})
1. [Monitoring Redis Enterprise VPC
    Performance]({{< relref "/rv/administration/configuration/monitoring-performance.md" >}}).
