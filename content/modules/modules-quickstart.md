---
title: Modules Quick Start
description:
weight: 1
alwaysopen: false
categories: ["Modules"]
---
To quickly get access to a Redis Enterprise database with a module,
you can sign up for a free Redis Cloud database and enable the module that you want to try out.

You can also try out modules with [Redis Enterprise Software (RS)]({{< relref "/rs/getting-started/_index.md" >}}), RS in a [Docker container]({{< relref "/rs/getting-started/getting-started-docker.md" >}}), or any [other platform]({{< relref "/platforms/_index.md" >}}) that Redis Enterprise is offered on,
but a free Redis Cloud database is easy, free, and without the hassle of managing infrastructure.

The modules that are currently available for Redis Cloud are:

- [RediSearch]({{< relref "/modules/redisearch/_index.md" >}})
- [RedisGraph]({{< relref "/modules/redisgraph/_index.md" >}})
- [RedisBloom]({{< relref "/modules/redisbloom/_index.md" >}})
- [RedisJSON]({{< relref "/modules/redisjson/_index.md" >}})
- [RedisTimeSeries]({{< relref "/modules/redistimeseries/_index.md" >}})

The steps for getting up and running with a database that has a module enabled are:

1. Create a new subscription.
1. Create a new database with the module enabled.
1. Connect to the database.

## Step 1: Create a new subscription

To create a new subscription:

1. Go to [Redis Cloud](http://app.redislabs.com) and follow the instructions for creating a free Redis Cloud account.
    After you create your account, click **New Subscription**.

    If you have a login for Redis Cloud:

    1. Log in to Redis Cloud.
    1. In the Redis Cloud menu, click **Subscriptions**.
    1. At the bottom of the page, click ![Add](/images/rs/icon_add.png#no-click "Add").
1. Select your subscription configuration:
    1. For the cloud provider, make sure that **Amazon AWS** is selected.
    <!-- , **Microsoft Azure**, **Google Cloud Platform** -->
    1. Select the region to create the subscription in.
    1. In the Redis Cloud service levels, select the Redis Cloud Essentials **30MB/1 Database** level.
    1. Enter a name for the subscription.
1. Click **Create**.

    ![new-free-cloud-subscription](/images/rc/new-free-cloud-subscription.png)

The subscription shows a "Pending" status and takes a few minutes to provision.
You receive an email when your subscription is ready to use.

## Step 2: Create a database with a module enabled

After you create a subscription, you can create a database:

1. Enter a name for the database.
1. Enable the modules and select the module you want to use.
1. Click **Activate**.

    ![new-cloud-database-modules](/images/rc/new-cloud-database-modules.png)

The database is in "Pending" status.
When the database is created, you can see the database settings, including:

- Endpoint - The address you use to connect to the database
- Redis Password - The password you must use in your application connections to authenticate with the database

## Step 3: Connect to your database

Now you can connect to the database with telnet, redis-cli, an application or [RedisInsight](https://redislabs.com/redisinsight/).

To get started with the modules, go to the quick start guide for the module that you enabled:

- [RediSearch]({{< relref "/modules/redisearch/redisearch-quickstart.md" >}})
- [RedisJSON]({{< relref "/modules/redisjson/redisjson-quickstart.md" >}})
- [RedisGraph]({{< relref "/modules/redisgraph/redisgraph-quickstart.md" >}})
- [RedisTimeSeries]({{< relref "/modules/redistimeseries/redistimeseries-quickstart.md" >}})
- [RedisBloom]({{< relref "/modules/redisbloom/redisbloom-quickstart.md" >}})
