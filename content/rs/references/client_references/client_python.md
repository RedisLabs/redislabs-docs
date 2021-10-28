---
Title: Redis with Python
linkTitle: Python
description: The redis-py client allows you to use Redis with Python.
weight: 40
alwaysopen: false
categories: ["RS"]
---
To use Redis with [Python](https://www.python.org/), you need a Python Redis client. In following sections, we demonstrate the use of [redis-py](https://github.com/andymccurdy/redis-py/), a Redis Python Client. Additional Python clients for Redis can be found under the [Python section](http://redis.io/clients#Python) of the Redis Clients page.

## Install redis-py

See redis-py's [README file](https://github.com/andymccurdy/redis-py/#installation) for installation instructions.

Use `pip` to install redis-py:

    pip install redis

You can also download the latest [redis-py release](https://github.com/andymccurdy/redis-py/releases) from the GitHub repository. To install it, extract the source and run the following commands:

    $ cd redis-py
    $ python setup.py install

## Connect to Redis

The following code creates a connection to Redis using redis-py:

```python
import redis

r = redis.Redis(
    host='hostname',
    port=port, 
    password='password')
```

To adapt this example to your code, replace the following values with your database's values:

- In line 4, set `host` to your database's hostname or IP address
- In line 5, set `port` to your database's port
- In line 6, set `password` to your database's password

## Example code for Redis commands

Once connected to Redis, you can read and write data with Redis command functions.

The following code snippet assigns the value `bar` to the Redis key `foo`, reads it back, and prints it:

```python
# open a connection to Redis
...
 
r.set('foo', 'bar')
value = r.get('foo')
print(value)
```

Example output:

    $ python example_redis-py.py
    bar

## Connection pooling

The redis-py client provides a connection pooling mechanism as explained in the [Connection Pools section](https://github.com/andymccurdy/redis-py#connection-pools) of its README file. Since connection pooling is enabled by default, no special actions are required to use it.

## SSL

The redis-py client natively supports SSL.

Use the `SSLConnection` class or instantiate your connection pool using a `rediss://` URL and the `from_url` method, like so:

```python
r = redis.Redis( url='rediss://:password@hostname:port/0',
    password='password',
    ssl_keyfile='path_to_keyfile',
    ssl_certfile='path_to_certfile',
    ssl_cert_reqs='required',
    ssl_ca_certs='path_to_ca_cert')
```
