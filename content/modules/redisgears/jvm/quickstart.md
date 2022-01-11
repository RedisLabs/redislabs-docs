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

## Tutorial

### Create a Maven project

1. Create a new [Maven project](https://maven.apache.org/guides/getting-started/index.html#)

1. Add the following sections to the [pom.xml](https://maven.apache.org/guides/introduction/introduction-to-the-pom.html) file:

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

1. Add example code for either [batch processing](#batch-processing) or [event processing](#event-processing) to your project's `main` function



### Build a JAR

Use the Maven command line tool or an IDE plugin to compile and package your code into a JAR file:

```sh
$ mvn package
```

### Upload the JAR

Upload your JAR file to a node in the Redis Enterprise cluster. You will need to use the destination filepath when you run your code.

### Run RedisGears Java code

Use the `RG.JEXECUTE` command to run your RedisGears Java code:

```sh
$ redis-cli -x -h {host} -p {port} RG.JEXECUTE {main class} < {filepath}/{JAR name}.jar
```

## Example code

You can use these code examples with your own Maven project to try out batch processing and event processing with the RedisGears JVM plugin.

### Batch processing

If you use the `GearsBuilder.run()` function within your code, then the functions you added to your pipeline will run exactly once after you use `RG.JEXECUTE` with your JAR file.

The following example filters the existing data in your database and returns any string values that contain the substring "galaxy".

#### Add data to the database

1. Connect to your database with `redis-cli`:

    ```sh
    $ redis-cli -h <host> -p <port>
    ```

1. Add a few strings to the database with the `SET` command:

    ```sh
    127.0.0.1:12000> SET message:1 "hello world"
    OK
    127.0.0.1:12000> SET message:2 "hello galaxy"
    OK
    127.0.0.1:12000> SET message:3 "hello universe"
    OK
    127.0.0.1:12000> SET message:4 "hello new galaxy"
    OK
    127.0.0.1:12000> exit
    ```

#### Example code

```java
import gears.GearsBuilder;
import gears.readers.KeysReader;
import gears.records.KeysReaderRecord;

public class App 
{
    public static void main(String args[]) 
    {  
        // Create the reader that will pass data to the pipe
        KeysReader reader = new KeysReader();
        
        // Create the data pipe builder */
        GearsBuilder<KeysReaderRecord> gb = GearsBuilder.CreateGearsBuilder(reader);
        
        // Get all strings that contain the substring "galaxy"
        gb.filter(r->{
        	return r.getStringVal().contains("galaxy");
       	});
        
        // Map the string value for each key
        gb.map(r->{
        	return r.getStringVal();
 	    });
             
        // Run the data through the pipeline
        gb.run();
    }
}
```

#### Example output

```sh
$ redis-cli -x -h {host} -p {port} \
    RG.JEXECUTE com.domain.packagename.App < /tmp/rgjvmtest-0.0.1-SNAPSHOT.jar
1) 1) "\"hello galaxy\""
   2) "\"hello new galaxy\""
2) (empty array)
```

### Event processing

TBA