---
Title: Installing the RedisInsight Desktop Client
date: 2018-07-20 03:49:29 +0530
weight: 5
categories: ["RI"]
path: install/redis-desktop-mac-win-linux/
aliases: /ri/install/install-redis-desktop/
---
RedisInsight is a full-featured Desktop GUI client for:

- Windows 10
- Ubuntu 18.04
- MacOS 10.13 High Sierra

{{% note %}}
For not supported operating system version, you can install RedisInsight for the operating system, but it may have unexpected behavior.
We are happy to receive any feedback at redisinsight@redislabs.com.
{{% /note %}}

RedisInsight offers the following features -

- Easy to use browser based interface to search keys, view and edit data
- Only GUI tool to support Redis Cluster
- Supports SSL/TLS based connections
- Run Memory Analysis

To install RedisInsight:

1. [Download](https://redislabs.com/redisinsight/) RedisInsight for Desktop.
1. Prepare the executable:

    - For Ubuntu - To make the downloaded file executable, run:

        ```src
        chmod +x redisinsight-<platform>-<version>
        ```

    - For Windows and MacOS - Run the installer.

        If MacOS warns you that RedisInsight cannot be checked for malicious software,
        follow the instructions from [Apple support](https://support.apple.com/en-gb/HT202491) about how to open an app from an unidentified developer.

1. Run RedisInsight:

    - Windows - Open RedisInsight.
    - MacOS and Ubuntu - Run: `/redisinsight-<platform>-<version>`

1. After the web server starts, open [{{< param siteURL >}}]({{< param siteURL >}}) and add your first Redis database connection.
