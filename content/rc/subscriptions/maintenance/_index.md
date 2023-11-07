---
Title: Subscription and database maintenance
LinkTitle: Maintenance
description: Describes maintenance that Redis performs on a Redis Cloud subscription.
weight: $weight
alwaysopen: false
toc: "true"
headerRange: "[1-3]"
categories: []
aliases: 
---

Redis will maintain your Redis Cloud subscriptions and databases as needed to ensure your databases are running the most stable and up-to-date version of Redis. During maintenance, you may notice some latency when connecting to your databases. 

Redis will attempt to perform maintenance during low-traffic hours when possible, based on the region where your subscription is located. If you want to control when Redis can perform maintenance for a Flexible subscription, you can [set manual maintenance windows]({{<relref "/rc/subscriptions/maintenance/set-maintenance-windows">}}).

## Maintenance activities

During maintenance, Redis ensures the stability of your subscriptions and databases. 

This includes, but is not limited to:

- Upgrading Redis or an advanced capability to the latest version
- Cluster optimization
- Replacing a cluster node
- Adding more memory to a node
- Applying security patches

Redis will notify users by email when maintenance starts and ends. If Redis needs an action from a user to start maintenance, Redis will notify users with a reasonable amount of time before planned maintenance. 

If you want to receive notifications by email, make sure **Operational emails** are activated in your user settings in [Access Management]({{<relref "/rc/security/access-control/access-management">}}). 

### Urgent maintenance

Urgent maintenance refers to any activity that could affect service and cannot wait for scheduling. This includes applying urgent security patches.

Redis can perform urgent maintenance at any time, even if you have set a manual maintenance window or have temporarily skipped maintenance. Redis will notify users by email when urgent maintenance starts and ends.

### Major upgrades

For major upgrades or upgrades that might include breaking changes, users will receive an advance notification with sufficient time to prepare before the upgrade.
