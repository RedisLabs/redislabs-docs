---
Title: New Cluster Setup
description: $description
weight: $weight
alwaysopen: false
---
A Redis Enterprise Software (RS) cluster typically consists of several
nodes. For production deployments, Redis Labs recommends an uneven
number of nodes, with a minimum of three.

Note: In a cluster that consists of only one node, some features and
capabilities such as database replication (which enables failover to
ensure high availability), are not enabled.

To set up a new cluster, you must first [install the Redis Enterprise
Software
package](/redis-enterprise-documentation/installing-and-upgrading/accessing-and-installing-the-setup-package/)
as described in the previous section and then set up the cluster as
described below. After the cluster is created you can add multiple nodes
to the cluster (for additional details, refer to [Joining a new node to
a
cluster](/redis-enterprise-documentation/cluster-administration/joining-a-new-node-to-a-cluster)).

To create a cluster:
--------------------

1.  In a browser, navigate to https://\<name or IP address of a machine
    on which you installed the package\>:8443. For example, if you
    installed RS on a machine with IP address 10.0.1.34, then navigate
    to https://10.0.1.34:8443.

    **Note:** The RS management UI uses a self-signed SSL encryption.
    For additional details, refer to [Updating SSL
    certificates](/redis-enterprise-documentation/cluster-administration/best-practices/updating-ssl-certificates).

    **Note:** If the machine has both an internal IP address and an
    external IP address, use the external IP address to access the setup
    UI.

2.  Click **Setup**.
3.  In the Node Configuration page that appears:
    a.  Enter a path for **Persistent storage**, or leave the default
        path.\
        For additional details, refer to [Persistent and ephemeral
        storage](/redis-enterprise-documentation/cluster-administration/best-practices/persistent-and-ephemeral-storage/).
    b.  Enter a path for **Ephemeral storage**, or leave the default
        path.\
        For additional details, refer to [Persistent and ephemeral
        storage](/redis-enterprise-documentation/cluster-administration/best-practices/persistent-and-ephemeral-storage/).
    c.  If you want to enable Redis^e^ Flash, select the **Enable flash
        storage support** checkbox and enter the path to the Flash
        storage that should be used as RAM extension.\
        For additional details, refer to [Redis Enterprise
        Flash](/redis-enterprise-documentation/redis-e-flash/).
    d.  If your machine is configured to have multiple IP addresses, the
        section **IP Addresses Usage** is displayed. Use the **IP
        Addresses Usage** section to assign a single IPv4 type address
        for internal traffic and multiple IPv4/IPv6 type addresses for
        external traffic. For additional details, refer to Multi-IP &
        IPv6.
    e.  In Cluster configuration, select **Create new cluster**.
    f.  In **Cluster name (FQDN)**, enter a unique name for the
        cluster.\
        For guidelines, refer to [How to set the cluster
        name](/redis-enterprise-documentation/administering/installing-upgrading/configuring/cluster-name-dns-connection-management/).
    g.  Choose whether to **Enable private & public endpoints support**.
        For additional details, refer to Private & Public Endpoints.
    h.  Choose whether to **Enable rack-zone awareness**. Enabling
        rack-zone awareness requires setting the **Rack-zone ID** for
        the node. For additional details, refer to [Rack-zone
        awareness](/redis-enterprise-documentation/rack-zone-awareness).
    i.  Click **Next**.
4.  If you purchased a cluster key, use the **Cluster authentication**
    page to enter the key. Otherwise, you get the trial license by
    default. Read the product Terms and Conditions and click **Next.**
5.  Use the **Set admin credentials** page to enter the credentials of
    the cluster administrator. These credentials are required in order
    to add nodes to the cluster, and to regularly log in to the cluster
    management UI.
6.  Click **Next**.

After a short wait, your cluster is created and the cluster management
UI appears.

You can now access any of the management capabilities. To create a
database, refer to [Creating a new
database](/redis-enterprise-documentation/database-configuration/creating-a-new-database)),
or add another node to this cluster, refer to [Joining a new node to a
cluster](/redis-enterprise-documentation/cluster-administration/joining-a-new-node-to-a-cluster).

It is highly advisable to verify that the node is functioning properly,
by carrying out the following tests:

-   Run *rlcheck* on the node. For additional details, refer to [rlcheck
    Installation Verification
    Utility](/redis-enterprise-documentation/references/cli-reference/rlcheck/).
-   Test connectivity to the database. For additional details, refer to
    [Testing Client
    Connectivity](/redis-enterprise-documentation/administering/troubleshooting/testing-client-connectivity/).

Topics

-   [How to Set the Cluster
    Name](/redis-enterprise-documentation/administering/installing-upgrading/configuring/cluster-name-dns-connection-management/)
