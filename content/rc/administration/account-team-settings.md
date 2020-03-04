---
Title: Account and Team Settings
description:
weight: 40
alwaysopen: false
categories: ["RC"]
aliases: /rv/administration/account-team-settings/
---
On this page you can view settings for your Redis Cloud account and team.
You can add or edit your VAT ID, the account Time Zone, and a new
Relic license key.

When you set up [SSL/TLS]({{< relref "/rc/securing-redis-cloud-connections.md" >}}) for your account,
you must supply the downloadable Redis Labs CA Certificate from this page.

![settings](/images/rc/settings.png)

## Team Management

To manage the team of people who have access to the account, click on
the "Team" tab and you will be presented with the current list of team
members on this account.

- To add more team members, click ![Add](/images/rs/icon_add.png#no-click "Add").
- To edit an existing team member, click ![Edit](/images/rc/icon_edit.png#no-click "Edit").

Team members can have different roles to the account:

- **Owner** - Can view, create, and edit any settings in the account
- **Member** - Can view, create, and edit databases.
- **Viewer** - Can view databases

## Multi Factor Authentication (MFA)

### Using MFA

Individual users are able to enable MFA for their accounts from their user profile as explained in this [blog post](https://redislabs.com/blog/redis-labs-adds-two-factor-authentication-enhance-account-security/). The `Team` tab under `Settings`, available to account owner users only, shows which users have MFA enabled.

### Enforcing MFA

Account owner users are able to require and enforce MFA for all account users in the `Account Settings` screen by switching the `MFA Enforcement` toggle to "on". Note that once MFA is enforced for all users, any user that logs in to Redis Cloud admin console will be forced to configure MFA before they can continue to any other screen. Consequently, Redis Labs advises to send out an email to your relevant users to notify them of this change beforehand.
