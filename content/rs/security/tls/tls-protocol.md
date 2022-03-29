---
title: TLS protocol and ciphers
linkTitle: Protocol and ciphers
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: 
---

TLS protocols and ciphers define the overall suite of algorithms that clients are able to connect to the servers with. You can change the TLS protocols and ciphers to improve the security posture of your Redis Enterprise cluster and databases. The default settings are in line with industry best practices, but you can customize them to match the security policy of your organization.

The communications for which you can modify TLS protocols and ciphers are:

- Control plane - The TLS configuration for cluster administration using the admin console and API.
- Data plane - The TLS configuration for the communication between the applications and the databases.
- Discovery service (Sentinel) - The TLS configuration for the [discovery service]({{< relref "/rs/concepts/data-access/discovery-service.md" >}}).

You can configure the TLS protocols and ciphers with the `rladmin` commands shown here, or with the REST API.

Be aware that TLS support depends on the operating system.  You cannot enable support for protocols or versions that aren't supported by the operating system running Redis Enterprise Software.  In addition, updates to the operating system or to Redis Enterprise Software can impact protocol and version support.  

To illustrate, version 6.2.8 of Redis Enterprise Software removed support for TLS 1.0 and TLS 1.1 on Red Hat Enterprise Linux 8 (RHEL 8) because that operating system [does not enable support](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/security_hardening/using-the-system-wide-cryptographic-policies_security-hardening) for these versions by default.  

If you have trouble enabling specific versions of TLS, verify that they're supported by your operating system and that they're configured correctly.

### TLS protocol for the control plane

To set the minimum TLS protocol for the control plane:

- Default TLS Protocols: TLSv1.0
- Syntax: `rladmin cluster config min_control_TLS_version <TLS_Version>`
- TLS versions available:
  - For TLSv1 - 1
  - For TLSv1.1 - 1.1
  - For TLSv1.2 - 1.2

For example:

```sh
rladmin cluster config min_control_TLS_version 1.2
```

### TLS protocol for the data plane and discovery service

To set the minimum TLS protocol for the data path:

- Default TLS Protocols: TLSv1.0
- Syntax: `rladmin cluster config min_data_TLS_version <TLS_Version>`
- TLS versions available:
  - For TLSv1 - 1
  - For TLSv1.1 - 1.1
  - For TLSv1.2 - 1.2

For example:

```sh
rladmin cluster config min_data_TLS_version 1.2
```

For your changes to take effect on the discovery service, restart the service with the command:

```sh
supervisorctl restart sentinel_service
```

### Enabling TLS for the discovery service

To enable TLS for the discovery service:

- Default: Allows both TLS and non-TLS connections
- Syntax: `rladmin cluster config sentinel_ssl_policy <ssl_policy>`
- ssl_policy values available:
  - `allowed` - Allows both TLS and non-TLS connections
  - `required` - Allows only TLS connections
  - `disabled` - Allows only non-TLS connections

For example:

```sh
rladmin cluster config sentinel_ssl_policy required min_data_TLS_version 1.2
```

For your changes to take effect on the discovery service, restart the service with the command:

```sh
supervisorctl restart sentinel_service
```

After you set the minimum TLS version, Redis Enterprise Software does not accept communications with
TLS versions older than the specified version.

### Cipher configuration

{{<note>}}
Redis Enterprise Software doesn't support static Diffie–Hellman key exchange ciphers.
Redis Enterprise Software does support Ephemeral Diffie–Hellman key exchange ciphers on RHEL8 and Bionic OS.
{{</note>}}

#### Control plane cipher suite configuration (for 6.0.8 or earlier)

See the example below to configure cipher suites for the control plane.:

```sh
rladmin cluster config cipher_suites ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305
```

#### Control plane cipher suite configuration (for 6.0.12 or later)

Control plane cipher suites use the BoringSSL library format for TLS connections to the admin console. See the BoringSSL documentation for a full list of available [BoringSSL configurations](https://github.com/google/boringssl/blob/master/ssl/test/runner/cipher_suites.go#L99-L131).

See the example below to configure cipher suites for the control plane.:

```sh
rladmin cluster config cipher_suites ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305
```

#### Data plane cipher suite configuration (for 6.0.20 or later)

Data plane cipher suites use the OpenSSL library format. See OpenSSL documentation for a list of available [OpenSSL configurations](https://www.openssl.org/docs/man1.1.1/man1/ciphers.html)

See the example below to configure cipher suites for the data plane:

```sh
rladmin cluster config data_cipher_list AES128-SHA:AES256-SHA
```

#### Sentinel service cipher suite configuration (for 6.0.20 or later)

Sentinel service cipher suites use the golang.org OpenSSL format for discovery service TLS connections. See their documentation for a list of [available configurations](https://golang.org/src/crypto/tls/cipher_suites.go).

See the example below to configure cipher suites for the sentinel service:

```sh
rladmin cluster config sentinel_cipher_suites TLS_RSA_WITH_AES_128_CBC_SHA:TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
```

When you modify your cipher suites, make sure that:

- The configured TLS version matches the required cipher suites
- The certificates in use are properly signed to support the required cipher suites
