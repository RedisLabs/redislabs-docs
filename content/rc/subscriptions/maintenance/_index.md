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

If you want to control when Redis can perform maintenance for a Flexible or Annual subscription, you can [set manual maintenance windows]({{<relref "/rc/subscriptions/maintenance/set-maintenance-windows">}}).

## Types of maintenance

There are three different kinds of maintenance that Redis performs on a Redis Cloud subscription. The type of maintenance defines when Redis will notify you

If you want to receive notifications by email, make sure **Operational emails** is activated in your user settings in [Access Management]({{<relref "/rc/security/access-control/access-management">}}). 

### Urgent maintenance

Urgent maintenance refers to any activity that could affect service and cannot wait for scheduling. Redis can perform urgent maintenance at any time, even if you have set a manual maintenance window. Redis will notify users by email when maintenance starts and ends.

Urgent maintenance can include, but is not limited to:
    - Replacing a cluster node
    - Adding more memory to a node if it is running low
    - Re-starting the cluster proxy
    - Applying urgent security patches

### High-impact maintenance

High-impact maintenance refers to any activity that may introduce breaking changes. Redis will notify you about any high-impact changes a few weeks before they are released. You can choose to opt-in to any high-impact changes. If you opt-in to high-impact maintenance, Redis will perform it during a maintenance window, or during low-traffic hours if maintenance windows are set to **Automatic**. You will also be notified by email when maintenance starts and ends.

High-impact maintenance can include, but is not limited to:
    - Upgrading Redis or an advanced capability to the next major version
    - Upgrading to any version with breaking changes

### Low-impact maintenance

Low-impact maintenance refers to any non-urgent activity that does not introduce breaking changes. Redis will perform low-impact maintenance during a maintenance window, or during low-traffic hours if maintenance windows are set to **Automatic**. Redis will notify you by email when maintenance starts and ends.

Low-impact maintenance can include, but is not limited to:
    - Upgrading Redis or an advanced capability to the next minor version
    - Cluster optimization

