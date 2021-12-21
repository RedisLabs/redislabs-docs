---
Title: Account and team settings
description:
weight: 40
alwaysopen: false
categories: ["RC"]
aliases: /rv/administration/account-team-settings/
---
On this page you can view settings for your Redis Cloud account and team.
You can also:

- Add or edit your VAT ID
- Change the account time zone
- Add a new Relic license key
- Configure Multi-Factor Authentication (MFA)

When you set up [SSL/TLS]({{< relref "/rc/security/database-security/tls-ssl.md" >}}) for your account,
you must enter the downloadable Redis CA Certificate from this page.

![settings](/images/rc/settings.png)

## Team management

To manage the team of people who have access to the account, click on
the "Team" tab, and you will be presented with the current list of team
members on this account.

- To add more team members, click ![Add](/images/rs/icon_add.png#no-click "Add").
- To edit an existing team member, click ![Edit](/images/rc/icon_edit.png#no-click "Edit").

Team members can have different roles to the account:

- **Owner** - Can view, create, and edit any settings in the account

- **Manager** - Can view, create, and edit any settings in the subscription 

    Managers can change subscription costs and change the payment methods associated with a subscription, but they cannot cannot add/remove available payment methods.

- **Member** - Can view, create, and edit databases in Fixed accounts

    Members may not impact costs associated with Flexible accounts; this means they cannot create databases or edit databases in ways that impact subscription cost.

- **Viewer** - Can view all databases and their configurations (including database secrets)

To illustrate, the following table shows each role's ability to perform common tasks using the admin console:

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


### Team management for GCP Marketplace customers


If you subscribed to Redis Enterprise Cloud using GCP Marketplace, you can manage your team from the **IAM section** of the GCP console.
To grant Redis Cloud access to a GCP user, select the **Add** button to add a member, insert the email address, and then assign one of the following roles to the user:

 serviceusage.serviceUsageViewer & redisenterprisecloud.viewer - these roles should be assigned to member designated as viewer
 serviceusage.serviceUsageViewer & redisenterprisecloud.admin -  these roles should be assigned to member designated as owner
 
In case these roles do not appear, add a role to your project by doing the following:
1. Select **Manage Roles** 
1. Search the role on the **filter table** field ( for example: "service usage viewer" or "redis enterprise cloud admin")
1. Place a check in the checkbox
1. Select **Create role from selection** and select **Create**
1. Go back to **IAM** to add a member and assign the desried roles.

Users are not added to the team until they sign in to Redis Cloud using their single-sign on (SSO) credentials.
Use the **manage on provider** button to do so. 

## Multi-Factor Authentication (MFA)

To reduce the chances of unauthorized access to the Redis Enterprise Cloud admin console, each user can enable MFA to require an authentication code at login.
The account owner can also enable MFA enforcement for all users in the account to block users from logging in without MFA.

When MFA is enabled, it forces users to enter their username, password, and an authentication code sent to them by text message or generated by an app on their smartphone. MFA authentication requires a phone that can receive text messages.

### Using MFA for a user account

Each user can enable and configure MFA for their user account.
The default MFA configuration sends an authentication code by text message to enter when you log in.

To configure MFA for your user account:

1. Log in to your account.
2. In the menu, click on your name.
3. In your user profile, click **Multi-Factor Authentication**.
4. Click **Activate Now**
5. Enter your mobile phone number and enter the confirmation code sent to you by text message.

Your account is now configured for MFA.
When you log in to the Redis Cloud admin console, you are sent an authentication code by text message.

To change the mobile phone number, select **Configure** for the text message code and enter the new mobile phone number.

{{< note >}}
We recommend that you also configure MFA for an Authenticator app as a second method of MFA.
If you can't login to your account because of MFA, contact [Support](https://support.redislabs.com).

If your mobile phone is lost or stolen, make sure you update the MFA configuration to prevent unauthorized logins.
{{< /note >}}

#### Configuring MFA for an authenticator app

After you configure MFA for text messages, you can also configure MFA to work with a Time-based One-Time Password (TOTP) app such as Google Authenticator.
Then when you log in to the admin console, you can select to use either an authentication code sent by text message or an authentication code shown in the Authenticator app for MFA.

To configure MFA for the Authenticator app:

1. Install the Google Authenticator app on your phone from the Apple Store or Google Play.
1. Add Redis Enterprise Cloud to the app:
    1. In your profile in your Redis Cloud account, click **Multi-Factor Authentication**.
    1. Select **Configure** for the authenticator app.
    1. On your phone, open the Authenticator app.
    1. Select the plus sign and press **Scan a barcode**.
    1. Scan the Redis Cloud barcode.

To log in to the Redis Enterprise Cloud admin console, you can do MFA either with a text message or the Authenticator app.
If you use with the Authenticator app, you must open the Authenticator app to locate the code that lets you sign in to the Redis Enterprise Cloud admin console.

#### Deactivating MFA

To deactivate MFA, go to your profile, select **Multi-Factor Authentication**, and select **Deactivate**.

### Enforcing MFA for all user accounts

Account owner users can enable MFA enforcement for all users in their account.
After MFA is enforced for the account, all users that do not have MFA enabled are required to configure MFA the next time they log in to the Redis Enterprise Cloud admin console.

- When you enable MFA enforcement, users can't disable MFA for their account.
- When you disable MFA enforcement, users can disable MFA for their account.

{{< tip >}}
We recommend that you send an email to all the admin console users to notify them of this change before you enable MFA enforcement.
{{< /tip >}}

To enable MFA enforcement for all user accounts, the account owner must enable **MFA enforcement** in **Settings** > **Account**.
