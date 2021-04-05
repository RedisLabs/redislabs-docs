---
Title: View or change a Fixed subscription
description:
weight: 40
alwaysopen: false
categories: ["RC"]
linktitle: View Fixed subscription
aliases: /rv/administration/setup_and_editing/view-edit-subscription/
         /rc/administration/setup-and-editing/viewing-subscription/
         /rc/administration/setup-and-editing/changing-subscription-plan/
         /rc/administration/setup-and-editing/changing-subscription-plan/
---
To view the details of a Fixed subscription:

1.  Use the admin console menu to select the **Subscriptions** command.  This displays the **Subscriptions** list.

1.  Select the subscription you wish to view.

    (screenshot)

The following details are displayed:

| _Detail_ | _Description_ |
|+---------|+--------------|
| **Description** | Brief summary of subscription, including the plan type, cloud provider, region, and data size limit. |
| **Name** | A descriptive name for the plan.  Can be changed at any time. |
| **Price** | Cost of the plan |
| **Payment method** | (_Paid plans only_)  Current payment method.  Can be changed. |
| **Memory size** | Maximum memory available for your plan. | 
| **Infinite auto-scalability** | |
| **Multi-core Redis** | |
| **Replication** | Checked when enabled for subscription. |
| **Auto-failover** | Checked when enabled for subscription. |
| **Data persistence** | Checked when enabled for subscription. |
| **Connections** | Maximum number of concurrent connections |
| **Dedicated databases** | Max number of databases allowed for plan |
| **Security groups** /<br/>**Source IP authentication rules** | Number of supported security groups and IP auth rules |
| **24/7 toll-free support hotline** | When checked, you can use the hotline for help at any time of day. | 

## Change fixed subscription details

Once a subscription has been created, only a few details can be changed, including the:

- **Name** associated with the description.
- **Payment method** (paid plans only).
- Plan tier, which changes the maximum memory, the nuber of databases, and [other options]({{<relref "rc/subscriptions/create-fixed-subscription.md#fixed-size-subscription-tiers">}}).

To change the name or payment method, select the edit icon (pencil icon) and then update the info.

To update your subscription to a new tier, select the **Change Subscription** button while viewing the subscription details.

This displays the **Change Subscription** screen

Here, you can change the plan type and the tier.

- Fixed plans are either **Cache** plans or **Standard** plans.

    Cache plans do not support repliction, persistence, failover, or scalability.

    Standard plans support replication, persistance, auto-failover, and backups.  However, these features require more memory.

    Standard plans are not supported for free subscriptions.

- Each tier in a Fixed plan provides a variety of benefits, including increased memory, number of databases, connections, and so on.

When you change your plan tier, your data and endpoints are not disrupted.  

If you upgrade a free plan to a paid tier, you need to add a payment method.

If you change your subscription to a lower tier, make sure your data (and databases) fit within the limits of the new tier; otherwise, the change attempt fails.


