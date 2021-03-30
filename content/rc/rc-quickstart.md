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

If you already have a subscription, see [Manage subscriptions]({{< relref "/rc/subscriptions/" >}})) and [Manage databases]({{< relref "/rc/databases/" >}}).

## Create a subscription

<!-- Redis Cloud subscriptions can be deployed in each of the major cloud platforms: **Amazon AWS**, **Google Cloud Platform**, and **Microsoft Azure**, 

Four plans are available, including:

- _Free:_ a basic plan designed for tutorial and experimentation.
- _Fixed:_ set pricing for low-throughput solutions.
- _Flexible:_ "Pay as you go" plans for any dataset size or throughput
- _Annual:_ Predfined commitments that provide substantial savings over Flexible plans.
-->

To create a new free subscription:

1. Sign in to the Redis Cloud admin portal.  (Create an acoount if you don't already have one.)

2. From the admin console menu, choose **Subscriptions**.

    _(screenshot)_

3.  Select the ![Add button](/images/rs/icon_add.png#no-click "Add").

4.  Choose a **Cloud Provider** and a **Region**.

    (You can ignore the **High-Availability** options for now; these are available in paid tiers only.)

5.  In the **Fixed Size** panel, locate the **Dataset Size** list and then choose **30MB**.

    Free plans are a tier of Fixed plans; this provides an easy upgrade path when you need it.

    _(screenshot)_

6.  Enter a descriptive **Subscription Name** and then select **Create**.

If this is your first subscription, you'll be taken directly to the **Create Database** screen.

## Create a database

Next, we create a database.

1.  If you aren't already at the Databases screen, sign into the Redis Cloud admin console, select **Databases** from the menu, and then select the ![Add button](/images/rs/icon_add.png#no-click "Add") button.

    _(screenshot)_

2.  Enter a descriptive **Database Name**.  

    You have 40 characters; you can use letters, numbers, or a hyphen.  The name must start with a letter and end with either a letter or a number.  Spaces are not allowed.

3.  For this exercise, leave the remaining options at their default values.  (To learn about them, see [Create a fixed subscription]({{< relref "/rc/subscriptions/create-fixed-subscription.md" >}}))

4.  Locate the **Activate** button near the bottom of the page and then select it.

5.  You're taken to the Configuration tab of the View Database screen.  In the upper corner, you'll see an orange box containing a rotating circle.  This is the Pending status indicator and it means your database is still being created.

    Admin console operations are asychronous; they operate in the background.  You can continue to use the admin console for other tasks, but your new database isn't available.  When the icon changes to show a green box containing a checkmark, your database is ready to use.

## Connect to a database

At this point, you're at the View Database screen for your new database.  

To connect to your database, you need three pieces of information:

- The public endpoint for your database.
- The port number
- The database password

These are available in the **Configuration** details of the **View Database** screen:

- The **Endpoint** setting shows the URI for your database and the port number

- The **Access Control & Security** setting shows a masked **Default Password**.  Use **Password** button to show or hide the password.  

    (Fixed, Flexible, and Annual plans help you secure your databases in a variety of ways, including IP address restriction, role-based-access-controls and more.)

Once you have the connection details, you can connect in a variety of ways, including:

-- Using the redis-cli utility 

-- Using a connection client from your preferred programming language

Here's an example of each.

### Using redic-cli (via Docker){#using-rediscli}

The `redis-cli` utility is installed when you install Redis.  

Docker provides a covenient way to run `redis-cli` without through the full installation experience.

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

    Replace `<endpoint>`, `<port>`, and `<password>` with the details copied from the **View Database** screen.

3.  You should now be connectd to your database and can perform basic Redis commands:

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

Here's how to connect to your database using a client for Python

1.  if you don't already have the client:

```sh
sudo pip install redis-client
```

2.  The specific syntax vries according to the client:

    ```python
# import the library
import redis-client
# Create connection object
r = redis.Redis(host='<endpoint>', port=<port>, password='<password>')
# set a value for an object
r.set('hello', 'world')
# retrieve and print the value for the  object
print(r.get('hello'))
    ```

Now run the code:

```sh
$ python example_redis.py
bar
```



## More info

- [Manage Databases]({{< relref "/rs/databases/_index.md" >}})
- [Data Persistence with Redis Cloud]({{< relref "rc/concepts/data-persistence.md" >}})
- [Secure Your Redis Cloud Database]({{< relref "/rc/administration/security/_index.md" >}})
- [Back-up Flexible databases]({{< relref "/rc/administration/configuration/backups.md" >}})
- [Monitor Redis Cloud Performance]({{< relref "/rc/administration/configuration/monitoring-performance.md" >}}).
