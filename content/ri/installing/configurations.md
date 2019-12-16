---
Title: Configuring RedisInsight
date: 2019-12-13 03:49:29 +0530
weight: 60
categories: ["RI"]
path: install/configure/
aliases: /ri/install/configure/
---


RedisInsight can be configured via environment vairables.

The following links point to instructions to set environment variables on the respective desktop operating systems:

- [Setting environment variables on Mac](https://apple.stackexchange.com/a/106814)
- [Setting environment variables on Windows](https://www.architectryan.com/2018/08/31/how-to-change-environment-variables-on-windows-10/)
- [Setting environment variables on Linux](https://askubuntu.com/a/58828)
- [Setting environment variables on Docker](https://docs.docker.com/engine/reference/commandline/run/#set-environment-variables--e---env---env-file)

Follow the relevant instructions to set the environment variables to the desired value and restart RedisInsight.


## Available Environment Variables

The following environment variables can be set to configure RedisInsight.

### `REDISINSIGHT_PORT`

By default, RedisInsight listens on port 8001. To have RedisInsight bind to a different port, set the `REDISINSIGHT_PORT` environment variable to the desired port.
