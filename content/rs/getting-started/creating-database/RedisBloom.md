---
Title: RedisBloom Quick Start Tutorial
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
For this quick start, you will need the following:

- [A Redis Enterprise Software cluster with set up already
    complete]({{< relref "/rs/getting-started/quick-setup.md" >}})
- Any redis-cli or RedisBloom enabled client

### Create a new database that uses the Module

1. In the Redis Modules field, click ![Add](/images/rs/icon_add.png#no-click "Add").
1. Select the ReBloom module.
1. If you want the module to use a custom configuration,
click **Add configuration** and enter the optional custom configuration.
1. Click ![Save](/images/rs/icon_save.png#no-click "Save").

    For example:
    {{< video "/images/rs/multiple-modules.mp4" "Adding multiple modules" >}}

1. Click the **Activate** button

## Using Bloom filters in Redis Enterprise Software

### Trying It Out

You can play with it a bit using redis-cli:

Connect to redis.

```src
$ redis-cli -p 12543
127.0.0.1:12543>
```

Run these commands:

```src
 127.0.0.1:12543> BF.ADD bloom kirk
 1) (integer) 1
 127.0.0.1:12543> BF.ADD bloom redis
 1) (integer) 1
 127.0.0.1:12543> BF.EXISTS bloom kirk
 (integer) 1
 127.0.0.1:12543> BF.EXISTS bloom redis
 (integer) 1
 127.0.0.1:12543> BF.EXISTS bloom nonexist
 (integer) 0
 127.0.0.1:12543> BF.EXISTS bloom que?
 (integer) 0
 127.0.0.1:12543>
 127.0.0.1:12543> BF.MADD bloom elem1 elem2 elem3
 1) (integer) 1
 2) (integer) 1
 3) (integer) 1
 127.0.0.1:12543> BF.MEXISTS bloom elem1 elem2 elem3
 1) (integer) 1
 2) (integer) 1
 3) (integer) 1
```

You can also create a custom Bloom filter. The *BF.ADD* command creates
a new Bloom filter suitable for a small-ish number of items. This
consumes less memory but may not be ideal for large filters. In that
case:

```src
 127.0.0.1:12543> BF.RESERVE largebloom 0.0001 1000000
 OK
 127.0.0.1:12543> BF.ADD largebloom kirk
 1) (integer) 1
```

## Using Cuckoo filters in Redis Enterprise Software

Cuckoo filters can also be used as part of the RedisBloom module.
You can play with it using redis-cli:

```src
127.0.0.1:12543> CF.ADD cuckoo redis
(integer) 1
127.0.0.1:12543> CF.EXISTS newcuckoo redis
(integer) 1
127.0.0.1:12543> CF.EXISTS newcuckoo notpresent
(integer) 0
127.0.0.1:12543> CF.DEL newcuckoo redis
(integer) 1
```

For more information, please see [Developing with Bloom
Filters]({{< relref "/rs/developing/modules/bloom-filters.md" >}}).

For in depth information on Cuckoo filters you can visit the
original [Cuckoo
Filter](https://www.cs.cmu.edu/~dga/papers/cuckoo-conext2014.pdf) paper.
