---
Title: Networking and Connectivity
linkTitle: Connectivity
description: 
weight: $weight
alwaysopen: false
toc: "true"
categories: ["RC"]
aliases: 
---

Redis offers a few ways you can securely connect your application and your database without exposing your application's [virtual private cloud](https://en.wikipedia.org/wiki/Virtual_private_cloud).

## [VPC Peering]({{<relref "/rc/subscriptions/connectivity/vpc-peering">}})

VPC peering uses private IP addresses to allow network connections between two VPCs.

You can connect your VPC in the Redis Cloud subscription to the VPC of your application. This lets your application connect securely to your Redis Cloud database using VPC peering to optimize the performance of your application.

VPC Peering is only available for Flexible subscriptions.

## [Private Service Connect]({{<relref "/rc/subscriptions/connectivity/private-service-connect">}})

[Private Service Connect](https://cloud.google.com/vpc/docs/private-service-connect) (PSC) creates a private endpoint that allows secure connections to Redis Cloud databases without exposing your application's VPC.

Private Service Connect offers improved security and greater network flexibility over VPC peering. However, it comes with slightly higher latency.

Private Service Connect is only available for Flexible subscriptions hosted on Google Cloud.

## [Transit Gateway]({{<relref "/rc/subscriptions/connectivity/aws-transit-gateway">}})

[Amazon Web Services (AWS) Transit Gateway](https://docs.aws.amazon.com/vpc/latest/tgw/how-transit-gateways-work.html) acts as a regional virtual router for traffic flowing between your virtual private cloud(s) (VPCs) and on-premises networks. You can attach multiple different resources to a transit gateway, including your Redis Cloud and application VPCs.

Transit Gateway supports complex network topologies and allows you to centrally control traffic between multiple VPCs. 

Transit Gateway is only available for Flexible subscriptions hosted on Amazon Web Services.