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

When certificates are rotated, the encrypted private keys are also rotated.

## Enable PEM encryption

To enable PEM encryption and encrypt private keys on the disk, use [`rladmin`]({{<relref "/rs/references/cli-utilities/rladmin">}}) or the [REST API]({{<relref "/rs/references/rest-api">}}).


- [`rladmin cluster config`]({{<relref "/rs/references/cli-utilities/rladmin/cluster/config">}}):

    ```sh
    rladmin cluster config encrypt_pkeys enabled
    ```

- [Update cluster settings]({{<relref "/rs/references/rest-api/requests/cluster#put-cluster">}}) REST API request:

    ```sh
    PUT /v1/cluster
    { "encrypt_pkeys": true }
    ```

## Deactivate PEM encryption

To deactivate PEM encryption and decrypt private keys on the disk, use [`rladmin`]({{<relref "/rs/references/cli-utilities/rladmin">}}) or the [REST API]({{<relref "/rs/references/rest-api">}}).

- [`rladmin cluster config`]({{<relref "/rs/references/cli-utilities/rladmin/cluster/config">}}):

    ```sh
    rladmin cluster config encrypt_pkeys disabled
    ```

- [Update cluster settings]({{<relref "/rs/references/rest-api/requests/cluster#put-cluster">}}) REST API request:

    ```sh
    PUT /v1/cluster
    { "encrypt_pkeys": false }
    ```
