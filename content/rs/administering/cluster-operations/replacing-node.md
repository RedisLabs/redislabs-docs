---
Title: Replacing a node
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
If a node in your cluster is faulty, its status appears as **Down **in
the **Status** column of the **Nodes** page, and in the **Cluster \>
Configuration** page.

![Example of a node
failure](/images/rs/node-failure.png?width=600&height=152)

**To replace a faulty node**:

1. Acquire a new node that is identical to the old node, install and
    configure Redis Enterprise Software on it per the [install
    instructions]({{< relref "/rs/installing-upgrading/_index.md" >}}).

    Note: If you are using [Redis on
    Flash]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}}), you must
    make sure the required flash storage is set up on this new node.

1. Add a new node, as described in [adding a new node to a
    cluster]({{< relref "/rs/administering/cluster-operations/adding-node.md" >}}).
1. Make sure the new node has as much available memory as the faulty
    node.
1. A message appears, informing you that the cluster has a faulty node
    and that the new node replaces the faulty node.
1. If the new node has insufficient memory, you are prompted to add a
    different node - one with sufficient memory.

**Note**: If there is a faulty node in the cluster to which you are
adding a node, RS enforces using the new node to replace the faulty
one.

**Note**: If you are using the DNS NS record based connection approach,
the DNS records must be updated each time a node is added or replaced.
For additional details, For more information, refer to the [connection
management
page]({{< relref "/rs/installing-upgrading/configuring/cluster-name-dns-connection-management/_index.md" >}}).
