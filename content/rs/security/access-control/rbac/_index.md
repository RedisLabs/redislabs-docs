---
Title: Role-based access control (RBAC)
linkTitle: Role-based access control
description: An overview of role-based access control (RBAC) in Redis Enterprise Software.
weight: 40
alwaysopen: false
categories: ["RS"]
aliases: 
---

Role-based access control allows you to control the level of access each user has to a Redis Enterprise cluster's admin console, REST API, and databases. To grant permissions, assign [predefined]({{<relref "/rs/security/access-control/rbac/create-roles#default-management-roles">}}) or custom roles to a user.

With RBAC, you can create a role once and then deploy it across multiple databases in the cluster.

Redis Enterprise allows you to restrict database operations by command, command category, key pattern, and pub/sub channel.
Keys are typically restricted based on a namespace using a glob-style wildcard.

## Role types

Assign a role, which grants specific cluster and database permissions, to multiple users.

There are two types of roles:

- Management roles, which determine user access to the cluster’s admin console and [REST API]({{<relref "/rs/references/rest-api">}}).

- Data access controls, which determine the permissions each role grants for each database in the cluster.

## Access control screen

There are three tabs on the **access control** screen:

- **redis ACLs** - define named *permissions* for specific Redis commands, keys, and pub/sub channels. You can use defined Redis ACLs for multiple databases and roles.

- **roles** - create roles. Each role consists of a set of permissions (Redis ACLs) for one or more Redis databases. You can reuse these roles for multiple users.

- **users** - create users and assign each user a role to grant database access to users.

## More info

- [Redis ACL rules](https://redis.io/docs/manual/security/acl/#acl-rules)
