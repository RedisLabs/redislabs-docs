---
Title: Role-based access control (RBAC)
linkTitle: Role-based access control
description: An overview of role-based access control (RBAC) in Redis Enterprise Software.
weight: 40
alwaysopen: false
categories: ["RS"]
aliases: 
---

Role-based access control (RBAC) allows you to configure the level of access each user has to a Redis Enterprise cluster's [admin console]({{<relref "/rs/security/access-control/admin-console-access">}}), [REST API]({{<relref "/rs/references/rest-api">}}), and [databases]({{<relref "/rs/security/access-control/database-access">}}). To grant permissions, assign [predefined]({{<relref "/rs/security/access-control/rbac/create-roles#default-management-roles">}}) or custom roles to a user. You can create a role once and then deploy it across multiple databases in the cluster.

## Role types

Assign a role, which grants specific cluster and database permissions, to multiple users.

There are two types of roles:

- [Management roles]({{<relref "/rs/security/access-control/admin-console-access">}}), which determine user access to the cluster’s admin console and [REST API]({{<relref "/rs/references/rest-api">}}).

- [Data access controls]({{<relref "/rs/security/access-control/database-access">}}), which determine the permissions each role grants for each database in the cluster.

## Access control screen

There are three tabs on the **access control** screen:

- **redis ACLs** - [Define named permissions]({{<relref "/rs/security/access-control/rbac/configure-acl">}}) for specific Redis commands, keys, and pub/sub channels. You can use defined Redis ACLs for multiple databases and roles.

- **roles** - [Create roles]({{<relref "/rs/security/access-control/rbac/create-roles">}}). Each role consists of a set of permissions (Redis ACLs) for one or more Redis databases. You can reuse these roles for multiple users.

- **users** - [Create users]({{<relref "/rs/security/access-control/manage-users/add-users">}}) and [assign a role to each user]({{<relref "/rs/security/access-control/rbac/assign-user-role">}}) to grant access to the admin console, REST API, or databases.

## Active-Active databases

Users, roles, and Redis ACLs are cluster-level entities, which means:

- They apply to the local participating cluster and Active-Active database instance.

- They do not replicate or propagate to the other participating clusters and instances.

- ACLs are enforced according to the instance connected to the client. The Active-Active replication mechanism propagates all the effects of the operation.

## More info

- [Grant admin console and REST API access for cluster management]({{<relref "/rs/security/access-control/admin-console-access">}})

- [Control database access using RBAC]({{<relref "/rs/security/access-control/database-access">}})

- [Redis ACL rules](https://redis.io/docs/manual/security/acl/#acl-rules)
