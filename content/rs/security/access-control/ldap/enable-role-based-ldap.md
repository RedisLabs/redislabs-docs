---
Title: Enable role-based LDAP
description: Describes how to use Settings | LDAP to enable role-based LDAP authentication and authorization using the Redis Software admin console.
weight: 25
alwaysopen: false
categories: ["RS"]
aliases: [
   "/rs/security/ldap/enable-role-based-ldap/" 
]
---

Redis Enterprise Software uses a role-based mechanism to enable LDAP authentication and authorization.  

When a user attempts to access Redis Software resources using LDAP credentials, the credentials are passed to the LDAP server in a bind request. If the request succeeds, the user’s groups are searched for one authorizing access to the original resource.

Role-based LDAP lets you authorize admin console admins (previously known as _external users_) as well as database users.  As with any access control role, you can define the level of access authorized by the role.

## Set up LDAP connection

To enable and configure LDAP, sign into the Redis Software admin console and then select **Settings** | **LDAP**.

{{<image filename="images/rs/rs-settings-ldap-configure.png" width="75%" alt="The LDAP configuration screen in the Redis Software admin console" >}}{{< /image >}}

{{<warning>}}
If LDAP is already enabled, you may already be using the cluster-based LDAP integration.  If so, follow the [migration process]({{<relref "/rs/security/access-control/ldap/migrate-to-role-based-ldap">}}) to enable role-based LDAP.  (External users must be deleted from the admin console before enabling role-based LDAP.)
{{</warning>}}

When LDAP is enabled, use the info you gathered to populate the following settings:

### LDAP server settings

The **LDAP Server** settings define the communication settings used for LDAP authentication and authorization. These include:

| _Setting_ | _Description_ | 
|:----------|:--------------|
| **Protocol** | Underlying communication protocol; must be _LDAP_, _LDAPS_, or _STARTTLS_ |
| **Host** | URL of the LDAP server |
| **Port** | LDAP server port number |
| **Trusted CA certificate** |  _(LDAPS or STARTTLS protocols only)_ Certificate for the trusted certificate authority (CA) |

When defining multiple LDAP hosts, the organization tree structure must be identical for all hosts.

### Bind credentials

These settings define the credentials for the bind query:

| _Setting_ | _Description_ | 
|:----------|:--------------|
| **Distinguished Name** | Example: `cd=admin,dc=example,dc=org` |
| **Password** | Example: `admin1` |
| **Client certificate authentication** |_(LDAPS or STARTTLS protocols only)_ Place checkmark to enable | 
| **Client public key** | _(LDAPS or STARTTLS protocols only)_ The client public key for authentication |
| **Client private key** | _(LDAPS or STARTTLS protocols only)_ The client private key for authentication |

### Authentication query

These settings define the authentication query:

| _Setting_ | _Description_ | 
|:----------|:--------------|
| **Search user by** | Either _Template_ or _Query_ |
| **Template** | _(template search)_ Example: `cn=%u,ou=dev,dc=example,dc=com` |
| **Base** | _(query search)_ Example: `ou=dev,dc=example,dc=com` |
| **Filter** | _(query search)_ Example: `(cn=%u)` |
| **Scope**  | _(query search)_ Must be _baseObject_, _singleLevel_, or _wholeSubtree_ |

In this example, `%u` is replaced by the username attempting to access the Redis Software resource.

### Authorization query

These settings define the group authorization query:

| _Setting_ | _Description_ | 
|:----------|:--------------|
| **Search groups by** | Either _Attribute_ or _Query_ |
| **Attribute** | _(attribute search)_ Example: `memberOf` (case-sensitive) |
| **Base** | _(query search)_ Example: `ou=groups,dc=example,dc=com` |
| **Filter** | _(query search)_ Example: `(members=%D)` |
| **Scope**  | _(query search)_ Must be _baseObject_, _singleLevel_, or _wholeSubtree_ |

In this example, `%D` is replaced by the Distinguished Name of the user attempting to access the Redis Software resource.

### Save settings

When finished, use the **Save** button to save your changes.

## More info

- Map LDAP groups to [access control roles]({{<relref "/rs/security/access-control/ldap/map-ldap-groups-to-roles">}})
- Update database ACLs to [authorize LDAP access]({{<relref "/rs/security/access-control/ldap/update-database-acls">}})
- Learn more about Redis Software [security and practices]({{<relref "/rs/security/">}})
