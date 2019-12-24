---
Title: Installing the Redis Desktop Client
date: 2018-07-20 03:49:29 +0530
weight: 5
categories: ["RI"]
path: install/redis-desktop-mac-win-linux/
aliases: /ri/install/install-redis-desktop/
---
RedisInsight is a full-featured Desktop GUI client for Windows, Linux and Mac.

RedisInsight offers the following features:

* Easy-to-use browser-based interface to search keys, view and edit data
* Only GUI tool to support Redis Cluster
* Support for SSL/TLS based connections
* Memory Analysis

[Download](https://redislabs.com/redis-enterprise-visualization/redis-insight/) RedisInsight for Desktop here.

On Linux, once downloaded, make the downloaded file executable with the following command:
```
chmod +x redisinsight-linux64-[version]
```

And finally, start the RedisInsight installer as downloaded for your operating system:
```
./redisinsight-linux64-[version]
```

On Windows, once the installer is completed, start RedisInsight via the Windows start menu.

Once RedisInsight is running and starts its own web server, use your browser to open [{{< param siteURL >}}]({{< param siteURL >}}) and add your first Redis database connection.
