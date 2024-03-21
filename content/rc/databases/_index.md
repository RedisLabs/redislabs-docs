---
Title: Manage databases
description:
weight: 20
alwaysopen: false
categories: ["RC"]
linktitle: "Databases"
aliases: 
---

Databases are the heart of any Redis Cloud deployment.  

Here's how to perform a variety of tasks:

## Common database tasks

- [Create a database]({{<relref "rc/databases/create-database">}})

    - [Create an Essentials database]({{<relref "/rc/databases/create-database/create-essentials-database">}})
    - [Create a Pro database with a new subscription]({{<relref "/rc/databases/create-database/create-pro-database-new">}})
    - [Create a Pro database in an existing subscription]({{<relref "/rc/databases/create-database/create-pro-database-existing">}})

- [View and edit databases]({{<relref "rc/databases/view-edit-database">}})

- [Delete database]({{<relref "rc/databases/delete-database">}})

If you're new to Redis Cloud, see the [Quick Start]({{<relref "rc/rc-quickstart">}}).

## Additional tasks

- [Monitor database performance]({{<relref "rc/databases/monitor-performance">}}) 

- [Import data into databases]({{<relref "rc/databases/import-data">}}) 

- [Back up databases]({{<relref "rc/databases/back-up-data">}})

- [Secure database access]({{<relref "rc/security/database-security/">}})

- [Flush database data]({{<relref "rc/databases/flush-data">}})

## Configuration details

These topics provide background details that can help you tailor your databases to better fit your needs.

- [Clustering Redis databases]({{<relref "rc/databases/configuration/clustering">}}): Redis Cloud uses clustering to manage very large databases (25 GB and larger). Learn how to manage clustering and how to use hashing policies to manage the process.

- [Data eviction policies]({{<relref "rc/databases/configuration/data-eviction-policies">}}): Data eviction policies control what happens when new data exceeds the memory limits of a database. Learn the available policies and how to control them.

- [Data persistence]({{<relref "rc/databases/configuration/data-persistence">}}): Data persistence enables recovery in the event of memory loss or other catastrophic failure. Learn which options are available and how to apply specific settings to individual databases.

- [High availability and replication]({{<relref "rc/databases/configuration/high-availability">}}): Replication allows for automatic failover and greater fault tolerance. It can prevent data loss in the event of a hardware or zone failure.  Learn which options are available for Redis Cloud subscriptions.

- [Advanced Capabilities]({{<relref "rc/databases/configuration/advanced-capabilities">}}): Advanced capabilities extend Redis database functionality by adding new data types and options. Learn what advanced capability options are available for your database.

## Compatibility

Although Redis Cloud follows open source Redis specifications, it does not support certain commands. Instead of using these commands, Redis Cloud automatically handles features like replication and lets you [manage your database]({{<relref "/rc/databases">}}) from the [Redis Cloud console](https://app.redislabs.com/) or [Redis Cloud REST API]({{<relref "/rc/api">}}).

For more details, see:

- [Redis Cloud compatibility with open source Redis]({{<relref "/rc/compatibility">}})

- [Command compatibility]({{<relref "/rs/references/compatibility/commands">}})

- [Configuration compatibility]({{<relref "/rs/references/compatibility/config-settings">}})
