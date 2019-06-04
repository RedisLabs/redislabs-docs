---
Title: Database clustering
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
[Redis](https://redislabs.com/redis-features/redis) is (mostly) a
single-threaded process. This is a design decision that allows it to be
extremely performant while keeping its implementation simple. However,
the downside of that architectural choice is that Redis cannot be easily
scaled. A single Redis process is ultimately bound by the CPU core on
which it is running, as well as the amount of memory the server has.

To overcome these limitations, Redis Enterprise Software (RS) supports
database clustering. A database cluster is a set of Redis processes, in
which each process manages a subset of the database's keyspace. This
allows you to overcome scaling challenges through horizontal scaling by
using the RAM resources of multiple cores and multiple servers.

In a Redis database cluster, the keyspace is partitioned into hash
slots. At any given time a slot resides on and is managed by, a single
node. Each node that belongs to a Redis database cluster can manage
multiple slots. This division of the key space, a.k.a. sharding, is
achieved by hashing the keys' names, or parts of these (key hash tags),
to obtain the slot where a key should reside.

Despite running multiple Redis processes, database clustering is nearly
transparent to the application using it. The database cluster is
accessible through a single endpoint that automatically routes all
operations to the relevant shards, without requiring a cluster-aware
Redis client. This allows applications to benefit from using the
database clustering without performing any code changes, even if they
were not designed beforehand to use it.

## Abbreviations

Tag / Hash Tag
A part of the key that is used in the hash calculation.

Slot / Hash Slot
The result of the hash calculation.

Shard
Redis process that is part of the Redis clustered database.

## When to use sharding

Sharding the keyspace is an efficient way of scaling Redis that should
be employed when:

- The dataset is large enough to benefit from using the RAM resources
    of more than one server. We recommend sharding a dataset
    once it reaches a size of 25 GB (50 GB for RoF).
- The operations performed against the database are CPU-intensive,
    resulting in performance degradation. By having multiple CPU cores
    manage the database's shards, the load of operations is distributed
    among them.

## Number of shards

When enabling database clustering you can set the number of database
shards. The minimum number of shards per database is 2 and the maximum
depends on the subscription you purchased.

Once database clustering has been enabled and the number of shards has
been set, you cannot disable database clustering or reduce the number of
shards. You can only increase the number of shards by a multiple of the
current number of shards. For example, if the current number of shards
was 3, you can increase to 6, 9, 12 and so on. An exception to this is a
RediSearch Enterprise enabled database. Once you configure the number of
shards, you can no longer change that value. If you need to scale your
RediSearch Enterprise enabled database, you must create a new database
at the new required size and replicate the current database to the new
one.

## Supported sharding policies

### Standard hashing policy

When using the standard hashing policy, a clustered database behaves
just like a standard, open-source, Redis cluster:

- **Keys with a hash tag**: a key's hash tag is any substring between
    '{' and '}' in the key's name. That means that when a key's name
    includes the pattern '{...}', the hash tag is used as input for the
    hashing function. For example, the following key names have the same
    hash tag and would, therefore, be mapped to the same slot: foo{bar},
    {bar}baz, foo{bar}baz.
- **Keys without a hash tag**: when a key does not contain the '{...}'
    pattern, the entire key's name is used for hashing.

You can use the '{...}' pattern to direct related keys to the same hash
slot so that multi-key operations can be executed on these keys. On the
other hand, not using a hash tag in the key's name results in a
(statistically) even distribution of keys across the keyspace's shards.
If your application does not perform multi-key operations, you do not
need to construct key names with hash tags.

### Custom hashing policy

A clustered database can be configured to a custom hashing policy. A
custom hashing policy is required when different keys need to be kept
together on the same shard to allow multi-key operations. The custom
hashing policy is provided through a set of Perl Compatible Regular
Expressions (PCRE) rules that describe the dataset's key name patterns.

To configure a custom hashing policy, enter the regular expression
(RegEx) rules that identify the substring in the key's name - hash tag
-- on which hashing will be done. The hashing tag is denoted in the
RegEx by the use of the \`tag\` named subpattern. Different keys that
have the same hash tag will be stored and managed in the same slot.

Once you enable the custom hashing policy, the following default RegEx
rules are implemented. Update these rules to fit your specific logic:

|  RegEx Rule | Description |
|  ------ | ------ |
|  .\*{(?\<tag\>.\*)}.\* | Hashing is done on the substring between the curly braces. |
|  (?\<tag\>.\*) | The entire key's name is used for hashing. |

You can modify existing rules, add new ones, delete rules or change
their order to suit your application's requirements.

### Custom hashing policy notes and limitations

1. You can define up to 32 RegEx rules, each up to 256 characters.
2. RegEx rules are evaluated in their order and the first rule matched
    is used. Therefore, strive to place common key name patterns at the
    beginning of the rule list.
3. Key names that do not match any of the RegEx rules will trigger an
    error.
4. The '.\*(?\<tag\>)' RegEx rule forces keys into a single slot
    because the hash key will always be empty. Therefore, when used,
    this should be the last, catch-all rule.
5. The following flag is enabled in the regular expression parser:
    PCRE_ANCHORED: the pattern is constrained to match only at the
    start of the string being searched.

## Changing the sharding policy

The sharding policy of a clustered database can be changed. However,
most sharding policy changes trigger the deletion (i.e., FLUSHDB) of the
data before they can be applied.

Examples of such changes include:

- Changing the hashing policy from standard to custom or conversely,
    custom to standard.
- Changing the order of custom hashing policy rules.
- Adding new rules in the custom hashing policy.
- Deleting rules from the custom hashing policy.

**Note:** The recommended workaround for updates that are not enabled,
or require flushing the database, is to back up the database and import
the data to a newly configured database.

## Multi-Key operations

Operations on multiple keys in a clustered database are supported with
the following limitations:

- **Multi-key commands**: Redis offers several commands that accept
    multiple keys as arguments. In a clustered database, most multi-key
    commands are not allowed across tags. The following multi-key
    commands **are allowed** across tags: DEL, MSET, MGET, KEYS, HMGET,
    HMSET, FLUSHALL, EXISTS.

    **Note**: When using these commands in a sharded setup, the command
    is distributed across multiple shards and the responses from all
    shards are combined into a single response.

    All other multi-key commands are **not allowed** across tags and if
    used across tags will return an error.
    Examples of such commands are: BITOP, BLPOP, BRPOP, BRPOPLPUSH,
    MSETNX, RPOPLPUSH, SDIFF, SDIFFSTORE, SINTER, SINTERSTORE, SMOVE,
    SORT, SUNION, XREAD, XREADGROUP, ZINTERSTORE, ZUNIONSTORE.

- **Geo commands**: In GEORADIUS/GEOREADIUSBYMEMBER commands, the
    STORE and STOREDIST option can only be used when all affected keys
    reside in the same slot.
- **Transactions**: All operations within a WATCH / MULTI / EXEC block
    should be performed on keys that have the same tag.
- **Lua scripts**: All keys used by a Lua script must have the same
    tag and must be provided as arguments to the EVAL / EVALSHA commands
    (as per the Redis specification). Using keys in a Lua script that
    were not provided as arguments might violate the sharding concept
    but will not result in the proper violation error being returned.
- **Renaming keys**: The use of the RENAME / RENAMENX commands is
    allowed only when the key's original and new values are mapped to
    the same tag.
