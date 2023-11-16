---
Title: Manage databases
description:
weight: 35
alwaysopen: false
categories: ["RC"]
linktitle: "Databases"
aliases: 
---

Databases are the heart of any Redis Cloud subscription.  

Here's how to perform a variety of tasks:

## Common database tasks

- [Create a database]({{<relref "rc/databases/create-database.md">}})

- [View and edit databases]({{<relref "rc/databases/view-edit-database.md">}})

- [Delete database]({{<relref "rc/databases/delete-database.md">}})

If you're new to Redis Cloud, consider the [Quick Start]({{<relref "rc/rc-quickstart">}})

## Additional tasks

- [Monitor database performance]({{<relref "rc/databases/monitor-performance.md">}}) 

- [Import data into databases]({{<relref "rc/databases/import-data.md">}}) 

- [Back up databases]({{<relref "rc/databases/back-up-data.md">}})

- [Secure database access]({{<relref "rc/security/database-security/_index.md">}})

- [Flush database data]({{<relref "rc/databases/flush-data.md">}})

## Configuration details

These topics provide background details that can help you tailor your databases to better fit your needs.

- [Clustering Redis databases]({{<relref "rc/databases/configuration/clustering.md">}}): Redis Cloud uses clustering to manage very large databases (25 GB and larger). Learn how to manage clustering and how to use hashing policies to manage the process.

- [Data eviction policies]({{<relref "rc/databases/configuration/data-eviction-policies.md">}}): Data eviction policies control what happens when new data exceeds the memory limits of a database. Learn the available policies and how to control them.

- [Data persistence]({{<relref "rc/databases/configuration/data-persistence.md">}}): Data persistence enables recovery in the event of memory loss or other catastrophic failure. Learn which options are available and how to apply specific settings to individual databases.

- [High availability and replication]({{<relref "rc/databases/configuration/high-availability.md">}}): Replication allows for automatic failover and greater fault tolerance. It can prevent data loss in the event of a hardware or zone failure.  Learn which options are available for Redis Cloud subscriptions.

## Compatibility

Although Redis Cloud follows open source Redis specifications, it does not support certain commands. Instead of using these commands, Redis Cloud automatically handles features like replication and lets you [manage your database]({{<relref "/rc/databases">}}) from the [Redis Cloud console](https://app.redislabs.com/) or [Redis Cloud REST API]({{<relref "/rc/api">}}).

For more details, see:

- [Redis Enterprise compatibility with open source Redis]({{<relref "/rs/references/compatibility">}})

- [Command compatibility]({{<relref "/rs/references/compatibility/commands">}})

- [Configuration compatibility]({{<relref "/rs/references/compatibility/config-settings">}})
