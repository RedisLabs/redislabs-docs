---
Title: Redis with C
linkTitle: C
description:
weight:
alwaysopen: false
categories: ["RS"]
---
In order to use Redis with C you need a C Redis client. In following sections, we demonstrate the use of [hiredis](https://github.com/redis/hiredis), a simple C client for Redis. Additional C clients for Redis can be found under the [C section](http://redis.io/clients#C) of the Redis Clients page.

## Installing hiredis

Download the latest [hiredis release](https://github.com/redis/hiredis/releases) from the GitHub repository.

## Opening a connection to Redis using hiredis

The following code creates a connection to Redis using the hiredis synchronous API:

    #include "hiredis.h"

    redisContext *c = redisConnect("hostname", port);
    if (c != NULL && c->err) {
        printf("Error: %s\n", c->errstr);
        // handle error
    } else {
        printf("Connected to Redis\n");
    }

    redisReply *reply;
    reply = redisCommand(c, "AUTH password");
    freeReplyObject(reply);

    ...

    redisFree(c);

To adapt this example to your code, make sure that you replace the following values with those of your database:

- In line 1, the first argument to `redisConnect` should be your database's hostname or IP address
- In line 1, the second argument to `redisConnect` should be your database's port
- In line 6, replace "password" with your database's password

## Using SSL and hiredis

hiredis supports SSL natively as of [version 1.0.0](https://github.com/redis/hiredis/releases/tag/v1.0.0). For older hiredis versions, you can secure the connection using [stunnel](https://redislabs.com/blog/using-stunnel-to-secure-redis).

## Reading and writing data with hiredis

Once connected to Redis, you can start reading and writing data. The following code snippet writes the value `bar` to the Redis key `foo`, reads it back, and prints it:

    // open a connection to Redis
    ...
 
    redisReply *reply;

    reply = redisCommand(c,"SET %s %s","foo","bar");
    freeReplyObject(reply);

    reply = redisCommand(c,"GET %s","foo");
    printf("%s\n",reply->str);
    freeReplyObject(reply);

The output of the above code should be:

    $ gcc example_hiredis.c -o example_hiredis
    $ ./example_hiredis
    Connected to Redis
    bar
