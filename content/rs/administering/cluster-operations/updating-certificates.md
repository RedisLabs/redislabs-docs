---
title: Updating SSL/TLS certificates
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Redis Enterprise Software (RS) uses self-signed certificates in its out of the box configuration to ensure the product is secure by default. This self-signed certificate is used to establish encryption-in-transit for the following traffic:

- Management User Interface (UI)
- REST API
- Connections between clients and database endpoints
- Synchronization between databases for ReplicaOf and CRDB
- Discovery Services

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

## TLS Protocol and Cipher Configuration

TLS protocols and ciphers define the overall suite of algorithms that clients are able to connect to the servers with. The below guidance may be used to improve the security posture of your Redis Database and while it is aligned with industry best practice, may be customized to align with your organizations security policy.

There are two primary locations and one optional location that you may need to modify TLS protocols and ciphers:

- Management Path - This defines the TLS configuration for the cluster UI and API and is used to administrative activities.
- Data Path - This defines the TLS configuration for the communication between a client and your databases and shards within the cluster.
- Sentinel - If you chose to leverage Sentinel as a discovery service

To set the minimum TLS version to use within these paths use the REST API or the following rladmin
commands:

**For the management path you can set the below configurations:**

How to set the minimum TLS protocol:

- Default TLS Protocols: TLSv1.0
- Syntax: rladmin cluster config cluster config min_control_TLS_version <TLS Version>
- TLS versions may be configured with the following options:
        - TLSv1: 1
        - TLSv1.1: 1.1
        - TLSv1.2: 1.2
        - The below example uses TLS 1.2

```bash
    rladmin cluster config min_control_TLS_version 1.2
 ```

TLS Ciphers

- Default TLS Protocols: HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH
- Syntax: rladmin cluster config cipher_suites '<openssl cipher list>'
- Redis Enterprise Software uses openssl to implement TLS. Lists of availible configurations can be found here: https://www.openssl.org/docs/manmaster/man1/ciphers.html
- The below example uses the Mozilla intermediate compatibility cipher list.

```bash
rladmin cluster config cipher_suites 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384'
```


**For the data path you can set the below configurations:**

How to set the  minimum TLS protocol:

- Default TLS Protocols: TLSv1.0
- Syntax: rladmin cluster config cluster config min_data_TLS_version <TLS Version>
- TLS versions may be configured with the following options:
        - TLSv1: 1
        - TLSv1.1: 1.1
        - TLSv1.2: 1.2
- The below example uses TLS 1.2

```bash
rladmin cluster config min_data_TLS_version 1.2
```

**If you use Sentinel for discovery instead of DNS you can set the below configuration:**

How to require TLS:

- Default: Not Set
- Syntaxt: rladmin cluster config sentinel_ssl_policy <ssl_policy>
- The ssl_policy may be set with the following options
        - allowed - sentinel will allow both SSL and non-SSL connections
        - required - sentinel will allow only SSL connections
        - disabled - sentinel will allow only non-SSL connections
- The below example requires SSL in Sentinel

How to set minimum TLS version for Sentinel:
- Default: Not Set
- Syntaxt: rladmin cluster config sentinel_ssl_policy min_data_TLS_version <TLS Version>
- TLS versions may be configured with the following options:
        - TLSv1: 1
        - TLSv1.1: 1.1
        - TLSv1.2: 1.2
- The below example uses TLS 1.2

```bash
rladmin cluster config sentinel_ssl_policy required min_data_TLS_version 1.2
```

- The sentinel service needs to be restarted in order for your changes to take effect. You can do this with the following commands:

```bash
supervisorctl restart sentinel_service
```

After you set the minimum TLS version, RS does not accept communications with
TLS versions older than the specified version.

