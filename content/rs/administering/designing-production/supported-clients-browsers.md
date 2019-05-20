---
Title: Supported Clients and Web Browsers
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
You can configure Redis Enterprise Software (RS) programmatically with client libraries
or manually with the RS Web Console.

## Redis Client Libraries

For connecting to RS databases with your
Redis application, you can use any of the available [client libraries
listed on Redis.io](https://redis.io/clients).

### Discovery Service

For the [Discovery
Service]({{< relref "/rs/concepts/data-access/discovery-service.md" >}}) which
utilizes the Redis Sentinel API, the following clients are tested and
recommended:

- [Redis-py](https://github.com/andymccurdy/redis-py) (Python redis
    client)
- [HiRedis](https://github.com/redis/hiredis) (C redis client)
- [Jedis](https://github.com/xetorthio/jedis) (Java redis client)
- [Ioredis](https://github.com/luin/ioredis) (NodeJS redis client)

If you need to use other clients with the Discovery Service, perhaps
look at [Sentinel Tunnel](https://github.com/RedisLabs/sentinel_tunnel),
a utility published by Redis Labs for this purpose.

## Web Browsers

For the Redis Enterprise Software Web Console, the following web browsers
and versions are supported:

- On Windows 10:
  - Edge version 20 and up
  - Firefox version 44 and up
  - Chrome version 48 and up
  - Opera version 35 and up

<!-- -->

- On Windows 8.1:
  - Internet Explorer version 11 and up
  - Chrome version 48 and up
  - Firefox version 44 and up

<!-- -->

- On macOS:
  - Firefox version 43 and up
  - Chrome version 48 and up
  - Opera version 35 and up

<!-- -->

- On Linux 14.04:
  - Firefox version 44 and up
  - Chrome version 49 and up
  - Opera 35 and up
