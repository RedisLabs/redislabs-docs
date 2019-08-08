---
Title: Create API Keys for your team
description: How to use the Redis Labs web application to create and manage API Keys for your Account's team owners
weight: 20
alwaysopen: false
categories: ["RC Pro"]
---
API access requires each API request to include 2 parameters:

1. **Account key** - available via the 'Settings -> Account' menu. See [Enable your Account to use API]({{< relref  "/rv/api/how-to/enable-your-account-to-use-api.md" >}})
1. **Secret key** - created by account owners for their personal use (or to be used by other owners of the same account)

Creating API keys can only be done by account owners, for account owners:

1. In https://app.redislabs.com, navigate to 'Settings' menu, and select the 'Cloud API Keys' tab.
1. If the 'Cloud API Keys' is not displayed - make sure you [enabled your Account to use API]({{< relref  "/rv/api/how-to/enable-your-account-to-use-api.md" >}})
1. To create a new key, click the button labeled 'Add new API secret key'
1. Fill in the secret key properties:
    1. User Name: from the dropdown, select the user associated with the key (API requests using this key will be authorized and audited to this user)
    1. API Key Name: a descriptive name for the key (two keys associated with the same user must have different names). Key names must comply with the following constraints:
        1. Number of characters between 10 and 50
        1. Allowed characters are: Letters, digits, hyphens ('-') and underscores ('_')
        1. Spaces are forbidden
1. Click the button labeled 'Generate API Key. A pop-up window will appear specifying the secret key was successfully created. Copy the secret key value and store it in a safe location.

## Keeping the secret value of the key

When generating a secret key, the secret value of the key is displayed for the first and only time.

That the value of the secret key cannot be retrieved later on. If lost or compromised - delete the key and generate a new key.

The secret value should be used as a parameter for all API requests by the user associated with the key, and by no one else.
