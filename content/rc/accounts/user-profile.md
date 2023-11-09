---
Title: Manage user account and profile
LinkTitle: User account and profile
description: Describes the how to manage your user account profile and how to switch between Redis Cloud accounts.
weight: $weight
alwaysopen: false
categories: ["RC"]
aliases: [ 
   "/rc/accounts/user-profile-settings.md",
   "/rc/administration/multiple-accounts/",
   "/rc/administration/multiple-accounts.md",
]
---
When you sign in to the [Redis Cloud console](https://app.redislabs.com/), you use a profile associated with one or more Redis Cloud accounts.  

This account has a profile with settings that you can manage using the Profile control located near the top, right corner of the admin console:

{{<image filename="images/rc/account-selector-single-account.png" alt="Use the Profile control to manage your user account profile and to switch between Redis Cloud accounts." width="300px">}}{{< /image >}}

When you open the Profile control, you can:

- Review and manage your user account profile.

- Sign out from the admin console.

- Switch between Redis Cloud subscriptions administered by your user account.

## Manage user profile

To review your user profile settings, select **User profile** from the Profile control.  This displays the **User Profile** screen:

{{<image filename="images/rc/user-profile-settings.png" alt="The User Profile screen lets you manage selected settings associated with your user account." width="75%">}}{{< /image >}}

This screen contains up to three sections, including:

- The *User details* section includes basic information about your account, including _First name_, _Last name_, _Job title_, _Email_, and the date the account was created.  The names and job title can be edited; other settings are read-only.

- The *Password* section lets you change the password for accounts created and managed by Redis Cloud. 

    If you're using single sign-on authentication, you cannot change the password using the *User Profile* screen.  Such accounts are managed by an identity provider (IdP).  For help changing (or recovering) the passwords for these accounts, consult your identity provider docs.

- The **Multi-factor authentication (MFA)** section lets you manage MFA settings for the current user account.  

    When you activate a mobile device, you can use SMS MFA as a second authentication factor.

    To use an authentication app as the factor, you need to activate a mobile device and then use that device to enable the app.

## Sign out 

To sign out from the admin console, select **Logout** from the profile control.

## Switch Redis cloud accounts

When your user account is authorized to manage multiple Redis Cloud accounts, each account is displayed in the Profile control.

{{<image filename="images/rc/account-selector-switch-account.png" alt="To switch between Redis Cloud accounts, select the desired account from the list shown on the Profile control." width="300px">}}{{< /image >}}

To switch accounts, select the desired account from the list shown in the Profile control.

## Save or discard changes

Use the **Discard changes** button to cancel user profile setting changes or the **Save changes** button to save changes.