---
Title: Redis with Node.js (node_redis)
linkTitle: Node.js (node_redis)
description: The node_redis client allows you to use Redis with Node.js.
weight: 10
alwaysopen: false
categories: ["RS"]
---
To use Redis with [Node.js](https://nodejs.org/en/), you need to install a Node.js Redis client. The following sections explain how to use [node_redis](https://github.com/NodeRedis/node_redis), a community-recommended Redis client for Node.js.

Another community-recommended client for Node.js developers is [ioredis](https://github.com/luin/ioredis). You can find additional Node.js clients for Redis in the [Node.js section](https://redis.io/clients#Node.js) of the [Redis Clients page](https://redis.io/clients).

## Install node_redis

See the node_redis [README file](https://github.com/NodeRedis/node_redis/blob/master/README.md) for installation instructions.

To install node_redis, run:

    npm install redis 

## Connect to Redis

There are several ways that you can connect to Redis, each with different security considerations.

### ACL

The following code creates a connection to Redis:

```js
const redis = require('redis');
const client = redis.createClient({
    socket: {
        host: '<hostname>',
        port: '<port>'
    },
    username: '<username>',
    password: '<password>'
});

client.on('error', err => console.log('Redis Server Error', err));
```

Replace the values in the example with the values for your Redis instance:

- `<hostname>` - The name of the host your database runs on
- `<port>` - The port that the database is running on (default: 6379)
- `<username>` - The username you use to access Redis, if necessary
- `<password>` - The password you use to access Redis, if necessary

{{<note>}}
Remember to always store passwords outside of your code, for example in environment variables.
{{</note>}}

### TLS

The following example demonstrates how to make a connection to Redis using TLS:

```js
const redis = require('redis');
const fs = require('fs');

const client = redis.createClient({
    host: '<hostname>',
    port: '<port>',
    tls: {
        key: fs.readFileSync('path_to_keyfile'),
        cert: fs.readFileSync('path_to_certfile'),
        ca: [ fs.readFileSync('path_to_ca_certfile') ]
    }
});
```

Where you must provide:

- `<hostname>` - The name of the host your database runs on
- `<port>` - The port that the database is running on (default: 6379)

## Example code for Redis commands

After your application connects to Redis, you can read and write data.

The following code snippet assigns the value `bar` to the Redis key `foo`, reads it back, and prints it:

```js 
console.log(await client.set('foo', 'bar')); // 'OK'
console.log(await client.get('foo')); // 'bar'
```

Example output:

```sh
$ node example_node_redis.js
'OK'
'bar'
```

The node_redis client exposes a function named for each Redis command, and returns `Promise`.
