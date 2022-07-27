---
title: LDAP authentication
linkTitle: LDAP authentication
description: Describes how Redis Enterprise Software integrates LDAP authentication and authorization. Also describes how to enable LDAP for your deployment of Redis Enterprise Software.
weight: 25
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/designing-production/security/ldap-integration/
         /rs/security/admin-console-security/ldap/
         /rs/security/ldap/
---

As of version 6.0.20, Redis Enterprise Software integrates [Lightweight Directory Access Protocol](https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol) (LDAP) authentication and authorization into its [role-based access controls]({{<relref "rs/security/access-control">}}) (RBAC).  You can now use LDAP to authorize access to the admin console and to authorize database access.

Furthermore, you can configure LDAP roles using the Redis Enterprise admin console or REST API.

Previously, you could enable LDAP authentication for admin console users by [configuring a cluster]({{<relref "/rs/security/access-control/ldap/cluster-based-ldap-authentication">}}) either through the command line or the REST API.   

The cluster-based LDAP mechanism is supported in v6.0.20; however, the mechanism is deprecated and will be removed in a future update.

Note that the cluster-based mechanism is not compatible with the new role-based approach. You can use either for now, but not both at the same time.

If you are using the earlier LDAP mechanism, you will need to migrate to role-based LDAP at some point in the near future.  For help, see [Migrate to role-based LDAP]({{<relref "/rs/security/access-control/ldap/migrate-to-role-based-ldap">}}).

## How it works

Here's how role-based LDAP integration works:

1.  A user signs in with their LDAP credentials.  

    Based on the LDAP configuration details, the username is mapped to an LDAP Distinguished Name.

1.  A simple [LDAP bind request](https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol#Bind_(authenticate)) is attempted using the Distinguished Name and the password.  The sign-in fails if the bind fails.

1.  Obtain the user’s LDAP group memberships.

    Using configured LDAP details, obtain a list of the user’s group memberships.

1.  Compare the user’s LDAP group memberships to those mapped to local roles.

1.  Determine if one of the user's groups is authorized to access the target resource.  If so, the user is granted the level of access authorized to the role.  

To access the admin console, the user needs to belong to an LDAP group mapped to an administrative role.  

For database access, the user needs to belong to an LDAP group mapped to a role listed in the database’s access control list (ACL).  The rights granted to the group determine the user's level of access. 

## Prerequisites 

Before you enable LDAP in Redis Enterprise, you need:

1. The LDAP groups that correspond to the levels of access you wish to authorize.  Each LDAP group will be mapped to a Redis Enterprise access control role.

1. A Redis Enterprise access control role for each LDAP group. Before you enable LDAP, you need to set up [role-based access controls]({{<relref "rs/security/access-control">}}) (RBAC).

1. The following LDAP details:

    - Server URI, including host, port, and protocol details.  
    - Certificate details for secure protocols.  
    - Bind credentials, including Distinguished Name, password, and (optionally) client public and private keys for certificate authentication.  
    - Authentication query details, whether template or query.  
    - Authorization query details, whether attribute or query.  
    - The Distinguished Names of LDAP groups you’ll use to authorize access to Redis Enterprise resources. 

## Enable LDAP

To enable LDAP:

1.  From **Settings > LDAP** in the admin console, [enable LDAP access]({{<relref "/rs/security/access-control/ldap/enable-role-based-ldap">}}).

1.  Map LDAP groups to [access control roles]({{<relref "/rs/security/access-control/ldap/map-ldap-groups-to-roles">}}).

1.  Update database access control lists (ACLs) to [authorize role access]({{<relref "/rs/security/access-control/ldap/update-database-acls">}}).  

If you already have appropriate roles, you can update them to include LDAP groups.

## More info

- Enable and configure [role-based LDAP]({{<relref "/rs/security/access-control/ldap/enable-role-based-ldap">}})
- Map LDAP groups to [access control roles]({{<relref "/rs/security/access-control/ldap/map-ldap-groups-to-roles">}})
- Update database ACLs to [authorize LDAP access]({{<relref "/rs/security/access-control/ldap/update-database-acls">}})
- Learn more about Redis Enterprise Software [security and practices]({{<relref "/rs/security/">}})

