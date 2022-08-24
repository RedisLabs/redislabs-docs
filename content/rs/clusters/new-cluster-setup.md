---
Title: Set up a new cluster
linktitle: Set up cluster
description: How to set up a new cluster using the management UI.
weight: 10
alwaysopen: false
categories: ["RS"]
aliases: [    
        /rs/administering/new-cluster-setup/,
        /rs/administering/cluster-operations/new-cluster-setup/,
        /rs/clusters/new-cluster-setup.md,
        /rs/clusters/new-cluster-setup/,
        /embeds/new-cluster-embed.md,
        /embeds/new-cluster-embed/,

    ]
---
A Redis Enterprise Software cluster typically consists of several nodes.
For production deployments, we recommend an uneven number of nodes, with a minimum of three.

{{< note >}}
In a cluster that consists of only one node, some features and capabilities are not enabled,
such as database replication that provides high availability.
{{< /note >}}

To set up a new cluster, you must first [install the Redis Enterprise Software package]({{< relref "/rs/installing-upgrading/_index.md" >}})
and then set up the cluster as described below.
After the cluster is created you can [add multiple nodes to the cluster]({{< relref "/rs/clusters/add-node.md" >}}).

To create a cluster:

1. In a browser, navigate to `https://<name or IP address of the machine with RS installed>:8443`.
    For example, if you installed RS on a machine with IP address 10.0.1.34, then navigate to <https://10.0.1.34:8443>.

    {{< note >}}
- The RS management UI uses a [self-signed SSL/TLS encryption]({{<relref "/rs/security/certificates/updating-certificates">}}).
- If the machine has both an internal IP address and an external IP address, use the external IP address to access the setup UI.
    {{< /note >}}

1. Click **Setup**.
1. In the Node Configuration page that appears:

    1. Enter a path for [**Persistent storage**]({{< relref "/rs/installing-upgrading/persistent-ephemeral-storage.md.md" >}}),
        or leave the default path.

    1. Enter a path for [**Ephemeral storage**]({{< relref "/rs/installing-upgrading/persistent-ephemeral-storage.md.md" >}}),
        or leave the default path.

    1. If you want to enable Redis on Flash, select the **Enable flash storage support** checkbox
        and enter the path to the [Flash storage]({{< relref "/rs/concepts/memory-performance/redis-flash.md" >}}).

    1. If your machine is configured to have multiple IP addresses, the section **IP Addresses Usage** is shown.
        Use the **IP Addresses Usage** section to assign a single IPv4 type address for internal traffic
        and multiple IPv4/[IPv6]({{< relref "/rs/networking/multi-ip-ipv6.md" >}}) type addresses for external traffic.

    1. In Cluster configuration, select **Create new cluster**.

    1. In **Cluster name (FQDN)**, enter a unique name for the cluster.
        Also, make sure that you look at the [instructions for setting up DNS]({{< relref "/rs/networking/cluster-dns/_index.md" >}})
        to make sure your cluster is reachable by name.

    1. Choose whether to [**Enable private & public endpoints support**]({{< relref "/rs/networking/private-public-endpoints.md" >}}).

    1. Choose whether to [**Enable rack-zone awareness**]({{< relref "/rs/clusters/configure/rack-zone-awareness.md" >}}).
        Enabling rack-zone awareness requires setting the **Rack-zone ID** for the node.

    1. Click **Next**.
1. If you purchased a cluster key, use the **Cluster authentication** page to enter the key.
    Otherwise, you get the trial license by default.
    Read the product Terms and Conditions and click **Next.**
1. Click **OK** to confirm that you are aware of the replacement of the HTTPS SSL/TLS certificate on the node,
    and proceed through the browser warning.
1. In the **Set admin credentials** fields, enter the credentials of the cluster administrator.
1. Click **Next**.

After a short wait, your cluster is created and you can log in to the RS admin console.

You can now access any of the management capabilities, including:

- [Creating a new database]({{< relref "/rs/databases/create-database.md" >}})
- [Joining a new node to a cluster]({{< relref "/rs/clusters/add-node.md" >}})
