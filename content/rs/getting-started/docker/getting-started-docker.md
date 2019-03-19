---
Title: Getting Started with Redis Enterprise Software using Docker 
description: 
weight: $weight
alwaysopen: false
aliases:
    - /rs/getting-started/docker/windows/
    - /rs/getting-started/docker/linux/
    - /rs/getting-started/docker/macos/
categories: ["RS"]
---
In this quick setup guide, we take you through the steps to run RS in a Docker container to test its capabilities.

- To test RS in a Linux-based, development environment, go to the
  [Quick Setup of Redis Enterprise Software]({{< relref "/rs/getting-started/quick-setup.md" >}}).
- To install RS on Linux in a production environment, follow the complete instuctions 
  in [installing RS] ({{< relref "/rs/installing-upgrading/downloading-installing.md" >}}).

Before you start, you must install the [Docker engine](https://www.docker.com/get-started)
on Windows, MacOS or Linux-based operating systems.

Note: Windows and MacOS are currently only supported for development and testing environments.

To get started with a single Redis Enterprise Software container:

- Step 1: Install Docker Engine for your operating system
- Step 2: Run the RS Docker container
- Step 3: Setup a cluster
- Step 4: Create a new database
- Step 5: Connect to your database

## Step 1: Install Docker Engine

Go to the Docker installation page for your operating system for detailed instructions 
about installing Docker Engine:

- [Linux](https://docs.docker.com/install/#supported-platforms)
- [MacOS](https://docs.docker.com/docker-for-mac/install/)
- [Windows](https://store.docker.com/editions/community/docker-ce-desktop-windows)

## Step 2: Run the Container

To pull and start the Redis Enterprise Software Docker container, run this 
`docker run` command in the terminal or command-line for your operating system.

Note: On Windows, make sure Docker is configured to run Linux-based containers.

```src
$ docker run -d --cap-add sys_resource --name rp -p 8443:8443 -p 12000:12000 redislabs/redis
```

The Docker container with RS runs on your localhost with port 8443 open for HTTPS 
connections and with port 12000 open for redis client connections.

<!-- Also in quick-start.md -->
## Step 3: Setup a Cluster

1. In the web browser on the host machine, go to https://localhost:8443 to see
the Redis Enterprise Software web console.

    Note:

    - Depending on your browser, you may see a certificate error. You can safely 
    continue to the web console.
    - If you see an error from nginx, try again after a few minutes.

1. Click **Setup** to start the node configuration steps.

    ![Redis Enterprise Software Setup](/images/rs/getstarted-setup.png?width=600)

1. In the **Node Configuration** settings, enter a cluster FQDN such as `cluster.local`. 
Then click **Next** button.

    ![Redis Enterprise Software node configuration](/images/rs/getstarted-nodeconfig.png?width=600)

1. Enter your license key, if you have one. If not, click the **Next** button to use the trial version.

1. Enter an email and password for the admin account for the web console.

    ![Redis Enterprise Software admin credentials](/images/rs/getstarted-admincredentials.png?width=600)

1. Click **OK** to confirm that you are aware of the replacement of the HTTPS SSL/TLS 
certificate on the node, and proceed through the browser warning.

## Step 4: Create a Database

1. Select "redis database" and the "single region" deployment, and click Next.

    ![Redis Enterprise Software create database](/images/rs/getstarted-newdatabase.png)

1. Enter a database name such as `database1` and click **Activate** to create your database.

    ![Redis Enterprise Software configure new database
screen](/images/rs/getstarted-createdatabase.png)

<!-- Also in crdbs.md -->
Note: If you cannot activate the database because of a memory limitation, 
make sure that Docker has enough memory allocated in the Advanced section 
of Docker Settings.

You now have a Redis database!

## Step 5: Connect to your Database

After you create the Redis database, you are ready to store data in your
database. You can test connectivity to your database with:

- redis-cli - the built-in command-line tool
- A _Hello World_ application using Python

### Connecting Using redis-cli

redis-cli is a simple command-line tool to interact with Redis database.

Use "docker exec" to switch your context into the Redis Enterprise
Software container

```src
$ docker exec -it rp bash
```

Run redis-cli, located in the /opt/redislabs/bin directory, to connect
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