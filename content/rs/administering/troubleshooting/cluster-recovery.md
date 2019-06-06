---
<<<<<<< HEAD
Title: Cluster Recovery
description:
=======
Title: Recovering a Failed Cluster
description: 
>>>>>>> Finish draft
weight: $weight
alwaysopen: false
categories: ["RS"]
---
When a cluster fails,
you must recover the database with its previous cluster configuration, databases and data.
To recover the cluster to the state that it was in before the failure,
you must create a new cluster that has the same node configuration as the original cluster.

Cluster recovery requires the cluster configuration backup files and database persistence files
that are created by the cluster.
These files are stored in the [persistence storage location]
({{< relref "/rs/administering/designing-production/persistent-ephemeral-storage.md" >}}).

The cluster recovery process includes:

1. Install RS on the nodes of the new cluster.
1. Mount to the new nodes the storage that holds the cluster configuration and persistent storage of the original cluster.
1. Recover the cluster configuration on the first node in the new cluster.
1. Join the remaining nodes to the new cluster.
1. [Recover the databases]({{< relref "/rs/administering/troubleshooting/database-recovery.md" >}}).

## Prerequisites

- Before you run the recovery process on the machines from the original cluster with Redis processes running on the machine,
make sure to kill all Redis processes.
{{% /note %}}

- We recommend that you allocate new persistent storage drives for the new cluster nodes.
If you decide to use the persistent storage drives of the old cluster nodes,
make sure that you backup all files on the old persistent storage drives to another location.

## Recovering the Cluster

1. Install [RS]({{< relref "/rs/installing-upgrading/downloading-installing.md" >}}) on the servers
    for the new cluster nodes. Do not configure the cluster, also called cluster setup.

    The new servers must have the same basic hardware and software configuration as the original servers, including:

    - The same number of nodes
    - At least the same memory available on each node
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

1. To recover the cluster with the configuration from the original cluster,
    from the [rladmin]({{< relref "/rs/references/cli-reference/rladmin.md" >}}) command-line interface (CLI):

    ```src
    cluster recover filename [ <persistent_path> | <ephemeral_path> ]<filename> node_uid <node_uid> rack_id <rack_id>
    ```

    {{% expand "Command syntax" %}}
`<filename>` - The full path of the old cluster configuration file in the persistent storage.
The cluster configuration file is /css/ccs-redis.rdb.
The file exists on the persistent storage drive of all nodes and all copies are identical.

`<node_uid>` - The id of the node, in this case `1`.

`<persistent_path>` (optional) - The location of the [persistent storage ]
({{< relref "/rs/administering/designing-production/persistent-ephemeral-storage.md" >}})
in the new node.

`<ephemeral_path>` (optional) - The location of the [ephemeral storage]
({{< relref "/rs/administering/designing-production/persistent-ephemeral-storage.md" >}})
in the new node.

`<rack_id>` - optional. If [rack-zone awareness]({{< relref "/rs/concepts/high-availability/rack-zone-awareness.md" >}})
was enabled in the cluster,
you can use this parameter to override the rack ID value that was
set for the node with ID 1, with a new rack ID. Otherwise, the node
will get the same rack ID as the original node.
    {{% /expand %}}

    For example:

    ```src
    rladmin cluster recover filename /tmp/persist/ccs/ccs-redis.rdb node_uid 1 rack_id 5
    ```

    When the recovery succeeds,
    this node is configured as the node with ID 1 from the old cluster.

1. To join the remaining servers to the recovered cluster, from the rladmin CLI of each new node run:

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
