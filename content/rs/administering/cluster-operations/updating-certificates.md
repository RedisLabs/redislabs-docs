---
title: Updating SSL/TLS certificates
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Redis Enterprise Software (RS) uses self-signed certificates to encrypt
the following:

- Management UI
- REST API
- The connection between the client and the database endpoint (TLS
    encryption)
- Syncer connection that synchronizes data between databases for ReplicaOf and CRDB

These self-signed certificates are generated on the first node of each RS installation. These certificates are then copied to all other nodes added to the cluster.

**Note**: When using the default self-signed certificates, an untrusted
connection notification will appear in the management UI. If you do not
update the self-signed certificate with your own certificate, depending
on the browser you use, you might be able to allow the connection for
this specific session, or add an exception to make this site trusted in
future sessions.

## How to update SSL/TLS certificates

**For versions 5.2.0 and above:** ([Procedures for previous releases]({{< relref "/rs/references/procedures-previous-releases.md#Updating-SSL/TLS-certificates-for-Previous-Releases" >}}))

Warning: The new certificate replaces the equivalent certificate on all nodes in the cluster. Existing certificates are overwritten.

- Use the REST API to replace the certificate:

    ```bash

    curl -k -X PUT -u "<username>:<password>" -H "Content-Type: application/json" -d '{ "name": "<cert_name>", "key": <key>, "certificate": <cert> }' https://<cluster_address>:9443/v1/cluster/update_cert

    ```
 
    Where:

    - cert_name - The certificate to replace: cm, api, proxy, syncer
    - key - The contents of the *_key.pem file
    - cert - The contents of the *_cert.pem file

    The certificate is copied automatically to all nodes in the cluster.

When you upgrade RS, the upgrade process copies the certificates on the first upgraded node to all of the nodes in the cluster.

## **TLS version**

To set the minimum TLS version that can be used for encrypting various
flows, use the REST API or the following rladmin
commands:

- For the management UI and REST API:

            rladmin> cluster config min_control_TLS_version [version, e.g. 1.2]

- For data path encryption:

            rladmin> cluster config min_data_TLS_version [version, e.g. 1.2]

Note that communications using older TLS versions will not be
allowed.