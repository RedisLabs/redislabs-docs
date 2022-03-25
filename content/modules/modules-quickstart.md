---
title: Modules quick start
linkTitle: Quick start
description:
weight: 1
alwaysopen: false
categories: ["Modules"]
---
To quickly get access to a Redis database with a module,
you can sign up for a free [Redis Enterprise Cloud](https://app.redislabs.com/#/sign-up) subscription, create a database, and enable the module that you want to try.

The modules that are currently available for Redis Enterprise Cloud include:

- [RediSearch]({{<relref "/modules/redisearch/_index.md">}})
- [RedisJSON]({{<relref "/modules/redisjson/_index.md">}})
- [RedisGraph]({{<relref "/modules/redisgraph/_index.md">}})
- [RedisTimeSeries]({{<relref "/modules/redistimeseries/_index.md">}})
- [RedisBloom]({{<relref "/modules/redisbloom/_index.md">}})

Alternatively, you can use one of these methods to set up a Redis database with modules:

- [Redis Enterprise Software]({{<relref "/rs/installing-upgrading/get-started-redis-enterprise-software.md">}})
- Redis Enterprise Software in a [Docker container]({{<relref "/rs/databases/get-started/get-started-docker.md">}})
- [Other platforms]({{<relref "/kubernetes/_index.md">}}) for Redis Enterprise Software

## Set up a Redis Cloud database

The following steps provide a high-level walkthrough to set up a Redis Cloud database with a module.

For more details, see the Redis Enterprise Cloud [quick start]({{<relref "/rc/rc-quickstart.md">}}).

### Step 1: Create a new subscription

To create a new subscription:

1. Sign into the Redis Enterprise Cloud [admin console](http://app.redislabs.com) or create a new account.

1. Select **New subscription**.

1. Configure your subscription:

    1. Select **Fixed plans**.
    1. For the cloud vendor, select **Amazon Web Services** (AWS), **Google Cloud Platform** (GCP), or **Microsoft Azure**.
    1. Select a region to deploy the subscription to.
    1. From the dataset size list, select the Free tier (30MB).
    1. Enter a name for the subscription.

1. Select **Create subscription**.

### Step 2: Create a database with a module enabled

After you create a subscription, select **New database** to create a new database:

1. In the **General** settings, enter a **Database name**.

1. Select your preferred module from the **Modules** <nobr>drop-down</nobr> list.

1. Select **Activate database**.

### Step 3: Connect to your database

After creating the database, you can view its **Configuration** settings. You will need the following information to connect to your new database:

- **Public endpoint**: The host address of the database
- **Redis password**/**Default user password**: The password used to authenticate with the database

With this information, you can connect to your database with the `redis-cli` command-line tool, an application, or [RedisInsight](https://redislabs.com/redisinsight/).

To try out your selected module, follow its corresponding quick start guide:

- [RediSearch]({{<relref "/modules/redisearch/redisearch-quickstart.md">}})
- [RedisJSON]({{<relref "/modules/redisjson/redisjson-quickstart.md">}})
- [RedisGraph]({{<relref "/modules/redisgraph/redisgraph-quickstart.md">}})
- [RedisTimeSeries]({{<relref "/modules/redistimeseries/redistimeseries-quickstart.md">}})
- [RedisBloom]({{<relref "/modules/redisbloom/redisbloom-quickstart.md">}})
