---
Title: Creating a Redis Enterprise Software (RS) database
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
db_type: database
---
You can create Redis databases that are sharded and distributed across a single RS cluster.
These databases can use Redis Enterprise features like:

1. [Redis on Flash]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}})
1. [High availability]({{< relref "/rs/concepts/high-availability/_index.md" >}})
1. [Data persistence]({{< relref "/rs/concepts/data-access/persistence.md" >}})
1. [Redis modules]({{< relref "/rs/developing/modules/_index.md" >}})

You can create databases according to the number of shards in your subscription and the memory available on the machine.

{{% note %}}
To create databases that are designed to be hosted in distributed locations,
see [Creating CRDBs]({{< relref "/rs/administering/database-operations/create-crdb.md" >}}).
{{% /note %}}

## Creating a New Redis Database

To create a new database:

1. In your web browser, open the web UI of the cluster that you want to connect to in order to create the {{< field "db_type" >}}.

    By default, the address is: `https://<RS_address>:8443`

1. In **databases**, click ![Add](/images/rs/icon_add.png#no-click "Add").

    If you do not have any databases on the node, you are prompted to create a database.

<!-- {{< embed-md "create-db.md" >}} -->

1. Click **Next** to create a single-region deployment.

    ![new_databases](/images/rs/new_databases.png)

1. Enter the mandatory details of the new {{< field "db_type" >}}:

    - **Name** - The {{< field "db_type" >}} name requirements are:

        - Maximum of 63 characters
        - Only letter, number or hyphen (-) characters
        - Starts with a letter; ends with a letter or digit.

        {{% note %}}
The database name is not case-sensitive
        {{% /note %}}

    - **Memory limit** - The [memory limit]({{< relref "/rs/administering/database-operations/memory-limit.md" >}}) includes all database replicas and shards,
        including slave shards in database replication and database shards in database clustering.
        If the total size of the database in the cluster reaches the memory limit,
        then the data eviction policy for the database is enforced.

        {{% note %}}
If you create a Redis Flash]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}})
or a Memcached Flash database, you also have to set the RAM-to-Flash ratio
for this database. Minimum RAM portion is 10%, and maximum RAM portion is 50%.
        {{% /note %}}

1. Select from the basic {{< field "db_type" >}} options:

    - **Replication** - We recommend that you use intra-cluster replication to create slave shards for each database.

        If the cluster is configured to support [rack-zone awareness]({{< relref "/rs/concepts/high-availability/rack-zone-awareness.md" >}}),
        you can also enable rack-zone awareness for the database.

    - **Redis Modules** - You can enable a [Redis module]({{< relref "/rs/developing/modules/_index.md" >}}) for the database.

    - **Data persistence** - To protect against loss of data stored in RAM,
        you can enable [data persistence]({{< relref "/rs/concepts/data-access/persistence.md" >}})
        and select to store a copy of the data on disk with snapshots or Append Only File.

    - **Password** - To protect your database from unauthorized connections,
        enter a Redis password. Then, use the password in you application connections
        to the database.

        {{% note %}}
If you are creating a Memcached database, enter a username and password for SASL Authentication.
        {{% /note %}}

1. Select from the advanced {{< field "db_type" >}} options:

    - **Endpoint port number** - You can define the port number that clients use to connect to the database,
        or a port is randomly selected.

        {{% note %}}
You cannot change the [port number]({{< relref "/rs/administering/designing-production/networking/port-configurations.md" >}})
after the database is created.
        {{% /note %}}

    - **Database clustering** - You can either:
        - Enable [database clustering]({{< relref "/rs/concepts/high-availability/clustering.md" >}})
            and select the number of shards that you want to have in the database.
            When database clustering is enabled, databases are subject to limitations on
            [Multi-key commands]({{< relref "/rs/concepts/high-availability/clustering.md" >}}).
            You can increase the number of shards in the database at any time.

            You can accept the [standard hashing policy]({{< relref "/rs/concepts/high-availability/clustering.md#standard-hashing-policy" >}})
            or define a [custom hashing policy]({{< relref "/rs/concepts/high-availability/clustering.md#custom-hashing-policy" >}})
            to define where keys are located in the clustered database.

        - Clear the **Database clustering** option to use only one shard so that you 
        can use [Multi-key commands]({{< relref "/rs/concepts/high-availability/clustering.md" >}})
        without the limitations.

