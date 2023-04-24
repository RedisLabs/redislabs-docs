---
Title: RedisInsight v2.24.0, April 2023
linkTitle: v2.24.0 (Mar 2024)
date: 2023-04-27 00:00:00 +0000
description: RedisInsight v2.24
weight: 1
aliases: /ri/release-notes/v2.24.0/
         /ri/release-notes/v2.24.0.md
---
## 2.24 (April 2024)
This is the General Availability (GA) release of RedisInsight 2.24.

### Highlights
- Support for images in custom tutorials: Leverage a newly added support for images in custom RedisInsight tutorials in Workbench to share Redis expertise with your team and community in a graphical representation
- JSON formatter in Workbench: See the output of [JSON.GET](https://redis.io/commands/json.get/), [JSON.MGET](https://redis.io/commands/json.mget/), [GET](https://redis.io/commands/get/) formatted in JSON
- Bulk data upload: Upload the list of Redis commands from a text file using a new bulk upload in Browser. Use the bulk data upload with custom RedisInsight tutorials to quickly upload your example data set


### Details
**Features and improvements**
- [#1936](https://github.com/RedisInsight/RedisInsight/pull/1936), [#1939](https://github.com/RedisInsight/RedisInsight/pull/1939) Leverage a newly added support for images in custom RedisInsight tutorials in Workbench to share Redis expertise with your team and community in a graphical representation. Use markdown syntax described in our [instructions](https://github.com/RedisInsight/Tutorials) to add images to custom tutorials
- [#1946](https://github.com/RedisInsight/RedisInsight/pull/1946) See the output of [JSON.GET](https://redis.io/commands/json.get/), [JSON.MGET](https://redis.io/commands/json.mget/), [GET](https://redis.io/commands/get/) formatted in JSON in Workbench
- [#1930](https://github.com/RedisInsight/RedisInsight/pull/1930)[#1961](https://github.com/RedisInsight/RedisInsight/pull/1961) Upload the list of Redis commands from a text file in bulk using a new bulk upload action that can be found in Browser. Use the bulk data upload with custom RedisInsight tutorials to quickly upload your example data set
- [#1876](https://github.com/RedisInsight/RedisInsight/pull/1876) Delete a key from the list of keys in Browser both in List and Tree view without a need to open the values of keys
- [#1889](https://github.com/RedisInsight/RedisInsight/pull/1889), [#1900](https://github.com/RedisInsight/RedisInsight/pull/1900) Added support for Brotli and PHP GZcompress data decompression on the form to manage your database connection information to view your data in a human-readable format
- [#1886](https://github.com/RedisInsight/RedisInsight/pull/1886) Enhanced command syntax highlights in CLI, Workbench and Command Helper to align them with [redis.io](https://redis.io/commands/)
- [#1975](https://github.com/RedisInsight/RedisInsight/pull/1975) [Renamed](https://github.com/RedisInsight/RedisInsight/issues/1902) the "Display On System Tray" to "Show in Menu Bar" on macOS

**Bugs**
- [#1990](https://github.com/RedisInsight/RedisInsight/pull/1990) Keep the SNI parameters previously specified when a database connection is edited
- [#1999](https://github.com/RedisInsight/RedisInsight/pull/1999) Keep the database index previously set when a database connection is edited
