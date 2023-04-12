---
Title: Configure permissions with Redis ACLs
LinkTitle: Configure ACLs
description: 
weight: 15
alwaysopen: false
toc: "true"
headerRange: "[1-3]"
categories: []
aliases: 
---

To configure a Redis ACL that you can assign to a data access role:

1. Go to **Data Access Control > ACLs** and either:

    - Create a new Redis ACL:

        {{<image filename="images/rc/icon-rbac-add.png" width="40px" alt="Select the Add button to create a new Redis ACL." >}}{{< /image >}}

    - Point to an existing ACL and select **Edit**:

        {{<image filename="images/rc/icon-rbac-edit.png" width="40px" alt="Select the Edit button to edit an existing ACL." >}}{{< /image >}}

1. Provide a descriptive name for the Redis ACL.

1. Enter [ACL syntax](#define-permissions-with-acl-syntax) to define the ACL rule or select **Rule Builder** for help building the ACL rule with correct syntax.

1. To create a Redis ACL rule with the **Rule Builder**:

    1. For **Redis commands / categories**, enter a [command](https://redis.io/commands/) or [command category](https://redis.io/docs/management/security/acl/#command-categories).

    1. Select whether to include or exclude the command or category.

    1. For **Keys**, enter the [pattern for permitted keys](https://redis.io/docs/management/security/acl/#key-permissions).

    1. In **Pub/Sub channels**, enter a channel pattern to restrict [pub/sub](https://redis.io/docs/manual/pubsub/) so it only allows access to the specified channels.
    
        The rule builder automatically adds `resetchannels` to the ACL rule when you save. This rule changes pub/sub access from permissive (allows access to all channels) to restrictive (blocks access to all channels).

        {{<note>}}
- **Pub/Sub channels** are only available in the **Rule Builder** for accounts that have Redis version 6.2 or later for all subscriptions.
- If your account contains any Redis 6.0 subscriptions, you can't use pub/sub ACLs unless you contact support to upgrade the subscriptions to a later version.
        {{</note>}}

    1. To add more commands, categories, keys, or pub/sub channels to the ACL rule, select **Add**:

        {{<image filename="images/rc/button-data-access-control-redis-acls-rule-builder-add.png"  alt="Use the Add button to add more commands, categories, or keys to the ACL rule." >}}{{< /image >}}

    1. When you finish building the ACL rule, select **Save rule**:

        {{<image filename="images/rc/button-data-access-control-redis-acls-rule-builder-save-rule.png" width="120px" alt="The Save rule button saves your ACL rule changes." >}}{{< /image >}}

1. Select the check mark to save your changes:

    {{<image filename="images/rc/icon-check-mark.png" width="40px" alt="Select the Submit entry button to save your Redis ACL changes." >}}{{< /image >}}

Once you've created a Redis ACL, you can [assign it to a role]({{<relref "rc/security/access-control/data-access-control/create-roles">}}). 

## Define permissions with ACL syntax

You can define these permissions using the [Redis ACL syntax](https://redis.io/docs/management/security/acl/#acl-rules). This
syntax lets you concisely specify which commands, command categories, keys, and pub/sub channels to allow.

The Redis ACL syntax emphasizes brevity:

- `+` *includes* commands or command categories
- `-` *excludes* commands or command categories
- `@` indicates a command category
- `~` defines a permitted key pattern
- `&` allows access to a [pub/sub channel](https://redis.io/docs/manual/pubsub/)

### Command ACL rules

A **command** can be any [Redis command](https://redis.io/commands/).

For example, this Redis ACL rule indicates that the `SET` command is permitted:

```sh
+set
```

### Command category ACL rules

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

### Key ACL rules

There's also a [syntax](https://redis.io/docs/management/security/acl/#key-permissions) for specifying which **keys** are accessible.

The following ACL rule allows access to all keys:

```sh
~*
```

Whereas, this ACL rule only allows access to keys prefixed with `cache:`

```
~cache:*
```

### Pub/sub ACL rules

Pub/sub ACL rules determine which [pub/sub channels](https://redis.io/docs/manual/pubsub/) a user can access.

For versions earlier than Redis 7, pub/sub is permissive and allows access to all channels by default.

Redis 7 changes pub/sub to restrictive and blocks access to all channels in open source (OSS) Redis. However, Redis Cloud still defaults to permissive pub/sub even for Redis 7 subscriptions.

| Redis<br />version | OSS Redis<br />pub/sub ACLs | Redis Cloud<br />pub/sub ACLs |
|:-------------:|-----------|-------------|
| 6.0 | Not supported | Not supported |
| 6.2 | Permissive | Permissive |
| 7.0 | Restrictive | Permissive |

#### Restrict channel access

To block access to all channels, use the following ACL rule:

```sh
resetchannels
```

If you want to limit access to specific channels, first include `resetchannels`. Then use `&` syntax to allow access to particular channels:

```sh
resetchannels &channel1 &channel2
```

#### Allow all channels

To make pub/sub explicitly permissive and allow users to access all channels, set the following rule:

```sh
allchannels
```

### Predefined permissions

Redis Cloud includes three, predefined permissions:

- Full-Access (`+@all ~*`) - All commands are allowed for all keys

- Read-Write (`+@all -@dangerous ~*`) - All commands except for the "dangerous" command category are allowed for all keys

- Read-Only (`+@read ~*`) - Only the "read" command category is allowed for all keys

### Module command permissions

Note that you can define permissions for the Redis module commands of any modules that are loaded on the subscription;
however, these permissions can only be used for databases that support those modules.