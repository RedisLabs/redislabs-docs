---
Title: Viewing and Editing a Subscription
description:
weight: 40
alwaysopen: false
categories: ["RC"]
aliases: /rv/administration/setup_and_editing/view-edit-subscription/
         /rc/administration/setup-and-editing/viewing-subscription/
         /rc/administration/setup-and-editing/changing-subscription-plan/
         /rc/administration/setup-and-editing/changing-subscription-plan/
---
After you create a subscription, you can view the subscription details and
change some of them, including:

- Subscription name
- Security access
- Payment method

## Viewing subscriptions

To view the details of a subscription click "Subscriptions" in the menu,
and then click on the name of the Subscription you want to view.

When you view a subscription, you can see:

- Subscription name (To edit the name, click ![Edit](/images/rc/icon_edit.png#no-click "Edit"))
- Cloud provider details
- Memory type (RAM/RAM + Flash)

In the Security section, you can [define access](#defining-access-to-your-subscription)
to your Redis Cloud account.

In the Payment Information section, you can see:

- The cloud resources that your subscription is running on
- The number of shards purchased and their cost

To delete a subscription, click on the **Delete** button at the bottom
of the form. You are prompted to confirm before your subscription is
actually deleted. The delete only succeeds if the subscription **does
not have any databases**. If it does, you must first delete the
databases.

## Defining access to your subscription

After you create a Redis Cloud subscription, you can configure VPC
peering and a CIDR whitelist to allow more secure access to your account.

- [VPC peering](https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html) -
    Allow unresticted network access between two VPCs.
- [CIDR whitelist](https://docs.aws.amazon.com/vpc/latest/peering/peering-configurations-partial-access.html) -
    Customers running Redis Cloud on their own cloud infratsructure can limit the network access between the VPCs to the specified CIDR blocks and security groups.

### VPC Peering

A VPC peering connection is a networking connection between two VPCs that enables you
to route traffic between them using private IP addresses. Instances in either VPC can
communicate with each other as if they are within the same network. You can connect your
VPC in the Redis Cloud subscription to the VPC of your application. Then your application can
connect securely to your Redis Cloud database using VPC Peering to optimize the performance of your application.

The VPC peering configuration requires you to initiate VPC peering on your Redis Cloud <!-- Pro or Ultimate --> subscription
and accept the VPC peering request for the AWS VPC that you want to peer with.

1. To peer Redis Cloud VPC with another VPC:
    1. In **Subscriptions**, click on the subscription for VPC peering.
    1. In **Security** > **VPC Peering**, click ![Add](/images/rs/icon_add.png#no-click "Add").
    1. Enter the VPC peering details:

        - If your subscription is running on **AWS**, enter these details of the VPC to peer with:

            - AWS Account ID
            - AWS Region
            - AWS VPC ID
            - VPC CIDR

        - If your subscription is running on **GCP**, enter these details of the VPC to peer with:

            - GCP Project ID
            - GCP Network name

            Make sure you copy the *gcloud* command that appears at the bottom of the page to accept the peering.

    1. Click **Initiate Peering**.

        A VPC Peering request is automatically created and appears in the VPC Peering tab until
        it is accepted by the VPC that you want to peer with.

    1. Note the Peering ID of the peering request.

1. To approve the VPC Peering request on VPC for your application:

    - If your subscription is running on **AWS**:

        1. Go to the AWS management console and login to your AWS account that contains the peer VPC.
        1. Go to: **Services** > **VPC** > **Peering Connections**
        1. Select the peering connection with the Peering ID of your peering request.
        1. Go to **Description** and note the Requester VPC CIDRs shown in the Peering Connection details.
        1. Click **Actions** and select **Accept Request**.
        1. To confirm to accept the request, click **Yes, Accept**.
        1. To update your routing tables for the peering connection:

            1. After you accept the peering request, click **Modify my route tables now**.
            1. Find the ID of your VPC in the list of routes and select it.
            1. Go to **Routes** and click on **Edit Routes**.
            1. To add a route, click **Add Route**.
            1. In the Destination field, enter the Requester VPC CIDRs shown when you accepted the peering request.

               This is the Redis Cloud VPC CIDR address, to which your application's VPC connect

            1. In the Target field, select **Peering Connection** and select the relevant Peering ID.
            1. Click **Save Routes** and **Close**.

    - If your subscription is running on **GCP**:

        - In your environment, run the *gcloud* CLI command provided in the VPC peering popup.

Now the VPC Peering request is accepted. Its status in the VPC Peering tab in the Redis Cloud subscription is updated to 'Peer Established'.

