---
Title: Certificates
linkTitle: Certificates
description: An overview of self-signed certificates in Redis Enterprise Software.
weight: 60
alwaysopen: false
categories: ["RS"]
aliases: 
---

Redis Enterprise Software uses self-signed certificates by default to ensure that the product is secure.

The self-signed certificates establish encryption-in-transit for the following cluster components:

- The admin console
- The REST API
- The Proxy, which manages connections between clients and database endpoints
- The Syncer, which synchronizes data between clusters (using either Active-Active or Active-Passive replication)
- The metrics exporter, which sends metrics to Prometheus

These self-signed certificates are generated on the first node of each Redis Enterprise Software installation and are copied to all other nodes added to the cluster.

When you use the default self-signed certificates and you connect to the admin console over a web browser, you'll see an untrusted connection notification.

Depending on your browser, you can allow the connection for each session or add an exception to trust the certificate for all future sessions.