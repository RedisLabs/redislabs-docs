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

RedisTimeSeries v1.10.11 requires:

- Minimum Redis compatibility version (database): 7.2
- Minimum Redis Enterprise Software version (cluster): 7.2.4

## v1.10.11 (October 2023)

This is a maintenance release for RedisTimeSeries 1.10.

Update urgency: `LOW`: No need to upgrade unless there are new features you want to use.

Details:

- Bug fixes:

  - [LibMR#51](https://github.com/RedisGears/LibMR/pull/51) Crash on SSL initialization failure (MOD-5647)
  - [#1538](https://github.com/RedisTimeSeries/RedisTimeSeries/pull/1538) Amazon Linux 2: crash on SSL initialization. We now use openssl11-devel instead of openssl-devel (MOD-6015)

## v1.10.9 (October 2023)

This is a maintenance release for RedisTimeSeries 1.10.

Update urgency: `LOW`: No need to upgrade unless there are new features you want to use.

Details:

- Improvements:

  - [#1516](https://github.com/RedisTimeSeries/RedisTimeSeries/pull/1516) Added support for CBL-Mariner 2
  - [#1514](https://github.com/RedisTimeSeries/RedisTimeSeries/pull/1514) Added support for Rocky Linux 9 and RHEL9

## v1.10.6 (September 2023)

This is a maintenance release for RedisTimeSeries 1.10.

Update urgency: `SECURITY`: There are security fixes in the release.

Details:

- Security and privacy:

  - [#1506](https://github.com/RedisTimeSeries/RedisTimeSeries/pull/1506) Don’t expose internal commands (MOD-5643)

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
