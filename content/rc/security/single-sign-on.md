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

1. Select **Google** from the [sign in](https://app.redislabs.com/new/) screen
2. Choose your preferred account from the list
3. Select **Confirm** on the **Sign in with Google** prompt

#### GitHub

1. Select **Github** from the [sign in](https://app.redislabs.com/new/) screen
2. Select **Authorize** on the **Authorize Redis Okta Auth Github** prompt
3. Enter your GitHub password to **Confirm access**

{{<note>}}
If the email address associated with your GitHub account is not public, you will see an error message that your sign in attempt failed. You need to make your email address public on GitHub before you try again. <br /><br />
To make your GitHub email address public:  
1. Select your user icon in the upper right corner and choose **Settings** from the dropdown menu
2. Select **Emails** and clear the **Keep my email addresses private** checkbox
3. Select **Profile** and choose your email address from the **Public email** dropdown list
4. Select **Update profile** to apply your changes
{{</note>}}

### Migrate an existing account to social login

If you already have a Redis Cloud account that requires an email address and password to sign in, you can migrate your existing account to use a social login associated with that same email address instead.

{{<warning>}}
Once you migrate your account to use social login, you cannot revert to your old email/password sign in method.
{{</warning>}}

To migrate your account to Google social login:
1. Select **Google** on the [sign in](https://app.redislabs.com/new/) screen
2. Choose your preferred account from the list
3. A confirmation prompt will display and warn that you cannot revert to your old sign in method if you proceed with the migration to social login
4. Select **Confirm** to continue migration

To migrate your account to GitHub social login:
1. Select **Github** on the [sign in](https://app.redislabs.com/new/) screen
2. Select **Authorize** on the **Authorize Redis Okta Auth Github** prompt
3. Enter your GitHub password to **Confirm access**
4. A confirmation prompt will display and warn that you cannot revert to your old sign in method if you proceed with the migration to social login
5. Select **Confirm** to continue migration

## SAML single sign-on

Redis Cloud also lets you set up SSO with [SAML (Security Assertion Markup Language)](https://en.wikipedia.org/wiki/Security_Assertion_Markup_Language).

### Set up SAML SSO

1. Sign into your existing [Redis Cloud account](https://app.redislabs.com/#/login).

1. Select **Access Management** from the admin console menu.

1. Select **Single Sign-on**.

1. Select the **Setup SSO** button.

1. [Configure identity provider metadata](#configure-idp).

1. [Download service provider metadata](#download-sp).

1. [Activate SAML SSO](#activate-saml-sso).

#### Configure IdP metadata {#configure-idp}

1. Configure the following **Identity Provider metadata** settings:

    | Setting | Description |
    |---------|-------------|
    | **Issuer (IdP entity ID)** | |
    | **IdP server URL** | |
    | **Single logout URL** | The URL used to sign out of the identity provider and connected applications |
    | **Domain** | |
    | **Assertion signing certificate** | |

1. Select the **Enable** button.

1. From the **SAML activation** dialog box, select **Continue**.

#### Download service provider metadata {#download-sp}

1. Select the **Download** button to download the service provider metadata in XML format.

1. Configure your identity provider with the downloaded XML. 

#### Activate SAML SSO {#activate-saml-sso}

To test and activate SAML SSO for your account:

1. For **Activate SAML integration**, select the **Activate** button.

1. From the **Logout notification** dialog, select **Continue**. This redirects you to your configured identity provider's sign in screen.

1. Sign in with your identity provider.

1. When redirected to the Redis Cloud sign in screen, select **Sign in with SSO** and enter your credentials.

    {{<note>}}
If you see a **SAML activation failed** notification when redirected to the Redis Cloud sign in screen, sign in with your previous credentials and review your SAML configuration for issues.
    {{</note>}}

### Bind other accounts

After you set up SAML SSO for one account, you can edit the SAML configuration to bind other accounts. This lets you use the same domain for SSO across multiple accounts.

To bind other accounts to an existing SAML SSO configuration:

1. Go to **Access Management > Single Sign-on** in the Redis Cloud admin console.

1. For **Bind other accounts to SAML configuration**, select the checkboxes for the other accounts you want to bind to SAML SSO.

1. Select **Save**.

1. From the **Bind accounts** dialog, select **Continue** to enable SAML SSO for the selected accounts.