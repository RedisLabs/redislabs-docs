---
Title: RedisInsight v2.14.0, November 2022
linkTitle: v2.14.0 (Nov 2022)
date: 2022-11-28 00:00:00 +0000
description: RedisInsight v2.14.0
weight: 1
aliases: /ri/release-notes/v2.14.0/
         /ri/release-notes/v2.14.0.md
---
## 2.14.0 (November 2022)
This is the General Availability (GA) release of RedisInsight 2.14.

## 2.14.0 (November 2022)
This is the General Availability (GA) release of RedisInsight 2.14.

### Highlights
- Search capabilities: Search per values of your keys in Browser and Tree view using RediSearch, create Search indexes via dedicated UI
- Optimize the column width in the values of hashes, lists, and sorted sets
- Display command processing time in Workbench

### Details
**Features and improvements**
- [#1345](https://github.com/RedisInsight/RedisInsight/pull/1345), [#1346](https://github.com/RedisInsight/RedisInsight/pull/1346), [#1376](https://github.com/RedisInsight/RedisInsight/pull/1376) Search per values of your keys in Browser and Tree view using RediSearch capability, see the list of keys found, and create Search indexes via dedicated UI.
- [#1385](https://github.com/RedisInsight/RedisInsight/pull/1385) Resize the column width of fields and values in hashes, indexes and elements in lists, and scores and members in sorted sets to optimize the view
- [#1354](https://github.com/RedisInsight/RedisInsight/pull/1407) Do not scroll to the end of results by double-clicking a command output in CLI
- [#1347](https://github.com/RedisInsight/RedisInsight/pull/1347) Display the command processing time in Workbench (time taken by RedisInsight backend and Redis to process the command)
- [#1351](https://github.com/RedisInsight/RedisInsight/pull/1351) Display the namespaces section in the Database analysis report even when there are no namespaces
