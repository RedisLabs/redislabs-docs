---
Title: Redis Cloud changelog (January 2024)
linktitle: January 2024
description: New features, enhancements, and other changes added to Redis Cloud during January 2024.
highlights: Transit Gateway, Database tags
weight: 70
alwaysopen: false
categories: ["RC"]
aliases: []
---

## New features

### Transit Gateway 

You can now connect your Flexible subscriptions hosted on Amazon Web Services (AWS) to [AWS Transit Gateway](https://docs.aws.amazon.com/vpc/latest/tgw/how-transit-gateways-work.html). See [Connect to Transit Gateway]({{<relref "/rc/security/aws-transit-gateway">}}) to learn how to connect your Flexible subscription to Transit Gateway.

### Network data cost breakdowns

Invoices for customers with Flexible and Annual subscriptions now include a breakdown of network data costs for the subscription. To download an invoice, go to the [Billing and Payments]({{<relref "/rc/billing-and-payments#download-invoice">}}) page on the [Redis Cloud console](https://app.redislabs.com/).

Customers with Annual subscriptions can also find a breakdown of network data costs in the consumption report.

## Deprecations

- {{< embed-md "rc-fixed-upgrade-limitation.md" >}}
