---
Title: Enable the API for your Account
description: Enabling an account to use API using the Redis Cloud admin console
weight: 10
alwaysopen: false
categories: ["RC"]
aliases: /rv/api/how-to/enable-your-account-to-use-api/
---
By default, the Redis Enterprise Cloud API is disabled.

To enable the API for an account:

1. [Log in to admin console](https://app.redislabs.com) as an account owner.
1. Go to **Settings**.
1. In the **Account** tab, locate the **Cloud API Access Key**.
1. Click **Generate**.

The generated string is the API access key. You will need to include this access key, and a [secret key]({{< relref "/rc/api/how-to/create-api-keys-for-your-team#secret" >}}), when making API calls.
Only account owners can see the access key in the account settings.

{{< warning >}}
Make sure that you keep your access keys secret. Anyone who sends an API request with a valid access key can make changes to your account.
{{< /warning >}}

To further manage your API keys and limit usage by subnet, see [Managing API Keys]({{< relref "/rc/api/how-to/manage-api-keys.md" >}}).
