---
Title: Cloud database security
description:
weight: 20
alwaysopen: false
categories: ["RC"]
---

Redis Cloud provides several features to help you secure your databases. These include
[password-based authentication]({{<relref "/rc/security/access-control/data-access-control/default-user">}}) and [role-based access control]({{<relref "/rc/security/access-control/data-access-control/role-based-access-control.md">}}),
[network security]({{<relref "/rc/security/database-security/network-security.md">}}), [TLS]({{<relref "/rc/security/database-security/tls-ssl.md">}}), and [encryption-at-rest]({{<relref "/rc/security/encryption-at-rest.md">}}).

## Passwords, users, and roles

All Redis Cloud databases [require a password]({{<relref "/rc/security/access-control/data-access-control/default-user">}}) to connect. However, we recommend enabling [role-based access control]({{<relref "/rc/security/access-control/data-access-control/role-based-access-control.md">}}) (RBAC) for additional security. With RBAC, you can define
all the roles you need, with the appropriate permissions, and assign those roles
to your users.

## Network security

Redis Cloud supports two types of network security: [IP Restrictions]({{< relref "/rc/security/database-security/network-security.md">}}#ip) and [VPCs]({{<relref "/rc/security/database-security/network-security.md">}}#virtual-private-clouds). We recommend that you employ at least one of these network security options to constrain access to your databases.

## Transport Layer Security (TLS)

Redis Cloud supports [Transport Layer Security]({{<relref "/rc/security/database-security/tls-ssl.md">}}) (TLS) for database connections. TLS, often called "SSL", ensures the privacy of the TCP connection between your application and database. When client
authentication is enabled, TLS also ensures that those clients with an authorized key can connect to your Redis databases.

We strongly recommend enabling TLS for any application transmitting sensitive data across the wire.

## Disk encryption

Redis Cloud provides encryption for all data stored on disk in Redis databases. See our [encrpytion at rest documentation]({{<relref "/rc/security/encryption-at-rest.md">}}) for specific details.
