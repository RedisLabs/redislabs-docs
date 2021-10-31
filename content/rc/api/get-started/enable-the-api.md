---
Title: Enable the API
description: Use the Redis Cloud dashboard to enable the REST API.  (Requires a Flexible or Fixed account.)
weight: 10
alwaysopen: false
categories: ["RC"]
aliases: /rv/api/how-to/enable-your-account-to-use-api/
         /rc/api/how-to/enable-your-account-to-use-api/
         /rc/api/how-to/enable-your-account-to-use-api.md
         /rc/api/enable-the-api/
         /rc/api/enable-the-api.md
         /rc/api/get-started/enable-the-api/
         /rc/api/get-started/enable-the-api.md

---

If you have a Flexible (or Annual) Redis Enterprise Cloud subscription, you can use a REST API to manage your subscription programmatically.

{{< note >}}
The Redis Cloud REST API is available only to Flexible or Annual subscriptions.  It is not supported for Fixed or Free subscriptions.
{{< /note >}}

For security reasons, the Redis Cloud API is disabled by default.

To enable the API:

1. Sign in to your [Redis Cloud subscription](https://app.redislabs.com) as an account owner.
1. From the menu, choose **Access Management**.
1. When the **Access Management** screen appears, select the **API Keys** tab.

    {{<image filename="images/rc/access-management-api-keys-tab.png" width="75%" alt="Use the **API Keys** tab of the **Access Management** screen to manage your REST API keys." >}}{{< /image >}}

1. If a **Copy** button appears to the right of the API account key, the API is enabled.  This button copies the account key to the Clipboard.

    {{<image filename="images/rc/button-access-management-api-key-copy.png" alt="Use the **Copy** button to copy the access key to the Clipboard." >}}{{< /image >}}

    If you see an **Enable API** button, select it to enable the API and generate your API account key.

    {{<image filename="images/rc/button-access-management-enable-api.png" alt="Use the **Enable API** button to enable the REST API for your account." >}}{{< /image >}}

To authenticate REST API calls, you need to combine the API account key with an [API user key]({{< relref "/rc/api/get-started/manage-api-keys.md#secret" >}}) to make API calls.

Only account owners can see the access key in the account settings.

{{< warning >}}
Make sure that you keep your access keys secret. Anyone who sends an API request with a valid access key can make changes to your account.
{{< /warning >}}

To manage your API keys or to limit IP addresses for user keys, see [Manage API keys]({{< relref "/rc/api/get-started/manage-api-keys.md" >}}).
