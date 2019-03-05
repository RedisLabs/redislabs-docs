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
You can manage users and roles in **settings** > **team**, or with the REST API.

The roles and permissions available in RS are:

<table>
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
    <td class="cat-boundary" align="center" align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
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
    <td class="cat-boundary" align="center" align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td class="cat-boundary" align="center" align="center"></td>
    <td align="center"></td>
    <td align="center"></td>
    <td class="cat-boundary" align="center" align="center"></td>
    <td align="center"></td>
    <td align="center"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td align="center"></td>
  </tr>
  <tr>
    <td class="row-head">Cluster Viewer</td>
    <td class="cat-boundary" align="center" align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td align="center"></td>
    <td align="center"></td>
    <td class="cat-boundary" align="center" align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td align="center"></td>
    <td class="cat-boundary" align="center" align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td align="center"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td align="center"></td>
  </tr>
  <tr>
    <td class="row-head">Cluster Member</td>
    <td class="cat-boundary" align="center" align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td class="cat-boundary" align="center" align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td align="center"></td>
    <td class="cat-boundary" align="center" align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td align="center"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td align="center"></td>
  </tr>
  <tr>
    <td class="row-head">Admin</td>
    <td class="cat-boundary" align="center" align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td class="cat-boundary" align="center" align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td class="cat-boundary" align="center" align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
    <td align="center"><img src="../../../../images/icon_logo/icon_check_black.png#no-click" alt="V"></td>
  </tr>
</table>

## Adding a user

To add a user to the cluster:

1. Go to: **settings** > **team**
1. Click ![Add](/images/rs/icon_add.png#no-click "Add").
1. Enter the name, email and password of the new user and select the role to assign to the user.
1. Select the type of user:
    - internal - The user authenticates to RS
    - external - The user authenticates to an external LDAP server

      To have a user authenticate with LDAP, you must first [enable LDAP integration]({{< relref
      "/rs/administering/security/ldap-integration.md" >}}).

1. For the email alerts, click **Edit** and select the alerts that the user receives.
    You can select:
    - Receive alerts for databases - The alerts that are enabled for the selected databases are sent to
      the user. You can either select all databases,or you can select **Customize** and select the
      individual databases to send alerts for.
    - Receive cluster alerts - The alerts that are enabled for the cluster are send to the user.

    {{% expand "Show me how..." %}}![Select email alerts](/images/rs/add-user-email-alerts.gif "Select email alerts"){{% /expand %}}

    Then, click **Save**.
1. Click ![Save](/images/rv/icon_save.png#no-click "Save").

To edit the name, password, role or email alerts of a user, hover over the user and click ![Edit]
(/images/rv/icon_edit.png#no-click "Edit"). To change a user from internal to external, you must
delete the user and re-add it.

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
