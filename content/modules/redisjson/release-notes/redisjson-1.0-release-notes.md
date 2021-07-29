---
Title: RedisJSON 1.0 release notes
linkTitle: v1.0 (December 2017)
description:
weight: 100
alwaysopen: false
categories: ["Modules"]
---
## v1.0.7 (December 2020)

This is a maintenance release for version 1.0.

Headlines:

- This release improves overall stability and provides fixes for issues found after the previous release.

Details:

- [#222](https://github.com/RedisJSON/RedisJSON/pull/222) Validate path is not empty.
- [#253](https://github.com/RedisJSON/RedisJSON/pull/253) `NULL` de-reference after error.

## v1.0.5 (September 2020)

This is a maintenance release for version 1.0.

Headlines:

- This release improves overall stability and provides fixes for issues found after the previous release.

Details:

- Enhancements:
    - Republish docker image based on Redis 6
- Bugfixes:
    - #[200](https://github.com/RedisJSON/RedisJSON/issues/200) Following a call to JSON.ARRPOP and JSON.STRAPPEND, the LRU cache should be invalidated.

## v1.0.4 (February 2019)

This release updates the version to 1.0.4.

## v1.0.3 (12 September 2018)

This release disables the cache by default, and allows an explicit `CACHE` `<ON|OFF>` module argument to enable it.

## v1.0.2 (10 September 2018)

This release contains some bug fixes over 1.0.2. It also includes some ci changes as well.

## v1.0.1 (December 2017)

This version provides a serialization cache for JSON.GET (when used with the
default parameters). The cache policy is LRU (last recently used), and extremely
small items are not cached.

In the future, options may be added to configure the cache, but for the time being
the cache is intended to be small and transparent.