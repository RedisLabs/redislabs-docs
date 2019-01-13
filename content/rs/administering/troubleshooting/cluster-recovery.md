---
Title: Cluster Recovery
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Cluster recovery in Redis Enterprise Software (RS) is used for restoring
an entire cluster, usually due to a complete cluster failure. The
recovery process is achieved by creating a new cluster that has the
exact same configuration, databases, and data as the original cluster.

At a high-level, the cluster recovery process consists of the following
steps:

1. Recovering the cluster configuration into the first node in the new
    cluster.
1. Recovering the rest of the nodes by joining nodes to the new cluster
    that replace corresponding nodes in the old cluster.
1. Recovering the databases, and recovering their data if data
    persistence was configured (for additional details, refer to
    [Database
    persistence]({{< relref "/rs/concepts/data-access/persistence.md" >}}).

The cluster recovery process is carried out by using the cluster
configuration backup files and database persistence files that are
created by the cluster. These files are stored in the persistence
storage location (for additional details, refer to [Persistent and
ephemeral
storage]({{< relref "/rs/administering/designing-production/persistent-ephemeral-storage.md" >}}).

Prerequisites:

- You will need the persistent storage drives of the old cluster.
    These drives contain the cluster configuration backup files and
    databases' persistence files.
- You will need servers on which to run the new cluster nodes. You
    will need the same number of nodes as existed in the old cluster.
    Make sure that these nodes contain at least the same space as the nodes
    that you had in the old cluster.
- The new nodes must run the **exact same RS version as was running on
    the old nodes** (for additional details, refer to [Accessing and
    installing the setup
    package]({{< relref "/rs/installing-upgrading/downloading-installing.md" >}}).
    The cluster recovery may fail unless the same RS version is
    installed on the new nodes.
- The persistent storage drives of the old cluster nodes must be
    mounted to the new servers, to make the configuration and
    persistence files available for the recovery process. You must
    make sure that the user redislabs has permissions to access this
    storage location on each of the nodes.

    **Note**: We highly recommended that you allocate new persistent
    storage drives for the new cluster nodes. However, if you decide to
    use the persistent storage drives of the old cluster nodes as the
    persistent storage drives for the new cluster nodes, you are
    strongly advised to back up all files in the old persistent storage
    drives to another location.

## Running the Cluster Recovery Process

The recovery process is carried out from the rladmin command-line
interface (for additional details, refer to [rladmin command-line
interface
(CLI)]({{< relref "/rs/references/cli-reference/rladmin.md" >}}).

### Recovering the cluster configuration into the first node

From the rladmin CLI prompt, run the cluster recover command to create
the new cluster based on the old cluster configuration. Note that this
command is available in rladmin only if the node has not been configured
yet.

The command has the following parameters:

1. filename - mandatory. The path of the old cluster configuration
    file. The file name is ccs-redis.rdb, and it is located in the /ccs
    directory of the persistent storage drive of the old cluster. This
    file exists on the persistent storage drive of all nodes and
    contains the same exact data, so it does not matter which old node's
    persistence storage you choose to use the file from.
1. persistent_path - optional. The location of the persistent storage
    in the new node (for additional details, refer to [Persistent and
    ephemeral
    storage]({{< relref "/rs/administering/designing-production/persistent-ephemeral-storage.md" >}}).
1. ephemeral_path - optional. The location of the ephemeral storage
    in the new node (for additional details, refer to [Persistent and
    ephemeral
    storage]({{< relref "/rs/administering/designing-production/persistent-ephemeral-storage.md" >}}).
1. rack_id - optional. If rack-zone awareness was enabled in the
    cluster (for additional details, refer to [Rack-zone
    awareness]({{< relref "/rs/concepts/high-availability/rack-zone-awareness.md" >}}),
    you can use this parameter to override the rack ID value that was
    set for the node with ID 1, with a new rack ID. Otherwise, the node
    will get the same rack ID as the original node.

Once the command execution is complete, this node will replace the node
with ID 1 from the old cluster.

You can run the rladmin status command to verify that the cluster was
created based on the old cluster configuration, and all other nodes and
databases are pending recovery.

### Recovering the other nodes

For each of the other servers that are going to act as RS nodes, run the
cluster join command from the rladmin CLI prompt in order to join the
node to the recovered cluster, and specify which of the nodes in the old
cluster this node is going to replace. The command has the following
parameters:

1. name - mandatory. The name of the cluster this node is joining (for
    additional details, refer to [How to set the cluster
    name]({{< relref "/rs/installing-upgrading/configuring/cluster-name-dns-connection-management/_index.md" >}})
    (FQDN)). Alternatively, the nodes parameter can be used.
1. nodes - mandatory. The IP address of a node in the cluster this
    node is joining. Alternatively, the name parameter can be used.
1. username - mandatory. The email address of the cluster
    administrator that was set when the cluster was created.
1. password - mandatory. The password of the cluster administrator
    that was set when the cluster was created.
1. replace_node - mandatory. The ID of the node in the old cluster
    which this node is going to replace.
1. persistent_path - optional. The location of the persistent storage
    in the new node (for additional details, refer to [Persistent and
    ephemeral
    storage]({{< relref "/rs/administering/designing-production/persistent-ephemeral-storage.md" >}}).
1. ephemeral_path - optional. The location of the ephemeral storage
    in the new node (for additional details, refer to [Persistent and
    ephemeral
    storage]({{< relref "/rs/administering/designing-production/persistent-ephemeral-storage.md" >}}).
1. rack_id - optional. If rack-zone awareness was enabled in the
    cluster (for additional details, refer to [Rack-zone
    awareness]({{< relref "/rs/concepts/high-availability/rack-zone-awareness.md" >}}),
    use this parameter to set the rack ID to be the same as the rack ID
    of the old node. You can also change the value of the rack ID by
    providing a different value and using the override_rack_id flag.

Repeat these steps to replace all of the nodes in the old cluster.

You can run the rladmin status command to verify that the recovered
nodes are now active, and the databases are pending recovery.

**Note**: Remember to update the DNS records with the new nodes' IP
addresses. For additional details, refer to
[DNS]({{< relref "/rs/installing-upgrading/configuring/cluster-name-dns-connection-management/_index.md" >}}).

### Recovering the databases

After recovering all of the nodes in the cluster you can now recover the
databases. Databases that did not have persistence configured are
recovered with the same configuration they had in the old cluster, but
will not contain any data. Databases that had persistence configured are
recovered with the same configuration they had in the old cluster, and
their entire data intact. The data recovery is carried out from the
persistence files located in the persistent storage drives, which were
mounted to the nodes in the old cluster and are now mounted to the new
nodes.

By default, the database recovery process looks for the database
persistence files in the persistence storage location configured for the
node. If the persistence files of the databases from the old cluster are
not stored in the new node's persistence storage location (which is
recommended for the recovery process), you must first map the recovery
path of each node to the location of the old persistence files. To do
so, run the node \<id\> recovery_path set command in rladmin. The
persistence files for each database are located in the persistent
storage path of the nodes from the old cluster, under the /redis
directory.

You can view which databases are recoverable by running:

```src
$ rladmin recovery list
```

The status for each database can be either ready for recovery or missing
files. An indication of missing files in any of the databases may result
from either of the following:

- The recovery path of the nodes has not been set appropriately
- There is some issue with the persistence files (for example: lack of
    permissions to read the files, missing files, or corrupted files)

First, make sure that the recovery path is set correctly on all of the
nodes in the cluster. If that does not resolve the issues, [contact our
support team](mailto:support@redislabs.com).

To recover all of the databases, run the rladmin command recover all.

You can also recover the databases one by one, by using the rladmin
command recover db \<id \| name\>.

After recovering the databases, you can run the rladmin status command
to verify that the recovered databases are now active.

**Note**: If you are running the recovery process on the same machines
that were used for the original cluster and there are still Redis
processes running on the machine the database recovery process will
fail. Make sure to kill all Redis processes before attempting to run the
recovery process.
