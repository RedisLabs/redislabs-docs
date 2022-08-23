---
Title: Network security
linkTitle: Network security
description:
weight: 30
alwaysopen: false
categories: ["RC"]
aliases: /rc/security/database-security/network-security/
         /rc/security/database-security/network-security.md

---

Redis Enterprise Cloud supports two types of network security: [IP Restrictions](#ip) and [VPCs](#virtual-private-clouds). These features are available in most Redis Cloud configurations, as shown here:

<table>
<tbody>
<tr style="height: 23px;">
<td style="height: 23px;">&nbsp;</td>
<td style="height: 23px;">VPC Support</td>
<td style="height: 23px;">IP Restrictions</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">AWS</td>
<td style="height: 23px;">Flexible and Annual</td>
<td style="height: 23px;">Fixed (paid), Flexible, and Annual</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">GCP</td>
<td style="height: 23px;">Flexible and Annual</td>
<td style="height: 23px;">Fixed (paid), Flexible, and Annual</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">Azure</td>
<td style="height: 23px;">Annual</td>
<td style="height: 23px;">Annual</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>

## IP and subnet restrictions {#ip}

You can restrict database access to a configurable
set of source IP addresses and subnets. This is roughly equivalent
to using [iptables](https://en.wikipedia.org/wiki/Iptables) to limit access to a host.

### Add restrictions

To restrict a database to a specific set of source IP addresses or subnets:

1. From the admin console, navigate to the **View Database** screen for a particular database.

![Add](/images/rc/view-db.png#no-click "View Database")

2. Click on the **edit** icon to enter the **Edit Database** screen. ![Add](/images/rc/icon_edit.png#no-click "Edit")

![Add](/images/rc/edit-db.png#no-click "Edit Database")

3. Under the **Access Control & Security** subsection, click on the **Source IP / Subnet** slider.

![Access & Security Control](/images/rc/access-control-security.png "Access Control / Security")

4. From here, you can use the UI to add individual IP addresses and subnets, one at a time.

![Add](/images/rc/source-ip-subnet.png "Source IP / Subnet")

## Virtual private clouds

A [Virtual Private Cloud](https://en.wikipedia.org/wiki/Virtual_private_cloud) (VPC) is an isolated set of resources within a [public cloud](https://en.wikipedia.org/wiki/Cloud_computing#Public_cloud), usually having its own subnets and VLAN.

Databases in Flexible and Annual subscriptions are almost always deployed in a Redis VPC. In most cases, you'll need to create a [VPC peering connection]({{<relref "/rc/security/vpc-peering">}}) to access these databases. A VPC peering connection allows unrestricted network access between two VPCs.

How you create these connections and the features supported vary somewhat by public cloud provider. You can read about VPC usage for [AWS](#vpcs-with-aws), [GCP](#vpcs-with-gcp), and [Azure](#vpcs-with-azure) below.

### VPCs with AWS

Subscriptions that run on AWS support two VPC options. To ensure that that you can securely connect to your database, you need to either [create a VPC peering connection]({{<relref "/rc/security/vpc-peering#aws-vpc-peering">}}) or [deploy your subscription in your own VPC](#deploy-in-your-own-vpc).

If you create a VPC peering connection, you can also [configure a CIDR allow list]({{<relref "/rc/security/cidr-whitelist">}}) to allow connections only from specific IP address blocks or security groups.

#### Deploy in your own VPC

As an alternative to VPC peering, you can create and deploy a Flexible subscription directly in your own AWS VPC. You need to do this at the time you create your subscription.

1. Navigate to the **New Subscription** page:

![New Subscription](/images/rc/new-subscription.png "New Subscription")

2. In the **Flexible plan** section, select the **Create** button.

3.  When the Create Custom Subscription screen appears, locate the **Networking** section of the **Setup** tab and then select the option to deploy in an existing VPC.

    Next, enter the subnet (**Deployment CIDR**) where you want your subscription deployed and your VPC ID.

4.  Fill in the remaining details for your subscription.

Once your subscription and databases have been provisioned, you'll be able to access those databases directly from within your own VPC.

### VPCs with GCP

Subscriptions that run on GCP *require* a VPC peering connection. See [GCP VPC peering](http://localhost:1313/rc/security/vpc-peering/#gcp-vpc-peering) to learn how to set up VPC peering for GCP.

### VPCs with Azure

When you request a Redis Cloud Annual subscription, all databases will be deployed in your own Azure VPC.
