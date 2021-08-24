---
Title: Redis with .NET
linkTitle: .NET
description:
weight:
alwaysopen: false
categories: ["RS"]
---
In order to use Redis in .NET, you need a .NET Redis client. This article shows how to use [StackExchange.Redis](https://github.com/StackExchange/StackExchange.Redis), a general purpose Redis client.  More .NET Redis clients can be found in the [C# section](https://redis.io/clients#c-sharp) of the Redis Clients page.

## Installing StackExchange.Redis

There are several ways to install this package including:

1. With the [.NET CLI](https://docs.microsoft.com/en-us/dotnet/core/tools/):
```sh
dotnet add package StackExchange.Redis
```
2. with the [package manager console](https://nuget-tutorial.net/en/tutorial/100009/package-manager-console):
```sh
`PM> Install-Package StackExchange.Redis`
```
3. With the [NuGet GUI](https://docs.microsoft.com/en-us/nuget/consume-packages/install-use-packages-visual-studio) in Visual Studio

## Opening a Connection to Redis Using StackExchange.Redis

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

To configure the connection to your environment, adjust the parameters in the [ConfigurationOptions](https://stackexchange.github.io/StackExchange.Redis/Configuration) object appropriately. For the remainder of the examples, the configuration will simply be `localhost`.

## Connection Pooling with StackExchange.Redis

StackExchange.Redis does not support conventional connection pooling.  We recommend sharing and reusing the ConnectionMultiplexer object. The ConnectionMultiplexer object should not be created for each operation.  Instead, create an instance at the beginning and then reuse the object throughout your process. ConnectionMultiplexer is thread-safe so it can be safely shared between threads. For more information, see the  [Basics document](https://stackexchange.github.io/StackExchange.Redis/Basics).

## Dependency Injection of the ConnectionMultiplexer

As the [`ConnectionMultiplexer`](https://stackexchange.github.io/StackExchange.Redis/Basics) must be shared and reused within a runtime, it's recommended that you use [dependency injection](https://docs.microsoft.com/en-us/dotnet/core/extensions/dependency-injection) to pass it where it's needed. There's a few flavors of dependency injection depending on what you're using.

### ASP.NET Core 

A single [`ConnectionMultiplexer`](https://stackexchange.github.io/StackExchange.Redis/Basics) instance should be shared throughout the runtime. Use the [`AddSingleton`](https://docs.microsoft.com/en-us/dotnet/api/microsoft.extensions.dependencyinjection.servicecollectionserviceextensions.addsingleton?view=dotnet-plat-ext-5.0) method of [`IServiceCollection`](https://docs.microsoft.com/en-us/dotnet/api/microsoft.extensions.dependencyinjection.iservicecollection?view=dotnet-plat-ext-5.0) to inject your instance as a dependency in.NET Core when configuring your app's services in `Startup.cs`:


```csharp
public void ConfigureServices(IServiceCollection services)
{
    //Configure other services up here
    var multiplexer = ConnectionMultiplexer.Connect("localhost");
    services.AddSingleton<IConnectionMultiplexer>(multiplexer);
}
```

Once the service is registered, you can inject it into anything that allows dependency injection, such as MVC Controllers, API Controllers, Blazor Server Components, and more.  Simply hand the service to the appropriate controller.  Here's how to pass it to a `RedisController` instance:

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

In-process Azure Functions handle dependency injection similarly to ASP.NET Core. You:
1. Create a `Startup.cs` file
2. Extend `FunctionStartup`
3. Override the `Configure` method
4. Add the multiplexer as a Singleton service for the function.



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

Unlike in-process functions, out-of-process functions handle dependency injection in the `Main` method of `Program` class.  Modify the `HostBuilder` build pipeline to call `ConfigureServices` and add a properly to configure [`ConnectionMultiplexer`](https://stackexchange.github.io/StackExchange.Redis/Basics). Here's an example:

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

In both instances, you can pull out the Multiplexer by injecting it into the constructor of the class housing your functions:


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

StackExchange.Redis was the first Redis client to natively support TLS, as shown here:

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

To learn how to run Redis Server with TLS enabled, see [TLS Support](https://redis.io/topics/encryption).

### Converting certificates from .key to .pfx format

To easily convert a .key certificate to .pfx format use OpenSSL:

    openssl pkcs12 -export -in user.crt -inkey user_private.key -certfile garantia_ca.pem -out certificate.pfx 

**Important:** if you're using a self-signed certificate, remember to install it on your server with the Certificate Manager tool.

### Using SSL and a StackExchange.Redis-based Provider

Sometimes you need to use a 3rd-party library, such as when running a session on a cache provider that connects to Redis with the StackExchange.Redis client. When you need to provide an SSL certificate for the connection and the 3rd-party library does not expose a public interface for it, you can "sideload" the certificate to StackExchange.Redis by setting the following environment variables:

- `SERedis_ClientCertPfxPath should` be set to the path of your .pfx file
- `SERedis_ClientCertPassword` should be set to the password of your .pfx file
