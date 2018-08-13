---
Title: Quick Setup of Redis Enterprise Software (RS)
description: $description
weight: 10
alwaysopen: false
---
The steps to set up a Redis Enterprise Software (RS) cluster with a
single node are super simple and go as follows:

-   Step 1: Install Redis Enterprise Software
-   Step 2: Setup a Redis Enterprise Software cluster
-   Step 3: Create a new Redis database
-   Step 4: Connect to your Redis database

"Quick Setup" steps on this page apply to a Linux based system install.
If you would instead like to use Docker, there are platform-specific
instructions for
[Linux](/redis-enterprise-documentation/getting-started/docker/linux/),
[Windows](/redis-enterprise-documentation/getting-started/docker/windows/),
and
[MacOS](/redis-enterprise-documentation/getting-started/docker/macos/).

If you are looking for more detailed installation instructions you can
visit the [installing and
upgrading](https://redislabs.com/redis-enterprise-documentation/administering/installing-upgrading/)
section of the technical documentation.

Step 1: Install Redis Enterprise Software
-----------------------------------------

You can download the binaries from the [Redis Enterprise Software
download
site](https://app.redislabs.com/#/sign-up/software?direct=true). Once
you have the bits on a Linux based OS, you need to untar the image

``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
$ tar vxf <downloaded tar file name>
```

Once the tar command completes, you will find a new install.sh script in
the current directory.

``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
$ sudo ./install.sh -y
```

Step 2: Setup a Cluster
-----------------------

Direct your browser to https://localhost:8443/ on the host machine to
see the Redis Enterprise Software web console. Simply click the
"**Setup**" button to get started.

Note: Depending on your browser, you may see a certificate error. Simply
choose "continue to the website" to get to the setup screen.

![](/wp-content/uploads/2017/04/setup_linux.png){.alignnone .size-full
.wp-image-26436 width="600" height="287"}

On the "**node configuration**" page, select your default settings and
provide a cluster FQDN: "**cluster.local**". Then simply click the
"**Next**" button.

![](/wp-content/uploads/2017/04/RP-SetupScreen2.jpeg){.alignnone
.size-full .wp-image-26427 width="600" height="378"}

If you don't have a license key yet, click the "**Next"** button to try
the trial version of the product.\
On the next screen, set up a Cluster Administrator account using an
email for the login and a password.

![](/wp-content/uploads/2017/04/RP-SetupScreen4.jpeg){.alignnone
.size-full .wp-image-26409 width="600" height="377"}

Step 3: Create a Database
-------------------------

Choose the "new redis db" option.

![](/wp-content/uploads/2017/04/RP-SetupScreen5.jpeg){.alignnone
.size-full .wp-image-26410 width="600" height="375"}

On the "**new redis db**" page, click the "**show advanced option**"
link and enter "**database1**" for a database name and "**12000**" for
the endpoint port number. Then click "**Activate**" to create your
database.

![](/wp-content/uploads/2017/04/RP-DBScreen2.jpeg){.alignnone .size-full
.wp-image-26411 width="600" height="378"}

You now have a Redis database!

Step 4: Connect to your Database
--------------------------------

With the Redis database created, you are ready to connect to your
database to store data. You can use one of the following ways to test
connectivity to your database:

-   Connecting with redis-cli, the built-in command-line tool
-   Connecting with a "hello world" application using Python.

### Connecting Using redis-cli

Run redis-cli, located in the /opt/redislabs/bin directory, to connect
to port 12000 and store and retrieve a key in database1

``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
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
"**redis\_test.py**"

``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
$ vi redis_test.py
```

Paste the following into a file named "**redis\_test.py**".

``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
import redis

r = redis.StrictRedis(host='localhost', port=12000, db=0)
print ("set key1 123")
print (r.set('key1', '123'))
print ("get key1")
print(r.get('key1'))
```

Run "redis\_test.py" application to connect to the database and store
and retrieve a key using the command-line.

``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
$ python redis_test.py
```

The output should look like the following screen if the connection is
successful.

``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
set key1 123
True
get key1
b'123'
```

Now that you have a database, if you'd like to do a quick test against
the database or add a bunch of data for cluster testing, the
[memtier\_benchmark Quick
Start](https://redislabs.com/redis-enterprise-documentation/getting-started/memtier_benchmark/)
should help.
