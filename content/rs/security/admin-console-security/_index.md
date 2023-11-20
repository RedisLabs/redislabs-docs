---
Title: Admin console security
description:
weight: 5
alwaysopen: false
categories: ["RS"]
---

Redis Enterprise Software comes with a web-based user interface known as the admin console or the Cluster Manager UI. The admin console provides the following security features:

- Encryption-in-transit using [TLS]({{<relref "/rs/security/encryption/tls">}})

- User authentication using [LDAP]({{<relref "/rs/security/access-control/ldap">}})

- [Role-based access control]({{<relref "/rs/security/access-control/rbac">}})

We recommend the following practices:

- **Integrate with an external identity provider**: Redis Enterprise uses [LDAP integration]({{<relref "/rs/security/access-control/ldap">}}) to support external identity providers, such as Active Directory.

- **Implement standard authentication practices**: If your organization does not support LDAP, you can still use Redis Enterprise's [user account security]({{<relref "/rs/security/access-control/manage-users">}}). Features include basic password complexity requirements, password expiration, and user login lockouts.

- **Limit session timeouts**: Session timeouts, also known as _automatic sign out_, help prevent unauthorized access. Admin console sessions are allowed to idle for a period of time before users are required to re-authenticate. 

    By default, users are signed out after 15 minutes of inactivity. You can [configure the session timeout]({{<relref "/rs/security/access-control/manage-users/login-lockout#configure-session-timeout">}}).

- **Require HTTPS for API endpoints** - Redis Enterprise comes with a REST API to help automate tasks. This API is available in both an encrypted and unencrypted endpoint for backward compatibility. You can [disable the unencrypted endpoint]({{<relref "/rs/references/rest-api/encryption#require-https-for-api-endpoints">}}) with no loss in functionality.

- **Configure Transport Layer Security (TLS)** - A common compliance requirement is to [set a minimum version of TLS]({{<relref "rs/security/encryption/tls/tls-protocols">}}). This helps to make sure that only secure versions of TLS are allowed when accessing the cluster.

- **Install your own certificates** - Redis Enterprise comes with self-signed certificates by default; however, many organizations require that you [use specific CA signed certificates]({{<relref "/rs/security/certificates/create-certificates">}}).
