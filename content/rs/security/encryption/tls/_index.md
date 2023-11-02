---
Title: Transport Layer Security (TLS)
linkTitle: TLS
description: An overview of Transport Layer Security (TLS).
weight: 10
alwaysopen: false
categories: ["RS"]
aliases: ["/rs/security/tls-ssl",
"/rs/security/tls-ssl/",
"/rs/security/tls-ssl.md",
"/rs/security/tls/"]
---
[Transport Layer Security (TLS)](https://en.wikipedia.org/wiki/Transport_Layer_Security), a successor to SSL, ensures the privacy of data sent between applications and Redis databases. TLS also secures connections between Redis Enterprise Software nodes.

You can [use TLS authentication]({{<relref "/rs/security/encryption/tls/enable-tls">}}) for the following types of communication:

- Communication from clients (applications) to your database
- Communication from your database to other clusters for replication using [Replica Of]({{<relref "/rs/databases/import-export/replica-of">}})
- Communication to and from your database to other clusters for synchronization using [Active-Active]({{<relref "/rs/databases/active-active/">}})

## Protocols and ciphers

TLS protocols and ciphers define the overall suite of algorithms that clients are able to connect to the servers with.

You can change the [TLS protocols]({{<relref "/rs/security/encryption/tls/tls-protocols">}}) and [ciphers]({{<relref "/rs/security/encryption/tls/ciphers">}}) to improve the security of your Redis Enterprise cluster and databases. The default settings are in line with industry best practices, but you can customize them to match the security policy of your organization.
