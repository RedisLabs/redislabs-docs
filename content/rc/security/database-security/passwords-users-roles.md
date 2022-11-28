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
[role-based access control](#role-based-access-control). Role-based access control lets you define multiple
users with fine-grained authorization features.

## Prerequisites

To use role-based access control, your Redis Cloud database needs to support Redis version 6.0.0 or later.

The **Redis version** of a database is displayed in the **General** section of the **Configuration** tab of the [database detail]({{<relref "rc/databases/view-edit-database">}}) screen.

{{<image filename="images/rc/database-fixed-configuration-general.png" alt="The Redis version appears in the General section of the Configuration tab on the database details screen." >}}{{< /image >}}

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

## Role-based access control {#role-based-access-control}

Role-based access control (RBAC) lets you define *roles* with specific sets of *permissions*. You can then assign *users* to these roles
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

Finally, in the **Users** tab, you create users and assign each user a role.

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

You define these named permissions using the [Redis ACL syntax](https://redis.io/docs/management/security/acl/#acl-rules). This
syntax lets you concisely specify which **commands**, **command categories**, and **keys** to allow.

The Redis ACL syntax emphasizes brevity:

- `+` *includes* commands or command categories
- `-` *excludes* commands or command categories
- `@` indicates a command category
- `~` defines a permitted key pattern

#### Command ACL rules

A **command** can be any [Redis command](https://redis.io/commands/).

For example, this Redis ACL rule indicates that the `SET` command is permitted:

```sh
+set
```

#### Command category ACL rules

A [**command category**](https://redis.io/docs/management/security/acl/#command-categories) is a predefined, named set of commands.

For example, the Redis commands that
read data are available in the `read` command category. This Redis ACL rule permits access to all read commands:

```sh
+@read
```

To find out which commands are included in the
`read` command category, run the following command with [`redis-cli`]({{<relref "/rs/references/cli-utilities/redis-cli">}}):

```sh
ACL CAT read
```

#### Key ACL rules

There's also a [syntax](https://redis.io/docs/management/security/acl/#key-permissions) for specifying which **keys** are accessible.

The following ACL rule allows access to all keys:

```sh
~*
```

Whereas, this ACL rule only allows access to keys prefixed with `cache:`

```
~cache:*
```

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

1. Go to **Data Access Control > ACLs** and either:

    - Create a new Redis ACL:

        {{<image filename="images/rc/icon-rbac-add.png" width="40px" alt="Select the Add button to create a new Redis ACL." >}}{{< /image >}}

    - Point to an existing ACL and select **Edit**:

        {{<image filename="images/rc/icon-rbac-edit.png" width="40px" alt="Select the Edit button to edit an existing ACL." >}}{{< /image >}}

1. Provide a descriptive name for the Redis ACL.

1. Enter [ACL syntax](https://redis.io/docs/management/security/acl/#acl-rules) to define the ACL rule or select **Rule Builder** for help building the ACL rule with correct syntax.

1. To create a Redis ACL rule with the **Rule Builder**:

    1. For **Redis commands / categories**, enter a [command](https://redis.io/commands/) or [command category](https://redis.io/docs/management/security/acl/#command-categories).

    1. Select whether to include or exclude the command or category.

    1. For **Keys**, enter the [pattern for permitted keys](https://redis.io/docs/management/security/acl/#key-permissions).

    1. To add more commands, categories, or keys to the ACL rule, select **Add**:

        {{<image filename="images/rc/button-data-access-control-redis-acls-rule-builder-add.png"  alt="Use the Add button to add more commands, categories, or keys to the ACL rule." >}}{{< /image >}}

    1. When you finish building the ACL rule, select **Save rule**:

        {{<image filename="images/rc/button-data-access-control-redis-acls-rule-builder-save-rule.png" width="120px" alt="The Save rule button saves your ACL rule changes." >}}{{< /image >}}

1. Select the check mark to save your changes:

    {{<image filename="images/rc/icon-check-mark.png" width="40px" alt="Select the Submit entry button to save your Redis ACL changes." >}}{{< /image >}}

### Assign permissions to roles

To assign Redis ACLs to a data access role:

1. Go to **Data Access Control > Roles** and either:

    - Point to an existing role and select the **Edit** button:

        {{<image filename="images/rc/icon-rbac-edit.png" width="40px" alt="Select the Edit button to edit an existing role." >}}{{< /image >}}

    - Select the **Add** button to create a new role:

        {{<image filename="images/rc/icon-rbac-add.png" width="40px" alt="Select the Add button to create a new role." >}}{{< /image >}}

1. In the **Associations** section of the **Edit role** or **Create new role** screen, you can:

    - Point to an existing association and select the **Edit** button:

        {{<image filename="images/rc/icon-rbac-edit.png" width="40px" alt="Select the Edit button to edit an existing role association." >}}{{< /image >}}

    - Select the **Add** button to create a new association:

        {{<image filename="images/rc/icon-rbac-add.png" width="40px" alt="Select the Add button to create a new role association." >}}{{< /image >}}

1. Select one or more databases from the **Databases** list.

1. To set the role's level of access to the selected databases, select a **Redis ACL** from the list.

1. Select the check mark to confirm the association:

    {{<image filename="images/rc/icon-check-mark.png" width="40px" alt="Select the Submit entry button to save the role association changes." >}}{{< /image >}}

1. Select **Save role**:

    {{<image filename="images/rc/button-data-access-control-save-role.png" width="120px" alt="The Save role button saves your role changes." >}}{{< /image >}}

Users assigned the role can access the databases according to the role's associated Redis ACLs.

### Assign roles to users

To assign a role to a user:

1. Go to **Data Access Control > Users**.

1. Point to the user and select the **Edit** button when it appears:

    {{<image filename="images/rc/icon-rbac-edit.png" width="40px" alt="Select the Edit button to edit an existing user's role." >}}{{< /image >}}

1. Select a **Role** from the list.

1. Select the check mark to assign the role to the user:

    {{<image filename="images/rc/icon-check-mark.png" width="40px" alt="Select the Submit entry button to apply the user's role changes." >}}{{< /image >}}