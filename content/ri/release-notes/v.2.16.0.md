---
Title: RedisInsight v2.16.0, December 2022
linkTitle: v2.16.0 (Dec 2022)
date: 2022-12-28 00:00:00 +0000
description: RedisInsight v2.16.0
weight: 1
aliases: /ri/release-notes/v2.16.0/
         /ri/release-notes/v2.16.0.md
---
## 2.16.0 (December 2022)
This is the General Availability (GA) release of RedisInsight 2.16.

### Highlights
- Import database connections from other Redis UIs to quickly migrate to RedisInsight v2
- Highlight new major features after the RedisInsight version is updated
- Pre-populate database host, port, and database alias on the form to add Redis databases
- Navigation enhancements for the Tree view

### Details
**Features and improvements**
- [#1492](https://github.com/RedisInsight/RedisInsight/pull/1492), [#1497](https://github.com/RedisInsight/RedisInsight/pull/1497), [#1500](https://github.com/RedisInsight/RedisInsight/pull/1500), [#1502](https://github.com/RedisInsight/RedisInsight/pull/1502) Import database connections from other Redis UIs to quickly migrate to RedisInsight v2, including database connections with SNI, CA and Client certificates. See the detailed summary of the import process once it is finished
- [#1484](https://github.com/RedisInsight/RedisInsight/pull/1484) After updating a RedisInsight version, new major features will be highlighted with additional details to clearly describe their capabilities
- [#1506](https://github.com/RedisInsight/RedisInsight/pull/1506) Pre-populate database host (127.0.0.1), port (6379, or 26379 for [Sentinel](https://redis.io/docs/management/sentinel/) connection type), and database alias on the form to add Redis databases
- [#1473](https://github.com/RedisInsight/RedisInsight/pull/1473) "Browser" view is renamed to the "List" view to avoid confusion with the Browser tool
- [#1464](https://github.com/RedisInsight/RedisInsight/pull/1464) Navigation enhancements for the Tree view, covering cases when filters are applied, the list of keys is refreshed or the view is switched to the Tree view
- [#1481](https://github.com/RedisInsight/RedisInsight/pull/1481), [#1482](https://github.com/RedisInsight/RedisInsight/pull/1482), [#1489](https://github.com/RedisInsight/RedisInsight/pull/1489) Indicate new database connections that have been manually added, auto-discovered or imported, but not opened
- [#1499](https://github.com/RedisInsight/RedisInsight/pull/1499) Display values of [JSON](https://redis.io/docs/stack/json/) keys when [JSON.DEBUG MEMORY](https://redis.io/commands/json.debug-memory/) is not available

**Bugs**
- [TBD] Scan the database even when the [DBSIZE](https://redis.io/commands/dbsize/) returns 0
