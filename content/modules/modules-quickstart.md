---
title: Modules Quick Start
description:
weight: 1
alwaysopen: false
categories: ["Modules"]
---
To quickly get access to a Redis Enterprise database with a module,
you can sign up for a free Redis Cloud database and enable the module that you want to try out.

The modules that are currently available are:

- [RediSearch]({{< relref "/modules/redisearch/_index.md" >}})
- [RedisGraph]({{< relref "/modules/redisgraph/_index.md" >}})
- [RedisBloom]({{< relref "/modules/redisbloom/_index.md" >}})
- [RedisJSON]({{< relref "/modules/redisjson/_index.md" >}})
- [RedisTimeSeries]({{< relref "/modules/redistimeseries/_index.md" >}})

The steps for getting up and running with a database that has a module enabled are:

1. Create a new subscription.
1. Create a new database with the module enabled.
1. Connect to the database.

## Step 1: Create a New Subscription

To create a new subscription:

1. In the Redis Cloud menu, click **Subscriptions**.
1. At the bottom of the page, click ![Add](/images/rs/icon_add.png#no-click "Add").
1. Select your subscription configuration:
    1. Select a cloud provider: **Amazon AWS**, **Microsoft Azure**, **Google Cloud Platform**
    1. Select the region that you want the subscription to use, for example: `us-central1`
    1. In the Redis Cloud service levels, select the Redis Cloud Essentials "30MB/1 Database" level.
    1. Enter a name for the subscription.
1. Click **Create**.

The subscription shows a "Pending" status and takes approximately 10 to 15 minutes to provision.
You receive an email when your subscription is ready to use.

## Step 2: Create a Database with a Module Enabled

After you create a subscription, you can create a database:

1. Enter a name for the database.
1. Enable the modules and select the module you want to use.
1. Click **Activate**.

The database is in "Pending" status.
When the database is created, you can see the database settings, including:

- Endpoint - The address you use to connect to the database
- Redis Password - The password you must use in your application connections to authenticate with the database

## Step 3: Connect to your database

Now you can connect to the database with telnet, redis-cli, or an application.

To get started with the modules, go to the quick start guide for the module that you enabled:

- [RediSearch]({{< relref "/modules/redisearch/redisearch-quickstart.md" >}})
- [RedisGraph]({{< relref "/modules/redisgraph/redisgraph-quickstart.md" >}})
- [RedisBloom]({{< relref "/modules/redisbloom/redisbloom-quickstart.md" >}})
- [RedisJSON]({{< relref "/modules/redisjson/redisjson-quickstart.md" >}})
- [RedisTimeSeries]({{< relref "/modules/redistimeseries/redistimeseries-quickstart.md" >}})
