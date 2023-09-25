---
Title: RedisInsight v2.34.0, September 2023
linkTitle: v2.34.0 (September 2023)
date: 2023-09-28 00:00:00 +0000
description: RedisInsight v2.34
weight: 1
aliases: /ri/release-notes/v2.34.0/
         /ri/release-notes/v2.34.0.md
---
## 2.34 (September 2023)
This is the General Availability (GA) release of RedisInsight 2.34.

### Highlights
- Quickly import your existing free [Redis Enterprise Cloud](https://redis.com/comparisons/oss-vs-enterprise/?utm_source=redisinsight&utm_medium=rel_notes&utm_campaign=2_34) database using in-app social signup (Google or GitHub). Use it with the RedisInsight interactive tutorials to learn how to leverage Vector Similarity Search for your AI use cases or discover the power of the native JSON data structure supporting structured querying and full-text search, or try new [Triggers and Functions](https://redis.com/blog/introducing-triggers-and-functions/?utm_source=redisinsight&utm_medium=rel_notes&utm_campaign=2_34) feature, and more 
- Ability to update the list of [Search and query](https://redis.io/docs/interact/search-and-query/?utm_source=redisinsight&utm_medium=main&utm_campaign=main) indexes displayed in Browser
- Set the color theme to follow the system preferences
 
### Details
 
**Features and improvements** 
- [#2585](https://github.com/RedisInsight/RedisInsight/pull/2585) Quickly import your existing free [Redis Enterprise Cloud](https://redis.com/comparisons/oss-vs-enterprise/?utm_source=redisinsight&utm_medium=rel_notes&utm_campaign=2_34) database or create a new one in your existing Redis Enterprise Cloud subscription using in-app social signup (Google or GitHub). Use this database with the RedisInsight interactive tutorials to learn how to leverage Vector Similarity Search for your AI use cases or discover the power of the native JSON data structure supporting structured querying and full-text search, or try new [Triggers and Functions](https://redis.com/blog/introducing-triggers-and-functions/?utm_source=redisinsight&utm_medium=rel_notes&utm_campaign=2_34) feature, and more. To do so, click the "Try Redis Cloud" banner in the list of database connections page and follow the steps
- [#2606](https://github.com/RedisInsight/RedisInsight/pull/2606) Ability to update the list of [Search and query](https://redis.io/docs/interact/search-and-query/?utm_source=redisinsight&utm_medium=main&utm_campaign=main) indexes displayed in Browser
- [#2593](https://github.com/RedisInsight/RedisInsight/pull/2593) UX optimizations to improve the navigation from your Redis or Redis Stack instance to the list of databases, and navigation enhancements in Browser for small resolutions
- [#2599](https://github.com/RedisInsight/RedisInsight/pull/2599) Added an option to set the color theme to follow the system preferences
- [#2563](https://github.com/RedisInsight/RedisInsight/pull/2563) Load a new library from the Functions tab within the [Triggers and Functions](https://redis.com/blog/introducing-triggers-and-functions/?utm_source=redisinsight&utm_medium=main&utm_campaign=main) tool
- [#2496](https://github.com/RedisInsight/RedisInsight/pull/2496) Set milliseconds as a default unit in Slow Log

**Bugs**
- [#2587](https://github.com/RedisInsight/RedisInsight/pull/2587) Display detailed [errors](https://github.com/RedisInsight/RedisInsight/issues/2562) in transactions run via CLI or Workbench
