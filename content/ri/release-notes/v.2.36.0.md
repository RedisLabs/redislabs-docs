---
Title: RedisInsight v2.36.0, October 2023
linkTitle: v2.36.0 (October 2023)
date: 2023-10-26 00:00:00 +0000
description: RedisInsight v2.36
weight: 1
aliases: /ri/release-notes/v2.36.0/
         /ri/release-notes/v2.36.0.md
---
## 2.36 (October 2023)
This is the General Availability (GA) release of RedisInsight 2.36.

### Highlights
- A security enhancement to not expose and display existing database passwords, SSH passwords, passphrases, and private keys
- See a message when a new RedisInsight version is ready for installation to get advantage of new useful features and optimizations
- Optimizations for working with big [Redis strings](https://redis.io/docs/data-types/strings/) to load only up to 5,000 characters, and be able to either upload the entire string value or download it in a file

### Details

**Features and improvements** 
- [#2647](https://github.com/RedisInsight/RedisInsight/pull/2647) A security enhancement to not expose and display existing database passwords, SSH passwords, passphrases, and private keys
- [#2685](https://github.com/RedisInsight/RedisInsight/pull/2685), [#2686](https://github.com/RedisInsight/RedisInsight/pull/2686) Added optimizations for working with big [Redis strings](https://redis.io/docs/data-types/strings/) to load only up to 5,000 characters, and be able to either upload the entire string value or download it in a file
- [#2631](https://github.com/RedisInsight/RedisInsight/pull/2631) See a message when a new RedisInsight version is ready for installation to get advantage of new useful features and optimizations
- [#2705](https://github.com/RedisInsight/RedisInsight/pull/2705) Added support to create a [search and query](https://redis.io/docs/interact/search-and-query/) index with the [GEOSHAPE](https://redis.io/commands/ft.create/#:~:text=Vector%20Fields.-,GEOSHAPE,-%2D%20Allows%20polygon%20queries) field type in the dedicated form in Browser
- [#2681](https://github.com/RedisInsight/RedisInsight/pull/2681) Updated the Pickle formatter for values of keys in Browser to [support](https://github.com/RedisInsight/RedisInsight/issues/2260) Pickle protocol 5
 
**Bugs**
- [#2675](https://github.com/RedisInsight/RedisInsight/pull/2675) Show the "Scan more" control until the cursor returned by the server is 0 to fix [cases](https://github.com/RedisInsight/RedisInsight/issues/2618) when not all keys are displayed.
