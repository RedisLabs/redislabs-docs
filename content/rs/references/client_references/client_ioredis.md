---
Title: Using Redis with Node.js (ioredis)
description:
weight:
alwaysopen: false
categories: ["RS"]
---
In order to use Redis with Node.js, you need to install a Node.js Redis client.  In the following sections, we demonstrate the use of [ioredis](https://github.com/luin/ioredis), a community recommended Redis client for Node.js with support for Promises built in.  The other community recommended client for Node.js developers is [node_redis]({{< relref "./client_nodejs" >}}).

Additional Node.js clients for Redis can be found under the [Node.js section](https://redis.io/clients#Node.js) of the [Redis Clients page](https://redis.io/clients).

## Installing ioredis

Complete instructions for installing ioredis can be found in the [README file](https://github.com/luin/ioredis/blob/master/README.md). To install ioredis, issue the following command:

    npm install ioredis 

## Connecting to Redis

The following code creates a connection to Redis:

    const Redis = require('ioredis');
    const redis = new Redis({
      host: 'hostname',
      port: 6379,
      password: 'password'
    });

Make sure to replace the following values with those for your Redis instance:

- `'hostname'` should be the name of the host your database runs on
- `6379` is the default Redis port, change this if necessary
- `'password'` should be the password you use to access Redis.  If a password is not required, remove this line.  Remember to always store passwords outside of your code, for example in environment variables

## Connecting to Redis with TLS 

The following example demonstrates how to configure ioredis to make a connection to Redis using TLS:

    const Redis = require('ioredis');
    const fs = require('fs');

    const redis = new Redis({
        host: 'hostname',
        port: 6379,
        tls: {
            key: fs.readFileSync('path_to_keyfile', encoding='ascii'),
            cert: fs.readFileSync('path_to_certfile', encoding='ascii'),
            ca: [ fs.readFileSync('path_to_ca_certfile', encoding='ascii') ]
        }
    });
    
    ...

## Connecting to Redis using an ACL user and password

Redis 6 introduced [Access Control Lists](https://redis.io/topics/acl).  ACLs provide the capability to create named user accounts, each having its own password.

To connect to Redis as an ACL user, provide the user's username and password when creating the client:

    const Redis = require('ioredis');
    const redis = new Redis({
      host: 'hostname',
      port: 6379,
      username: 'username',
      password: 'password'
    });

You will need to replace `username` and `password` with the values for the ACL user that you are connecting as.

**Note:** ioredis uses the Redis `INFO` command while creating a new connection. Your ACL user must have permission to run that command, otherwise connection attempts will fail with a `NOPERM` error message:

    [ioredis] Unhandled error event: ReplyError: 
    NOPERM this user has no permissions to run the 'info' command or its 
    subcommand
    ...

## Reading and writing data with ioredis

Once connected to Redis, you can start reading and writing data. The following code snippet reads the value stored at the key `foo`, and prints it:

    // Open a connection to Redis
    // 'foo' has been set to 'bar'.
    ...
 
    client.get('foo', (err, reply) => {
        if (err) throw err;
        console.log(reply);
    });

The output of the above code should be:

    $ node example_ioredis.js
    bar

ioredis exposes a function named for each Redis command.  The first argument is almost always the Redis key to run the command against. These arguments are followed by an optional error first callback function.  If a callback function is not provided, a Promise is returned:

    // Open a connection to Redis
    // 'foo' has been set to 'bar'.

    const redisDemo = async () => {
      const reply = await redis.get('foo');
      console.log(reply);
    };

    redisDemo();

The output of the above code should be:

    $ node example_ioredis.js
    bar