---
Title: Database command requests
linkTitle: command
description: Database command requests
weight: $weight
alwaysopen: false
headerRange: "[1-2]"
categories: ["RS"]
aliases: /rs/references/rest-api/bdbs/command
         /rs/references/rest-api/bdbscommand.md
         /rs/references/restapi/bdbs/command
         /rs/references/restapi/bdbs/command.md
         /rs/references/rest_api/bdbs/command
         /rs/references/rest_api/bdbs/command.md
---

| Method | Path | Description |
|--------|------|-------------|
| [POST](#post-bdbs-command) | `/v1/bdbs/{uid}/command` | Execute command |

## Execute command {#post-bdbs-command}

	POST /v1/bdbs/{int: uid}/command

Execute a Redis or Memcached command, per the db type.

#### Required permissions

| Permission name |
|-----------------|
| [execute_redis_or_memcached_command]({{<relref "/rs/references/rest-api/permissions#execute_redis_or_memcached_command">}}) |

### Request {#post-request} 

#### Example HTTP request

	POST /bdbs/<int:uid>/command 

#### Example JSON body

1. To run the `INFO` command on Redis DB
    ```json
    {
        "command": "INFO"
    }
    ```

2. To run the `HSET` command on Redis DB
    ```json
    {
        "command": "HSET",
        "args": ["myhash", "foo", "bar"]
    }
    ```

3. To run the `flush_all` command on Memcached DB
    ```json
    {
        "command": "flush_all"
    }
    ```

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Accept | application/json | Accepted media type |

#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| uid | integer | The uid of the db to run the command on. |

#### Request body

The request must contain a JSON object with a `command` field. Certain commands may also require a JSON array of arguments.

| Field | Type | Description |
|-------|------|-------------|
| command | string | Command to execute (required) |
| args | list | List of command arguments (required for certain commands) |

### Response {#post-response} 

Returns a JSON object that contains different responses based on the database type.

#### Example JSON body

1. The result of the `INFO` command on Redis DB
    ```json
    {
        "response": {
            "aof_current_rewrite_time_sec": -1,
            "aof_enabled": 0,
            "aof_last_bgrewrite_status": "ok",

            "// Additional fields"
        }
    }
    ```

2. The result of the `HSET` command on Redis DB
    ```json
    {
        "response": 1
    }
    ```

3. The result of the `flush_all` command on Memcached DB
    ```json
    {
        "response": true
    }
    ```

### Status codes {#post-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | OK |
| [400 Bad Request](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1) | Malformed or bad command |
| [503 Service Unavailable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.4) | Redis connection error, service unavailable |
| [500 Internal Server Error](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.1) | Internal error |
