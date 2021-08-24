---
Title: Redis with Python
linkTitle: Python
description:
weight:
alwaysopen: false
categories: ["RS"]
---
In order to use Redis with Python you need a Python Redis client. In following sections, we demonstrate the use of [redis-py](https://github.com/andymccurdy/redis-py/), a Redis Python Client. Additional Python clients for Redis can be found under the [Python section](http://redis.io/clients#Python) of the Redis Clients page.

## Installing redis-py

redis-py's installation instructions are given in the ["Installation" section](https://github.com/andymccurdy/redis-py/#installation) of its README file. Use `pip` to install redis-py:

    sudo pip install redis

You can also download the latest [redis-py release](https://github.com/andymccurdy/redis-py/releases) from the GitHub repository. To install it, extract the source and run the following commands:

    cd redis-py
    ~/redis-py$ sudo python setup.py install

## Opening a connection to Redis using redis-py

The following code creates a connection to Redis using redis-py:

    import redis

    r = redis.Redis(
        host='hostname',
        port=port, 
        password='password')

To adapt this example to your code, make sure that you replace the following values with those of your database:

- In line 4, `host` should be set to your database's hostname or IP address
- In line 5, `port` should be set to your database's port
- In line 6, `password` should be set to your database's password

## Connection pooling with redis-py

redis-py provides a connection pooling mechanism as explained in the [Connection Pools section](https://github.com/andymccurdy/redis-py#connection-pools) of its README file. Since connection pooling is enabled by default, no special actions are required to use it.

## Using SSL and redis-py

redis-py is the second Redis client that natively supported SSL. Use the `SSLConnection` class or simply instantiate your connection pool using a `rediss://`-URL and the `from_url` method, like so:

    r = redis.Redis( url='rediss://:password@hostname:port/0',
        password='password',
        ssl_keyfile='path_to_keyfile',
        ssl_certfile='path_to_certfile',
        ssl_cert_reqs='required',
        ssl_ca_certs='path_to_ca_cert')

## Reading and writing data with redis-py

Once connected to Redis, you can start reading and writing data. The following code snippet writes the value `bar` to the Redis key `foo`, reads it back, and prints it:

    # open a connection to Redis
    ...
 
    r.set('foo', 'bar')
    value = r.get('foo')
    print(value)

The output of the above code should be:

    $ python example_redis-py.py
    bar
