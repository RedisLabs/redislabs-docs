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
         /rc/administration/setup/edit-subscription/
         /rc/administration/setup/edit-subscription.md

---
To view the details of a Fixed subscription:

1.  Sign into the admin console.

1.  If you have more than one subscription, select the target subscription from the subscription list.

    {{<image filename="images/rc/subscription-list-select.png" alt="The Subscription list shows your scurrent ubscriptions." >}}{{< /image >}}

1.  Your subscription details appear, along with a summary of your database details.

    {{<image filename="images/rc/subscription-details-fixed-databases-tab.png" alt="The Databases tab of the subscription details page is the default view." >}}{{< /image >}}

From here, you can:

- Use the **Edit** icon to change the subscription name.

    {{<image filename="images/rc/icon-edit-subscription-name.png" alt="Use the Edit button to change the subcription name." >}}{{< /image >}}

- Select the **Change Plan** button to update subscription plan tier, high availability settings, or payment method.

    {{<image filename="images/rc/button-subscription-change-plan.png" alt="Select the Edit icon to change the subscription name." >}}{{< /image >}}

- Select the **Overview** tab to view subscription details.

The following sections provide more details.

## Change subscription plan

Use the **Change plan** button to update your Fixed subscription tier, your high availability settings, or your payment method.

{{<image filename="images/rc/button-subscription-change-plan.png" alt="Use the Change plan button to change selected Fixed subscription detils." >}}{{< /image >}}

### Change subscription tier

To change your subscription tier, select the desired tier from the list:

{{<image filename="images/rc/subscription-change-fixed-tiers.png" width="75%" alt="Select the desired subscription tier from the ones shown.." >}}{{< /image >}}

Each tier in a Fixed plan provides a variety of benefits, including increased memory, number of databases, connections, and so on.

For a comparison of available tiers, see [Fixed size subscription tiers]({{<relref "rc/subscriptions/create-fixed-subscription.md#fixed-size-subscription-tiers">}})

When you change your plan tier, your data and endpoints are not disrupted.  

If you upgrade a free plan to a paid tier, you need to add a payment method.

If you change your subscription to a lower tier, make sure your data (and databases) fit within the limits of the new tier; otherwise, the change attempt will fail.

### Change high availability 

To change your plan's high availability settings, select the desired setting in the **High availability** panel.

{{<image filename="images/rc/subscription-fixed-high-availability-panel.png" alt="Use the High availability panel to set Fixed subscription replication settings." >}}{{< /image >}}

Fixed plans support either no replication or single-zone replication.

(Free tiers do not support replication.)

### Change payment method

To change your subscription payment method, update the **Credit card** settings.  You can select a known payment method from the drop-down list or use the **Add** button to add a new one.

{{<image filename="images/rc/subscription-change-credit-card.png" alt="Use the Credit card drop-down to set your subscription payment method." >}}{{< /image >}}

Payment method changes require the Owner role.  If your sign-on is not a subscription owner, you cannot change the payment method. 

To verify your role, select **Access Management** from the admin menu and then locate your credentials in the **Team** tab.

### Save changes

Use the **Change plan** button to save changes.

{{<image filename="images/rc/button-subscription-change-plan.png" alt="Use the Change plan button to save your subscription plan changes." >}}{{< /image >}}


## Subscription overview

The **Overview** tab summarizes your Fixed subscription details using a series of panels:

{{<image filename="images/rc/subscription-details-fixed-overview-tab.png" width="75%" alt="The Overview tab displays the details of your Fixed subscription." >}}{{< /image >}}

The following details are displayed:

| _Detail_ | _Description_ |
|:---------|:--------------|
| **Cloud vendor** | Your subscription cloud vendor |
| **Plan description** | Brief summary of subscription, including the plan type, cloud provider, region, and data size limit |
| **Availability** | Describes high availability settings |
| **Region** | Describes the region your subscription is deployed to |
| **Plan** | Describes the tier of your Fixed plan, expressed in terms of maximum database size.  Also displays the cost for paid plans. |
| **Databases** | Maximum number of databases for your plan |
| **Connections** | Maximum number of concurrent connections |
| **CIDR allow rules** | Maximum number of authorization rules |
| **Data persistence** | Indicates whether persistence is supported for your subscription |
| **Daily & instant backups** | Indicates whether backups are supported for your subscription |
| **Replication** | Indicates whether replication is supported for your subscription | 
| **Clustering** | Indicates whether clustering is supported for your subscription | 

The **Cancel subscription** button appears below the **Overview** details; it lets you  [delete your subscription]({{<relref "rc/subscriptions/create-fixed-subscription.md#fixed-size-subscription-tiers">}})

{{<image filename="images/rc/button-subscription-cancel.png" alt="Use the Cancel subscription button to delete your subscription plan." >}}{{< /image >}}
