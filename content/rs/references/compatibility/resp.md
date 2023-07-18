---
Title: RESP compatibility with Redis Enterprise
linkTitle: RESP
description: Redis Enterprise supports RESP2 and RESP3. 
weight: 80
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: 
---

RESP (REdis Serialization Protocol) is the protocol that clients use to communicate with Redis databases. See the [RESP protocol specification](https://redis.io/docs/reference/protocol-spec/) for more information.

## Supported RESP versions

- RESP2 is supported by all Redis Enterprise versions.

- RESP3 is supported by Redis Enterprise 7.2 and later.

## Enable RESP3

To use RESP3 with Redis Enterprise:

1. Upgrade Redis servers to version 7.2 or later.

    For Active-Active and Replica Of databases:
 
    1. Upgrade all participating clusters to Redis Enterprise version 7.2.x or later.
 
    1. Upgrade all databases to version 7.x or later.

1. Enable RESP3 support for your database (`enabled` by default):

    ```sh
    rladmin tune db db:<ID> resp3 enabled
    ```

 ## Deactivate RESP3

 To deactivate RESP3 support for a database:

 ```sh
 rladmin tune db db:<ID> resp3 disabled
 ```

 When RESP3 is deactivated, connected clients that use RESP3 are disconnected from the database.

{{<note>}}
You cannot use sharded pub/sub if you deactivate RESP3 support.
{{</note>}}

## Client prerequisites for Redis 7.2 upgrade

The Redis clients [Go-Redis](https://redis.uptrace.dev/) version 9 and [Lettuce](https://lettuce.io/) versions 6 and later use RESP3 by default. If you use either client to run Redis Stack commands, you should set the client's protocol version to RESP2 before upgrading your database to Redis version 7.2 to prevent potential application issues due to RESP3 breaking changes.

### Go-Redis

For applications using Go-Redis v9.0.5 or later, set the protocol version to RESP2:

```go
client := redis.NewClient(&redis.Options{
    Addr:     "<database_endpoint>",
    Protocol: 2, // Pin the protocol version
})
```

### Lettuce

To set the protocol version to RESP2 with Lettuce v6 or later:

```java
import io.lettuce.core.*;
import io.lettuce.core.api.*;
import io.lettuce.core.protocol.ProtocolVersion;

// ...
RedisClient client = RedisClient.create("<database_endpoint>");
client.setOptions(ClientOptions.builder()
        .protocolVersion(ProtocolVersion.RESP2) // Pin the protocol version 	
        .build());
// ...
```

If you are using [LettuceMod](https://github.com/redis-developer/lettucemod/), you need to upgrade to [v3.6.0](https://github.com/redis-developer/lettucemod/releases/tag/v3.6.0).