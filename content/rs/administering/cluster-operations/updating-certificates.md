---
title: Updating SSL/TLS certificates
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

## How to update SSL/TLS certificates

**For versions 5.2.0 and above:** ([Procedures for previous releases]({{< relref "/rs/references/procedures-previous-releases.md#Updating-SSL/TLS-certificates-for-Previous-Releases" >}}))

{{% warning %}}The new certificate replaces the equivalent certificate on all nodes in the cluster. Existing certificates are overwritten.{{% /warning %}}

- Use the REST API to replace the certificate:

    ```bash

    curl -k -X PUT -u "<username>:<password>" -H "Content-Type: application/json" -d '{ "name": "<cert_name>", "key": "<key>", "certificate": "<cert>" }' https://<cluster_address>:9443/v1/cluster/update_cert

    ```

    Where:

    - cert_name - The name of the certificate to replace:
        - For management UI: `cm`
        - For REST API: `api`
        - For database endpoint: `proxy`
        - For syncer: `syncer`
    - key - The contents of the *_key.pem file

    {{% tip %}}The key file contains `\n` end of line characters (EOL) that you cannot paste into the API call. You can use `sed -z 's/\n/\\\n/g'` to escape the EOL characters.{{% /tip %}}

    - cert - The contents of the *_cert.pem file

    The certificate is copied automatically to all nodes in the cluster.

When you upgrade RS, the upgrade process copies the certificates on the first upgraded node to all of the nodes in the cluster.

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
