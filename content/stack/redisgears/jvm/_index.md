---
Title: RedisGears JVM plugin
linkTitle: Run with JVM
description: The RedisGears JVM plugin allows you to run RedisGears functions in the Java virtual machine.
weight: 75
alwaysopen: false
categories: ["Modules"]
aliases: /modules/redisgears/jvm/
---

With the [RedisGears JVM plugin](https://github.com/RedisGears/JVMPlugin), you can write RedisGears functions in [Java](https://en.wikipedia.org/wiki/Java_(programming_language)) and run them on a [Redis Enterprise]({{<relref "/rs/">}}) cluster. It currently supports [JVM](https://en.wikipedia.org/wiki/Java_virtual_machine) version 11.

Similar to the Python plugin, the JVM plugin allows both batch processing and event-driven processing.

Before you can run RedisGears with Java, you will need to [install the RedisGears module and the JVM plugin]({{<relref "/stack/redisgears/installing-redisgears#install-redisgears">}}) on your Redis Enterprise cluster and [enable them for your database]({{<relref "/stack/redisgears/jvm/install">}}).

Once you have written your code, compile and package it into a [JAR](https://en.wikipedia.org/wiki/JAR_(file_format)) file and upload it to a node on your Redis Enterprise cluster. Use the `RG.JEXECUTE` command with the `redis-cli` command-line tool to run your code.

## More info

- [RedisGears JVM quick start]({{<relref "/stack/redisgears/jvm/quickstart">}})
- [RedisGears Java classes and functions]({{<relref "/stack/redisgears/jvm/classes">}})
- [RedisGears recipes]({{<relref "/stack/redisgears/jvm/recipes">}})