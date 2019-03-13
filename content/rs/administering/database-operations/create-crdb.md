---
Title: Create a Geo-Replicated Conflict-free Replicated Database (CRDB)
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
[Conflict-Free Replicated Databases]({{< relref "/rs/administering/intercluster-replication/crdbs.md" >}}) (CRDBs) let you create replicated instances of your data between Redis Enterprise Software (RS) clusters.
The participating clusters that host the instances can be in [distributed geographic locations]({{< relref "/rs/concepts/intercluster-replication.md" >}}).
Every instance of a CRDB can receive write operations, and all operations are [synchronized]({{< relref "/rs/concepts/intercluster-replication.md#example-of-synchronization" >}}) to all of the instances.

## Overview of the Steps to Create a CRDB

1. **Create a service account** - On each participating cluster, create a dedicated user account with the Admin role.
1. **Confirm connectivity** - Confirm network connectivity between the participating clusters.
1. **Create CRDB** - Connect to one of your clusters and create a new CRDB.
1. **Add participating clusters** - Add the participating clusters to the CRDB with the user credentials for the service account.
1. **Confirm CRDB Synchronization** - Test writing to one cluster and reading from a different cluster.

## Prerequisites

- Two or more machines with the same version of RS installed
- Network connectivity and cluster FQDN name resolution between all participating clusters
- [Network time service]({{< relref "/rs/administering/intercluster-replication/crdbs.md#network-time-service-ntp-or-chrony" >}}) listener (ntpd) configured and running on each node in all clusters

## Creating a CRDB

1. To create service accounts, on each participating cluster:

    1. In your web browser, open the web UI of the cluster that you want to connect to in order to create the CRDB.
        By default, the address is: `https://<RS_address>:8443`
    1. Go to **settings > team** and click ![Add](/images/rs/icon_add.png#no-click "Add").
    1. Enter the name, email, and password for the user, select the **Admin** role, and click ![Save](/images/rs/icon_save.png#no-click "Save").

1. To make sure that there is network connectivity between the participating clusters,
    telent on port 8080 from each participating cluster to each of the other participating clusters.

    ```src
    $ telnet <target FQDN> 8080
    ```

1. In your web browser, open the web UI of the cluster that you want to connect to in order to create the CRDB.
    By default, the address is: `https://<RS_address>:8443`

    ![new_geo-distrbuted](/images/rs/new_geo-distrbuted.png?width=600&height=608)

1. Go to the 
There are some key differences in the creation process between CRDBs and
standard Redis database creation.

- Intra-cluster Replication is highly recommended for each Participating Cluster in production use. The intercluster replication process, called syncer, is most efficient when it reads from slaves and not masters.
- The eviction policy can only be set to noeviction for CRDBs.
- In [Participating Clusters](#participating-clusters) you must define
    the clusters that will host member CRDBs and the admin user account
    to connect to each cluster.

    Note: Make sure you add the cluster you are currently on as a
    participating cluster.

- In the **Database clustering** option, you can either:
<!-- Also in crdbs.md -->
    - Make sure the Database clustering is enabled and select the number of shards 
    that you want to have in the database. When database clustering is enabled, 
    databases are subject to limitations on [Multi-key commands]({{< relref "/rs/concepts/high-availability/clustering.md" >}}). 
    You can increase the number of shards in the database at any time. 
    - Clear the **Database clustering** option to use only one shard and so 
    that the [Multi-key commands]({{< relref "/rs/concepts/high-availability/clustering.md" >}})
    limitations do not apply.
    
    Note: You cannot enable or disable database clustering after the CRDB is created.

## Participating Clusters

A CRDB is a global database made up of separate databases spanning
multiple clusters, when creating a new CRDB you must configure which
clusters are to host members of the CRDB. On the **Participating
Clusters** list, add two or more clusters using the **+** icon. For each
cluster, use the service account and password created earlier for the
admin account. Make sure to use port 8080 for this configuration, then
click Activate to create your new Conflict-Free Replicated Database.

![crdb-activate](/images/rs/crdb-activate.png)

**Causal Consistency**

Causal Consistency in a CRDB guarantees that the order of operations on a 
specific key is maintained across all CRDB instances. You can enable Causal
Consistency during the CRDB creation process. If you have an existing
CRDB and would like to enable Causal Consistency, use the
REST API or the crdb-cli tool.

**Secure Authentication**

When creating a new CRDB, you can enable TLS for the bi-directional
replication established between all participating clusters. TLS mode for
bidirectional replication is a global setting that applies to all
replication traffic that is between all Participating Clusters. TLS
Authentication is only available as an option at the time of creating
CRDBs. It is not an option that can be updated later. If you have an
existing CRDB and would like to use TLS, you need to create a new CRDB
and migrate your data over.

At creation time, TLS can only be enabled for communications between
Participating Clusters. After creating the CRDB instances on each
Participating Cluster, you can individually enable TLS also for the data
access operations from applications just like regular Redis Enterprise
databases.
Enabling TLS for data access operation is a **local setting** on each
cluster that only impacts the specific CRDB instance you are editing and
is not a global setting for all CRDB instances.

![crdb-tls-config](/images/rs/crdb-tls-config.png "crdb-tls-config")

Once activated, the Redis Enterprise Software cluster will authenticate
and communicate with each of the listed Participating Clusters on your
behalf via Rest API and the service account. RS will create a member
database on each cluster, join it to the CRDB, and start replication.
If you view any Participating Cluster individually, you should see the
new database created as a member of the CRDB.

## Step 4 - Test Read and Write

If you would like to test connectivity and replication, see
the [the CRDB Quick
Start]({{< relref "/rs/getting-started/getting-started-crdbs.md#test-connectivity" >}}).
