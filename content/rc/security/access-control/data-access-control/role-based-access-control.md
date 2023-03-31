---
Title: Role-based access control
LinkTitle: Role-based access control
description: Lets you define multiple users with fine-grained data authorization features.
weight: $weight
alwaysopen: false
toc: "true"
headerRange: [1-3]
categories: []
aliases: 
---

Role-based access control (RBAC) lets you define *roles* with specific sets of *permissions*. You can then assign *users* to these roles
to provide appropriate levels of access.

RBAC effectively lets you implement the [principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege). For example, you can provide
read-only access to an application whose only job is to display Redis data. Similarly, you can prevent new developers from running dangerous administrative commands.

## Prerequisites

To use role-based access control, your Redis Cloud database needs to support Redis version 6.0.0 or later.

The **Redis version** of a database is displayed in the **General** section of the **Configuration** tab of the [database detail]({{<relref "rc/databases/view-edit-database">}}) screen.

{{<image filename="images/rc/database-fixed-configuration-general.png" alt="The Redis version appears in the General section of the Configuration tab on the database details screen." >}}{{< /image >}}

### Set up RBAC

To set up RBAC, first navigate to the **Data Access Control** screen.

There are three tabs on this screen: **Users**, **Roles**, and **Redis ACLs**.

In the **Redis ACLs** tab, you define named *permissions* for specific Redis commands, keys, and pub/sub channels.

{{<image filename="images/rc/data-access-control-acls.png" alt="Data access control screen." >}}{{< /image >}}

In the **Roles** tab, you create roles. Each role consists of a set of permissions for one or more Redis Cloud databases.

{{<image filename="images/rc/data-access-control-roles.png" alt="Data access control screen." >}}{{< /image >}}

Finally, in the **Users** tab, you create users and assign each user a role.

{{<image filename="images/rc/data-access-control-users.png" alt="Data access control screen." >}}{{< /image >}}

#### OSS Redis ACLs vs. Redis Enterprise Cloud RBAC

In open source Redis, you can create users and assign ACLs to them using the `ACL` command. However, open source
Redis does not support generic roles.

In Redis Enterprise Cloud, you configure RBAC using the admin console. As a result, certain open source Redis ACL
subcommands are not available in Redis Cloud. The following table shows which ACL commands are supported.

{{<embed-md "acl-command-compatibility.md">}}

In open source Redis, you must explicitly provide access to the `MULTI`, `EXEC`, and `DISCARD` commands.
In Redis Cloud, these commands, which are used in transactions, are always permitted. However, the commands
run within the transaction block are subject to RBAC permissions.

When you run multi-key commands on multi-slot keys, the return value is `failure` but the command runs on the keys that are allowed.

### Define permissions

To define permissions, go to the **Redis ACLs** tab of the **Data Access Control** screen.

{{<image filename="images/rc/data-access-control-acls.png" alt="Data access control screen." >}}{{< /image >}}

You define these named permissions using the [Redis ACL syntax](https://redis.io/docs/management/security/acl/#acl-rules). This
syntax lets you concisely specify which commands, command categories, keys, and pub/sub channels to allow.

The Redis ACL syntax emphasizes brevity:

- `+` *includes* commands or command categories
- `-` *excludes* commands or command categories
- `@` indicates a command category
- `~` defines a permitted key pattern
- `&` allows access to a [pub/sub channel](https://redis.io/docs/manual/pubsub/)

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

#### Pub/sub ACL rules

Pub/sub ACL rules determine which [pub/sub channels](https://redis.io/docs/manual/pubsub/) a user can access.

For versions earlier than Redis 7, pub/sub is permissive and allows access to all channels by default.

Redis 7 changes pub/sub to restrictive and blocks access to all channels in open source (OSS) Redis. However, Redis Cloud still defaults to permissive pub/sub even for Redis 7 subscriptions.

| Redis<br />version | OSS Redis<br />pub/sub ACLs | Redis Cloud<br />pub/sub ACLs |
|:-------------:|-----------|-------------|
| 6.0 | Not supported | Not supported |
| 6.2 | Permissive | Permissive |
| 7.0 | Restrictive | Permissive |

##### Restrict channel access

To block access to all channels, use the following ACL rule:

```sh
resetchannels
```

If you want to limit access to specific channels, first include `resetchannels`. Then use `&` syntax to allow access to particular channels:

```sh
resetchannels &channel1 &channel2
```

##### Allow all channels

To make pub/sub explicitly permissive and allow users to access all channels, set the following rule:

```sh
allchannels
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

