---
Title: Update database ACLs
description: Describes how to use the admin console to update database access control lists (ACLs) to authorize access to roles authorizing LDAP user access.
weight: 45
alwaysopen: false
categories: ["RS"]
aliases: [
    "/rs/security/ldap/update-database-acls/"
]
---

To grant LDAP users access to a database, assign the mapped access role to the access control list (ACL) for the database.

1.  From the admin console menu, select **Databases** and then select the database from the list.

1.  Select the **Configuration** tab to display the database details.

    {{<image filename="images/rs/rs-database-config-tabs.png" width="75%" alt="The Database | Configuration screen in the Redis Software admin console" >}}{{< /image >}}

1.  Select the **Edit** button.

    {{<image filename="images/rs/rs-database-config-buttons.png" width="75%" alt="The Database | Configuration screen in the Redis Software admin console" >}}{{< /image >}}

1.  Locate the **Access Control List** setting and select its **Add** button.

    {{<image filename="images/rs/rs-database-config-acl-edit.png" width="75%" alt="Updating a database access control list (ACL)" >}}{{< /image >}}

1.  Select the appropriate roles and then save your changes.

If you assign multiple roles to an ACL and a user is authorized by more than one of these roles, their access is determined by the first “matching” rule in the list.  

If the first rule gives them read access and the third rule authorizes write access, the user will only be able to read data.  

As a result, we recommend ordering roles so that higher access roles appear before roles with more limited access. 


## More info

- Enable and configure [role-based LDAP]({{<relref "/rs/security/access-control/ldap/enable-role-based-ldap.md">}})
- Map LDAP groups to [access control roles]({{<relref "/rs/security/access-control/ldap/map-ldap-groups-to-roles.md">}})
- Learn more about Redis Enterprise Software [security and practices]({{<relref "/rs/security/">}})
