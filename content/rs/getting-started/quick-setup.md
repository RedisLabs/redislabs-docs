---
Title: Quick Setup of Redis Enterprise Software (RS)
description: 
weight: 10
alwaysopen: false
---
The steps to set up a Redis Enterprise Software (RS) cluster with a
single node are super simple and go as follows:

- Step 1: Install Redis Enterprise Software
- Step 2: Setup a Redis Enterprise Software cluster
- Step 3: Create a new Redis database
- Step 4: Connect to your Redis database

"Quick Setup" steps on this page apply to a Linux based system install.
If you would instead like to use Docker, there are platform-specific
instructions for
[Linux]({{< relref "/rs/getting-started/docker/linux.md" >}}),
[Windows]({{< relref "/rs/getting-started/docker/windows.md" >}}),
and
[MacOS]({{< relref "/rs/getting-started/docker/macos.md" >}}).

If you are looking for more detailed installation instructions you can
visit the [installing and
upgrading]({{< relref "/rs/administering/installing-upgrading/_index.md" >}})
section of the technical documentation.

## Step 1 - Install Redis Enterprise Software

You can download the binaries from the [Redis Enterprise Software
download
site](https://app.redislabs.com/#/sign-up/software?direct=true). Once
you have the bits on a Linux based OS, you need to untar the image

```src
$ tar vxf <downloaded tar file name>
```

Once the tar command completes, you will find a new install.sh script in
the current directory.

```src
$ sudo ./install.sh -y
```

## Step 2 - Setup a Cluster

Direct your browser to https://localhost:8443/ on the host machine to
see the Redis Enterprise Software web console. Simply click the
**Setup** button to get started.

Note: Depending on your browser, you may see a certificate error. Simply
choose "continue to the website" to get to the setup screen.

![setup_linux](/images/rs/setup_linux.png?width=600&height=287)

On the **node configuration** page, select your default settings and
provide a cluster FQDN: **cluster.local**. Then simply click the
**Next** button.

![RP-SetupScreen2](/images/rs/RP-SetupScreen2.jpeg?width=600&height=378)

If you don't have a license key yet, click the **Next** button to try
the trial version of the product.\
On the next screen, set up a Cluster Administrator account using an
email for the login and a password.

![RP-SetupScreen4](/images/rs/RP-SetupScreen4.jpeg?width=600&height=377)

## Step 3 - Create a Database

Choose the "new redis db" option.

![RP-SetupScreen5](/images/rs/RP-SetupScreen5.jpeg?width=600&height=375)

On the **new redis db** page, click the **show advanced option**
link and enter **database1** for a database name and **12000** for
the endpoint port number. Then click **Activate** to create your
database.

![RP-DBScreen2](/images/rs/RP-DBScreen2.jpeg?width=600&height=378)

You now have a Redis database!

## Step 4 - Connect to your Database

With the Redis database created, you are ready to connect to your
database to store data. You can use one of the following ways to test
connectivity to your database:

- Connecting with redis-cli, the built-in command-line tool
- Connecting with a _Hello World_ application using Python.

### Connecting Using redis-cli

Run redis-cli, located in the /opt/redislabs/bin directory, to connect
to port 12000 and store and retrieve a key in database1

```src
# sudo /opt/redislabs/bin/redis-cli -p 12000
127.0.0.1:16653> set key1 123
OK
127.0.0.1:16653> get key1
"123"
```

### Connect with a simple Python app

A simple python application running in the host machine can also connect
to the database1.

Note: The following section assumes you already have python and redis-py
(python library for connecting to Redis) configured on the host machine
running the container. You can find the instructions to configure
redis-py on the [github page for
redis-py](https://github.com/andymccurdy/redis-py).

In the command-line Terminal, create a new file called
**redis_test.py**

```src
$ vi redis_test.py
```

Paste the following into a file named **redis_test.py**.

```src
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
$ python redis_test.py
```

The output should look like the following screen if the connection is
successful.

```src
set key1 123
True
get key1
b'123'
```

Now that you have a database, if you'd like to do a quick test against
the database or add a bunch of data for cluster testing, the
[memtier_benchmark Quick
Start]({{< relref "/rs/getting-started/memtier-benchmark.md" >}})
should help.
