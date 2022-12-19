---
Title: Certificates
linkTitle: Certificates
description: An overview of certificates in Redis Enterprise Software.
weight: 60
alwaysopen: false
categories: ["RS"]
aliases: 
---

Redis Enterprise Software uses self-signed certificates by default to ensure that the product is secure. If using a self-signed certificate is not the right solution for you, you can import a certificate signed by a certificate authority of your choice.

Here's the list of self-signed certificates that create secure, encrypted connections to your Redis Enterprise cluster:

| Certificate name | Description |
|------------------|-------------|
| api | Encrypts [REST API]({{<relref "/rs/references/rest-api/">}}) requests and responses. |
| cm | Secures connections to the Redis Enterprise admin console. |
| metrics_exporter | Sends Redis Enterprise metrics to external [monitoring tools]({{<relref "/rs/clusters/monitoring/">}}) over a secure connection. |
| proxy | Creates secure, encrypted connections between clients and databases. |
| syncer | For [Active-Active]({{<relref "/rs/databases/active-active/">}}) or [Replica Of]({{<relref "rs/databases/import-export/replica-of/">}}) databases, encrypts data during the synchronization of participating clusters. |

These self-signed certificates are generated on the first node of each Redis Enterprise Software installation and are copied to all other nodes added to the cluster.

When you use the default self-signed certificates and you connect to the admin console over a web browser, you'll see an untrusted connection notification.

Depending on your browser, you can allow the connection for each session or add an exception to trust the certificate for all future sessions.