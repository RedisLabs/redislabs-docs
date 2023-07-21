---
Title: Manage default user
linkTitle: Manage default user
description: Manage a database's default user.
weight: 60
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: 
---

When you [create a database]({{<relref "/rs/databases/create">}}), default user database access is enabled by default (**Unauthenticated access** is selected). This enables compatibility with versions of Redis before Redis 6.

Select **Password-only authentication**, then enter and confirm a default database password to require authentication for connections to the database.

{{<image filename="images/rs/screenshots/databases/security-access-control-password-only.png" alt="Select Password-only authentication to require a password to access the database." >}}{{< /image >}}

## Authenticate as default user

When you configure a password for your database, all connections to the database must authenticate using the [AUTH](https://redis.io/commands/auth) command.

```sh
AUTH <default-database-password>
```

## Change default database password

To change the default user's password:

1. From the database's **Security** tab, select **Edit**.

1. In the **Access Control** section, select **Password-only authentication** as the **Access method**.

1. Enter and re-enter the new password.

1. Select **Save**.

## Deactivate default user

If you set up [role-based access control]({{<relref "/rs/security/access-control/rbac">}}) with [access control lists]({{<relref "/rs/security/access-control/rbac/configure-acl">}}) (ACLs) for your database and don't require backwards compatibility with versions earlier than Redis 6, you can [deactivate the default user]({{<relref "/rs/security/access-control/manage-users/default-user">}}).

{{<warning>}}
Before you deactivate default user access, make sure the role associated with the database is [assigned to a user]({{<relref "/rs/security/access-control/rbac/assign-user-role">}}). Otherwise, the database will be inaccessible.
{{</warning>}}

To deactivate the default user:

1. From the database's **Security** tab, select **Edit**.

1. In the **Access Control** section, select **Using ACL only** as the **Access method**.

    {{<image filename="images/rs/screenshots/databases/security-access-control-acl-only.png" alt="Select Using ACL only to deactivate default user access to the database." >}}{{< /image >}}

1. Choose at least one role and Redis ACL to access the database.

1. Select **Save**.
