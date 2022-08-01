---
Title: Create an Active-Active geo-replicated database
linkTitle: Create Active-Active 
description: How to create an Active-Active database and things to consider when setting it up.
weight: 25
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/administering/database-operations/create-crdb/,
    /rs/administering/database-operations/create-active-active/,
    /rs/databases/active-active/create-active-active.md,
    /rs/databases/active-active/create-active-active/,

]
---
[Active-Active geo-replicated databases]({{< relref "/rs/databases/active-active/_index.md" >}}) (formerly known as CRDBs) give applications write access
to replicas of the dataset in different geographical locations.

The participating Redis Enterprise Software clusters that host the instances can be in [distributed geographic locations]({{< relref "/rs/databases/active-active/" >}}).
Every instance of an Active-Active database can receive write operations, and all operations are [synchronized]({{< relref "/rs/databases/active-active/#example-of-synchronization" >}}) to all of the instances without conflict.

## Steps to create an Active-Active database

1. **Create a service account** - On each participating cluster, create a dedicated user account with the Admin role.
1. **Confirm connectivity** - Confirm network connectivity between the participating clusters.
1. **Create Active-Active database** - Connect to one of your clusters and create a new Active-Active database.
1. **Add participating clusters** - Add the participating clusters to the Active-Active database with the user credentials for the service account.
1. **Verify creation** - Log in to each of the participating clusters and verify your Active-Active database was created on them.
1. **Confirm Active-Active database synchronization** - Test writing to one cluster and reading from a different cluster.

## Prerequisites

- Two or more machines with the same version of RS installed
- Network connectivity and cluster FQDN name resolution between all participating clusters
- [Network time service]({{< relref "/rs/databases/active-active#network-time-service-ntp-or-chrony" >}}) listener (ntpd) configured and running on each node in all clusters

## Create an Active-Active database

