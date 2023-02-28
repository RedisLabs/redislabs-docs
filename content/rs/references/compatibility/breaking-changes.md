---
Title: Redis breaking changes
linkTitle: Breaking changes
description: Potentially breaking changes in Redis Enterprise, introduced by new versions of open source Redis. 
weight: 90
alwaysopen: false
toc: "false"
categories: ["RS"]
aliases: 
---

When new major versions of open source Redis change existing commands, upgrading your database to a new version can potentially break some functionality. Before you upgrade, we recommend you read the provided list of breaking changes that affect Redis Enterprise and update any applications that connect to your database to handle these changes.

To check your Redis database version (`redis_version`), you can use the admin console or run the [`INFO`](https://redis.io/commands/info/) command with [`redis-cli`]({{<relref "/rs/references/cli-utilities/redis-cli">}}):

```sh
$ redis-cli -p <port> INFO
"# Server
redis_version:7.0.8
..."
```

## Redis 7.0 breaking changes

Open source Redis version 7.0 introduces the following potentially breaking changes to Redis Enterprise:

- Hide the `may_replicate` flag from the [`COMMAND`](https://redis.io/commands/command/) command response ([#10744](https://github.com/redis/redis/pull/10744))

- Block [`PFCOUNT`](https://redis.io/commands/pfcount/) and [`PUBLISH`](https://redis.io/commands/publish/) in read-only scripts (*_RO commands and no writes) ([#10744](https://github.com/redis/redis/pull/10744))

- Rephrased some error responses about invalid commands or arguments ([#10612](https://github.com/redis/redis/pull/10612))

- Lua scripts do not have access to the `print()` function ([#10651](https://github.com/redis/redis/pull/10651))

- [`SORT`](https://redis.io/commands/sort/)/[`SORT_RO`](https://redis.io/commands/sort_ro/) commands reject key access patterns in `GET` and `BY` if the ACL doesn't grant the command full keyspace access ([#10340](https://github.com/redis/redis/pull/10340))

- [`XCLAIM`](https://redis.io/commands/xclaim/)/[`XAUTOCLAIM`](https://redis.io/commands/xautoclaim/) skips deleted entries instead of replying with `nil` and deletes them from the pending entry list ([#10227](https://github.com/redis/redis/pull/10227))

- Fix messed up error codes returned from [`EVAL`](https://redis.io/commands/eval/) scripts ([#10218](https://github.com/redis/redis/pull/10218), [#10329](https://github.com/redis/redis/pull/10329))

- [`ACL GETUSER`](https://redis.io/commands/acl-getuser/) reply now uses ACL syntax for `keys` and `channels` ([#9974](https://github.com/redis/redis/pull/9974))

- [`COMMAND`](https://redis.io/commands/command/) reply drops `random` and `sort-for-scripts` flags, which are now part of command tips ([#10104](https://github.com/redis/redis/pull/10104))

- [`LPOP`](https://redis.io/commands/lpop/)/[`RPOP`](https://redis.io/commands/rpop/) with count against a nonexistent list returns a null array ([#10095](https://github.com/redis/redis/pull/10095))

- [`INFO`](https://redis.io/commands/info/) `commandstats` now shows the stats per sub-command ([#9504](https://github.com/redis/redis/pull/9504))

- [`ZPOPMIN`](https://redis.io/commands/zpopmin/)/[`ZPOPMAX`](https://redis.io/commands/zpopmax/) used to produce wrong replies when count is 0 with non-zset ([#9711](https://github.com/redis/redis/pull/9711))

- [`LPOP`](https://redis.io/commands/lpop/)/[`RPOP`](https://redis.io/commands/rpop/) used to produce wrong replies when count is 0 ([#9692](https://github.com/redis/redis/pull/9692))

- Most [`CONFIG SET`](https://redis.io/commands/config-set/), [`REWRITE`](https://redis.io/commands/config-rewrite/), [`RESETSTAT`](https://redis.io/commands/config-resetstat/) commands are now allowed during loading ([#9878](https://github.com/redis/redis/pull/9878))

- Fix ACL category for [`SELECT`](https://redis.io/commands/select/), [`WAIT`](https://redis.io/commands/wait/), [`ROLE`](https://redis.io/commands/role/), [`LASTSAVE`](https://redis.io/commands/lastsave/), [`READONLY`](https://redis.io/commands/readonly/), [`READWRITE`](https://redis.io/commands/readwrite/), [`ASKING`](https://redis.io/commands/asking/) ([#9208](https://github.com/redis/redis/pull/9208))
