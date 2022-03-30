---
Title: Manage encryption
description:
weight: 30
alwaysopen: false
categories: ["RS"]
aliases: 
---

This section details how you can configure encryption for Redis Enterprise Software. This includes configuring TLS and enforcing HTTPS.

## TLS Configuration

To set the minimum TLS protocols for the control plane use the following command:

- Default TLS Protocols: TLSv1.0
- Syntax: `rladmin cluster config cluster config min_control_TLS_version <TLS_Version>`
- TLS versions available:
    - For TLSv1 - 1
    - For TLSv1.1 - 1.1
    - For TLSv1.2 - 1.2

For example:

```sh
rladmin cluster config min_control_TLS_version 1.2
```

To set the TLS ciphers for the control plane use the following command:

- Default TLS Protocols: HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH
- Syntax: `rladmin cluster config cipher_suites '<openssl_cipher_list>'`
    - Redis Enterprise Software uses openssl to implement TLS ([List of available configurations](https://www.openssl.org/docs/man1.1.1/man1/ciphers.html))

The below example uses the Mozilla intermediate compatibility cipher list

```sh
rladmin cluster config cipher_suites 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384'
```

{{< note >}}
Its generally recommended to use TLS 1.2 or higher. Ensure you check with your security team for the TLS protocols and ciphers that meet your organizations policies.
{{< /note >}}

## Requiring HTTPS for API Endpoints

By default, the Redis Enterprise Software API supports communication over HTTP and HTTPS. However, you can disable support for HTTP to ensure that API requests are encrypted.
Before you disable HTTP support, be sure to migrate any scripts or proxy configurations that use HTTP to the encrypted API endpoint to prevent broken connections. To disable HTTP support for API endpoints, run:

```sh
rladmin cluster config http_support disabled
```
