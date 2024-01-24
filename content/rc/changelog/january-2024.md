---
Title: Redis Cloud changelog (January 2024)
linktitle: January 2024
description: New features, enhancements, and other changes added to Redis Cloud during January 2024.
highlights: Network data cost breakdowns
weight: 70
alwaysopen: false
categories: ["RC"]
aliases: []
---

## New features

### Database tags

You can now add [tags]({{< relref "/rc/databases/tag-database" >}}) to your database.

Tags are key-value pairs that let you categorize your databases. You can create tags and add them to your databases to associate them with each other. Once you've added tags, you can filter your databases in the [database list]({{<relref "/rc/databases/view-edit-database#manage-the-database-list">}}) by tag key or value. 

See [Manage tags]({{< relref "/rc/databases/tag-database" >}}) to learn how to add tags to your database.

### Network data cost breakdowns

Invoices for customers with Flexible and Annual subscriptions now include a breakdown of network data costs for the subscription. To download an invoice, go to the [Billing and Payments]({{<relref "/rc/billing-and-payments#download-invoice">}}) page on the [Redis Cloud console](https://app.redislabs.com/).

Customers with Annual subscriptions can also find a breakdown of network data costs in the consumption report.

## Deprecations

- {{< embed-md "rc-fixed-upgrade-limitation.md" >}}
