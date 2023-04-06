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

1. [Install Redis Enterprise Software](#install-redis-enterprise-software)

1. [Set up a Redis Enterprise Software cluster](#set-up-a-cluster)

1. [Create a new Redis database](#create-a-database)

1. [Connect to your Redis database](#connect-to-your-database)

{{< note >}}
**This quickstart is designed for local testing only.**
For production environments, see the [install and setup]({{< relref "/rs/installing-upgrading#install-redis-enterprise-software" >}}) guide for deployment options and instructions.
{{< /note >}}

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

### Port availability

If port 53 is in use, the installation fails. This is known to happen in
default Ubuntu 18.04 installations in which `systemd-resolved` (DNS server) is running.

To work around this issue, change the system configuration to make this port available
before installation.

1. Edit `/etc/systemd/resolved.conf`: 

    ```sh
    sudo vi /etc/systemd/resolved.conf
    ```

1. Add `DNSStubListener=no` as the last line in the file and save the file.

1. Rename the current `/etc/resolv.conf` file:

    ```sh
    sudo mv /etc/resolv.conf /etc/resolv.conf.orig
    ```

1. Create a symbolic link for `/etc/resolv.conf`:

    ```sh
    sudo ln -s /run/systemd/resolve/resolv.conf /etc/resolv.conf
    ```

1. Restart the DNS service:

    ```sh
    sudo service systemd-resolved restart
    ```

## Set up a cluster

To set up your machine as a Redis Enterprise Software cluster:

{{< embed-md "cluster-setup.md" >}}

## Create a database

1. Select **redis database** and the **Single Region** deployment, then select **Next**.

    ![Redis Enterprise Software create database](/images/rs/getstarted-newdatabase.png)

1. Enter a database name such as `database1` and then select **Show advanced options**.

    ![Redis Enterprise Software configure new database screen](/images/rs/getstarted-createdatabase.png)

1. For the **Endpoint port number**, enter `12000`.

1. Select **Activate** to create your database.

You now have a Redis database!

## Connect to your database

After you create the Redis database, you are ready to store data in your database.
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
