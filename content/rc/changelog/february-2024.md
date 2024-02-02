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

### New Backup location errors

The Redis Cloud console will now notify you through email and on the application if the back up location you specify does not exist or has the wrong permissions. See [Back up databases]({{<relref "rc/databases/back-up-data">}}) to learn how to set the right permissions for your back up locations.

### CIDR overlap detection

When you [create a new Flexible subscription]({{<relref "/rc/subscriptions/create-flexible-subscription">}}), the Redis Cloud console will now detect if the CIDR subnet range you specify is in use by another Flexible subscription on the same account.

