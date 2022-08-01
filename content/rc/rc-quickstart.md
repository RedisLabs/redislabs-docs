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

1. Sign in to the Redis Cloud [admin portal](https://app.redislabs.com/new/).  (Create an account if you don't already have one.)

2. If this is the first time you've signed in, you have no active subscriptions and can select the **Add subscription** button.

    {{<image filename="images/rc/button-subscription-add.png" alt="The Add subscriptions button appears when there are no other subscriptions." >}}{{< /image >}}

    If you already have a subscription, select the **New subscription** button in the admin menu.

    {{<image filename="images/rc/button-subscription-new.png" alt="The New subscriptions button in the admin console menu." >}}{{< /image >}}

    (You can only have one free subscription.)

3. When the **New subscription** page appears, select **Fixed plans** and then scroll to the cloud vendor options.

    {{<image filename="images/rc/subscription-new-plan-options.png" alt="Available subscription plan options." >}}{{< /image >}}

4.  Choose a **Cloud Provider** and a **Region**.

    (You can ignore the **High-Availability** options for now; these are available in paid tiers only.)

    {{<image filename="images/rc/subscription-new-cloud-vendor-options.png" alt="Available cloud vendor options." >}}{{< /image >}}


5.  In the **Fixed Size** panel, locate the **Dataset Size** list and then choose **30MB**.

    Free plans are a tier of Fixed plans; this provides an easy upgrade path when you need it.

    {{<image filename="images/rc/subscription-new-fixed-plan-options.png" alt="Create a free subscription. " >}}{{< /image >}}

6.  Enter a descriptive **Subscription Name** and then select the **Create subscription**.

    {{<image filename="images/rc/button-subscription-create.png" alt="The Create subscription button is located below the subscription options. " >}}{{< /image >}}


## Create a database

Now that you have a subscription, you need to create a database.

1.  If you aren't already at the **Subscription details** screen, sign into the Redis Cloud admin console and select your subscription from the subscription list.

2.  Select the **New Database** button.

    {{<image filename="images/rc/button-database-new.png" alt="Use the New database to create a database." >}}{{< /image >}}

2.  In the **General** section, enter a descriptive **Database Name**.  

    - You have 40 characters  
    - You can use letters, numbers, or a hyphen  
    - The name must start with a letter and end with either a letter or a number
    - Spaces are not allowed

    {{<image filename="images/rc/database-new-free-name.png" width="75%" alt="Create new database. " >}}{{< /image >}}

3.  For this exercise, leave the remaining options at their default values.  (To learn about them, see [Create a fixed subscription]({{< relref "/rc/subscriptions/create-fixed-subscription.md" >}}).)

4.  Select the **Activate database** button near the upper, right corner of the page.

5.  You're taken to the **Configuration tab** for your new database.

    {{<image filename="images/rc/database-fixed-configuration-general.png" width="75%" alt="Configuration tab showing details of your new database." >}}{{< /image >}}

    In the upper corner, an icon shows the current status of the database.  If the icon shows an orange clock, this means your database is still being created and its status is _pending_.

    ![Pending status icon](/images/rc/icon-database-status-pending.png#no-click "Pending database status") &nbsp; ![Active status icon](/images/rc/icon-database-status-active.png#no-click "Active database status")

    Once the database has been created, it becomes _active_ and the status indicator switches to a teal circle containing a checkmark.  

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

The `redis-cli` utility is installed when you install Redis.  It provides a command-line interface that lets you work with your database using core [Redis commands](https://redis.io/commands).

Docker provides a convenient way to run `redis-cli` without the full installation experience.

When you run the `redis` Docker image, you can open a bash shell instance and run `redis-cli` from the container.

1.  Enter this command in your command-line interface. A bash prompt opens in your Docker image.

    ``` sh
    $ docker pull redis
    $ docker run -d --name redis1 redis
    $ docker exec -it redis1 bash
    ```

2.  This gives you a bash prompt running within your Docker image.  From here, you can connect to your database:

    ``` sh
    # redis-cli -h <host> -p <port> -a <password>
    ```

    Replace `<host>`, `<port>`, and `<password>` with the details copied earlier from the **View Database** screen.

3.  You should now be connected to your database and can perform basic Redis commands:

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

## More info

- [Manage databases]({{< relref "/rc/databases/_index.md" >}})
- [Data persistence]({{< relref "/rc/databases/configuration/data-persistence.md" >}})
- [Secure your Redis Enterprise Cloud database]({{< relref "/rc/administration/security/_index.md" >}})
- [Back-up Flexible databases]({{< relref "/rc/databases/back-up-data.md" >}})
- [Monitor Redis Enterprise Cloud performance]({{< relref "/rc/databases/monitor-performance.md" >}}).
