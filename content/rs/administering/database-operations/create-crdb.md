---
Title: Create a Geo-Replicated Conflict-free Replicated Database (CRDB)
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
CRDBs span multiple Redis Enterprise Software (RS) clusters. Overview of
the steps to create a CRDB:

1. Create a service account on each cluster as an admin.
1. Confirm network is setup.
1. Connect to one of your clusters and configure a new CRDB.
1. Test writing to one cluster and reading from a different cluster.

## Prerequisites

- Two or more machines with the same version of RS installed
- Networking and cluster FQDN name resolution between all clusters
- [Network time service]({{< relref "/rs/administering/intercluster-replication/crdbs.md#network-time-service-ntp-or-chrony" >}}) listener (ntpd) configured and running on each node in all clusters

## Step 1 - Create a Service Account

A local account with the Admin role is highly recommended on each
cluster that will host a CRDB. While you could use a user account, it is
recommended to have a separate admin account (known as a "service
account") that will only used by the clusters to connect between
clusters when orchestration is necessary. To do this, go to **settings
-\> team** and click the plus icon on the lower left to add an account.

![Service Account
Creation](/images/rs/image8.png?width=1000&height=490)

This service account will be used when the CRDB is created, but also on
an ongoing basis by the clusters to help manage the CRDB.

## Step 2 - Confirm network is setup

The CRDB creation process assumes the required secured network
configurations are in place. If you have not already done so, please see
Network Configurations. If the configurations are set up, let's confirm
the connectivity we need. First, we need to check that the necessary
ports are open from each cluster node to the proxy and admin ports on
the other clusters that are to host the CRDB. This test should be done
from every node in each Participating Cluster to each node in the other
Participating Clusters.

```src
$ telnet <target FQDN> 8080
```

## Step 3 - Create a CRDB

Direct your browser to the web UI of one of the RS clusters that will
host the CRDB. Under the databases tab, choose the Redis database with
Deployment type set to Geo-Distributed.

![new_geo-distrbuted](/images/rs/new_geo-distrbuted.png?width=600&height=608)

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
