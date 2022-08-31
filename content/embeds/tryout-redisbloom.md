## Trying it out

You can play with it a bit using redis-cli:

Connect to redis.

```sh
$ redis-cli -p 12543
127.0.0.1:12543>
```

Run these commands:

```sh
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

```sh
 127.0.0.1:12543> BF.RESERVE largebloom 0.0001 1000000
 OK
 127.0.0.1:12543> BF.ADD largebloom kirk
 1) (integer) 1
```

## Using Cuckoo filters in Redis Enterprise Software

Cuckoo filters can also be used as part of the RedisBloom module.
You can play with it using redis-cli:

```sh
127.0.0.1:12543> CF.ADD newcuckoo redis
(integer) 1
127.0.0.1:12543> CF.EXISTS newcuckoo redis
(integer) 1
127.0.0.1:12543> CF.EXISTS newcuckoo notpresent
(integer) 0
127.0.0.1:12543> CF.DEL newcuckoo redis
(integer) 1
```
