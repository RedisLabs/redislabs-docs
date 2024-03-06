---
Title: RedisJSON 2.6 release notes
linkTitle: v2.6 (July 2023)
description: RESP3 support. New commands JSON.MERGE and JSON.MSET.
min-version-db: "7.2"
min-version-rs: "7.2.4"
weight: 96
alwaysopen: false
toc: "true"
categories: ["Modules"]
aliases: 
---
## Requirements

RedisJSON v2.6.9 requires:

- Minimum Redis compatibility version (database): 7.2
- Minimum Redis Enterprise Software version (cluster): 7.2.4

## v2.6.9 (January 2024)

This is a maintenance release for RedisJSON 2.6

Update urgency: `MODERATE`: Program an upgrade of the server, but it's not urgent.

Details:

- Improvements:

   - [#1131](https://github.com/RedisJSON/RedisJSON/issues/1131), [#1143](https://github.com/RedisJSON/RedisJSON/pull/1143) **BREAKING** - Revert JSONPath default path value from `$` to `.` under RESP3 (MOD-6156)

- Bug fixes:

  - [#1095](https://github.com/RedisJSON/RedisJSON/pull/1095) Fix for RediSearch deadlock. See RediSearch 2.8.10 release notes (MOD-5895)

## v2.6.8 (November 2023)

This is a maintenance release for RedisJSON 2.6

Update urgency: `LOW`: No need to upgrade unless there are new features you want to use.

Details:

> [!IMPORTANT]
> Since v2.6.8 RHEL 7 is no longer supported.

This is a version number alignment with RedisJSON for Redis Enterprise (with Active-Active support).

## v2.6.7 (October 2023)

This is a maintenance release for RedisJSON 2.6.

Update urgency: `LOW`: No need to upgrade unless there are new features you want to use.

Details:

- Improvements:

  - [#1102](https://github.com/RedisJSON/RedisJSON/pull/1102) Added support for CBL-Mariner 2
  - [#1099](https://github.com/RedisJSON/RedisJSON/pull/1099) Added support for RHEL9 and Rocky Linux 9

## v2.6.6 (August 2023)

This is a maintenance release for RedisJSON 2.6.

Update urgency: `LOW`: No need to upgrade unless there are new features you want to use.

Details:

This is just a version number alignment with RedisJSON for Redis Enterprise (with Active-Active support).

## v2.6 GA (v2.6.4) (July 2023)

This is the General Availability release of RedisJSON 2.6.

### Headlines

RedisJSON 2.6 introduces support for RESP3 and new commands.

### What's new in 2.6

- Introduce [`JSON.MERGE`](https://redis.io/commands/json.merge) in compliance with [RFC 7396](https://datatracker.ietf.org/doc/html/rfc7396), supporting:

  - Creating new attributes on an existing JSON document

  - Updating and replacing values in parent and child attributes

  - Deleting existing attributes (by setting the value to `null`)

  - Array update - replacing an entire array with the new value

- Introduce [`JSON.MSET`](https://redis.io/commands/json.mset/), supporting atomic multiple sets for keys in the same hash slot

- New `FORMAT` argument in `JSON.ARRPOP` and `JSON.GET` to retrieve the results as JSON strings or RESP3 hierarchical structures (RESP3 only)

- `JSON.RESP` is now regarded as deprecated

- Legacy paths (paths that don't start with either `$.` or `$[` or equal to `$`), except those starting with `.`, are now deprecated

{{<note>}}
- The version inside Redis will be 2.6.4 in semantic versioning. Since the version of a module in Redis is numeric, we could not add a GA flag.

- Minimal Redis version: 7.2
{{</note>}}
