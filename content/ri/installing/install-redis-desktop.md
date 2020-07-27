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

{{< note >}}
For not supported operating system version, you can install RedisInsight for the operating system, but it may have unexpected behavior.
We are happy to receive any feedback at redisinsight@redislabs.com.
{{< /note >}}

To install RedisInsight:

1. [Download](https://redislabs.com/redisinsight/) RedisInsight for Desktop.
1. Prepare the executable:

    - For Ubuntu - To make the downloaded file executable, run:

        ```sh
        chmod +x redisinsight-<platform>-<version>
        ```

    - For Windows and MacOS - Run the installer.

        Both the Windows and MacOS packages are signed and notarized.
        
        {{< /note >}}
        Since RedisInsight 1.6.3, on MacOS 10.14.x, some users have reported issues installing the application installed. 
        If you encounter this, please let us know at [redisinsight@redislabs.com](mailto:redisinsight@redislabs.com).
        You can still proceed with the installation by following these instructions: 
        1. Move the package to the Desktop and then hold Control and click the file to launch the installer. 
        2. When the message appears, click "Continue".
        {{< /note >}}

1. Run RedisInsight:

    - Windows - Open RedisInsight.
    - MacOS and Ubuntu - Run: `/redisinsight-<platform>-<version>`

1. After the web server starts, open [{{< param siteURL >}}]({{< param siteURL >}}) and add your first Redis database connection.
