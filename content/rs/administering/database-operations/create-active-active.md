---
Title: Create an Active-Active Geo-Replicated Database (CRDB)
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/database-operations/create-crdb/
---
[Active-Active replicated databases]({{< relref "/rs/administering/active-active.md" >}}) (also known as CRDBs) give applications write access
to replicas of the data set in different geographical locations.

The participating clusters that host the instances can be in [distributed geographic locations]({{< relref "/rs/concepts/intercluster-replication.md" >}}).
Every instance of a CRDB can receive write operations, and all operations are [synchronized]({{< relref "/rs/concepts/intercluster-replication.md#example-of-synchronization" >}}) conflict-free to all of the instances.

## Steps to Create an Active-Active Database

1. **Create a service account** - On each participating cluster, create a dedicated user account with the Admin role.
1. **Confirm connectivity** - Confirm network connectivity between the participating clusters.
1. **Create CRDB** - Connect to one of your clusters and create a new CRDB.
1. **Add participating clusters** - Add the participating clusters to the CRDB with the user credentials for the service account.
1. **Confirm CRDB Synchronization** - Test writing to one cluster and reading from a different cluster.

## Prerequisites

- Two or more machines with the same version of RS installed
- Network connectivity and cluster FQDN name resolution between all participating clusters
- [Network time service]({{< relref "/rs/administering/active-active.md#network-time-service-ntp-or-chrony" >}}) listener (ntpd) configured and running on each node in all clusters

## Creating a CRDB

1. To create service accounts, on each participating cluster:

    1. In your web browser, open the web UI of the cluster that you want to connect to in order to create the CRDB.
        By default, the address is: `https://<RS_address>:8443`
    1. Go to **settings > team** and click ![Add](/images/rs/icon_add.png#no-click "Add").
    1. Enter the name, email, and password for the user, select the **Admin** role, and click ![Save](/images/rs/icon_save.png#no-click "Save").

    ![Service Account Creation](/images/rs/create-service-account.png)

1. To make sure that there is network connectivity between the participating clusters,
    telnet on port 9443 from each participating cluster to each of the other participating clusters.

    ```src
    telnet <target FQDN> 9443
    ```

1. In your web browser, open the web UI of the cluster that you want to connect to in order to create the CRDB.
    By default, the address is: `https://<RS_address>:8443`

1. In **databases**, click ![Add](/images/rs/icon_add.png#no-click "Add").

    If you do not have any databases on the node, you are prompted to create a database.

1. In the **Deployment** box, select **Geo-Distributed** and click **Next** to create a CRDB on RAM.

    If your cluster supports [Redis on Flash]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}}),
    in **Runs on** you can select **Flash** so that your database uses Flash memory. We recommend that you use AOF every 1 sec
    for the best performance during the initial CRDB sync of a new replica.

    ![new_geo-distributed](/images/rs/new_geo-distrbuted.png?width=600&height=608)

1. Enter the name of the new CRDB and select from the options:

    {{% note %}}

