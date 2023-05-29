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
- Beta testing: launch of Beta testing for instant recommendations to save memory, optimize the usage, and enhance the security of your database based on industry standards and Redis best practices
- Support for bulk data upload in tutorials: share your Redis expertise with your team and the wider community using RedisInsight tutorials that allow you to include and quickly load example data sets

### Details

**Features and improvements**
- [#1847](https://github.com/RedisInsight/RedisInsight/pull/1847), [#1901](https://github.com/RedisInsight/RedisInsight/pull/1901), [#1957](https://github.com/RedisInsight/RedisInsight/pull/1957), [#1972](https://github.com/RedisInsight/RedisInsight/pull/1972) Launch of the Beta testing to show instant recommendations to save memory, optimize the usage, and enhance the security of your database based on industry standards and Redis best practices. RedisInsight recommendations are generated and displayed automatically based on database configuration, data usage, and your actions. RedisInsight recommendations will be partially rolled out to a limited range of our users randomly selected to get initial feedback, suggestions, and ideas to cover the needs of Redis and Redis Stack practitioners worldwide. If you would like to participate in the Beta testing of recommendations or provide your feedback, please reach out [here](https://github.com/RedisInsight/RedisInsight/issues). 
- [#2019](https://github.com/RedisInsight/RedisInsight/pull/2019) Share your Redis expertise with your team and the wider community using RedisInsight tutorials that allow you to include and quickly load example data sets. Use a text file with the list of Redis commands and follow our simple [instructions](https://github.com/RedisInsight/Tutorials) to include them in your custom RedisInsight tutorials
- [#2010](https://github.com/RedisInsight/RedisInsight/pull/2010), [#2012](https://github.com/RedisInsight/RedisInsight/pull/2012), [#2013](https://github.com/RedisInsight/RedisInsight/pull/2013) Optimizations of using the [TYPE](https://redis.io/commands/type/) command in the Search capability and filtering per data type in Browser 

**Bugs**
- [#2014](https://github.com/RedisInsight/RedisInsight/pull/2014) Display actual command processing time in Workbench when results are grouped
