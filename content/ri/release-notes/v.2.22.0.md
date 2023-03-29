---
Title: RedisInsight v2.22.0, March 2023
linkTitle: v2.22.0 (Mar 2023)
date: 2023-03-30 00:00:00 +0000
description: RedisInsight v2.22.0
weight: 1
aliases: /ri/release-notes/v2.22.0/
         /ri/release-notes/v2.22.0.md
---
## 2.22.0 (March 2023)
This is the General Availability (GA) release of RedisInsight 2.22.

### Highlights
- Showcase your Redis expertise to your team or the wider community by building custom RedisInsight tutorials! These tutorials are easy to write and are an ideal way to describe practical implementations of Redis. Also, convenient to follow and interact with, in the context of a connected Redis database!
- Take a quick tour of RedisInsight to discover how it can enhance your development experience when building with Redis. 
- Select from a list of supported decompression formats to view your data in a human-readable format.


### Details
**Features and improvements**
- [#1782](https://github.com/RedisInsight/RedisInsight/pull/1782), [#1813](https://github.com/RedisInsight/RedisInsight/pull/1813) Showcase your Redis expertise to your team or the wider community by building custom RedisInsight tutorials. The tutorials follow the Markdown syntax and are easy to write. They are an ideal way to describe practical implementations of Redis as you can conveniently follow and interact with the described commands in the context of an already connected Redis database! Check out these [instructions](https://github.com/RedisInsight/Tutorials) to start creating your own tutorials and let the community discover your content by labelling your GitHub repository with [redis-tutorials](https://github.com/topics/redis-tutorials).
- [#1834](https://github.com/RedisInsight/RedisInsight/pull/1834) Take a quick tour of RedisInsight to discover how it can enhance your development experience. To start the tour, open the Help Center (located above the Settings icon) and reset the onboarding.
- [#1742](https://github.com/RedisInsight/RedisInsight/pull/1742), [#1753](https://github.com/RedisInsight/RedisInsight/pull/1753), [#1755](https://github.com/RedisInsight/RedisInsight/pull/1755), [#1762](https://github.com/RedisInsight/RedisInsight/pull/1762) Select one of the supported formats to view your data in a human-readable format. The following decompression formats are available and configurable when adding a database connection: GZIP, LZ4, ZSTD, SNAPPY.
- [#1787](https://github.com/RedisInsight/RedisInsight/pull/1787) UX improvements to the index search feature in Browser: enable the search box after the index is selected.

**Bugs**
- [#1808](https://github.com/RedisInsight/RedisInsight/pull/1808) Prevent errors when running docker RedisInsight on Safari Version 16.2.
- [#1835](https://github.com/RedisInsight/RedisInsight/pull/1835) Display total memory and total keys for replicas in Sentinel.
