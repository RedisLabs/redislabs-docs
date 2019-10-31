---
Title: Configuration
date: 2018-06-14 03:49:29 +0530
weight: 80
categories: ["RI"]
path: features/configuration/
---
RedisInsight configuration allows to update your redis instance's config with its easy to use config editor. Each of the keys shown corresponds to an entry in the Redis configuration file. Most of the configuration settings can be applied without restarting the server. Also, it comes with an option of rewriting your current settings to your `redis.conf` file so that these settings remain even when server restarts.

![configuration](/images/ri/configuration.png)

Configurations are also separated into categories like- Advanced config, Security, Lua Scripting etc. in order to make the config editing easier.

![configuration_popup](/images/ri/configuration_popup.png)
