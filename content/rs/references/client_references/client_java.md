---
Title: Using Redis with Java
description:
weight:
alwaysopen: false
categories: ["RS"]
---
In order to use Redis with Java you need a Java Redis client. In following sections, we demonstrate the use of [Lettuce](https://github.com/mp911de/lettuce/) and [Jedis](https://github.com/xetorthio/jedis). Additional Java clients for Redis can be found under the [Java section](http://redis.io/clients#Java) of the Redis Clients page.

## Lettuce

Lettuce is a thread-safe Redis client providing both synchronous and asynchronous connections.

### Installing Lettuce

Lettuce's installation instructions are given in the ["Binaries/Download"](https://github.com/mp911de/lettuce#binariesdownload) section of its README file. Use Lettuce by declaring the following Maven dependency:

    <dependency>
        <groupId>biz.paluch.redis</groupId>
        <artifactId>lettuce</artifactId>
        <version>3.2.Final</version>
    </dependency>

You can also download the latest Lettuce release from the GitHub repository: [https://github.com/mp911de/lettuce/wiki/Download](https://github.com/mp911de/lettuce/wiki/Download)

### Opening a connection to Redis using Lettuce

The following code creates a connection to Redis using Lettuce:

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

To adapt this example to your code, make sure that you replace the following values with those of your database:

- In line 7, the URI contains the password. The argument should be your database's password. Remove `password@` to connect without authentication
- In line 7, the URI contains the host. The argument should be your database's host.
- In line 7, the URI contains the port. The argument should be your database's port.

Lettuce is thread-safe, and the same Lettuce connection can be used from different threads. Using multiple connections is also possible.

If you're using Spring, use the following plain Spring XML to create a Lettuce instance:

    <bean id="RedisClient" class="com.lambdaworks.redis.support.RedisClientFactoryBean">
        <property name="uri" value="redis://host:port"/>
    </bean>

and use it then within your managed beans as follows:

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

Once your standalone-application exits, remember to shutdown Lettuce by using the shutdown method:

    client.shutdown();

If you are using Spring and CDI, the frameworks manage the resources for you and you do not have to close the client using the shutdown method.

### Using SSL and Lettuce

For an added security measure, you can secure the connection using SSL connections. Lettuce supports SSL connections natively.

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

### Reading and writing data with Lettuce

Once connected to Redis, you can start reading and writing data. The following code snippet writes the value bar to the Redis key foo, reads it back, and prints it:

    // open a connection to Redis
    ...
    
    connection.set("foo", "bar");
    String value = connection.get("foo");
    System.out.println(value);

The output of the above code should be:

    $ java ReadWriteExample
    Connected to Redis
    bar

## Jedis

Jedis is a simple, complete, thread-safe Java client for Redis.

### Installing Jedis

Jedis' installation instructions are given in the ["How do I Use it?" section](https://github.com/xetorthio/jedis/#how-do-i-use-it) of its README file. Use Jedis by declaring the following Maven dependency:

    <dependency>
        <groupId>redis.clients</groupId>
        <artifactId>jedis</artifactId>
        <version>2.6.2</version>
        <type>jar</type>
        <scope>compile</scope>
    </dependency>

You can also download the latest [Jedis release](https://github.com/xetorthio/jedis/releases) from the GitHub repository. To build it, extract the source and run the following command:

    $ cd jedis
    ~/jedis$ make package

### Opening a connection to Redis using Jedis

The following code creates a connection to Redis using Jedis:

    import redis.clients.jedis.Jedis;
     
    public class JedisExample {
     
      public static void main(String[] args) throws Exception {
        Jedis jedis = new Jedis("hostname", port);
        jedis.auth("password")
        System.out.println("Connected to Redis");
      }
    }

To adapt this example to your code, make sure that you replace the following values with those of your database:

- In line 6, the first argument to `Jedis` should be your database's hostname or IP address
- In line 6, the second argument to `Jedis` should be your database's port
- In line 7, the argument to `auth` should be your database's password

### Connection pooling with Jedis

Jedis isn't thread-safe, and the same Jedis instance shouldn't be used from different threads. To overcome the overhead of multiple Jedis instances and connection maintenance, use `JedisPool`. To use JedisPool you'll have to have `Apache Commons Pool 2.3` available - download it  [here]( http://commons.apache.org/proper/commons-pool/download_pool.cgi) or add the following Maven dependency:

    <dependency>
        <groupId>org.apache.commons</groupId>
        <artifactId>commons-pool2</artifactId>
        <version>2.3</version>
    </dependency>

The following code instantiates a pool of connections:

    JedisPool pool = new JedisPool(new JedisPoolConfig(), "hostname", port, Protocol.DEFAULT_TIMEOUT, "password");

If you're using Spring, use the following Plain Spring XML to create JedisPool:

    <bean id="jedisPool" class="redis.clients.jedis.JedisPool">
            <constructor-arg index="0" ref="jedisPoolConfig" />
            <constructor-arg index="1" value="hostname" />
            <constructor-arg index="2" value="port" />
            <constructor-arg index="3" value="Protocol.DEFAULT_TIMEOUT" />
            <constructor-arg index="4" value="password" />
        </bean>
    
        <bean id="jedisPoolConfig" class="redis.clients.jedis.JedisPoolConfig" >
    </bean>

JedisPool is thread-safe and can be stored in a static variable and shared among threads. The following code gets a Jedis instance from the JedisPool:

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

Once your application exits, remember to dispose of the `JedisPool` by using the `destroy` method:

    pool.destroy();

### Using SSL and Jedis

Jedis does not support SSL connections natively. For an added security measure, you can secure the connection using [stunnel](https://redislabs.com/blog/using-stunnel-to-secure-redis) or this [Jedis fork](https://github.com/RedisLabs/jedis) that has been added with SSL support.

## Reading and writing data with Jedis

Once connected to Redis, you can start reading and writing data. The following code snippet writes the value `bar` to the Redis key `foo`, reads it back, and prints it:

    // open a connection to Redis
    ...
 
    jedis.set("foo", "bar");
    String value = jedis.get("foo");
    System.out.println(value);

The output of the above code should be:

    $ java JedisExample
    Connected to Redis
    bar
