---
Title: Adding a Redis Database
date: 2018-07-20 03:49:29 +0530
weight: 10
categories: ["RI"]
path: add-instance/
nextStep:
    Title: Memory Analysis
    href: /docs/features/memory-analysis/
---

## Add a Redis Database

Before using any of the tools to work with your database, you must first add the database so RedisInsight can 
connect to it. Follow the instructions below to add your database to RedisInsight.

### Add a Standalone Redis Database

This is the simplest setup of a Redis database: just a single Redis server. 
To add a standalone Redis database to RedisInsight:

1. click the **Add Redis Database** button in the home screen.

   ![instance_overview_page](/images/ri/add-database-button-screen.png)

1. Select **Add Database** from the menu

   ![instance_overview_page](/images/ri/add-db-menu-screen.png)

   A dialog will appear with a form for entering your database's details.

1. Enter the details for your database:

   ![instance_overview_page](/images/ri/add-db-form-screen.png)

   - **Name**: A nick-name for your Redis database. It could be anything, e.g. "my local redis"
   - **Host**: The host your Redis database is available on. E.g. `redis.acme.com`. 
               If your Redis server is running on your local machine, it would be `127.0.0.1` or `localhost`.
   - **Port**: The port your Redis database is available on. The default port for Redis is `6379`.
   - **Password**: The password, if any, for your Redis database. 
                   If your database doesn't require a password, leave this field empty.
   - **Use TLS**: If your Redis database uses TLS to connect with clients, select this option.

   After entering the details for your database, click **Add Redis Database** to add the database to RedisInsight.

Your newly added database will appear in the databases page (the home page).

![instance_overview_page](/images/ri/add-db-added-screen.png)
   
### Add a Redis Cluster Database

To add a [Redis Cluster](https://redis.io/topics/cluster-tutorial) database:

1. Follow steps 1 - 2 in the [Add a Standalone Redis Database](#add-a-standalone-redis-database) section above.
1. Enter the host, port and other details of your Redis Cluster database and click **Add Redis Database**.
1. A form will appear asking to select the "seed nodes" of the cluster.

   ![instance_overview_page](/images/ri/add-db-cluster-seed-nodes-screen.png)

   For Redis Cluster databases, a set of "seed nodes" or "startup nodes" are provided to clients. 
   To make sure that RedisInsight has the same view of the cluster as your application, select the 
   same seed nodes that has been given to your application or any other client connecting to this Redis database. 
   If you're unsure of which nodes to select, or if there are no other clients for the database yet, 
   select all the nodes.

### Add a Redis Sentinel Database

[Redis Sentinel](https://redis.io/topics/sentinel) is often used for HA deployments of Redis. 
It provides automatic slave-to-master failover. 
When using Sentinel, clients don't connect to the Redis database directly, as the current master may be different
at different times, depending on whether a failover has happened or not. Instead, client's connect to the Sentinel
instance and ask it for the address of the current master, and then connect to that master. If the connection fails,
the Sentinel instance is queried again for the current master.

If you are using a Redis Sentinel setup, RedisInsight can connect to your database via the sentinel instance, 
so if failovers happen, RedisInsight will still be connecting to the same server that other clients using the 
Sentinel will.

To add a Redis database with a [Redis Sentinel](https://redis.io/topics/sentinel) setup:

1. Follow steps 1 - 2 in the [Add a Standalone Redis Database](#add-a-standalone-redis-database) section above.
1. Enter the host, port and other details of your **Redis Sentinel** instance and click **Add Redis Database**.
1. A form will appear asking to select the database to add.

   ![instance_overview_page](/images/ri/add-db-sentinel-form-screen.png)

   It's possible for a single set of Sentinel instances to monitor and manage the failover of several
   different databases. Select the database that you want to add.
   If your database requires a password, enter the password and click **Add Selected Database**.

### Add a Redis Database that uses TLS

Some setups of Redis use SSL/TLS for network communication. To add a TLS-enabled Redis database:

1. Follow steps 1 - 2 in the [Add a Standalone Redis Database](#add-a-standalone-redis-database) section above.
1. Enter the host, port and password (if any) of your database.
1. Check the **Use TLS** checkbox.

   ![instance_overview_page](/images/ri/add-db-tls-screen.png)
   
1. This will reveal another option - **Requires TLS Client Authentication**.
   Some flavours of Redis, such as [Redis Enterprise](https://redislabs.com/redis-enterprise/), 
   support [TLS Mutual Authentication](https://en.wikipedia.org/wiki/Mutual_authentication), under
   which the Redis server also verifies the identy of the client, like an application which uses
   the Redis database or RedisInsight. If your database doesn't require TLS client authentication,
   proceed to click **Add Redis Database** to add your database. Otherwise, check 
   **Requires TLS Client Authentication** and proceed to the next step.

1. For the Redis database to verify the client, the client's TLS certificate and key need to be sent
   to the Redis server when a connection is being made. Since RedisInsight is also a client to your Redis
   database, the client certificate and private key need to be provided to RedisInsight.

   ![instance_overview_page](/images/ri/add-db-tls-client-auth-screen.png)

   1. If you have already added a certificate-key pair previously, select it's name from the 
      **Client Certificate** drop-down. Otherwise, select **Add New Certificate**.
   1. Enter a name for your client certificate. This name will appear if you need to select a certificate
      in the future.
   1. Enter the text of the TLS certificate and private key in the next two fields.

1. Click **Add Redis Database** to add your database.



## Connecting to ElastiCache

Connecting to AWS ElastiCache can be particularly problematic since ElastiCache Redis caches cannot be accessed from outside the VPC, as they don't have public IP addresses assigned to them.

If you want to work with ElastiCache Redis caches using RedisInsight, you can either:

- If you are not using Redis Cluster, you can [setup an SSH Tunnel](https://userify.com/blog/howto-connect-redis-ec2-ssh-tunnel-elasticache/) between RedisInsight and your ElastiCache instance.
    
    An SSH tunnel consists of an encrypted tunnel created through an SSH protocol connection.

    - Run this command to create an SSH tunnel:

        ```bash
        ssh -f -N -L <local_port>:<elasticache_endpoint> -i <path_to_pem_file> <ec2_endpoint>
        ```

    - Go to **Add Instance** in RedisInsight and add an instance with:
        - host=localhost
        - port=<local_port>
        - name=your_instance_name

1. [Install RedisInsight on an EC2 instance]({{< relref "/ri/installing/install-ec2.md" >}}) that is in the same VPC and has access to the ElastiCache Redis cache. 
    This is option yields the best performance and works with Redis Cluster.

1. [Set up a VPN to your AWS VPC using AWS VPN](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/accessing-elasticache.html#access-from-outside-aws). 
    You can then access the ElastiCache Redis cache using the private endpoint.
