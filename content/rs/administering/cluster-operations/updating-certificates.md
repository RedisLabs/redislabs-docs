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
- Synchronization data between databases for ReplicaOf and CRDB

These self-signed certificates are generated on the first node of each RS installation. These certificates are then copied to all other nodes added to the cluster.

{{% note %}}When using the default self-signed certificates, an untrusted
connection notification will appear in the management UI. If you do not
update the self-signed certificate with your own certificate, depending
on the browser you use, you might be able to allow the connection for
this specific session, or add an exception to make this site trusted in
future sessions.{{% /note %}}

## How to update SSL/TLS certificates

{{% warning %}}The new certificate replaces the equivalent certificate on all nodes in the cluster. Existing certificates are overwritten.{{% /warning %}}

- Use the REST API to replace the certificate:

    ```bash

    curl -k -X PUT -u "<username>:<password>" -H "Content-Type: application/json" -d '{ "name": "<cert_name>", "key": <key>, "certificate": <cert> }' https://<cluster_address>:9443/v1/cluster/update_cert

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

## **TLS version**

To set the minimum TLS version that can be used for encrypting various
flows, use the REST API or the following rladmin
commands:

- For the management UI and REST API:

    ```bash
    rladmin> cluster config min_control_TLS_version [version, e.g. 1.2]
    ```

- For data path encryption:

    ```bash
    rladmin> cluster config min_data_TLS_version [version, e.g. 1.2]
    ```

{{% note %}}Communications using older TLS versions will not be
allowed.{{% /note %}}