1. To create service accounts, on each participating cluster:

    1. In your web browser, open the admin console of the cluster that you want to connect to in order to create the Active-Active database.
        By default, the address is: `https://<RS_address>:8443`
    1. Go to **settings > team** and click ![Add](/images/rs/icon_add.png#no-click "Add").
    1. Enter the name, email, and password for the user, select the **Admin** role, and click ![Save](/images/rs/icon_save.png#no-click "Save").

    ![Service Account Creation](/images/rs/create-service-account.png)

1. To make sure that there is network connectivity between the participating clusters,
    telnet on port 9443 from each participating cluster to each of the other participating clusters.

    ```sh
    telnet <target FQDN> 9443
    ```

1. In your web browser, open the admin console of the cluster that you want to connect to in order to create the Active-Active database.
    By default, the address is: `https://<RS_address>:8443`

1. In **databases**, click ![Add](/images/rs/icon_add.png#no-click "Add").

    If you do not have any databases on the node, you are prompted to create a database.

1. In the **Deployment** box, select **Geo-Distributed** and click **Next** to create an Active-Active database on RAM.

    If your cluster supports [Redis on Flash]({{< relref "/rs/concepts/memory-performance/redis-flash.md" >}}),
    in **Runs on** you can select **Flash** so that your database uses Flash memory. We recommend that you use AOF every 1 sec
    for the best performance during the initial Active-Active database sync of a new replica.

    ![new_geo-distributed](/images/rs/new_geo-distrbuted.png)

1. Enter the name of the new Active-Active database and select from the options:

    {{< note >}}

- You cannot enable or disable database clustering after the Active-Active database is created.

    {{< /note >}}

    - [**Replication**]({{< relref "/rs/databases/configure/replication.md" >}}) - We recommend that all Active-Active database use replication for best intercluster synchronization performance.
        When replication is enabled, every Active-Active database master shard is replicated to a corresponding replica shard. The replica shards are then used to synchronize data between the instances, and the master shards are dedicated to handling client requests.
        We also recommend that you enable [replica HA]({{< relref "/rs/databases/configure/replica-ha.md" >}}) to ensure that the replica shards are highly-available for this synchronization.

    - [**Data persistence**]({{< relref "/rs/databases/configure/database-persistence.md" >}}) -
        To protect against loss of data stored in RAM,
        you can enable data persistence and select to store a copy of the data on disk with snapshots or Append Only File (AOF).
        AOF provides the fastest and most reliable method for instance failure recovery.

    - **Default database access** - When you configure a password for your database,
        all connections to the database must authenticate with the [AUTH command](https://redis.io/commands/auth).
        If you also configure an access control list, connections can specify other users for authentication,
        and requests are allowed according to the Redis ACLs specified for that user.

1. Configure the {{< field "db_type" >}} advanced options that you want for the database:

    - **Access Control List** - You can specify the [user roles]({{<relref "/rs/security/access-control/create-roles">}}) that have access to the database
        and the [Redis ACLs]({{<relref "/rs/security/access-control/configure-acl">}}) that apply to those connections.
        You can only configure access control after the Active-Active database is created.

        To define an access control list:

        1. In the Access control list section of the database configuration, click ![Add](/images/rs/icon_add.png#no-click "Add").
        1. Select the [role]({{<relref "/rs/security/access-control/create-roles">}}) that you want to have access to the database.
        1. Select the [ACL]({{<relref "/rs/security/access-control/configure-acl">}}) that you want the role to have in the database.
        1. Click **Save** to save the ACL.
        1. Click **Update** to save the changes to the database.

    - **Endpoint port number** (Required) - The port in the range 10000-19999 that clients must use to connect to the Active-Active database.

    - In the **Database clustering** option, you can either:

        - Make sure the Database clustering is enabled and select the number of shards
        that you want to have in the database. When database clustering is enabled,
        databases are subject to limitations on [Multi-key commands]({{< relref "/rs/databases/configure/clustering.md" >}}).
        You can increase the number of shards in the database at any time.
        - Clear the **Database clustering** option to use only one shard so that you
        can use [Multi-key commands]({{< relref "/rs/databases/configure/clustering.md" >}})
        without the limitations.

    - [**OSS Cluster API**]({{< relref "/rs/databases/configure/enable-oss-cluster-api.md" >}}) - {{< embed-md "oss-cluster-api-intro.md"  >}}

    - **Eviction policy** - The eviction policy for Active-Active databases is `noeviction`.

    - **Participating Clusters** - You must specify the URL of the clusters that you want to
        host instances of an Active-Active database and the admin user account to connect to each cluster.
        1. In the **Participating Clusters** list, click ![Add](/images/rs/icon_add.png#no-click "Add") to add clusters.
        1. For each cluster, enter the URL for the cluster (`https://<cluster_fqdn>:9443`),
            enter the credentials (email address and password) for the service account that you created, and click ![Save](/images/rs/icon_save.png#no-click "Save").

    - **[Causal Consistency]({{< relref "/rs/databases/active-active/causal-consistency-crdb.md" >}})** -
        Causal Consistency in an Active-Active database guarantees that the order of operations
        on a specific key is maintained across all instances of an Active-Active database.
        To enable Causal Consistency for an existing Active-Active database, use the REST API.

    - **TLS** - If you enable TLS when you create the Active-Active database,
        the nodes use the TLS mode **Require TLS for CRDB communication only**
        to require TLS authentication and encryption for communications between participating clusters.
        After you create the Active-Active database, you can set the TLS mode to **Require TLS for all communications**
        so that client communication from applications are also authenticated and encryption.

<!-- Also in getting-started-crdbs.md -->
## Test the connection to your member Redis Active-Active databases

With the Redis database created, you are ready to connect to your database. See [Connect to Active-Active databases]({{<relref "/rs/databases/active-active/connect-to-aa-db.md">}}) for tutorials and examples of multiple connection methods.