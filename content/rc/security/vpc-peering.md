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

You can connect your VPC in the Redis Cloud subscription to the VPC of your application. This lets your application connect securely to your Redis Cloud database using VPC peering to optimize the performance of your application.

{{< note >}}
VPC peering is available only with Flexible or Annual subscriptions.  It is not supported for Fixed or Free subscriptions.
{{< /note >}}

The VPC peering configuration requires you to initiate VPC peering on your Redis Cloud subscription and accept the VPC peering request for the AWS VPC that you want to peer with.

## AWS VPC peering

### Configure VPC peering {#config-aws-vpc-peering}

To peer Redis Cloud VPC with another VPC:

1. Select **Subscriptions** from the [admin console](https://app.redislabs.com/) menu and then select your subscription from the list.

1. Select the **Connectivity** tab and then select **VPC Peering**.

1. Select the **Add peering** button. 

1. Enter the VPC peering details:

    - AWS Account ID
    - AWS Region
    - AWS VPC ID
    - VPC CIDR (must not overlap with the Redis CIDR block)

1. To add multiple VPC CIDRs:

    1. Select the **Add CIDR** button.

    1. Enter the new CIDR-formatted IP address in the box.

1. Select the **Initiate peering** button.

    A VPC Peering request is automatically created and appears in the VPC Peering tab until
        it is accepted by the VPC that you want to peer with.

1. Note the **Peering ID** of the peering request.

### Approve VPC peering request {#approve-aws-vpc-peering}

To approve the VPC peering request on VPC for your application:

1. Follow the AWS guide to [accept the VPC peering connection](https://docs.aws.amazon.com/vpc/latest/peering/create-vpc-peering-connection.html#accept-vpc-peering-connection).

1. Update your routing tables for the peering connection:

    1. After you accept the peering request, select **Modify my route tables now**.

    1. Find the ID of your VPC in the list of routes and select it.

    1. Go to **Routes** and select on **Edit Routes**.

    1. To add a route, select **Add Route**.

    1. In the **Destination** field, enter the Requester VPC CIDRs shown when you accepted the peering request.

        This is the Redis Cloud VPC CIDR address, to which your application's VPC connects.

    1. In the **Target** field, select **Peering Connection** and select the relevant **Peering ID**.

    1. Select **Save Routes** and **Close**.

Now the VPC Peering request is accepted. Its status in the **VPC Peering** tab in the Redis Cloud subscription is updated to 'Peer Established'.

Once peering is established, we recommend switching your application connection string to the private endpoint.

## GCP VPC peering

### Configure VPC peering {#config-gcp-vpc-peering}

To peer Redis Cloud VPC with another VPC:

1. Select **Subscriptions** from the [admin console](https://app.redislabs.com/) menu and then select your subscription from the list.

1. Select the **Connectivity** tab and then select **VPC Peering**.

1. Select the **Add peering** button. 

1. Enter the VPC peering details:

    - GCP Project ID
    - GCP Network name

    Make sure you copy the *gcloud* command that appears at the bottom of the page to accept the peering.

1. Select the **Initiate peering** button.

    A VPC Peering request is automatically created and appears in the VPC Peering tab until
        it is accepted by the VPC that you want to peer with.

1. Note the **Peering ID** of the peering request.

### Approve VPC peering request {#approve-gcp-vpc-peering}

To approve the VPC peering request on VPC for your application:

1. In your GCP environment, run the *gcloud* CLI command provided in the VPC peering popup.

Now the VPC Peering request is accepted. Its status in the **VPC Peering** tab in the Redis Cloud subscription is updated to 'Peer Established'.

Once peering is established, we recommend switching your application connection string to the private endpoint.