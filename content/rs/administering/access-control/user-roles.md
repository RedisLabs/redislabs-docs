---
Title: User Roles and Access Control
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---

## Role-Based Access Control

In open source Redis, you define ACLs on a per-user basis. Redis Enterprise improves upon this by letting you create roles, each with a specific set of permissions. For example, you might have a role for read-only users and another role for your site reliability engineers. You can then associate these roles with the appropriate Redis users. This is known as role-based access control, or RBAC.

RBAC lets you set permissions for your databases and for the Redis Enterprise management console itself, providing a complete security-management solution for your cluster. 

### What is RBAC good for?

Role-Based Access Control allows you to scale your Redis deployments while minimizing the overhead involved in managing a cluster with many databases, multiple users, and various access control lists. With RBAC, you can create a role once and then deploy it across multiple databases in the cluster with ease.

### Configuring Roles & Users

In **access control > roles**, you can configure various types of user roles. For example:

- Management roles that define user access to the Admin UI and cluster API
- Data access controls with Redis ACLs that define the commands and keys that users can access when connecting to databases
- The databases that you would like each user to be able to access

### Management Roles

Redis Enterprise comes with the following roles for the admin console:

{{< embed-html "account-role-table.html" >}}

{{% note %}}
To create a user role that only has access to the database, assign the user the management role **None**
{{% /note %}}

### Database Access Controls

ACLs allow you to control what level of access each user has in Redis. With ACLs, you can specify which commands specific users can execute and which keys they can access. This allows for much better security practices: you can restrict any given user’s access to the least level of privilege needed.

{{% note %}}
There are several important differences with Redis Enterprise you should be aware of:

1. The ACL subcommands LOAD, SAVE, SETUSER, DELUSER, GENPASS and LOG are blocked
2. The MULTI, EXEC, DISCARD commands are always allowed, but ACLs are enforced within a transaction
3. When you run multi-key commands on multi-slot keys, the return value is `failure` but the command runs on the keys that are allowed.
4. Active-Active cannot assign ACLs on creation.
{{% /note %}}

#### Redis ACL command syntax

Redis ACLs are defined by a [Redis syntax](https://redis.io/topics/acl#acl-rules) where you specify the commands or command categories that are allowed for specific keys. Redis Enterprise only allows the configuration of commands, command categories and allowed keys. 

Redis Modules do not have a command category, but may be configured using their standard command name with Redis ACL syntax.

**In Redis Enterprise, you can:**

- **Include commands and categorie**s with the + prefix for commands or +@ prefix for a category
- **Exclude commands and categories** with the - prefix for commands or -@ prefix for a category
- **Include keys or key patterns** with the ~ prefix

**To define database access control, you can either:**

- Use the predefined Redis ACLs
- Create custom Redis ACLs
- Assign roles and Redis ACLs to a database in the access control list section of the [database configuration]({{< relref "/rs/administering/database-operations/creating-database.md" >}}).

#### Predefined Redis ACLs

1. **Full Access** - All commands are allowed on all keys
2. **Not Dangerous** - All commands are allowed except those that are administrative, could affect availability, or could affect performance are allowed on keys
3. **Read Only** - Only read only commands are allowed on keys.

#### Creating Custom Redis ACLs

To configure a Redis ACL that you can assign to a user role:

1. In **access control** > **redis acls**:
    - Edit an existing Redis ACL - Hover over a Redis ACL and click ![Edit](/images/rc/icon_edit.png#no-click "Edit").
    - Create a new Redis ACL - Click ![Add](/images/rs/icon_add.png#no-click "Add").
1. Enter a descriptive name for the Redis ACL.
1. Define the ACL command:
    - Enter the [ACL syntax](https://redis.io/topics/acl#acl-rules) of the command.
    - Click **Need Assistance** to use the form to build the command:
        1. For the commands, select to include or exclude the command or category.
        1. Enter the [ACL syntax](https://redis.io/topics/acl#acl-rules) that defines the commands.
            - You can enter multiple definitions of commands or categories.
            - All entries in the Commands/Categories column apply to the keys defined in the Keys column.
        1. Enter the [ACL syntax](https://redis.io/topics/acl#acl-rules) that defines the keys.
            - You can enter multiple definitions of keys.
        1. Click **Submit**.
        
1. Click **Save**.

### Configuring Roles

To configure a role:

1. In **access control** > **roles**:
    - Edit an existing role - Hover over a role and click ![Edit](/images/rc/icon_edit.png#no-click "Edit").
    - Create a new role - Click ![Add](/images/rs/icon_add.png#no-click "Add").
1. Add a cluster management role
    - Create a Redis ACL assignment - Click ![Add](/images/rs/icon_add.png#no-click "Add").
1. Select the databases that the Redis ACLs for the role
1. Click ![Save](/images/rs/icon_save.png#no-click "Save").

    You can click ![Add](/images/rs/icon_add.png#no-click "Add") to assign modify the databases assigned to the role.

1. Click **Update** to save the role.


