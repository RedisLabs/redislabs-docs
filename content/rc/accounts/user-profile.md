---
Title: Manage user accounts and profile
LinkTitle: User accounts and profile
description: Describes the how to manage user profile settings and how to switch between Redis Cloud accounts.
weight: $weight
alwaysopen: false
categories: ["RC"]
aliases: [ 
   "/rc/accounts/user-profile-settings.md",
]
---

When you sign in to the Redis Cloud [admin console](https://app.redislabs.com/), you use a profile associated with one or more Redis Cloud subscription.  

This account has profile settings that you can manage using the profile control located near the top, right corner of the admin console:

{{<image filename="images/rc/account-selector-single-account.png" alt="Use the Profile control to manage your user account profile and to switch between Redis Cloud accounts." width="300px">}}{{< /image >}}

When you open the Profile control, you can:

- Review and manage your user account profile

- Sign out from the admin console

- Switch between Redis Cloud subscriptions administered by your user account.

## Manage user profile

To review your user profile settings, select **User profile** from the Profile control.  This displays the **User Profile** screen:

{{<image filename="images/rc/user-profile-settings.png" alt="The User Profile screen lets you manage selected settings associated with your user account." width="75%">}}{{< /image >}}

This screen contains up to three sections, including:

- The *User details* section includes basic information about your account, including _Name_, _Job title_, _Email_, and the date the account was created.  _Name_ and _Job title_ can be edited; the other settings are read-only.

- The *Password* lets you change the password for for accounts created and managed by Redis Cloud. 

    If you're using single sign-on, you cannot change the password using the *User Profile* screen.  Such accounts are managed by an identity provider (IdP).  For help changing (or revoering) the passwords on these accounts, consult your identity provider docs.

- The **Multi-factor authentication (MFA)** section lets you manage MFA settings for the current user account.  

    When you activate a mobile device, you can use SMS MFA to as a second authentication factor.

    To use an authentication app as the factor, you need to activate a mobile device and then use that device to enable the app.

## Sign out 

To sign out from the admin console, select **Logout** from the profile control.

## Switch Redis cloud accounts

When your user account is authorized to manage multiple Redis Cloud accounts, each account is displayed in the Profile control.

{{<image filename="images/rc/account-selector-switch-account.png" alt="To switch between Redis Cloud accounts, select the desired account from the list shown on the Profile control." width="300px">}}{{< /image >}}

To switch accounts, select the desired account from the list shown in the Profile control.

## Save or discard changes

Use the **Discard changes** button to cancel user profile setting changes or the **Save changes** button to save changes.

{{<image filename="images/rc/user-profile-setting-buttons.png" alt="Use Save Changes button to save user profle setting changes or the Discard changes button to revert them." width="300px">}}{{< /image >}}

[Manage AWS cloud accounts]({{<relref "rc/cloud-integrations/aws-cloud-accounts/">}})  
    
| Setting | Description |
|---------|-------------|
| _Owner name_ | Person associated with the Redis Cloud account |
| _Account name_ | Organization associated with the Redis Cloud account | 
| _Date created_ | Date the user's Redis Cloud account was created, which may differ from the organization account creation date |
| <nobr>_Owner email address_</nobr> | Email address used to create the owner's account |
| _Account number_ | Internal ID of the owner's account |
| _Last updated_ | Date of the last administrative change to the owner's account, typically reflect access changes or other administrative updates | 

