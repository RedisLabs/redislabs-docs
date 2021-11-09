---
Title: Redis with PHP (Predis)
linkTitle: PHP (Predis)
description: The Predis client allows you to use Redis with PHP.
weight: 60
alwaysopen: false
categories: ["RS"]
---

To use Redis with [PHP](https://www.php.net/), you need a PHP Redis client.

Here, we show [Predis](https://github.com/nrk/predis), a flexible and feature-complete Redis client library for PHP version 5.3 and later. 

Other Redis clients are available for PHP; see the [PHP section](http://redis.io/clients#PHP) of the Redis Clients page.

## Install Predis

See the [How to install and use Predis](https://github.com/nrk/predis#how-to-install-and-use-predis) section of the Predis client's README file for installation instructions.

The recommended method to install Predis is to use [Composer](https://getcomposer.org/) and install it from [Packagist](https://packagist.org/packages/predis/predis) or the dedicated [PEAR channel](http://pear.nrk.io/).

You can also download the latest [Predis release](https://github.com/nrk/predis/releases) from the GitHub repository.

## Connect to Redis

The following code creates a connection to Redis using Predis:

```php
<?php
require "predis/autoload.php";
Predis\Autoloader::register();
    
$redis = new Predis\Client(array(
    "scheme" => "tcp",
    "host" => "hostname",
    "port" => port,
    "password" => "password"));
echo "Connected to Redis";
?>
```
{{<note>}}
If you aren't autoloading PHP dependencies, use `require` to load Predis and then call its `register` method, as shown here.  To learn more, see [Loading the library](https://github.com/predis/predis#loading-the-library).
{{</note>}}

To adapt this example to your code, replace the following values with your database's values:

- In line 8, set `host` to your database's hostname or IP address
- In line 9, set `port` to your database's port
- In line 10, set `password` to your database's password

## Example code for Redis commands

Once connected to Redis, you can read and write data. The following code snippet assigns the value `bar` to the Redis key `foo`, reads it back, and prints it:

```console
// open a connection to Redis
...
 
$redis->set("foo", "bar");
$value = $redis->get("foo");
var_dump($value);
```

Example output:

```console
$ php predis_example.php
Connected to Redis
string(3) "bar"
```

## Persistent connections

Predis supports the use of [persistent connections](https://en.wikipedia.org/wiki/HTTP_persistent_connection), which are recommended to minimize connection management overhead.

To enable persistent connections, use the `persistent` connection attribute, as shown in the following code snippet:

```php
    $redis = new Predis\Client(array(
        "scheme" => "tcp",
        "host" => "hostname",
        "port" => port,
        "password" => "password",
        "persistent" => "1"));
```

## Encrypted connections

[As of v1.1.0](https://github.com/predis/predis/blob/main/CHANGELOG.md#v110-2016-06-02), you can encrypt connections specifying `tls` or `rediss` as the value of the `scheme` attribute or as part of the URI.

In addition, you can configure connection parameters, as shown here:

``` php
// Named array of connection parameters:
$client = new Predis\Client([
  'scheme' => 'tls',
  'ssl'    => ['cafile' => 'private.pem', 'verify_peer' => true],
]);

// Same set of parameters, but using an URI string:
$client = new Predis\Client('tls://127.0.0.1?ssl[cafile]=private.pem&ssl[verify_peer]=1');
```

To learn more, see [Connecting to Redis](https://github.com/predis/predis#connecting-to-redis).

When using earlier versions of Predis (which is _not_ recommended), you can use [stunnel](https://redislabs.com/blog/using-stunnel-to-secure-redis) or this [Predis fork](https://github.com/RedisLabs/predis) that has been added with SSL support.
