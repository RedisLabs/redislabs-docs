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
- Work with your own predefined examples, commands and data, present and share your Redis and Redis Stack experience with others using custom tutorials in Workbench!
- Explore a quick tour of RedisInsight to discover how RedisInsight can enhance your Redis and Redis Stack experience
- Select supported decompression formats to see your data in a human-readable format

### Details
**Features and improvements**
- [#1782](https://github.com/RedisInsight/RedisInsight/pull/1782), [#1813](https://github.com/RedisInsight/RedisInsight/pull/1813) Work with your own predefined examples, commands and data, present and share your Redis and Redis Stack experience with others using custom tutorials that can be uploaded and displayed in RedisInsight Workbench. Follow simple [instructions](https://github.com/RedisInsight/Tutorials) to start creating your own tutorials. Share them with others by adding the [redis-tutorials](https://github.com/topics/redis-tutorials) label to your GitHub repository or just sharing them by links or archives to upload.
- [#1834](https://github.com/RedisInsight/RedisInsight/pull/1834) Explore a quick tour of RedisInsight to discover how RedisInsight can cover your use cases and enhance your Redis and Redis Stack experience. To start the tour, open the Help Center (located above the Settings page) and reset the onboarding.
- [#1742](https://github.com/RedisInsight/RedisInsight/pull/1742), [#1753](https://github.com/RedisInsight/RedisInsight/pull/1753), [#1755](https://github.com/RedisInsight/RedisInsight/pull/1755), [#1762](https://github.com/RedisInsight/RedisInsight/pull/1762) Select one of the supported decompression formats to see your data in a human-readable format. The following decompression formats are available on the list of database connections: GZIP, LZ4, ZSTD, SNAPPY.
- [#1787](https://github.com/RedisInsight/RedisInsight/pull/1787) Disable the search per values of keys in Browser until an index is selected.


**Bugs**
- [#1808](https://github.com/RedisInsight/RedisInsight/pull/1808) Prevent errors when running docker RedisInsight on Safari Version 16.2.
- [#1835](https://github.com/RedisInsight/RedisInsight/pull/1835) Display actual total memory and total keys for replicas in Sentinel.
