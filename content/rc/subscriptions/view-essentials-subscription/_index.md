---
Title: View and Upgrade Redis Cloud Essentials plan
LinkTitle: View and Upgrade Essentials plan
description:
weight: 30
alwaysopen: false
categories: ["RC"]
aliases: [ /rv/administration/setup_and_editing/view-edit-subscription/,
           /rc/administration/setup-and-editing/viewing-subscription/,
           /rc/administration/setup-and-editing/changing-subscription-plan/,
           /rc/administration/setup-and-editing/changing-subscription-plan/,
           /rc/administration/setup/edit-subscription/,
           /rc/administration/setup/edit-subscription.md,
           /rc/administration/setup-and-editing/changing-subscription-plan.md,
           /rc/administration/setup-and-editing/changing-subscription-plan/,
           /rc/administration/setup/change-plan.md,
           /rc/administration/setup/change-plan/,
           /rc/subscriptions/view-fixed-subscription ]

---
To view the details of a Redis Cloud Essentials subscription:

1.  Sign in to the [Redis Cloud console](https://app.redislabs.com/) and select the **Subscriptions** list.

1.  Select the target subscription from the subscription list.

    {{<image filename="images/rc/subscription-list-select.png" alt="The Subscription list shows your current subscriptions." >}}{{< /image >}}

1.  Your subscription details appear, along with a summary of your database details.

    {{<image filename="images/rc/subscription-details-fixed-databases-tab.png" alt="The Databases tab of the subscription details page is the default view." >}}{{< /image >}}

From here, you can:

- Select the **Upgrade Plan** button to update your subscription plan, high availability settings, or payment method.

    {{<image filename="images/rc/button-subscription-upgrade-plan.png" alt="Select the Upgrade plan button to update your subscription settings." >}}{{< /image >}}

- Select the **Overview** tab to view and edit subscription details.

The following sections provide more details.

## Upgrade plan

Use the **Upgrade plan** button to update your Redis Cloud Essentials plan, your high availability settings, or your payment method. Upgrading your database between Redis Cloud Essentials plans does not impact database availability during the update.

{{<image filename="images/rc/button-subscription-upgrade-plan.png" alt="Use the Upgrade plan button to change selected Redis Cloud Essentials subscription detils." >}}{{< /image >}}

For information on how to upgrade to Redis Cloud Pro, see [upgrade subscription plan from Essentials to Pro]({{<relref "/rc/subscriptions/upgrade-essentials-pro">}}).

### Change subscription plan

To change your subscription plan, select the desired plan from the list and select the **Upgrade plan** button:

{{<image filename="images/rc/subscription-change-fixed-tiers.png" width="100%" alt="Select the desired subscription plan from the ones shown." >}}{{< /image >}}

Each Redis Cloud Essentials plan provides a variety of benefits, including increased memory and number of connections.
For a comparison of available plans, see [Redis Cloud Essentials plans]({{<relref "rc/subscriptions/view-essentials-subscription/essentials-plan-details">}}).

When you change your plan, your data and endpoints are not disrupted.  

If you upgrade a free plan to a paid plan, you need to add a payment method.

If you change your subscription to a lower plan, make sure your data fits within the limits of the new plan; otherwise, the change attempt will fail.

{{< note >}}
{{< embed-md "rc-fixed-upgrade-limitation.md" >}}
{{< /note >}}

### Change high availability

To change your plan's high availability settings, select the desired setting in the **High availability** panel.

{{<image filename="images/rc/subscription-fixed-high-availability-panel.png" alt="Use the High availability panel to set Essentials subscription replication settings." >}}{{< /image >}}

You can switch between **No replication** and **Single-zone replication** at any time, but you cannot choose **Multi-zone replication** after your subscription is created. You also cannot switch from **Multi-zone replication** to another high availability option.

### Change payment method

To change your subscription payment method, update the **Credit card** settings.  You can select a known payment method from the drop-down list or use the **Add** button to add a new one.

{{<image filename="images/rc/subscription-change-credit-card.png" alt="Use the Credit card drop-down to set your subscription payment method." >}}{{< /image >}}

Payment method changes require the Owner role.  If your sign-on is not a subscription owner, you cannot change the payment method.

To verify your role, select **Access Management** from the admin menu and then locate your credentials in the **Team** tab.

### Save changes

Use the **Upgrade plan** button to save changes.

{{<image filename="images/rc/button-subscription-upgrade-plan-blue.png" alt="Use the Upgrade plan button to save your subscription plan changes." >}}{{< /image >}}

## Subscription overview

The **Overview** tab summarizes your Redis Cloud Essentials subscription details using a series of panels:

{{<image filename="images/rc/subscription-details-fixed-overview-tab.png" width="75%" alt="The Overview tab displays the details of your Fixed subscription." >}}{{< /image >}}

The following details are displayed:

| Detail | Description |
|:---------|:--------------|
| **Cloud vendor** | Your database's cloud vendor |
| **Plan description** | Brief summary of subscription, including the plan type, cloud provider, region, and data size limit |
| **Availability** | Describes high availability settings |
| **Region** | The region your subscription is deployed to |
| **Plan** | The maximum database size of your Essentials plan. Also displays the cost for paid plans. |
| **Databases** | Maximum number of databases for your plan |
| **Connections** | Maximum number of concurrent connections |
| **CIDR allow rules** | Maximum number of authorization rules |
| **Data persistence** | Indicates whether persistence is supported for your subscription |
| **Daily & instant backups** | Indicates whether backups are supported for your subscription |
| **Replication** | Indicates whether replication is supported for your subscription |
| **Clustering** | Indicates whether clustering is supported for your subscription |

Select the **Edit** button to change the subscription name.

{{<image filename="images/rc/icon-edit-subscription-name.png" alt="Use the **Edit** button to change the subscription name." >}}{{< /image >}}

The **Delete subscription** button lets you [delete your subscription]({{<relref "rc/subscriptions/delete-subscription">}}).

{{<image filename="images/rc/button-subscription-delete.png" alt="Use the Delete subscription button to delete your subscription plan." >}}{{< /image >}}
