---
Title: Access control
linkTitle: Access control
description: An overview of access control in Redis Enterprise Software.
weight: 10
alwaysopen: false
categories: ["RS"]
aliases: ["/rs/administering/access-control/user-roles",
          "/rs/security/passwords-users-roles/"]
---
Role-based access control allows you to scale your Redis deployments while minimizing the overhead involved in managing a cluster with many databases, multiple users, and various access control lists. With RBAC, you can create a role once and then deploy it across multiple databases in the cluster.

You can configure roles with standard or custom templates for database permissions that are based on the Redis ACL syntax. Redis Enterprise allows you to restrict database operations by command, command category, and key pattern.
Keys are typically restricted based on a namespace using a glob-style wildcard.

The role CacheReader demonstrated below has been given the ACL rule `+get ~cache:*`. Users with this role can access a key prefixed with `cached:` and the `GET` command only. This lets them access the key `cached:foo` with the command `GET` but does not give them access to the `SET` command. This role cannot access the key `foo` because it is not prefixed with `cached:`.

![role](/images/rs/Redis-Role.png#no-click "role")

To learn more, see the [Redis ACL rules documentation](https://redis.io/docs/manual/security/acl/#acl-rules).
