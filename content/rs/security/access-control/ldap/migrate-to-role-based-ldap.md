---
Title: Migrate to role-based LDAP
description: Describes how to migrate existing cluster-based LDAP deployments to role-based LDAP.
weight: 55
alwaysopen: false
categories: ["RS"]
aliases: [
    "/rs/security/ldap/migrate-to-role-based-ldap/"
]
---

As of v6.0.20, Redis Enterprise Software supports two LDAP authentication mechanisms: the [cluster-based mechanism]({{<relref "/rs/security/access-control/ldap/cluster-based-ldap-authentication">}}) supported in earlier versions and a [role-based mechanism]({{<relref "/rs/security/access-control/ldap/">}}).

If you currently rely on the cluster-based mechanism, you can continue to use it in the short term.  However:

- You can only use one LDAP authorization mechanism at a time.

- Support for the cluster-based mechanism is deprecated and will be removed in a future version.

At some point, you’ll want to migrate to role-based LDAP.

## Migration checklist

This checklist covers the basic process:

1.  Identify accounts per app on the customer end.

1.  Create or identify an LDAP user account on the server that is responsible for LDAP authentication and authorization.

1.  Create or identify an LDAP group that contains the app team members.

1.  Verify or configure the Redis Enterprise ACLs.

1.  Configure each database ACL.

1.  Remove the earlier "external" (LDAP) users from Redis Enterprise.

1.  Use **Settings > LDAP** to enable role-based LDAP.

1.  Map your LDAP groups to access control roles.

1.  Test application connectivity using the LDAP credentials of an app team member.

1.  _(Recommended)_ Turn off default access for the database to avoid anonymous client connections.

 Because deployments and requirements vary, you’ll likely need to adjust these guidelines.

## Test LDAP access

To test your LDAP integration, you can:

- Connect with `redis-cli` and use the [`AUTH` command](https://redis.io/commands/auth/) to test LDAP username/password credentials.

- Sign in to the admin console using LDAP credentials authorized for admin access.

- Use [RedisInsight]({{<relref "/ri">}}) to access a database using authorized LDAP credentials.

- Use the [REST API]({{<relref "/rs/references/rest-api">}}) to connect using authorized LDAP credentials.

## More info

- Enable and configure [role-based LDAP]({{<relref "/rs/security/access-control/ldap/enable-role-based-ldap">}})
- Map LDAP groups to [access control roles]({{<relref "/rs/security/access-control/ldap/map-ldap-groups-to-roles">}})
- Update database ACLs to [authorize LDAP access]({{<relref "/rs/security/access-control/ldap/update-database-acls">}})
- Learn more about Redis Enterprise Software [security and practices]({{<relref "/rs/security/">}})
