---
title: Create certificates
linkTitle: Create certificates
description: Create self-signed certificates to install on a Redis Enterprise cluster.
weight: 10
alwaysopen: false
categories: ["RS"]
aliases: 
---

Follow these instructions to create your own certificates to install on your Redis Enterprise cluster. Note that you can install a separate certificate per cluster component.

1. Create a private key:

    ```sh
    openssl genrsa -out <key-file-name>.pem 2048
    ```

1. Create a certificate signing request:

    ```sh
    openssl req -new -key <key-file-name>.pem -out <key-file-name>.csr
    ```

    {{<note>}}
You will be prompted for a Country Name, State or Province Name, Locality Name, Organization Name, Organizational Unit, and Common Name.

- You will need to check with your security team or certificate authority for the right values for your organization.

- The database's fully qualified domain name (FQDN) is typically used as the common name for the certificate.
    {{</note>}}

3. Sign the private key using your certificate authority.

    How to obtain a CA signed certificate is different for each organization and CA vendor. Consult your security team or certificate authority for the appropriate way to sign a certificate.

4. Upload the certificate to the cluster.

    Use the `rladmin` command-line utility to upload the certificate to the cluster and replace the current certificate. You'll run the `cluster certificate set` command, followed by the name of the certificate to set, the certificate filename, and the key filename.

    ```sh
    rladmin cluster certificate set <cert-name> \
        certificate_file <cert-file-name>.pem \
        key_file <key-file-name>.pem
    ```

    The certificate names are as follows: 
      - For the admin console: `cm`
      - For the REST API: `api`
      - For the proxy: `proxy`
      - For the syncer: `syncer`
      - For the metrics exporter: `metrics_exporter`
