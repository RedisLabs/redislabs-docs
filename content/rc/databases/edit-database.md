---
Title: View and edit databases
description:
weight: $weight
alwaysopen: false
categories: ["RC"]
aliases: /rc/administration/setup-and-editing/viewing-editing-database/
        /rv/administration/setup_and_editing/viewing-editing-databases/
---
To view the details of a database, select it from the database list:

1.  Sign in to the Redis Cloud admin console.

2.  Choose **Databases** from the menu.

    If you have a single subscription, this displays a list of databases.

    _(screenshot)_

    If you have more than one subscrption, the database list is organized by subscription.

    _(screenshot)_

3.  Select the database from the list.

    If you have more than one subscription, select the subscription and then select the database.

This opens the **View Database** screen.

The View Database screen lets you review the configuration details of a database, graphs showing performance metrics, and a "slowlog" of recent actions. 

## Configuation details

When the **View Details** screen first appears, it defaults to the Configuration tab, which displays the following details:

| _Setting_ | _Description_ |
|-----------|---------------|
| **Subscription** | The name of your subscription.  By default, this shows a unique integer ID number followed by a string description the subscription settings.  You can change this by editing your subscription. |
| **Protocol** | The protocol of the database, either *Redis* (_default_) or *Memcached*. |
| **Used Memory** |  The amount of memory used by database.|
| **Replication** | When enabled, described replication settings |
| **Activated On** | Timestamp showing the date and time the database was created, using the default timezone associated with the deployed region.|
| **Last Changed** | Timestamp showing the last update to the database. |
| **Endpoint** | (_fixed plans only_) URI identifying the public endpoint and port for the database. |
| **Public Endpoint** | (_flexible plans only_) URI identifying the public endpoint and port for the database. |
| **Private Endpoint** | (_flexible plans only_) URI identifying the private endpoint and port for the database. |
| **Database Clustering** | (_flexible plans only_)  Summary of current clustering policy. |
| **OSS Cluster API support** | (_flexible plans only_)  Whether the API is enabled or not. |

| **Data Persistence** | When enabled, describes the current persistence algorithm. |
| **Access Control & Security** | Current user password, if any. |
| **Redis Version Compliance** | Core Redis version compatibility version.|
| **Data Eviction Policy** | Current data eviction policy. | 
| **Periodic Backup** | Backup settings, if any. | 
| **Modules** | When present, describes modules associated with the database. |
| **Alert settings** | Summarizes email notification settings.| 

## Other actions and info

The icons along the top of the View Database screen let you perform actions and report status:

| _Icon_ | _Descrition_ |
| (pencil) | Edit the database |
| (delete) | Delete the database.  Note: you have to empty a database before you can delete it. |
| (import) | [import data]({{< relref "/rc/how-to/importing-data.md" >}}) | 
| (backup) | [Backup data]({{< relref "/rc/administration/configuration/backups.md" >}}) | 
| (active) | The database is active and available for input. | 
| (pending) | The database is being updated and not available for input. | 

The **View Database** screen also has tabs that let you view:

- **Metrics**: a series of graphs showing database performance over time.

- **Slowlog**: a log showing recent actions for your database.  The log displays when the action started, the duration, the complexity of the operation, and any parameters passed to the operation.

## Edit a database

When you edit a database, certain fields cannot be updated, especially those that might lead to data loss.

You can change the following details:

- Database Name

- Whether the database allows password access or uses role-based access control (RBAC).

- The Data Eviction policy

- Email alert settings

If you need to change other details, create a new database and then migrate existing data.

