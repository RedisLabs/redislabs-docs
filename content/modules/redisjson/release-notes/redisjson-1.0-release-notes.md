---
Title: RedisJSON 1.0 Release Notes
description:
weight: 100
alwaysopen: false
categories: ["Modules"]
---
## RedisJSON 1.0.5 (September 2020)

This is a maintenance release for version 1.0.

Headlines:

- This release improves overall stability and provides fixes for issues found after the previous release.

Details:

- Enhancements:
    - Republish docker image based on Redis 6
- Bugfixes:
    - #[200](https://github.com/RedisJSON/RedisJSON/issues/200) Following a call to JSON.ARRPOP and JSON.STRAPPEND, the LRU cache should be invalidated.

## RedisJSON 1.0.4 (February 2019)

## RedisJSON 1.0.3

This release disables the cache by default, and allows an explicit `CACHE` `<ON|OFF>` module argument to enable it.

## RedisJSON 1.0.2 (September 2018)

This release contains some bug fixes over 1.0.2. It also includes some ci changes as well.

## RedisJSON 1.0.1 (December 2017)
