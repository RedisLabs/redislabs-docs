---
title: Updating SSL/TLS Certificates
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: ["/rs/administering/cluster-operations/updating-certificates"]
---

Redis Enterprise Software (RS) uses self-signed certificates out-of-the-box to make sure that the product is secure by default.
The self-signed certificates are used to establish encryption-in-transit for the following traffic:

- Management admin console (CM) - The certificate for connections to the management admin console
- REST API - The certificate for REST API calls
- Proxy - The certificate for connections between clients and database endpoints
- Syncer - The certificate for Active-Active and Replica Of synchronization between clusters
- Metrics exporter - The certificate to export metrics to Prometheus

These self-signed certificates are generated on the first node of each RS installation and are copied to all other nodes added to the cluster.

When you use the default self-signed certificates and you connect to the admin console over a web browser, you'll seen an untrusted connection notification.

Depending on your browser, you can allow the connection for each session or add an exception to trust the certificate for all future sessions.

{{< warning >}}
When you update the certificates, the new certificate replaces the same certificates on all nodes in the cluster.
{{< /warning >}}

## How to update TLS certificates

You can use either the rladmin CLI or the REST API to update the certificates.

### Using the CLI

To replace certificates using the rladmin CLI, run:

```sh
 rladmin cluster certificate set <cert-name> certificate_file <cert-file-name>.pem key_file <key-file-name>.pem
```

Where:

- cert-name - The name of certificate you want to replace:
  - For management UI: `cm`
  - For REST API: `api`
  - For database endpoint: `proxy`
  - For syncer: `syncer`
  - For metrics exporter: `metrics_exporter`
- cert-file-name - The name of your certificate file
- key-file-name - The name of your key file

For example, to replace the cm certificate with the private key "key.pem" and the certificate file "cluster.pem":

```sh
rladmin cluster certificate set cm certificate_file cluster.pem key_file key.pem
```

### Using the REST API

To replace a certificate using the REST API, run:

```sh
curl -k -X PUT -u "<username>:<password>" -H "Content-Type: application/json" -d '{ "name": "<cert_name>", "key": "<key>", "certificate": "<cert>" }' https://<cluster_address>:9443/v1/cluster/update_cert
```

Where:

- cert_name - The name of the certificate to replace:
  - For management UI: `cm`
  - For REST API: `api`
  - For database endpoint: `proxy`
  - For syncer: `syncer`
  - For metrics exporter: `metrics_exporter`
- key - The contents of the \*\_key.pem file

      {{< tip >}}

  The key file contains `\n` end of line characters (EOL) that you cannot paste into the API call.
  You can use `sed -z 's/\n/\\\n/g'` to escape the EOL characters.
  {{< /tip >}}

- cert - The contents of the \*\_cert.pem file

The new certificates are used the next time the clients connect to the database.

When you upgrade RS, the upgrade process copies the certificates that are on the first upgraded node to all of the nodes in the cluster.

## TLS protocol and ciphers

TLS protocols and ciphers define the overall suite of algorithms that clients are able to connect to the servers with. You can change the TLS protocols and ciphers to improve the security posture of your RS cluster and databases. The default settings are in line with industry best practices, but you can customize them to match the security policy of your organization.

The communications for which you can modify TLS protocols and ciphers are:

- Control plane - The TLS configuration for cluster administration using the admin console and API.
- Data plane - The TLS configuration for the communication between the applications and the databases.
- Discovery service (Sentinel) - The TLS configuration for the [discovery service]({{< relref "/rs/concepts/data-access/discovery-service.md" >}}).

You can configure the TLS protocols and ciphers with the `rladmin` commands shown here, or with the REST API.

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

After you set the minimum TLS version, RS does not accept communications with
TLS versions older than the specified version.

### Cipher configuration

{{<note>}}
Redis Enterprise Software doesn't support Diffie–Hellman key exchange (`DHE-`) ciphers.
{{</note>}}
{/note}

#### Control plane cipher suite configuration (for 6.0.8 or earlier)

See the example below to configure cipher suites for the control plane.:

```sh
rladmin cluster config cipher_suites ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305
```

#### Control plane cipher suite configuration (for 6.0.12 or later)

Control plane cipher suites use the BoringSSL library format for TLS connections to the admin console. See the BoringSSL documentation for a full list of available [BoringSSL configurations](https://github.com/google/boringssl/blob/master/ssl/test/runner/cipher_suites.go#L99).

See the example below to configure cipher suites for the control plane.:

```sh
rladmin cluster config cipher_suites ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305
```

#### Data plane cipher suite configuration (for 6.0.20 or later)

Data plane cipher suites use the OpenSSL library format. See OpenSSL documentation for a list of available [OpenSSL configurations](https://www.openssl.org/docs/man1.0.2/man1/ciphers.html)

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
