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

Redis will maintain your Redis Cloud subscriptions and databases as needed to ensure your databases are running the most stable and up-to-date version of Redis. During maintenance, you may notice some latency when connecting to your databases. Redis will attempt to perform maintenance during low-traffic hours when possible. 

If you want to control when Redis can perform maintenance for a Flexible subscription, you can [set manual maintenance windows]({{<relref "/rc/subscriptions/maintenance/set-maintenance-windows">}}).

## Maintenance activities

During maintenance, Redis staff will do anything that ensures the stability of your subscriptions and databases. 

This includes, but is not limited to:

- Upgrading Redis or an advanced capability to the latest version
- Cluster optimization
- Replacing a cluster node
- Adding more memory to a node
- Restarting the cluster proxy
- Applying security patches

Redis will notify users by email when maintenance starts and ends. If Redis needs an action on your end to start maintenance, Redis will notify users with a reasonable amount of time before planned maintenance. 

If you want to receive notifications by email, make sure **Operational emails** are activated in your user settings in [Access Management]({{<relref "/rc/security/access-control/access-management">}}). 

### Urgent maintenance

Urgent maintenance refers to any activity that could affect service and cannot wait for scheduling. Redis can perform urgent maintenance at any time, even if you have set a manual maintenance window or have temporarily skipped maintenance. Redis will notify users by email when urgent maintenance starts and ends.
