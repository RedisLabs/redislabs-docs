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

After you create a Redis Enterprise VPC (RV) subscription, you can configure VPC
peering and a CIDR whitelist to allow more direct access to your VPC. VPC
peering and CIDR whitelists are parts of functionality that is provided by [Amazon
Virtual Private Cloud](https://docs.aws.amazon.com/vpc/latest/userguide/) (Amazon VPC),
but you can configure them here in RV.

- [VPC peering](https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html) -
    The route tables of each VPC have access to the entire CIDR block of the peered VPC.
- [CIDR whitelist](https://docs.aws.amazon.com/vpc/latest/peering/peering-configurations-partial-access.html) -
    The route table of your VPC has access to the specified CIDR blocks and security groups.

### VPC Peering

A VPC peering connection is a networking connection between two VPCs that enables you to route traffic between them using private IP addresses. Instances in either VPC can communicate with each other as if they are within the same network. As a result, the communication between the VPCs can be faster and more secure.

After an RV Subscription has been created, you can connect your RV Subscription's VPC to the VPC of your application, so that your application can connect to the RV database using VPC Peering. Such VPC Peering connection can optimize the performance of your application.

To peer your VPC with another VPC do the next steps:

1. In **Subscriptions**, click on the subscription use for VPC peering.
1. In **Security** > **VPC Peering**, click ![Add](/images/rs/icon_add.png "Add").
1. Enter the details of the VPC to peer with, including:
    - AWS Account ID
    - AWS Region
    - AWS VPC ID
1. Click **Initiate Peering**.

A VPC Peering request will be automatically created and will appear in the 'VPC Peering' tab. The Peering request will be in 'Peering Acceptance' status until it is accepted.  In order to accept the peering request and to establish the connection between the VPCs you will need to approve the VPC Peering request on your application's VPC. 
To approve the VPC Peering request on your application's VPC:
1. connect to your application's AWS account
1. Go to Services > VPC > Peering Connections
1. Select the Peering Connection with the Peering ID that appears on the VPC Peering request in the 'VPC Peering' tab on your RV subscription. Please write down the 'Requester VPC CIDRs' as appear on the Peering Connection details under the 'Description' tab. 'Requester VPC CIDRs' will be needed for later steps
1. Click on 'Actions' button 
1. Select 'Accept Request' 
1. On the pop-up that will open click on 'Yes, Accept'
1. On the next pop-up click on 'Modify my route tables now'
1. Select your VPC's Route Table from the list, based on your VPCs Id
1. Click on 'Routes' tab
1. Click on 'Edit Routes' button
1. In the next screen click on 'Add Route' button'
1. In the 'Destination' field enter the 'Requester VPC CIDRs' value from above. This is the RV VPC CIDR address, to which your application's VPC will connect
1. On the 'Target' field select 'Peering Connection' from the dropdown and select the relevant Peering Id
1. Click 'Save Routes'
1. Click 'Close'

Now the VPC Peering request is accepted, and its status on the 'VPC Peering' tab under the RV subscription will be updated to 'Peer Established'. In addition, the Route Table on your application's VPC has been updated to approve connections to the RV VPC. 
Now you are ready to start using the VPC Peering.



### CIDR Whitelist

To define the CIDR whitelist:

1. In **Subscriptions**, click on the subscription use for VPC peering.
1. Go to: **Security** > **CIDR Whitelist**
1. If there are no CIDR whitelist entries, click ![Add](/images/rs/icon_add.png "Add")
   to create a CIDR whitelist. Otherwise, click ![Add](/images/rs/icon_add.png "Add")
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
   1. Add more whitelist entries - Click ![Add](/images/rs/icon_add.png "Add").
   1. Apply the changes to the whitelist - Click **Apply all changes**.
