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
Docker containers are currently only supported for development and test environments, not for production. Use [Redis Enterprise on Kubernetes]({{<relref "/kubernetes">}}) for a supported containerized deployment.
{{< /warning >}}

For testing purposes, you can run Redis Enterprise Software on Docker containers on
Linux, Windows, or MacOS.
The [Redis Enterprise Software container](https://hub.docker.com/r/redislabs/redis/)
acts as a node in a cluster.

To get started with a single Redis Enterprise Software container:

1. [Install Docker](#install-docker) for your operating system

2. [Run the Redis Enterprise Software Docker container](#run-the-container)

3. [Set up a cluster](#set-up-a-cluster)

4. [Create a new database](#create-a-database)

5. [Connect to your database](#connect-to-your-database)

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
docker run -d --cap-add sys_resource --name RE -p 8443:8443 -p 9443:9443 -p 12000:12000 redislabs/redis
```

The example command runs the Docker container with Redis Enterprise Software on `localhost` and opens the following ports: 

- Port 8443 for HTTPS connections

- Port 9443 for [REST API]({{<relref "/rs/references/rest-api">}}) connections

- Port 12000 configured Redis database port allowing client connections

You can publish other [ports]({{< relref "/rs/networking/port-configurations.md" >}})
with `-p <host_port>:<container_port>` or use the `--network host` option to open all ports to the host network.

## Set up a cluster

{{<embed-md "cluster-setup.md">}}

## Create a database

{{<embed-md "quick-db-setup.md">}}

{{< note >}}
{{< embed-md "docker-memory-limitation.md" >}}
{{< /note >}}

## Connect to your database

After you create the Redis database, you can connect to it to begin storing data.

### Use redis-cli inside Docker {#connect-inside-docker}

Every installation of Redis Enterprise Software includes the command-line tool [`redis-cli`]({{<relref "/rs/references/cli-utilities/redis-cli">}}) to interact with your Redis database. You can use `redis-cli` to connect to your database from within the same Docker network.

Use [`docker exec`](https://docs.docker.com/engine/reference/commandline/exec/) to start an interactive `redis-cli` session in the running Redis Enterprise Software container:

```sh
$ docker exec -it redis-cli -h redis-12000.cluster.local -p 12000
127.0.0.1:12000> SET key1 123
OK
127.0.0.1:12000> GET key1
"123"
```

### Connect from the host environment {#connect-outside-docker}

The database you created uses port `12000`, which is also mapped from the Docker container back to the host environment. This lets you use any method you have available locally to [connect to a Redis database]({{<relref "/rs/databases/connect/">}}). Use `localhost` as the `host` and `12000` as the port.

## Test different topologies

{{< warning >}}
Docker containers are currently only supported for development and test environments, not for production. Use [Redis Enterprise on Kubernetes]({{<relref "/kubernetes">}}) for a supported containerized deployment.
{{< /warning >}}

When deploying Redis Enterprise Software using Docker for testing, several common topologies are available, according to your requirements:

- [Single-node cluster](#single-node) – For local development or functional testing

- [Multi-node cluster on a single host](#multi-node-one-host) – For a small-scale deployment that is similar to production

- [Multi-node cluster with multiple hosts](#multi-node-multi-host) – For more predictable performance or high availability compared to single-host deployments

### Single node {#single-node}

The simplest topology is to run a single-node Redis Enterprise Software cluster with a single container on a single host machine. You can use this topology for local development or functional testing.

Single-node clusters have limited functionality. For example, Redis Enterprise Software can't use replication or protect against failures if the cluster has only one node.

![0-2](/images/rs/RS-Docker-container.png)

### Multiple nodes on one host {#multi-node-one-host}

You can create a multi-node Redis Enterprise Software cluster by deploying multiple containers to a single host machine. The resulting cluster is scale minimized but similar to production deployments.

However, this will also have several limitations.  For example, you cannot map the same port on multiple containers on the same host.

![Docker Redis Enterprise Software Cluster](/images/rs/RS-Docker-cluster-single-host.png)

### Multiple nodes and hosts {#multi-node-multi-host}

You can create a multi-node Redis Enterprise Software cluster with multiple containers by deploying each container to a different host machine.

This topology minimizes interference between containers, allowing for the testing of more Redis Enterprise Software features.

![0](/images/rs/RS-Docker-cluster-multi-host.png)
