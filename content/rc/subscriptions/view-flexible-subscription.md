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

1.  Sign into the admin console.

1.  If you have more than one subscription, select the target subscription from the subscription list.

    {{<image filename="images/rc/subscription-list-select.png" alt="The Subscription list shows your current subscriptions." >}}{{< /image >}}

1.  Your subscription details appear, along with a summary of your database details.

    {{<image filename="images/rc/subscription-flexible-databases-tab-pending.png" alt="The Databases tab of the subscription details page is the default view." >}}{{< /image >}}

You can use the:

- **Edit** button to change the name of the subscription.

    {{<image filename="images/rc/icon-edit-subscription-name.png" alt="Use the **Edit** button to change the subscription name." >}}{{< /image >}}

- **New database** button to add a database to your subscription.

    {{<image filename="images/rc/button-database-new.png" alt="Use the **New database** button to create a new database for your subscription." >}}{{< /image >}}

- Status icon to learn the status of your subscription.  Active subscriptions displays a teal circle with a check mark.  Pending subscriptions display an animated, grey circle.

    {{<image filename="images/rc/icon-database-status-active.png" alt="When a subscription is active, the status icon displays a teal circle with a checkmark." >}}{{< /image >}} &nbsp; {{<image filename="images/rc/icon-subscription-status-pending.png" alt="When a subscription is pending, the status icon displays a gre, animated circle." >}}{{< /image >}}

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

| _Detail_ | _Description_ |
|:---------|:--------------|
| **Status** | An icon indicating whether the database is active (a teal circle) or pending (yellow circle)<br/>{{<image filename="images/rc/icon-database-detail-status-active.png" alt="Active status is indicated by a teal circle." >}}{{< /image >}}&nbsp;{{<image filename="images/rc/icon-database-detail-status-pending.png" alt="Pending status is indicated by a yellow circle." >}}{{< /image >}} |
| **Name** | The database name |
| **Endpoint** | Use the **Copy** button to copy the endpoint URI to the Clipboard | 
| **Memory** | Memory size of the database, showing the current size and the maximum size |
| **Throughout** | Maximum operations per second supported for the database |
| **Modules** | Identifies modules attached to the database |
| **Options** | Icons showing options associated with the database |

To view full details of a database, click its name in the list. 

## **Overview** tab

The **Overview** summarizes the options use to created the subscription.

{{<image filename="images/rc/subscription-details-overview-flexible.png" alt="The Overview tab displays the settings used to create your Flexible subscription." >}}{{< /image >}}

- The general settings panel describes the cloud vendor, region, and high-availability settings for your subscription.

    | _Setting_ | _Description_ |
    |:---------|:--------------|
    | **Cloud vendor** | Your subscription cloud vendor |
    | **Plan description** | Brief summary of subscription, including the plan type, cloud provider, and region |
    | **Redis on Flash** | Checked when Redis on Flash is enabled |
    | **Multi-AZ** | Checked when multiple availability zones are enabled |
    | **Active-Active Redis** | Checked when Active-Active Redis is enabled for your subscription | 
    | **Region** | Describes the region your subscription is deployed to |

- The **Price** panel shows the monthly cost of your Flexible subscription 

- The Payment info panel shows your payment details.

- The **Cost Estimate** section describes the shards required to deploy the subscription based on the choices made when the subscription was created.  
    
- **Payment Method** shows the current payment details.

- The **Required cloud resources** panel shows the storage resources used by your subscription.  

    If your subscription is attached to a cloud account, the details appear in the panel header.

- The **Redis Labs price** panel breaks down your subscription price.

## **Connectivity** tab

The **Connectivity** tabs helps secure your subscription.  

{{<image filename="images/rc/subscription-details-connectivity-tab-flexible.png" alt="The Connectivity tab helps you secure your subscription." >}}{{< /image >}}

Here, you can set up a:

- [VPC peering]({{<relref "/rc/security/vpc-peering.md">}}) relationship between the virtual PC (VPC) hosting your subscription and another virtual PC.

- An [access allow list]({{<relref "/rc/security/cidr-whitelist.md">}}) containing IP addresses or security groups (_AWS only_) permitted to access your subscription.

See the individual links to learn more.