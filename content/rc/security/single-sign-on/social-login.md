---
Title: Social login
linkTitle: Social login
description: Social login with Redis Cloud.
weight: 50
alwaysopen: false
categories: ["RC"]
---

Redis Cloud offers [social login](https://en.wikipedia.org/wiki/Social_login) as a [single sign-on (SSO)](https://en.wikipedia.org/wiki/Single_sign-on) option. Social login lets you use an existing social media account to create or sign in to your Redis Cloud account.

Redis Cloud supports the following social logins:
- [GitHub](https://github.com/)
- [Google](https://accounts.google.com/)

{{<note>}}
If your Google and GitHub accounts share an email address (such as Gmail), you can use either one to sign in to the same Redis Cloud account.
{{</note>}}

## Create a new account with social login

### Set up Google login

1. Select **Google** from the [sign in](https://app.redislabs.com/new/) screen.
2. Choose your preferred account from the list.
3. Select **Confirm** on the **Sign in with Google** prompt.

### Set up GitHub login

1. Select **Github** from the [sign in](https://app.redislabs.com/new/) screen.
2. Select **Authorize** on the **Authorize Redis Okta Auth Github** prompt.
3. Enter your GitHub password to **Confirm access**.

{{<note>}}
If the email address associated with your GitHub account is not public, you will see an error message that your sign in attempt failed. You need to [make your email address public](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences) on GitHub before you try again.
{{</note>}}

## Migrate an existing account to social login

If you already have a Redis Cloud account that requires an email address and password to sign in, you can migrate your existing account to use a social login associated with that same email address instead.

{{<warning>}}
Once you migrate your account to use social login, you cannot revert to your old email/password sign in method.
{{</warning>}}

### Migrate to Google login

To migrate your account to Google social login:
1. Select **Google** on the [sign in](https://app.redislabs.com/new/) screen.
2. Choose your preferred account from the list.
3. A confirmation prompt will display and warn that you cannot revert to your old sign in method if you proceed with the migration to social login.
4. Select **Confirm** to continue migration.

### Migrate to GitHub login

To migrate your account to GitHub social login:
1. Select **Github** on the [sign in](https://app.redislabs.com/new/) screen.
2. Select **Authorize** on the **Authorize Redis Okta Auth Github** prompt.
3. Enter your GitHub password to **Confirm access**.
4. A confirmation prompt will display and warn that you cannot revert to your old sign in method if you proceed with the migration to social login.
5. Select **Confirm** to continue migration.
