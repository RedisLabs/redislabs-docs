---
Title: Account Management
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/designing-production/security/account-management/
---
To give each user only the permissions that they need for their work with the cluster,
RS lets you assign a role to each user.
You can manage users and roles in **Settings** > **team**, or with the API.

The roles and permissions available in RS are:

<table class="small">
  <tr>
    <th></th>
    <th colspan="4">Database</th>
    <th colspan="3">Nodes</th>
    <th colspan="5">Cluster</th>
  </tr>
  <tr>
    <td align="center"></td>
    <td class="cat-boundary" align="center">View metrics</td>
    <td align="center">View<br>config</td>
    <td align="center">Edit config</td>
    <td align="center">Clear<br>slow log</td>
    <td class="cat-boundary" align="center">View metrics</td>
    <td align="center">View<br>config</td>
    <td align="center">Edit<br>config</td>
    <td class="cat-boundary" align="center">View metrics</td>
    <td align="center">View<br>config</td>
    <td align="center">Edit<br>config</td>
    <td align="center">View logs</td>
    <td align="center">View<br>and edit<br>settings</td>
  </tr>
  <tr>
    <td class="row-head">DB Viewer</td>
    <td class="cat-boundary" align="center" align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td align="center"></td>
    <td align="center"></td>
    <td class="cat-boundary" align="center" align="center"></td>
    <td align="center"></td>
    <td align="center"></td>
    <td class="cat-boundary" align="center" align="center"></td>
    <td align="center"></td>
    <td align="center"></td>
    <td align="center"></td>
    <td align="center"></td>
  </tr>
  <tr>
    <td class="row-head">DB Member</td>
    <td class="cat-boundary" align="center" align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td class="cat-boundary" align="center" align="center"></td>
    <td align="center"></td>
    <td align="center"></td>
    <td class="cat-boundary" align="center" align="center"></td>
    <td align="center"></td>
    <td align="center"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td align="center"></td>
  </tr>
  <tr>
    <td class="row-head">Cluster Viewer</td>
    <td class="cat-boundary" align="center" align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td align="center"></td>
    <td align="center"></td>
    <td class="cat-boundary" align="center" align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td align="center"></td>
    <td class="cat-boundary" align="center" align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td align="center"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td align="center"></td>
  </tr>
  <tr>
    <td class="row-head">Cluster Member</td>
    <td class="cat-boundary" align="center" align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td class="cat-boundary" align="center" align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td align="center"></td>
    <td class="cat-boundary" align="center" align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td align="center"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td align="center"></td>
  </tr>
  <tr>
    <td class="row-head">Admin</td>
    <td class="cat-boundary" align="center" align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td class="cat-boundary" align="center" align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td class="cat-boundary" align="center" align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png" alt="V"></td>
  </tr>
</table>

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