- The eviction policy can only be set to **noeviction** for CRDBs.
- You cannot enable or disable database clustering after the CRDB is created.

    {{% /note %}}

    - [**Replication**]({{< relref "/rs/concepts/high-availability/replication.md" >}}) - We recommend that all CRDB databases use replication for best intercluster synchronization performance.
        When replication is enabled, every CRDB master shard is replicated to a corresponding slave shard. The slave shards are then used to synchronize data between the instances, and the master shards are dedicated to handling client requests.
        We also recommend that you enable [slave HA]({{< relref "/rs/administering/database-operations/slave-ha.md" >}}) to ensure that the slave shards are highly-available for this synchronization.

    - [**Data persistence**]({{< relref "/rs/concepts/data-access/persistence.md" >}}) -
        To protect against loss of data stored in RAM,
        you can enable data persistence and select to store a copy of the data on disk with snapshots or Append Only File (AOF).
        AOF provides the fastest and most reliable method for instance failure recovery.

    - **Default database access** - When you configure a password for your database,
        all connections to the database must authenticate with the [AUTH command](https://redis.io/commands/auth).
        If you also configure an access control list, connections can specify other users for authentication,
        and requests are allowed according to the Redis ACLs specified for that user.

1. Configure the {{< field "db_type" >}} advanced options that you want for the database:

    - **Access Control List** - You can specify the [user roles]({{< relref "/rs/administering/access-control/user-roles.md" >}}) that have access to the database
        and the [Redis ACLs]({{< relref "/rs/administering/access-control/user-roles.md#database-access-control" >}}) that apply to those connections.
        You can only configure access control after the Active-Active database is created.

        To define an access control list:

        1. In the Access control list section of the database configuration, click ![Add](/images/rs/icon_add.png#no-click "Add").
        1. Select the [role]({{ relref "/rs/administering/access-control/user-roles.md" }}) that you want to have access to the database.
        1. Select the [ACL]({{ relref "/rs/administering/access-control/user-roles.md#database-access-control" }}) that you want the role to have in the database.
        1. Click **Save** to save the ACL.
        1. Click **Update** to save the changes to the database.

    - **Endpoint port number** (Required) - The port in the range 10000-19999 that clients must use to connect to the CRDB.

    - In the **Database clustering** option, you can either:
<!-- Also in crdbs.md -->
        - Make sure the Database clustering is enabled and select the number of shards
        that you want to have in the database. When database clustering is enabled,
        databases are subject to limitations on [Multi-key commands]({{< relref "/rs/concepts/high-availability/clustering.md" >}}).
        You can increase the number of shards in the database at any time.
        - Clear the **Database clustering** option to use only one shard so that you
        can use [Multi-key commands]({{< relref "/rs/concepts/high-availability/clustering.md" >}})
        without the limitations.

    - **Eviction policy** - The eviction policy for CRDBs is `noeviction`.

    - **Participating Clusters** - You must specify the URL of the clusters that you want to
        host CRDB instances and the admin user account to connect to each cluster.
        1. In the **Participating Clusters** list, click ![Add](/images/rs/icon_add.png#no-click "Add") to add clusters.
        1. For each cluster, enter the URL for the cluster (`https://<cluster_fqdn_or_ip_address>:9443`),
            enter the credentials (email address and password) for the service account that you created, and click ![Save](/images/rs/icon_save.png#no-click "Save").

    - **Causal Consistency** - Causal Consistency in a CRDB guarantees that the order of operations on a
        specific key is maintained across all CRDB instances. To enable Causal Consistency for an existing
        CRDB, use the REST API.

    - **TLS** - You can enable TLS for communications between
        Participating Clusters. After you create the CRDB, you can enable SSL for the data
        access operations from applications just like regular Redis Enterprise databases.

        SSL for data access operations is a local setting on each
        cluster that only impacts the specific CRDB instance you are editing and
        does not apply automatically to all CRDB instances.

<!-- Also in getting-started-crdbs.md -->
## Test the Connection to your Member Redis CRDBs

With the Redis database created, you are ready to connect to your
database to store data. You can use one of the following ways to test
connectivity to your database:

- Connect with redis-cli, the built-in command-line tool
- Connect with a _Hello World_ application written in Python

Remember we have two member CRDBs that are available for connections and
concurrent reads and writes. The member CRDBs are using bi-directional
replication to for the global CRDB.

![crdb-diagram](/images/rs/crdb-diagram.png)

### Connecting Using redis-cli {#connecting-using-rediscli}

redis-cli is a simple command-line tool to interact with redis database.

1. To use redis-cli on port 12000 from the node 1 terminal, run:

    ```src
    redis-cli -p 12000
    ```

1. Store and retrieve a key in the database to test the connection with these
    commands:

    - `set key1 123`
    - `get key1`

    The output of the command looks like this:

    ```src
    127.0.0.1:12000> set key1 123
    OK
    127.0.0.1:12000> get key1
    "123"
    ```

1. Enter the terminal of node 1 in cluster 2, run the redis-cli, and
   retrieve key1.

    The output of the commands looks like this:

    ```src
    $ redis-cli -p 12000
    127.0.0.1:12000> get key1
    "123"
    ```

### Connecting Using _Hello World_ Application in Python

A simple python application running on the host machine can also connect
to the database.

Note: Before you continue, you must have python and
[redis-py](https://github.com/andymccurdy/redis-py#installation)
(python library for connecting to Redis) configured on the host machine
running the container.

1. In the command-line terminal, create a new file called "redis_test.py"

    ```src
    vi redis_test.py
    ```

1. Paste this code into the "redis_test.py" file.

    This application stores a value in key1 in cluster 1, gets that value from
    key1 in cluster 1, and gets the value from key1 in cluster 2.

    ```py
    import redis

    rp1 = redis.StrictRedis(host='localhost', port=12000, db=0)
    rp2 = redis.StrictRedis(host='localhost', port=12002, db=0)

    print ("set key1 123 in cluster 1")
    print (rp1.set('key1', '123'))
    print ("get key1 cluster 1")
    print (rp1.get('key1'))

    print ("get key1 from cluster 2")
    print (rp2.get('key1'))
    ```

1. To run the "redis_test.py" application, run:

    ```src
    python redis_test.py
    ```

    If the connection is successful, the output of the application looks like:

    ```src
    set key1 123 in cluster 1
    True
    get key1 cluster 1
    b'123'
    get key1 from cluster 2
    b'123'
    ```
