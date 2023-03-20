---
Title: Database connection auditing
linkTitle: db_conns_auditing
description: Audit database connections 
weight: $weight
alwaysopen: false
toc: "true"
headerRange: "[1-2]"
categories: ["RS"]
aliases: 
---

Use (`db_conns_auditing`) to set a default [database connection auditing]({{<relref "/rs/security/audit-events">}}) policy for all new databases created in the cluster.

When enabled, database connection auditing tracks the following events:

- Database connection attempts

- Authentication requests, including requests for new and existing connections

- Database disconnects

Auditing is not enabled by default. To enable auditing for all new databases created in the cluster, you need to:

1. Configure [database connection auditing settings](#config-settings).

1. Set the [default database connection auditing policy](#policy-values) for the cluster.

## Policy values

| Value | Description |
|-------|-------------|
| disabled | Don't audit connections for new databases by default. |
| enabled  | [Audit connections]({{<relref "/rs/security/audit-events">}}) for new databases by default. |

## Configuration {#config-settings}

Audit database connections configuration:

| Name | Type/Value | Description |
|------|------------|-------------|
| audit_address | string | TCP/IP address where one can listen for notifications. |
| audit_port | integer | Port where one can listen for notifications. |
| audit_protocol | `TCP`<br />`local` | Protocol used to process notifications. For production systems, `TCP` is the only valid value. |
| audit_reconnect_interval | integer | Interval (in seconds) between attempts to reconnect to the listener. Default is 1 second. |
| audit_reconnect_max_attempts | integer | Maximum number of attempts to reconnect. Default is 0 (infinite). |

Development systems can set _audit\_protocol_ to `local` for testing and training purposes; however, this setting is _not_ supported for production use.  
    
When `audit_protocol` is set to `local`, `<address>` should be set to a [stream socket](https://man7.org/linux/man-pages/man7/unix.7.html) defined on the machine running Redis Enterprise and _`<port>`_ should not be specified: 
    
```
rladmin cluster config auditing db_conns \
   audit_protocol local audit_address <output-file>
```

The output file and path must be accessible by the user and group running Redis Enterprise Software.

## Examples

To configure auditing for your cluster, use:

- `rladmin`

    ```
    rladmin cluster config auditing db_conns \
       audit_protocol <TCP|local> \
       audit_address <address> \
       audit_port <port> \
       audit_reconnect_interval <interval in seconds> \
       audit_reconnect_max_attempts <number of attempts>
    ```

- the [REST API]({{<relref "/rs/references/rest-api/requests/cluster/auditing-db-conns#put-cluster-audit-db-conns">}})

    ```
    PUT /v1/cluster/auditing/db_conns
    { 
        "audit_address": "<address>", 
        "audit_port": <port>, 
        "audit_protocol": "TCP",
        "audit_reconnect_interval": <interval>,
        "audit_reconnect_max_attempts": <max attempts>
    }
    ```

To audit connections for new databases by default, use:

- `rladmin`

    ```
    rladmin tune cluster db_conns_auditing enabled
    ```

    To deactivate this policy, set `db_conns_auditing` to `disabled`.

- the [REST API]({{<relref "/rs/references/rest-api/requests/cluster/policy#put-cluster-policy">}})

    ```
    PUT /v1/cluster/policy
    { "db_conns_auditing": true }
    ```

    To deactivate this policy, set `db_conns_auditing` to `false`.