1. Set the [**data eviction policy**]({{< relref "/rs/administering/database-operations/eviction-policy.md" >}}).
    This policy is applied when the total size of the database reaches
    its memory limit.
1. If you would like the database to be a [**replica of**]({{< relref "/rs/administering/intercluster-replication/replica-of.md" >}})
    one or more databases, you can define the source databases with which this
    database will synchronize on an ongoing basis.
1. If you would like to [encrypt the connection to the database endpoint]
    ({{< relref "/rs/administering/designing-production/security/client-connections.md" >}})
    with TLS encryption, you have to enter the contents of the client certificate
    to the **TLS** field.
1. Specify whether to perform a **periodic back up** of the database.
    For additional details, refer to [Database
    backup]({{< relref "/rs/administering/database-operations/database-backup.md" >}}).
    If you specify periodic backup, set the interval and specify the
    backup location parameters, as appropriate.
1. Configure [**database alerts**]({{< relref "/rs/administering/database-operations/alerting.md" >}}).
1. Click **Activate**.

## Simple Connectivity Test

Once the database is created, you can find the endpoint and port for the
database in the web UI on the configuration page of each database. It is
listed under the "Endpoint" property

There are a few simple ways to check connectivity to your database:

- telnet
- Redis_cli
- Using a simple application

### Testing Database Connectivity with Telnet

As a quick smoke test, telnet to your endpoint and port for the database
you wish to test. Then do the redis PING command.

Using the URL based connection method, you should see something like
this:

```src
$ telnet redis-19836.c9.us-east-1-2.ec2.cloud.redislabs.com 19836
Trying 54.89.217.184…
Connected to redis-19836.c9.us-east-1-2.ec2.cloud.redislabs.com.
Escape character is '^]'.
AUTH my_redis_password
PING
+PONG
```

### Testing Database Connectivity with redis-cli

You can find redis-cli utility on each node in Redis Enterprise Software
cluster with the rest of the utilities. For information about directory
locations please refer to the installation page.

Using the URL based connection method, you can provide the database
endpoint URL and port number as follows:

```src
$ redis-cli -h redis-19836.c9.us-east-1-2.ec2.cloud.redislabs.com  
-p 19836 -a astrongpassword
redis-19836.c9.us-east-1-2.ec2.cloud.redislabs.com:19836> PING
PONG
```

### Testing Database Connectivity with Simple Application

You can also use a simple application to test connectivity to your
database. The following section details a simple IP based connection
approach with a python app using the discovery service that is compliant
with Redis Sentinel API. In the IP based connection method, you do not
need to remember the port number for the database but simply remember
the database name. In this method, we simply use the discovery service
that listens on port 8001 on all nodes of the cluster to discover the
endpoint for the database named "db1"

```src
from redis.sentinel import Sentinel

# with IP based connections, a list of known node IP addresses is constructed
# to allow connection even if any one of the nodes in the list is unavailable.
sentinel_list = [
(10.0.0.44', 8001),
('10.0.0.45', 8001),
('10.0.0.45', 8001)
]

# change this to the db name you want to connect
db_name = 'db1'

sentinel = Sentinel(sentinel_list, socket_timeout=0.1)
r = sentinel.master_for(db_name, socket_timeout=0.1)

# set key "foo" to value "bar"
print r.set('foo', 'bar')
# set value for key "foo"
print r.get('foo')
```

In the URL based connection method, you do need to provide the endpoint
and the port number remember the port number for the database you like
to connect to.

```src
import redis

# the URL provided to redis. Redis method comes from the database configuration
# property called "Endpoint". The endpoint URL generated by the database is a
# combination of the cluster name (FQDN) and database port number.
r = redis.Redis(
host='redis-19836.c9.us-east-1-2.ec2.cloud.redislabs.com',
port=19836)

# set key "foo" to value “bar”
print(r.set('foo', 'bar'))
# set value for key "foo"
print(r.get('foo'))
```
