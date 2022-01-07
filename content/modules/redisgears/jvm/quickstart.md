---
Title: RedisGears JVM quick start tutorial
linkTitle: Quick start
description: A quick start tutorial to learn how to use RedisGears with Java.
weight: 10
alwaysopen: false
categories: ["Modules"]
---

## Prerequisites

For this quick start tutorial, you need:

- A Redis Enterprise cluster with the [RedisGears module and JVM plugin installed]({{<relref "/modules/redisgears/jvm/install">}}) and enabled on a database
- `redis-cli` with connectivity to a Redis database

## Example RedisGears Java code

1. Create a Maven project

1. Add the following sections to the Maven pom.xml:

    ```xml
    <repositories>
        <repository>
            <id>snapshots-repo</id>
            <url>https://oss.sonatype.org/content/repositories/snapshots</url>
        </repository>
    </repositories>

    <dependencies>
        <dependency>
            <groupId>com.redislabs</groupId>
            <artifactId>gear_runtime</artifactId>
            <version>0.0.3-SNAPSHOT</version>
        </dependency>
    </dependencies>
    ```

1. Add the following Java code to your project:

    ```java
    import gears.GearsBuilder;
    import gears.readers.KeysReader;
    import gears.records.KeysReaderRecord;

    public static void main(String args[]) 
    {  
        KeysReader reader = new KeysReader();
        GearsBuilder<KeysReaderRecord> gb = GearsBuilder.CreateGearsBuilder(reader);

        // Map each key object to its string value
        gb.map(r->{
    		return r.getStringVal();
   	    });

        // Split each string into a list of words
        gb.flatMap(r->{
   		    return r.getListVal();
   	    });

        gb.count(); // Count the occurences of the words
        gb.run();
    }
    ```

## Build a JAR

Use the Maven command line tool or an IDE plugin to compile and package your code into a JAR file:

```sh
$ mvn package
```

## Upload the JAR

TBA

## Run your Java code

Use the `RG.JEXECUTE` command to run your RedisGears Java code:

```sh
$ redis-cli -x -h <host> -p <port> RG.JEXECUTE <main class> </path/to/project/jar/file>
```

Example output:

```sh
TBA
```