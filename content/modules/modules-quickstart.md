---
title: Modules quick start
linkTitle: Quick start
description:
weight: 1
alwaysopen: false
categories: ["Modules"]
---
To quickly set up a Redis database with modules,
you can sign up for a free [Redis Enterprise Cloud](https://app.redislabs.com/#/sign-up) subscription and create a [Redis Stack]({{<relref "/modules/redis-stack">}}) database.

Redis Stack databases include the following modules:

- [RediSearch]({{<relref "/modules/redisearch/_index.md">}})
- [RedisJSON]({{<relref "/modules/redisjson/_index.md">}})
- [RedisGraph]({{<relref "/modules/redisgraph/_index.md">}})
- [RedisTimeSeries]({{<relref "/modules/redistimeseries/_index.md">}})
- [RedisBloom]({{<relref "/modules/redisbloom/_index.md">}})

Alternatively, you can use one of these methods to set up a Redis database with modules:

- [Redis Enterprise Software]({{<relref "/rs/installing-upgrading/get-started-redis-enterprise-software.md">}})
- Redis Enterprise Software in a [Docker container]({{<relref "/rs/installing-upgrading/get-started-docker.md">}})
- [Other platforms]({{<relref "/kubernetes/_index.md">}}) for Redis Enterprise Software

## Set up a Redis Cloud database

To set up a Redis Cloud database with modules enabled, follow these steps:

1. [Create a new Redis Cloud subscription](#create-a-subscription).

1. [Create a Redis Stack database](#create-a-redis-stack-database).

1. [Connect to the database](#connect-to-the-database).

For more details, see the Redis Enterprise Cloud [quick start]({{<relref "/rc/rc-quickstart.md">}}).

### Create a subscription

To create a new subscription:

1. Sign in to the Redis Enterprise Cloud [admin console](http://app.redislabs.com) or create a new account.

1. Select the **New subscription** button:

    {{<image filename="images/rc/button-subscription-new.png" alt="The New subscriptions button in the admin console menu." width="150px">}}{{</image>}}

1. Configure your subscription:

    1. Select **Fixed plans**.
    1. For the cloud vendor, select **Amazon Web Services** (AWS), **Google Cloud Platform** (GCP), or **Microsoft Azure**.
    1. Select a region to deploy the subscription to.
    1. From the dataset size list, select the Free tier (30MB).
    1. Enter a name for the subscription.

1. Select the **Create subscription** button:

    {{<image filename="images/rc/button-subscription-create.png" alt="The Create Subscription button." width="150px">}}{{</image>}}

### Create a Redis Stack database

After you create a subscription, follow these steps to create a Redis Stack database:

1. Select the **New database** button:

    {{<image filename="images/rc/button-database-new.png" alt="The New Database button creates a new database for your subscription." width="120px">}}{{</image>}}

1. In **General** settings, enter a **Database name**.

1. For database **Type**, select **Redis Stack**.

1. Select the **Activate database** button:

    {{<image filename="images/rc/button-database-activate.png" alt="Use the Activate database button to create and activate your database." width="150px">}}{{</image>}}

### Connect to the database

After creating the database, you can view its **Configuration** settings. You will need the following information to connect to your new database:

- **Public endpoint**: The host address of the database
- **Redis password**/**Default user password**: The password used to authenticate with the database

With this information, you can connect to your database with the [`redis-cli`]({{<relref "/rs/references/cli-utilities/redis-cli">}}) command-line tool, an application, or [RedisInsight](https://redislabs.com/redisinsight/).

## Try modules

To try out a module, follow its corresponding quick start guide:

- [RediSearch]({{<relref "/modules/redisearch/redisearch-quickstart.md">}})
- [RedisJSON]({{<relref "/modules/redisjson/redisjson-quickstart.md">}})
- [RedisGraph]({{<relref "/modules/redisgraph/redisgraph-quickstart.md">}})
- [RedisTimeSeries]({{<relref "/modules/redistimeseries/redistimeseries-quickstart.md">}})
- [RedisBloom]({{<relref "/modules/redisbloom/redisbloom-quickstart.md">}})
