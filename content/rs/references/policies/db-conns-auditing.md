---
Title: Database connection auditing
linkTitle: db_conns_auditing
description: Audit database connections.
weight: $weight
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: 
---

Use `db_conns_auditing` to set a default [database connection auditing]({{<relref "/rs/security/audit-events">}}) policy for all new databases created in the cluster.

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

Before you can enable database connection auditing, you need to configure the following settings:

| Name | Type/Value | Description |
|------|------------|-------------|
| audit_address | string | Use the TCP/IP address to listen for notifications.<br /><br />When `audit_protocol` is `local`, set `audit_address` to a [stream socket](https://man7.org/linux/man-pages/man7/unix.7.html) on the machine running Redis Enterprise Software. |
| audit_port | integer | Use the port to listen for notifications.<br /><br />Don't specify a port if `audit_protocol` is `local`. |
| audit_protocol | `TCP`<br />`local` | Protocol used to process notifications.<br /><br />For development and test environments, you can set `audit_protocol` to `local`. However, you must use `TCP` to audit production environments. |
| audit_reconnect_interval | integer | Interval (in seconds) between attempts to reconnect to the listener. Default is 1 second. |
| audit_reconnect_max_attempts | integer | Maximum number of reconnection attempts. Default is 0 (infinite). |

## Examples

### Configure auditing

To configure auditing for your cluster, use one of the following methods:

- [`rladmin cluster config`]({{<relref "/rs/references/cli-utilities/rladmin/cluster/config">}})

    ```
    rladmin cluster config auditing db_conns \
       audit_protocol <TCP|local> \
       audit_address <address> \
       audit_port <port> \
       audit_reconnect_interval <interval in seconds> \
       audit_reconnect_max_attempts <number of attempts>
    ```

- [REST API request]({{<relref "/rs/references/rest-api/requests/cluster/auditing-db-conns#put-cluster-audit-db-conns">}})

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

### Use local audit_protocol

To configure auditing in a development or test environment using the `local` `audit_protocol`, run:

```
rladmin cluster config auditing db_conns \
   audit_protocol local audit_address <output-file>
```

The user and group running Redis Enterprise Software must be able to access the output file.

### Audit databases by default

To audit connections for new databases by default, use one of the following methods:

- [`rladmin tune cluster`]({{<relref "/rs/references/cli-utilities/rladmin/tune#tune-cluster">}})

    ```
    rladmin tune cluster db_conns_auditing enabled
    ```

- [REST API request]({{<relref "/rs/references/rest-api/requests/cluster/policy#put-cluster-policy">}})

    ```
    PUT /v1/cluster/policy
    { "db_conns_auditing": true }
    ```

