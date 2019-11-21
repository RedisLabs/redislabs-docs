---
Title: Configuring VPC Peering in Subscriptions
description: A VPC peering connection is a networking connection between the application VPC and the Redis Labs Pro subscription VPC that lets you optimize application performance by routing traffic between them using private IP addresses.
weight: 65
alwaysopen: false
categories: ["RC Pro"]
---
A VPC peering connection is a networking connection between the application VPC and the Redis Labs Pro subscription VPC
that lets you optimize application performance by routing traffic between them using private IP addresses.
Instances in either VPC can securely communicate with each other as if they are within the same network.
This also optimizes the performance of your application.

The VPC peering configuration process contains these steps:

1. Initiate VPC peering request from the RC Pro API
1. Accept the VPC peering request from the AWS Console for the AWS VPC that you want to peer with

## Initiate VPC Peering Request

The API operation that creates a VPC peering request for a subscription is: `POST /subscriptions/{subscription-id}/peerings`

You can use a cURL command to send an asynchronous request to create a VPC peering between the subscription's VPC.
Here is an example of the cURL command and the VPC defined in the request body:

```shell
{{% embed-code "rv/api/15-create-vpc-peering.sh" %}}
```

### Subscription VPC peering request body

The VPC peering request body is in JSON format:

```shell
{{% embed-code "rv/api/create-vpc-peering.json" %}}
```

* **region**: Name of the AWS region where the peering target (application VPC) is located
* **awsAccountId**: ID of the AWS account where the peering target (application VPC) is located
* **vpcId**: ID of the target VPC
* **vpcCidr**: CIDR format address range of the mapping (must be within the range of the target VPC IP range)

### Response

The response contains the resource ID of the peering request.
You can see the request in the list of [VPC peerings per subscription]({{< relref  "/rv/administration/setup_and_editing/view-edit-subscription.md#vpc-peering" >}})).

## Accept the VPC peering request

To accept a VPC peering request in the AWS console:

1. Go to the AWS management console and login to your AWS account that contains the peer VPC.
1. Go to: **Services** > **VPC** > **Peering Connections**
1. Select the peering connection with the Peering ID of your peering request.
1. Go to **Description** and note the `Requester VPC CIDRs` shown in the Peering Connection details.
1. In **Actions**, click **Accept Request**.
1. To confirm to accept the request, click **Yes** and **Accept**.

You can also accept the request with the AWS CLI.

## Listing VPC Peerings per Subscription

The API operation that shows the list of existing and requested VPC peerings for a subscription is: `GET /subscriptions/{subscription-id}/peerings`

```shell
{{% embed-code "rv/api/16-get-vpc-peering.sh" %}}
```

{{% note %}}
The request for a list of VPC peerings is an asynchronous request that returns a task ID.
When the task completes its processing phase, the returned task response contains the list of VPC peerings for the specified subscription.
{{% /note %}}

### Sample response

Here is an example of a response to a VPC peering listing request:

```json
  "response": {
    "resourceId": {subscription-id},
    "resource": {
      "peerings": [
        {
          "vpcPeeringId": 123,
          "awsAccountId": "9876432154",
          "vpcUid": "vpc-08d9875454cb9e2",
          "vpcCidr": "192.168.202.10/28",
          "awsPeeringUid": "pcx-05b5646545439",
          "status": "pending-acceptance"
        },
        {
          "vpcPeeringId": 124,
          "awsAccountId": "9876432154",
          "vpcUid": "vpc-08d9878787b9e2",
          "vpcCidr": "192.168.203.10/28",
          "awsPeeringUid": "pcx-05b59876542",
          "status": "active"
        }
      ]
    }
  }
```

## Delete a VPC Peering

The API operation that deletes a VPC peering for a subscription is: `DELETE /subscriptions/{subscription-id}/peerings/{peeringId}`

```shell
{{% embed-code "rv/api/17-delete-vpc-peering.sh" %}}
```
