---
Title: Add a cluster node
linktitle: Add a node
description: Add a node to your existing Redis Enterprise cluster. 
weight: 20
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/administering/cluster-operations/adding-node/,
    /rs/clusters/add-node.md,
    /rs/administering/adding-node/,
    /rs/clusters/add-node.md,
    /rs/clusters/add-node/,
    /embeds/adding-node-embed.md,
    /embeds/adding-node-embed/,

]
---
When you install Redis Enterprise Software on the first node of a cluster, you create the new cluster.
After you install the first node, you can add more nodes to the cluster.

{{< note >}}
Before you add a node to the cluster:

- The clocks on all nodes must always be [synchronized]({{< relref "/rs/clusters/configure/sync-clocks.md" >}}).

    If the clock in the node you are trying to join to the cluster is not synchronized with the nodes already in the cluster,
    the action fails and an error message is shown indicating that you must synchronize the clocks first.

- You must [update the DNS records]({{< relref "/rs/networking/cluster-dns/_index.md" >}})
    each time a node is added or replaced.

- We recommend that you add nodes one after the other rather than in parallel
    to avoid errors that occur because the connection to the other nodes in the cluster cannot be verified.
{{< /note >}}

To add a node to an existing cluster:

1. [Install the Redis Enterprise Software installation package]({{< relref "/rs/installing-upgrading/_index.md" >}}) on a clean installation
    of a [supported operating system]({{< relref "/rs/installing-upgrading/install/plan-deployment/supported-platforms.md" >}}).

1. To connect to the management UI of the new Redis Enterprise Software installation, go to: <https://URL or IP address:8443/new>

    For example, if you installed Redis Enterprise Software on a machine with IP address 10.0.1.34, go to `https://10.0.1.34:8443/new`.

    {{< tip >}}
The management UI uses TLS encryption with a default certificate.
You can also [replace the TLS certificate]({{<relref "/rs/security/certificates/updating-certificates">}})
with a custom certificate.
    {{< /tip >}}

1. Select **Join cluster**.

1. For **Cluster identification**, enter the internal IP address or DNS name of a node that is a cluster member.

    If the node only has one IP address, enter that IP address.

1. For **Cluster sign in**, enter the credentials of the cluster administrator.

    The cluster administrator is the user account that you create when you configure the first node in the cluster.

1. Click **Next**.

1. Configure storage and network settings:

    1. Enter a path for [*Ephemeral storage*]({{< relref "/rs/installing-upgrading/install/plan-deployment/persistent-ephemeral-storage" >}}), or leave the default path.

    1. Enter a path for [*Persistent storage*]({{< relref "/rs/installing-upgrading/install/plan-deployment/persistent-ephemeral-storage" >}}),
        or leave the default path.

    1. To enable [*Auto Tiering*]({{< relref "/rs/databases/auto-tiering/" >}}),
        select **Enable flash storage** and enter the path to the flash storage.

    1. If the cluster is configured to support [rack-zone awareness]({{< relref "/rs/clusters/configure/rack-zone-awareness.md" >}}), set the **Rack-zone ID** for the new node.

    1. If your machine has multiple IP addresses, assign a single IPv4 type address for **Node-to-node communication (internal traffic)** and multiple IPv4/IPv6 type addresses for **External traffic**.

1. Select **Join cluster**.

The node is added to the cluster.
You can see it in the list of nodes in the cluster.

If you see an error when you add the node, try adding the node again.

{{< tip >}}
We recommend that you run the [rlcheck utility]({{<relref "/rs/references/cli-utilities/rlcheck">}}) to verify that the node is functioning properly.
{{< /tip >}}

