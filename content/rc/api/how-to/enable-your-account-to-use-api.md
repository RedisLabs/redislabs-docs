---
Title: Enable the API for your Account
description: Enabling an account to use API using the Redis Cloud Admin Console
weight: 10
alwaysopen: false
categories: ["RC"]
aliases: /rv/api/how-to/enable-your-account-to-use-api/
---
By default, the API is disabled for accounts.

{{% warning %}}
Make sure that the access key is protected against unauthorized use. Anyone who sends an API request with the access key can make changes to your account.
{{% /warning %}}

To enable an account to use API:

1. Login to <https://app.redislabs.com> with a user that is an owner of an account.
1. Go to the **Settings**.
1. In the **Account** tab, locate the **Cloud API Access Key**.
1. Click **Generate**.

The generated string is the API access key that you need to include in all API calls.
Account owners can see the access key in the account.

You can also [manage usage of the API access key]({{< relref "/rc/api/how-to/manage-api-keys.md" >}}) including:

- Delete the access key
- Limit usage of the access key by network subnets
