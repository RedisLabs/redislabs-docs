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

RedisBloom v2.6.3 requires:

- Minimum Redis compatibility version (database): 7.2
- Minimum Redis Enterprise Software version (cluster): 7.2.4

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
