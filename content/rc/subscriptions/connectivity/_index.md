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

## [Private Service Connect]({{<relref "/rc/subscriptions/connectivity/private-service-connect">}})

[Private Service Connect](https://cloud.google.com/vpc/docs/private-service-connect) (PSC) creates a private endpoint that allows secure connections to Redis Cloud databases without exposing your application's VPC.

Private Service Connect is only available for Flexible subscriptions hosted on Google Cloud.

## [VPC Peering]({{<relref "/rc/subscriptions/connectivity/vpc-peering">}})

VPC peering uses private IP addresses to allow network connections between two VPCs.

You can connect your VPC in the Redis Cloud subscription to the VPC of your application. This lets your application connect securely to your Redis Cloud database using VPC peering to optimize the performance of your application.

VPC Peering is only available for Flexible subscriptions.