---
Title: Using Redis with .Net C#
description:
weight:
alwaysopen: false
categories: ["RS"]
---
In order to use Redis with C# you need a C# Redis client. In following sections, we demonstrate the use of [StackExchange.Redis](https://github.com/StackExchange/StackExchange.Redis), General purpose Redis client. Additional C# clients for Redis can be found under the [C# section](http://redis.io/clients#c) of the Redis Clients page.

## Installing StackExchange.Redis

StackExchange.Redis' installation instructions are given in the ["Installation" section](https://stackexchange.github.io/StackExchange.Redis/) of its documentation page. It can be installed via the nuget package manager console with the following command:

    PM> Install-Package StackExchange.Redis

## Opening a Connection to Redis Using StackExchange.Redis

The following code creates a connection to Redis using StackExchange.Redis:

    using StackExchange.Redis;
    
    readonly ConnectionMultiplexer muxer = ConnectionMultiplexer.Connect("hostname:port,password=password");
    IDatabase conn = muxer.GetDatabase();

To adapt this example to your code, make sure that you replace the following values with those of your database:

- In line 1, the first part of the string argument to `Connect` should be your database's endpoint
- In line 1, the second part of the string argument to `Connect` should be your database's password

## Connection pooling with StackExchange.Redis

While StackExchange.Redis does not provide direct means for conventional connection pooling, we recommend you **share and reuse** the ConnectionMultiplexer object. The ConnectionMultiplexer object should not be created per operation - it is to be created only once at the beginning and reused for the duration of the run. ConnectionMultiplexer is thread-safe so it can be safely shared between threads. For more information, refer to StackExchange.Redis’ [Basic Usage document](https://stackexchange.github.io/StackExchange.Redis/Basics).

## Using SSL and StackExchange.Redis

StackExchange.Redis is the first Redis client that natively supported SSL. The following code opens an SSL connection:

    using StackExchange.Redis;
    using System.Security.Cryptography.X509Certificates;
    using System.Net.Security;

    var options = new ConfigurationOptions
    {
        EndPoints = { "hostname:port" },
        Password = "password",
        Ssl = true
    };
    options.CertificateSelection += delegate {
                return new X509Certificate2("d:\path\filname.pfx", "");
            };

    readonly ConnectionMultiplexer muxer = ConnectionMultiplexer.Connect(options);
    IDatabase conn = muxer.GetDatabase();

- In line 6, the first part of the string argument should be your database's endpoint or IP address
- In line 6, the second part of the string argument should be your database's port
- In line 7, the string argument should be your database's password
- In line 11, replace with the path to your .pfx file

### Converting certificates from .key to .pfx format

To easily convert a .key certificate to .pfx format use OpenSSL:

    openssl pkcs12 -export -in user.crt -inkey user_private.key -certfile garantia_ca.pem -out certificate.pfx 

**Important:** if you're using a self-signed certificate, remember to install it on your server with the Certificate Manager tool.

### Using SSL and a StackExchange.Redis-based Provider

Sometimes you need to use a 3rd-party library, such as when running a session on a cache provider that connects to Redis with the StackExchange.Redis client. When you need to provide an SSL certificate for the connection and the 3rd-party library does not expose a public interface for it, you can "sideload" the certificate to StackExchange.Redis by setting the following environment variables:

- `SERedis_ClientCertPfxPath should` be set to the path of your .pfx file
- `SERedis_ClientCertPassword` should be set to the password of your .pfx file

## Reading and writing data with StackExchange.Redis

Once connected to Redis, you can start reading and writing data. The following code snippet writes the value `bar` to the Redis key `foo`, reads it back, and prints it:

    ///<summary>
    ///open a connection to Redis
    ///</summary>
    ...

    conn.StringSet("foo", "bar");
    var value = conn.StringGet("foo");
    Console.WriteLine(value);

The output of the above code should be:

    bar
