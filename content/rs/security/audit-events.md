---
title: Audit connection events
linkTitle: Audit events
description: Describes how to audit connection events. 
weight: 15
alwaysopen: false
categories: ["RS"]
aliases: [ "/rs/security/audit-connections/",
           "/rs/security/audit-connections.md/",
           "/rs/security/audit-events.md" ]
---

Starting with version 6.2.18, Redis Enterprise Software lets you audit database connection and authentication events.  This helps you track and troubleshoot connection activity.

The following events are tracked:

- Database connection attempts
- Authentication requests, including requests for new and existing connections
- Database disconnects

When tracked events are triggered, notifications are sent via TCP to an address and port defined when auditing is enabled.  Notifications appear in the near real-time and are intended to be consumed by an external listener, such as a TCP listener, third-party service, or related utility.

For development and testing environments, notifications can be saved to a local file; however, this is neither supported nor intended for production environments.

For performance reasons, auditing is disabled by default.  In addition, auditing occurs in the background (asynchronously) and is non-blocking by design.  That is, the action that triggered the notification continues without regard to the status of the notification or the listening tool.  

## Enable audit notifications

### Cluster audits

To enable auditing for your cluster, use:

- `rladmin`

    ```
    rladmin cluster config auditing db_conns \
       audit_protocol <TCP|local> \
       audit_address <address> \
       audit_port <port> \
       audit_reconnect_interval <interval in seconds> \
       audit_reconnect_max_attempts <number of attempts>
    ```

    where:

    - _audit\_protocol_ indicates the protocol used to process notifications.  For production systems, _TCP_ is the only value. 

    - _audit\_address_ defines the TCP/IP address where one can listen for notifications

    - _audit\_port_ defines the port where one can listen for notifications
   
    - _audit\_reconnect\_interval_ defines the interval (in seconds) between attempts to reconnect to the listener. Default is 1 second.
    
    - _audit\_reconnect\_max\_attempts_ defines the maximum number of attempts to reconnect. Default is 0. (infinite)

    Development systems can set _audit\_protocol_ to `local` for testing and training purposes; however, this setting is _not_ supported for production use.  
    
    When `audit_protocol` is set to `local`, `<address>` should be set to a [stream socket](https://man7.org/linux/man-pages/man7/unix.7.html) defined on the machine running Redis Enterprise and _`<port>`_ should not be specified: 
    
    ```
    rladmin cluster config auditing db_conns \
       audit_protocol local audit_address <output-file>
    ```

    The output file (and path) must be accessible by the user and group running Redis Enterprise Software.

- the REST API

    ```
    PUT /v1/cluster/auditing/db_conns
    { 
        "audit-address":"<address>", 
        "audit-port":<port>, 
        "audit_protocol":"TCP",
        "audit_reconnect_interval":<interval>,
        "audit_reconnect_max_attempts":<max attempts>
    }
    ```

    where `<address>` is a string containing the TCP/IP address, `<port>` is a numeric value representing the port, `<interval>` is a numeric value representing the interval in seconds and `<max attempts>` is a numeric value representing the maximum number of attempts to execute.

### Database audits

Once auditing is enabled for your cluster, you can audit individual databases.  To do so, use:

- `rladmin`

    ```
    rladmin tune db db:<id|name> db_conns_auditing enabled
    ```

    where the value of the _db:_ parameter is either the cluster ID of the database or the database name.

    To deactivate auditing, set `db_conns_auditing` to `disabled`.

    Use `rladmin info` to retrieve additional details:

    ```
    rladmin info db <id|name>
    rladmin info cluster
    ```

- the REST API

    ```
    PUT /v1/bdb/1
    { "db_conns_auditing":"enabled" }
    ```

    To disable auditing, set `db_conns_auditing` to `disabled`.

You must enable auditing for your cluster before auditing a database; otherwise, an error appears:

>  _Error setting description: Unable to enable DB Connections Auditing before feature configurations are set.                                                                                                  
>  Error setting error_code: db_conns_auditing_config_missing_

To resolve this error, enable the protocol for your cluster _before_ attempting to audit a database.

### Policy defaults for new databases

To audit connections for new databases by default, use:

- `rladmin`

    ```
    rladmin tune cluster db_conns_auditing enabled
    ```

    To deactivate this policy, set `db_conns_auditing` to `disabled`.

- the REST API

    ```
    PUT /v1/cluster/policy
    { "db_conns_auditing":true }
    ```

    To deactivate this policy, set `db_conns_auditing` to `false`.

## Notification examples

Audit event notifications are reported as JSON objects.

### New connection

This example reports a new connection for a database:

``` json
{
    "ts":1655821384,
    "new_conn":
    {
        "id":2285001002 ,
        "srcip":"127.0.0.1",
        "srcp":"39338",
        "trgip":"127.0.0.1",
        "trgp":"12635",
        "hname":"",
        "bdb_name":"DB1",
        "bdb_uid":"5"
    }
}
```

### Authentication request

Here is a sample authentication request for a database:

``` json
{
    "ts":1655821384,
    "action":"auth",
    "id":2285001002 ,
    "srcip":"127.0.0.1",
    "srcp":"39338",
    "trgip":"127.0.0.1",
    "trgp":"12635",
    "hname":"",
    "bdb_name":"DB1",
    "bdb_uid":"5",
    "status":2,
    "username":"user_one",
    "identity":"user:1",
    "acl-rules":"~* +@all"
}
```

State reports success or failure.  Values of `2` or `8` indicate success; other values indicate failure.

### Database disconnect

Here's what's reported when a database connection is closed:

``` json
{
    "ts":1655821384,
    "close_conn":
    {
        "id":2285001002,
        "srcip":"127.0.0.1",
        "srcp":"39338",
        "trgip":"127.0.0.1",
        "trgp":"12635",
        "hname":"",
        "bdb_name":"DB1",
        "bdb_uid":"5"
    }
}
```

## Notification field reference

The field value that appears immediately after the timestamp describes the action that triggered the notification.  The following values may appear:

- `new_conn` indicates a new external connection
- `new_int_conn` indicates a new internal connection 
- `close_conn` occurs when a connection is closed
- `"action":"auth"` indicates an authentication request and can refer to new authentication requests or authorization checks on existing connections

In addition, the following fields may also appear in audit event notifications:

| Field&nbsp;name | Description |
|:---------:|-------------|
| `acl-rules` | ACL rule associated with the connection, which includes a rule for the `default` user. |
| `bdb_name` | Destination database name - the name of the database being accessed | 
| `bdb_uid` | Destination database ID - The cluster ID of the database being accessed | 
| `hname` | Client hostname - The hostname of the client.  Currently empty; reserved for future use. |
| `id` | Connection ID - Unique connection ID assigned by the proxy |
| `identity` | Identity - A unique ID value assigned by the proxy to the user for the current connection. |
| `srcip` | Source IP address - Source TCP/IP address of the client accessing the Redis database |
| `srcp` | Source port - Port associated with the source IP address accessing the Redis database.  Can be combined with the address to uniquely identify the socket. |
| `status` | Status result code - An integer representing the result of an authentication request. |
| `trgip` | Target IP address - The IP address of the destination being accessed by the action |
| `trgp` | Target port - The port of the destination being access by the action.  Can be combined with the destination IP address to uniquely identify the database being accessed. |
| `ts`  | Timestamp - The date and time of the event, in [Coordinated Universal Time](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) (UTC).  Granularity is within one millisecond (ms). |
| `username` | Authentication username  - Username associated with the connection; can include `default` for databases that allow default access.  (Passwords are _not_ recorded). |

## Status result codes

The `status` field reports the results of an authentication request as an integer.  Here's what different values mean:

| Error&nbsp;value | Error code | Description | 
|:-------------:|------------|-------------|
| `0` | AUTHENTICATION_FAILED | Invalid username and/or password |
| `1` | AUTHENTICATION_FAILED_TOO_LONG | Username or password are too long |
| `2` | AUTHENTICATION_NOT_REQUIRED | Client tried to authenticate, but authentication isn't necessary. | 
| `3` | AUTHENTICATION_DIRECTORY_PENDING | Attempt to receive authentication info from Directory in async mode |
| `4` | AUTHENTICATION_DIRECTORY_ERROR | Authentication attempt failed because there was a directory connection error |
| `5` | AUTHENTICATION_SYNCER_IN_PROGRESS | Syncer SASL handshake, return SASL response and wait for next request | 
| `6` | AUTHENTICATION_SYNCER_FAILED | Syncer SASL handshake, return SASL response and close the connection |
| `7` | AUTHENTICATION_SYNCER_OK | Syncer authenticated. Return SASL response |
| `8` | AUTHENTICATION_OK | Client successfully authenticated

