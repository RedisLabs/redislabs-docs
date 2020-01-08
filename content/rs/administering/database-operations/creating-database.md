---
Title: Creating a Redis Enterprise Software (RS) Database
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
db_type: database
---
You can create Redis databases that are sharded and distributed across a single RS cluster.
These databases can use Redis Enterprise features like:

- [Redis on Flash]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}})
- [High availability]({{< relref "/rs/concepts/high-availability/_index.md" >}})
- [Data persistence]({{< relref "/rs/concepts/data-access/persistence.md" >}})
- [Redis modules]({{< relref "/rs/developing/modules/_index.md" >}})

You can create databases according to the number of shards in your subscription
and the memory available on the machine.

{{% note %}}
For databases with Active-Active replication for geo-distributed locations,
[create an Active-Active database]({{< relref "/rs/administering/database-operations/create-active-active.md" >}}).
{{% /note %}}

## Creating a New Redis Database

To create a new database:

1. In your web browser, open the web UI of the cluster that you want to connect to in order to create the {{< field "db_type" >}}.

    By default, the address is: `https://<RS_address>:8443`

1. In **databases**, click ![Add](/images/rs/icon_add.png#no-click "Add").

    If you do not have any databases on the node, you are prompted to create a database.

    <!-- {{</* embed-md "create-db.md" */>}} -->

1. Click **Next** to create a single-region, in-memory database.

    If your cluster supports [Redis on Flash (RoF)]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}}),
    in **Runs on** you can select **Flash** so that your database uses Flash memory.

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
If you create a [Redis Flash]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}})
or a Memcached Flash database, you also have to set the RAM-to-Flash ratio
for this database. Minimum RAM portion is 10%, and maximum RAM portion is 50%.
        {{% /note %}}

1. Select from the basic {{< field "db_type" >}} options:

    - [**Replication**]({{< relref "/rs/concepts/high-availability/replication.md" >}}) - We recommend that you use intra-cluster replication to create slave shards for each database for high-availablity of your data.

        If the cluster is configured to support [rack-zone awareness]({{< relref "/rs/concepts/high-availability/rack-zone-awareness.md" >}}),
        you can also enable rack-zone awareness for the database.

    - [**Redis Modules**]({{< relref "/rs/developing/modules/_index.md" >}}) - When you create a new in-memory database,
        you can enable multiple Redis modules to the database.
        For RoF databases, you can add modules that support RoF.

        To add a module to the database:

        1. In the Redis Modules field, click ![Add](/images/rs/icon_add.png#no-click "Add").
        1. Select the module that you want to add.
        1. If you want the module to use a custom configuration,
        click **Add configuration** and enter the optional custom configuration.
        1. Click ![Save](/images/rs/icon_save.png#no-click "Save").

        {{< video "/images/rs/multiple-modules.mp4" "Adding multiple modules" >}}

    - [**Data persistence**]({{< relref "/rs/concepts/data-access/persistence.md" >}}) -
        To protect against loss of data stored in RAM,
        you can enable data persistence and select to store a copy of the data on disk with snapshots or Append Only File.

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

- [**Data eviction policy**]({{< relref "/rs/administering/database-operations/eviction-policy.md" >}}) -
    By default, when the total size of the database reaches its memory limit the database evicts keys
    according to the least recently used keys out of all keys with an "expire" field set
    in order to make room for new keys. You can select a different data eviction policy.

- [**Replica of**]({{< relref "/rs/administering/database-operations/create-active-passive.md" >}}) -
    You can make this database a repository for keys from other databases.

- [**TLS**]
    ({{< relref "/rs/administering/designing-production/security/tls-configuration.md" >}}) -
    You can require TLS encryption and authentication for all communications,
    TLS encryption and authentication for Replica Of communication only, and TLS authentication for clients.

- [**Periodic backup**]({{< relref "/rs/administering/database-operations/database-backup.md" >}}) -
    You can configure periodic backups of the database, including the interval and backup location parameters.

- [**Alerts**]({{< relref "/rs/administering/database-operations/alerting.md" >}}) -
    You can select alerts to show in the database status and configure their thresholds.
    You can also select to send the alerts by email to [relevant users]({{< relref "/rs/administering/designing-production/security/account-management.md" >}}).

1. Click **Activate**.

1. If you did not specify a port number for the database,
    note the port number shown in the Endpoint field of the database **configuration**.

    ![database-port](/images/rs/database-port.png)

## Simple Connectivity Test

Once the database is created, you can find the endpoint and port for the
database in the web UI on the configuration page of each database. It is
listed under the "Endpoint" property

There are a few simple ways to check connectivity to your database:

- telnet
- Redis_cli
- Using a simple application

### Testing Database Connectivity with Telnet

As a quick smoke test, telnet to your endpoint and port for the database.
Then run the redis PING command.

Using the URL-based connection method, the result looks like:

```src
$ telnet redis-19836.c9.us-east-1-2.ec2.cloud.redislabs.com 19836
Trying 54.89.217.184…
Connected to redis-19836.c9.us-east-1-2.ec2.cloud.redislabs.com.
Escape character is '^]'.
AUTH my_redis_password
PING
+PONG
```

### Testing Database Connectivity with redis-cli {#testing-database-connectivity-with-rediscli}

The redis-cli utility is installed on each node in RS cluster with the rest of the utilities.

Using the URL-based connection method, you can connect the database
endpoint URL and port number. The result looks like:

```src
$ redis-cli -h redis-19836.c9.us-east-1-2.ec2.cloud.redislabs.com
-p 19836 -a astrongpassword
redis-19836.c9.us-east-1-2.ec2.cloud.redislabs.com:19836> PING
PONG
```

### Testing Database Connectivity with Simple Application

You can also use a simple application to test connectivity to your database.
Here is a simple python app  the connects to the database by IP address.
The app uses the discovery service that is compliant with Redis Sentinel API.

In the IP-based connection method, you do only need the database name, not the port number.
Here we simply use the discovery service that listens on port 8001 on all nodes of the cluster
to discover the endpoint for the database named "db1".

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

In the URL-based connection method, you need to specify the endpoint
and the port number for your database.

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
