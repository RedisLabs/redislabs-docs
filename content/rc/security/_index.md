---
Title: Security
description:
weight: 51
alwaysopen: false
categories: ["RC"]
aliases: "/rc/administration/security"
---
Redis Cloud provides a number of features to ensure the security of your cloud
database deployments. As a Redis Cloud user, there are three systems you need
to consider when thinking about security:

- The [admin console]({{<relref "/rc/security/admin-console-security/_index.md">}})
- [Your databases]({{<relref "/rc/security/database-security/_index.md">}})
- The [Redis Cloud API]({{<relref "/rc/api/how-to/enable-your-account-to-use-api.md">}})

Before digging into all the details, review our [shared responsibility model]({{<relref "/rc/security/shared-responsibility-model.md">}}) for security.

## Admin console security

The admin console is the web application you use to manage Redis Cloud. [Securing the admin console]({{<relref "/rc/security/admin-console-security/_index.md">}})
by assigning the appropriate user roles and enabling multi-factor authentication is essential for a secure deployment.

## Database security

You have several options when it comes to [securing your Redis Cloud databases]({{<relref "/rc/security/database-security/_index.md">}}). These include
[role-based access control]({{<relref "/rc/security/database-security/passwords-users-roles.md">}}),
[network security]({{<relref "/rc/security/database-security/network-security.md">}}), [TLS]({{<relref "/rc/security/database-security/tls-ssl.md">}}), and [network security]({{<relref "/rc/security/database-security/network-security.md">}}) using
IP restrictions and VPC peering.

## Redis Cloud API security

The Redis Cloud API allows you to programmatically administer your subscriptions and database deployments. This API is disabled by default. When you [enable the API]({{<relref "/rc/api/how-to/enable-your-account-to-use-api.md">}}), you can then [manage the API keys]({{<relref "/rc/api/how-to/manage-api-keys.md">}}) for the all owners of your Redis Cloud account.
