---
Title: RedisInsight v2.40.0, December 2023
linkTitle: v2.40.0 (December 2023)
date: 2023-12-27 00:00:00 +0000
description: RedisInsight v2.40
weight: 1
aliases: /ri/release-notes/v2.40.0/
         /ri/release-notes/v2.40.0.md
---
## 2.40 (December 2023)
This is the General Availability (GA) release of RedisInsight 2.40.

### Highlights
- UX improvements for a seamless and simplified in-app provision of your free [Redis Cloud](https://redis.com/comparisons/oss-vs-enterprise/?utm_source=redisinsight&utm_medium=rel_notes&utm_campaign=2_40) database with preselected Cloud vendor and region
- See plan, Cloud vendor, and region details after successfully provisioning your free [Redis Cloud](https://redis.com/comparisons/oss-vs-enterprise/?utm_source=redisinsight&utm_medium=rel_notes&utm_campaign=2_40) database
- Optimizations to upload large text files with the list of Redis commands via bulk actions in Browser

### Details

**Features and improvements**
- [#2879](https://github.com/RedisInsight/RedisInsight/pull/2879) UX improvements for a seamless and simplified in-app provision of your free [Redis Cloud](https://redis.com/comparisons/oss-vs-enterprise/?utm_source=redisinsight&utm_medium=rel_notes&utm_campaign=2_40) database with preselected Cloud vendor and region. Create a new database with preselected Cloud vendor and region by using the recommended settings on the sign-up step. You can manage your database by signing in to [Redis Cloud](https://app.redislabs.com/#/databases?utm_source=redisinsight&utm_medium=rel_notes&utm_campaign=2_40)
- [#2851](https://github.com/RedisInsight/RedisInsight/pull/2851) See plan, Cloud vendor, and region details after successfully provisioning your free [Redis Cloud](https://redis.com/comparisons/oss-vs-enterprise/?utm_source=redisinsight&utm_medium=rel_notes&utm_campaign=2_40) database
- [#2882](https://github.com/RedisInsight/RedisInsight/pull/2882) Optimizations to upload large text files with the list of Redis commands via bulk actions in Browser
- [#2808](https://github.com/RedisInsight/RedisInsight/pull/2808) Enhanced security measurement to no longer display in plain text existing passwords for Redis Sentinel
- [#2875](https://github.com/RedisInsight/RedisInsight/pull/2875) Increase performance for resizing the key list and key details in the Tree view, ensuring a smoother user experience
- [#2866](https://github.com/RedisInsight/RedisInsight/pull/2866) Support for hyphens in [node host names](https://github.com/RedisInsight/RedisInsight/issues/2865)

**Bugs**
- [#2868](https://github.com/RedisInsight/RedisInsight/pull/2868) Prevent [unintentional data overwrites](https://github.com/RedisInsight/RedisInsight/issues/2791) by disabling both manual and automatic refreshing of key values while editing in Browser

