---
Title: RedisBloom 2.6 release notes
linkTitle: v2.6 (July 2023)
description: RESP3 support. Bug fixes.
min-version-db: "7.2"
min-version-rs: "7.2.4"
weight: 95
alwaysopen: false
toc: "true"
categories: ["Modules"]
aliases: 
---
## Requirements

RedisBloom v2.6.11 requires:

- Minimum Redis compatibility version (database): 7.2
- Minimum Redis Enterprise Software version (cluster): 7.2.4

## v2.6.11 (January 2024)

This is a maintenance release for RedisBloom 2.6.

Update urgency: `HIGH`: There is a critical bug that may affect a subset of users. Upgrade!

Details:

- Bug fixes:

  - [#727](https://github.com/RedisBloom/RedisBloom/pull/727) Potential crash on `CF.LOADCHUNK` (MOD-6344) - Additional fixes

## v2.6.10 (January 2024)

This is a maintenance release for RedisBloom 2.6

Update urgency: `HIGH`: There is a critical bug that may affect a subset of users. Upgrade!

Details:

- Bug fixes:

  - [#735](https://github.com/RedisBloom/RedisBloom/pull/735) Potential crash on `CF.RESERVE` (MOD-6343)
  - [#727](https://github.com/RedisBloom/RedisBloom/pull/727) Potential crash on `CF.LOADCHUNK` (MOD-6344)

## v2.6.9 (December 2023)

This is a maintenance release for RedisBloom 2.6

Update urgency: `LOW`: No need to upgrade unless there are new features you want to use.

Details:

- Bug fixes:

  - [#707](https://github.com/RedisBloom/RedisBloom/pull/707) Top-K: `TOPK.ADD` and `TOPK.QUERY` crash when an item name is an empty string (RED-114676)

## v2.6.8 (October 2023)

This is a maintenance release for RedisBloom 2.6.

Update urgency: `LOW`: No need to upgrade unless there are new features you want to use.

Details:

- Improvements:

  - [#684](https://github.com/RedisBloom/RedisBloom/pull/684), [#685](https://github.com/RedisBloom/RedisBloom/pull/685) Added support for CBL-Mariner 2
  - [#677](https://github.com/RedisBloom/RedisBloom/pull/677), [#678](https://github.com/RedisBloom/RedisBloom/pull/678) Added support for Rocky Linux 9 and RHEL9

## v2.6 GA (v2.6.3) (July 2023)

This is the General Availability release of RedisBloom 2.6.

### Headlines

RedisBloom 2.6 introduces support for RESP3 and bug fixes.

### Details

Improvements: 

- [#664](https://github.com/RedisBloom/RedisBloom/pull/664) `TOPK.ADD`, `TOPK.INCRBY`, and `TOPK.LIST` reply with blob string instead of simple string.

{{<note>}}
- The version inside Redis will be 2.6.3 in semantic versioning. Since the version of a module in Redis is numeric, we could not add a GA flag.

- Minimal Redis version: 7.2
{{</note>}}
