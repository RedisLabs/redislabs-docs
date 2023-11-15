---
title: Redis Enterprise Software quickstart
linkTitle: Quickstart
description: Set up a test deployment of Redis Enterprise Software for Linux.
weight: 1
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/getting-started/quick-setup/,
    /rs/getting-started/,
    /rs/getting-started.md,
    /rs/installing-upgrading/get-started-redis-enterprise-software.md,
    /rs/installing-upgrading/get-started-redis-enterprise-software/,
    /rs/installing-upgrading/,get-started-redis-enterprise-software/,
    ]
---
This guide helps you install Redis Enterprise Software on a Linux host to test its capabilities.

When finished, you'll have a simple cluster with a single node:

1. [Ensure port availability](#ensure-port-availability)

1. [Install Redis Enterprise Software](#install-redis-enterprise-software)

1. [Set up a Redis Enterprise Software cluster](#set-up-a-cluster)

1. [Create a new Redis database](#create-a-database)

1. [Connect to your Redis database](#connect-to-your-database)

{{< note >}}
**This quickstart is designed for local testing only.**
For production environments, see the [install and setup]({{< relref "/rs/installing-upgrading#install-redis-enterprise-software" >}}) guide for deployment options and instructions.
{{< /note >}}

## Ensure port availability

{{<embed-md "port-availability.md">}}

### Update `sysctl.conf` to avoid port collisions

{{<embed-md "port-collision-avoidance.md">}}

### Ubuntu conflicts with port 53

{{<embed-md "port-53.md">}}

## Install Redis Enterprise Software

To install Redis Enterprise Software:

1. Download the installation files from the [Redis Enterprise Download Center](https://redis.com/redis-enterprise-software/download-center/software/)
and copy the download package to a machine with a Linux-based OS. 

    {{< note >}}
You are required to create a free account to access the download center.
    {{< /note >}}

1. Extract the installation files:

    ```sh
    tar vxf <downloaded tar file name>
    ```

1. Run the `install.sh` script in the current directory:

    ```sh
    sudo ./install.sh -y
    ```

## Set up a cluster

To set up your machine as a Redis Enterprise Software cluster:

{{< embed-md "cluster-setup.md" >}}

## Create a database

{{<embed-md "quick-db-setup.md">}}

## Connect to your database

After you create the Redis database, it is ready for you to store data.
See the [test connectivity]({{<relref "/rs/databases/connect/test-client-connectivity.md">}}) page to learn how to connect to your database.

## Supported web browsers

To use the Redis Enterprise Software admin console, you need a modern browser with JavaScript enabled.

The following browsers have been tested with the current version of the admin console:

- Microsoft Windows, version 10 or later.
    - [Google Chrome](https://www.google.com/chrome/), version 48 and later
    - [Microsoft Edge](https://www.microsoft.com/edge), version 20 and later
    - [Mozilla Firefox](https://www.mozilla.org/firefox/), version 44 and and later
    - [Opera](https://www.opera.com/), version 35 and later

- Apple macOS:
    - [Google Chrome](https://www.google.com/chrome/), version 48 and later
    - [Mozilla Firefox](https://www.mozilla.org/firefox/), version 44 and and later
    - [Opera](https://www.opera.com/), version 35 and later

- Linux:
    - [Google Chrome](https://www.google.com/chrome/), version 49 and later
    - [Mozilla Firefox](https://www.mozilla.org/firefox/), version 44 and and later
    - [Opera](https://www.opera.com/), version 35 and later


## Next steps

- Connect to your Redis database with a [Redis client](https://redis.io/clients) and start adding data.

- Use the [`memtier_benchmark` quickstart]({{< relref "/rs/clusters/optimize/memtier-benchmark.md" >}}) to check the cluster performance.
