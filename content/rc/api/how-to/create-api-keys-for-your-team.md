---
Title: Creating API Keys
description: How to use the Redis Cloud Admin Console to create and manage API Keys for your Account's team owners
weight: 20
alwaysopen: false
categories: ["RC"]
aliases: /rv/api/how-to/create-api-keys-for-your-team/
---
Every API request must include the following two API keys:

1. **Account key**: Shown in the **Settings** > **Account**.
    Before using the API, you must [enable API access for your account ]({{< relref  "/rc/api/how-to/enable-your-account-to-use-api.md" >}}).
1. **Secret key**: Created by account owners for their use or for other owners on the same account.

## Generating a secret key

To generate a secret key:

1. Log on to the admin console as an account owner.
1. Navigate to **Settings**, and select **Cloud API Keys**.

    If **Cloud API Keys** is not shown, make sure you have [enabled your Account to use API]({{< relref  "/rc/api/how-to/enable-your-account-to-use-api.md" >}}).
1. To create a new key, click **Add new API secret key**.
1. Enter the secret key properties:
    1. User Name: Select the user associated with the key.

        API requests using this key will be associated with this user.
    1. API Key Name: A descriptive name for the key.

        Two keys associated with the same user must have different names. Key names must meet these requirements:
        1. Between 10 and 50 characters
        1. Only letters, digits, hyphens ('-') and underscores ('_')
        1. No spaces
1. Click **Generate API Key**.

    A popup window will display the new secret key.
1. Copy the secret key and store it in a safe location. This is the only time you will be able to retrieve the key.

{{< note >}}
The dropdown list of users contains only verified users in the current account having the **owner** role.
{{< /note >}}
