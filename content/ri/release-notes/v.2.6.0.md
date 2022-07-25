---
Title: RedisInsight v2.6.0, July 2022
linkTitle: v2.6.0 (July 2022)
date: 2022-07-25 00:00:00 +0000
description: RedisInsight v2.6.0
weight: 1
aliases: /ri/release-notes/v2.6.0/
         /ri/release-notes/v2.6.0.md
---

## 2.6.0 (July 2022)
This is the General Availability (GA) release of RedisInsight 2.6.0

### Headlines:
- Bulk actions: Delete the keys in bulk based on the filters set in Browser or Tree view
- Multiline support for key values in Browser and Tree View: click the key value to see it in full
- [Pipeline](https://redis.io/docs/manual/pipelining/) support in Workbench: batch Redis commands in Workbench to optimize round-trip times
- In-app notifications: added a mechanism to inform about important changes, updates or announces inside of the application. Notifications are always available in the Notification center, and can be displayed with or without preview.

### Details
**Features and improvements:**
- [#890](https://github.com/RedisInsight/RedisInsight/pull/890), [#883](https://github.com/RedisInsight/RedisInsight/pull/883), [#875](https://github.com/RedisInsight/RedisInsight/pull/875), Bulk delete is available in Browser and Tree view to delete keys in bulk from your Redis database according to filters set by key name or data type.
- [#878](https://github.com/RedisInsight/RedisInsight/pull/878), Multiline support for key values in Browser and Tree View - click on the truncated value to expand the row and see the full value, click one more time to collapse it
- [#837](https://github.com/RedisInsight/RedisInsight/pull/837), [#838](https://github.com/RedisInsight/RedisInsight/pull/838), Added [pipeline](https://redis.io/docs/manual/pipelining/) support for commands run in Workbench to optimize round-trip times. Default number of commands sent in a pipeline is 5, and is configurable in the "Advanced" section on the Settings page. 
- [#862](https://github.com/RedisInsight/RedisInsight/pull/862), [#840](https://github.com/RedisInsight/RedisInsight/pull/840), Added in-app notifications to inform about any important changes, updates or announces. Notifications are always available in the Notification center, and can be displayed with or without preview.
- [#830](https://github.com/RedisInsight/RedisInsight/pull/830), Stream entry ID and controls to remove the Stream entry are always displayed irregardless of the number of fields to comfortably explore and work with Stream data
- [#928](https://github.com/RedisInsight/RedisInsight/pull/928), Remember the sorting on the list of databases
- [#937](https://github.com/RedisInsight/RedisInsight/pull/937), Do not require permissions for the DBSIZE command to connect to Redis database

**Bugs Fixed:**
- [#932](https://github.com/RedisInsight/RedisInsight/pull/932), Refresh the JSON value in Browser/Tree view

