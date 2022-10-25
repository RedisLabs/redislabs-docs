---
Title: Redis Cloud quick start
description:
weight: 10
alwaysopen: false
categories: ["RC"]
linktitle: "Quick start"
aliases: /rv/quick-setup/
         /rc/quick-setup-redis-cloud/
         /rc/quick-setup/
---

If you're new to Redis Enterprise Cloud, this quick start helps you get up and running.  

You'll learn how to:

1.  Create an account, a free subscription, and a database

1.  Connect to your database

If you already have an account, see [Create a Fixed subscription]({{< relref "/rc/subscriptions/create-fixed-subscription" >}}) to create a Free 30MB subscription. Free plans are a tier of fixed plans; this provides an easy upgrade path when you need it.

If you already have a subscription, see [Manage subscriptions]({{< relref "/rc/subscriptions/" >}}) and [Manage databases]({{< relref "/rc/databases/" >}}).

## Create an account

To create a new account with a free subscription and database:

1. On the Redis Cloud [admin console](https://app.redislabs.com/#/login), select [Sign up](https://redis.com/try-free/).

1. Enter your information in the form and select **Get Started**, or sign up with Google or Github.

1. In the activation email, select **Activate account** to go to the Redis Cloud [admin console](https://app.redislabs.com/#/login).

    {{<image filename="images/rc/quickstart-quick-dialog.png" width="75%" alt="Dialog to create your free subscription." >}}{{< /image >}}

1. Select your preferred cloud vendor and region.

1. Select **Let's start free** to create your subscription and database.

    {{< note >}}
If you would rather customize your subscription and database, select **Create a custom database** to go to the **Add subscription** page. From there, you can [create a fixed subscription]({{< relref "/rc/subscriptions/create-fixed-subscription" >}}) or [create a flexible subscription]({{< relref "/rc/subscriptions/create-fixed-subscription" >}}).
    {{< /note >}}

    You're taken to the **Overview tab** for your new subscription.

    {{<image filename="images/rc/quickstart-subscription-overview.png" width="75%" alt="Overview tab showing your new subscription and database." >}}{{< /image >}}

1.  Select the database name to view the **Configuration** tab for your new database.

    {{<image filename="images/rc/quickstart-database-overview.png" width="75%" alt="Configuration tab showing details of your new database." >}}{{< /image >}}

    In the upper corner, an icon shows the current status of the database.  If the icon shows an orange clock, this means your database is still being created and its status is _pending_.

    ![Pending status icon](/images/rc/icon-database-update-status-pending.png#no-click "Pending database status") &nbsp; ![Active status icon](/images/rc/icon-database-update-status-active.png#no-click "Active database status")

    Once the database has been created, it becomes _active_ and the status indicator switches to a green circle containing a checkmark.  

Admin console operations are asynchronous; they operate [in the background]({{< relref "/rc/api/get-started/process-lifecycle.md" >}}).  You can continue to use the admin console for other tasks, but pending resources aren't available until they're active.

When your new database becomes active, you're ready to connect to it.

## Connect to a database

At this point, you're viewing the **Configuration** details for your new database.  

To connect to your database, you need your username and password. For the default user, the username is `default`.

The **Security** section contains your **Default user password**.  By default, this is masked.  Select the eye icon to show or hide the password.    

{{<image filename="images/rc/database-fixed-configuration-security.png" width="75%" alt="The Security section of the Configuration tab of the database details page." >}}{{< /image >}}

Once you have the username and password, select the **Connect** button to open the connection wizard.

![Connect button](/images/rc/connection-wizard-button.png#no-click "Connect button.")

{{<image filename="images/rc/connection-wizard.png" width="75%" alt="The connection wizard." >}}{{< /image >}}

The connection wizard shows how to connect to your database with the following methods:

- Using the `redis-cli` utility

- Using a [Redis client](https://redis.io/clients) for your preferred programming language

- Using [RedisInsight](https://redis.com/redis-enterprise/redis-insight/)

### redis-cli (via Docker){#using-rediscli}

The [`redis-cli`]({{<relref "/rs/references/cli-utilities/redis-cli/">}}) utility is installed when you install Redis.  It provides a command-line interface that lets you work with your database using core [Redis commands](https://redis.io/commands/).

[Docker](https://www.docker.com/) provides a convenient way to run `redis-cli` without the full installation experience.

Run the following commands to create a `redis` Docker container and connect to your database with `redis-cli`:

1.  Download the `redis` Docker image:

    ``` sh
    $ docker pull redis
    ```
1.  Start a container created from the image:

    ``` sh
    $ docker run -d --name redis1 redis
    ```

1.  Connect to a bash prompt running in the container:

    ``` sh
    $ docker exec -it redis1 bash
    ```

1. In the connection wizard, under **Redis CLI**, select the **Copy** button to copy the redis-cli command.

1. Paste the redis-cli command into the terminal, and replace `<username>` and `<password>` with your username and password.

1. After you connect to your database, try these basic Redis commands:

    ``` sh
    xxx:yyy> ping
    PONG
    xxx:yyy> set hello world
    OK
    xxx:yyy> get hello
    "world"
    ```

    See the [commmand list](https://redis.io/commands/) for a list of all Redis commands.

### Redis client

Different programming languages use different connection clients to interact with Redis databases. Each client has its own syntax and installation process, so read the documentation for the client you are using before running your code.

The connection wizard contains code snippets to connect to your database for the following programming languages:

- node.js using [ioredis](https://github.com/luin/ioredis#quick-start)
- .NET using [StackExchange.Redis](https://stackexchange.github.io/StackExchange.Redis/)
- Python using [redis-py](https://github.com/redis/redis-py#redis-py)
- Java using [Jedis](https://github.com/redis/jedis#jedis)

See the [client list](https://redis.io/docs/clients/) to view all Redis clients by language.

#### Code example (Python)

Here's how to connect to your database using the [redis-py](https://github.com/redis/redis-py#redis-py) library for Python.

1.  Install the Redis client if it is not already installed.

    ```sh
    $ sudo pip install redis
    ```

2.  In the connection wizard, under **Redis Client**, select Python from the **Select your client** menu.

3. Select **Copy** to copy the connection code for your database.

4. Paste the code into your program, and replace `<username>` and `<password>` with your username and password.

    ```python
    import redis

    r = redis.Redis(
      host='<host>',
      port=<port>,
      password='<password>')

    # Redis commands
    r.set('hello', 'world')
    print(r.get('hello'))
    ```

5. Run the program.

    ```sh
    $ python example_redis.py
    world
    ```

### RedisInsight

RedisInsight is a free Desktop GUI for Redis that is available for MacOS, Windows, and Linux.

1. In the connection wizard, under **Redis Client**, select your operating system from the **Download RedisInsight** menu.

1. Select **Download** to download RedisInsight.

1. [Install RedisInsight]({{< relref "/ri/installing/install-redis-desktop" >}}).

1. Once RedisInsight is installed and open, select **Add Redis Database**.

1. In the connection wizard, under **RedisInsight Desktop**, select **Copy** to copy the connection information.

1. In RedisInsight, paste the connection information into the **Host** field. RedisInsight will automatically populate the rest of the information needed to connect to the database with the default user.

1. Select **Add Redis Database** to connect to the database.

See the [RedisInsight documentation]({{< relref "/ri/_index.md" >}}) for more information.

## More info

- [Manage databases]({{< relref "/rc/databases/_index.md" >}})
- [Data persistence]({{< relref "/rc/databases/configuration/data-persistence.md" >}})
- [Secure your Redis Enterprise Cloud database]({{< relref "/rc/administration/security/_index.md" >}})
- [Back-up Flexible databases]({{< relref "/rc/databases/back-up-data.md" >}})
- [Monitor Redis Enterprise Cloud performance]({{< relref "/rc/databases/monitor-performance.md" >}}).
