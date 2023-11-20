---
Title: Enable Role-based access control
LinkTitle: Role-based access control
description: Lets you define multiple users with fine-grained data authorization features.
weight: 10
alwaysopen: false
toc: "true"
headerRange: "[1-3]"
categories: []
aliases: 
---

Role-based access control (RBAC) lets you define *roles* with specific sets of *permissions*. You can then assign *users* to these roles
to provide appropriate levels of access.

RBAC effectively lets you implement the [principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege). For example, you can provide
read-only access to an application whose only job is to display Redis data. Similarly, you can prevent new developers from running dangerous administrative commands.


## Set up RBAC

To set up RBAC, first navigate to the **Data Access Control** screen.

There are three tabs on this screen: **Users**, **Roles**, and **Redis ACLs**.

In the **Redis ACLs** tab, you [define named *permissions*]({{<relref "rc/security/access-control/data-access-control/configure-acls">}}) for specific Redis commands, keys, and pub/sub channels.

{{<image filename="images/rc/data-access-control-acls.png" alt="Data access control screen." >}}{{< /image >}}

In the **Roles** tab, you [create roles]({{<relref "rc/security/access-control/data-access-control/create-roles">}}). Each role consists of a set of permissions for one or more Redis Cloud databases.

{{<image filename="images/rc/data-access-control-roles.png" alt="Data access control screen." >}}{{< /image >}}

Finally, in the **Users** tab, you [create users]({{<relref "rc/security/access-control/data-access-control/create-assign-users">}}) and [assign each user a role]({{<relref "rc/security/access-control/data-access-control/create-assign-users#assign-roles-to-users">}}).

{{<image filename="images/rc/data-access-control-users.png" alt="Data access control screen." >}}{{< /image >}}

{{<note>}}Database access users are different from account access users. To learn more, see [Access management]({{<relref "rc/security/access-control/">}}).{{</note>}}


## OSS Redis ACLs vs. Redis Cloud RBAC

In open source Redis, you can create users and assign ACLs to them using the `ACL` command. However, open source
Redis does not support generic roles.

In Redis Cloud, you configure RBAC using the Redis Cloud console. As a result, certain open source Redis ACL
subcommands are not available in Redis Cloud. The following table shows which ACL commands are supported.

{{<embed-md "acl-command-compatibility.md">}}

In open source Redis, you must explicitly provide access to the `MULTI`, `EXEC`, and `DISCARD` commands.
In Redis Cloud, these commands, which are used in transactions, are always permitted. However, the commands
run within the transaction block are subject to RBAC permissions.

When you run multi-key commands on multi-slot keys, the return value is `failure` but the command runs on the keys that are allowed.



