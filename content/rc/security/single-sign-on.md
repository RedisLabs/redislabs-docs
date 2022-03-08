---
Title: Single sign-on
linkTitle: Single sign-on
description: Single sign-on (SSO) integration with Redis Cloud
weight: 60
alwaysopen: false
categories: ["RC"]
---

As an alternative to the traditional email/password account authentication method, you can create a Redis Cloud account and sign into the [admin console](https://app.redislabs.com/new/) with [single sign-on (SSO)](https://en.wikipedia.org/wiki/Single_sign-on). This lets you use one set of credentials, managed by your [identity provider](https://en.wikipedia.org/wiki/Identity_provider), to access multiple websites.

## Social login

One SSO option that Redis Cloud offers is [social login](https://en.wikipedia.org/wiki/Social_login), which lets you use an existing social media account to create or sign into your Redis Cloud account.

Redis Cloud supports the following social logins:
- [GitHub](https://github.com/)
- [Google](https://accounts.google.com/)

{{<note>}}
If your Google and GitHub accounts share an email address (such as Gmail), you can use either one to sign into the same Redis Cloud account.
{{</note>}}

### Create a new account with social login

#### Google

1. Select **Google** from the [sign in](https://app.redislabs.com/new/) screen.
2. Choose your preferred account from the list.
3. Select **Confirm** on the **Sign in with Google** prompt.

#### GitHub

1. Select **Github** from the [sign in](https://app.redislabs.com/new/) screen.
2. Select **Authorize** on the **Authorize Redis Okta Auth Github** prompt.
3. Enter your GitHub password to **Confirm access**.

{{<note>}}
If the email address associated with your GitHub account is not public, you will see an error message that your sign in attempt failed. You need to make your email address public on GitHub before you try again. <br /><br />
To make your GitHub email address public:  
1. Select your user icon in the upper right corner and choose **Settings** from the dropdown menu.
2. Select **Emails** and clear the **Keep my email addresses private** checkbox.
3. Select **Profile** and choose your email address from the **Public email** dropdown list.
4. Select **Update profile** to apply your changes.
{{</note>}}

### Migrate an existing account to social login

If you already have a Redis Cloud account that requires an email address and password to sign in, you can migrate your existing account to use a social login associated with that same email address instead.

{{<warning>}}
Once you migrate your account to use social login, you cannot revert to your old email/password sign in method.
{{</warning>}}

To migrate your account to Google social login:
1. Select **Google** on the [sign in](https://app.redislabs.com/new/) screen.
2. Choose your preferred account from the list.
3. A confirmation prompt will display and warn that you cannot revert to your old sign in method if you proceed with the migration to social login.
4. Select **Confirm** to continue migration.

To migrate your account to GitHub social login:
1. Select **Github** on the [sign in](https://app.redislabs.com/new/) screen.
2. Select **Authorize** on the **Authorize Redis Okta Auth Github** prompt.
3. Enter your GitHub password to **Confirm access**.
4. A confirmation prompt will display and warn that you cannot revert to your old sign in method if you proceed with the migration to social login.
5. Select **Confirm** to continue migration.

## SAML single sign-on

Redis Cloud also lets you set up SSO with [SAML (Security Assertion Markup Language)](https://en.wikipedia.org/wiki/Security_Assertion_Markup_Language).

### Set up SAML SSO

1. Sign into your existing [Redis Cloud account](https://app.redislabs.com/#/login).

1. Select **Access Management** from the admin console menu.

1. Select **Single Sign-on**.

1. Select the **Setup SSO** button:

    {{<image filename="images/rc/button-access-management-sso-setup.png" alt="Setup SSO button">}}{{</image>}}

1. [Configure identity provider metadata](#configure-idp).

1. [Download service provider metadata](#download-sp).

1. [Activate SAML SSO](#activate-saml-sso).

#### Configure IdP metadata {#configure-idp}

1. Configure the following **Identity Provider metadata** settings:

    | Setting | Description |
    |---------|-------------|
    | **Issuer (IdP entity ID)** | The entity ID for the identity provider |
    | **IdP server URL** | The identity provider's HTTPS URL for SAML SSO |
    | **Single logout URL** | The URL used to sign out of the identity provider and connected applications (optional) |
    | **Domain** | The identity provider's domain |
    | **Assertion signing certificate** | Public SHA-256 certificate used to validate SAML assertions from the identity provider |

    {{<image filename="images/rc/access-management-saml-config.png"  alt="SAML Single Sign-on configuration screen.">}}{{</image>}}

1. Select the **Enable** button.

1. From the **SAML activation** dialog box, select **Continue**.

#### Download service provider metadata {#download-sp}

1. Select the **Download** button to download the service provider metadata in XML format.

1. Configure your identity provider with the downloaded XML.

    Some identity providers let you upload the XML file directly. Others require you to enter the `entityID` and `Location` manually.

    For example, if Okta is your identity provider:

    1. Go to **Applications** and select the **SM Redis** application.

    1. From **Sign On > Settings**, select **Edit**.
    
    1. Go to **Advanced Sign-on Settings**.

    1. Enter the `entityID` from the XML file in the **Audience URI**.

    1. Enter the `Location` from the XML file in the **Hub ACS URL**.

    1. Select **Save**.

#### Activate SAML SSO {#activate-saml-sso}

To test and activate SAML SSO for your account:

1. For **Activate SAML integration**, select the **Activate** button.

1. From the **Logout notification** dialog, select **Continue**. This redirects you to your configured identity provider's sign in screen.

1. Sign in with your identity provider.

1. When redirected to the Redis Cloud sign in screen, select **Sign in with SSO** and enter your credentials.

    {{<image filename="images/rc/button-sign-in-sso.png" alt="Sign in with SSO button">}}{{</image>}}

    {{<note>}}
If you see a **SAML activation failed** notification when redirected to the Redis Cloud sign in screen, sign in with your previous credentials and review your SAML configuration for issues.
    {{</note>}}

### Add a SAML user

To add a user to an account and enable SAML SSO for them:

1. From your identity provider's admin console, [add a new user](https://help.okta.com/en/prod/Content/Topics/users-groups-profiles/usgp-add-users.htm) or edit an existing user.

1. Select **Profile**.

1. Enter the Redis Cloud account ID and a [user role]({{<relref "/rc/administration/access-management#team-management-roles">}}) in the **smAccountMapping** field.

    You can add the same user to multiple SAML-enabled accounts with a comma-separated list: 

    12345=owner,54321=manager

1. [Assign the **SM Redis** application](https://help.okta.com/en/prod/Content/Topics/users-groups-profiles/usgp-assign-apps.htm) to the user.

### Bind other accounts

After you set up SAML SSO for one account, you can edit the SAML configuration to bind other accounts. This lets you use the same domain for SSO across multiple accounts.

To bind other accounts to an existing SAML SSO configuration:

1. Go to **Access Management > Single Sign-on** in the Redis Cloud admin console.

1. For **Bind other accounts to SAML configuration**, select the checkboxes for the other accounts you want to bind to SAML SSO.

    {{<image filename="images/rc/access-management-saml-bind-accounts.png"  alt="Bind other accounts to SAML configuration screen.">}}{{</image>}}

1. Select **Save**.

1. From the **Bind accounts** dialog, select **Continue** to enable SAML SSO for the selected accounts.