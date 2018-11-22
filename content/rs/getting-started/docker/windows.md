---
Title: Getting Started Tutorial with Redis Enterprise Software using Docker on Windows
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Note: Due to the docker image being Linux-based currently, Windows is
only supported as a development and testing environment.

To get started with a single Redis Enterprise Software container on
Windows, follow these four steps:

- Step 1: Run the container
- Step 2: Setup a cluster
- Step 3: Create a new database
- Step 4: Connect to your database

You can also visit [Docker
Hub](https://hub.docker.com/r/redislabs/redis/) for instructions on
getting Docker installed and working with the Redis Enterprise Software
Docker container image.

## Step-by-Step Guide for Redis Enterprise Software on Windows

### Step 1: Run the Container

Run the Redis Enterprise Software Docker container by executing the
following command in the command-line window.

Redis Enterprise Software uses a Linux based container. Make sure that
your Windows machine is running Linux containers.

```src
$ docker run -d --cap-add sys_resource --name rp -p 8443:8443 -p 12000:12000 redislabs/redis
```

### Step 2: Setup a Cluster

In your web browser on the host machine, go to https://localhost:8443 to see
the Redis Enterprise Software web console.

Note:

* Depending on your browser, you may see a certificate error. Simply
choose "continue to the website" to get to the setup screen.
* If you see an error from nginx, try again after a few minutes.

Simply click the **Setup** button to get started.

![Redis Enterprise Software Setup
Screen](/images/rs/setup-windows.png?width=600&height=246)

On the "node configuration" page, select your default settings and
provide a cluster FQDN: "cluster.local". Then simply click the
**Next** button.

![Redis Enterprise Software node configuration
screen](/images/rs/setup2-windows-1.png?width=600&height=374)

If you don't have a license key, click the **Next** button to try the
trial version of the product.

On the next screen, set up a Cluster Administrator account using
an email for the login and a password.

![Redis Enterprise Software admin credentials
screen](/images/rs/RP-SetupScreen4.jpeg?width=600&height=377)

### Step 3: Create a Database

Select "redis database" and the "single region" deployment, and click Next.

![Redis Enterprise Software create database
screen](/images/rs/RP-SetupScreen5.jpeg?width=600&height=375)

On the "create database" page, enter "database1" for a database name. Then 
click "Show advanced options" and enter "12000" for the endpoint port
number. Click "Activate" to create your database.

![Redis Enterprise Software configure new database
screen](/images/rs/RP-DBScreen2.jpeg?width=600&height=378)

Note: If you cannot activate the database because of a memory limitation, 
make sure that Docker has enough memory allocated in the Advanced section 
of Docker Settings.

You now have a Redis database!

### Step 4: Connect to your Database

With the Redis database created, you are ready to connect to your
database to store data. You can use one of the following ways to test
connectivity to your database

- Connecting with redis-cli, the built-in command-line tool
- Connecting with a _Hello World_ application using Python.

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

In the command-line window, create a new file called "redis_test.py"

```src
notepad redis_test.py
```

Paste the following into a file named "redis_test.py".

```python
import redis

r = redis.StrictRedis(host='localhost', port=12000, db=0)
print ("set key1 123")
print (r.set('key1', '123'))
print ("get key1")
print(r.get('key1'))
```

Run "redis_test.py" application to connect to the database and store
and retrieve a key using the command-line.

```src
python.exe redis_test.py
```

The output should look like the following screen if the connection is
successful.

```src
set key1 123
True
get key1
b'123'
```
