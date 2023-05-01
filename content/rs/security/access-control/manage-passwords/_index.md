---
Title: Manage passwords
linkTitle: Manage passwords
description: Manage user passwords.
weight: 30
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: ["/rs/security/access-control/manage-users/manage-passwords/"]
---

Redis Enterprise Software provides several ways to manage the passwords of local accounts, including:

- [Password complexity rules]({{<relref "/rs/security/access-control/manage-passwords/password-complexity-rules">}})

- [Password expiration]({{<relref "/rs/security/access-control/manage-passwords/password-expiration">}})

- [Password rotation policies]({{<relref "/rs/security/access-control/manage-passwords/rotate-passwords">}})

You can also manage a user's ability to [sign in]({{<relref "rs/security/access-control/manage-users/login-lockout#user-login-lockout">}}) and control [session timeout]({{<relref "rs/security/access-control/manage-users/login-lockout#session-timeout">}}).

To enforce more advanced password policies, we recommend using [LDAP integration]({{<relref "/rs/security/access-control/ldap">}}) with an external identity provider, such as Active Directory.
