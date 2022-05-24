---
Title: Add a Redis database
linkTitle: Add database
date: 2018-07-20 03:49:29 +0530
weight: 10
categories: ["RI"]
path: add-instance/
nextStep:
    Title: Memory Analysis
    href: /docs/features/memory-analysis/
---
Before using any of the tools to work with your database, you must first add the database so RedisInsight can connect to it.

Each of these database configurations requires specific steps to add them to RedisInsight:

- Standalone Redis
- Redis cluster
- Redis Sentinel
- Redis with TLS authentication
- Elasticache

{{< note >}}
Currently, RedisInsight supports Redis versions 4 and newer.
{{< /note >}}

## Add a standalone Redis database

This is the simplest setup of a Redis database with just a single Redis server.

To add a standalone Redis database to RedisInsight:

1. When you open RedisInsight, click **Add Redis Database**.

    ![instance_overview_page](/images/ri/add-database-button-screen.png)

1. Select **Add Database**.

    ![instance_overview_page](/images/ri/add-db-menu-screen.png)

1. Enter the details for your database:

    ![instance_overview_page](/images/ri/add-db-form-screen.png)

    - **Host**: The hostname of your Redis database, for example `redis.acme.com`.
       If your Redis server is running on your local machine, you can enter either `127.0.0.1` or `localhost`.
       You can also paste a Connection URL. When pasted, the database details are automatically filled.

       The following Connection URLs are supported:
         - [`redis://[[user]:[pass]]@host:port`](https://www.iana.org/assignments/uri-schemes/prov/redis)
         - [`rediss://[[user]:[pass]]@host:port`](https://www.iana.org/assignments/uri-schemes/prov/rediss)
         - `host:port`
    - **Port**: The port your Redis database is available on. The default port for Redis is `6379`.
    - **Name**: A name for your Redis database. It does not have to match the name of the database in the Redis cluster.
    - **Username**: The username, if your database is ACL enabled, otherwise leave this field empty. (If you plan to share RedisInsight across multiple users within the same project, you can can enforce reentry of database usernames and passwords. For more information, see [Authenticate database users](../auth-database).
    - **Password**: The password, if any, for your Redis database.
       If your database doesn't require a password, leave this field empty.
    - **Use TLS**: If your Redis database uses TLS to connect with clients, select this option.

    After you enter the details for your database, click **Add Redis Database** to add the database to RedisInsight.

Your newly added database is shown in the home screen.

![instance_overview_page](/images/ri/add-db-added-screen.png)

## Add a Redis cluster database

To add a [Redis Cluster](https://redis.io/topics/cluster-tutorial) database:

1. Follow steps 1 - 2 in the [Add a Standalone Redis Database](#add-a-standalone-redis-database) section above.
1. Enter the host, port and other details of your Redis Cluster database and click **Add Redis Database**.
1. Select the "seed nodes" of the cluster and click **Add Redis Database**.

    ![instance_overview_page](/images/ri/add-db-cluster-seed-nodes-screen.png)

    For Redis cluster databases, a set of "seed nodes" or "startup nodes" are provided to clients.
    To make sure that RedisInsight has the same view of the cluster as your application,
    select the same seed nodes that your application or any other client uses to connect to this Redis database.
    If you don't know which node to select or if there are no other clients for the database yet,
    select all of the nodes.

## Add a Redis Sentinel database

[Redis Sentinel](https://redis.io/topics/sentinel) is often used for High Availability deployments of Redis.
It provides automatic master-to-replica failover.
When you use Sentinel, clients connect to the Sentinel instance to get the current topology of the databases.
The client then connects to the current master.
If the connection fails, the client queries the Sentinel instance again to find the current master.

In this configuration, RedisInsight can connect to your database through the Sentinel instance.
Then if a failover happens, RedisInsight changes the database connection just like any other client.

To add a Redis database with a [Redis Sentinel](https://redis.io/topics/sentinel) configuration:

1. When you open RedisInsight, click **Add Redis Database**.

    ![instance_overview_page](/images/ri/add-database-button-screen.png)

1. Select **Add Database**.

    ![instance_overview_page](/images/ri/add-db-menu-screen.png)

1. Enter the host, port and other details of your Redis Sentinel instance and click **Add Redis Database**.
1. Select the database to add.

    ![instance_overview_page](/images/ri/add-db-sentinel-form-screen.png)

    A single set of Sentinel instances can monitor and manage the failover of multiple databases.
    If your database requires a password, enter the password and click **Add Selected Database**.

## Add a Redis database that uses TLS

Some configurations of Redis use SSL/TLS for network communication.

To add a TLS-enabled Redis database:

1. When you open RedisInsight, click **Add Redis Database**.

    ![instance_overview_page](/images/ri/add-database-button-screen.png)

1. Select **Add Database**.

    ![instance_overview_page](/images/ri/add-db-menu-screen.png)

1. Enter the host, port and username (if your database is ACL enabled), password (if any) of your database.
1. Select **Use TLS**.

    ![instance_overview_page](/images/ri/add-db-tls-screen.png)

1. If the server needs to be authenticated, pass a [CA Certificate](https://en.wikipedia.org/wiki/Certificate_authority).
   1. If the certificate returned by the server needs to be verified, select **Verify TLS Certificate**.

     ![instance_overview_page](/images/ri/add-db-tls-ca-cert-screen.png)

1. If your database requires TLS client authentication to do mutual authentication:

    1. Select **Requires TLS Client Authentication**.

    Some implementations of Redis, such as [Redis Enterprise](https://redislabs.com/redis-enterprise/),
    support [TLS Mutual Authentication](https://en.wikipedia.org/wiki/Mutual_authentication)
    so that the Redis server also verifies the identity of the client.

    1. Provide the client certificate and private key to RedisInsight.

        ![instance_overview_page](/images/ri/add-db-tls-client-auth-screen.png)

        - If you already have a certificate-key pair in RedisInsight, select it from the **Client Certificate** list.
        - If you do not, create a certificate-key pair:
            1. Select **Add New Certificate**.
            1. Enter a name for your client certificate.
            1. Enter the text of the TLS certificate and private key in the next two fields.

1. Click **Add Redis Database** to add your database.

## Connecting to ElastiCache

ElastiCache Redis caches cannot be accessed from outside the VPC, as they don't have public IP addresses assigned to them.

If you want to work with ElastiCache Redis caches with RedisInsight, you can:

- If you are not using Redis Cluster, [set up an SSH Tunnel](https://userify.com/blog/howto-connect-redis-ec2-ssh-tunnel-elasticache/) between RedisInsight and your ElastiCache instance.

    1. To create an SSH tunnel, run:

        ```bash
        ssh -f -N -L <local_port>:<elasticache_endpoint> -i <path_to_pem_file> <ec2_endpoint>
        ```

    1. Go to **Add Instance** in RedisInsight and add an instance with:

        - host - `<localhost>`
        - port - `<local_port>`
        - name - `<your_instance_name>`

- [Install RedisInsight on an EC2 instance]({{< relref "/ri/installing/install-ec2.md" >}}) that is in the same VPC and has access to the ElastiCache Redis cache.

    This option gives the best performance and works with Redis Cluster.

- [Set up a VPN to your AWS VPC using AWS VPN](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/accessing-elasticache.html#access-from-outside-aws).

    You can then access the ElastiCache Redis cache using the private endpoint.
