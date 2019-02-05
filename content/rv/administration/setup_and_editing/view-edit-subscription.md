---
Title: View and Edit a Subscription
description: 
weight: 40
alwaysopen: false
categories: ["RV"]
---
After you create a subscription, you can view the subscription details and
change some of them, including:

- Subscription name
- Cloud account
- Security access
- Payment method

## Viewing Subscriptions

To view the details of a subscription click "Subscriptions" in the menu,
and then click on the name of the Subscription you wish to view.

When you view a subscription, you can see:

- Subscription name (To edit the name, click ![Edit](/images/rv/icon_edit.png "Edit"))
- The RV Cloud Account used by the subscription
- Cloud network details (To edit the details, click ![Edit](/images/rv/icon_edit.png "Edit"))

In the Security section, you can [define access](#defining-access-to-your-subscription)
to your VPC.

In the Payment Information section, you can see:

- The cloud resources that your subscription is running on
- The number of shards purchased and their cost

To delete a subscription, click on the **Delete** button at the bottom
of the form. You will be prompted to confirm before your subscription is
actually deleted. The delete will only occur if the subscription **does
not have any databases**. If it does, you must first delete the
databases.

## Defining Access to your Subscription

After you create an Redis Enterprise VPC (RV) subscription, you can configure VPC
peering and a CIDR whitelist to allow more direct access to your VPC.

- VPC peering - The route tables of each VPC have access to the entire CIDR
    block of the peered VPC.
- CIDR whitelist - The route table of your VPC has access to the specified CIDR
    blocks and security groups.

### VPC Peering

To peer your VPC with another VPC:

1. In **Subscriptions**, click on the subscription use for VPC peering.
1. In **Security** > **VPC Peering**, click ![Add](/images/rv/icon_add.png "Add").
1. Enter the details of the VPC to peer with, including:
    - AWS Account ID
    - AWS Region
    - AWS VPC ID
1. Click **Initiate Peering**.

### CIDR Whitelist

To define the CIDR whitelist:

1. In **Subscriptions**, click on the subscription use for VPC peering.
1. Go to: **Security** > **CIDR Whitelist**
1. If there are no CIDR whitelist entries, click ![Add](/images/rv/icon_add.png "Add")
   to create a CIDR whitelist. Otherwise, click ![Add](/images/rv/icon_add.png "Add")
   under the list of CIDR whitelist entries to add another entry.
1. Specify a whitelist entry as either:
    - IP Address:
        1. For the type, select **IP Address**.
        1. For the value, enter the IP address in CIDR format for the traffic that
            you want to allow access for.
    - Security Group:
        1. For the type, select **Security Group**.
        1. For the value, enter the ID of the AWS security group to grant access to.
1. Click ![Save](/images/rv/icon_save.png "Save").
1. Either:
   1. Add more whitelist entries - Click ![Add](/images/rv/icon_add.png "Add").
   1. Apply the changes to the whitelist - Click **Apply all changes**.