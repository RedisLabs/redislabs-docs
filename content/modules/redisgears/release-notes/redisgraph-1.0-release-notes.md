---
Title: RedisGears 1.0 Release Notes
description:
weight: 100
alwaysopen: false
categories: ["Modules"]
---
## RedisGears 1.0.0 (May 2020)

This is the first GA Release of RedisGears (v1.0.0).

Highlights:

- Program everything you want in Redis - With a built-in C-API and Python interpreter, RedisGears lets you use full-fledged Python scripts and libraries to process data inside Redis.
- Write once, deploy anywhere - Write your functions against a standalone Redis database and deploy them to production clusters—with no changes required.
- Run your serverless engine where your data lives - RedisGears lets you process events and streams faster by running in memory next to your data in Redis.

To get started please check out [redisgears.io](https://oss.redislabs.com/redisgears/). We plan to release a blogpost soon and will cross link it here.

Bugfixes (compared to RC1):

- #[288](https://github.com/RedisGears/RedisGears/issues/288) dependencies with version will not crash the server.
- #[309](https://github.com/RedisGears/RedisGears/issues/309), #[313](https://github.com/RedisGears/RedisGears/issues/313) Prevent crashes on [RedisAI](https://oss.redislabs.com/redisai/) intergration and update the low level C api of RedisAI.
- #[311](https://github.com/RedisGears/RedisGears/issues/311) Fix out-of-order reply in certain situations.
- #[321](https://github.com/RedisGears/RedisGears/issues/321) Return error when unknown argument is given.

Compiled binaries:

- [Boinic](http://redismodules.s3.amazonaws.com/redisgears/redisgears.linux-bionic-x64.1.0.0.zip)
- [Xenial](http://redismodules.s3.amazonaws.com/redisgears/redisgears.linux-xenial-x64.1.0.0.zip)
- [Centos](http://redismodules.s3.amazonaws.com/redisgears/redisgears.linux-centos7-x64.1.0.0.zip)

{{% note %}}
- The version inside Redis will be 10000 or 1.0.0 in semantic versioning.
- This version requires the Redis version to be 6.0 and above.
{{% /note %}}
