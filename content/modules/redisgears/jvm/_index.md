---
Title: RedisGears JVM plugin
linkTitle: Run with JVM
description: The RedisGears JVM plugin allows you to run RedisGears functions in the Java virtual machine.
weight: 71
alwaysopen: false
categories: ["Modules"]
---

With the [RedisGears JVM plugin](https://github.com/RedisGears/JVMPlugin), you can write RedisGears functions in [Java](https://en.wikipedia.org/wiki/Java_(programming_language)) and run them on a [Redis Enterprise]({{<relref "/rs/">}}) cluster. The [JVM](https://en.wikipedia.org/wiki/Java_virtual_machine) plugin supports both batch processing and event-driven processing.

Before you can run RedisGears with Java, you will need to [install the RedisGears module and the JVM plugin]({{<relref "/modules/redisgears/jvm/install">}}) on your Redis Enterprise cluster and enable them for your database.

Once you have written your RedisGears Java code, compile and package it into a [JAR](https://en.wikipedia.org/wiki/JAR_(file_format)) file. Then upload the JAR to a node on your Redis Enterprise cluster and use the `RG.JEXECUTE` command with the `redis-cli` command line tool to run your code.

## More info

- [RedisGears JVM quick start]({{<relref "/modules/redisgears/jvm/quickstart">}})
- [RedisGears Java classes and functions]({{<relref "/modules/redisgears/jvm/classes">}})