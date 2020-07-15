---
Title: Configuring RedisInsight
date: 2019-12-13 03:49:29 +0530
weight: 60
categories: ["RI"]
path: install/configure/
aliases: /ri/install/configure/
---
You can configure RedisInsight with system environment variables.

To configure RedisInsight with environment variables:

1. Follow the instructions to set environment variables for your operating system:

    - [Mac](https://apple.stackexchange.com/a/106814)
    - [Windows](https://www.architectryan.com/2018/08/31/how-to-change-environment-variables-on-windows-10/)
    - [Linux](https://askubuntu.com/a/58828)
    - [Docker](https://docs.docker.com/engine/reference/commandline/run/#set-environment-variables--e---env---env-file)

1. Set the environment variables.
1. Restart RedisInsight.

## RedisInsight Environment Variables

The following environment variables can be set to configure RedisInsight:

- `REDISINSIGHT_PORT` - By default, RedisInsight listens on port 8001. To have RedisInsight bind to a different port, set the `REDISINSIGHT_PORT` environment variable.

- `REDISINSIGHT_HOST` - By default, RedisInsight binds to the IP address `0.0.0.0`. To have RedisInsight bind to a different host, set the `REDISINSIGHT_HOST` environment variable.

- `REDISINSIGHT_HOME_DIR` - By default, RedisInsight stores application data (such as local database, log files and snapshot files) in  `~/.redisinsight` in your home directory on desktop and in the `/db` directory in the Docker container. To change this directory, set the `REDISINSIGHT_HOME_DIR` environment variable.

- `LOG_DIR` - By default, RedisInsight stores log files in your home directory (`REDISINSIGHT_HOME_DIR`). To have RedisInsight store the log files in a different directory, set the `LOG_DIR` environment variable.
