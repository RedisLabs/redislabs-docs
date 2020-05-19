---
Title: Creating API Keys
description: How to use the Redis Cloud Admin Console to create and manage API Keys for your Account's team owners
weight: 20
alwaysopen: false
categories: ["RC"]
aliases: /rv/api/how-to/create-api-keys-for-your-team/
---
API access requires each API request to include 2 parameters:

1. **Account key** - Shown in the **Settings** > **Account**.
    You must [enable your Account to use API]({{< relref  "/rc/api/how-to/enable-your-account-to-use-api.md" >}}).
1. **Secret key** - Created by account owners for their use or for other owners of the same account.

## Generating a Secret Key

For an account owner to create a key for themselves:

1. In <https://app.redislabs.com>, navigate to **Settings**, and select **Cloud API Keys**.

    If **Cloud API Keys** is not shown, make sure you [enabled your Account to use API]({{< relref  "/rc/api/how-to/enable-your-account-to-use-api.md" >}}).
1. To create a new key, click **Add new API secret key**.
1. Enter the secret key properties:
    1. User Name - Select the user associated with the key.

        API requests using this key are be authorized and audited to this user.
    1. API Key Name - A descriptive name for the key.

        Two keys associated with the same user must have different names. Key names must meet these requirements:
        1. Between 10 and 50 characters
        1. Only letters, digits, hyphens ('-') and underscores ('_')
        1. No spaces
1. Click **Generate API Key**.

    A popup window is shown that shows that the secret key was successfully created.
1. Copy the secret key value and store it in a safe location.

{{% note %}}
The dropdown list of users only contains users of the current account in the owner role who completed email address verification.
{{% /note %}}

## Using the Secret Key

The secret value of the key is shown only when you generate the key.
The value of the secret key cannot be retrieved later on.
If lost or compromised, delete the key and generate a new key.

Use the secret value as a parameter for all API requests by the user associated with the key only.
