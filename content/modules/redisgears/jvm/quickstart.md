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

1. Create a new [Maven project](https://maven.apache.org/guides/getting-started/index.html#).

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

1. Add example code for either [batch processing](#batch-processing) or [event processing](#event-processing) to your project's `main` function.



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

{{<note>}}
If you used `GearsBuilder.run()`, your code will run immediately when you run `RG.JEXECUTE`.
<br></br>
However, if you used `GearsBuilder.register()`, an `OK` message will display. Your code should run whenever certain database events occur.
{{</note>}}

## Example code

You can use these code examples with your own Maven project to try out batch processing and event processing with the RedisGears JVM plugin.

### Batch processing

If you use the `GearsBuilder.run()` function within your code, then the functions you add to your pipeline will run exactly once after you use `RG.JEXECUTE` with your JAR file.

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
        
        // Create the data pipe builder
        GearsBuilder<KeysReaderRecord> gb = GearsBuilder.CreateGearsBuilder(reader);
        
        // Get all strings that contain the substring "galaxy"
        gb.filter(r->{
        	return r.getStringVal().contains("galaxy");
       	});
        
        // Map the string value for each key
        gb.map(r->{
        	return r.getStringVal();
 	    });
             
        // Run the data through the pipeline immediately
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

If you use the `GearsBuilder.register()` function in your code, then the functions you add to your pipeline will run every time a certain event occurs, such as when you add a new key to the database.

The following example registers a pipeline of functions that will automatically update the maximum age every time you add a new person hash to your database.

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
        
        // Create the data pipe builder
        GearsBuilder<KeysReaderRecord> gb = GearsBuilder.CreateGearsBuilder(reader);

        // Only process keys that start with "person:"
        gb.filter(r->{
        	return r.getKey().startsWith("person:");
       	});

        // Compare each person's age to the current maximum age
        gb.foreach(r->{
        	String newAgeStr = r.getHashVal().get("age");
        	int newAge = Integer.parseInt(newAgeStr);
        	
        	// Get the current maximum age
        	String maxAgeKey = "age:maximum";
        	String maxAgeStr = (String) GearsBuilder.execute("GET", maxAgeKey);
        	
        	int maxAge = 0; // Initialize to 0
        	if (maxAgeStr != null) {
                // Convert the maximum age to an integer
        		maxAge = Integer.parseInt(maxAgeStr);
        	}

        	// Update the maximum age if a new age is higher
        	if (newAge > maxAge) {               
        		GearsBuilder.execute("SET", maxAgeKey, newAgeStr); 
        	}
        });
        
        // Store this pipeline of functions and 
        // run them when a new person key is added
        gb.register();
    }
}
```

#### Example event processing

After you register your code with the `RG.JEXECUTE` command, you can add some data to your database and check the value of `age:maximum` to verify that it runs correctly.

1. Connect to your database with `redis-cli`:

    ```sh
    $ redis-cli -h <host> -p <port>
    ```

1. Add a hash that represents a person with `HSET`:

    ```sh
    127.0.0.1:12000> HSET person:1 name "Alex" age 24
    (integer) 2
    ```

1. The current value of `age:maximum` should match Alex's age:

    ```sh
    127.0.0.1:12000> GET age:maximum
    "24"
    ```

1. Add another person with a higher age and then check that `age:maximum` updated automatically:

    ```sh
    127.0.0.1:12000> HSET person:2 name "Morgan" age 45
    (integer) 2
    127.0.0.1:12000> GET age:maximum
    "45"
    ```

1. Add a person with a lower age and verify that `age:maximum` did not change:

    ```sh
    127.0.0.1:12000> HSET person:3 name "Lee" age 31
    (integer) 2
    127.0.0.1:12000> GET age:maximum
    "45"
    ```