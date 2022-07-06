---
Title: SAML single sign-on
linkTitle: SAML SSO
description: SAML single sign-on (SSO) with Redis Cloud.
weight: 50
alwaysopen: false
categories: ["RC"]
---

Redis Cloud supports [single sign-on (SSO)](https://en.wikipedia.org/wiki/Single_sign-on) with [SAML (Security Assertion Markup Language)](https://en.wikipedia.org/wiki/Security_Assertion_Markup_Language).

When SAML SSO is enabled, the [identity provider (IdP)](https://en.wikipedia.org/wiki/Identity_provider) admin handles SAML user management instead of the Redis Cloud account owner.

After you activate SAML SSO for a Redis Cloud account, all existing local users for the account are converted to SAML users and are required to use SAML SSO to sign in. Before they can sign in to Redis Cloud, the identity provider admin needs to set up these users on the IdP side and configure the `redisAccountMapping` attribute to map them to the appropriate Redis Cloud account and role.

The account owner remains a local user and should set up [multi-factor authentication (MFA)]({{<relref "/rc/security/multi-factor-authentication">}}) to help secure their account. After SAML activation, the account owner can set up additional local bypass users with MFA enabled.

If MFA enforcement is enabled, note that Redis Cloud does not enforce MFA for SAML users since the identity provider is expected to handle MFA management and enforcement.

## Set up SAML SSO

To set up SAML single sign-on for a Redis Cloud account:

1. [Set up a SAML app](#set-up-app) to integrate Redis Cloud with your identity provider.

1. For existing users with access to the Redis Cloud account, [set up SAML users](#add-saml-users) for them in your identity provider's admin console.

1. [Configure SAML in Redis Cloud](#configure-idp).

1. [Download service provider metadata](#download-sp) and upload it to your identity provider.

1. [Activate SAML SSO](#activate-saml-sso).

### Set up SAML app {#set-up-app}

First, set up a SAML app to integrate Redis Cloud with your identity provider:

1. Sign in to your identity provider's admin console.

1. Create or add a SAML integration app for the service provider Redis Cloud.

1. Create a custom SAML attribute called **redisAccountMapping** in the service provider app. This attribute lets you map a user to multiple Redis Cloud accounts and roles as a comma-separated list.

1. Set up any additional configuration required by your identity provider to ensure you can configure the **redisAccountMapping** attribute for SAML users.

### Create SAML users {#add-saml-users}

To create a SAML user and add them to a Redis Cloud account:

1. From your identity provider's admin console, [add a new user](https://help.okta.com/en/prod/Content/Topics/users-groups-profiles/usgp-add-users.htm) or edit an existing user's profile.

    The username configured in the identity provider must match the email address that the SAML user will use to sign in to Redis Cloud.

1. Enter the Redis Cloud account ID and a [user role]({{<relref "/rc/administration/access-management#team-management-roles">}}) in the **redisAccountMapping** field.

    You can add the same user to multiple SAML-enabled accounts with a comma-separated list: 

    12345=owner,54321=manager

1. [Assign the Redis Cloud SAML integration app](https://help.okta.com/en/prod/Content/Topics/users-groups-profiles/usgp-assign-apps.htm) to the user.

If your identity provider lets you configure custom attributes with workflows or group rules, you can set up automation to configure the **redisAccountMapping** field automatically instead of manually.

To learn how to manage users in more detail, see your identity provider's documentation.

### Configure SAML in Redis Cloud {#configure-idp}

After you set up the SAML integration app and create a SAML user in your identity provider, you need to configure the Redis Cloud account with some identity provider metadata:

1. Sign in to [Redis Cloud](https://app.redislabs.com/#/login) with the email address associated with the SAML user you set up with your identity provider.

1. Select **Access Management** from the [admin console](https://app.redislabs.com) menu.

1. Select **Single Sign-On**.

1. Select the **Setup SSO** button:

    {{<image filename="images/rc/button-access-management-sso-setup.png" alt="Setup SSO button">}}{{</image>}}

1. You need the following metadata values from your identity provider:

    | Setting | Description |
    |---------|-------------|
    | **Issuer (IdP entity ID)** | The unique entity ID for the identity provider |
    | **IdP server URL** | The identity provider's HTTPS URL for SAML SSO |
    | **Single logout URL** | The URL used to sign out of the identity provider and connected apps (optional) |
    | **Assertion signing certificate** | Public SHA-256 certificate used to validate SAML assertions from the identity provider |

    To find these metadata values, see your identity provider's documentation.

1. From the **SAML** screen of the Redis Cloud [admin console](https://app.redislabs.com), configure the **Identity Provider metadata** settings. 

    **Email domain binding** should match the email domain that SAML users will use to sign in to Redis Cloud.

    {{<image filename="images/rc/access-management-saml-config.png"  alt="SAML Single Sign-On configuration screen.">}}{{</image>}}

1. Select the **Enable** button.

1. From the **SAML activation** dialog box, select **Continue**.

### Download service provider metadata {#download-sp}

Next, you need to download the service provider metadata for Redis Cloud and use it to finish configuring the SAML integration app for your identity provider:

1. Select the **Download** button to download the service provider [metadata](https://docs.oasis-open.org/security/saml/v2.0/saml-metadata-2.0-os.pdf) in XML format.

1. Sign in to your identity provider's admin console.

1. Configure the Redis Cloud service provider app with the downloaded XML.

    - Some identity providers let you upload the XML file directly. 
    
    - Others require you to manually configure the service provider app with specific metadata fields, such as `entityID` and `AssertionConsumerService Location`.
    
        For example, your identity provider may require you to map the following metadata attributes and settings:

        | XML attribute | App setting |
        |---------------|-------------|
        | EntityDescriptor's **entityID** | Audience URI |
        | AssertionConsumerService's **Location** | Hub ACS URL |

    To learn more about how to configure service provider apps, see your identity provider's documentation.

### Activate SAML SSO {#activate-saml-sso}

After you finish the required SAML SSO configuration between your identity provider and Redis Cloud account, you can test and activate SAML SSO.

 All users associated with the account, excluding the local user you used to set up SAML SSO, are converted to SAML users on successful activation. They can no longer sign in with their previous sign-in method and must use SAML SSO instead.

To activate SAML SSO:

1. For **Activate SAML integration**, select the **Activate** button.

1. From the **Logout notification** dialog, select **Continue**. This redirects you to your configured identity provider's sign-in screen.

1. Sign in with your identity provider.

1. When redirected to the Redis Cloud sign-in screen, you can either:

    - Sign in with your local credentials as usual.

    - Select **Sign in with SSO** and enter the email address associated with the SAML user configured in your identity provider:

        {{<image filename="images/rc/button-sign-in-sso.png" alt="Sign in with SSO button">}}{{</image>}}

        This will convert your user to a SAML user in Redis Cloud, so do not use this method if you want your user account to remain a local bypass user.

    {{<note>}}
If you see a **SAML activation failed** notification when redirected to the Redis Cloud sign-in screen, sign in with your local user credentials and review the SAML configuration for issues.
    {{</note>}}

After you activate SAML SSO, [add a few local bypass users]({{<relref "/rc/administration/access-management#manage-team-access">}}) from the **Team** tab. Local bypass users should [set up MFA]({{<relref "/rc/security/multi-factor-authentication">}}) for additional security.

## Bind other accounts

After you set up SAML SSO for one account, you can bind other accounts you own to the existing SAML configuration. This lets you use the same SAML configuration for SSO across multiple accounts.

To bind other accounts to an existing SAML SSO configuration:

1. Go to **Access Management > Single Sign-On** in the Redis Cloud [admin console](https://app.redislabs.com).

1. Select the **Edit** button.

1. For **Bind other accounts to SAML config**, select the checkboxes for the other accounts you want to bind to SAML SSO.

    {{<image filename="images/rc/access-management-saml-bind-accounts.png"  alt="Bind other accounts to SAML configuration screen.">}}{{</image>}}

1. Select **Save**.

1. From the **Bind accounts** dialog, select **Continue** to enable SAML SSO for the selected accounts.

## Deactivate SAML SSO

Before you can deactivate SAML SSO for an account, it must have a local (non-SAML) user with the owner role assigned. You can only deactivate SAML SSO for the account you are currently signed in to.

To deactivate SAML SSO for a specific account:

1. In the Redis Cloud [admin console](https://app.redislabs.com), select your name to display your available accounts.

1. If the relevant account is not already selected, select it from the **Switch account** list.

1. Go to **Access Management > Single Sign-On**.

1. Select the **Edit** button.

1. For **Bind other accounts to SAML configuration**, clear the checkbox for the relevant account to unbind it from SAML SSO.

1. Select **Save**.

1. From the **Bind accounts** dialog, select **Continue** to deactivate SAML SSO for the unbound account.

## Deprovision SAML users

To deprovision SAML users upon deletion, the identity provider admin can set up a webhook to automatically make the appropriate API requests.
