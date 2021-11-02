---
Title: Redis with Java
linkTitle: Java
description: The clients Lettuce and Jedis allow you to use Redis with Java.
weight: 50
alwaysopen: false
categories: ["RS"]
---
To use Redis with [Java](https://www.java.com/en/download/help/whatis_java.html), you need a Java Redis client. The following sections demonstrate the use of two Java client libraries for Redis: [Lettuce](https://github.com/mp911de/lettuce/) and [Jedis](https://github.com/xetorthio/jedis). Additional Java clients for Redis can be found under the [Java section](http://redis.io/clients#Java) of the Redis Clients page.

## Lettuce

Lettuce is a [thread-safe](https://en.wikipedia.org/wiki/Thread_safety) Redis client that supports both [synchronous](https://en.wikipedia.org/wiki/Synchronization_(computer_science)#Thread_or_process_synchronization) and [asynchronous](https://en.wikipedia.org/wiki/Asynchrony_(computer_programming)) connections.

### Install Lettuce

See Lettuce's [README file](https://github.com/mp911de/lettuce#binariesdownload) for installation instructions.

Add the following [Maven dependency](https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html) to your [pom.xml file](https://maven.apache.org/pom.html) to use Lettuce:

```xml
<dependency>
    <groupId>biz.paluch.redis</groupId>
    <artifactId>lettuce</artifactId>
    <version>3.2.Final</version>
</dependency>
```

You can also download the latest Lettuce release from the [GitHub repository](https://github.com/mp911de/lettuce/wiki/Download).

### Connect to Redis

The following code creates a connection to Redis using Lettuce:

```java
import com.lambdaworks.redis.*;
    
public class ConnectToRedis {
    
  public static void main(String[] args) {
    RedisClient redisClient = new RedisClient(
      RedisURI.create("redis://password@host:port"));
    RedisConnection<String, String> connection = redisClient.connect();
    
    System.out.println("Connected to Redis");
    
    connection.close();
    redisClient.shutdown();
  }
}
```

To adapt this example to your code, replace the following values in line 7's URI string with your database's values:

- Set `password` to your database's password or remove `password@` to connect without authentication
- Set `host` to your database's host
- Set `port` to your database's port

Lettuce is [thread-safe](https://en.wikipedia.org/wiki/Thread_safety), and the same Lettuce connection can be used from different threads. Using multiple connections is also possible.

#### Spring integration

If you're using [Spring](https://spring.io/), add the following XML to your bean configuration file to create a Lettuce instance:

```xml
<bean id="RedisClient" class="com.lambdaworks.redis.support.RedisClientFactoryBean">
    <property name="uri" value="redis://host:port"/>
</bean>
```

Then use it within your managed beans as follows:

```java
import com.lambdaworks.redis.*;
import org.springframework.beans.factory.annotation.Autowired;
    
public class MySpringBean {
    
    private RedisClient redisClient;
    
    @Autowired
    public void setRedisClient(RedisClient redisClient) {
        this.redisClient = redisClient;
    }

    public String ping() {
    
        RedisConnection<String, String> connection = redisClient.connect();
        String result = connection.ping();
        connection.close();
        return result;
    }
}
```

Once your standalone application exits, remember to shutdown Lettuce by using the shutdown method:

```java
redisClient.shutdown();
```

If you are using Spring and CDI, the frameworks manage the resources for you, and you do not have to close the client using the shutdown method.

### Example code for Redis commands

Once connected to Redis, you can read and write data with Redis command functions.

The following code snippet assigns the value `bar` to the Redis key `foo`, reads it back, and prints it:

```java
// open a connection to Redis
...
    
connection.set("foo", "bar");
String value = connection.get("foo");
System.out.println(value);
```

Example output:

    $ java ReadWriteExample
    Connected to Redis
    bar

### SSL

For an added security measure, you can secure the connection using SSL connections. Lettuce supports SSL connections natively.

```java
import com.lambdaworks.redis.*;
    
public class ConnectToRedisSSL {
    
    public static void main(String[] args) {
        RedisClient redisClient = new RedisClient(
            RedisURI.create("rediss://password@host:port"));
        RedisConnection<String, String> connection = redisClient.connect();
        System.out.println("Connected to Redis using SSL");
    
        connection.close();
        redisClient.shutdown();
    }
}
```

## Jedis

Jedis is a simple and complete Java client for Redis.

### Install Jedis

See the Jedis [README file](https://github.com/xetorthio/jedis/#how-do-i-use-it) for installation instructions.

Add the following [Maven dependency](https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html) to your [pom.xml file](https://maven.apache.org/pom.html) to use Jedis:

```xml
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>2.6.2</version>
    <type>jar</type>
    <scope>compile</scope>
</dependency>
```

You can also download the latest [Jedis release](https://github.com/xetorthio/jedis/releases) from the GitHub repository. To build it, extract the source and run the following command:

    $ cd jedis
    ~/jedis$ make package

### Connect to Redis

The following code creates a connection to Redis using Jedis:

```java
import redis.clients.jedis.Jedis;
     
public class JedisExample {
     
  public static void main(String[] args) throws Exception {
    Jedis jedis = new Jedis("hostname", port);
    jedis.auth("password")
    System.out.println("Connected to Redis");
  }
}
```

To adapt this example to your code, replace the following values with your database's values:

- In line 6, set `hostname` to your database's hostname or IP address
- In line 6, set `port` to your database's port
- In line 7, set `password` to your database's password

### Example code for Redis commands

Once connected to Redis, you can read and write data with Redis command functions.

The following code snippet assigns the value `bar` to the Redis key `foo`, reads it back, and prints it:

```java
// open a connection to Redis
...
 
jedis.set("foo", "bar");
String value = jedis.get("foo");
System.out.println(value);
```

Example output:

    $ java JedisExample
    Connected to Redis
    bar

### Connection pooling

Jedis isn't [thread-safe](https://en.wikipedia.org/wiki/Thread_safety), and the same Jedis instance shouldn't be used from different threads. Instead, use `JedisPool` to handle multiple Jedis instances and connection maintenance.

`JedisPool` requires `Apache Commons Pool 2.3`. Download it from [Apache Commons]( http://commons.apache.org/proper/commons-pool/download_pool.cgi) or add the following Maven dependency to the pom.xml file:

```xml
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
    <version>2.3</version>
</dependency>
```

The following code instantiates a pool of connections:

```java
JedisPool pool = new JedisPool(new JedisPoolConfig(), "hostname", port, Protocol.DEFAULT_TIMEOUT, "password");
```

#### Spring integration

If you're using [Spring](https://spring.io/), add the following XML to your bean configuration file to create a `JedisPool`:

```xml
<bean id="jedisPool" class="redis.clients.jedis.JedisPool">
        <constructor-arg index="0" ref="jedisPoolConfig" />
        <constructor-arg index="1" value="hostname" />
        <constructor-arg index="2" value="port" />
        <constructor-arg index="3" value="Protocol.DEFAULT_TIMEOUT" />
        <constructor-arg index="4" value="password" />
    </bean>
    
    <bean id="jedisPoolConfig" class="redis.clients.jedis.JedisPoolConfig" >
</bean>
```

`JedisPool` is thread-safe and can be stored in a static variable and shared among threads. The following code gets a Jedis instance from the `JedisPool`:

```java
Jedis redis = null;
    try
    {
        redis = redisPool.getResource();
        return redis.get(keyName);
    }
    catch (JedisConnectionException e)
    {
        if (redis != null)
        {
            redisPool.returnBrokenResource(redis);
            redis = null;
        }
        throw e;
    }
    finally
    {
        if (redis != null)
        {
            redisPool.returnResource(redis);
        }
    }
}
```

Once your application exits, remember to dispose of the `JedisPool` by using the `destroy` method:

```java
redisPool.destroy();
```

### SSL

Jedis does not support [SSL](https://en.wikipedia.org/wiki/Transport_Layer_Security) connections natively.

For an added security measure, you can secure the connection using [stunnel](https://redislabs.com/blog/using-stunnel-to-secure-redis) or this [Jedis fork](https://github.com/RedisLabs/jedis), which includes SSL support.
