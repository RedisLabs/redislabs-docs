---
Title: Migrate data to new subscriptions
linkTitle: Migrate databases
description: Shows two ways to migrate data to a database in a new subscription.
weight: 75
alwaysopen: false
categories: ["RC"]
aliases: /rc/databases/migrate-databases/
---

There are times when it's necessary to migrate data from one database to another.  

Here are two ways to do it.

Each approach is appropriate for different situations and you should review the considerations accordingly.

## Transfer via import 

The most common way to transfer data to a new database is to import a copy of the data into the new database.

Here's how the process works:

1.  Create the target subscription and database.
2.  Select an export storage destination and verify that it's ready for use and has sufficient space.
3.  Export the data from the original database to the storage location.
4.  Import the exported data into the target database, the one hosted by the new subscription.



## Sync using Active-Passive

You can use Active-Passive to sync (synchronize) the source database to the target database.  This lets the source database remain active and ensures the data continues to migrate.  

To do this, specify the target database as an Active-Passive replica of the the source database.  The general process is:

1.  Get the public endpoint of the source database
2.  Specify the target database as an Active-Passive replica of the source.
3.  Wait for the data to sync.
4.  Switch apps and other connections to the target database.
5.  Disable Active-Passive for the target database.

You'll need the Public endpoint of the source database, which is available on the **Configuration** tab of the database details page.

Here's how this works for databases hosted on the same account:

1.  Select **Databases** from the [admin menu](http://app.redis.com/), and then select the source database from the list.

    {{image}}

2.  Select the **Configuration** tab and then locate the **Public endpoint** setting in the **General** section.

    {{image}}

3.  Select the **Copy** button to copy the endpoint details to the Clipboard.

    {{image}}

4.  Use the database list drop-down to select the target database from the list.

    {{image}}

5.  From the **Configuration** tab of that database, select the **Edit database** button.

    {{image}}

6.  In the **Durability** section, enable **Active-Passive Redis** and then select the **Add URI** button.

    {{image}}

    {{image}}

7.  In the text box, type `redis://` and then paste in the public endpoint details. 

    {{image}}

8.  Select the **Save** button.

    {{image}}

    This starts a task that updates the target database.  While this task runs, the database status is `Pending`.Data does not sync during this process.

    The sync process doesn't begin until the database becomes `Active`.  

    When the database is reported as `Synched,` everything is up to date.  

    {{image}}

Active-Passive sync lets you migrate data while apps and other connections are using the source database.At some point, all connections should be switched to the target database.  When that's complete, you can disable Active-Passive for the target database.

Note that this approach requires more memory than the import process.  On average, you need an extra 25% memory on top of other requirements.  For example, imagine you want to migrate a 1GB database that doesn't have replication enabled to a target database with replication enabled.  The target would need a memory limit of at least 2&frac12;GB.

Once the databases are synched, you can disable Active-Passive for the target database.  Before doing so, however, verify that apps and other connections have switched to the target database; otherwise, you may lose data.

For help setting up an Active-Passive relationship between databases hosted on different accounts, contact support.

