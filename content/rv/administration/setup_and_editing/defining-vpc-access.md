---
Title: Defining Access to Your VPC
description: 
weight: 20
alwaysopen: false
categories: ["RV"]
---
After you create an Redis Enterprise VPC (RV) subscription, you can configure VPC
peering and a CIDR whitelist to allow more direct access to your VPC.

- VPC peering - The route tables of each VPC have access to the entire CIDR
    block of the peered VPC.
- CIDR whitelist - The route table of your VPC includes the specified CIDR blocks
    and security groups.

