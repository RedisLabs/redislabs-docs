---
title: Encrypt private keys
linkTitle: Encrypt private keys
description: Enable PEM encryption to encrypt all private keys on disk.
weight: 50
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: 
---

Enable PEM encryption to automatically encrypt all private keys on disk. Public keys (`.cert` files) are not encrypted.

Encrypted private keys will be rotated with the regular rotation process.

## Encrypted keys

The following private keys are encrypted when PEM encryption is enabled:

<!-- Maybe a table with descriptions instead? -->

- api_key.pem
- ccs_internode_encryption_key.pem
- cluster_ssh_private_key.pem
- cluster_ssh_public_key.pem
- cm_key.pem
- data_internode_encryption_key.pem
- gossip_ca_signed_key.pem
- mesh_ca_signed_key.pem
- metrics_exporter_key.pem
- proxy_key.pem
- syncer_key.pem

## Enable PEM encryption

To enable PEM encryption and encrypt private keys on the disk, use [`rladmin`]({{<relref "/rs/references/cli-utilities/rladmin">}}) or the [REST API]({{<relref "/rs/references/rest-api">}}).

<!-- Testing out the existing tabs shortcode -->

{{<tabs tabTotal="2" tabID="1" tabName1="rladmin" tabName2="REST API" >}}
{{<tab tabNum="1">}}

Enable PEM encryption with [`rladmin cluster config`]({{<relref "/rs/references/cli-utilities/">}}):

```sh
rladmin cluster config encrypt_pkeys enabled
```
{{</tab>}}

{{<tab tabNum="2">}}
Enable PEM encryption with an [update cluster settings REST API request]({{<relref "/rs/references/rest-api/requests/cluster#put-cluster">}}):

```sh
PUT /v1/cluster
{ "encrypt_pkeys": true }
```
{{</tab>}}
{{</tabs>}}

## Deactivate PEM encryption

To deactivate PEM encryption and decrypt private keys on the disk:

- [`rladmin`]({{<relref "/rs/references/cli-utilities/rladmin">}})  method

    ```sh
    rladmin cluster config encrypt_pkeys disabled
    ```

- [REST API]({{<relref "/rs/references/rest-api/requests/cluster#put-cluster">}}) method

    ```sh
    PUT /v1/cluster
    { "encrypt_pkeys": false }
    ```
