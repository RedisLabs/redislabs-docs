---
Title: Auto discover databases
weight: 10
categories: ["RI"]
path: auto-discover-databases/
---
This page lists the steps to be followed in order to automatically add on-premise Redis Enterprise and Redis Enterprise Cloud (Pro) databases.

{{% note %}}
In case of auto discovering Redis Enterprise Cloud databases, RedisInsight currently only supports discovering those databases which are part of "PRO subscriptions".
{{% /note %}}

## Auto discovering on-premise Redis Enterprise databases

Redis Enterprise (RE) databases can be automatically discovered and added in RedisInsight.
In order to register RE databases, these steps need to be followed :

- **Step 1**: Click on **ADD REDIS DATABASE**

![re-step-1](/images/ri/re-step-1.png)

- **Step 2**: Click on **Automatically Discover Databases**.

![re-step-2](/images/ri/rc-step-2.png)

- **Step 3**: Choose **Redis Enterprise**.

![re-step-3](/images/ri/rc-step-3.png)

- **Step 4**: Enter the connection details and click on **DISCOVER DATABASES**.

![re-step-4](/images/ri/re-step-4.png)

- **Step 5**: Select the databases which you want to add from the list and click on **ADD SELECTED DATABASES**.

![re-step-5](/images/ri/re-step-5.png)

- **Step 6**: All the databases which were successfully added will be dislayed on the screen. Click on **VIEW DATABASES** in order to see them in the databases page.

## Auto discovering Redis Enterprise Cloud (Pro) databases

Redis Enterprise Cloud (RC) databases can also be automatically discovered and added in RedisInsight.
Below are the steps which needs to be followed in order to register them in RedisInsight :

- **Step 1**: Click on **ADD REDIS DATABASE**

![rc-step-1](/images/ri/re-step-1.png)

- **Step 2**: Click on **Automatically Discover Databases**.

![rc-step-2](/images/ri/rc-step-2.png)

- **Step 3**: Choose **Redis Enterprise Cloud**.

![rc-step-3](/images/ri/rc-step-3.png)

- **Step 4**: Enter the Account key and the Secret key associated with your Redis Enterprise Cloud account and click on **SUBMIT**.

![rc-step-4](/images/ri/rc-step-4.png)

- **Step 5**: A page showing information about your account will be displayed. If these details are not correct, click on **NOT MY ACCOUNT** in order to enter the correct credentials, else, click on **MY SUBSCRIPTIONS** in order to list all the subscriptions in your account.

![rc-step-5](/images/ri/rc-step-5.png)

- **Step 6**: Select the subscriptions accordingly and click on **SHOW DATABASES**.

![rc-step-6](/images/ri/rc-step-6.png)

- **Step 7**: A page containing all the active databases in the selected subscriptions will be displayed. Choose the databases which you want to register and click on **REGISTER DATABASES**.

![rc-step-7](/images/ri/rc-step-7.png)

- **Step 8**: A page containing successfully added and failed to add databases would be displayed. If all databases were successfully added, you would see a message saying 'All selected databases added successfully'.

![rc-step-8](/images/ri/rc-step-8.png)

- **Step 9**: Click on **VIEW DATABASES** to see the auto discovered Redis Enterprise Cloud databases.