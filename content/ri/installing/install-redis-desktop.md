---
Title: Install the RedisInsight Desktop Client
date: 2018-07-20 03:49:29 +0530
weight: 5
categories: ["RI"]
path: install/redis-desktop-mac-win-linux/
aliases: /ri/install/install-redis-desktop/
---
The RedisInsight desktop client allows you to download and use the RedisInsight GUI locally. The desktop client is supported on Windows, MacOS, and Ubuntu operating systems and works with all variants of Redis.

## System Requirements

| Requirement | Ubuntu | MacOS | Windows |
| :-----: | :-----: | :-----: | :-----: |
| Operating System | Ubuntu 18.04 LTS or later | MacOS 10.13 or later  | Windows 10 |
| Memory (RAM) | 8GB | 8GB  | 8GB  |
| Processor| 64 bit | 64 bit | 32 bit or 64 bit|

{{< note >}}
For unsupported operating systems, you can still install RedisInsight. However, it may show unexpected behavior.
We are happy to receive any feedback at [redisinsight@redislabs.com](mailto:redisinsight@redislabs.com).
{{< /note >}}

{{< note >}}
Disk space: If you are using [online memory analysis](https://docs.redislabs.com/latest/ri/using-redisinsight/memory-analysis/), you will want to have enough space to store the RDB file for your Redis database. This is usually 10-50% of the Redis instance’s memory usage.
{{< /note >}}

## Install RedisInsight on Ubuntu

1. [Download RedisInsight](https://redislabs.com/redisinsight/).
1. Open a terminal and navigate to the folder containing the downloaded file.
1. Make your downloaded file into an executable.

```sh
chmod +x redisinsight-linux64-<version>
```

1. Start RedisInsight.

```sh
./redisinsight-linux64-<version>
```

1. To access your RedisInsight GUI, open a web browser and navigate to [{{< param siteURL >}}]({{< param siteURL >}}).


## Install RedisInsight on MacOS

{{<warning>}}
RedisInsight is only supported on Mac hardware with Intel chips. Mac hardware with the Apple M1 (ARM) chip is not supported.
{{</warning>}}

1. [Download RedisInsight](https://redislabs.com/redisinsight/).
1. Run the installer.
        {{< note >}}
MacOS 10.14.x users occasionally encounter errors during installation.
If you encounter a problem installing RedisInsight, please contact us at [redisinsight@redislabs.com](mailto:redisinsight@redislabs.com) and perform the following troubleshooting steps:
1. Move the package to the Desktop and left-click the file while hold the Control key.
1. Click "Open" to proceed past the warning message.
        {{< /note >}}
1. After the web server starts, open [{{< param siteURL >}}]({{< param siteURL >}}) and [add a Redis database]({{< relref "/ri/using-redisinsight/add-instance.md" >}}) connection.

## Install RedisInsight on Windows

{{<note>}}
RedisInsight should install and run on a fresh Windows system. There is no need to install any .NET framework.
{{</note>}}

1. [Download RedisInsight](https://redislabs.com/redisinsight/).
1. Run the installer.
1. After the web server starts, open [{{< param siteURL >}}]({{< param siteURL >}}) and [add a Redis database]({{< relref "/ri/using-redisinsight/add-instance.md" >}}) connection.

## Next Steps

- [Add a Redis database]({{< relref "/ri/using-redisinsight/add-instance.md" >}})