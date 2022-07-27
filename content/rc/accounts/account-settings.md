---
Title: Manage account settings
LinkTitle: Account settings
description: Describes the settings for a Redis Cloud account.
weight: $weight
alwaysopen: false
categories: ["RC"]
aliases: [ 
   "/rc/accounts/account-settings.md",
   "/rc/how-to/aws-zone-mapping/",
   "/rc/how-to/aws-zone-mapping.md",
   "/rc/administration/aws-zone-mapping/",
   "/rc/administration/aws-zone-mapping.md",
]
---

To review or manage the settings associated with your Redis Cloud account, sign in to the [admin console](https://app.redislabs.com/) and then select **Account Settings** from the menu.

This displays the **Account Settings** screen:

{{<image filename="images/rc/account-settings-account-tab.png" alt="Use the Account tab of the Account Settings screen to review and update settings associated with your Redis Cloud account." width="75%">}}{{< /image >}}

The available tabs depend on your subscription type and may include:

- The **Account** tab displays basic information associated with your account, including general info, address details, time zone setting, security settings, and provider integration details.

- The **Cloud Account** tab is displayed for Flexible (or Annual) subscriptions hosted on Amazon Web Services (AWS).  To learn more, see [Manage AWS cloud accounts]({{<relref "rc/cloud-integrations/aws-cloud-accounts/">}}).  
    
## Account info settings

The **Account Info** section provides basic details about your account, including:

| Setting | Description |
|---------|-------------|
| _Owner name_ | Person associated with the Redis Cloud account |
| _Account name_ | Organization associated with the Redis Cloud account | 
| _Date created_ | Date the user's Redis Cloud account was created, which may differ from the organization account creation date |
| <nobr>_Owner email address_</nobr> | Email address used to create the owner's account |
| _Account number_ | Internal ID of the owner's account |
| _Last updated_ | Date of the last administrative change to the owner's account, typically reflects access changes or other administrative updates | 

You cannot change the email address associated with a Redis Cloud account.  Instead, create a new account with the updated email address, assign it as an administrator to the organization account, and then use the new account to delete the account with the invalid email address.

## Account address settings

The **Account address** section shows the address associated with the current Redis Cloud account and the current time zone. 

To update the time zone, select the desired time zone from the **Time zone** drop-down.

In addition, this section may include fields unique to your location.  For example, certain regions require tax IDs or other regulatory details.

When updating details in this section, pay particular attention to prompts and error messages.

## Security settings

The **Security** section lets you:

- Manage [multi-factor authentication]({{<relref "/rc/security/multi-factor-authentication">}}) (MFA) for your Redis Cloud account 

- Download [certificate authority]({{<relref "/rc/security/database-security/tls-ssl#certificates">}}) (CA) certificates for the certificates associated with your Redis Cloud account

## Integration settings

The **Integration** section includes settings that help you manage the integration of your Redis Cloud account with your underlying cloud provider.  Specific settings vary according to the cloud provider.

If this section doesn't appear on the **Account Settings** screen, it generally means that there aren't any integration settings to manage.

## Save or discard changes

Few account settings can be changed; however, you can update a few details, such as **Time Zone** and **MFA enforcement**.  Available settings vary according to your subscription and the underlying cloud provider.  

Use the **Save changes** button to save changes or **Discard changes** to revert them.

{{<image filename="images/rc/account-settings-buttons-save-discard.png" alt="Use the Discard Changes and the Save Changes buttons to manage changes to account settings." width="300px">}}{{< /image >}}

For help changing other settings, [contact Support](https://redis.com/company/support/).

