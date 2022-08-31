---
Title: Network security
linkTitle: Network security
description:
weight: 30
alwaysopen: false
categories: ["RC"]
aliases: /rc/security/database-security/network-security/
         /rc/security/database-security/network-security.md

---

Redis Enterprise Cloud supports two types of network security: database-level CIDR allow lists and [VPC](#virtual-private-clouds)-wide CIDR allow lists.

These features are available in most Redis Cloud configurations, as shown here:

| Cloud&nbsp;provider | VPC peering | IP restrictions |
|:-------------------:|-------------|-----------------|
| AWS | Flexible and Annual | Fixed (paid), Flexible, and Annual |
| GCP | Flexible and Annual | Fixed (paid), Flexible, and Annual |
| Azure | Annual | Annual |

## IP and subnet restrictions {#ip}

You can restrict database access to a configurable
set of source IP addresses and subnets. This is roughly equivalent
to using [iptables](https://en.wikipedia.org/wiki/Iptables) to limit access to a host.

To restrict a database to a specific set of source IP addresses or subnets, see [Configure CIDR allow list]({{<relref "/rc/security/cidr-whitelist">}}).

## Virtual private clouds

A [Virtual Private Cloud](https://en.wikipedia.org/wiki/Virtual_private_cloud) (VPC) is an isolated set of resources within a [public cloud](https://en.wikipedia.org/wiki/Cloud_computing#Public_cloud), usually having its own subnets and VLAN.

Databases in Flexible and Annual subscriptions are almost always deployed in a Redis VPC. In most cases, you'll need to create a [VPC peering connection]({{<relref "/rc/security/vpc-peering">}}) to access these databases. A VPC peering connection allows unrestricted network access between two VPCs.

How you create these connections and the features supported vary somewhat by public cloud provider. You can read about VPC usage for [AWS](#vpcs-with-aws), [GCP](#vpcs-with-gcp), and [Azure](#vpcs-with-azure) below.

### VPCs with AWS

Subscriptions that run on AWS support two VPC options. To ensure that that you can securely connect to your database, you need to [create a VPC peering connection]({{<relref "/rc/security/vpc-peering#aws-vpc-peering">}}).

If you create a VPC peering connection, you can also [configure a CIDR allow list]({{<relref "/rc/security/cidr-whitelist">}}) to allow connections only from specific IP address blocks or security groups.

### VPCs with GCP

Subscriptions that run on GCP *require* a VPC peering connection. See [GCP VPC peering](http://localhost:1313/rc/security/vpc-peering/#gcp-vpc-peering) to learn how to set up VPC peering for GCP.

### VPCs with Azure

When you request a Redis Cloud Annual subscription, all databases will be deployed in your own Azure VPC.
