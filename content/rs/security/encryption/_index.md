---
Title: Encryption in Redis Enterprise Software
linkTitle: Encryption
description: Encryption in Redis Enterprise Software.
weight: 60
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: 
---

Redis Enterprise Software uses encryption to secure communications between clusters, nodes, databases, and clients and to protect [data in transit](https://en.wikipedia.org/wiki/Data_in_transit), [at rest](https://en.wikipedia.org/wiki/Data_at_rest), and [in use](https://en.wikipedia.org/wiki/Data_in_use).

## Encrypt data in transit

### [TLS]({{<relref "/rs/security/encryption/tls">}})

Redis Enterprise Software uses Transport Layer Security (TLS) to encrypt communications for the following:

- Cluster Manager UI

- Command-line utilities

- REST API

- Internode communication

You can also [enable TLS authentication]({{<relref "/rs/security/encryption/tls/enable-tls">}}) for the following:

- Communication from clients or applications to your database

- Communication from your database to other clusters for replication using [Replica Of]({{<relref "/rs/databases/import-export/replica-of/">}})

- Communication to and from your database to other clusters for [Active-Active]({{<relref "/rs/databases/active-active/_index.md">}}) synchronization

### [Internode encryption]({{<relref "/rs/security/encryption/internode-encryption">}})

Internode encryption uses TLS to encrypt data in transit between cluster nodes.

By default, internode encryption is enabled for the control plane, which manages the cluster and databases. If you also want to encrypt replication and proxy communications between database shards on different nodes, [enable data plane internode encryption]({{<relref "/rs/security/encryption/internode-encryption#enable-data-plane-encryption">}}).

### [Require HTTPS for REST API endpoints]({{<relref "/rs/references/rest-api/encryption">}})

By default, the Redis Enterprise Software API supports communication over HTTP and HTTPS. However, you can [turn off HTTP support]({{<relref "/rs/references/rest-api/encryption">}}) to ensure that API requests are encrypted.

## Encrypt data at rest

### File system encryption

To encrypt data stored on disk, use file system-based encryption capabilities available on Linux operating systems before you install Redis Enterprise Software.

### [Private key encryption]({{<relref "/rs/security/encryption/pem-encryption">}})

[Enable PEM encryption]({{<relref "/rs/security/encryption/pem-encryption#enable-pem-encryption">}}) to encrypt all private keys on disk.

## Encrypt data in use

### Client-side encryption

Use client-side encryption to encrypt the data an application stores in a Redis database. The application decrypts the data when it retrieves it from the database.

You can add client-side encryption logic to your application or use built-in client functions.

Client-side encryption has the following limitations:

- Operations that must operate on the data, such as increments, comparisons, and searches will not function properly.

- Increases management overhead.

- Reduces performance.
