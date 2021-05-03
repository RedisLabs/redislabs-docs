---
Title: Automatically Discovering Databases
weight: 10
categories: ["RI"]
path: auto-discover-databases/
---
RedisInsight lets you automatically add Redis Enterprise Software and Redis Enterprise Cloud databases.

{{< note >}}
For Redis Cloud, auto-discovery is supported only for Flexible or Annual subscriptions.
{{< /note >}}

## Auto-discovery for Redis Software

To automatically discover and add Redit Software databases to RedisInsight:

1. In RedisInsight, select **ADD REDIS DATABASE**.

    ![re-step-1](/images/ri/re-step-1.png)

1. Select **Automatically Discover Databases**.

    ![re-step-2](/images/ri/rc-step-2.png)

1. Select **Redis Enterprise**.

    ![re-step-3](/images/ri/rc-step-3.png)

1. Enter the connection details and then select **DISCOVER DATABASES**.

    ![re-step-4](/images/ri/re-step-4.png)

1. From the list of databases, choose the databases that you want to add and then select **ADD SELECTED DATABASES**.

    ![re-step-5](/images/ri/re-step-5.png)

    All of the databases that were successfully added are dislayed on the screen. To see the databases in the **Databases** page, click **VIEW DATABASES**.

## Auto-discovery for Redis Cloud databases

To automatically discover and add Redis Cloud databases to RedisInsight:

1. In RedisInsight, select **ADD REDIS DATABASE**.

    ![rc-step-1](/images/ri/re-step-1.png)

1. Select **Automatically Discover Databases**.

    ![rc-step-2](/images/ri/rc-step-2.png)

1. Select **Redis Enterprise Cloud**.

    ![rc-step-3](/images/ri/rc-step-3.png)

1. Enter the [Account Key]({{< relref "/rc/api/get-started/_index.md#account-key" >}}) and the [Secret key]({{< relref "/rc/api/get-started/_index.md#secret-key" >}}) associated with your Redis Cloud subscription and then select **SUBMIT**.

    ![rc-step-4](/images/ri/rc-step-4.png)

1. Verify the details for the account:
    - If the account details match your account, select **MY SUBSCRIPTIONS** to list the subscriptions in your account.
    - If the account details do not match your account, select **NOT MY ACCOUNT** and then verify the credentials.

    ![rc-step-5](/images/ri/rc-step-5.png)

1. Choose the subscriptions that contain databases to be added to RedisInsight and then select  **SHOW DATABASES**.

    ![rc-step-6](/images/ri/rc-step-6.png)

1. From the list of active databases in the selected subscriptions, choose the databases to be added to RedisInsight and then select **REGISTER DATABASES**.

    ![rc-step-7](/images/ri/rc-step-7.png)

    When sucessfully added, databases are dislayed on the screen. If all databases are added successfully, the message **All selected databases added successfully** is displays.

    ![rc-step-8](/images/ri/rc-step-8.png)

1.  To see the automatically discovered databases in the **Databases** page, select **VIEW DATABASES**.
