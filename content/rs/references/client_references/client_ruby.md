---
Title: Using Redis with Ruby
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
In order to use Redis with Ruby you need a Ruby Redis client. In the following sections, we demonstrate the use of [redis-rb](https://github.com/redis/redis-rb), a Ruby client library for Redis. Additional Ruby clients for Redis can be found under the [Ruby section](https://redis.io/clients#ruby) of the Redis Clients page.

## Installing redis-rb

redis-rb's installation instructions are given in the [README file](https://github.com/redis/redis-rb). Use `gem` to install redis-rb:

    gem install redis

Or, include `redis-rb` in your Gemfile by adding to it the following line:

    gem 'redis'

Followed by executing `bundle install`.

## Opening a connection to Redis using redis-rb

The following code creates a connection to Redis using redis-rb:

    require 'redis'

    redis = Redis.new (
        :host => 'hostname',
        :port => port,
        :password => 'password')

To adapt this example to your code, make sure that you replace the following values with those of your database:

- In line 4, the `:host` should be your database's hostname or IP address
- In line 5, the `:port` should be your database's port
- In line 6, the `:password` should be your database's password

## Using SSL and redis-rb

redis-rb does not support SSL connections natively. For an added security measure, you can secure the connection using [stunnel](https://redislabs.com/blog/using-stunnel-to-secure-redis) or this [redis-rb fork](https://github.com/RedisLabs/redis-rb) that has been added with SSL support.

## Reading and writing data with redis-rb

Once connected to Redis, you can start reading and writing data. The following code snippet writes the value `bar` to the Redis key `foo`, reads it back, and prints it:

    # open a connection to Redis
    ...
 
    redis.set('foo', 'bar');
    value = redis.get('foo');
    puts value

The output of the above code should be:

    $ ruby example_redis-rb.rb
    bar
