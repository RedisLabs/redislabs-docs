---
Title: Network security
description:
weight: 30
alwaysopen: false
categories: ["RC"]
---

Redis Enterprise Cloud supports two types of network security: [IP Restrictions](#ip) and [VPCs](#virtual-private-clouds). These features are available in most Redis Cloud configurations, as indicated in the table below:

<table>
<tbody>
<tr style="height: 23px;">
<td style="height: 23px;">&nbsp;</td>
<td style="height: 23px;">VPC Support</td>
<td style="height: 23px;">IP Restructions</td>
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

### Adding restrictions

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

Databases in Redis Cloud Pro and Ultimate are almost always deployed in a Redis Labs VPC. In most cases, you'll need to create a **VPC peering connection** to access these databases. A VPC peering connection allows unrestricted network access between two VPCs.

How you create these connections, and the features supported, varies somewhat by public cloud. You can read about VPC usage for [AWS](#vpcs-with-aws), [GCP](#vpcs-with-gcp), and [Azure](#vpcs-with-azure) below.

### VPCs with AWS

Subscriptions that run on AWS support two VPC options. To ensure that that you can securely connect to your database, you must either [create a VPC peering connection](#creating-a-vpc-peering-connection) or [deploy your subscription in your own VPC](#deploying-in-your-own-vpc).

#### Create a VPC peering connection

Below are instructions for creating a VPC peering connection for AWS. One you've created this connection, you may also want to consider [configuring a CIDR whitelist] to allow connection only from specific IP address blocks or security groups.

To create a VPC peering connection:

1. In **Subscriptions**, click on the subscription requiring a VPC peering connection
2. In **Security** > **VPC Peering**, click ![Add](/images/rs/icon_add.png#no-click "Add"). You'll then see form like the following:

![VPC AWS](/images/rc/vpc-aws.png "VPC AWS")

3. Enter your VPC peering details:

    - AWS Account ID
    - AWS Region
    - AWS VPC ID
    - VPC CIDR (must not overlap with the Redis Labs CIDR block)

Then click **Initiate Peering**.

4. Next, you'll need to approve the VPC peering request. To do that, log in to your AWS management console.

      1. Go to: **Services** > **VPC** > **Peering Connections**
      1. Select the peering connection with the Peering ID of your peering request.
      1. Go to **Description** and note the Requester VPC CIDRs shown in the Peering Connection details.
      1. Click **Actions** and select **Accept Request**.
      1. To confirm, click **Yes, Accept**.
      1. Finally, update your routing tables for the peering connection:

            1. After you accept the peering request, click **Modify my route tables now**.
            1. Find the ID of your VPC in the list of routes and select it.
            1. Go to **Routes** and click on **Edit Routes**.
            1. To add a route, click **Add Route**.
            1. In the Destination field, enter the Requester VPC CIDRs shown when you accepted the peering request.

               This is the Redis Cloud VPC CIDR address, to which your application's VPC should connect

            1. In the Target field, select **Peering Connection** and select the relevant Peering ID.
            1. Click **Save Routes** and **Close**.

Once your VPC peering request is accepted, the status in your subscription's **VPC Peering** tab will indicate 'Peer Established'.

If you correctly follow these steps, you will be able to connect to your database. If you have any problems or questions,
please don't hesitate to [contact Redis Labs support](https://redislabs.com/company/support/).

#### Configurea CIDR whitelist

The **CIDR whitelist** defines a range of IP addresses and/or AWS security groups permitted to access
databases in the Redis Cloud VPC.

To define the CIDR whitelist:

1. In **Subscriptions**, click on the subscription for VPC peering.
1. Go to: **Security** > **CIDR Whitelist**.
1. If there are no CIDR whitelist entries, click ![Add](/images/rs/icon_add.png#no-click "Add"). You'll see
   a form similar to this:

   ![CIDR Whitelist](/images/rc/cidr-whitelist.png "CIDR Whitelist")

1. Specify the **Type** of whitelist entry as either:
    - **IP Address**: For the value, enter the IP block in CIDR format for the traffic that
            you want to allow access for.
    - **Security Group**: For the value, enter the ID of the AWS security group to grant access to.
1. Click ![Save](/images/rc/icon_save.png#no-click "Save").
1. Next, either:
   1. Add more whitelist entries by clicking ![Add](/images/rs/icon_add.png#no-click "Add").
   1. Or apply the changes to the whitelist by selecting **Apply all changes**.

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

Subscriptions that run on GCP *require* a VPC peering connection.

To create a VPC peering connection:

1. In **Subscriptions**, click on the subscription requiring a VPC peering connection
2. In **Security** > **VPC Peering**, click ![Add](/images/rs/icon_add.png#no-click "Add"). You'll then see form like the following:

![VPC GPC](/images/rc/vpc-gpc.png "VPC GPC")

3. Enter your VPC peering details:

      - GCP Project ID
      - GCP Network name

Before you click **Initiate Connection**, be sure that you copy the `gcloud` command generated at the bottom of the form:

![VPC GCloud Command](/images/rc/vpc-gcloud-command.png "VPC GCloud Command")

4. Run the `gcloud` command you just copied to approve the VPC peering connection.

Once your VPC peering request is accepted, the status in your subscription's **VPC Peering** tab will indicate 'Peer Established'.

If you correctly follow these steps, you will be able to connect to your database. If you have any problems or questions,
please don't hesitate to [contact Redis Labs support](https://redislabs.com/company/support/).

### VPCs with Azure

When you request a Redis Cloud Annual subscription, all databases will be deployed in your own Azure VPC.
