---
Title: Redis Cloud changelog (December 2023)
linktitle: December 2023
description: New features, enhancements, and other changes added to Redis Cloud during December 2023.
highlights: Active-Active JSON support, Full mTLS support
weight: 72
alwaysopen: false
categories: ["RC"]
aliases: []
---

## New features

### Active-Active JSON support

[Active-Active databases]({{<relref "rc/databases/active-active-redis">}}) on Redis Cloud now support the [JSON]({{< relref "/stack/json" >}}) data type. 

See [Create an Active-Active subscription]({{<relref "rc/subscriptions/create-active-active-subscription">}}) to learn how to create an Active-Active subscription.

### Full mutual TLS (mTLS) support

Databases that support [Transport layer security (TLS)]({{<relref "/rc/security/database-security/tls-ssl">}}) now support full mutual TLS (mTLS) features. When you enable mutual TLS, you can now provide certificate chains that include the root certificate and an intermediate CA without the leaf (end-entity) certificate. 

See [Transport layer security (TLS)]({{<relref "/rc/security/database-security/tls-ssl">}}) to learn how to enable TLS. 