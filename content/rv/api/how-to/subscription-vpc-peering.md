---
Title: Configuring VPC peering supprt in subscriptions
description: A VPC peering connection is a networking connection between the application VPC and the Redis Labs Pro subscription VPC. It enables you to optimize application performance by routing traffic between them using private IP addresses.
weight: 65
alwaysopen: false
categories: ["RC Pro"]
---

A VPC peering connection is a networking connection between two VPCs that enables you to route traffic between them using private IP addresses. Instances in either VPC can communicate with each other as if they are within the same network. You can connect your VPC in the Redis Cloud Pro subscription to the VPC of your application. Then your application can connect securely to your Redis Cloud Pro database using VPC Peering to optimize the performance of your application.

The VPC peering configuration process contains the following steps: 

1. Using the API, initiate VPC peering request 
1. In the AWS console, accept the VPC peering request for the AWS VPC that you want to peer with


## Initiate VPC peering request

The API operation that creates a VPC peering request for a subscription is: `POST /subscriptions/{subscription-id}/peerings`

The following cURL command send an asynchronous request to create a VPC peering between the subscription's VPC, and the VPC defined in the request body:


```shell
{{% embed-code "rv/api/15-create-vpc-peering.sh" %}}
```

### Subscription VPC peering request body

The following JSON snippet is the format of the request body:


```shell
{{% embed-code "rv/api/create-vpc-peering.json" %}}
```

* **region**: Name of the AWS region where the peering target (application VPC) is located
* **awsAccountId**: Id of the AWS account where the peering target (application VPC) is located
* **vpcId**: Id the the target VPC
* **vpcCidr**: CIDR format address range of the mapping (must be within the range of the target VPC IP range)


### Response

The response contains the resource Id of the peering request. This request can be viewed in the list of VPC peerings per subscription (see [Defining Access to your Subscription - VPC Peering]({{< relref  "/rv/administration/setup_and_editing/view-edit-subscription/#vpc-peering" >}}))


## Accept the VPC peering request

Accepting a VPC peering request is performed in the AWS console (or using the AWS CLI).

1. Go to the AWS management console and login to your AWS account that contains the peer VPC.
1. Go to: Services > VPC > Peering Connections
Select the peering connection with the Peering ID of your peering request.
1. Go to Description and note the Requester VPC CIDRs shown in the Peering Connection details.
1. Click Actions and select Accept Request.
1. To confirm to accept the request, click Yes, Accept.


## Listing VPC peerings per subscription 

The API operation that displays the list of VPC peerings (existing or requested) for a subscription is: `GET /subscriptions/{subscription-id}/peerings`

```shell
{{% embed-code "rv/api/16-get-vpc-peering.sh" %}}
```

{{% note %}}
Get Subscription list of VPC peerings is an asynchronous request that returns a task Id. When the task completes its processing phase, the returned task response contains the list of VPC peerings for the specified Subscription.
{{% /note %}}


### Sample response 

Following is a sample response VPC peering listing request:


```
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

{{% note %}}
Get Subscription list of VPC peerings is an asynchronous request that returns a task Id. When the task completes its processing phase, the returned task response contains the list of VPC peerings for the specified Subscription.
{{% /note %}}



## Delete a VPC peering

The API operation that displays the list of VPC peerings (existing or requested) for a subscription is: `DELETE /subscriptions/{subscription-id}/peerings/{peeringId}`


```shell
{{% embed-code "rv/api/17-delete-vpc-peering.sh" %}}
```