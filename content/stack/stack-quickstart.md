---
title: Redis Stack quick start
linkTitle: Quick start
description:
weight: 1
alwaysopen: false
categories: ["Modules"]
aliases: /modules/modules-quickstart/
---
To quickly set up a database with Redis Stack features,
you can sign up for a free [Redis Enterprise Cloud](https://app.redislabs.com/#/sign-up) subscription and create a Redis Stack database.

Alternatively, you can use one of these methods:

- [Redis Enterprise Software]({{<relref "/rs/installing-upgrading/quickstarts/redis-enterprise-software-quickstart">}})
- Redis Enterprise Software in a [Docker container]({{<relref "/rs/installing-upgrading/quickstarts/docker-quickstart">}})
- [Other platforms]({{<relref "/kubernetes/_index.md">}}) for Redis Enterprise Software

## Set up a Redis Cloud database

To set up a Redis Cloud database with Redis Stack features, follow these steps:

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
    1. For the cloud vendor, select **Amazon Web Services** (AWS), **Google Cloud** (GCP), or **Microsoft Azure**.
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

## Try Redis Stack features

To try out Redis Stack features, follow the examples provided by the corresponding guides:

- [Search and Query quick start](https://redis.io/docs/stack/search/quick_start/)
- [JSON quick start](https://redis.io/docs/stack/json/#use-redisjson)
- [Time Series quick start](https://redis.io/docs/stack/timeseries/quickstart/)
- [Probabilistic data structures quick start](https://redis.io/docs/stack/bloom/quick_start/)
