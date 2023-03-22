---
title: Enable private and public database endpoints
linkTitle: Public and private endpoints
description: Describes how to enable public and private endpoints for databases on a cluster.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/administering/designing-production/networking/private-public-endpoints/,
    /rs/networking/private-public-endpoints/,
]
---
By default, Redis Enterprise Software databases expose a single endpoint, e.g. cluster.com (FQDN).

When you create a cluster via the UI, you can configure it to expose private and public endpoints.
This is common for environments such as cloud platforms and enterprises.

When doing so, the cluster creates an additional FQDN, e.g. internal.cluster.com for private network (e.g. VPC or an internal network), while the cluster.com FQDN can be used by a public network (e.g. the internet).

This configuration can be enabled at cluster creation only.
Once the cluster is created, it is possible to add an additional FQDN in a differnet domain only, e.g. cluster.io.

Follow these steps to enable private and public endpoints:

- Verify that the IP addresses are bound to the server/instance.

- When setting up the cluster via the UI, select the **Enable private and public endpoint support** setting. It appears in the **Cluster configuration** section of the **Node configuration** screen.

    {{<image filename="images/rs/node-configuration-endpoint-support.png" alt="The endpoint support setting appears in the **Cluster configuration section** of the **Node configuration** screen." >}}{{< /image >}}

    If this setting is not enabled when the cluster is created, databases on the cluster support only a single endpoint.

- Configure the public IP of the machine to be used for external traffic in the node configuration.

- Configure private IP to be used for both internal and external traffic in the node configuration so it can be used for private database endpoints.

When you finish, both sets of endpoints are available for databases in the cluster.

Use the **Configuration** tab of a database on the cluster to verify availability of private and public endpoints.
