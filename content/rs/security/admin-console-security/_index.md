---
Title: Admin console security
description:
weight: 20
alwaysopen: false
categories: ["RS"]
---

Redis Enterprise comes with a web-based user interface known as the **admin console**. The admin console provides the following security features:

* Encryption-in-transit using TLS/SSL
* User authentication using LDAP
* Role-based access control

We recommend that you use the features to implement the following best practices:

- **Integrate with an external identity provider**: Redis Enterprise supports integrations with an external identity provider, such as Active Directory, through an [LDAP integration]({{< relref "/rs/security/admin-console-security/user-security.md#setting-up-ldap" >}}). 

- **Implement standard authenticaion practices**: If your organization does not support LDAP, you can still use Redis Enterprise's [user account security]({{< relref "/rs/security/admin-console-security/user-security.md#user-account-security" >}}). Features include basic password complexity requirements, password expiration, and user login lockouts.

- **Limit session timeouts**: Session timeouts, or automatic logout, help to prevent inadvertent unauthorized access. You can configure the [A session will only be available for a set amount of time]({{< relref "/rs/security/passwords-users-roles.md#session-timeout" >}}) before the user is required to re-authenticate. By default, Redis Enterprise logs user out of the admin console after 15 minutes of inactivity.

- **Require HTTPS for API endpoints** - Redis Enterprise comes with an API that users are able to use to automate frequent manual tasks. This API is availible in both an encrypted and unencrypted endpoint for backwards compatibility. You can [disable the unencrypted endpoint]({{< relref "/rs/security/admin-console-security/encryption.md#requiring-https-for-api-endpoints" >}}) if its not in use without any impact.

- **Configure Transport Layer Security (TLS)** - A common compliance requirement is to [set a minimum version of TLS]({{< relref "rs/security/admin-console-security/encryption.md#tls-configuration" >}}). This helps to make sure that only secure versions of TLS are allowed when accessing the cluster.

- **Install your own certificates** - Redis Enterprise comes with self-signed certificates by default, however, many organizations require that you [use specific CA signed certificates]({{< relref "/rs/security/admin-console-security/encryption.md#requiring-https-for-api-endpoints" >}}).
