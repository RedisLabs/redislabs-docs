---
Title: Setting up a New Cluster
description:
weight: 10
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/new-cluster-setup/
        /rs/administering/cluster-operations/new-cluster-setup/
---
A Redis Enterprise Software (RS) cluster typically consists of several
nodes. For production deployments, Redis Labs recommends an uneven
number of nodes, with a minimum of three.

{{< note >}}
In a cluster that consists of only one node, some features and
capabilities are not enabled, such as database replication that provides high availability.
{{< /note >}}

To set up a new cluster, you must first [install the Redis Enterprise
Software
package]({{< relref "/rs/installing-upgrading/_index.md" >}})
as described in the previous section and then set up the cluster as
described below. After the cluster is created you can [add multiple nodes
to the cluster]({{< relref "/rs/administering/adding-node.md" >}}).

## Creating a cluster

To create a cluster:

1. In a browser, navigate to https://\<name or IP address of a machine
    on which you installed the package\>:8443. For example, if you
    installed RS on a machine with IP address 10.0.1.34, then navigate
    to https://10.0.1.34:8443.

    {{< note >}}
- The RS management UI uses a [self-signed SSL/TLS encryption]({{< relref "/rs/administering/cluster-operations/updating-certificates.md" >}}).
- If the machine has both an internal IP address and an external IP address,
use the external IP address to access the setup UI.
    {{< /note >}}

1. Click **Setup**.
1. In the Node Configuration page that appears:

    1. Enter a path for [**Persistent storage**]({{< relref "/rs/administering/designing-production/persistent-ephemeral-storage.md" >}}), or leave the default
        path.

    1. Enter a path for [**Ephemeral storage**]({{< relref "/rs/administering/designing-production/persistent-ephemeral-storage.md" >}}), or leave the default
        path.

    1. If you want to enable Redis on Flash, select the **Enable flash
        storage support** checkbox and enter the path to the [Flash
        storage]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}}). that should be used as RAM extension.

    1. If your machine is configured to have multiple IP addresses, the
        section **IP Addresses Usage** is shown. Use the **IP
        Addresses Usage** section to assign a single IPv4 type address
        for internal traffic and multiple IPv4/[IPv6]({{< relref "/rs/administering/designing-production/networking/multi-ip-ipv6.md" >}}) type addresses for
        external traffic.

    1. In Cluster configuration, select **Create new cluster**.

    1. In **Cluster name (FQDN)**, enter a unique name for the
        cluster.
        For guidelines, refer to [How to set the cluster
        name]({{< relref "/rs/installing-upgrading/configuring/cluster-dns.md" >}}).

    1. Choose whether to [**Enable private & public endpoints support**]({{< relref "/rs/administering/designing-production/networking/private-public-endpoints.md" >}}).

    1. Choose whether to [**Enable rack-zone awareness**]({{< relref "/rs/concepts/high-availability/rack-zone-awareness.md" >}}). Enabling
        rack-zone awareness requires setting the **Rack-zone ID** for
        the node.

    1. Click **Next**.
1. If you purchased a cluster key, use the **Cluster authentication**
    page to enter the key. Otherwise, you get the trial license by
    default. Read the product Terms and Conditions and click **Next.**
1. Click **OK** to confirm that you are aware of the replacement of the HTTPS SSL/TLS
    certificate on the node, and proceed, and proceed through the browser warning.
1. Use the **Set admin credentials** page to enter the credentials of
    the cluster administrator. These credentials are required in order
    to add nodes to the cluster, and to regularly log in to the cluster
    management UI.
1. Click **Next**.

After a short wait, your cluster is created and the cluster management
UI appears.

You can now access any of the management capabilities. To create a
database, refer to [Creating a new
database]({{< relref "/rs/administering/creating-databases/_index.md" >}}),
or add another node to this cluster, refer to [Joining a new node to a
cluster]({{< relref "/rs/administering/adding-node.md" >}}).

It is highly advisable to verify that the node is functioning properly,
by carrying out the following tests:

- Run [`rlcheck`]({{< relref "/rs/references/rlcheck.md" >}}) on the node.
- [Test connectivity]({{< relref "/rs/administering/troubleshooting/testing-client-connectivity.md" >}}) to the database.

Topics

- [How to Set the Cluster
    Name]({{< relref "/rs/installing-upgrading/configuring/cluster-dns/_index.md" >}})
