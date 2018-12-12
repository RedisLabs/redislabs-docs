---
Title: Getting Started with Redis Enterprise CRDBs (conflict-free replicated databases)
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
In this guide, we'll set up a scale-minimized CRDB (conflict-free
replicated database) spanning across two Redis Enterprise Software
clusters for test and development environments. Here are the steps:

- Step 1: Run four Docker containers
- Step 2: Setup two clusters
- Step 3: Create a new Redis Enterprise CRDB
- Step 4: Connect to your member Redis Enterprise CRDBs

The steps do the installation through Docker containers. However bare
metal installation is quite similar to installing and setting up
clusters on other infrastructure like bare metal machines or virtualized
environments on Windows, MacOS or Linux. You can find other "Getting
Started" guides [here]({{< relref "/rs/getting-started/quick-setup.md" >}}).

Note: if you are setting up a production-grade environment, please
follow the detailed installation guide in the administration section.

## Step 1: Run Two Containers

We'll use two of the containers for first cluster and the remaining two
containers for the second cluster.

```src
$ docker run -d --cap-add sys_resource -h rp1_node1 --name rp1_node1 
-p 8443:8443 -p 9443:9443 -p 12000:12000 redislabs/redis

$ docker run -d --cap-add sys_resource -h rp2_node1 --name rp2_node1 
-p 8445:8443 -p 9445:9443 -p 12002:12000 redislabs/redis
```

It is important to note the **-p** options: Each container maps its web
UI port (8443), REST API port (9443), and database access port to a
unique number to ensure all containers can be accessed from the host OS
that's running the containers.

Note: You may have to increase the amount of RAM allocated to Docker on
your computer. This setting is under Preferences -\> Advanced.

## Step 2: Setup Two Clusters

1. For cluster 1, direct your browser to **https://localhost:8443** on the
host machine to see the Redis Enterprise Software web console. Simply
click the **Setup** button on the page to get started.

    Note: Depending on your browser, you may see a certificate error. Continue to 
    the website.

    ![image4](/images/rs/image4.png?width=1000&height=611)

1. On the **node configuration** page, select your default settings and
provide a cluster FQDN, for example `cluster1.local`. Then click
**Next** button.

    ![image5](/images/rs/image5.png?width=1000&height=611)

1. If you don't have a license key, click the **Next** button to try the
trial version of the product.

1. On the next screen, set up a Cluster Administrator account using an
email for the login and a password.

    ![image9](/images/rs/image9.png?width=1000&height=611)

1. Click **OK** to confirm that you are aware of the replacement of the HTTPS SSL 
    certificate on the node, and proceed through the browser warning.

We will repeat the same operations for cluster 2. There are only a few
differences.

- In your web browser, go to **https://localhost:8445** to
    set up the cluster 2.
- For the **Cluster name (FQDN)**, enter a different name, for example  as `cluster2.local`.

Now we have two Redis Enterprise Software clusters with FQDNs
**cluster1.local** and **cluster2.local**.

## Step 3: Create a Redis CRDB

1. After you login to cluster1.local, select the Redis database with deployment type
set to Geo-Distributed.

    ![new_geo-distrbuted](/images/rs/new_geo-distrbuted.png?width=600&height=608)

1. On the create database page, click the **show advanced option** link and
enter **database1** for the database name and **12000** for the endpoint
port number.

1. A CRDB is a global database that spans multiple clusters. In this case,
both cluster 1 and cluster 2. On the participating clusters list, add
two clusters, `http://cluster1.local:8080` and `http://cluster2.local:8080`,
with the admin accounts and passwords for each cluster. Notice
that we had to add the cluster we are currently on.

1. Click **Activate** to create your database.

    ![create_database_settings](https://lh6.googleusercontent.com/BpQBxYWXeuTuPCqL0TQKRRJaQlr8jLIMoNnScsD2s0wRzDkTc9kgWwngjQ6PnJff_hF1Ca98aZkJTJzU5Sk5rCJwZmR2egkImQCJyMm9E9WfJDrtlzHUJQFAi05lx395EEOZvi3D)

1. After the global CRDB is created, you can now visit each cluster 1 at
http://localhost:8443 and cluster 2 at http://localhost:8445.

1. Make sure that each cluster has a local CRDB member database under the name database1.

    In a real-world deployment, cluster 1 and cluster 2 would most likely be
    in separate data centers in different regions. However in this case, for
    local testing, we have created the scale-minimized deployment using two
    local clusters running on the same host.

## Step 4: Connect to your member Redis CRDBs

With the Redis database created, you are ready to connect to your
database to store data. You can use one of the following ways to test
connectivity to your database:

- Connect with redis-cli, the built-in command-line tool
- Connect with a _Hello World_ application written in Python

Remember we have two member CRDBs that are available for connections and
concurrent reads and writes. The member CRDBs are using bi-directional
replication to for the global CRDB.

![CRDB Diagram](/images/rs/image3.png?width=930&height=543)

### Connecting Using redis-cli

redis-cli is a simple command-line tool to interact with redis database.

1. Use "docker exec" to switch your context into the Redis Enterprise
Software container of node 1 in cluster 1.

    ```src
    $ docker exec -it rp1_node1 bash
    ```

1. Run redis-cli, located in the /opt/redislabs/bin directory, to connect
to port 12000 and store and retrieve a key in database1:

    ```src
    $ sudo /opt/redislabs/bin/redis-cli -p 12000
    127.0.0.1:12000> set key1 123
    OK
    127.0.0.1:12000> get key1
    "123"
    ```

    You can see the write replicated to cluster 2.

1. Use "docker exec" to switch your context into the Redis Enterprise Software 
container of node 1 in cluster 2.

    ```src
    $ docker exec -it rp2_node1 bash
    $ sudo /opt/redislabs/bin/redis-cli -p 12000
    127.0.0.1:12000> get key1
    "123"
    ```

### Connecting Using _Hello World_ Application in Python

A simple python application running on the host machine can also connect
to the database1.

Note: The following section assumes you already have python and redis-py
(python library for connecting to Redis) configured on the host machine
running the container. You can find the instructions to configure
redis-py on the github page for redis-py

1. In the command-line terminal, create a new file called "redis_test.py"

    ```src
    $ vi redis_test.py
    ```

1. Paste the following into a file named "redis_test.py".

    ```src
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

1. Run "redis_test.py" application to connect to the database and store
and retrieve a key using the command-line.

    ```src
    $ python redis_test.py
    ```

    The output should look like the following screen if the connection is
successful.

    ```src
    set key1 123 in cluster 1
    True
    get key1 cluster 1
    b'123'
    get key1 from cluster 2
    b'123'
    ```
