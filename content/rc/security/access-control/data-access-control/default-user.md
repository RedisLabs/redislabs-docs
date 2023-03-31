---
Title: Default User
description:
weight: 10
alwaysopen: false
categories: ["RC"]
aliases: 
---
All Redis Cloud databases require either [password-based authentication](#password-based-authentication) or
[role-based access control](#role-based-access-control). Role-based access control lets you define multiple
users with fine-grained authorization features.

## Password-based authentication {#password-based-authentication}

Password-based authentication is a basic but essential Redis security feature. When you create a Redis Cloud database, your database is given a randomly generated password called the **Default user password**.

This appears in the **Security** section of the **Configuration** tab of the database details screen.

{{<image filename="images/rc/database-fixed-configuration-security.png" alt="The Default user password appears in the Security section of the Configuration tab on the database details screen." >}}{{< /image >}}

Use the copy button to copy the password to the clipboard:

{{<image filename="images/rc/button-database-password-copy.png"  alt="Use the Copy button to copy the default user password." >}}{{< /image >}}

You'll need to use this password whenever you connect to your database using a Redis client. For example,
in the Redis CLI, you use the AUTH command to provide this password:

```sh
AUTH 4kTtH2ddXfN2sFmXE6sowOLukxiaJhN8n
```

See your Redis client's documentation to learn how to provide your password when connecting.

### Change password

To change the default user password for your database:

1. From the database **Configuration** tab, select **Edit database**:

    {{<image filename="images/rc/button-database-edit.png" width="150px" alt="The Edit database button lets you change the database's default user password." >}}{{< /image >}}

1. Under the **Security** section, enter the new password in the **Default user password** field.

1. Select **Save database** to update the password:

    {{<image filename="images/rc/button-database-save.png" width="150px" alt="Use the Save database button to save the new password." >}}{{< /image >}}

