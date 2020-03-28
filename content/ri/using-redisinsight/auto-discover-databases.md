---
Title: Auto discover databases in RedisInsight
categories: ["RI"]
path: auto-discover-databases/
---

## Auto discovering on-premise Redis Enterprise databases

Redis Enterprise databases can be automatically discovered and added in RedisInsight.
In order to register these databases, these steps need to be followed.

- Step 1: Click on **ADD REDIS DATABASE**

![re-step-1](/images/ri/re-step-1.png)

- Step 2: Click on **Automatically Discover Databases**.

![re-step-2](/images/ri/re-step-2.png)

- Step 3: Choose **Redis Enterprise**.

![re-step-3](/images/ri/re-step-3.png)

- Step 4: Enter the connection details and click on **DISCOVER DATABASES** button.

![re-step-4](/images/ri/re-step-4.png)

- Step 5: Select the databases which you want to add from the list and click on **ADD SELECTED DATABASES**.

![re-step-5](/images/ri/re-step-5.png)

- Step 6: All the databases which were successfully added will be presented on the screen. Click on 'View databases' to see the auto discovered RE databases.

![re-step-6](/images/ri/rc-step-8.png)


## Auto discovering Redis Cloud databases

Redis Cloud databases can also be automatically discovered and added in RedisInsight.
Below are the steps which needs to be followed in order to register them to RedisInsight :

- Step 1: Click on **ADD REDIS DATABASE**

![rc-step-1](/images/ri/re-step-1.png)

- Step 2: Click on **Automatically Discover Databases**.

![rc-step-2](/images/ri/re-step-2.png)

- Step 3: Choose **Redis Cloud**.

![rc-step-3](/images/ri/re-step-3.png)

- Step 4: Enter the Account key and Secret key associated with your Redis Cloud account and click on **SUBMIT**.

![rc-step-4](/images/ri/rc-step-3.png)

- Step 5: A page showing information about your account will be displayed. If these details are not the correct ones, click on **NOT MY ACCOUNT** to enter the correct credentials, else, click on **Show subscriptions** in order to list all the subcriptions in your account.

![rc-step-5](/images/ri/rc-step-4.png)

- Step 6: Select the subscriptions accordingly and click on **Show databases** button.

![rc-step-6](/images/ri/rc-step-5.png)

- Step 7: A page containing all the active databases in the selected subscriptions will be displayed. Choose the databases which you want to register and click on **Register Databases** button.

![rc-step-7](/images/ri/rc-step-6.png)

- Step 8: A page containing successfully added and failed to add databases would be displayed. If all databases were successfully added, you would see a message saying 'All databases successfully added'.

![rc-step-8](/images/ri/rc-step-7.png)

- Step 9: Click on **View databases** to see the auto discovered RC databases.

![rc-step-9](/images/ri/rc-step-8.png)
