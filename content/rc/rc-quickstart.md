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

If you're new to Redis Enterprise Cloud, this quick start helps you get up and running.  

You'll learn how to:

1.  Create a free subscription

2.  Create a database

3.  Connect to your database

If you already have a subscription, see [Manage subscriptions]({{< relref "/rc/subscriptions/" >}}) and [Manage databases]({{< relref "/rc/databases/" >}}).

## Create a subscription

To create a new free subscription:

1. Sign in to the Redis Cloud admin portal.  (Create an acoount if you don't already have one.)

2. From the admin console menu, choose **Subscriptions**.

    {{<image filename="images/rc/subscription-menu-select.png" alt="The Subscriptions command from the admin console menu." >}}{{< /image >}}



3.  Select the **Add Subscription** button (![Add button](/images/rs/icon_add.png#no-click "Add Subscription")).

    {{<image filename="images/rc/subscription-list-empty.png" alt="The Subscription list when you have no subscriptions." >}}{{< /image >}}

4.  Choose a **Cloud Provider** and a **Region**.

    (You can ignore the **High-Availability** options for now; these are available in paid tiers only.)

5.  In the **Fixed Size** panel, locate the **Dataset Size** list and then choose **30MB**.

    Free plans are a tier of Fixed plans; this provides an easy upgrade path when you need it.

    {{<image filename="images/rc/subscription-create-free.png" width="75%" alt="Create a free subscription. " >}}{{< /image >}}

6.  Enter a descriptive **Subscription Name** and then select **Create**.

If this is your first subscription, you'll be taken directly to the **Create Database** screen.

## Create a database

Next, we create a database.

1.  If you aren't already at the Databases screen, sign into the Redis Cloud admin console, select **Databases** from the menu, and then select the ![Add button](/images/rs/icon_add.png#no-click "Add") button.

    {{<image filename="images/rc/fixed-sub-create-database-free.png" width="75%" alt="Create a free subscription. " >}}{{< /image >}}

2.  Enter a descriptive **Database Name**.  

    - You have 40 characters  
    - You can use letters, numbers, or a hyphen  
    - The name must start with a letter and end with either a letter or a number
    - Spaces are not allowed

3.  For this exercise, leave the remaining options at their default values.  (To learn about them, see [Create a fixed subscription]({{< relref "/rc/subscriptions/create-fixed-subscription.md" >}}).)

4.  Locate the **Activate** button near the bottom of the page and then select it.

5.  You're taken to the **Configuration** tab of the **View Database** screen.  In the upper corner, you'll see an orange box containing a rotating circle.  This is the Pending status indicator and it means your database is still being created.

    ![Pending icon](/images/rc/icon-pending.png#no-click "Pending icon") &nbsp; ![Active icon](/images/rc/icon-active.png#no-click "Active icon")

    When the database has been created, the status indicator switches to a green box containing a checkmark; this is the Active status indicator.  When your database becomes active, it's ready for use.

    Admin console operations are asychronous; they operate [in the background]({{< relref "/rc/api/concepts/provisioning-lifecycle.md" >}}).  You can continue to use the admin console for other tasks, but your new database isn't available.  When the icon changes to show a green box containing a checkmark, your database is ready to use.

## Connect to a database

At this point, you're at the **View Database** screen for your new database.  

To connect to your database, you need the following info:

- The public endpoint for your database
- The port number
- The database password

These are available in the **Configuration** details of the **View Database** screen:

- The **Endpoint** setting shows the URI for your database and the port number

- The **Access Control & Security** setting shows a masked **Default Password**.  Use **Password** button to show or hide the password.  

Once you have the connection details, you can connect in a variety of ways, including:

- Using the `redis-cli` utility 

- Using a [connection client](https://redis.io/clients) for your preferred programming language

Here's an example of each.

### Using redis-cli (via Docker){#using-rediscli}

The `redis-cli` utility is installed when you install Redis.  It provides a command-line interface that lets you work with your database using core [Redis commands](https://redis.io/commands).

Docker provides a covenient way to run `redis-cli` without the full installation experience.

When you run the `redis` Docker image, you can open a bash shell instance and run `redis-cli` from the container.

1.  To begin, pull the `redis` docker image and run it with default options:

    ``` sh
    % docker pull redis
    % docker run -d --name redis1 redis
    % docker exec -it redis1 bash
    ```

2.  This gives you a bash prompt running within your Docker image.  From here, you can connect to your database:

    ``` sh
    # redis-cli -h <endpoint> -p <port> -a <password>
    xxx:yyy> 
    ```

    Replace `<endpoint>`, `<port>`, and `<password>` with the details copied earlier from the **View Database** screen.

3.  You should now be connectded to your database and can perform basic Redis commands:

    ``` sh
    xxx:yyy> ping
    PONG
    xxx:yyy> set hello world
    OK
    xxx:yyy> get hello
    "world"
    ```

### Programming language (Python)

Different programming languages use different clients to interact with Redis databases.

Here's how to connect to your database using the `redis-py` library for Python.

1.  If you don't already have the client installed:

    ```sh
    sudo pip install redis-py
    ```

2.  The specific syntax vries according to the client:

    ```python
    import redis
    r = redis.Redis(host='<endpoint>', port=<port>, 
                    password='<password>')
    r.set('hello', 'world')
    print(r.get('hello'))
    ```
    
3.  Now, run the code:

    ```sh
    $ python example_redis.py
    bar
    ```



## More info

- [Manage Databases]({{< relref "/rc/databases/_index.md" >}})
- [Data Persistence with Redis Cloud]({{< relref "rc/concepts/data-persistence.md" >}})
- [Secure Your Redis Cloud Database]({{< relref "/rc/administration/security/_index.md" >}})
- [Back-up Flexible databases]({{< relref "/rc/databases/back-up-data.md" >}})
- [Monitor Redis Cloud Performance]({{< relref "/rc/databases/monitor-performance.md" >}}).
