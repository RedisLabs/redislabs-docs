---
Title: RedisTimeSeries 1.10 release notes
linkTitle: v1.10 (July 2023)
description: RESP3 support. Performance improvements.
min-version-db: "7.2"
min-version-rs: "7.2.4"
weight: 95
alwaysopen: false
toc: "true"
categories: ["Modules"]
aliases: 
---
## Requirements

RedisTimeSeries v1.10.4 requires:

- Minimum Redis compatibility version (database): 7.2
- Minimum Redis Enterprise Software version (cluster): 7.2.4

## v1.10 GA (v1.10.4) (July 2023)

This is the General Availability release of RedisTimeSeries 1.10.

### Headlines

RedisTimeSeries 1.10 introduces support for RESP3, performance improvements, and bug fixes.

### Details

Bug fixes (since 1.10-RC3):

- [#1494](https://github.com/RedisTimeSeries/RedisTimeSeries/issues/1494) Potential crash when using an invalid argument value

{{<note>}}
- The version inside Redis will be 1.10.4 in semantic versioning. Since the version of a module in Redis is numeric, we could not add a GA flag.

- Minimal Redis version: 7.2
{{</note>}}
