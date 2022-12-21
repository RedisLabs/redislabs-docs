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

    To upload the new certificate and replace the current certificate with the [`rladmin`]({{<relref "/rs/references/cli-utilities/rladmin">}}) command-line utility,
    run the [`cluster certificate set`]({{<relref "/rs/references/cli-utilities/rladmin/cluster/certificate">}}) command:

    ```sh
    rladmin cluster certificate set <cert-name> \
        certificate_file <cert-file-name>.pem \
        key_file <key-file-name>.pem
    ```

    Replace the following variables with your own values:
    
    - `<cert-name>` - The name of the certificate to update. See the [certificates table]({{<relref "/rs/security/certificates">}}) for the list of valid certificate names.
    - `<cert-file-name>` - The certificate filename 
    - `<key-file-name>` - The key filename
