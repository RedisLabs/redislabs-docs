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

## Set up SAML SSO

To set up SAML single sign-on for a Redis Cloud account:

1. From your identity provider's admin console, [set up a Redis Cloud SAML integration app](#set-up-rc-app).

1. [Create a SAML user](#add-saml-users) and set the **redisAccountMapping** attribute to map the Redis Cloud account to the **owner** role.

1. [Configure SAML in Redis Cloud](#configure-idp).

1. [Download service provider metadata](#download-sp) and upload it to your identity provider.

1. [Activate SAML SSO](#activate-saml-sso).

### Set up Redis Cloud app {#set-up-rc-app}

First, set up a Redis Cloud SAML integration app for your identity provider:

1. Sign in to your identity provider's admin console.

1. Create or add a SAML integration app for the service provider Redis Cloud.

1. Create a custom SAML attribute called **redisAccountMapping** in the service provider app:

    | Field | Value |
    |-------|-------|
    | Name | redisAccountMapping |
    | Name format | Basic |
    | Value | user.redisAccountMapping |

1. Add the **redisAccountMapping** attribute to the default user profile.

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
    | **Email domain binding** | The identity provider's domain |
    | **Assertion signing certificate** | Public SHA-256 certificate used to validate SAML assertions from the identity provider |

    To find these metadata values, see your identity provider's documentation.

1. From the **SAML** screen of the Redis Cloud [admin console](https://app.redislabs.com), configure the **Identity Provider metadata** settings.

    {{<image filename="images/rc/access-management-saml-config.png"  alt="SAML Single Sign-on configuration screen.">}}{{</image>}}

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

After you finish the required SAML SSO configuration between your identity provider and Redis Cloud account, you can test and activate SAML SSO:

1. For **Activate SAML integration**, select the **Activate** button.

1. From the **Logout notification** dialog, select **Continue**. This redirects you to your configured identity provider's sign-in screen.

1. Sign in with your identity provider.

1. When redirected to the Redis Cloud sign-in screen, select **Sign in with SSO** and enter your credentials.

    {{<image filename="images/rc/button-sign-in-sso.png" alt="Sign in with SSO button">}}{{</image>}}

    {{<note>}}
If you see a **SAML activation failed** notification when redirected to the Redis Cloud sign-in screen, sign in with your previous credentials and review your SAML configuration for issues.
    {{</note>}}

## Add SAML users {#add-saml-users}

To add a user to an account and enable SAML SSO for them:

1. From your identity provider's admin console, [add a new user](https://help.okta.com/en/prod/Content/Topics/users-groups-profiles/usgp-add-users.htm) or edit an existing user's profile.

1. Enter the Redis Cloud account ID and a [user role]({{<relref "/rc/administration/access-management#team-management-roles">}}) in the **redisAccountMapping** field.

    You can add the same user to multiple SAML-enabled accounts with a comma-separated list: 

    12345=owner,54321=manager

1. [Assign the Redis Cloud SAML integration app](https://help.okta.com/en/prod/Content/Topics/users-groups-profiles/usgp-assign-apps.htm) to the user.

1. The user can now sign in to Redis Cloud with SAML SSO.

To learn how to manage SAML user profiles, see your identity provider's documentation.

## Bind other accounts

After you set up SAML SSO for one account, you can edit the SAML configuration to bind other accounts where you are an account owner. This lets you use the same domain for SSO across multiple accounts.

To bind other accounts to an existing SAML SSO configuration:

1. Go to **Access Management > Single Sign-on** in the Redis Cloud [admin console](https://app.redislabs.com).

1. Select the **Edit** button.

1. For **Bind other accounts to SAML config**, select the checkboxes for the other accounts you want to bind to SAML SSO.

    {{<image filename="images/rc/access-management-saml-bind-accounts.png"  alt="Bind other accounts to SAML configuration screen.">}}{{</image>}}

1. Select **Save**.

1. From the **Bind accounts** dialog, select **Continue** to enable SAML SSO for the selected accounts.

## Deactivate SAML SSO

A SAML-enabled account must have a local (non-SAML) user with the owner role assigned before you can deactivate SAML SSO for that account.

To deactivate SAML for specific accounts:

1. Go to **Access Management > Single Sign-on** in the Redis Cloud [admin console](https://app.redislabs.com).

1. Select the **Edit** button.

1. For **Bind other accounts to SAML configuration**, clear the checkboxes for the accounts you want to unbind from SAML SSO.

1. Select **Save**.

1. From the **Bind accounts** dialog, select **Continue** to deactivate SAML SSO for the unbound accounts.

To deactivate SAML for all bound accounts, select the **Deactivate SAML** button.