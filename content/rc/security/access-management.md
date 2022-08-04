---
Title: Access management
description: Access management
weight: 40
alwaysopen: false
categories: ["RC"]
aliases: [ "/rv/administration/account-team-settings/",
         "/rc/administration/account-team-settings/",
         "/rc/administration/account-team-settings.md",
         "/rc/security/admin-console-security/user-team-management/",
         "/rc/security/admin-console-security/user-team-management.md",
         "/rc/administration/account-team-settings/",
         "/rc/administration/account-team-settings.md",
         "/rc/administration/access-management/",
         "/rc/administration/access-management.md" ]
---

The **Access management** screen helps you manage:

- The team of users allowed to access your subscription and its databases
- The API keys that authenticate application access to your account.

Here, you learn how to manage your team's users and to control their level of access. 

If your Redis Enterprise Cloud subscription is managed through Google Cloud Platform (GCP) marketplace, see [GCP Marketplace team management](#gcp-team-management) for help.

For help managing API keys, see [Manage API keys]({{< relref "/rc/api/get-started/manage-api-keys" >}}).

## Manage team access

The **Team** tab lets you manage the people allowed to access your account.  Each authorized person is assigned to a role that specifies their privileges.

{{<image filename="images/rc/access-management-team-tab.png" alt="The Access management tab helps you manage the people allowed to access your subscription." >}}{{< /image >}}

The list contains one entry summarizing the team settings for each user in your team.  By default, the list includes the account owner.

The list includes several buttons and icons to help you manage the list:

| Icon | Description |
|:----:|-------------|
| {{<image filename="images/rc/button-access-management-add.png" width="30px" alt="Use the Add button to add members to your team." >}}{{< /image >}} | The **Add** button lets you add members to your team |
| {{<image filename="images/rc/icon-access-management-edit-user.png" width="30px" alt="Use the Edit button change details for a team member." >}}{{< /image >}} | The **Edit** button lets you edit the settings for the selected team member |
| {{<image filename="images/rc/icon-access-management-delete-user.png" width="30px" alt="Use the Delete button to remove a member from your team." >}}{{< /image >}} | The **Delete** button lets you remove members from your team
| {{<image filename="images/rc/icon-list-filter.png" width="30px" alt="Use the Filter button to display team members that match specified conditions." >}}{{< /image >}} | **Filter** icons let you display team members matching conditions you specify |
| <nobr>{{<image filename="images/rc/icon-list-sort-asc.png" width="30px" alt="The Sort ascending button displays members in ascending order according to the values of the selected field." >}}{{< /image >}}{{<image filename="images/rc/icon-list-sort-desc.png" width="30px" alt="The Sort descending button displays members in descending order according to the values of the selected field." >}}{{< /image >}}</nobr> | The **Sort ascending** and **Sort descending** icons display the list according to the selected order |

If you have a large team, you can use the controls in the list footer to navigate quickly through the list.  These controls are disabled for small teams.

### Add user

When you add a member to your team, the **Add user** dialog appears.  

{{<image filename="images/rc/access-management-add-user-dialog.png" width="50%" alt="Use the Add User dialog to specify the details for your new user." >}}{{< /image >}}

Use this dialog to specify the following values:

| Setting | Description |
|---------|-------------|
| **Name** | Name of the user displayed in the admin console and in email messages |
| **Role** | The role identifies their subscription and account privileges.  For details, see [Team management roles](#team-management-roles). |
| **Email** | The address used for alerts and other email messages regarding the account | 
| **Alert emails** | Enable to be notified when subscription databases cross certain thresholds, such as exceeding memory limits or latency requirements |
| **Operational emails** | Notifications about subscription and database changes, such as creating or deleting a database |
| **Billing emails** | Notifications when bills are issued, paid, and so on |
| **Multi-factor authentication** | Whether MFA is enabled for the member.  This is disabled when members have not enabled or confirmed MFA in their user profile settings |

Use the **Add user** button to save your new team member details.

### Edit user

To edit user team details, select the user from the list and then select the **Edit** button.

When you do this, the **Edit user** dialog displays the details you can change.  

{{<image filename="images/rc/access-management-edit-user-dialog.png" width="50%" alt="Use the Edit User dialog to change the details for a user." >}}{{< /image >}}

You can change any detail except the team member's email address.

Use the **Save user** button to save your changes.

### Delete user

To remove a member from your team, select them from the list and then select the **Delete** button.  When you do this, a confirmation dialog appears.  

{{<image filename="images/rc/access-management-delete-user-dialog.png" width="50%" alt="Use the confirm that you want to remove a user from your team." >}}{{< /image >}}

Select the **Delete user** button to confirm removal.  This action is permanent and cannot be undone.

## Team management roles

Each team member is assigned a role that identifies their privileges and limits their activities in the admin console.

The following roles are available:

- **Owner** - Can view, create, and edit any settings in the account

    Each subscription must have at least one account owner.  Accounts can have multiple owners.

    Owners can also manage subscriptions, databases, and API keys.

- **Manager** - Can view, create, and edit any setting in the subscription 

    Managers can change subscription costs and change the payment methods associated with a subscription, but they cannot cannot add/remove available payment methods.

- **Member** - Can view, create, and edit databases in Fixed accounts

    Members may not impact costs associated with Flexible accounts; this means they cannot create databases or edit databases in ways that impact subscription cost.

- **Viewer** - Can view all databases and their configurations (including database secrets)

The following table shows each role's ability to perform common tasks using the admin console:

| Task | Owner | Manager | Member | Viewer |
|------|:-----:|:-------:|:------:|:------:|
| Access management | <span title="Owners can manage account access">&#x2705; Yes</span> | <span title="Managers may not manage account access">&#x274c; No</span> | <span title="Members may not manage account access">&#x274c; No</span> | <span title="Viewers may not manage account access">&#x274c; No</span> | 
| Account settings | <span title="Owners can change account settings">&#x2705; Yes</span> |  <span title="Managers may not manage account settings">&#x274c; No</span> | <span title="Members may not manage account settings">&#x274c; No</span> | <span title="Viewers may not manage account settings">&#x274c; No</span>  | 
| Billing & payments |  <span title="Owners can add/remove payment methods and view history">&#x2705; Yes</span> | <span title="Managers may not add/remove payment methods or view billing history (Managers may change subscription payment methods between those available to the account)">&#x274c; No</span> | <span title="Members may not add/remove payment methods or view billing history">&#x274c; No</span> | <span title="Viewers may not add/remove payment methods or view billing history">&#x274c; No</span> | 
| Create subscription | <span title="Owners can create new subscriptions">&#x2705; Yes</span> | <span title="Managers can create new subscriptions">&#x2705; Yes</span> | <span title="Members may not create subscriptions">&#x274c; No</span> | <span title="Viewers may not create subscriptions">&#x274c; No</span> |
| Create database (Flexible) | <span title="Owners can create databases in Flexible subscriptions">&#x2705; Yes</span> | <span title="Managers can create databases in Flexible subscriptions">&#x2705; Yes</span> | <span title="Members may not create databases in Flexible subscriptions">&#x274c; No</span> | <span title="Viewers may not create databases in Flexible subscriptions">&#x274c; No</span> |
| Edit database (affects cost) | <span title="Owners can edit databases in ways that impact subscription cost">&#x2705; Yes</span> | <span title="Managers can edit databases in ways that impact subscription costs">&#x2705; Yes</span> | <span title="Members may not edit databases in ways tht impact subscription cost">&#x274c; No</span> | <span title="Viewers may not edit databases in ways that impact subscription cost">&#x274c; No</span> |
| Create database (Fixed) | <span title="Owners can create databases in Fixed subscriptions">&#x2705; Yes</span> | <span title="Managers can create databases in Fixed subscriptions">&#x2705; Yes</span> | <span title="Members can create databases in Fixed subscriptions">&#x2705; Yes</span> | <span title="Viewers may not create databases in Fixed subscriptions">&#x274c; No</span> |
| Edit database (no cost impact ) | <span title="Owners can change databases in ways that do not affect subscription cost">&#x2705; Yes</span> | <span title="Managers can change databases in ways that do not affect subscription cost">&#x2705; Yes</span> | <span title="Members can change databases in ways that do not affect subscription cost">&#x2705; Yes</span> | <span title="Viewers may not create databases in ways that do not affect subscription cost">&#x274c; No</span> | 
| View subscription | <span title="Owners can view subscription details">&#x2705; Yes</span> | <span title="Managers can view subscription details">&#x2705; Yes</span> | <span title="Members can view subscription details">&#x2705; Yes</span> | <span title="Viewers can view subscription details">&#x2705; Yes</span> |
| View database | <span title="Owners can view database details">&#x2705; Yes</span> | <span title="Managers can view database details">&#x2705; Yes</span> | <span title="Members can view database details">&#x2705; Yes</span> | <span title="Viewers can view database details">&#x2705; Yes</span> |


## GCP Marketplace team management {#gcp-team-management}

If you subscribed to Redis Enterprise Cloud using Google Cloud Platform (GCP) Marketplace, use the **IAM section** of the GCP console to manage your team.

To grant Redis Cloud access to a GCP user, select the **Add** button to add a member, insert the email address, and then assign the following roles to the user:

- To designate a viewer, assign `serviceusage.serviceUsageViewer` & `redisenterprisecloud.viewer`
- To designate an owner, assign `serviceusage.serviceUsageViewer` & `redisenterprisecloud.admin`

If these roles are not available, you can add them to your project:

1. Select **Manage Roles** 

1. Use the **filter table** field to locate the role. (Search for "service usage viewer" or "redis enterprise cloud admin".)

1. Select the role by placing a checkmark in the checkbox

1. Select **Create role from selection** and then select **Create**

1. Use **IAM** to add a member and assign the desired role.

Users must sign into Redis Enterprise Cloud using their single sign-on credentials before they appear in the team member list. 
