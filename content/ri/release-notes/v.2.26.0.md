---
Title: RedisInsight v2.26.0, May 2023
linkTitle: v2.26.0 (Mar 2024)
date: 2023-05-31 00:00:00 +0000
description: RedisInsight v2.26
weight: 1
aliases: /ri/release-notes/v2.26.0/
         /ri/release-notes/v2.26.0.md
---
## 2.26 (May 2023)
This is the General Availability (GA) release of RedisInsight 2.26.

### Highlights
- Recommendations in beta testing: launching a beta test to show instant recommendations for saving memory, optimizing usage, and enhancing the security of your database based on industry standards and Redis best practices
- Bulk data upload support in custom tutorials: include and quickly upload example data sets in bulk from your custom RedisInsight tutorials to share your Redis expertise with your team and the wider community

### Details

**Features and improvements**
- [#1847](https://github.com/RedisInsight/RedisInsight/pull/1847), [#1901](https://github.com/RedisInsight/RedisInsight/pull/1901), [#1957](https://github.com/RedisInsight/RedisInsight/pull/1957), [#1972](https://github.com/RedisInsight/RedisInsight/pull/1972) Launching a beta test to show instant recommendations for saving memory, optimizing usage, and enhancing the security of your database based on industry standards and Redis best practices. RedisInsight recommendations are generated and displayed automatically based on database configuration, data type usage, and your actions. They will be partially rolled out to a limited number of RedisInsight users, selected at random for initial feedback, suggestions, and ideas to meet the needs of Redis and Redis Stack practitioners around the world. If you would like to participate in beta test and provide feedback, please contact us [here](https://github.com/RedisInsight/RedisInsight/issues)
- [#2019](https://github.com/RedisInsight/RedisInsight/pull/2019) Include and quickly upload example data sets in bulk from your custom RedisInsight tutorials to share your Redis expertise with your team and the wider community. Use a text file with the list of Redis commands and follow our simple [instructions](https://github.com/RedisInsight/Tutorials) to include example data sets in your custom RedisInsight tutorials
- [#2010](https://github.com/RedisInsight/RedisInsight/pull/2010), [#2012](https://github.com/RedisInsight/RedisInsight/pull/2012), [#2013](https://github.com/RedisInsight/RedisInsight/pull/2013) Optimizations of using the [TYPE](https://redis.io/commands/type/) command in the Search capability and filtering per data type in Browser

**Bugs**
- [#2014](https://github.com/RedisInsight/RedisInsight/pull/2014) Display actual command processing time in Workbench when results are grouped
