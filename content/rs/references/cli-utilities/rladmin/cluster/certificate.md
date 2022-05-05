---
Title: rladmin cluster certificate
linkTitle: certificate
description: Sets the cluster certificate.
weight: $weight
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: 
---

`rladmin cluster certificate` sets the cluster certificate to a given file.

```sh
rladmin cluster certificate 
       set <certificate name> 
       certificate_file <certificate filepath> 
       [ key_file <key filepath> ]
```

### Parameters

| Parameter | Type/Value | Description |
|-----------|------------|-------------|
| certificate name | string | Name of certificate to update |
| certificate_file | filepath | Path to the certificate file |
| key_file | filepath | Path to the key file (optional) |

### Returns

Reports that the certificate was set to the given file, or returns an error message.

### Example

```sh
$ rladmin command x
response
```
