---
Title: Single sign-on
linkTitle: Single sign-on
description: Single sign-on (SSO) integration with Redis Cloud
weight: $weight
alwaysopen: false
categories: ["RC"]
---

As an alternative to the traditional email/password account authentication method, you can create a Redis Cloud account and sign into the [admin console](https://app.redislabs.com/new/) with [single sign-on (SSO)](https://en.wikipedia.org/wiki/Single_sign-on). This allows you to use one set of credentials, managed by your [identity provider](https://en.wikipedia.org/wiki/Identity_provider), to access multiple websites.

## Social login

One SSO option that Redis Cloud offers is [social login](https://en.wikipedia.org/wiki/Social_login), which allows you to use an existing social media account to create or sign into your Redis Cloud account.

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
