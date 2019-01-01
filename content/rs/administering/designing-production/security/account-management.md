---
Title: Account Management
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/designing-production/security/account-management/
---
You can view and update the cluster users in the cluster **Settings > team** page.

## User Roles

The user roles included in Role Based Access Control (RBAC) are:

|  **Role** | **Description** | **Details** |
|  ------ | ------ | ------ |
|  **Admin** | Has full access to the system |  |
|  **DB Viewer** | Allowed to view DB configuration/metrics. All Node/Cluster information and settings are unavailable | Can view info about all databases on the cluster<br/><br/>Cannot view info about nodes and cluster<br/><br/>Can view logs<br/><br/>Cannot view cluster settings outside of changing own password |
|  **Cluster Viewer** | Allowed to view Cluster and DB configuration/metrics. | Can view all info about Cluster, nodes and databases.<br/><br/>Can view logs<br/><br/>Cannot view cluster settings outside of changing own password |
|  **DB Member** | Allowed to view and edit DB configuration. All Node/Cluster information and settings are unavailable | Can create databases<br/><br/>Can view db metrics<br/><br/>Can edit database configurations<br/><br/>Can clear slowlog<br/><br/>Can view logs<br/><br/>Cannot view info about nodes and cluster<br/><br/>Cannot view cluster settings outside of changing own password |
|  **Cluster Member** | Allowed to view Node/DB information and edit DB configurations | Can view info about nodes and cluster<br/><br/>Can create databases<br/><br/>Can view db metrics<br/><br/>Can edit database configurations<br/><br/>Can clear slowlog<br/><br/>Can view logs<br/><br/>Cannot view cluster settings outside of changing own password |

All roles apply to both the UI and API levels.

You can assign users with these roles through Settings -\> team page in
the UI or through the users API.

## Adding a User

**To add a user:**

1. Click the + (plus) sign at the bottom of the table.
1. Enter the name, email and password of the new user.
1. Select which Role the user should have
1. Indicate whether the user will receive email alerts.
1. Click **Save** icon.

    ![useradd](/images/rs/useradd-300x101.png)

## Updating a User

**To update a user:**

1. Click the **Edit** icon at the far right of the user row.
1. Edit the user details or delete the user.

## Creating users for use with LDAP authentication

To have a user authenticate with LDAP, you must have [LDAP integration
enabled]({{< relref "/rs/administering/designing-production/security/ldap-integration.md" >}}),
and then create a new user via the REST API call like this:

```src
curl -k -L -v -u ":" --location-trusted -H "Content-Type: application/json" -X POST http://:8080/v1/users -d "{\"auth_method\": \"external\", \"name\": \"\", \"role\": \"\"}"
```

For the user-role, put in one of the following roles:

- admin
- cluster_member
- db_viewer
- db_member
- cluster_viewer

**Note**: At this time, there is no way to convert an existing account
to use LDAP. You must delete the existing and create a new account to
use.
