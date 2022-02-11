---
Title: Enable VPC peering
linkTitle: VPC peering
description:
weight: 80
alwaysopen: false
categories: ["RC"]
aliases:
---

A [VPC peering connection](https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html) is a networking connection between two virtual PCs that uses private IP addresses to route traffic between them.  Instances in either VPC can communicate with each other as if they are within the same network.

You can connect your VPC in the Redis Cloud subscription to the VPC of your application. This lets your application connect securely to your Redis Cloud database using VPC Peering to optimize the performance of your application.

{{< note >}}
VPC peering is available only with Flexible or Annual subscriptions.  It is not supported for Fixed or Free subscriptions.
{{< /note >}}

The VPC peering configuration requires you to initiate VPC peering on your Redis Cloud <!-- Pro or Ultimate --> subscription and accept the VPC peering request for the AWS VPC that you want to peer with.

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

Once peering is established, we recommend switching your application connection string to the private endpoint.
