---
Title: Install the RedisInsight Desktop Client
date: 2018-07-20 03:49:29 +0530
weight: 5
categories: ["RI"]
path: install/redis-desktop-mac-win-linux/
aliases: /ri/install/install-redis-desktop/
---
The RedisInsight desktop client is available for the following operating systems:

- Windows 10
- Ubuntu 18.04
- MacOS 10.13 High Sierra

{{< note >}}
For unsupported operating systems, you can still install RedisInsight. However, it may show unexpected behavior.
We are happy to receive any feedback at [redisinsight@redislabs.com](mailto:redisinsight@redislabs.com).
{{< /note >}}


## Ubuntu

1. [Download RedisInsight](https://redislabs.com/redisinsight/).
1. Make your downloaded file into an executable.

```sh
chmod +x redisinsight-<platform>-<version>
```

1. Start RedisInsight.

```sh
/redisinsight-<platform>-<version>
```

1. After the web server starts, open [{{< param siteURL >}}]({{< param siteURL >}}) and [add a Redis database]({{< relref "/ri/using-redisinsight/add-instance.md" >}}) connection.


## MacOS

1. [Download RedisInsight](https://redislabs.com/redisinsight/).
1. Run the installer.
        {{< note >}}
MacOS 10.14.x users occasionally encounter errors during installation.
If you encounter a problem installing RedisInsight, please contact us at [redisinsight@redislabs.com](mailto:redisinsight@redislabs.com) and perform the following troubleshooting steps:
1. Move the package to the Desktop and left-click the file while hold the Control key.
1. Click "Open" to proceed past the warning message.
        {{< /note >}}
1. After the web server starts, open [{{< param siteURL >}}]({{< param siteURL >}}) and [add a Redis database]({{< relref "/ri/using-redisinsight/add-instance.md" >}}) connection.


## Windows

1. [Download RedisInsight](https://redislabs.com/redisinsight/).
1. Run the installer.
1. After the web server starts, open [{{< param siteURL >}}]({{< param siteURL >}}) and [add a Redis database]({{< relref "/ri/using-redisinsight/add-instance.md" >}}) connection.
