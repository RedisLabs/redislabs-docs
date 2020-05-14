---
Title: Adding a Node to an Existing Cluster
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
When you install RS on the first node of a cluster, you create the new cluster.
After you install the first node, you can add more nodes to the cluster.

## Prerequisites

- The clocks on all nodes must always be [synchronized]({{< relref
    "/rs/administering/designing-production/synchronizing-clocks.md" >}}).

    If the clock in the node you are trying to join to the cluster is not
    synchronized with the nodes already in the cluster, the action fails
    and an error message is shown indicating that you must synchronize
    the clocks first.

- You must [update the DNS records]({{< relref
    "/rs/installing-upgrading/configuring/cluster-name-dns-connection-management/_index.md"
    >}}) each time a node is added or replaced.

## Adding a node to an existing Cluster

To add a node in Redis Enterprise Software (RS):

1. [Install the RS installation package]({{< relref
    "/rs/installing-upgrading/_index.md" >}}) on a clean installation
    of a [supported operating system]({{< relref
    "/rs/installing-upgrading/supported-platforms.md" >}}).
1. To connect to the RS management UI of the new RS installation, go to:
    https://\<URL or IP address>:8443

    For example, if you installed RS on a machine with IP address 10.0.1.34,
    go to `https://10.0.1.34:8443`.

    {{% tip %}}The RS management UI uses SSL encryption with a default certificate.
    You can also [replace the TLS certificate]({{< relref
    "/rs/administering/cluster-operations/updating-certificates.md" >}}) with a
    custom certificate.{{% /tip %}}

1. To start configuring RS, click **Setup**.
1. Configure the RS network and storage settings:
    1. You can enter a path for [*Persistent storage*]({{< relref
        "/rs/administering/designing-production/persistent-ephemeral-storage.md" >}}),
        or leave the default path.
    1. You can enter a path for [*Ephemeral storage*]({{< relref
        "/rs/administering/designing-production/persistent-ephemeral-storage.md" >}}),
        or leave the default path.
    1. If you want to enable [*Redis on Flash*]({{< relref
        "/rs/concepts/memory-architecture/redis-flash.md" >}}), select
        **Enable flash storage support** and enter the path to the Flash storage
        to use as RAM extension.
    1. If your machine has multiple IP addresses, in *IP Addresses Usage* assign
        a single IPv4 type address for internal traffic and multiple IPv4/IPv6
        type addresses for external traffic.
1. Join the new RS node to the cluster:
    1. In *Cluster configuration*, select **Join cluster**.
    1. Enter the internal IP address or DNS name of a node that is a cluster member.

        If the node only has one IP address, enter that IP address.

    1. Enter the credentials of the cluster administrator.

        The cluster administrator is the user account that you create when you
        configure the first node in the cluster.

1. Click **Next**.

    If the cluster is configured to support [rack-zone awareness]({{< relref
    "/rs/concepts/high-availability/rack-zone-awareness.md" >}}), you are
    redirected to a page in which you must set the Rack-zone ID for the new node.

The node is added to the cluster. You can see it in the list of nodes in the
cluster.

{{% tip %}}We recommend that you run the [rlcheck utility]({{< relref
"/rs/references/rlcheck.md" >}}) to verify that the node is functioning
properly.{{% /tip %}}
