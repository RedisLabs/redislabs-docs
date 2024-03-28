---
Title: Redis Cloud changelog (December 2023)
linktitle: December 2023
description: New features, enhancements, and other changes added to Redis Cloud during December 2023.
highlights: Active-Active JSON support, mTLS enhancements
weight: 72
alwaysopen: false
categories: ["RC"]
aliases: []
---

## New features

### Active-Active JSON support

[Active-Active databases]({{<relref "rc/databases/configuration/active-active-redis">}}) on Redis Cloud now support the [JSON]({{< relref "/stack/json" >}}) data type. 

See [Create an Active-Active subscription]({{<relref "/rc/databases/create-database/create-active-active-database">}}) to learn how to create an Active-Active subscription.

### Mutual TLS enhancements

Databases that support [Transport layer security (TLS)]({{<relref "/rc/security/database-security/tls-ssl">}}) now support multiple client certificates for use with mutual TLS. This makes it easier to rotate client certificates outside of a maintenance window. In addition, you can now provide a client Certificate Authority chain to trust any leaf certificate it signed for more flexibility.

See [Transport layer security (TLS)]({{<relref "/rc/security/database-security/tls-ssl">}}) to learn how to enable TLS. 

