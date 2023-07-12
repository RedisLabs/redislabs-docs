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

- RESP2 is supported by Redis Enterprise 6.0 and later.

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

{{<note>}}
You cannot use sharded pub/sub if you deactivate RESP3 support.
{{</note>}}

## Migration guides

TBA