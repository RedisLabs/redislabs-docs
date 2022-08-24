---
Title: Enable VPC peering
linkTitle: VPC peering
description: VPC peering uses private IP addresses to route traffic between a Redis Cloud VPC and an application VPC.
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

VPC peering configuration requires you to initiate VPC peering on your Redis Cloud subscription and then accept the VPC peering request for the AWS VPC that you want to peer with.

## AWS VPC peering

If you want to peer a Redis Cloud VPC with an AWS VPC, you need to:

1. [Configure and initiate VPC peering](#config-aws-vpc-peering) for your Redis Cloud subscription.

1. [Approve the VPC peering request](#approve-aws-vpc-peering).

1. [Update the routes tables](#update-route-tables).

### Configure VPC peering {#config-aws-vpc-peering}

To set up VPC peering:

1. Select **Subscriptions** from the [admin console](https://app.redislabs.com/) menu and then select your subscription from the list.

1. Select the **Connectivity** tab and then **VPC Peering**.

1. Select the **Add peering** button:

    {{<image filename="images/rc/button-subscription-connectivity-vpc-peering-add-peering.png" width="140px" alt="The Add peering button lets you set up VPC peering." >}}{{< /image >}}

1. Enter **VPC peering** details:

    | Setting&nbsp;name | Description |
    |-------------------|-------------|
    | _Consumer AWS Account_ | Your AWS account ID (see [Finding your AWS account ID](https://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html#FindingYourAWSId)) |
    | _Consumer region_ | AWS VPC region |
    | _Consumer VPC ID_ | The VPC ID for the application that needs to access your Redis Cloud VPC (see [Finding a VPC ID](https://docs.aws.amazon.com/managedservices/latest/userguide/find-vpc.html)) |
    | _Consumer VPC CIDRs_ | [CIDR-formatted](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) IP addresses for the AWS VPC that needs to access your Redis Cloud VPC; must not overlap with the _Redis producer VPC CIDR_ (see [View your VPCs](https://docs.aws.amazon.com/vpc/latest/userguide/working-with-vpcs.html#view-vpc)) |

1. You can provide up to five VPC CIDRs. To add multiple VPC CIDRs:

    1. Select the **Add CIDR** button:

        {{<image filename="images/rc/button-subscription-connectivity-vpc-peering-add-cidr.png" width="40px" alt="Select the Add CIDR button to add another VPC CIDR." >}}{{< /image >}}

    1. Enter the additional CIDR-formatted IP address in the box:

        {{<image filename="images/rc/subscription-connectivity-vpc-peering-add-multiple-cidrs.png" width="300px" alt="Select the Add CIDR button to add another VPC CIDR." >}}{{< /image >}}

1. Select the **Initiate peering** button:

    {{<image filename="images/rc/button-subscription-connectivity-vpc-peering-initiate-peering.png" width="140px" alt="The Initiate peering button creates a VPC peering request." >}}{{< /image >}}

1. Note the **Peering ID** of the VPC peering request:

    {{<image filename="images/rc/subscription-connectivity-vpc-peering-aws.png" width="350px" alt="View VPC peering list." >}}{{< /image >}}

### Approve VPC peering request {#approve-aws-vpc-peering}

After you set up and intitiate VPC peering, you need to approve the VPC peering request:

1. Follow the AWS guide to [accept the VPC peering connection](https://docs.aws.amazon.com/vpc/latest/peering/create-vpc-peering-connection.html#accept-vpc-peering-connection).

1. After you accept the peering request, select **Modify my route tables now**.

### Update route tables {#update-route-tables}

To finish VPC peering setup, [update your route tables for the peering connection](https://docs.aws.amazon.com/vpc/latest/peering/vpc-peering-routing.html) with the following details:

1. In the **Destination** field, enter the Requester VPC CIDRs shown when you accepted the peering request.

    This is the Redis Cloud VPC CIDR address, to which your application's VPC connects.

1. In the **Target** field, select **Peering Connection** and select the relevant **Peering ID**.

Once VPC peering is established, we recommend switching your application connection string to the private endpoint.

## GCP VPC peering

If you want to peer a Redis Cloud VPC with a GCP VPC, you need to:

1. [Configure and initiate VPC peering](#config-gcp-vpc-peering) for your Redis Cloud subscription.

1. [Approve the VPC peering request](#approve-gcp-vpc-peering).

### Configure VPC peering {#config-gcp-vpc-peering}

To set up VPC peering:

1. Select **Subscriptions** from the [admin console](https://app.redislabs.com/) menu and then select your subscription from the list.

1. Select the **Connectivity** tab and then select **VPC Peering**.

1. Select the **Add peering** button:

    {{<image filename="images/rc/button-subscription-connectivity-vpc-peering-add-peering.png" width="140px" alt="The Add peering button lets you set up VPC peering." >}}{{< /image >}}

1. Enter the VPC peering details:

    | Setting&nbsp;name | Description |
    |-------------------|-------------|
    | **Project ID** | GCP project ID (see [Identifying projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects)) |
    | **Network name** | GCP VPC network you want to peer with (see [View networks](https://cloud.google.com/vpc/docs/create-modify-vpc-networks#viewing-networks)) |

1. Copy the **Google cloud command** after you enter the other VPC peering settings. You need this command to accept the peering request later:

    {{<image filename="images/rc/subscription-connectivity-vpc-peering-gcloud-command.png" width="350px" alt="The Initiate peering button creates a VPC peering request." >}}{{< /image >}}

1. Select the **Initiate peering** button:

    {{<image filename="images/rc/button-subscription-connectivity-vpc-peering-initiate-peering.png" width="140px" alt="The Initiate peering button creates a VPC peering request." >}}{{< /image >}}

1. Note the **Cloud peering ID** of the VPC peering request:

    {{<image filename="images/rc/subscription-connectivity-vpc-peering-gcp.png" width="350px" alt="View VPC peering list." >}}{{< /image >}}

### Approve VPC peering request {#approve-gcp-vpc-peering}

To approve the VPC peering request between Redis Cloud and GCP, use the [`gcloud` CLI](https://cloud.google.com/sdk/gcloud) to run the **Google cloud command** that you copied before you initiated VPC peering.

Once VPC peering is established, we recommend switching your application connection string to the private endpoint.