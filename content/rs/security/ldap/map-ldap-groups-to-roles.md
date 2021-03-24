---
Title: Map LDAP groups to roles
description: Describes how to map LDAP authorization groups to Redis Software roles using the Redis Software admin console.
weight: 35
alwaysopen: false
categories: ["RS"]
aliases: 
---

Redis Software uses a role-based mechanism to enable LDAP authentication and authorization.  

Once LDAP is enabled, you need to map LDAP roles to Redis Software access control roles.  

Here’s how:

1. From the admin console menu, select **Access control**| **LDAP mappings**.

    _(screenshot)_

   If you see an "LDAP configuration is disabled" message, use **Settings** | **LDAP** to [enable role-based LDAP](enable-role-based-ldap.md).


1.  Select the **Add** button to create a new mapping and then enter the following details:

    | _Setting_ | _Description_ | 
|:----------|:--------------|
| **Name** | A descriptive, unique name for the mapping |
| **Distinguished Name** | The distinguished name of the LDAP group to be mapped.  <br/>Example: `cn=admins,ou=groups,dc=example,dc=com` |
| **Role** | The Redis Software access control role defined for this group. |
| **Notified email** | _(Optional)_) An address to receive alerts|
| **Email alerts**  | Selections identifying the desired alerts.  Select **Edit** to change. |

1.  When finished, select the **Save** button.

Create a mapping for each LDAP group used to authenticate and/or authorize access to Redis Software resources.

The scope of the authorization depends on the access control role:

- If the role authorizes admin management, LDAP users are authorized as admin console administrators.

- If the role authorizes database access, LDAP users are authorized to use the database to the limits specified in the role.

- To authorize LDAP users to specific databases, update the database access control lists (ACLs) to include the mapped LDAP role.

## Related info

TBD