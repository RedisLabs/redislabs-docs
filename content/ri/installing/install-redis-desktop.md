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

- Before installing RedisInsight for the above mentioned platforms, refer to the [recommended system requirements](https://docs.redislabs.com/ri/installing/system-requirements/).

- For not supported operating system version, you can install RedisInsight for the operating system, but it may have unexpected behavior.

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

        {{< note >}}
Since RedisInsight 1.6.3, some  on MacOS 10.14.x users have reported issues installing the application.
If you encounter this, please let us know at [redisinsight@redislabs.com](mailto:redisinsight@redislabs.com).
A workaround for this issue is:
1. Move the package to the Desktop and left-click on the file while pressing the Control key.
1. A warning message is shown that MacOS cannot check the application properly. To proceeed, click "Open".
        {{< /note >}}

1. Run RedisInsight:

    - Windows - Open RedisInsight.
    - MacOS and Ubuntu - Run: `/redisinsight-<platform>-<version>`

1. After the web server starts, open [{{< param siteURL >}}]({{< param siteURL >}}) and add your first Redis database connection.
