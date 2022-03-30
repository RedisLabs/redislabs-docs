---
Title: Get started with Redis Enterprise Software using Docker
linkTitle: Docker
description:
weight: 2
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/getting-started/docker/windows/,
    /rs/getting-started/docker/linux/,
    /rs/getting-started/docker/macos/,
    /rs/getting-started/docker/getting-started-docker/,
    /rs/getting-started/docker/,
    /rs/databases/get-started/getting-started-docker.md,
    /rs/databases/get-started/getting-started-docker/,
    /rs/databases/get-started/get-started-docker.md,
    /rs/databases/get-started/get-started-docker/,
    /rs/installing-upgrading/get-started-docker.md,
    /rs/installing-upgrading/get-started-docker/,
]

---
{{< warning >}}
Docker containers are currently only supported for development and testing environments, not for production.
{{< /warning >}}

For testing purposes, you can run Redis Enterprise Software (RS) on Docker containers on
[Linux, Windows, or MacOS]({{< relref "/rs/installing-upgrading/get-started-docker.md" >}}).
The [Redis Enterprise Software container](https://hub.docker.com/r/redislabs/redis/)
represents a node in an RS Cluster. When deploying RS using Docker, there are a couple
of common topologies:

**Topology #1:** The simplest topology is to run a single-node RS Cluster with a single container in a single host machine. This is best for local development or functional testing. Obviously, single-node clusters come with limited functionality in a few ways. For instance, in a single-node topology, Redis Enterprise Software can't replicate to replica shards or provide any protection for failures. Simply follow the instruction in the Getting Started pages for Windows, macOS and Linux to build your development environment.

![0-2](/images/rs/RS-Docker-container.png)

**Topology #2:** You may also run multi-node RS Cluster with multiple RS containers deployed to a single host machine. This topology is similar to the Topology #1 except that you run a multi-node cluster to develop and test against. The result is a system that is scale-minimized but similar to your production Redis Enterprise Software deployment. It is important to note that this topology isn't ideal for performance-sensitive systems. In this topology, containers may interfere with each other under load. In addition, even though the RS cluster provides replication to protect against failures  the cluster cannot protect you against the failure of the single host (because all nodes reside on the same physical host). With all this, Topology #2 (or other hybrid deployment methods in which you put multiple RS nodes in containers on the same physical host) is not recommended if you are looking for predictable performance or high availability.

![Docker Redis Enterprise Software Cluster](/images/rs/RS-Docker-cluster-single-host.png)

**Topology #3:** You may also run multi-node RS Cluster with multiple RS containers each deployed to its own host machine. This topology minimizes interference between RS containers, so it performs more predictably than Topology #2.

![0](/images/rs/RS-Docker-cluster-multi-host.png)

To get started with a single Redis Enterprise Software container:

- Step 1: Install Docker Engine for your operating system
- Step 2: Run the RS Docker container
- Step 3: Set up a cluster
- Step 4: Create a new database
- Step 5: Connect to your database

## Step 1: Install Docker Engine

{{< note >}}
Docker containers are currently only supported for development and testing environments, not for production.
{{< /note >}}

Go to the Docker installation page for your operating system for detailed instructions
about installing Docker Engine:

- [Linux](https://docs.docker.com/install/#supported-platforms)
- [MacOS](https://docs.docker.com/docker-for-mac/install/)
- [Windows](https://store.docker.com/editions/community/docker-ce-desktop-windows)

## Step 2: Run the container

To pull and start the Redis Enterprise Software Docker container, run this
`docker run` command in the terminal or command-line for your operating system.

{{< note >}}
On Windows, make sure Docker is configured to run Linux-based containers.
{{< /note >}}

```sh
docker run -d --cap-add sys_resource --name rp -p 8443:8443 -p 9443:9443 -p 12000:12000 redislabs/redis
```

The Docker container with RS runs on your localhost with port 8443 open for HTTPS
connections, 9443 for REST API connections, and port 12000 open for redis client connections.
You can publish other [ports]({{< relref "/rs/administering/designing-production/networking/port-configurations.md" >}})
with `-p <host_port>:<container_port>` or use the `--network host` option to open all ports to the host network.

## Step 3: Set up a cluster

{{< embed-md "cluster-setup.md" >}}

## Step 4: Create a database

1. Select "redis database" and the "single region" deployment, and click Next.

    ![Redis Enterprise Software create database](/images/rs/getstarted-newdatabase.png)

1. Enter a database name such as `database1`.

    ![Redis Enterprise Software configure new database
screen](/images/rs/getstarted-createdatabase.png)

1. Click **Show advanced options** and, in the **Endpoint port number**,
enter `12000` for the port number.

    If port 12000 is not available, enter any available port number between 10000 to 19999
    and connect to the database with that port number.

1. Click **Activate** to create your database

{{< note >}}
{{< embed-md "docker-memory-limitation.md" >}}
{{< /note >}}

The database configuration is shown.
When you see a green check mark, the database is activated and ready for you to use.

You now have a Redis database!

## Step 5: Connect to your database

After you create the Redis database, you are ready to store data in your
database. You can test connectivity to your database with:

- redis-cli - the built-in command-line tool
- A _Hello World_ application using Python

### Connecting using redis-cli {#connecting-using-rediscli}

redis-cli is a simple command-line tool to interact with Redis database.

Use "docker exec" to switch your context into the Redis Enterprise
Software container

```sh
docker exec -it rp bash
```

Run redis-cli, located in the /opt/redislabs/bin directory, to connect
to the database port number, and store and retrieve a key in database1.

```sh
$ /opt/redislabs/bin/redis-cli -p 12000
127.0.0.1:16653> set key1 123
OK
127.0.0.1:16653> get key1
"123"
```

### Connecting using _Hello World_ application in Python

A simple python application running on the **host machine**, not the
container, can also connect to database1.

{{< note >}}
The following section assumes you already have Python
and redis-py (python library for connecting to Redis) configured on the host machine running the container.
You can find the instructions to configure redis-py on the [github page for redis-py](https://github.com/andymccurdy/redis-py).
{{< /note >}}

1. Create a new file called `redis_test.py` with this contents:

    ```python
    import redis

    r = redis.StrictRedis(host='localhost', port=12000, db=0)
    print ("set key1 123")
    print (r.set('key1', '123'))
    print ("get key1")
    print(r.get('key1'))
    ```

1. Run the redis_test.py application to store and retrieve a key:

    ```sh
    python.exe redis_test.py
    ```

If the connection is successful, the output of the application looks like this:

```sh
set key1 123
True
get key1
123
```

## Next steps

Now you have a Redis Enterprise cluster ready to go. You can connect to it with
a [redis client](https://redis.io/clients) to start loading it with data or
you can use the [memtier_benchmark Quick Start]({{< relref "/rs/getting-started/memtier-benchmark.md" >}})
to check the cluster performance.
