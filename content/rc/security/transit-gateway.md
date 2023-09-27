---
Title: Connect to Amazon Web Services Transit Gateway
linkTitle: Transit Gateway
description: 
weight: 80
alwaysopen: false
categories: ["RC"]
aliases:
---

[AWS Transit Gateway](https://docs.aws.amazon.com/vpc/latest/tgw/how-transit-gateways-work.html) acts as a Regional virtual router for traffic flowing between your virtual private cloud(s) (VPCs) and on-premises networks. You can attach different resources to your Transit Gateway which include:

- One or more VPCs
- One or more VPN connections
- One or more AWS Direct Connect gateways
- One or more Transit Gateway Connect attachments
- One or more transit gateway peering connections

## Prerequisites

In order to configure your Redis subscriptions to use Transit Gateway, there are some required pre-requisites that need to be setup in your AWS account.

1. The Transit Gateway should already be defined in the AWS account with an attachment to the local VPC configured

2. The transit Gateway should be configured as a shared resource in **Resource Access Manager**

## Connect Redis subscriptions to AWS transit Gateway

1. In order to configure AWS Transit Gateway as a network connectivity provider to SM, the first step is to select your Flexible subscription, select **Connectivity** then **Transit Gateway** and copy the AWS account number. 

2. Login to your AWS account and go to **Resource Access Manager** -> **Shared by me** and add the AWS account number as a new principal for the shared resource.
   
3. Once complete, return to SM and you should now see that a **Resource Share** is available. Select **Resource Shares**.

4. Select **Accept** to associate the **Resource Share** with your admin console account.

5. One the status is available, select **Create Attachement**. This will associate an attachment representing SM's AWS account to the Transit Gateway

6. Once the attachment has been created, it is in **pending acceptance** status. Go back to the AWS console and search for **transit gateway attachments**. You will see an attachment which is **pending acceptance** 

Select the attachment and from the **Actions** menu select **Accept transit gateway attachment**

7. Once the state changes to **available**, go back to your SM console. Select **Add CIDRs**

A pane opens, here enter the CIDR block range of the AWS VPC you are connecting to. You can find this in the list of VPCs in the AWS console

8. Add the CIDR range of the SM subscription to the VPC's route table in AWS.

Go back to the AWS console and select the route table associated to the VPC.


