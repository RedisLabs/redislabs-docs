---
Title: Passwords, users, and roles
description:
weight: 10
alwaysopen: false
categories: ["RC"]
aliases: /rc/administration/security/data-access-control
         /rc/security/database-security/passwords-users-roles/
         /rc/security/database-security/passwords-users-roles.md
---
All Redis Cloud databases require either [password-based authentication](#password-based-authentication) or
[role-based access control](#role-based-access-control). Role-based access control allows you to define multiple
users with fine-grained authorization features.

## Prerequisites

To use role-based access control, your Redis cloud database needs to support Redis version 6.0.0 or later.

The **Redis version** of a database is displayed in the **General** section of the **Configuration** tab of the [database detail]({{<relref "rc/databases/view-edit-database">}}) screen.

{{<image filename="images/rc/database-fixed-configuration-general.png" alt="The Redis version appears in the General section of the Configuration tab on the database details screen." >}}{{< /image >}}

## Password-based authentication {#password-based-authentication}

Password-based authentication is a basic but essential Redis security feature. When you create a Redis Cloud database, your database is given a randomly generated password called the **Default user password**.

This appears in the **Security** section of the **Configuration** tab of the database details screen.

{{<image filename="images/rc/database-fixed-configuration-security.png" alt="The Default user password appears in the Security section of the Configuration tab on the database details screen." >}}{{< /image >}}

Use the copy button to copy the password to the clipboard:

{{<image filename="images/rc/button-database-password-copy.png" width="100px" alt="Use the Copy button to copy the default user password." >}}{{< /image >}}

You'll need to use this password whenever you connect to your database using a Redis client. For example,
in the Redis CLI, you use the AUTH command to provide this password:

```sh
AUTH 4kTtH2ddXfN2sFmXE6sowOLukxiaJhN8n
```

See your Redis client's documentation for specifics on how to provide your password when connecting.

### Change password

To change the default user password for your database:

1. From the **Configuration** tab, select **Edit database**:

    TODO: add button

1. Under the **Security** section, enter the new password in the **Default user password** field.

1. Select **Save database** to update the password:

    TODO: add button

## Role-based access control {#role-based-access-control}

Role-based access control (RBAC) is an access-control mechanism that allows you to define *roles* with specific sets of *permissions*. You can then assign *users* to these roles
to provide appropriate levels of access.

RBAC effectively lets you implement the [principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege). For example, you can provide
read-only access to an application whose only job is to display Redis data. Similarly, you can prevent new developers from running dangerous administrative commands.

### Set up RBAC

To set up RBAC, first navigate to the **Data Access Control** screen.

There are three tabs on this screen: **Users**, **Roles**, and **Redis ACLs**.

In the **Redis ACLs** tab, you define named *permissions* for specific Redis commands and keys.

{{<image filename="images/rc/data-access-control-acls.png" alt="Data access control screen." >}}{{< /image >}}

In the **Roles** tab, you create roles. Each role consists of a set of permissions for one or more Redis Cloud databases.

{{<image filename="images/rc/data-access-control-roles.png" alt="Data access control screen." >}}{{< /image >}}

Finally, in the **Users** tab, you create users, and you assign each user a role.

{{<image filename="images/rc/data-access-control-users.png" alt="Data access control screen." >}}{{< /image >}}

#### OSS Redis ACLs vs. Redis Enterprise Cloud RBAC

In open source Redis, you can create users and assign ACLs to them using the `ACL` command. However, open source
Redis does not support generic roles.

In Redis Enterprise Cloud, you configure RBAC using the admin console. As a result, certain open source Redis ACL
subcommands are not available in Redis Cloud.

Specifically, Redis Cloud databases block the following ACL subcommands: `LOAD`, `SAVE`, `SETUSER`, `DELUSER`, `GENPASS`, and `LOG`.

Redis Cloud databases allow these ACL subcommands: `LIST`, `USERS`, `GETUSER`, `CAT`, `WHOAMI`, and `HELP`.

In open source Redis, you must explicitly provide access to the `MULTI`, `EXEC`, and `DISCARD` commands.
In Redis Cloud, these commands, which are used in transactions, are always permitted. However, the commands
run within the transaction block are subject to RBAC permissions.

When you run multi-key commands on multi-slot keys, the return value is `failure` but the command runs on the keys that are allowed.

### Define permissions

To define permissions, go to the **Redis ACLs** tab of the **Data Access Control** screen.

{{<image filename="images/rc/data-access-control-acls.png" alt="Data access control screen." >}}{{< /image >}}

You define these named permissions using the [Redis ACL syntax](https://redis.io/topics/acl#acl-rules). This
syntax allows you to concisely specify **commands**, **command categories**, and **keys** that should be permitted.

A **command** can be any Redis command. Take the `SET` command, for example. The Redis ACL rule

```sh
+set
```

indicates that the `SET` command is permitted.

A [**command category**](https://redis.io/docs/management/security/acl/#command-categories) is a predefined, named set of commands. For example, the Redis commands that
read data are available in the `read` command category. The Redis ACL rule

```sh
+@read
```

permits access to all read commands. If you'd like to know which commands are included in the
`read` command category, run

```sh
ACL CAT read
```

from the Redis CLI.

There's also a syntax for specifying which **keys** can be accessed. For example,

```sh
~*
```

indicates that all keys can be accessed. Whereas

```
~cache:*
```

indicates that only those keys beginning with the prefix `cache:` can be accessed.

The Redis ACL syntax emphasizes brevity:

- `+` *includes* commands or command categories
- `-` *excludes* commands or command categories
- `@` indicates a command category
- `~` defines a permitted key pattern

#### Predefined permissions

Redis Cloud includes three, predefined permissions:

- Full-Access (`+@all ~*`) - All commands are allowed for all keys

- Read-Write (`+@all -@dangerous ~*`) - All commands except for the "dangerous" command category are allowed for all keys

- Read-Only (`+@read ~*`) - Only the "read" command category is allowed for all keys

#### Module command permissions

Note that you can define permissions for the Redis module commands of any modules that are loaded on the subscription;
however, these permissions can only be used for databases that support those modules.

To define database access control, you can either:

- Use the predefined data access roles and add Redis ACLs to them for specific databases.
- Create new data access roles and select the management roles and Redis ACLs that apply to the roles for specific databases.
- Assign roles and Redis ACLs to a database in the access control list section of the [database configuration]({{< relref "/rc/databases/create-database.md" >}}).

### Configure permissions with Redis ACLs

To configure a Redis ACL that you can assign to a data access role:

1. In **Data Access Control** > **Redis ACLs**:
    - To edit an existing Redis ACL: Hover over a Redis ACL and click ![Edit](/images/rc/icon_edit.png#no-click "Edit").
    - To create a new Redis ACL: Click ![Add](/images/rc/icon_add.png#no-click "Add").
1. Enter a descriptive name for the Redis ACL.
1. Enter the [ACL syntax](https://redis.io/topics/acl#acl-rules) defining the ACL or click **Rule Builder** to use a form to build the ACL:
    1. For the commands:
        1. Select whether to include or exclude a command or category.
        1. Enter the [ACL syntax](https://redis.io/topics/acl#acl-rules) that defines the commands.
            - To add more command definitions, click ![Add](/images/rc/icon_add.png#no-click "Add").
            - All entries in the Commands/Categories column apply to the keys defined in the Keys column.
    1. For the keys, enter the [ACL syntax](https://redis.io/topics/acl#acl-rules) that defines the keys.
        - To add more key definitions, click ![Add](/images/rc/icon_add.png#no-click "Add").
    1. Click **Save Rule**.
1. Click **Save**.

### Assign permissions to roles

To assign Redis ACLs to a data access role:

1. In **Data Access Control** > **Roles**:
    - Edit an existing role - Hover over a role and click ![Edit](/images/rc/icon_edit.png#no-click "Edit").
    - Create a new role - Click ![Add](/images/rc/icon_add.png#no-click "Add").
1. In the Redis ACLs section:
    - Edit a Redis ACL association - Hover over a Redis ACL assignment and click ![Edit](/images/rc/icon_edit.png#no-click "Edit").
    - Create a Redis ACL association - Click ![Add](/images/rc/icon_add.png#no-click "Add").
1. Select the databases that the Redis ACL applies to.
1. Select the [Redis ACL](#configuring-redis-acls) that defines the access to commands and keys.
1. Click ![Save](/images/rc/icon_save.png#no-click "Save").

    You can click ![Add](/images/rc/icon_add.png#no-click "Add") to assign a Redis ACL to another database.

1. Click **Save**.

Users that are assigned to the role can access the databases according to the Redis ACL definitions.

### Assign roles to users

To assign a role to a user:

1. Go to **Data Access Control > Users**.

1. Point to the user and select the **Edit entry** button when it appears:

    TODO: add button

1. Select a **Role** from the list.

1. Select the check mark to assign the role to the user:

    TODO: add button
