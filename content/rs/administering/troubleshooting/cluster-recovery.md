---
Title: Recovering a Failed Cluster
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
When a cluster fails,
you must use the cluster configuration file and database data to recover the cluster.

Cluster failure is caused by:

- A hardware or software failure causes the cluster to be unresponsive to client requests or administrative actions.
- More than half of the cluster nodes lose connection with the cluster, resulting in quorum loss.

Cluster recovery requires you to restore the cluster configuration (ccs-redis.rdb) and database persistence files
to a new cluster.
These files are stored in the [persistent storage location]
({{< relref "/rs/administering/designing-production/persistent-ephemeral-storage.md" >}}).

The cluster recovery process includes:

1. Install RS on the nodes of the new cluster.
1. Mount the persistent storage from the original cluster to the new nodes of the new cluster.
1. Recover the cluster configuration on the first node in the new cluster.
1. Join the remaining nodes to the new cluster.
1. [Recover the databases]({{< relref "/rs/administering/troubleshooting/database-recovery.md" >}}).

## Prerequisites

- We recommend that you recover the cluster to clean nodes.
    If you use the original nodes,
    make sure there are no Redis processes running on any nodes in the new cluster.
- We recommend that you use clean the persistent storage drives for the new cluster.
    If you use the original storage drives,
    make sure that you backup the files on the original storage drives to a safe location.

## Recovering the Cluster

1. (Optional) If you want to recover the cluster to the original cluster nodes, uninstall RS from the nodes.

1. Install [RS]({{< relref "/rs/installing-upgrading/downloading-installing.md" >}}) on the new cluster nodes.
   Do not configure the cluster nodes (`rladmin cluster create` in the CLI or **Setup** in the Web UI).

    The new servers must have the same basic hardware and software configuration as the original servers, including:

    - The same number of nodes
    - At least the same amount of memory
    - The same RS version

    {{% note %}}
The cluster recovery can fail if these requirements are not met.
    {{% /note %}}

1. Mount the persistent storage drives of the old cluster to the new nodes.
    These drives contain the cluster configuration backup files and
    database persistence files.

    {{% note %}}
Make sure that the user redislabs has permissions to access the storage location
of the configuration and persistence files on each of the nodes.
    {{% /note %}}

    If you use local persistent storage, place all the recovery files on each of the cluster nodes.

1. To recover the cluster configuration from the original cluster to the first node in the new cluster,
    from the [rladmin]({{< relref "/rs/references/cli-reference/rladmin.md" >}}) command-line interface (CLI):

    ```src
    cluster recover filename [ <persistent_path> | <ephemeral_path> ]<filename> node_uid <node_uid> rack_id <rack_id>
    ```

    {{% expand "Command syntax" %}}
`<filename>` - The full path of the old cluster configuration file in the persistent storage.
The cluster configuration file is /css/ccs-redis.rdb.
The file is located on the persistent storage drive for each node in the original cluster and all copies are identical.

`<node_uid>` - The id of the node, in this case `1`.

`<persistent_path>` (optional) - The location of the [persistent storage ]
({{< relref "/rs/administering/designing-production/persistent-ephemeral-storage.md" >}})
in the new node.

`<ephemeral_path>` (optional) - The location of the [ephemeral storage]
({{< relref "/rs/administering/designing-production/persistent-ephemeral-storage.md" >}})
in the new node.

`<rack_id>` (optional) - If [rack-zone awareness]({{< relref "/rs/concepts/high-availability/rack-zone-awareness.md" >}})
was enabled in the cluster,
you can use this parameter to override the rack ID value that was
set for the node with ID 1, with a new rack ID. Otherwise, the node
will get the same rack ID as the original node.
    {{% /expand %}}

    For example:

    ```src
    rladmin cluster recover filename /tmp/persist/ccs/ccs-redis.rdb node_uid 1 rack_id 5
    ```

    When the recovery command succeeds,
    this node is configured as the node from the old cluster that has ID 1.

1. To join the remaining servers to the new cluster, from the rladmin CLI of each new node run:

    ```src
    cluster join [ nodes <cluster_member_ip_address> | name <cluster_FQDN> ] username <username> password <password> replace_node <node_id>
    ```

    {{% expand "Command syntax" %}}
`nodes` - The IP address of a node in the cluster that this node is joining.

`name` - The [FQDN name]({{< relref "/rs/installing-upgrading/configuring/cluster-name-dns-connection-management/_index.md" >}})
of the cluster this node is joining.

`username` - The email address of the cluster administrator.

`password` - The password of the cluster administrator.

`replace_node` - The ID of the node that this node replaces from the old cluster.

`persistent_path` (optional) - The location of the [persistent storage]
({{< relref "/rs/administering/designing-production/persistent-ephemeral-storage.md" >}})
in the new node.

`ephemeral_path` (optional) - The location of the [ephemeral storage]
({{< relref "/rs/administering/designing-production/persistent-ephemeral-storage.md" >}})
in the new node.

`rack_id` (optional) - If [rack-zone awareness]
({{< relref "/rs/concepts/high-availability/rack-zone-awareness.md" >}}) was enabled in the cluster,
use this parameter to set the rack ID to be the same as the rack ID
of the old node. You can also change the value of the rack ID by
providing a different value and using the override_rack_id flag.
    {{% /expand %}}

    For example:

    ```src
    rladmin cluster join nodes 10.142.0.4 username admin@example.com password mysecret replace_node 2
    ```

    You can run the `rladmin status` command to verify that the recovered nodes are now active,
    and that the databases are pending recovery.

    {{% note %}}
Make sure that you update your [DNS records]({{< relref "/rs/installing-upgrading/configuring/cluster-name-dns-connection-management/_index.md" >}})
with the IP addresses of the new nodes.
    {{% /note %}}

After the cluster is recovered, you must [recover the databases]({{< relref "/rs/administering/troubleshooting/database-recovery.md" >}}).
