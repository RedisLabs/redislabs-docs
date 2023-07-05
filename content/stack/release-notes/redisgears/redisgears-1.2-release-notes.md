---
Title: RedisGears 1.2 release notes
linkTitle: v1.2 (February 2022)
description: Plugins and JVM support. Python async await. Override commands API. Register functions on key miss events. Tracks new statistics. Python profiler support. Extended RedisAI integration.
min-version-db: "6.0.0"
min-version-rs: "6.0.12"
weight: 99
alwaysopen: false
categories: ["Modules"]
aliases: /modules/redisgears/release-notes/redisgears-1.2-release-notes/
         /modules/redisgears/release-notes/redisgears-1.2-release-notes
         /modules/redisgears/release-notes/redisgears-1.2-release-notes.md
---

## Requirements

RedisGears v1.2.6 requires:

- Minimum Redis compatibility version (database): 6.0.0
- Minimum Redis Enterprise Software version (cluster): 6.0.12

## 1.2.6 (March 2023)

This is a maintenance release for RedisGears 1.2.

Update urgency: `LOW` : No need to upgrade unless there are new features or fixes.

### Details

**Features:**
- [#832](https://github.com/RedisGears/RedisGears/pull/832), [#844](https://github.com/RedisGears/RedisGears/pull/844) Added IPV6 support
- [#841](https://github.com/RedisGears/RedisGears/pull/841) Generate artifacts with dependencies included

**Bug fixes:**
- [#810](https://github.com/RedisGears/RedisGears/pull/810) Fix invalid memory access when checking if a trigger is already registered

## v1.2.5 (July 2022)

This is a maintenance release for RedisGears 1.2.

Update urgency: `MODERATE` : Program an upgrade of the server, but it's not urgent.

Details:

- Bug fixes:

    - [#792](https://github.com/RedisGears/RedisGears/issues/792), [#798](https://github.com/RedisGears/RedisGears/pull/798) Execution was triggered infinitely when trimming is turned off.
    - [#791](https://github.com/RedisGears/RedisGears/issues/791), [#796](https://github.com/RedisGears/RedisGears/pull/796) Stop triggering executions during [pause](https://oss.redis.com/redisgears/commands.html#rgpauseregistrations) even on failure.
    - [#794](https://github.com/RedisGears/RedisGears/pull/794), [#797](https://github.com/RedisGears/RedisGears/pull/797) Use [`PythonInstallationDir`](https://oss.redis.com/redisgears/configuration.html#pythoninstallationdir) configuration to find the virtual environment location on Redis Enterprise. (MOD-1734)

## v1.2.4 (May 2022)

This is a maintenance release for RedisGears 1.2.

Update urgency: `LOW` : No need to upgrade unless there are new features you want to use.

Details:

- Improvements:

    - [#772](https://github.com/RedisGears/RedisGears/pull/772) Added the ability to upgrade a dependency at runtime with `FORCE_REQUIREMENTS_REINSTALLATION` on `RG.PYEXECUTE`.
    - [#765](https://github.com/RedisGears/RedisGears/pull/765) Allow deactivating [override Python allocators](https://oss.redis.com/redisgears/configuration.html#overridepythonallocators) for performance improvements.

- Bug fixes:

    - [#761](https://github.com/RedisGears/RedisGears/issues/761), [#760](https://github.com/RedisGears/RedisGears/issues/760), [#778](https://github.com/RedisGears/RedisGears/pull/778) [`StreamReader`](https://oss.redis.com/redisgears/readers.html#streamreader) fixes to pause and unregister stream processing.

## v1.2.3 (April 2022)

This is a maintenance release for RedisGears 1.2.

Update urgency: `LOW` : No need to upgrade unless there are new features you want to use.

Details:

- Improvements:

    - [#739](https://github.com/RedisGears/RedisGears/pull/739) Added TLS support
    - [#734](https://github.com/RedisGears/RedisGears/pull/734) Pause/Unpause registrations
    - [#741](https://github.com/RedisGears/RedisGears/pull/741) Added build for Python-only artifacts

- Bug fixes:

    - [#740](https://github.com/RedisGears/RedisGears/pull/740) Fix -nan value on registration stats

## v1.2.2 (February 2022)

This is the General Availability release of RedisGears 1.2.

### Headlines

#### Plugins and JVM support

RedisGears 1.2 comes with a new plugin mechanism that allows you to decide which languages you want to load into RedisGears. Currently, we support two languages: Python and Java (JVM languages). You can decide which language you want to use using the new `Plugin` configuration.

Full documentation for JVM support can be found on the [Redis documentation website]({{<relref "/stack/gears-v1/jvm">}}).

#### Python async await support

RedisGears provides support for Python coroutines. Each step of your gears function can now be a Python coroutine that will take the execution to the background or will wait for some event to happen. Refer to the following links for more information:

- [Async Await Support](https://oss.redis.com/redisgears/1.2/intro.html#async-await-support)
- [Async Await Advanced Topics](https://oss.redis.com/redisgears/1.2/async_await_advance_topics.html)

#### Override commands API

You can override Redis vanilla commands with a function. For more information, refer to the RedisGears [command hooks](https://oss.redis.com/redisgears/1.2/commands_hook.html) documentation.

#### Key miss event for read-through pattern

Requested by many users, RedisGears 1.2 allows you to register functions on key miss event. One use case for this is to implement a read-through caching pattern. For more information about this topic, refer to the following links:

- [Key Miss Event](https://oss.redis.com/redisgears/1.2/miss_event.html) in the RedisGears documentation.
- [rghibernate](https://github.com/RedisGears/rghibernate) recipe that leverages the key miss event to implement read-through from external databases.

#### Better visibility and analyzing tools

We improved the experience during the development phase by enabling better debugging and troubleshooting. There is still room for improvement but RedisGears 1.2 makes the first steps toward a simpler API that is easier to use. This new version allows you to name your code and upgrade it with a single Redis command. For more information, refer to the [upgrade section](https://oss.redis.com/redisgears/1.2/intro.html#code-upgrades) of the RedisGears introduction documentation.

RedisGears now tracks the following new statistics to better analyze your registrations:

- `lastRunDurationMS` - duration in milliseconds of the last execution
- `totalRunDurationMS` - total runtime of all executions in milliseconds
- `avgRunDurationMS` - average execution runtime in milliseconds

For streams, RedisGears also tracks the following data:

- `lastEstimatedLagMS` - gives the last batch lag (the time difference between the first batch entry in the stream and the time the entire batch finished processing)
- `avgEstimatedLagMS` - average of the `lastEstimatedLagMS` field.

The [`RG.DUMPREGISTRATIONS`](https://oss.redis.com/redisgears/1.2/commands.html#rgdumpregistrations) command exposes these new statistics.

RedisGears 1.2 also adds support for a Python profiler, specifically [`cProfile`](https://docs.python.org/3.7/library/profile.html#module-cProfile). For more information, refer to the documentation for the following commands:

- [`RG.PYPROFILE STATS`](https://oss.redis.com/redisgears/1.2/commands.html#rgpyprofile-stats)
- [`RG.PYPROFILE RESET`](https://oss.redis.com/redisgears/1.2/commands.html#rgpyprofile-reset)

#### RedisAI integration

Although RedisAI integration was already supported in v1.0, RedisGears 1.2 adds official support for all capabilities in [RedisAI v1.2](https://oss.redis.com/redisgears/1.2/redisai.html). The API was extended to support [RedisAI DAG](https://oss.redis.com/redisai/commands/#aidagexecute) and was combined with the new async await API to achieve the best performance possible.

### Details

Bug fixes (since 1.0.9):

- [#557](https://github.com/RedisGears/RedisGears/pull/557), [#554](https://github.com/RedisGears/RedisGears/issues/554) `RG.CONFIGGET` returns user-defined configuration
- [#572](https://github.com/RedisGears/RedisGears/pull/572) Lock Redis GIL when creating RedisAI DAG
- [#661](https://github.com/RedisGears/RedisGears/pull/661), [#536](https://github.com/RedisGears/RedisGears/issues/536) Added `RG.TRIGGERONKEY`
- [#650](https://github.com/RedisGears/RedisGears/issues/650) Do not propagate `MULTI EXEC` on Redis 7
- [#671](https://github.com/RedisGears/RedisGears/pull/671), [#558](https://github.com/RedisGears/RedisGears/issues/558) Wait for cluster to be initialized when reading stream data
- [#656](https://github.com/RedisGears/RedisGears/pull/656) Stream reader creates more than one execution on a stream
- [#676](https://github.com/RedisGears/RedisGears/pull/676) Globals dictionary not set correctly after deserialization
- [#665](https://github.com/RedisGears/RedisGears/issues/665), [#679](https://github.com/RedisGears/RedisGears/pull/679) Allow case-insensitive event type on command reader
- [#697](https://github.com/RedisGears/RedisGears/pull/697) `hashtag()` function for Redis Enterprise
- [#688](https://github.com/RedisGears/RedisGears/pull/688), [#545](https://github.com/RedisGears/RedisGears/issues/545) Check `REDISMODULE_CTX_FLAGS_DENY_BLOCKING` flag before blocking the client

{{<note>}}
- This is the first GA version of 1.2. The version inside Redis is 1.2.2 in semantic versioning. Since the version of a module in Redis is numeric, we could not add a GA flag.

- Minimum Redis version: 6.0.0
{{</note>}}
