---
Title: Encryption
description:
weight: 30
alwaysopen: false
categories: ["RS"]
---
Redis Enterprise Software uses self-signed certificates by default ensure that the product is secure.

The self-signed certificates establish encryption-in-transit for the following cluster components:

- The admin console
- The REST API
- The Proxy, which manages connections between clients and database endpoints
- The Syncer, which synchronizes data between clusters (using either Active-Active or Active-Passive replication)
- The metrics exporter, which sends metrics to Prometheus

These self-signed certificates are generated on the first node of each RS installation and are copied to all other nodes added to the cluster.

When you use the default self-signed certificates and you connect to the admin console over a web browser, you'll seen an untrusted connection notification.

Depending on your browser, you can allow the connection for each session or add an exception to trust the certificate for all future sessions.

{{< warning >}}
When you update the certificates, the new certificate replaces the same certificates on all nodes in the cluster.
{{< /warning >}}


This section details how you can configure certificates and encryption for Redis Enterprise Software. This includes setting up your own certificate, configuring TLS, and enforcing HTTPS.<!--more-->

## Installing your own certificates

Follow these instructions to install your own certificates. Note that you can install a separate certificate per cluster component.

**Step 1:** Create a private key

```sh
openssl genrsa -out <key-file-name>.pem 2048
```

**Step 2:** Create a certificate signing request
```sh
openssl req -new -key <key-file-name>.pem -out <key-file-name>.csr
```

{{< note >}}
You will be prompted for a Country Name, State or Province Name, Locality Name, Organization Name, Organizational Unit and Common Name. You will need to check with your security team or certificate authority for the right values for your organization. The database's fully qualified domain name (FQDN) is typically used as the common name for the certificate.
{{< /note >}}

**Step 3:** Sign the private key using your certificate authority
- How to obtain a CA signed certificate is different for each organization and CA vendor. Consult your security team or certificate authority for the appropriate way to sign a certificate.

**Step 4:** Upload the certificate to the cluster

Use the `rladmin` command line utility to replace the current certificate. You'll run the `cluster certificate set` command, followed by the name of the certificate to set, the certificate filename, and the key filename.

The certificate names are as follows:
    - For the admin console: `cm`
    - For the REST API: `api`
    - For the Proxy: `proxy`
    - For the Syncer: `syncer`
    - For the metrics exporter: `metrics_exporter`

For example, to replace the certificate for the admin console, run the following `rladmin` command:

```sh
 rladmin cluster certificate set cm certificate_file <cert-file-name>.pem key_file <key-file-name>.pem
```
To replace the rest api certificate use the rladmin command line utility:

```sh
 rladmin cluster certificate set api certificate_file <cert-file-name>.pem key_file <key-file-name>.pem
```
To replace the metrics exporter certificate use the rladmin command line utility:

```sh
 rladmin cluster certificate set metrics_exporter certificate_file <cert-file-name>.pem key_file <key-file-name>.pem
```

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
    - Redis Enterprise Software uses openssl to implement TLS ([List of available configurations](https://www.openssl.org/docs/man1.0.2/man1/ciphers.html))

The below example uses the Mozilla intermediate compatibility cipher list

```sh
rladmin cluster config cipher_suites 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384'
```

{{< note >}}
Its generally reccomended to use TLS 1.2 or higher. Ensure you check with your security team for the TLS protocols and ciphers that meet your organizations policies.
{{< /note >}}

## Requiring HTTPS for API Endpoints

By default, the Redis Enterprise Software API supports communication over HTTP and HTTPS. However, you can disable support for HTTP to ensure that API requests are encrypted.
Before you disable HTTP support, be sure to migrate any scripts or proxy configurations that use HTTP to the encrypted API endpoint to prevent broken connections. To disable HTTP support for API endpoints, run:

```sh
rladmin cluster config http_support disabled
```
