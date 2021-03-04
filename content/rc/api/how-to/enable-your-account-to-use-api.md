---
Title: Enable the API
description: Use the Redis Cloud dashboard to enable the REST API.
weight: 10
alwaysopen: false
categories: ["RC"]
aliases: /rv/api/how-to/enable-your-account-to-use-api/
---

If you have a Flexible (or Annual) Redis Enterprise Cloud subscription, you can use a REST API to manage your subscription programmatically.

{{< note >}}
The Redis Cloud REST API is available only to Flexible or Annual subscriptions.  It is not supported for Fixed or Free subscriptions.
{{< /note >}}

For security reasons, the Redis Cloud API is disabled by default.

To enable the API:

1. Sign in to your [Redis Cloud subscription](https://app.redislabs.com) as an account owner.
1. From the menu, choose **Settings**.
1. In the **Account** tab, locate the **Cloud API Access Key** in the **Misc** section.

    {{<image filename="images/rc/settings-cloud-api-key.png" width="75%" alt="When available, the Cloud API access key appears in the Misc section of the account settings." >}}{{< /image >}}

    If you do not see the **Cloud API Access Key** setting, verify that you're signed into a Flexible (or Annual) subscription and that you are an account owner.

1. If the setting contains a key, the API is already enabled.  

    If you see a **Generate** button, select it to generate your key.

The generated key is the API access key. You need combine this with a [secret key]({{< relref "/rc/api/how-to/create-api-keys-for-your-team#secret" >}}) to make API calls.

Only account owners can see the access key in the account settings.

{{< warning >}}
Make sure that you keep your access keys secret. Anyone who sends an API request with a valid access key can make changes to your account.
{{< /warning >}}

To further manage your API keys and limit usage by subnet, see [Manage API keys]({{< relref "/rc/api/how-to/manage-api-keys.md" >}}).
