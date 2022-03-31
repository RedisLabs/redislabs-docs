---
Title: Manage encryption
linkTitle: Manage encryption
description:
weight: 30
alwaysopen: false
categories: ["RS"]
aliases: 
---

This section details how you can configure encryption for Redis Enterprise Software.

## Require HTTPS for API endpoints

By default, the Redis Enterprise Software API supports communication over HTTP and HTTPS. However, you can turn off support for HTTP to ensure that API requests are encrypted.

Before you turn off HTTP support, be sure to migrate any scripts or proxy configurations that use HTTP to the encrypted API endpoint to prevent broken connections.

To turn off HTTP support for API endpoints, run:

```sh
rladmin cluster config http_support disabled
```
