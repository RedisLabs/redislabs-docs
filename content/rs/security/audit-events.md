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

When tracked events are triggered, notifications are sent to `syslog`, which must be running on the machine running Redis Enterprise Software.  (Note: `syslog` is not enabled by default for Redis Docker images.)

For performance reasons, auditing is disabled by default.  In addition, auditing occurs in the background (asynchronously) and is non-blocking by design.  That is, the action that triggered the notification continues without regard to the status of the notification or the listening tool.  

## Enable audit notifications

### Cluster audits

Use `rladmin` to enable auditing for a cluster:

```
rladmin tune cluster db_conns_auditing enabled
```

To deactivate auditing, set `db_conns_auditing` to `disabled`.

### Database audits

Use `rladmin` to enable audit notifications for an individual database:

```
rladmin tune db db:<id> db_conns_auditing enabled
```

where `<id`>` is the database ID reported by `rladmin info`.

To deactivate auditing, set `db_conns_auditing` to `disabled`.

## Audit notification examples

Audit notifications are reported as JSON objects.

### New connection

This example reports a new connection for a database:

``` json
{
  "new_conn":
  {
     "id":1001000, 
     "src":"127.0.0.1/46934",
     "trg":"127.0.0.1/10000",
     "hname":"",
     "dst_bdb":"1"
  }
}
```

### Authentication request

Here is a sample authentication request for a database:

``` json
{
   "auth":
   {
      "client_id":1001000,
      "username":"default",
      "state":2,
      "acl-user":"default"
   }
}
```

State reports success or failure.  Values of `2` or `8` indicate success; other values indicate failure.

### Database disconnect

In this example, the connection to the `DB1` database is closed.

``` json
{
   "close_conn":1001000
}
```