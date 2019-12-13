---
Title: Configuring the port
date: 2019-12-13 03:49:29 +0530
weight: 60
categories: ["RI"]
path: install/configure-port/
aliases: /ri/install/configure-port/
---

By default, RedisInsight listens on port 8001.

If you need to change the port RedisInsight listens on, set the environment variable `REDISINSIGHT_PORT` to the desired port number.


## Windows, Mac and Linux

The following links point to instructions to set environment variables on the respective desktop operating systems:

- [Setting environment variables on Mac](https://apple.stackexchange.com/a/106814)
- [Setting environment variables on Windows](https://www.architectryan.com/2018/08/31/how-to-change-environment-variables-on-windows-10/)
- [Setting environment variables on Linux](https://askubuntu.com/a/58828)

Follow the instructions for your OS to set the `REDISINSIGHT_PORT` environment variable to the desired port number and restart RedisInsight.

## Docker

If you want to run RedisInsight on a separate port, simply bind port 8001 inside the container to the port of your choice on the host.

For example, if you want to run RedisInsight on port 6666, bind the container port 8001 to the host port 6666, like this:
```bash
docker run -p 6666:8001 redislabs/redisinsight
```

If, for some reason, you need to change the actual port inside the container that RedisInsight binds to, set the `REDISINSIGHT_PORT` environment variable in the RedisInsight docker container using the [`--env` or `-e` option](https://docs.docker.com/engine/reference/commandline/run/#set-environment-variables--e---env---env-file) in the `docker run` command like so:
```bash
docker run -p 6666:6666 -e REDISINSIGHT_PORT=6666 redislabs/redisinsight
```

