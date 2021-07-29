---
Title: Redis with Node.js (node_redis)
linkTitle: Node.js (node_redis)
description:
weight:
alwaysopen: false
categories: ["RS"]
---
To use Redis with Node.js, you need to install a Node.js Redis client.
In this article, you can learn how to use [node_redis](https://github.com/NodeRedis/node_redis), a community recommended Redis client for Node.js.

The other community recommended client for Node.js developers is [ioredis](https://github.com/luin/ioredis).
You can find other node.js clients for Redis in the [Node.js section](https://redis.io/clients#Node.js) of the [Redis Clients page](https://redis.io/clients).

## Installing node_redis

To install node_redis, run:

    npm install redis 

For more information about installing node_redis, read the [node_redis README file](https://github.com/NodeRedis/node_redis/blob/master/README.md).

## Connecting to Redis

Here we cover a few ways that you can connect to Redis with different security considerations.

### Connecting to Redis with the default password

The following code creates a connection to Redis:

```js
const redis = require('redis');
const client = redis.createClient({
    host: '<hostname>',
    port: <port>,
    password: '<password>'
});

client.on('error', err => {
    console.log('Error ' + err);
});
```

Make sure to replace the values in the example with the values for your Redis instance:

- `<hostname>` - The name of the host your database runs on
- `<port>` - The port that the database is running on (default: 6379)
- `<password>` - The password you use to access Redis, if necessary.

Remember to always store passwords outside of your code, for example in environment variables.

### Connecting to Redis with TLS

The following example demonstrates how to make a connection to Redis using TLS:

```js
const redis = require('redis');
const fs = require('fs');

const client = redis.createClient({
    host: '<hostname>',
    port: <port>,
    tls: {
        key: fs.readFileSync('path_to_keyfile', encoding='ascii'),
        cert: fs.readFileSync('path_to_certfile', encoding='ascii'),
        ca: [ fs.readFileSync('path_to_ca_certfile', encoding='ascii') ]
    }
});
```

Where you must provide:

- `<hostname>` - The name of the host your database runs on
- `<port>` - The port that the database is running on (default: 6379)

### Connecting to Redis using an ACL user and password

Redis 6 introduced [Access Control Lists](https://redis.io/topics/acl).
ACLs provide the capability to create named user accounts, each having its own password.

node_redis doesn't currently support ACL commands or the `AUTH` command with a username and password.
This means that you have to disable the client's built in `auth` function and use the generic `send_command` function to authenticate.
`send_command` allows you to send any arbitrary command to Redis.

Example:

```js
const redis = require('redis');
const client = redis.createClient({
    host: '127.0.0.1',
    port: <port>
});

// Disable client's AUTH command.
client['auth'] = null;

// send_command expects a command name and array of parameters.
client.send_command('AUTH', ['<username>', '<password>']);
```

Where you must provide the `<port>` as well as the `<username>` and `<password>` with the values for the ACL user that you are connecting as.

## Reading and writing data with node_redis

After your application connects to Redis, you can start reading and writing data.
The following code snippet writes the value `bar` to the Redis key `foo`, reads it back, and prints it:

```js 
client.set('foo', 'bar', (err, reply) => {
    if (err) throw err;
    console.log(reply);

    client.get('foo', (err, reply) => {
        if (err) throw err;
        console.log(reply);
    });
});
```

The output of the above code should be:

```sh
$ node example_node_redis.js
OK
bar
```

node_redis exposes a function named for each Redis command.
These functions take string arguments, the first of which is almost always the Redis key to run the command against.
These arguments are followed by an optional error first callback function.

## Promises and async/await

To use promises and async/await with node_redis, wrap it using [Bluebird's](https://www.npmjs.com/package/bluebird) `promisifyAll` as shown here:

```js
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
```

This creates an async equivalent of each function, adding `Async` as a suffix.

Alternatively, you can promisify a subset of node_redis functions one at a time using native Node.js promises and `util.promisify`:

```js
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
```
