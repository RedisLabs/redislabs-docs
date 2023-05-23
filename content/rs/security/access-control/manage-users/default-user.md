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

When you [create a database]({{<relref "/rs/databases/create">}}), default user database access is enabled by default (**Default database password** check box is selected). This enables compatibility with versions of Redis before Redis 6.

{{<image filename="images/rs/database-config-default-user-enabled.png" alt="" >}}{{< /image >}}

Enter and confirm a **Default database password** to require authentication for connections to the database.

## Authenticate as default user

When you configure a password for your database, all connections to the database must authenticate using the [AUTH](https://redis.io/commands/auth) command.

```sh
AUTH <default-database-password>
```

## Change default database password

To change the default user's password:

1. From the database's **configuration** tab, select **Edit**.

1. For **Default database password**, enter the new password in **Password** and **Confirm password**.

    {{<image filename="images/rs/database-config-default-user-enabled.png" alt="" >}}{{< /image >}}

1. Select **Update**.

## Deactivate default user

If you set up [role-based access control]({{<relref "/rs/security/access-control/rbac">}}) with [access control lists]({{<relref "/rs/security/access-control/rbac/configure-acl">}}) (ACLs) for your database and don't require backwards compatibility with versions earlier than Redis 6, you can [deactivate the default user]({{<relref "/rs/security/access-control/manage-users/default-user">}}).

{{<warning>}}
Before you deactivate default user access, make sure the role associated with the database is [assigned to a user]({{<relref "/rs/security/access-control/rbac/assign-user-role">}}). Otherwise, the database will be inaccessible.
{{</warning>}}

To deactivate the default user:

1. From the database's **configuration** tab, select **Edit**.

1. Clear the **Default database password** checkbox.

    {{<image filename="images/rs/database-config-default-user-deactivated.png" alt="" >}}{{< /image >}}

1. Select **Update**.
