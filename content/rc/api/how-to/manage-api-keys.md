---
Title: Manage API Keys
description: Managing API Keys using the Redis Cloud Admin Console
weight: 30
alwaysopen: false
categories: ["RC"]
aliases: /rv/api/how-to/manage-api-keys/
---
After you create the API access key, you can manage usage of the API access key including:

- Delete the access key
- Limit usage of the access key by network subnets

## Delete a Secret Key

To delete an access key:

1. Go to: <https://app.redislabs.com>
1. Make sure you are logged in as an account owner.
1. Go to: **Settings** > **Cloud API Keys**

    If **Cloud API Keys** is not shown, make sure you [enabled your Account to use API]({{< relref "/rc/api/how-to/enable-your-account-to-use-api.md" >}})).
1. Click **Delete**.
1. Confirm that you want to delete the access key.

## Add an Allowed Subnet

By default, API access is allowed from all IP addresses.

To limit API access to a specified range of source IP addresses:

1. Go to: **Settings** > **Cloud API Keys**
1. Click **Manage IPs** for the access key that you want to limit.
1. Click ![Add](/images/rs/icon_add.png#no-click "Add") to add a new whitelist subnet.
1. Enter the subnet in [CIDR format](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation), for example: `10.2.5.0/24`
1. Save the subnet.

After you add the subnet, you can add more subnets or click **OK**.

## Delete an Allowed Subnet

1. Go to: **Settings** > **Cloud API Keys**
1. Click **Manage IPs** for the access key that you want to change.
1. Delete the subnet that you want to disallow.

After you delete the subnet, you can delete more subnets or click **OK**.
