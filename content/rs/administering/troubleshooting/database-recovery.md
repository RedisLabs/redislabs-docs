---
Title: Database Recovery
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Cluster recovery is the process to restore an entire Redis Enterprise Software (RS)cluster,
usually due to a complete cluster failure.
To recover the cluster to the state that it was in before the failure,
you must create a new cluster that has the same node configuration, databases, and data as the original cluster.

Cluster recovery requires the cluster configuration backup files and database persistence files
that are created by the cluster.
These files are stored in the [persistence storage location]
({{< relref "/rs/administering/designing-production/persistent-ephemeral-storage.md" >}}).

The cluster recovery process includes:

1. Recover the cluster.
   1. Install RS on the nodes of the new cluster.
   1. Mount to the new nodes the storage that holds the cluster configuration and persistent storage of the original cluster.
   1. Recover the cluster configuration on the first node in the new cluster.
   1. Join the remaining nodes to the new cluster.
1. Recover the databases.
   1. Identify recoverable databases.
   1. Restore the database configurations.
   1. Verify that the databases are active.

## Prerequisites

Before you start cluster recovery, you must:

- Install RS on servers for the new cluster nodes, including:
    - The same number of nodes
    - At least the same memory available on each node
    - The same [RS version]({{< relref "/rs/installing-upgrading/downloading-installing.md" >}})
    - No cluster configuration (Do not setup the cluster nodes)

    The cluster recovery may fail if these requirements are not met.
- Mount the persistent storage drives of the old cluster to the new nodes.
    These drives contain the cluster configuration backup files and
    database persistence files.
    {{% note %}}
Make sure that the user redislabs has permissions to access the storage location
of the configuration and persistence files on each of the nodes.
    {{% /note %}}
- If you use local persistent storage, place all the recovery files on each of the cluster nodes.

{{% note %}}
We recommend that you allocate new persistent storage drives for the new cluster nodes.
If you decide to use the persistent storage drives of the old cluster nodes,
make sure that you backup all files on the old persistent storage drives to another location.
{{% /note %}}

## Recovering the Cluster and Databases

After you install RS on the nodes for the new cluster,
you can run recovery process from the [rladmin]({{< relref "/rs/references/cli-reference/rladmin.md" >}})
command-line interface (CLI).

{{% note %}}
Before you run the recovery process on the machines from the original cluster with Redis processes running on the machine,
make sure to kill all Redis processes.
{{% /note %}}

To recover the cluster:

1. To recover the cluster configuration on the first node of the new cluster, from the rladmin CLI run:

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
    cluster join [ nodes <cluster_member_ip_address> | name <cluster_FQDN> ] \
        username <username> password <password> replace_node <node_id>
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

1. To see which databases are recoverable, run:

    ```src
    $ rladmin recover list
    ```

    The status for each database can be either ready for recovery or missing files.
    An indication of missing files in any of the databases can result from:

    - The recovery path of the nodes not set appropriately
    - Cannot read the persistence files, such as: no permission to read the files, missing files, or corrupted files

    If the the command indicates that there are missing files,
    make sure that the recovery path is set correctly on all of the nodes in the cluster.
    If that does not resolve the issues, [contact Redis Labs Support](mailto:support@redislabs.com).

1. After you recover all of the nodes, you can either recover the databases all at once or specify the database to recover:

    - To recover all of the databases, run: `rladmin recover all`
    - To recover a single databases, run: `rladmin recover db <database_id|name>`

    All databases are recovered with the same configuration they had in the old cluster. The data recovery is carried out from the persistence files located in the persistent storage drives,
    which were mounted to the nodes in the old cluster and are now mounted to the new nodes.

    - If AOF or snapshot is available, the data is restored from the AOF or snapshot. CRDB instances are then synced with the other participating clusters to update with data changed since the AOF or snapshot (fast CRDB sync).

        If AOF or snapshot is available for a CRDB but you want to get all of the data from the other participating clusters (slow CRDB sync), use: recover db only_configuration <db_name>

    - If AOF or snapshot is not available, the database is restored empty. CRDB instances are synced with the other participating clusters (slow CRDB sync).

    {{% note %}}
If the persistence files of the databases from the old cluster are not stored in the persistent storage location of the new node,
you must first map the recovery path of each node to the location of the old persistence files.
To do this, run the `node <id> recovery_path set` command in rladmin.
The persistence files for each database are located in the persistent storage path of the nodes from the old cluster, under the /redis directory.
    {{% /note %}}  

1. To verify that the recovered databases are now active, run: `rladmin status`

After the cluster is recovered, make sure that your redis clients can successfully connect to the cluster.