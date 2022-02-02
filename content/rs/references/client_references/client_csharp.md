---
Title: Redis with .NET
linkTitle: .NET
description: The StackExchange.Redis client allows you to use Redis with .NET.
weight: 30
alwaysopen: false
categories: ["RS"]
---
In order to use Redis with [.NET](https://dotnet.microsoft.com/learn/dotnet/what-is-dotnet), you need a .NET Redis client. This article shows how to use [StackExchange.Redis](https://github.com/StackExchange/StackExchange.Redis), a general purpose Redis client.  More .NET Redis clients can be found in the [C# section](https://redis.io/clients#c-sharp) of the Redis Clients page.

## Install StackExchange.Redis

There are several ways to install this package including:

- With the [.NET CLI](https://docs.microsoft.com/en-us/dotnet/core/tools/):
    ```sh
    dotnet add package StackExchange.Redis
    ```
- With the [package manager console](https://nuget-tutorial.net/en/tutorial/100009/package-manager-console):
    ```sh
    PM> Install-Package StackExchange.Redis
    ```
- With the [NuGet GUI](https://docs.microsoft.com/en-us/nuget/consume-packages/install-use-packages-visual-studio) in Visual Studio

## Connect to Redis

The following code creates a connection to Redis using StackExchange.Redis in the context of a console application:

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

To configure the connection to your environment, adjust the parameters in the [ConfigurationOptions](https://stackexchange.github.io/StackExchange.Redis/Configuration) object appropriately. For the remainder of the examples, the configuration uses `localhost`.

## Connection pooling

StackExchange.Redis does not support conventional connection pooling. As an alternative solution, you can share and reuse the `ConnectionMultiplexer` object.

Do not create a separate `ConnectionMultiplexer` for each operation. Instead, create an instance at the beginning and then reuse the object throughout your process. 

`ConnectionMultiplexer` is [thread-safe](https://en.wikipedia.org/wiki/Thread_safety), so it can be safely shared between threads. For more information, see the [Basic Usage](https://stackexchange.github.io/StackExchange.Redis/Basics).

### Dependency injection of the ConnectionMultiplexer

As the [`ConnectionMultiplexer`](https://stackexchange.github.io/StackExchange.Redis/Basics) must be shared and reused within a runtime, it's recommended that you use [dependency injection](https://docs.microsoft.com/en-us/dotnet/core/extensions/dependency-injection) to pass it where it's needed. There's a few flavors of dependency injection depending on what you're using.

### ASP.NET Core 

A single [`ConnectionMultiplexer`](https://stackexchange.github.io/StackExchange.Redis/Basics) instance should be shared throughout the runtime.

Use the [`AddSingleton`](https://docs.microsoft.com/en-us/dotnet/api/microsoft.extensions.dependencyinjection.servicecollectionserviceextensions.addsingleton?view=dotnet-plat-ext-5.0) method of [`IServiceCollection`](https://docs.microsoft.com/en-us/dotnet/api/microsoft.extensions.dependencyinjection.iservicecollection?view=dotnet-plat-ext-5.0) to inject your instance as a dependency in [ASP.NET Core](https://dotnet.microsoft.com/learn/aspnet/what-is-aspnet-core) when configuring your app's services in `Startup.cs`:


```csharp
public void ConfigureServices(IServiceCollection services)
{
    //Configure other services up here
    var multiplexer = ConnectionMultiplexer.Connect("localhost");
    services.AddSingleton<IConnectionMultiplexer>(multiplexer);
}
```

Once the service is registered, you can inject it into anything that allows dependency injection, such as MVC Controllers, API Controllers, Blazor Server Components, and more.

The following code shows how to pass the service to a `RedisController` instance:

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

There are two types of Azure Functions to consider: [in-process](https://docs.microsoft.com/en-us/azure/azure-functions/functions-dotnet-class-library) and [out-of-process](https://docs.microsoft.com/en-us/azure/azure-functions/dotnet-isolated-process-guide). Both handle dependency injection differently.

#### In-process Azure Functions

In-process Azure Functions handle dependency injection similarly to ASP.NET Core.

To use dependency injection, follow these steps:
1. Create a `Startup.cs` file
2. Extend `FunctionsStartup`
3. Override the `Configure` method
4. Add the multiplexer as a singleton service for the function.



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

#### Out-of-process Azure Functions

Unlike in-process functions, out-of-process functions handle dependency injection in the `Main` method of the `Program` class. 

Modify the `HostBuilder` build pipeline to call `ConfigureServices` and configure the [`ConnectionMultiplexer`](https://stackexchange.github.io/StackExchange.Redis/Basics), as shown in the following example:

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

For both in-process and out-of-process functions, you can pass the Multiplexer by injecting it into the constructor of the class housing your functions:


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

## TLS

StackExchange.Redis natively support TLS, as shown here:

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
- Modify the `EndPoints` setting to point to your endpoint(s)
- If necessary, add a `Password` to the `ConfigurationOptions`

To learn how to run Redis Server with TLS enabled, see [TLS Support](https://redis.io/topics/encryption).

### Convert certificate format

To easily convert a .key certificate to .pfx format, use [OpenSSL](https://www.openssl.org/):

    openssl pkcs12 -export -in user.crt -inkey user_private.key -certfile garantia_ca.pem -out certificate.pfx 

{{<note>}}
If you're using a self-signed certificate, remember to install it on your server with the Certificate Manager tool.
{{</note>}}

### Use SSL and a StackExchange.Redis-based provider

Sometimes you need to use a 3rd-party library, such as when running a session on a cache provider that connects to Redis with the StackExchange.Redis client. When you need to provide an SSL certificate for the connection and the 3rd-party library does not expose a public interface for it, you can "sideload" the certificate to StackExchange.Redis by setting the following environment variables:

- Set `SERedis_ClientCertPfxPath` to the path of your .pfx file
- Set `SERedis_ClientCertPassword` to the password of your .pfx file
