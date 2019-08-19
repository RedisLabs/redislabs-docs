---
title: Updating SSL/TLS Certificates
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Redis Enterprise Software (RS) uses self-signed certificates to encrypt
the following traffic:

- Management UI
- REST API
- Connections between clients and the database endpoint
- Synchronization between databases for ReplicaOf and CRDB

These self-signed certificates are generated on the first node of each RS installation. These certificates are then copied to all other nodes added to the cluster.

{{% note %}}When using the default self-signed certificates, an untrusted
connection notification will appear in the management UI. If you do not
update the self-signed certificate with your own certificate, depending
on the browser you use, you might be able to allow the connection for
this specific session, or add an exception to make this site trusted in
future sessions.{{% /note %}}

## How to update TLS certificates

You can replace an existing certificate on the cluster leveraging the rladmin command-line utility.

There are 5 different types of certificates that can be replaced starting in RS version 5.4.x. These may be replaced leveraging the below command.

- API - This is the certificate used by the API
- CM  - This is the certificate used by the management user interface or the cluster manager. It is also used for the sentinel discovery service if you are using sentinel
- Proxy  - This is the certificate used to establish communication between a client and the databases
- Syncer  - This is the certificate used to encrypt replication between clusters
- Metrics_Exporter - This is the certificate used by Prometheus.

The below command syntax can be used to replace certificates substituting the below variables:

- certificate-type - The type of certificate you want to replace
- key-file-name - The name of your non-password protected key file.
- certificate-file-name - The name of your certificate file

    ```bash
 rladmin cluster certificate set <certificate-type> certificate_file <certificate-file-name>.pem key_file <key-file-name>.pem
    ```

For example, the following command would replace the cm certificate with the private key "key.pem" and the certificate file "cluster.pem"

   ```bash
   
rladmin cluster certificate set cm certificate_file cluster.pem key_file key.pem

   ```
   
   When you upgrade RS, the upgrade process copies the certificates on the first upgraded node to all of the nodes in the cluster.


## TLS Protocol and Ciphers

TLS protocols and ciphers define the overall suite of algorithms that clients are able to connect to the servers with. You can change the TLS protocols and ciphers to improve the security posture of your RS cluster and databases. The default settings are in line with industry best practices, but you can customize them to match the security policy of your organization.

The communications for which you can modify TLS protocols and ciphers are:

- Management path - The TLS configuration for cluster administration using the web UI and API.
- Data path - The TLS configuration for the communication between the applications and the databases.
- Discovery service (Sentinel) - The TLS configuration for the [discovery service]({{< relref "/rs/concepts/data-access/discovery-service.md" >}}).

You can configure the TLS protocols and ciphers with the rladmin commands shown here, or with the REST API.

### TLS protocol for the management path

To set the minimum TLS protocol for the management path:

- Default TLS Protocols: TLSv1.0
- Syntax: `rladmin cluster config cluster config min_control_TLS_version <TLS_Version>`
- TLS versions available:
    - For TLSv1 - 1
    - For TLSv1.1 - 1.1
    - For TLSv1.2 - 1.2

For example:

```src
rladmin cluster config min_control_TLS_version 1.2
```

### TLS protocol for the data path and discovery service

To set the minimum TLS protocol for the data path:

- Default TLS Protocols: TLSv1.0
- Syntax: `rladmin cluster config cluster config min_data_TLS_version <TLS_Version>`
- TLS versions available:
    - For TLSv1 - 1
    - For TLSv1.1 - 1.1
    - For TLSv1.2 - 1.2

For example:

```src
rladmin cluster config min_data_TLS_version 1.2
```

For your changes to take effect on the discovery service, restart the service with the command:

```src
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

```src
rladmin cluster config sentinel_ssl_policy required min_data_TLS_version 1.2
```

For your changes to take effect on the discovery service, restart the service with the command:

```src
supervisorctl restart sentinel_service
```

After you set the minimum TLS version, RS does not accept communications with
TLS versions older than the specified version.

### Cipher Configuration

When you set the TLS ciphers, the new TLS ciphers are used for management communications only.

To set the TLS ciphers:

- Default TLS Protocols: HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH
- Syntax: `rladmin cluster config cipher_suites '<openssl_cipher_list>'`
    - Redis Enterprise Software uses openssl to implement TLS ([List of available configurations](https://www.openssl.org/docs/manmaster/man1/ciphers.html))
- The below example uses the Mozilla intermediate compatibility cipher list

```src
rladmin cluster config cipher_suites 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384'
```
