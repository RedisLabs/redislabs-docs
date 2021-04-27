---
Title: Automatically Discovering Databases
weight: 10
categories: ["RI"]
path: auto-discover-databases/
---
RedisInsight lets you automatically add Redis Enterprise Software (RS) and Redis Enterprise Cloud databases.

{{< note >}}
For auto-discovery, Redis Enterprise Cloud databases must be in a Pro subscription.
{{< /note >}}

## Auto-discovery for Redis Enterprise Software

To automatically discover and add RS databases to RedisInsight:

1. In RedisInsight, click **ADD REDIS DATABASE**.

    ![re-step-1](/images/ri/re-step-1.png)

1. Click on **Automatically Discover Databases**.

    ![re-step-2](/images/ri/rc-step-2.png)

1. Select **Redis Enterprise**.

    ![re-step-3](/images/ri/rc-step-3.png)

1. Enter the connection details and click **DISCOVER DATABASES**.

    ![re-step-4](/images/ri/re-step-4.png)

1. From the list of databases, select the databases that you want to add and click **ADD SELECTED DATABASES**.

    ![re-step-5](/images/ri/re-step-5.png)

    All of the databases that were successfully added are dislayed on the screen. To see the databases in the Databases page, click **VIEW DATABASES**.

## Auto-discovery for Redis Enterprise Cloud databases

To automatically discover and add Redis Enterprise Cloud (RC) databases to RedisInsight:

1. In RedisInsight, click **ADD REDIS DATABASE**.

    ![rc-step-1](/images/ri/re-step-1.png)

1. Click on **Automatically Discover Databases**.

    ![rc-step-2](/images/ri/rc-step-2.png)

1. Select **Redis Enterprise Cloud**.

    ![rc-step-3](/images/ri/rc-step-3.png)

1. Enter the [Account Key]({{< relref "/rc/api/concepts/authentication-and-authorization#account-key" >}}) and the [Secret key]({{< relref "/rc/api/concepts/authentication-and-authorization#secret-key" >}}) associated with your Redis Enterprise Cloud account and click **SUBMIT**.

    ![rc-step-4](/images/ri/rc-step-4.png)

1. Verify the details for the account:
    - If the account details match your account, click on **MY SUBSCRIPTIONS** to list all of the subscriptions in your account.
    - If the account details do not match your account, click **NOT MY ACCOUNT** and enter the correct credentials.

    ![rc-step-5](/images/ri/rc-step-5.png)

1. Select the subscriptions that contain the databases that you want to add and click **SHOW DATABASES**.

    ![rc-step-6](/images/ri/rc-step-6.png)

1. From the list of active databases in the selected subscriptions, select the databases that you want to register and click **REGISTER DATABASES**.

    ![rc-step-7](/images/ri/rc-step-7.png)

    All of the databases that were successfully added are dislayed on the screen. If all of the databases were added successfully, **All selected databases added successfully** is shown.

    ![rc-step-8](/images/ri/rc-step-8.png)

1.  To see the automatically discovered databases in the Databases page, click **VIEW DATABASES**.
