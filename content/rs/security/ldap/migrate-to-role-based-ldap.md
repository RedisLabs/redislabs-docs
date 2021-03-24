---
Title: Migrate to role-based LDAP
description: Describes how to migrate existing cluster-based LDAP deployments to role-based LDAP.
weight: 55
alwaysopen: false
categories: ["RS"]
aliases: 
---

As of v6.0.20, Redis Enterprise Software supports two LDAP authentication mechanisms: the cluster-based mechanism supported in earlier versions and a role-based mechanism.

If you currently rely on the cluster-based mechanism, you can continue to do so in the short term.  However:

- You can only use one LDAP authorization mechanism at a time.

- Support for the cluster-based mechanism is consider deprecated; it will be removed in a future version.

At some point, you’ll want to migrate to role-based LDAP.

## Migration checklist

Here’s a high-level checklist that covers the basic process:

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

## Ways to test access

There are several ways to test your LDAP integration, including:

- Connecting with `redis-cli` and using the AUTH command to test LDAP username/password credentials.

- Signing in to the admin console using LDAP username/password credentials authorized for the Administration role.

-  Signing in to RedisInsight using authorized LDAP username/password credentials.

- Using the REST API to connect using LDAP username/password credentials.

## Next steps

- Enable and configure [role-based LDAP]({{< relref "/rs/security/ldap/enable-role-based-ldap.md" >}})
- Map LDAP groups to [access control roles]({{< relref "/rs/security/ldap/map-ldap-groups-to-roles.md" >}})
- Update database ACLs to [authorize LDAP access]({{< relref "/rs/security/ldap/update-database-acls.md" >}})
- Learn more about Redis Software [security & practices]({{< relref "/rs/security/" >}})
