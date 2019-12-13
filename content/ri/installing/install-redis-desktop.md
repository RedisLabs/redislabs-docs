---
Title: Installing the Redis Desktop Client
date: 2018-07-20 03:49:29 +0530
weight: 5
categories: ["RI"]
path: install/redis-desktop-mac-win-linux/
aliases: /ri/install/install-redis-desktop/
---
RedisInsight is a full-featured Desktop GUI client for Windows, Linux and Mac.

RedisInsight offers the following features -

* Easy to use browser based interface to search keys, view and edit data
* Only GUI tool to support Redis Cluster
* Supports SSL/TLS based connections
* Run Memory Analysis

[Download](https://redislabs.com/redis-enterprise-visualization/redis-insight/) RedisInsight for Desktop here.

Once downloaded, change the downloaded file into executable one with the following command:
```
chmod +x redisinsight-linux64-[version]
```

And finally to start the RedisInsight:
```
./redisinsight-linux64-[version]
```

Once the web server starts, open [{{< param siteURL >}}]({{< param siteURL >}}) and add your first Redis database connection.

### Supported Operating Systems

RedisInsight has been tested on the following operating systems:

- Windows 10
- Ubuntu 18.04
- Mac OS 10.13 High Sierra

For other versions of Windows, Mac and Ubuntu, or other Linux distributions, RedisInsight *should* work on them, but your milage may vary. Please write to redisinsight@redislabs.com to report any issues you encounter.
