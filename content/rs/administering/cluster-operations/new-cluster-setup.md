---
Title: New Cluster Setup
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
A Redis Enterprise Software (RS) cluster typically consists of several
nodes. For production deployments, Redis Labs recommends an uneven
number of nodes, with a minimum of three.

Note: In a cluster that consists of only one node, some features and
capabilities are not enabled, such as database replication that provides high availability.

To set up a new cluster, you must first [install the Redis Enterprise
Software
package]({{< relref "/rs/installing-upgrading/downloading-installing.md" >}})
as described in the previous section and then set up the cluster as
described below. After the cluster is created you can add multiple nodes
to the cluster (for additional details, refer to [Joining a new node to
a
cluster]({{< relref "/rs/administering/cluster-operations/adding-node.md" >}}).

## Creating a cluster

To create a cluster:

1. In a browser, navigate to https://\<name or IP address of a machine
    on which you installed the package\>:8443. For example, if you
    installed RS on a machine with IP address 10.0.1.34, then navigate
    to https://10.0.1.34:8443.

    **Note:** The RS management UI uses a self-signed SSL/TLS encryption.
    For additional details, refer to [Updating SSL
    certificates]({{< relref "/rs/administering/cluster-operations/updating-certificates.md" >}}).

    **Note:** If the machine has both an internal IP address and an
    external IP address, use the external IP address to access the setup
    UI.

1. Click **Setup**.
1. In the Node Configuration page that appears:

    1. Enter a path for **Persistent storage**, or leave the default
        path.
        For additional details, refer to [Persistent and ephemeral
        storage]({{< relref "/rs/administering/designing-production/persistent-ephemeral-storage.md" >}}).
        
    1. Enter a path for **Ephemeral storage**, or leave the default
        path.
        For additional details, refer to [Persistent and ephemeral
        storage]({{< relref "/rs/administering/designing-production/persistent-ephemeral-storage.md" >}}).
   
    1. If you want to enable Redis on Flash, select the **Enable flash
        storage support** checkbox and enter the path to the Flash
        storage that should be used as RAM extension.
        For additional details, refer to [Redis Enterprise
        Flash]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}}).
        
    1. If your machine is configured to have multiple IP addresses, the
        section **IP Addresses Usage** is displayed. Use the **IP
        Addresses Usage** section to assign a single IPv4 type address
        for internal traffic and multiple IPv4/IPv6 type addresses for
        external traffic. For additional details, refer to Multi-IP &
        IPv6.
        
    1. In Cluster configuration, select **Create new cluster**.
   
    1. In **Cluster name (FQDN)**, enter a unique name for the
        cluster.
        For guidelines, refer to [How to set the cluster
        name]({{< relref "/rs/installing-upgrading/configuring/cluster-name-dns-connection-management/_index.md" >}}).
        
    1. Choose whether to **Enable private & public endpoints support**.
        For additional details, refer to Private & Public Endpoints.
        
    1. Choose whether to **Enable rack-zone awareness**. Enabling
        rack-zone awareness requires setting the **Rack-zone ID** for
        the node. For additional details, refer to [Rack-zone
        awareness]({{< relref "/rs/concepts/high-availability/rack-zone-awareness.md" >}}).
        
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
database]({{< relref "/rs/administering/database-operations/creating-database.md" >}}),
or add another node to this cluster, refer to [Joining a new node to a
cluster]({{< relref "/rs/administering/cluster-operations/adding-node.md" >}}).

It is highly advisable to verify that the node is functioning properly,
by carrying out the following tests:

- Run *rlcheck* on the node. For additional details, refer to [rlcheck
    Installation Verification
    Utility]({{< relref "/rs/references/cli-reference/rlcheck.md" >}}).
- Test connectivity to the database. For additional details, refer to
    [Testing Client
    Connectivity]({{< relref "/rs/administering/troubleshooting/testing-client-connectivity.md" >}}).

Topics

- [How to Set the Cluster
    Name]({{< relref "/rs/installing-upgrading/configuring/cluster-name-dns-connection-management/_index.md" >}})
