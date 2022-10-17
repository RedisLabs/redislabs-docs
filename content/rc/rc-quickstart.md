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

1.  Create an account with a free subscription and database

1.  Connect to your database

If you already have an account, see [Create a Fixed subscription]({{< relref "/rc/subscriptions/create-fixed-subscription" >}}) to create a Free 30MB subscription. Free plans are a tier of fixed plans; this provides an easy upgrade path when you need it.

If you already have a subscription, see [Manage subscriptions]({{< relref "/rc/subscriptions/" >}}) and [Manage databases]({{< relref "/rc/databases/" >}}).

## Create an account

To create a new account with a free subscription and database:

1. On the Redis Cloud [admin console](https://app.redislabs.com/#/login), select [Sign up](https://redis.com/try-free/).

1. Enter your information in the form and select **Get Started**, or sign up with Google or Github.

1. When you receive the activation email, select **Activate account** to be taken to the Redis Cloud [admin console](https://app.redislabs.com/#/login).

    {{<image filename="images/rc/quickstart-quick-dialog.png" width="75%" alt="Dialog to create your free subscription." >}}{{< /image >}}

1. Select your preferred cloud vendor and region from the dialog.

1. Select **Let's start free** to create your subscription and database.

    If you would rather customize your subscription and database, Select **Create a custom database** to be sent to the Add subscription page. From there, you can [create a fixed subscription]({{< relref "/rc/subscriptions/create-fixed-subscription" >}}) or [create a flexible subscription]({{< relref "/rc/subscriptions/create-fixed-subscription" >}}).

1.  You're taken to the **Overview tab** for your new subscription.

    {{<image filename="images/rc/quickstart-subscription-overview.png" width="75%" alt="Overview tab showing your new subscription and database." >}}{{< /image >}}

    Select the database name to view the **Configuration** tab for your new database.

    {{<image filename="images/rc/quickstart-database-overview.png" width="75%" alt="Configuration tab showing details of your new database." >}}{{< /image >}}

    In the upper corner, an icon shows the current status of the database.  If the icon shows an orange clock, this means your database is still being created and its status is _pending_.

    ![Pending status icon](/images/rc/icon-database-update-status-pending.png#no-click "Pending database status") &nbsp; ![Active status icon](/images/rc/icon-database-update-status-active.png#no-click "Active database status")

    Once the database has been created, it becomes _active_ and the status indicator switches to a green circle containing a checkmark.  

Admin console operations are asynchronous; they operate [in the background]({{< relref "/rc/api/get-started/process-lifecycle.md" >}}).  You can continue to use the admin console for other tasks, but pending resources aren't available until they're active.

When your new database becomes active, you're ready to connect to it.

## Connect to a database

At this point, you're viewing the **Configuration** details for your new database.  

To connect to your database, you need the following info:

- The hostname for your database
- The port number
- The database password

These are displayed in the **Configuration** tab.  

- In the **General** section, the **Public endpoint** setting shows the hostname for your database and the port number.

- The **Security** section contains your **Default user password**.  By default, this is masked.  Select the eye icon to show or hide the password.    

    {{<image filename="images/rc/database-fixed-configuration-security.png" width="75%" alt="The Security section of the Configuration tab of the database details page." >}}{{< /image >}}


Once you have the connection details, you can connect in a variety of ways, including:

- Using the `redis-cli` utility

- Using a [connection client](https://redis.io/clients) for your preferred programming language

Here's an example of each.

### Use redis-cli (via Docker){#using-rediscli}

The [`redis-cli`]({{<relref "/rs/references/cli-utilities/redis-cli/">}}) utility is installed when you install Redis.  It provides a command-line interface that lets you work with your database using core [Redis commands](https://redis.io/commands/).

[Docker](https://www.docker.com/) provides a convenient way to run `redis-cli` without the full installation experience.

Run the following commands to create a `redis` Docker container and connect to your database with `redis-cli`:

1.  Download the `redis` Docker image:

    ``` sh
    $ docker pull redis
    ```
2.  Start a container created from the image:

    ``` sh
    $ docker run -d --name redis1 redis
    ```
3.  Connect to a bash prompt running in the container:
    ``` sh
    $ docker exec -it redis1 bash
    ```

4. Connect to your database with `redis-cli`:

    ``` sh
    # redis-cli -h <host> -p <port> -a <password>
    ```

    Replace `<host>`, `<port>`, and `<password>` with the details copied earlier from the **View Database** screen.

5. After you connect to your database, try these basic Redis commands:

    ``` sh
    xxx:yyy> ping
    PONG
    xxx:yyy> set hello world
    OK
    xxx:yyy> get hello
    "world"
    ```

### Use code (Python)

Different programming languages use different clients to interact with Redis databases.

Here's how to connect to your database using the `redis-py` library for Python.

1.  If you don't already have the client installed:

    ```sh
    sudo pip install redis
    ```

2.  The specific syntax varies according to the client:

    ```python
    import redis
    r = redis.Redis(host='<endpoint>', port='<port>',
                    password='<password>')
    r.set('hello', 'world')
    print(r.get('hello'))
    ```

3.  Now, run the code:

    ```sh
    $ python example_redis.py
    world
    ```

See the [client list](https://redis.io/docs/clients/) to view all Redis clients by language.

## More info

- [Manage databases]({{< relref "/rc/databases/_index.md" >}})
- [Data persistence]({{< relref "/rc/databases/configuration/data-persistence.md" >}})
- [Secure your Redis Enterprise Cloud database]({{< relref "/rc/administration/security/_index.md" >}})
- [Back-up Flexible databases]({{< relref "/rc/databases/back-up-data.md" >}})
- [Monitor Redis Enterprise Cloud performance]({{< relref "/rc/databases/monitor-performance.md" >}}).
