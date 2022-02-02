---
Title: Redis with Drupal 7
linkTitle: Drupal
description: Configure Drupal to use Redis as a cache.
weight: 90
alwaysopen: false
categories: ["RS"]
---


## Install Redis for Drupal

Follow these steps to install Redis as a cache for [Drupal](https://www.drupal.org/drupal-7.0):

 1. [Install Predis]({{< relref "/rs/references/client_references/client_php#installing-predis" >}}) under `sites/all/libraries/predis`.
 2. Download and install the [Drupal Redis module](https://drupal.org/project/redis).

## Configure Drupal

To configure Drupal to use Redis as a cache, add the following lines to your `settings.php` file with the specified changes:

```sh
    $conf['redis_client_interface'] = 'Predis';
    $conf['redis_client_host'] = 'hostname';
    $conf['redis_client_port'] = port;
    $conf['redis_client_password'] = 'password';
    $conf['lock_inc'] = 'sites/all/modules/contrib/redis/redis.lock.inc';
    $conf['cache_backends'][] = 'sites/all/modules/contrib/redis/redis.autoload.inc';
    $conf['cache_default_class'] = 'Redis_Cache';
```

- In line 2, replace `hostname` with your database's hostname or IP address.
- In line 3, replace `port` with your database's port.
- In line 4, replace `password` with your database's password.
