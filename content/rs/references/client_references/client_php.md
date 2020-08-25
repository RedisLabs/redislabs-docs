---
Title: Using Redis with PHP
description:
weight:
alwaysopen: false
categories: ["RS"]
---

In order to use Redis with PHP you need a PHP Redis client. In following sections, we demonstrate the use of [Predis](https://github.com/nrk/predis), a flexible and feature-complete Redis client library for PHP >= 5.3. Additional PHP clients for Redis can be found under the [PHP section](http://redis.io/clients#PHP) of the Redis Clients page.

## Installing Predis

Predis' installation instructions are given in the ["How to Use Predis" section](https://github.com/nrk/predis#how-to-use-predis) of its README file. The recommended method for installing Predis is to use Composer and install it from [Packagist](https://packagist.org/packages/predis/predis) or the dedicated [PEAR channel](http://pear.nrk.io/).

You can also download the latest [Predis release](https://github.com/nrk/predis/releases) from the GitHub repository.

### Opening a connection to Redis using Predis

The following code creates a connection to Redis using Predis:

    <?php
    require "predis/autoload.php";
    Predis\Autoloader::register();
    
    $redis = new Predis\Client(array(
        "scheme" => "tcp",
        "host" => "hostname",
        "port" => port,
        "password” => “password"));
    echo "Connected to Redis";
    ?>

Unless you've installed Predis with Composer, you'll need to include the 2nd and 3rd lines of code to load and register the Predis client library. To adapt this example to your code, make sure that you replace the following values with those of your database:

- In line 8, `host` should refer to your database's hostname or IP address
- In line 9, `port` should be your database's port
- In line 10, `password` should be your database's password

## Persistent connections with Predis

Predis supports the use of persistent connections, which are recommended practice to minimize connection management overhead. To enable persistent connections, use the `persistent` connection attribute as shown in the following snippet:

    $redis = new Predis\Client(array(
        "scheme" => "tcp",
        "host" => "hostname",
        "port" => port,
        "password” => "password",
        "persistent" => "1"));

## Using SSL and Predis

does not support SSL connections natively. For an added security measure, you can secure the connection using [stunnel](https://redislabs.com/blog/using-stunnel-to-secure-redis) or this [Predis fork](https://github.com/RedisLabs/predis) that has been added with SSL support.

## Reading and writing data with Predis

Once connected to Redis, you can start reading and writing data. The following code snippet writes the value `bar` to the Redis key `foo`, reads it back, and prints it:

    // open a connection to Redis
    ...
 
    $redis->set("foo", "bar");
    $value = $redis->get("foo");
    var_dump($value);

The output of the above code should be:

    $ php predis_example.php
    Connected to Redis
    string(3) "bar"
