---
Title: rladmin cluster certificate
linkTitle: certificate
description: Sets the cluster certificate.
weight: $weight
alwaysopen: false
toc: "true"
headerRange: "[1-2]"
tags: ["configured"]
categories: ["RS"]
aliases:
---

Sets a cluster certificate to a specified PEM file.

```sh
rladmin cluster certificate
        set <certificate name>
        certificate_file <certificate filepath>
        [ key_file <key filepath> ]
```

To set a certificate for a specific service, use the corresponding certificate name. See the [certificates table]({{<relref "/rs/security/certificates">}}) for the list of cluster certificates and their descriptions.

### Parameters

| Parameter | Type/Value | Description |
|-----------|------------|-------------|
| certificate name | 'cm'<br /> 'api'<br /> 'proxy'<br /> 'syncer'<br /> 'metrics_exporter' | Name of the certificate to update |
| certificate_file | filepath | Path to the certificate file |
| key_file | filepath | Path to the key file (optional) |

### Returns

Reports that the certificate was set to the specified file. Returns an error message if the certificate fails to update.

### Example

```sh
$ rladmin cluster certificate set proxy \
       certificate_file /tmp/proxy.pem
Set proxy certificate to contents of file /tmp/proxy.pem
```
