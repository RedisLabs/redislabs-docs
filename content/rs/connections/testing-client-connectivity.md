---
Title: Test client connectivity
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: rs/administering/troubleshooting/testing-client-connectivity/
         rs/administering/troubleshooting/testing-client-connectivity.md
         rs/connections/testing-client-connectivity/
         rs/connections/testing-client-connectivity.md
---
In various scenarios, such as after creating a new cluster or upgrading
the cluster, it is highly advisable to verify client connectivity to the
database.

To test client connectivity:

1. [Create a Redis database]({{< relref "/rs/administering/creating-databases/_index.md" >}}) and get the database endpoint, which
    contains the cluster name (FQDN).
1. Try to connect to the database endpoint from your client of choice,
    and execute commands against the database.
1. If the database does not respond, try to connect to the database
    endpoint by using the IP address rather than the FQDN; if you
    succeed, it means that the DNS is not properly configured. For
    additional details, refer to
    [DNS]({{< relref "/rs/installing-upgrading/configuring/cluster-dns/_index.md" >}}).

If any issues are encountered during the connectivity test, contact our
support at <support@redislabs.com>.

## Test connecting to your database

With the Redis database created, you are ready to connect to your
database to store data. You can use one of the following ways to test
connectivity to your database:

- Connecting with redis-cli, the built-in command-line tool
- Connecting with a _Hello World_ application using Python.

### Connecting using redis-cli

Run redis-cli, located in the /opt/redislabs/bin directory, to connect
to port 12000 and store and retrieve a key in database1

```sh
# sudo /opt/redislabs/bin/redis-cli -p 12000
127.0.0.1:16653> set key1 123
OK
127.0.0.1:16653> get key1
"123"
```

### Connect with a simple Python app

A simple python application running on the host machine can also connect
to the database1.

{{< note >}}
The following section assumes you already have python and redis-py
(python library for connecting to Redis) configured on the host machine running the container.
You can find the instructions to configure redis-py on the
[github page for redis-py](https://github.com/andymccurdy/redis-py).
{{< /note >}}

In the command-line Terminal, create a new file called
**redis_test.py**

```sh
vi redis_test.py
```

Paste the following into a file named **redis_test.py**.

```sh
import redis

r = redis.StrictRedis(host='localhost', port=12000, db=0)
print ("set key1 123")
print (r.set('key1', '123'))
print ("get key1")
print(r.get('key1'))
```

Run "redis_test.py" application to connect to the database and store
and retrieve a key using the command-line.

```sh
python redis_test.py
```

The output should look like the following screen if the connection is
successful.

```sh
set key1 123
True
get key1
123
```
