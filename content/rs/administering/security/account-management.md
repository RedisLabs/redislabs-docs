---
Title: Account Management
description: $description
weight: $weight
alwaysopen: false
---
You can view and update the cluster users in the** **cluster's
**Settings \> team** page.

User Roles
----------

In Redis Enterprise Software 4.4 and above, administrative user roles as
part of Role Based Access Control (RBAC) are now supported.

+-----------------------+-----------------------+-----------------------+
| **Role**              | **Description**       | **Details**           |
+-----------------------+-----------------------+-----------------------+
| **Admin**             | Has full access to    |                       |
|                       | the system            |                       |
+-----------------------+-----------------------+-----------------------+
| **DB Viewer**         | Allowed to view DB    | -   Can view info     |
|                       | configuration/metrics |     about all         |
|                       | .                     |     databases on the  |
|                       | All Node/Cluster      |     cluster           |
|                       | information and       | -   Cannot view info  |
|                       | settings are          |     about nodes and   |
|                       | unavailable           |     cluster           |
|                       |                       | -   Can view logs     |
|                       |                       | -   Cannot view       |
|                       |                       |     cluster settings  |
|                       |                       |     outside of        |
|                       |                       |     changing own      |
|                       |                       |     password          |
+-----------------------+-----------------------+-----------------------+
| **Cluster Viewer**    | Allowed to view       | -   Can view all info |
|                       | Cluster and DB        |     about Cluster,    |
|                       | configuration/metrics |     nodes and         |
|                       | .                     |     databases.        |
|                       |                       | -   Can view logs     |
|                       |                       | -   Cannot view       |
|                       |                       |     cluster settings  |
|                       |                       |     outside of        |
|                       |                       |     changing own      |
|                       |                       |     password          |
+-----------------------+-----------------------+-----------------------+
| DB Member             | Allowed to view and   | -   Can create        |
|                       | edit DB               |     databases         |
|                       | configuration. All    | -   Can view db       |
|                       | Node/Cluster          |     metrics           |
|                       | information and       | -   Can edit database |
|                       | settings are          |     configurations    |
|                       | unavailable           | -   Can clear slowlog |
|                       |                       | -   Can view logs     |
|                       |                       | -   Cannot view info  |
|                       |                       |     about nodes and   |
|                       |                       |     cluster           |
|                       |                       | -   Cannot view       |
|                       |                       |     cluster settings  |
|                       |                       |     outside of        |
|                       |                       |     changing own      |
|                       |                       |     password          |
+-----------------------+-----------------------+-----------------------+
| **Cluster Member**    | Allowed to view       | -   Can view info     |
|                       | Node/DB information   |     about nodes and   |
|                       | and edit DB           |     cluster           |
|                       | configurations        | -   Can create        |
|                       |                       |     databases         |
|                       |                       | -   Can view db       |
|                       |                       |     metrics           |
|                       |                       | -   Can edit database |
|                       |                       |     configurations    |
|                       |                       | -   Can clear slowlog |
|                       |                       | -   Can view logs     |
|                       |                       | -   Cannot view       |
|                       |                       |     cluster settings  |
|                       |                       |     outside of        |
|                       |                       |     changing own      |
|                       |                       |     password          |
+-----------------------+-----------------------+-----------------------+

All roles apply to both the UI and API levels.

You can assign users with these roles through Settings -\> team page in
the UI or through the users API.

Adding a User
-------------

**To add a user:**

1.  Click the + (plus) sign at the bottom of the table.
2.  Enter the name, email and password of the new user.
3.  Select which Role the user should have
4.  Indicate whether the user will receive email alerts.
5.  Click **Save** icon.

![](/images/rs/useradd-300x101.png){.alignnone
.wp-image-21486 sizes="(max-width: 300px) 100vw, 300px"
srcset="https://redislabs.com/images/rs/useradd-300x101.png 300w, https://redislabs.com/images/rs/useradd-768x260.png 768w, https://redislabs.com/images/rs/useradd.png 887w"}

Updating a User
---------------

**To update a user:**

1.  Click the **Edit** icon at the far right of the user row.
2.  Edit the user details or delete the user.

Creating users for use with LDAP authentication
-----------------------------------------------

To have a user authenticate with LDAP, you must have [LDAP integration
enabled](/redis-enterprise-documentation/administering/cluster-operations/settings/ldap-integration/),
and then create a new user via the REST API call like this:

``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
$ curl -k -L -v -u ":" --location-trusted -H "Content-Type: application/json" 
-X POST  http://:8080/v1/users 
-d "{\"auth_method\": \"external\", \"name\": \"\", \"role\": \"\"}"
```

For the user-role, put in one of the following roles:

-   admin
-   cluster\_member
-   db\_viewer
-   db\_member
-   cluster\_viewer

**Note**: At this time, there is no way to convert an existing account
to use LDAP. You must delete the existing and create a new account to
use.
