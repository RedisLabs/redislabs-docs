---
Title: Authentication and authorization
description:
weight: 10
alwaysopen: false
categories: ["RS"]
aliases: ["/rs/administering/designing-production/security/login-lockout"]
---
You can configure users and roles for the admin console. This section details how you can set users and roles, configure external identity providers for authentication, and set up user account security within Redis Enterprise Software.<!--more-->

## Update Active-Active cluster admin credentials

Active-Active databases use administrator credentials to manage operations for Active-Active database.
To update the administrator user password on a cluster with Active-Active databases:
1. From the user management page, update the administrator user password on the clusters you wish to update.
1. For each participating cluster _and_ each Active-Active database, update the admin user credentials to match the changes in Step 1. 
{{< warning>}}Do not perform any management operation on the databases until these steps are complete. {{< /warning >}}

## LDAP integration

As of version 6.0.20, Redis Enterprise Software integrates [Lightweight Directory Access Protocol](https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol) (LDAP) authentication and authorization into its [role-based access controls]({{<relref "rs/security/access-control">}}) (RBAC).  You can now use LDAP to authorize access to the admin console and to authorize database access.

To learn more, including how to set up LDAP or to migrate an existing LDAP integration to the new mechanism, see [LDAP authentication]({{<relref "rs/security/access-control/ldap/">}}).
