---
Title: View Flexible subscription details
description:
weight: 40
alwaysopen: false
categories: ["RC"]
linktitle: View Flexible subscription
aliases:
---
To view the details of a Flexible subscription:

1.  Sign in to the [Redis Cloud console](https://app.redislabs.com/#).

1.  If you have more than one subscription, select the target subscription from the subscription list.

    {{<image filename="images/rc/subscription-list-select.png" alt="The Subscription list shows your current subscriptions." >}}{{< /image >}}

1.  Your subscription details appear, along with a summary of your database details.

    {{<image filename="images/rc/subscription-flexible-databases-tab-pending.png" alt="The Databases tab of the subscription details page is the default view." >}}{{< /image >}}

From here, you can:

- Select the **New database** button to add a database to your subscription.

    {{<image filename="images/rc/button-database-new.png" alt="Use the **New database** button to create a new database for your subscription." >}}{{< /image >}}

- View the Status icon to learn the status of your subscription.  Active subscriptions display a green circle with a check mark. Pending subscriptions display an animated, grey circle.

    {{<image filename="images/rc/icon-database-status-active.png" alt="When a subscription is active, the status icon displays a green circle with a checkmark." >}}{{< /image >}} &nbsp; {{<image filename="images/rc/icon-subscription-status-pending.png" alt="When a subscription is pending, the status icon displays a gre, animated circle." >}}{{< /image >}}

- {{< embed-md "rc-opt-in-to-72.md" >}}

Because subscriptions represent active deployments, there aren't many details you can change.  If your needs change, create a new subscription and then migrate the existing data to the new databases.

In addition, three tabs are available:

1.  The **Databases** tab lists the databases in your subscription and summarizes their settings.

2.  The **Overview** tab displays subscription settings for your Flexible subscription.

3.  The **Connectivity** tab lets you limit access to the subscription by defining a VPC peering relationship or by setting up an allow list.

The following sections provide more info.

## **Databases** tab

The **Databases** tab summarizes the databases in your subscription.  

{{<image filename="images/rc/subscription-flexible-databases-tab-pending.png" alt="The Databases tab of the subscription details page is the default view." >}}{{< /image >}}

The following details are provided:

| Detail | Description |
|:---------|:--------------|
| **Status** | An icon indicating whether the database is active (a green circle) or pending (yellow circle)<br/>{{<image filename="images/rc/icon-database-detail-status-active.png" alt="Active status is indicated by a teal circle." >}}{{< /image >}}&nbsp;{{<image filename="images/rc/icon-database-detail-status-pending.png" alt="Pending status is indicated by a yellow circle." >}}{{< /image >}} |
| **Name** | The database name |
| **Endpoint** | Use the **Copy** button to copy the endpoint URI to the Clipboard |
| **Memory** | Memory size of the database, showing the current size and the maximum size |
| **Throughput** | Maximum operations per second supported for the database |
| **Capabilities** | Identifies advanced capabilities attached to the database |
| **Options** | Icons showing options associated with the database |

To view full details of a database, click its name in the list.

## **Overview** tab

The **Overview** summarizes the options use to created the subscription.

{{<image filename="images/rc/subscription-details-overview-flexible.png" alt="The Overview tab displays the settings used to create your Flexible subscription." >}}{{< /image >}}

- The general settings panel describes the cloud vendor, region, and high-availability settings for your subscription.

    Select the **Edit** button to change the name of the subscription.

    {{<image filename="images/rc/icon-edit-subscription-name.png" alt="Use the **Edit** button to change the subscription name." >}}{{< /image >}}


    | Setting | Description |
    |:---------|:--------------|
    | **Cloud vendor** | Your subscription cloud vendor |
    | **Plan description** | Brief summary of subscription, including the plan type, cloud provider, and region |
    | **Auto Tiering** | Checked when Auto Tiering is enabled |
    | **Multi-AZ** | Checked when multiple availability zones are enabled |
    | **Active-Active Redis** | Checked when Active-Active Redis is enabled for your subscription |
    | **Region** | Describes the region your subscription is deployed to |
    | **Availability Zones** | The availability zones your subscription is deployed in (Visible if you selected availability zones on creation) |


- The **Price** panel shows the monthly cost of your Flexible subscription.

- The **Payment Method** panel shows the current payment details.

    Select the ![**Change Payment Method**](/images/rc/icon-subscription-detail-change-payment-flexible.png) button to change the credit card associated with this subscription.

- The **Maintenance Window** panel shows your current [maintenance window settings]({{<relref "/rc/subscriptions/maintenance/set-maintenance-windows">}}).

    See [Maintenance]({{<relref "/rc/subscriptions/maintenance">}}) for more information about subscription maintenance on Redis Cloud.

- The **Provisioned cloud resources** panel shows the storage resources used by your subscription.

  If your subscription is attached to a cloud account, the details appear in the panel header.

- The **Redis price** panel breaks down your subscription price.

## **Connectivity** tab

The **Connectivity** tabs helps secure your subscription.  

{{<image filename="images/rc/subscription-details-connectivity-tab-flexible.png" alt="The Connectivity tab helps you secure your subscription." >}}{{< /image >}}

Here, you can:

- Set up a [VPC peering]({{<relref "/rc/security/vpc-peering.md">}}) relationship between the virtual PC (VPC) hosting your subscription and another virtual PC.

- Set up a [CIDR allow list]({{<relref "/rc/security/cidr-whitelist.md">}}) containing IP addresses or security groups (_AWS only_) permitted to access your subscription.

See the individual links to learn more.
