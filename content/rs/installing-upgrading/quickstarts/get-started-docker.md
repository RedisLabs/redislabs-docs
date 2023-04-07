---
Title: Docker quickstart for Redis Enterprise Software
linkTitle: Docker quickstart
description: Set up a development or test deployment of Redis Enterprise Software using Docker.
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
Docker containers are currently only supported for development and test environments, not for production.
{{< /warning >}}

For testing purposes, you can run Redis Enterprise Software on Docker containers on
Linux, Windows, or MacOS.
The [Redis Enterprise Software container](https://hub.docker.com/r/redislabs/redis/)
acts as a node in a cluster.

To get started with a single Redis Enterprise Software container:

1. [Install Docker](#install-docker) for your operating system

1. [Run the Redis Enterprise Software Docker container](#run-the-container)

1. [Set up a cluster](#set-up-a-cluster)

1. [Create a new database](#create-a-database)

1. [Connect to your database](#connect-to-your-database)

## Deployment topologies

When deploying Redis Enterprise Software using Docker, several common topologies are available, according to your requirements:

- [Single-node cluster](#single-node) – For local development or functional testing

- [Multi-node cluster on a single host](#multi-node-one-host) – For a small-scale deployment that is similar to production

- [Multi-node cluster with multiple hosts](#multi-node-multi-host) – For more predictable performance or high availability compared to single-host deployments

### Single node {#single-node}

The simplest topology is to run a single-node Redis Enterprise Software cluster with a single container on a single host machine. You can use this topology for local development or functional testing.

Single-node clusters have limited functionality. For example, Redis Enterprise Software can't use replication or protect against failures if the cluster has only one node.

![0-2](/images/rs/RS-Docker-container.png)

### Multiple nodes on one host {#multi-node-one-host}

You can create a multi-node Redis Enterprise Software cluster by deploying multiple containers to a single host machine. The resulting cluster is scale minimized but similar to production deployments.

However, if you need predictable performance or high availability, don't host multiple nodes in containers on the same physical host.

![Docker Redis Enterprise Software Cluster](/images/rs/RS-Docker-cluster-single-host.png)

### Multiple nodes and hosts {#multi-node-multi-host}

You can also create a multi-node Redis Enterprise Software cluster with multiple containers by deploying each container to a different host machine.

This topology minimizes interference between containers, so Redis Enterprise Software performs more predictably than if you host multiple nodes on a single machine.

![0](/images/rs/RS-Docker-cluster-multi-host.png)

## Install Docker

Follow the Docker installation instructions for your operating system:

- [Linux](https://docs.docker.com/install/#supported-platforms)
- [MacOS](https://docs.docker.com/docker-for-mac/install/)
- [Windows](https://store.docker.com/editions/community/docker-ce-desktop-windows)

## Run the container

To download and start the Redis Enterprise Software Docker container, run the following
[`docker run`](https://docs.docker.com/engine/reference/commandline/run/) command in the terminal or command line for your operating system.

{{< note >}}
On Windows, make sure Docker is configured to run Linux-based containers.
{{< /note >}}

```sh
docker run -d --cap-add sys_resource --name rp -p 8443:8443 -p 9443:9443 -p 12000:12000 redislabs/redis
```

The example command runs the Docker container with Redis Enterprise Software on `localhost` and opens the following ports: 

- Port 8443 for HTTPS connections

- Port 9443 for [REST API]({{<relref "/rs/references/rest-api">}}) connections

- Port 12000 for Redis client connections

You can publish other [ports]({{< relref "/rs/networking/port-configurations.md" >}})
with `-p <host_port>:<container_port>` or use the `--network host` option to open all ports to the host network.

## Set up a cluster

{{< embed-md "cluster-setup.md" >}}

## Create a database

1. Select **redis database** and the **Single Region** deployment, then select **Next**.

    ![Redis Enterprise Software create database](/images/rs/getstarted-newdatabase.png)

1. Enter a database name such as `database1`.

    ![Redis Enterprise Software configure new database
screen](/images/rs/getstarted-createdatabase.png)

1. Select **Show advanced options** and enter `12000` for the **Endpoint port number**.

    If port 12000 is not available, enter any available port number between 10000 to 19999. You will use this port number to connect to the database.

1. Select **Activate** to create your database.

{{< note >}}
{{< embed-md "docker-memory-limitation.md" >}}
{{< /note >}}

When you see a green check mark appear on the database configuration screen, the database is activated and ready for you to use.

You now have a Redis database!

## Connect to your database

After you create the Redis database, you can start storing data.

You can test connecting to your database with:

- [`redis-cli`](#connecting-using-rediscli)
- [Python application](#python)

### redis-cli {#connecting-using-rediscli}

You can use the [`redis-cli`]({{<relref "/rs/references/cli-utilities/redis-cli">}}) command-line tool to interact with your Redis database.

1. Use [`docker exec`](https://docs.docker.com/engine/reference/commandline/exec/) to start an interactive shell session in the Redis Enterprise Software container:

    ```sh
    docker exec -it rp bash
    ```

1. Run `redis-cli` and provide the port number with `-p` to connect to the database. Then use [`SET`](https://redis.io/commands/set/) to store a key and [`GET`](https://redis.io/commands/get/) to retrieve it.

    ```sh
    $ /opt/redislabs/bin/redis-cli -p 12000
    127.0.0.1:12000> SET key1 123
    OK
    127.0.0.1:12000> GET key1
    "123"
    ```

### Python

You can also run a Python application on the host machine to connect to your database.

{{< note >}}
The following section assumes you already have Python
and the Redis Python client `redis-py` set up on the host machine running the container.
You can find the instructions to configure `redis-py` on the [`redis-py` GitHub page](https://github.com/redis/redis-py).
{{< /note >}}

1. Create a new file called `redis_test.py` and add the following code:

    ```python
    import redis

    r = redis.StrictRedis(host='localhost', port=12000, db=0)
    print ("set key1 123")
    print (r.set('key1', '123'))
    print ("get key1")
    print(r.get('key1'))
    ```

1. Run `redis_test.py` to store a key in your database and then retrieve it:

    ```sh
    $ python redis_test.py
    set key1 123
    True
    get key1
    123
    ```

## Next steps

- Connect to your Redis database with a [Redis client](https://redis.io/clients) and start adding data.

- Use the [`memtier_benchmark` quickstart]({{< relref "/rs/clusters/optimize/memtier-benchmark.md" >}}) to check the cluster performance.

