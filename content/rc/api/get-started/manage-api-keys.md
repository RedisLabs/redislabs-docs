---
Title: Create API Keys
description: How to use the Redis Cloud admin console to create and manage API Keys for your Account's team owners
weight: 20
alwaysopen: false
categories: ["RC"]
aliases: /rv/api/how-to/create-api-keys-for-your-team/
         /rc/api/how-to/create-api-keys-for-your-team/
         /rc/api/how-to/create-api-keys-for-your-team.md
         /rv/api/how-to/manage-api-keys/
         /rc/api/how-to/manage-api-keys/
         /rc/api/how-to/manage-api-keys.md
         /rc/api/get-started/manage-api-keys/
         /rc/api/get-started/manage-api-keys.md
---
Every API request must include the following two API keys:

1. **Account key**: Shown in the **Settings** > **Account**.
    Before using the API, you must [enable API access for your account ]({{< relref  "/rc/api/get-started/enable-the-api.md" >}}).
1. **Secret key**: Created by account owners for their use or for other owners on the same account.

Here, you'll learn how to manage access keys, including how to:

- Generate a key
- Delete a key
- Limit key access by subnet
- Remove subnet access

## Generate a key {#secret}

To generate a secret access key:

1. Sign in to the admin console as an account owner.
1. From the admin console menu, choose **Settings** and select **Cloud API Keys**.

    If **Cloud API Keys** is not shown, make sure you have [enabled your Account to use API]({{< relref "/rc/api/get-started/enable-the-api.md" >}}).
1. To create a new key, select **Add new API secret key**.
1. Enter the secret key properties:
    1. User Name: Choose the user associated with the key.

        API requests using this key will be associated with this user.
    1. API Key Name: A descriptive name for the key.

        Two keys associated with the same user must have different names. Key names must meet these requirements:
        1. Between 10 and 50 characters
        1. Only letters, digits, hyphens ('-') and underscores ('_')
        1. No spaces
1. Choose **Generate API Key**.

    A popup window displays the new secret key.
1. Copy the secret key and store it in a safe location. This is the only time you will be able to retrieve the key.

{{< note >}}
The users list contains only verified users in the current account that have the **owner** role.
{{< /note >}}

## Delete an access key

To delete an access key:

1. [Sign in to admin console](https://app.redislabs.com) as an account owner.
1. Go to: **Settings** > **Cloud API Keys**

    If **Cloud API Keys** is not shown, make sure you have [enabled the API for your account]({{< relref "/rc/api/get-started/enable-the-api.md" >}})).
1. Select **Delete**.
1. Confirm that you want to delete the access key.

## Limit access by subnet

By default, API access is allowed from all IP addresses.

To limit API access to a specified range of source IP addresses:

1. [Sign in to admin console](https://app.redislabs.com) as an account owner.
1. Go to **Settings** > **Cloud API Keys**
1. Select **Manage IPs** for the access key that you want to limit.
1. Select ![Add](/images/rs/icon_add.png#no-click "Add") to add a new whitelist subnet.
1. Enter the subnet in [CIDR format](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation), for example: `10.2.5.0/24`
1. Save the subnet.

After you add the subnet, you can add additional subnets or select **OK**.

## Delete an allowed subnet

1. [Sign in to admin console](https://app.redislabs.com) as an account owner.
1. Go to **Settings** > **Cloud API Keys**
1. Select  **Manage IPs** for the access key that you want to change.
1. Delete the subnet that you want to remove.

After you delete the subnet, you can delete more subnets or select **OK**.
