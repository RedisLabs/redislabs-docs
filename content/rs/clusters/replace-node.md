---
Title: Replace a cluster node
linkTitle: Replace node
description: Replace a node in your cluster that is down. 
weight: 90
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/cluster-administration/replacing-a-faulty-node,
    /rs/administering/cluster-operations/replacing-node.md,
    /rs/administering/cluster-operations/replacing-node/,
    /rs/clusters/replace-node.md,
    /rs/clusters/replace-node/,
]
---
A failed node will appear as `Down` (![Node down indicator](/images/rs/icons/node-down-icon.png)) in the **Nodes** list.

To replace a failed node: 

1. Acquire a new node identical to the old one.

1.  Install and
    configure Redis Enterprise Software on the node. See [Install and setup]({{< relref "/rs/installing-upgrading" >}}) for more information.

    {{< note >}}
If you are using [Auto Tiering]({{< relref "/rs/databases/auto-tiering/" >}}), make sure the required flash storage is set up on this new node.
    {{< /note >}}

1. [Add the node]({{< relref "/rs/clusters/add-node" >}}) to the cluster. Make sure the new node has as much available memory as the faulty
    node.

    If the new node does not have enough memory, you will be prompted to add a node with enough memory.

1. A message will appear informing you that the cluster has a faulty node
    and that the new node will replace the faulty node.

    {{< note >}}
- If there is a faulty node in the cluster to which you are adding a node, Redis Enterprise Software will use the new node to replace the faulty one.
- Any existing [DNS records]({{< relref "/rs/networking/cluster-dns" >}}) must be updated
each time a node is added or replaced.
    {{< /note >}}
