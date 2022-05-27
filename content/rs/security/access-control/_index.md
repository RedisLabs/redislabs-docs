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
Role-based access control allows you to scale your Redis deployments while minimizing the overhead involved in managing a cluster with many databases, multiple users, and various access control lists. With RBAC, you can create a role once and then deploy it across multiple databases in the cluster with ease.

Roles may be configured using standard or custom templates for database permissions that are based on the Redis ACL syntax. Redis Enterprise allows you to restrict database operations by command, command category, and key pattern.
Keys are typically restricted based on a namespace using a glob style wildcard.

The role CacheReader demonstrated below has been given the acl rule "+get ~cache:*". Users in this role can access a key prefixed with “cached:” and the get command only. This would allow them to access the key cached:foo with the command get but not give them access to the set command. This role would not be able to access the key ‘foo’ because it is not prefixed with ‘cached:’ as you can see below.

![role](/images/rs/Redis-Role.png#no-click "role")

To learn more on Redis command and key restrictions visit the [Redis documentation](https://redis.io/topics/acl#acl-rules)


### Users, roles and Redis ACLs on Active-Active databases

Users, roles and Redis ACLs are cluster-level entities. Therefore they are applied per a local participating cluster and Active-Active database instance, and they are not replicated or propagated to the other participating clusters and instances.
ACLs will be enforced according to the instance the client is connected to. The Active-Active replication mechanism will propagate all the effects of the operation.
