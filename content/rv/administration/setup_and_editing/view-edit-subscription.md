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

### Defining Access to your Subscription

After you create an Redis Enterprise VPC (RV) subscription, you can configure VPC
peering and a CIDR whitelist to allow more direct access to your VPC.

- VPC peering - The route tables of each VPC have access to the entire CIDR
    block of the peered VPC.
- CIDR whitelist - The route table of your VPC has access to the specified CIDR blocks
    and security groups.

