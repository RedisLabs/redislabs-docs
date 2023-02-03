---
Title: Manage networks
linktitle: Networking
description: Networking features and considerations designing your Redis Enteprise Software deployment.
weight: 39
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/administering/designing-production/networking/,
    /rs/administering/designing-production/networking/_index.md,
    /rs/networking/_index.md,
    /rs/networking/,
]
---
When designing a Redis Enterprise Software solution, there are some
specific networking features that are worth your time to understand and
implement.

## [Configure cluster DNS]

Configure DNS to communicate between cluster nodes.

- [AWS Route53 DNS management]
- [Client Prerequisites for mDNS] for development and test environments

## [Cluster load balancer setup]

Set up a load balancer to direct traffic to cluster nodes when DNS is not available.

## [Multi-IP and IPv6]

Requirements for using multiple IP addresses or IPv6 addresses with Redis Enterprise Software.

## [Network port configurations]

Describes the various port ranges that Redis Enterprise Software uses.

## [Public and private endpoints]

Enable public and private endpoints for your databases.