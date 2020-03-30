---
Title: Quick Setup of Redis Enterprise Software (RS)
description:
weight: 10
alwaysopen: false
categories: ["RS"]
---
In this quick setup guide, we take you through the steps to install RS on a Linux host to test its capabilities.
The steps to set up a Redis Enterprise Software (RS) cluster with a single node are super simple and go as follows:

- Step 1: Install Redis Enterprise Software
- Step 2: Set up a Redis Enterprise Software cluster
- Step 3: Create a new Redis database
- Step 4: Connect to your Redis database

This quick start is designed for local testing.
To connect to the RS cluster remotely,
make sure that the necessary [network ports]({{< relref "/rs/administering/designing-production/networking/port-configurations.md" >}}) are open to network traffic.

You can also get started with RS with:

- [RS in a Docker container]({{< relref "/rs/getting-started/docker/getting-started-docker.md" >}}) for development or testing purposes
- A [custom RS installation]({{< relref "/rs/installing-upgrading/_index.md" >}}) for production purposes

## Step 1: Install Redis Enterprise Software

You can download the binaries from the [Redis Enterprise Download Center](https://www.redislabs.com/download-center/)
and copy the download package to machine with a Linux-based OS. To untar the image:

```src
tar vxf <downloaded tar file name>
```

Once the tar command completes, install RS with the install.sh script in
the current directory.

```src
sudo ./install.sh -y
```

{{% note %}}When port 53 is in use, the installation fails. This is known to happen in
default Ubuntu 18.04 installations in which systemd-resolved (DNS server) is running.
To workaround this issue, change the system configuration to make this port available
before running RS installation.

{{% expand "Example steps to resolve the port 53 conflict:" %}}

1. Run: `sudo vi /etc/systemd/resolved.conf`
1. Add `DNSStubListener=no` as the last line in the file and save the file.
1. Run: `sudo mv /etc/resolv.conf /etc/resolv.conf.orig`
1. Run: `sudo ln -s /run/systemd/resolve/resolv.conf /etc/resolv.conf`
1. Run: `sudo service systemd-resolved restart`
{{% /expand %}}
{{% /note %}}

## Step 2: Set up a Cluster

{{< embed-md "cluster-setup.md" >}}

## Step 3: Create a Database

1. Select "redis database" and the "single region" deployment, and click Next.

    ![Redis Enterprise Software create database](/images/rs/getstarted-newdatabase.png)

1. Enter a database name such as `database1` and click **Activate** to create your database.

    ![Redis Enterprise Software configure new database screen](/images/rs/getstarted-createdatabase.png)

You now have a Redis database!

## Step 4: Connect to your Database

After you create the Redis database, you are ready to store data in your database.
You can test connectivity to your database with:

- redis-cli - the built-in command-line tool
- A _Hello World_ application using Python

### Connecting Using redis-cli {#connecting-using-rediscli}

redis-cli is a simple command-line tool to interact with Redis database.

Run redis-cli, located in the /opt/redislabs/bin directory, to connect
to port 12000 and store and retrieve a key in database1

```src
$ sudo /opt/redislabs/bin/redis-cli -p 12000
127.0.0.1:16653> set key1 123
OK
127.0.0.1:16653> get key1
"123"
```

### Connecting Using _Hello World_ Application in Python

A simple python application running on the **host machine**, not the
container, can also connect to database1.

Note: The following section assumes you already have Python and redis-py
(python library for connecting to Redis) configured on the host machine
running the container. You can find the instructions to configure
redis-py on the [github page for
redis-py](https://github.com/andymccurdy/redis-py).

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

    ```src
    python.exe redis_test.py
    ```

If the connection is successful, the output of the application looks like this:

```src
set key1 123
True
get key1
b'123'
```

## Next steps

Now you have a Redis Enterprise cluster ready to go. You can connect to it with
a [redis client](https://redis.io/clients) to start loading it with data or
you can use the [memtier_benchmark Quick Start]({{< relref "/rs/getting-started/memtier-benchmark.md" >}})
to check the cluster performance.
