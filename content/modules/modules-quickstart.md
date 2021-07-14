---
title: Modules quick start
linkTitle: Quick start
description:
weight: 1
alwaysopen: false
categories: ["Modules"]
---
To quickly get access to a Redis database with a module,
you can sign up for a free Redis Enterprise Cloud subscription, create a database, and then enable the module that you want to try out.

You can also try out modules with [Redis Enterprise Software]({{< relref "/rs/getting-started/_index.md" >}}), REdis Enterprise Software in a [Docker container]({{< relref "/rs/getting-started/getting-started-docker.md" >}}), or any [other platform]({{< relref "/platforms/_index.md" >}}) that Redis Enterprise Software is offered on.

Free Redis Enterprise Cloud subscriptions are easy and avoid the hassle of managing infrastructure.

The modules that are currently available for Redis Enterprise Cloud are:

- [RediSearch]({{< relref "/modules/redisearch/_index.md" >}})
- [RedisGraph]({{< relref "/modules/redisgraph/_index.md" >}})
- [RedisBloom]({{< relref "/modules/redisbloom/_index.md" >}})
- [RedisJSON]({{< relref "/modules/redisjson/_index.md" >}})
- [RedisTimeSeries]({{< relref "/modules/redistimeseries/_index.md" >}})

To get up and running with a Redis database and your preferred module:

1. Create a new subscription.
1. Create a new database with the module enabled.
1. Connect to the database.

The following steps provide a high-level walkthrough.  For more details, see the Redis Enterprise Cloud [quick start]({{< relref "/rc/rc-quickstart.md" >}})

## Step 1: Create a new subscription

To create a new subscription:

1. Go to [Redis Enterprise Cloud](http://app.redislabs.com) and follow the instructions to create a free subscription.

    After signing in to the Redis Cloud admin console, select **New Subscription**.

1. Select your subscription configuration:

    1. For the cloud provider, select **Amazon Web Services** (AWS), **Google Cloud Platform** (GCP), or **Microsoft Azure**.
    <!-- , **Microsoft Azure**, **Google Cloud Platform** -->
    1. Select a region to deploy the subscription to.
    1. In the **Fixed size** panel, select the Free tier (30MB dataset size).
    1. Enter a name for the subscription.
1. Click **Create**.

This takes you to the **Create Database** screen.  

## Step 2: Create a database with a module enabled

After you create a subscription, you can create a database:

1. In **Database name**, enter a name for your database.

1. Uee the **Modules** drop-down list to select your module.

1. Select **Activate**.

The database is in "Pending" status.

When the database is created, you view the database settings, including:

- Endpoint: The address you use to connect to the database
- Redis Password: The password you must use in your application connections to authenticate with the database

## Step 3: Connect to your database

Now you can connect to the database with redis-cli, an application, or [RedisInsight](https://redislabs.com/redisinsight/).

To get started with the modules, go to the quick start guide for the module that you enabled:

- [RediSearch]({{< relref "/modules/redisearch/redisearch-quickstart.md" >}})
- [RedisJSON]({{< relref "/modules/redisjson/redisjson-quickstart.md" >}})
- [RedisGraph]({{< relref "/modules/redisgraph/redisgraph-quickstart.md" >}})
- [RedisTimeSeries]({{< relref "/modules/redistimeseries/redistimeseries-quickstart.md" >}})
- [RedisBloom]({{< relref "/modules/redisbloom/redisbloom-quickstart.md" >}})
