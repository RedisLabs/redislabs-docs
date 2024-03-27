---
Title: Redis Cloud changelog (February 2024)
linktitle: February 2024
description: New features, enhancements, and other changes added to Redis Cloud during February 2024.
highlights: CIDR overlap detection
weight: 65
alwaysopen: false
categories: ["RC"]
aliases: []
---

## Enhancements

### Dataset size alert set by default

The **Dataset size has reached** [alert]({{<relref "/rc/databases/create-database#alerts-section">}}) is now set by default when you create your first database in a Flexible subscription.

### Separated capability selection

When you select [advanced capabilities]({{<relref "/rc/databases/create-database#modules">}}) during database creation, selecting **Search and query** will no longer automatically select **JSON**. You can still combine the **Search and query** and **JSON** advanced capabilities.

### New backup location errors

The Redis Cloud console will now notify you through email and on the application if the backup location you specify does not exist or has the wrong permissions. See [Back up databases]({{<relref "rc/databases/back-up-data">}}) to learn how to set the correct permissions for your backup locations.

### CIDR overlap detection

When you [create a new Flexible subscription]({{<relref "/rc/databases/create-database/create-pro-database-new">}}), the Redis Cloud console will now detect if the Classless Inter-Domain Routing (CIDR) subnet range you specify is in use by another Flexible subscription on the same account. This will allow you to address and resolve CIDR conflicts in your Redis deployment.

