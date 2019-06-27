---
title: Updating SSL/TLS certificates
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Redis Enterprise Software (RS) uses self-signed certificates in its out of the box configuration to ensure the product is secure by default. This self-signed certificate is used to establish encryption-in-transit for the following traffic:

- RS Management User Interface (UI)
- RS's REST API
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

## How to update TLS certificates in RS 5.4.x and Later

You can replace an existing certificate on the cluster leveraging the rladmin command-line utility.

There are 5 different types of certificates that can be replaced starting in RS version 5.4.x. These should be replaced

- API - This is the certificate used by the API
- CM  - This is the certificate used by the management user interface or the cluster manager. It is also used for the sentinel discovery service if you are using sentinel
- Proxy  - This is the certificate used to establish communication between a client and the databases
- Syncer  - This is the certificate used to encrypt replication between clusters 
- Metrics_Exporter - This is the certificate used by Prometheus.

The below command syntax can be used to replace certificates substituting the below variables:

- <certificate-type> - the type of certificate you want to replace
- <key-file-name> - the name of your non-password protected key file.
- <certificate-file-name> - the name of your certificate file

   ```bash
rladmin cluster certificate set <certificate-type> certificate_file <certificate-file-name>.pem key_file <key-file-name>.pem
    ```

For example, the following command would replace the cm certificate with the private key "key.pem" and the certificate file "cluster.pem"
   
   ```bash
rladmin cluster certificate set cm certificate_file cluster.pem key_file key.pem
   ```

## How to update SSL/TLS certificates in earlier version of RS

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

## TLS version

To set the minimum TLS version that can be used for encrypting various
flows, use the REST API or the following rladmin
commands:

- For the management UI and REST API:

    ```bash
    rladmin> cluster config min_control_TLS_version <version, e.g. 1.2>
    ```

- For data path encryption:

    ```bash
    rladmin> cluster config min_data_TLS_version <version, e.g. 1.2>
    ```

After you set the minimum TLS version, RS does not accept communications with
TLS versions older than the specified version.
