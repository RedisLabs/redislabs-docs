---
Title: RedisJSON 2.4 release notes
linkTitle: v2.4 (November 2022)
description: Low-level API changes in order to support the multi-value indexing and querying support that comes with RediSearch 2.6. RediSearch 2.6 comes with multi-value indexing and querying of attributes for any attribute type (Text, Tag, Numeric, Geo and Vector) defined by a JSONPath leading to an array or to multiple scalar values.
min-version-db: "6.0.16"
min-version-rs: "6.2.18"
weight: 97
alwaysopen: false
categories: ["Modules"]
aliases: /modules/redisjson/release-notes/redisjson-2.4-release-notes/
---
## Requirements

RedisJSON v2.4.8 requires:

- Minimum Redis compatibility version (database): 6.0.16
- Minimum Redis Enterprise Software version (cluster): 6.2.18

## v2.4.8 (January 2024)

This is a maintenance release for RedisJSON 2.4

Update urgency: `MODERATE`: Program an upgrade of the server, but it's not urgent.

> [!IMPORTANT]
> Since v2.4.8 Ubuntu 16.04 and RHEL 7 are no longer supported.

Details:

- Improvements:

  - [#1149](https://github.com/RedisJSON/RedisJSON/pull/1149) Added support for CBL-Mariner 2

- Bug fixes:

  - [#1025](https://github.com/RedisJSON/RedisJSON/pull/1025) `JSON.TOGGLE` - missing keyspace notification

## v2.4.7 (April 2023)

This is a maintenance release for RedisJSON 2.4.

Update urgency: `MODERATE`: Program an upgrade of the server, but it's not urgent.

Details:

- Bug fixes:

  - [#947](https://github.com/RedisJSON/RedisJSON/issues/947) Crash when using array slice operator (`[start:end:step]`) with step `0`

## v2.4.6 (March 2023)

This is a maintenance release for RedisJSON 2.4.

Update urgency: `MODERATE`: Program an upgrade of the server, but it's not urgent.

Details:

- Bug fixes:

  - [#912](https://github.com/RedisJSON/RedisJSON/pull/912) Fix actual memory usage calculation (MOD-4787) 

## v2.4.5 (February 2023)

This is a maintenance release for RedisJSON 2.4.

Update urgency: `LOW`: No need to upgrade unless there are new features you want to use.

Details:

- Improvements:

  - Adds support to Redis Enterprise on Ubuntu Linux 20.04 LTS (Focal Fossa)

## v2.4.4 (February 2023)

This is a maintenance release for RedisJSON 2.4.

Update urgency: `MODERATE`: Program an upgrade of the server, but it's not urgent.

Details:

- Bug fixes:

  - [#919](https://github.com/RedisJSON/RedisJSON/pull/919) Possible failure loading RDB files (MOD-4822)
  
- Improvements:

  - [#725](https://github.com/RedisJSON/RedisJSON/issues/725) Improve error messages
  - [#918](https://github.com/RedisJSON/RedisJSON/pull/918) Add IPv6 to the capabilities list

## v2.4.3 (December 2022)

This is a maintenance release for RedisJSON 2.4.

Update urgency: `MODERATE`: Program an upgrade of the server, but it's not urgent.

Details:

- Bug fixes:

  - [#890](https://github.com/RedisJSON/RedisJSON/pull/890) JSONPath ignores any filter condition beyond the second (MOD-4602)
  
- Improvements:

  - [#892](https://github.com/RedisJSON/RedisJSON/pull/892) Allow `JSON.ARRINDEX` with nonscalar values

## v2.4 GA (v2.4.2) (November 2022)

This is the General Availability release of RedisJSON 2.4.

### Highlights

RedisJSON 2.4 contains several low-level API changes in order to support the multi-value indexing and querying support that comes with RediSearch 2.6. RediSearch 2.6 comes with multi-value indexing and querying of attributes for any attribute type (Text, Tag, Numeric, Geo and Vector) defined by a JSONPath leading to an array or to multiple scalar values.

### What's new in 2.4

- Features:

  - [#848](https://github.com/RedisJSON/RedisJSON/pull/848) Add JSONPath filter the regexp match operator (MOD-4432)
  - [#861](https://github.com/RedisJSON/RedisJSON/pull/861) Support legacy JSONPath with the dollar sign $ (MOD-4436)

- Performance enhancements:

  - [#699](https://github.com/RedisJSON/RedisJSON/pull/699) A new JSONPath library which enhances the performance of parsing any JSONPath expression in RedisJSON.

- Changing behaviour:

  - [#699](https://github.com/RedisJSON/RedisJSON/pull/699) Floating point numbers which become round numbers due to some operation, such as `JSON.NUMINCRBY`, will now return as a floating point with a trailing `.0`, e.g., instead of just `42`, now `42.0` will be returned.

- Bugs fixes (since 2.4-RC1/ v2.4.0):

  - [#850](https://github.com/RedisJSON/RedisJSON/pull/850) Allow repetition of filter relation instead of optional (MOD-4431)

