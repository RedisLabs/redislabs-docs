---
Title: Using Redis with Node.js (node_redis)
description:
weight:
alwaysopen: false
categories: ["RS"]
---
In order to use Redis with Node.js you need to install a Node.js Redis client. In the following sections, we demonstrate the use of [node_redis](https://github.com/NodeRedis/node_redis), a complete Redis client for Node.js. Additional Node.js clients for Redis can be found under the [Node.js section](https://redis.io/clients#Node.js) of the [Redis Clients page](https://redis.io/clients).

## Installing node_redis

Complete instructions for installing node_redis can be found in the [README file](https://github.com/NodeRedis/node_redis/blob/master/README.md). To install node_redis, issue the following command:

    npm install redis 

## Connecting to Redis

The following code creates a connection to Redis:

    const redis = require('redis');
    const client = redis.createClient({
        host: 'hostname',
        port: 6379,
        password: 'password'
    });

    client.on('error', err => {
        console.log('Error ' + err);
    }); 

Make sure to replace the following values with those for your Redis instance:

- `'hostname'` should be the name of the host your database runs on
- `6379` is the default Redis port, change this if necessary
- `'password'` should be the password you use to access Redis.  If a password is not required, remove this line.  Remember to always store passwords outside of your code, for example in environment variables

## Connecting to Redis with TLS 

The following example demonstrates how to make a connection to Redis using TLS:

    const redis = require('redis');
    const fs = require('fs');

    const client = redis.createClient({
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

node_redis doesn't currently support ACL commands, or the `AUTH` command with a username and password.  This means that you will need to disable the client's built in `auth` function and use the generic `send_command` function to authenticate.  `send_command` allows you to send any arbitrary command to Redis.

Example:

    const redis = require('redis');
    const client = redis.createClient({
        host: '127.0.0.1',
        port: 6379
    });

    // Disable client's AUTH command.
    client['auth'] = null;

    // send_command expects a command name and array of parameters.
    client.send_command('AUTH', ['username', 'password']);

You will need to replace `username` and `password` with the values for the ACL user that you are connecting as.

## Reading and writing data with node_redis

Once connected to Redis, you can start reading and writing data. The following code snippet writes the value `bar` to the Redis key `foo`, reads it back, and prints it:

    // Open a connection to Redis
    ...
 
    client.set('foo', 'bar'); 
    client.get('foo', (err, reply) => {
        if (err) throw err;
        console.log(reply);
    });

The output of the above code should be:

    $ node example_node_redis.js
    Connected to Redis
    bar

node_redis exposes a function named for each Redis command.  These functions take string arguments, the first of which is almost always the Redis key to run the command against. These arguments are followed by an optional error first callback function.

## Promises and async / await

To use promises and async / await with node_redis, wrap it using [Bluebird's](https://www.npmjs.com/package/bluebird) `promisifyAll` like so:

    const redis = require('redis');
    const { promisifyAll } = require('bluebird');

    promisifyAll(redis);

    const runApplication = async () => {
        // Connect to redis at 127.0.0.1 port 6379 no password.
        const client = redis.createClient();

        await client.setAsync('foo', 'bar');
        const fooValue = await client.getAsync('foo');
        console.log(fooValue);
    };

    runApplication();

This creates an async equivalent of each function, suffixing its name with `Async`.

Alternatively, you can promisify a subset of node_redis functions one at a time using native Node.js promises and `util.promisify`:

    const redis = require('redis');
    const { promisify } = require('util');

    const runApplication = async () => {
        // Connect to redis at 127.0.0.1 port 6379 no password.
        const client = redis.createClient();

        const setAsync = promisify(client.set).bind(client);
        const getAsync = promisify(client.get).bind(client);

        await setAsync('foo', 'bar');
        const fooValue = await getAsync('foo');
        console.log(fooValue);
    };

    runApplication();