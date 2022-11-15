---
Title: SAML single sign-on
linkTitle: SAML SSO
description: SAML single sign-on (SSO) with Redis Cloud.
weight: 50
alwaysopen: false
categories: ["RC"]
---

Redis Cloud supports both [IdP-initiated](#idp-initiated-sso) and [SP-initiated](#sp-initiated-sso) [single sign-on (SSO)](https://en.wikipedia.org/wiki/Single_sign-on) with [SAML (Security Assertion Markup Language)](https://en.wikipedia.org/wiki/Security_Assertion_Markup_Language).

## SAML SSO overview

When SAML SSO is enabled, the [identity provider (IdP)](https://en.wikipedia.org/wiki/Identity_provider) admin handles SAML user management instead of the Redis Cloud account owner.

After you activate SAML SSO for a Redis Cloud account, all existing local users for the account are converted to SAML users and are required to use SAML SSO to sign in. Before they can sign in to Redis Cloud, the identity provider admin needs to set up these users on the IdP side and configure the `redisAccountMapping` attribute to map them to the appropriate Redis Cloud accounts and roles.

### IdP-initiated SSO

With IdP-initiated single sign-on, you can select the Redis Cloud application after you sign in to your [identity provider (IdP)](https://en.wikipedia.org/wiki/Identity_provider). This redirects you to the Redis Cloud [admin console](https://app.redislabs.com/#/login) and signs you in to your SAML user account.

### SP-initiated SSO

You can also initiate single sign-on from the Redis Cloud [admin console](https://app.redislabs.com/#/login). This process is known as [service provider (SP)](https://en.wikipedia.org/wiki/Service_provider)-initiated single sign-on.

1. From the Redis Cloud admin console's [sign in screen](https://app.redislabs.com/#/login), select the **SSO** button:

    {{<image filename="images/rc/button-sign-in-sso.png" width="150px" alt="Sign in with SSO button">}}{{</image>}}

1. Enter the email address associated with your SAML user account.

1. Select the **Login** button.

    - If you already have an active SSO session with your identity provider, this signs you in to your SAML user account.

    - Otherwise, the SSO flow redirects you to your identity provider's sign in screen.

        1. Enter your IdP user credentials to sign in.

        1. This redirects you back to the Redis Cloud admin console and automatically signs in to your SAML user account.

### Multi-factor authentication

The account owner remains a local user and should set up [multi-factor authentication (MFA)]({{<relref "/rc/security/multi-factor-authentication">}}) to help secure their account. After SAML activation, the account owner can set up additional local bypass users with MFA enabled.

If MFA enforcement is enabled, note that Redis Cloud does not enforce MFA for SAML users since the identity provider handles MFA management and enforcement.

## Set up SAML SSO

To set up SAML single sign-on for a Redis Cloud account:

1. [Set up a SAML app](#set-up-app) to integrate Redis Cloud with your identity provider.

1. [Configure SAML in Redis Cloud](#configure-idp).

1. [Download service provider metadata](#download-sp) and upload it to your identity provider.

1. [Activate SAML SSO](#activate-saml-sso).

### Set up SAML app {#set-up-app}

First, set up a SAML app to integrate Redis Cloud with your identity provider:

1. Sign in to your identity provider's admin console.

1. Create or add a SAML integration app for the service provider Redis Cloud.

1. Set up your SAML service provider app so the SAML assertion contains the following attributes:

    | Attribute&nbsp;name<br />(case-sensitive) | Description |
    |-------------------------------------------|-------------|
    | FirstName | User's first name |
    | LastName | User's last name |
    | Email | User's email address (used as the username in the Redis Cloud console) |
    | redisAccountMapping | Maps the user to multiple Redis Cloud accounts and roles |

    For `redisAccountMapping`, you can add the same user to multiple SAML-enabled accounts with either:

    - A single string that contains a comma-separated list of account/role pairs

        ```xml
        <saml2:Attribute Name="redisAccountMapping" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified">
            <saml2:AttributeValue xsi:type="xs:string" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                12345=owner,54321=manager
            </saml2:AttributeValue>
        </saml2:Attribute>
        ```

    - Multiple strings, where each represents a single account/role pair

        ```xml
        <saml2:Attribute Name="redisAccountMapping" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified">
            <saml2:AttributeValue xsi:type="xs:string" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                12345=owner
            </saml2:AttributeValue>
            <saml2:AttributeValue xsi:type="xs:string" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                54321=manager
            </saml2:AttributeValue>
        </saml2:Attribute>
        ```

    {{<note>}}
To confirm the identity provider's SAML assertions contain the required attributes, you can use a SAML-tracer web developer tool to inspect them.
    {{</note>}}

1. Set up any additional configuration required by your identity provider to ensure you can configure the `redisAccountMapping` attribute for SAML users.

    If your identity provider lets you configure custom attributes with workflows or group rules, you can set up automation to configure the `redisAccountMapping` field automatically instead of manually.

### Configure SAML in Redis Cloud {#configure-idp}

After you set up the SAML integration app and create a SAML user in your identity provider, you need to configure the Redis Cloud account with some identity provider metadata:

1. Sign in to [Redis Cloud](https://app.redislabs.com/#/login) with the email address associated with the SAML user you set up with your identity provider.

1. Select **Access Management** from the [admin console](https://app.redislabs.com) menu.

1. Select **Single Sign-On**.

1. Select the **Setup SSO** button:

    {{<image filename="images/rc/button-access-management-sso-setup.png" width="120px" alt="Setup SSO button">}}{{</image>}}

1. You need the following metadata values from your identity provider:

    | Setting | Description |
    |---------|-------------|
    | **Issuer (IdP entity ID)** | The unique entity ID for the identity provider |
    | **IdP server URL** | The identity provider's HTTPS URL for SAML SSO |
    | **Single logout URL** | The URL used to sign out of the identity provider and connected apps (optional) |
    | **Assertion signing certificate** | Public SHA-256 certificate used to validate SAML assertions from the identity provider |

    To find these metadata values, see your identity provider's documentation.

1. From the **SAML** screen of the Redis Cloud [admin console](https://app.redislabs.com), configure the **Identity Provider metadata** settings. 

    **Email domain binding** should match the email domain that SAML users will use to sign in from the Redis Cloud admin console (SP-initiated SSO).

    {{<image filename="images/rc/access-management-saml-config.png"  alt="SAML Single Sign-On configuration screen.">}}{{</image>}}

1. Select the **Enable** button.

1. From the **SAML activation** dialog box, select **Continue**.

### Download service provider metadata {#download-sp}

Next, you need to download the service provider metadata for Redis Cloud and use it to finish configuring the SAML integration app for your identity provider:

1. Select the **Download** button to download the service provider [metadata](https://docs.oasis-open.org/security/saml/v2.0/saml-metadata-2.0-os.pdf) in XML format.

1. Sign in to your identity provider's admin console.

1. Configure the Redis Cloud service provider app with the downloaded XML.

    - Some identity providers let you upload the XML file directly. 
    
    - Others require you to manually configure the service provider app with specific metadata fields, such as:
    
        | XML attribute | Value | Description |
        |---------------|-------|-------------|
        | EntityDescriptor's **entityID** | https://www.\<idp\>.com<br />/saml2/<nobr>service-provider</nobr>/\<ID\> | Unique URL that identifies the Redis Cloud service provider |
        | AssertionConsumerService's **Location** | <nobr> https://redisauth.\<sp\>.com<br />/sso/saml2/\<ID\> | The service provider endpoint where the identity provider sends a SAML assertion that authenticates a user  |

    - To use [IdP-initiated SSO](#idp-initiated-sso) with certain identity providers, you also need to set the RelayState parameter to the following URL:
    
        ```sh
        https://app.redislabs.com/#/login/?idpId=<ID>
        ```

        {{<note>}}
Replace `<ID>` so it matches the `AssertionConsumerService Location` URL's ID.
        {{</note>}}

    To learn more about how to configure service provider apps, see your identity provider's documentation.

### Activate SAML SSO {#activate-saml-sso}

After you finish the required SAML SSO configuration between your identity provider and Redis Cloud account, you can test and activate SAML SSO.

 All users associated with the account, excluding the local user you used to set up SAML SSO, are converted to SAML users on successful activation. They can no longer sign in with their previous sign-in method and must use SAML SSO instead.

To activate SAML SSO:

1. Sign out of any active SSO sessions with your identity provider.

1. For **Activate SAML integration**, select the **Activate** button.

1. From the **Logout notification** dialog, select **Continue**. This redirects you to your configured identity provider's sign-in screen.

1. Sign in with your identity provider.

1. When redirected to the Redis Cloud sign-in screen, you can either:

    - Sign in with your local credentials as usual.

    - Select the **SSO** button and enter the email address associated with the SAML user configured in your identity provider:

        {{<image filename="images/rc/button-sign-in-sso.png" width="150px" alt="Sign in with SSO button">}}{{</image>}}

        This will convert your user to a SAML user in Redis Cloud, so do not use this method if you want your user account to remain a local bypass user.

    {{<note>}}
If you see a **SAML activation failed** notification when redirected to the Redis Cloud sign-in screen, sign in with your local user credentials and review the SAML configuration for issues.
    {{</note>}}

After you activate SAML SSO, [add a few local bypass users]({{<relref "/rc/security/access-management#manage-team-access">}}) from the **Team** tab. Local bypass users should [set up MFA]({{<relref "/rc/security/multi-factor-authentication">}}) for additional security.

## Update configuration {#update-config}

If you change certain metadata or configuration settings after you set up SAML SSO, such as the assertion signing certificate, remember to do the following:

1. [Update the SAML SSO configuration](#configure-idp) with the new values.

1. [Download the updated service provider metadata](#download-sp) and use it to update the Redis Cloud service provider app.

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

Before you can deactivate SAML SSO for an account, you must sign in to the account as a local (non-SAML) user with the owner role assigned.

To deactivate SAML SSO for a specific account:

1. In the Redis Cloud [admin console](https://app.redislabs.com), select your name to display your available accounts.

1. If the relevant account is not already selected, select it from the **Switch account** list.

1. Go to **Access Management > Single Sign-On**.

1. Select the **Edit** button.

1. For **Bind other accounts to SAML configuration**, clear the checkbox for the relevant account to unbind it from SAML SSO.

1. Select **Save**.

1. From the **Bind accounts** dialog, select **Continue** to deactivate SAML SSO for the unbound account.

## Deprovision SAML users

To deprovision SAML users upon deletion, the identity provider admin can set up a webhook to automatically make the appropriate Cloud API requests.

See the [Cloud API Swagger UI](https://api.redislabs.com/v1/swagger-ui.html#/Users) for more information about how to manage users with API requests.
