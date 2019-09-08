---
Title: Using Redis with Node.js
description:
weight:
alwaysopen: false
categories: ["RS"]
---
In order to use Redis with Node.js you will need a Node.js Redis client. In following sections, we will demonstrate the use of [node_redis](https://github.com/NodeRedis/node_redis), a complete Redis client for Node.js. Additional Node.js clients for Redis can be found under the [Node.js section](http://redis.io/clients#Node.js) of the Redis Clients page.

## Installing node_redis

node_redis installation instructions are given in the [README file](https://github.com/NodeRedis/node_redis/blob/master/README.md). To install using `npm` issue the following command:

    npm install redis 

## Opening a Connection to Redis Using node_redis

The following code creates a connection to Redis using node_redis:

    var redis = require('redis');
    var client = redis.createClient(port, 'hostname', {no_ready_check: true});
    client.auth('password', function (err) {
        if (err) then throw err;
    });
    
    client.on('error', function (err) {
        console.log('Error ' + err);
    }); 
    
    client.on('connect', function() {
        console.log('Connected to Redis');
    });

To adapt this example to your code, make sure that you replace the following values with those of your database:

- In line 2, the first argument to `createClient` should be your database's port
- In line 2, the second argument to `createClient` should be your database's hostname or IP address
- In line 3, the first argument to `auth` should be your database's password

## Using SSL and node_redis

TLS is supported by node_redis as of [version 2.4.0](https://github.com/NodeRedis/node_redis/releases/tag/v.2.4.0). The following example demonstrates how to use TLS:

    var redis = require('redis');
    var tls = require('tls');
    var fs = require('fs');
    
    var ssl = {
      key: fs.readFileSync('path_to_keyfile',encoding='ascii'),
      cert: fs.readFileSync('path_to_certfile',encoding='ascii'),
      ca: [ fs.readFileSync('path_to_ca_certfile',encoding='ascii') ]
    };
    
    var client = redis.createClient(port, 'hostname', {tls: ssl});
    ...

## Reading and Writing Data with node_redis

Once connected to Redis, you can start reading and writing data. The following code snippet writes the value `bar` to the Redis key `foo`, reads it back, and prints it:

    // open a connection to Redis
    ...
 
    client.set("foo", "bar", redis.print);
    client.get("foo", function (err, reply) {
        if (err) then throw err;
        console.log(reply.toString());
    });

The output of the above code should be:

    $ node example_node_redis.js
    Connected to Redis
    bars
