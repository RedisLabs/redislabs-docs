---
title: Updating SSL/TLS certificates
description: 
weight: $weight
alwaysopen: false
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

**For versions 5.2.0 and above:**

Warning: The new certificate replaces the equivalent certificate on all nodes in the cluster. Existing certificates are overwritten.

* Use the REST API to replace the certificate:

    ```bash

    curl -k -X PUT -u "<username>:<password>" -H "Content-Type: application/json" -d '{ "name": "<cert_name>", "key": <key>, "certificate": <cert> }' https://<cluster_address>:9443/v1/cluster/update_cert

    ```
 
    Where:

    * cert_name - The certificate to replace: cm, api, proxy, syncer
    * key - The contents of the *_key.pem file
    * cert - The contents of the *_cert.pem file

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

## Updating SSL/TLS certificates for Previous Releases

**For versions 5.0.2:** Upgrade to RS 5.2.0 or above and then update the certificates with the REST API.

**For versions below 5.0.2:**

**Note**: If you choose to update the certificates you must follow these
steps on all machines that are part of the cluster, and on all machines
that you add to the cluster in the future.

On each cluster node:

1. On the cluster machine, after RS has been installed, navigate to
the **/etc/opt/redislabs** folder.
1. Replace the following certificate files with your own files and
rename them to the same exact names as the original files:
    - For the management UI certificate and private key:
        - cm\_cert.pem
        - cm\_key.pem
    - For the REST API certificate and private key:
        - api\_cert.pem
        - api\_key.pem
    - For the database endpoint encryption certificate and private key:
        - proxy\_cert.pem
        - proxy\_key.pem

    **Note**: A certificate for the databases' endpoint should be
    assigned for the same domain as the cluster name. For example,
    for a cluster with the name "redislabs.com" the certificate
    should be for "redis-\*.redislabs.com"

1. If you are using a certificate issued by an intermediate
certificate authority (CA), you should also add the chain file
named **"chain\_certs.pem"** to the same folder.
1. After replacing the files, restart the relevant service by
running the following command from the operating system
command-line interface (CLI):

    - For the management UI:
        supervisorctl restart nginx
    - For the REST API:
        supervisorctl restart nginx
    - For the database endpoint encryption:
        supervisorctl restart dmcproxy

    **Note**: Restarting the dmcproxy service will disconnect any
    existing clients connected to any of the databases.

1. Repeat these steps on all other machines in the cluster.