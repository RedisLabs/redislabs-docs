---
Title: Redis with Ruby
linkTitle: Ruby
description: The redis-rb client allows you to use Redis with Ruby.
weight: 80
alwaysopen: false
categories: ["RS"]
---
To use Redis with [Ruby](https://www.ruby-lang.org/en/), you need a Ruby Redis client. The following sections demonstrate the use of [redis-rb](https://github.com/redis/redis-rb), a Ruby client library for Redis. Additional Ruby clients for Redis can be found under the [Ruby section](https://redis.io/clients#ruby) of the Redis Clients page.

## Install redis-rb

See redis-rb's [README file](https://github.com/redis/redis-rb) for installation instructions.

#### Method 1

Use `gem` to install redis-rb:

    gem install redis

#### Method 2

1. Add the following line to your Gemfile:

    ```
    gem 'redis'
    ```

2. Then run:

    ```
    bundle install
    ```

## Connect to Redis

The following code creates a connection to Redis using redis-rb:

```ruby
require 'redis'

redis = Redis.new (
    :host => 'hostname',
    :port => port,
    :password => 'password')
```

To adapt this example to your code, replace the following values with your database's values:

- In line 4, set `:host` to your database's hostname or IP address
- In line 5, set `:port` to your database's port
- In line 6, set `:password` to your database's password

## Example code for Redis commands

Once connected to Redis, you can read and write data with Redis command functions.

The following code snippet assigns the value `bar` to the Redis key `foo`, reads it back, and prints it:

```ruby
# open a connection to Redis
...
 
redis.set('foo', 'bar');
value = redis.get('foo');
puts value
```

Example output:

    $ ruby example_redis-rb.rb
    bar

## SSL

The redis-rb client does not support [SSL](https://en.wikipedia.org/wiki/Transport_Layer_Security) connections natively.

For an added security measure, you can secure the connection using [stunnel](https://redislabs.com/blog/using-stunnel-to-secure-redis) or this [redis-rb fork](https://github.com/RedisLabs/redis-rb), which includes SSL support.
