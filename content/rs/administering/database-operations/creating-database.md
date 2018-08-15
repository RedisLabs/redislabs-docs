---
Title: Creating a Redis Enterprise Software (RS) database
description: $description
weight: $weight
alwaysopen: false
---
You can create as many databases as you wish in the cluster, so long as
you do not exceed the available memory or the number of shards you
purchased with your subscription.

There are two types of Redis databases that can be created in RS.

1.  Traditional Redis databases that are sharded and distributed across
    a single RS cluster. The detailed instructions are covered below.
2.  [Conflict-Free Replicated Database
    (CRDB)](/redis-enterprise-documentation/administering/database-operations/create-crdb/)
    which is used to create a Geo-Distributed Active-Active Redis
    database.

To create a new database in the UI:
-----------------------------------

1.  On the **Databases** page, click the + (plus) sign below the table.\
    The buttons of the various database types that can be created will
    appear.

    **Note**: If no databases exist, the new database buttons are
    displayed upon entering the page.

2.  Select the type of database to create: a **Redis** database or a
    **Memcached** database.

    If the nodes in your cluster are Flash-enabled, you can opt to
    select "**Runs on**" as either **RAM** or **Flash**. For additional
    details, refer to [Redis on
    Flash](/redis-enterprise-documentation/redis-e-flash/).

    Select your "**Deployment**" as **Single Region** or
    **Geo-Distributed**. For more information on Geo-distributed, refer
    to [Conflict-free geo-Replicated Databases
    (CRDB)](/redis-enterprise-documentation/administering/intercluster-replication/crdbs/).

3.  ![](/images/rs/new_databases.png){.alignnone
    .wp-image-31471 .size-full width="584" height="599"}
4.  Enter a **name** for the database.\
    The database name must comply with the following rules:

    -   Length: up to 63 characters.
    -   Characters: only letters, digits and hyphen ('-') are allowed.
    -   Start with a letter and end with a letter or digit.

    **Note**: The database name is case-insensitive, i.e. uppercase and
    lowercase letter are treated exactly the same.

5.  Set the **memory limit** of the database. The application displays
    the total amount of memory available in the cluster. For relevant
    considerations, refer to [Database memory
    limit](/redis-enterprise-documentation/database-configuration/database-memory-limit).

    **Note:** If you create a Redis Flash or a Memcached Flash database,
    you also have to set the RAM-to-Flash ratio for this database.
    Minimum RAM portion is 10%, and maximum RAM portion is 50%. For
    additional details, refer to [Redis Enterprise
    Flash](/redis-enterprise-documentation/redis-e-flash/).

    **Note:** The name and the memory limit are the only mandatory
    parameters.

6.  Specify whether to enable **replication**. For a full explanation,
    refer to [Database
    replication](/redis-enterprise-documentation/database-configuration/database-replication).

    **Note**: Enabling **replication** affects the total database size,
    as explained in [Database memory
    limit](/redis-enterprise-documentation/database-configuration/database-memory-limit).

    a.  If the cluster is configured to support rack-zone awareness,
        once you enable replication you can also choose whether to
        enable **rack-zone awareness** for the database. For additional
        details, refer to [Rack-zone
        awareness](/redis-enterprise-documentation/rack-zone-awareness).

7.  Specify whether to enable **data persistence**, and if so, what type
    to employ. For a full explanation, refer to [Database
    persistence](/redis-enterprise-documentation/database-configuration/database-persistence).
8.  Next, you can specify **security** settings:
    -   If you are creating a Redis database, enter a Redis password.
    -   If you are creating a Memcached database, enter a username and
        password for SASL Authentication.
9.  If you would like to define the port number that will be part of the
    endpoint used to connect to the database, you can insert it in the
    **endpoint port number** field. If you do not define it the system
    will allocate a randomly selected free port.

    **Note**: Defining the port number during database creation is a
    one-time operation; the number cannot be changed at a later stage.
    For additional details, refer to [Machine ports
    configuration](/redis-enterprise-documentation/cluster-administration/best-practices/machine-ports-configuration).

10. Select whether to enable **database clustering**. If you enable
    clustering, select the number of database shards. For a Redis
    database, select also the hashing policy. For additional details,
    refer to [Database
    clustering](/redis-enterprise-documentation/database-configuration/database-clustering).
11. Set the **data eviction policy** (for additional details, refer to
    [Database eviction
    policy](/redis-enterprise-documentation/database-configuration/database-eviction-policy)).
    This policy is applied when the total size of the database reaches
    its memory limit.
12. If you would like the database to be a **replica of** one or more
    databases, you can define the source databases with which this
    database will synchronize on an ongoing basis. For additional
    details, refer to [Replica
    of](/redis-enterprise-documentation/database-configuration/replica-of).
13. If you would like to encrypt the connection to the database endpoint
    with SSL encryption, you have to enter the contents of the client
    certificate to the **SSL client authentication** field. For
    additional details, refer to [Securing client connection with
    SSL](/redis-enterprise-documentation/database-configuration/securing-client-connection-with-ssl).
14. Specify whether to perform a **periodic back up** of the database.
    For additional details, refer to [Database
    backup](/redis-enterprise-documentation/database-configuration/database-backup).
    If you specify periodic backup, set the interval and specify the
    backup location parameters, as appropriate.
15. Configure **database alerts**. For additional details, refer to
    [Database
    alerts](/redis-enterprise-documentation/database-configuration/database-alerts).
16. Click **Activate**.

Simple Connectivity Test
========================

Once the database is created, you can find the endpoint and port for the
database in the web UI on the configuration page of each database. It is
listed under the "Endpoint" property

There are a few simple ways to check connectivity to your database:

-   telnet
-   Redis\_cli
-   Using a simple application

Testing Database Connectivity with Telnet
-----------------------------------------

As a quick smoke test, telnet to your endpoint and port for the database
you wish to test. Then do the redis PING command.

Using the URL based connection method, you should see something like
this:

``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
$ telnet redis-19836.c9.us-east-1-2.ec2.cloud.redislabs.com 19836
Trying 54.89.217.184…
Connected to redis-19836.c9.us-east-1-2.ec2.cloud.redislabs.com.
Escape character is '^]'.
AUTH my_redis_password
PING
+PONG
```

Testing Database Connectivity with redis-cli
--------------------------------------------

You can find redis-cli utility on each node in Redis Enterprise Software
cluster with the rest of the utilities. For information about directory
locations please refer to the installation page.

Using the URL based connection method, you can provide the database
endpoint URL and port number as follows:

``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
$ redis-cli -h redis-19836.c9.us-east-1-2.ec2.cloud.redislabs.com  
-p 19836 -a astrongpassword
redis-19836.c9.us-east-1-2.ec2.cloud.redislabs.com:19836> PING
PONG
```

Testing Database Connectivity with Simple Application
-----------------------------------------------------

You can also use a simple application to test connectivity to your
database. The following section details a simple IP based connection
approach with a python app using the discovery service that is compliant
with Redis Sentinel API. In the IP based connection method, you do not
need to remember the port number for the database but simply remember
the database name. In this method, we simply use the discovery service
that listens on port 8001 on all nodes of the cluster to discover the
endpoint for the database named "db1"

``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
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

``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
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
