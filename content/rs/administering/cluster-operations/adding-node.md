---
Title: Adding a Node to an Existing Cluster
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
To add a node in Redis Enterprise Software (RS):

1. Install the installation package on the machine that will serve as
    the new node.
    For additional details, refer to [installing the setup
    package]({{< relref "/rs/installing-upgrading/downloading-installing.md" >}}).
1. In a browser, navigate to https://\<name or IP address of the node
    on which you installed the package\>:8443.
    For example, if you installed the RS package on a machine with IP
    address 10.0.1.34, then navigate to https://10.0.1.34:8443.

    **Note:** The RS management UI uses SSL encryption. For additional
    details, refer to [Updating SSL
    certificates]({{< relref "/rs/administering/cluster-operations/updating-certificates.md" >}}).

1. In the window that appears, click **Setup**.
1. In the Node configuration page:
    1. Enter a path for **Persistent storage**, or leave the default
        path.
        For additional details, refer to [Persistent and ephemeral
        storage]({{< relref "/rs/administering/designing-production/persistent-ephemeral-storage.md" >}}).
    1. You can enter a path for **Ephemeral storage**, or leave the
        default path.
        For additional details, refer to [Persistent and ephemeral
        storage]({{< relref "/rs/administering/designing-production/persistent-ephemeral-storage.md" >}}).
    1. If you want to enable Redis on Flash, select the check box
        Enable flash storage support and enter the path to the Flash
        storage that should be used as RAM extension.
        For additional details, refer to [Redis on
        Flash]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}}).
    1. If your machine is configured to have multiple IP addresses, the
        section **IP Addresses Usage** is displayed. Use the **IP
        Addresses Usage** section to assign a single IPv4 type address
        for internal traffic and multiple IPv4/IPv6 type addresses for
        external traffic.
        For additional details, refer to [Multi-IP &
        IPv6]({{< relref "/rs/administering/designing-production/networking/multi-ip-ipv6.md" >}}).
    1. In Cluster configuration, select **Join cluster**.
    1. Enter an IP address of a node in the cluster.

        **Note:** You must use the internal IP address if the node has
        both an internal and external IP address.

    1. Enter the credentials of the cluster administrator, which you
        defined when you created the cluster.
    1. Click **Next**.
    1. If the cluster is configured to support rack-zone awareness, you
        are redirected to a page in which you must set the node's
        Rack-zone ID. For additional details, refer to [Rack-zone
        awareness]({{< relref "/rs/concepts/high-availability/rack-zone-awareness.md" >}}).

After a short wait, the node is added to the cluster, and the cluster
management UI appears, displaying the **Nodes **page. This page lists
all the cluster nodes, including the new node you just added.

**Note: **It is highly advisable to verify that the node is functioning
properly, by running the rlcheck utility. For additional details, refer
to [rlcheck Installation Verification
Utility]({{< relref "/rs/references/cli-reference/rlcheck.md" >}})

**Note:** The clocks on all nodes must always be synchronized. If the
clock in the node you are trying to join to the cluster is not
synchronized with the nodes already in the cluster the action will fail
and an error message will appear indicating that you must synchronize
the clocks first. For guidelines, refer to [Synchronizing Node
Clocks]({{< relref "/rs/administering/designing-production/synchronizing-clocks.md" >}}).

**Note: **The DNS records must be updated each time a node is added or
replaced. For additional details, refer to
[DNS]({{< relref "/rs/installing-upgrading/configuring/cluster-name-dns-connection-management/_index.md" >}}).
