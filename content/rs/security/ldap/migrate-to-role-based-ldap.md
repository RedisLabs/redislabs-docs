---
Title: Migrate to role-based LDAP
description: Describes how to migrate existing cluster-based LDAP deployments to role-based LDAP.
weight: 55
alwaysopen: false
categories: ["RS"]
aliases: 
---

Redis Enterprise Software supports LDAP through a [role-based mechanism]({{< relref "/rs/security/ldap/" >}}), first introduced [in v6.0.20]({{< relref "rs/release-notes/rs-6-0-20-april-2021" >}}).

(Support for a earlier, [cluster-based mechanism]({{< relref "/rs/security/ldap/cluster-based-ldap-authentication.md" >}}) was removed in v6.2.12.)

If you're using the cluster-based mechanism to enable LDAP authentication, you need to migrate to the role-based mechanism before upgrading to Redis Enterprise Software v6.2.12 or later.

## Migration checklist

Here's the basic process:

1.  Identify accounts per app (on the customer end).

1.  Create (or identify) an LDAP user account on the appropriate server, e.g. the one responsible for LDAP authentication and authorization.

1.  Create (or identify) an LDAP group that contains the app team members.

1.  Verify/configure the Redis Software ACLs.

1.  Configure each database ACL.

1.  Remove the earlier "external" (LDAP) users from Redis Software.

1.  Use **Settings** | **LDAP** to enable role-based LDAP.

1.  Map your LDAP groups to access control roles.

1.  Test application connectivity using the LDAP credentials of an app team member.

1.  _(Recommended)_ Disable default access for the database to avoid anonymous client connections.

 Because deployments and requirements vary, you’ll likely need to adjust these guidelines.

## Test LDAP access

To test your LDAP integration, including:

- Connecting with `redis-cli` and using the AUTH command to test LDAP username/password credentials.

- Signing in to the admin console using LDAP username/password credentials authorized for the Administration role.

-  Signing in to RedisInsight using authorized LDAP username/password credentials.

- Using the REST API to connect using LDAP username/password credentials.

## Related info

- Enable and configure [role-based LDAP]({{< relref "/rs/security/ldap/enable-role-based-ldap.md" >}})
- Map LDAP groups to [access control roles]({{< relref "/rs/security/ldap/map-ldap-groups-to-roles.md" >}})
- Update database ACLs to [authorize LDAP access]({{< relref "/rs/security/ldap/update-database-acls.md" >}})
- Learn more about Redis Software [security & practices]({{< relref "/rs/security/" >}})
