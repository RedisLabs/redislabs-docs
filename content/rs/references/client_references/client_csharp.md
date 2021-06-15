---
Title: Using Redis with .NET
description:
weight:
alwaysopen: false
categories: ["RS"]
---
In order to use Redis in .NET you need a .NET Redis client. In following sections, we demonstrate the use of [StackExchange.Redis](https://github.com/StackExchange/StackExchange.Redis), a general purpose Redis client. Additional .NET clients for Redis can be found under the [C# section](https://redis.io/clients#c-sharp) of the Redis Clients page.

## Installing StackExchange.Redis

There are several ways to install this package including:

1. With the .NET CLI: 
```sh
dotnet add package StackExchange.Redis
```
2. with the package manager console: 
```sh
`PM> Install-Package StackExchange.Redis`
```
3. With the NuGet GUI in Visual Studio   

## Opening a Connection to Redis Using StackExchange.Redis

The following code creates a connection to Redis using StackExchange.Redis in the context of a trivial console application:

```csharp
using StackExchange.Redis;
using System;
using System.Threading.Tasks;

namespace ReferenceConsoleRedisApp
{
    class Program
    {
        static readonly ConnectionMultiplexer redis = ConnectionMultiplexer.Connect(
            new ConfigurationOptions{
                EndPoints = {"localhost:6379"}                
            });
        static async Task Main(string[] args)
        {
            var db = redis.GetDatabase();
            var pong = await db.PingAsync();
            Console.WriteLine(pong);
        }
    }
}

```

The above example assumes that you have a Redis Server running locally.

To configure the connection to your environment, adjust the parameters in the [ConfigurationOptions](https://stackexchange.github.io/StackExchange.Redis/Configuration) object appropriately. For the remainder of the examples the configuration will simply be `localhost`.

## Connection Pooling with StackExchange.Redis

While StackExchange.Redis does not provide direct means for conventional connection pooling, we recommend you **share and reuse** the ConnectionMultiplexer object. The ConnectionMultiplexer object should not be created per operation - it is to be created only once at the beginning and reused for the duration of the run. ConnectionMultiplexer is thread-safe so it can be safely shared between threads. For more information, refer to StackExchange.Redis’s [Basic Usage document](https://stackexchange.github.io/StackExchange.Redis/Basics).

## Dependency Injection of the ConnectionMultiplexer

As the `ConnectionMultiplexer` must be shared and reused within a runtime, it's recommended that you use [dependency injection](https://docs.microsoft.com/en-us/dotnet/core/extensions/dependency-injection) to pass it where it's needed. There's a few flavors of dependency injection depending on what you're using.

### ASP.NET Core 

A single `ConnectionMultiplexer` instance should be shared throughout the runtime, therefore the most appropriate pattern to use for dependency injection in .NET Core is to inject it as a singleton. In `Startup.cs`, add the connection logic to your `ConfigureServices` method, e.g.

```csharp
public void ConfigureServices(IServiceCollection services)
{
    //Configure other services up here
    var multiplexer = ConnectionMultiplexer.Connect("localhost");
    services.AddSingleton<IConnectionMultiplexer>(multiplexer);
}
```

With the service registered, you can then inject the service into anything that allows dependency injection e.g. MVC Controllers, API Controllers, Blazor Server Components etc. . . By simply handing it to the constructor of that type, for example, if we wanted to pass it to a `RedisController` we would do so with the following:

```csharp
[Route("api/[controller]")]
[ApiController]
public class RedisController : ControllerBase
{
    private readonly IConnectionMultiplexer _redis;
    
    public RedisController(IConnectionMultiplexer redis)
    {
        _redis = redis;
    }

    [HttpGet("foo")]
    public async Task<IActionResult> Foo()
    {
        var db = _redis.GetDatabase();
        var foo = await db.StringGetAsync("foo");
        return Ok(foo.ToString());
    }
}
```

### Azure Functions

There are two types of Azure functions to consider [in-process](https://docs.microsoft.com/en-us/azure/azure-functions/functions-dotnet-class-library) and [out-of-process](https://docs.microsoft.com/en-us/azure/azure-functions/dotnet-isolated-process-guide). Both handle dependency injection differently.

#### In-Process Azure Functions

In-process Azure Functions handle dependency injection very similarly to how it's handled in ASP.NET Core. Create a Startup.cs file, and have the class extend `FunctionStartup`, override the `Configure` method, an add the multiplexer as a Singleton service for the function:


```csharp
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;
[assembly: FunctionsStartup(typeof(MyNamespace.Startup))]

namespace MyNamespace
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            var muxer = ConnectionMultiplexer.Connect("localhost");
            builder.Services.AddSingleton<IConnectionMultiplexer>(muxer);            
        }
    }
}
```

#### Out-Of-Process Azure Functions

Out-of-process Functions are newer, unlike in-process functions, dependency injection is handled in the `Main` method of `Program` class, modify the `HostBuilder` build pipeline to add a `ConfigureServices` call, adding a properly configured `ConnectionMultiplexer`. That method should look like: 

```csharp
public static void Main()
{
    var host = new HostBuilder()
        .ConfigureFunctionsWorkerDefaults()
        .ConfigureServices(s=>s.AddSingleton<IConnectionMultiplexer>(ConnectionMultiplexer.Connect("localhost"))) // add this line
        .Build();

    host.Run();
}
```

In both instances you can pull out the Multiplexer by injecting it into the constructor of the class housing your functions:


```csharp
public class RedisTrigger
{
    private readonly IConnectionMultiplexer _redis;

    public RedisTrigger(IConnectionMultiplexer redis){
        _redis = redis;
    }
    [FunctionName("RedisTrigger")]
    public async Task<IActionResult> Foo(
        [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
        ILogger log)
    {
        var db = _redis.GetDatabase();
        var bar = await db.StringGetAsync("foo");

        return new OkObjectResult(bar.ToString());
    }
}
```

## Using SSL and StackExchange.Redis

StackExchange.Redis is the first Redis client that natively supported TLS. The following code has the StackExchange Redis Client operate on a TLS connection:

```csharp
using StackExchange.Redis;
using System;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace ConnectToRedisWithTls
{
    class Program
    {

        const string PATH_TO_CERT_FILE = "c:\\PATH\\TO\\CERT.pfx";        

        static async Task Main(string[] args)
        {
            var configurationOptions = new ConfigurationOptions
            {
                EndPoints = { "localhost:6379" },
                Ssl = true
            };
            configurationOptions.CertificateSelection += delegate {
                var cert = new X509Certificate2(PATH_TO_CERT_FILE, "");
                return cert;
            };
            var redis = await ConnectionMultiplexer.ConnectAsync(configurationOptions);
            Console.WriteLine(redis.GetDatabase().Ping());
        }
    }
}
```
- Modify the `PATH_TO_CERT_FILE` to match the path to your certificate
- Modify the `Endpoints` setting to point at your endpoint(s)
- If necessary, add a `Password` to the Configuration options

For information about how to run Redis Server with TLS enabled See the [TLS Support](https://redis.io/topics/encryption) section of the Redis documentation.

### Converting certificates from .key to .pfx format

To easily convert a .key certificate to .pfx format use OpenSSL:

    openssl pkcs12 -export -in user.crt -inkey user_private.key -certfile garantia_ca.pem -out certificate.pfx 

**Important:** if you're using a self-signed certificate, remember to install it on your server with the Certificate Manager tool.

### Using SSL and a StackExchange.Redis-based Provider

Sometimes you need to use a 3rd-party library, such as when running a session on a cache provider that connects to Redis with the StackExchange.Redis client. When you need to provide an SSL certificate for the connection and the 3rd-party library does not expose a public interface for it, you can "sideload" the certificate to StackExchange.Redis by setting the following environment variables:

- `SERedis_ClientCertPfxPath should` be set to the path of your .pfx file
- `SERedis_ClientCertPassword` should be set to the password of your .pfx file
