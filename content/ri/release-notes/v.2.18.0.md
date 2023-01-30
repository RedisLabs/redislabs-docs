---
Title: RedisInsight v2.18.0, January 2023
linkTitle: v2.18.0 (Jan 2023)
date: 2022-11-28 00:00:00 +0000
description: RedisInsight v2.18.0
weight: 1
aliases: /ri/release-notes/v2.18.0/
         /ri/release-notes/v2.18.0.md
---
## 2.18.0 (January 2023)
This is the General Availability (GA) release of RedisInsight 2.18.

### Highlights
- Support for SSH tunnel to connect to your Redis database
- Ability to switch between database indexes when staying connected to your database
- Recommendations on how to optimize the usage of your database

### Details
**Features and improvements**
- [#1567](https://github.com/RedisInsight/RedisInsight/pull/1567), [#1576](https://github.com/RedisInsight/RedisInsight/pull/1576), [#1577](https://github.com/RedisInsight/RedisInsight/pull/1577) Connect to your Redis database via SSH tunnel using a password or private key in PEM format
- [#1540](https://github.com/RedisInsight/RedisInsight/pull/1540), [#1608](https://github.com/RedisInsight/RedisInsight/pull/1608) Ability to switch between database indexes when staying connected to your database impacting Browser, Workbench, and Database Analysis
- [#1457](https://github.com/RedisInsight/RedisInsight/pull/1457), [#1465](https://github.com/RedisInsight/RedisInsight/pull/1465), [#1590](https://github.com/RedisInsight/RedisInsight/pull/1590) Run Database Analysis to generate recommendations on how to save memory and optimize the usage of your database. These recommendations have been formed based on industry standards and Redis best practices. Ability to upvote or downvote recommendations in terms of their usefulness. 
- [#1598](https://github.com/RedisInsight/RedisInsight/pull/1598) Added [Monaco Editor](https://microsoft.github.io/monaco-editor/) to the new key form to check and highlight the [JSON](https://redis.io/docs/stack/json/) syntax
- [#1583](https://github.com/RedisInsight/RedisInsight/pull/1583) Highlight the control to change a database alias to make it more visible
- [#1579](https://github.com/RedisInsight/RedisInsight/pull/1579) Increase the database password length limitation to 10,000
