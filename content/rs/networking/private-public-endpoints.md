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
By default, Redis Enterprise Software databases expose a single endpoint.

When you create a cluster, you can configure it to expose private and public endpoints.

This is valuable for certain environments, such as cloud platforms, where you want:

- A private IP address available only within the internal network

- Public IP addresses accessible from the Internet (public network)

To enable this configuration, you need to:

- Make sure that the IP addresses are already bound to the server/instance.

- Select the **Enable private and public endpoint support** setting when creating the cluster.

    This setting is available when you set up a cluster.  It appears in the **Cluster configuration** section of the **Node configuration** screen.

    {{<image filename="images/rs/node-configuration-endpoint-support.png" alt="The endpoint support setting appears in the **Cluster configuration section** of the **Node configuration** screen." >}}{{< /image >}}

    If this setting is not enabled when the cluster is created, databases on the cluster support only a single endpoint.

- Configure the public IP of the machine to be used for external traffic in the node configuration.

- Configure private IP to be used for both internal and external traffic in the node configuration so it can be used for private database endpoints.

When you finish, both sets of endpoints are available for databases in the cluster.

Use the **Configuration** tab of a database on the cluster to verify availability of private and public endpoints.