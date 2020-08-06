---
Title: Multi-factor authentiction
description:
weight: 20
alwaysopen: false
categories: ["RC"]
---

To reduce the chances of unauthorized access to the Redis Cloud Admin Console, each user can enable MFA to require an authentication code at login.
The account owner can also enable MFA enforcement for all users in the account so that users cannot log in without MFA.

When MFA is enabled, users must enter their username, password, and an authentication code. MFA requires a phone that can receive these authentication codes over text messages.

### Using MFA for a user account

Each user can enable and configure MFA for their user account.
The default MFA configuration sends an authentication code by text message that you must enter when you log in.

To configure MFA for your user account:

1. Log into your account.
2. In the menu, click on your name.
3. In your user profile, click **Multi-Factor Authentication**.
4. Click **Activate Now**
5. Enter your mobile phone number and enter the confirmation code sent to you by text message.

Your account is now configured for MFA.
When you log in to the Redis Cloud Admin Console, you are sent an authentication code by text message that you must enter.

To change the mobile phone number, click **Configure** for the text message code and enter the new mobile phone number.

{{< note >}}
We recommend that you also configure MFA for an Authenticator app as a second method of MFA.
If you cannot login to your account because of MFA, contact [Support](https://support.redislabs.com).

If your mobile phone is lost or stolen, make sure that you update the MFA configuration to prevent unauthorized logins.
{{< /note >}}

#### Configuring MFA for an authenticator app

After you configure MFA for text messages, you can also configure MFA to work with a Time-based One-Time Password (TOTP) app such as Google Authenticator.
Then when you log in to the Redis Cloud Admin Console, you can select to use either an authentication code sent by text message or an authentication code shown in the Authenticator app for MFA.

To configure MFA for the Authenticator app:

1. Install the Google Authenticator app on your phone from the Apple Store or Google Play.
1. Add Redis Cloud to the app:
    1. In your profile in your Redis Cloud account, click **Multi-Factor Authentication**.
    1. Click **Configure** for the authenticator app.
    1. On your phone, open the Authenticator app.
    1. Press the plus sign and press **Scan a barcode**.
    1. Scan the Redis Cloud barcode.

When you log in to the Redis Cloud Admin Console, you can do MFA either with a text message or the Authenticator app.
If you do MFA with the Authenticator app, you must open the Authenticator app and enter the Redis Labs code into the Redis Cloud login.

#### Deactivating MFA

You can deactivate MFA for your user account. To deactivate MFA, go to your profile, click **Multi-Factor Authentication**, and click **Deactivate**.

### Enforcing MFA for all user accounts

Account owner users can enable MFA enforcement for all users in their account.
After MFA is enforced for the account, all users that do not have MFA enabled are required to configure MFA the next time they log in to the Redis Cloud Admin Console.

- When you enable MFA enforcement, users cannot disable MFA for their account.
- When you disable MFA enforcement, users can disable MFA for their account.

{{< tip >}}
We recommend that you send an email to all the Redis Cloud Admin Console users to notify them of this change before you enable MFA enforcement.
{{< /tip >}}

To enable MFA enforcement for all user accounts, the account owner must enable **MFA enforcement** in **Settings** > **Account**.
