---
Title: Flexible subscriptions with Google Cloud Marketplace
LinkTitle: Google Cloud Marketplace
description: Shows how to subscribe to Redis Cloud using Google Cloud Marketplace
weight: $weight
alwaysopen: false
categories: ["RC"]
aliases: /rc/cloud-integrations/gcp-marketplace/
         /rc/cloud-integrations/gcp-marketplace.md
---

You can use Google Cloud Marketplace to subscribe to Redis Enterprise Cloud. This lets you provision according to your needs and pay using your Google Cloud account.

Here's how to create a new Flexible subscription as part of your Google Cloud Marketplace commitment:

1.  Sign in to the [Google Cloud console](https://console.cloud.google.com/).

1.  Search Google Cloud Marketplace for [Redis Enterprise Cloud Flexible - Pay as You Go](https://console.cloud.google.com/marketplace/product/redis-marketplace-isaas/redis-enterprise-cloud-flexible-plan).

    {{<image filename="images/rc/gcp-marketplace-rc-payg-plan.png" alt="The Redis Enterprise Cloud Flexible - Pay as You Go plan listing on Google Cloud Marketplace" >}}{{< /image >}}

    Alternatively, in the navigation panel, select **More Products** and select **Redis Enterprise** under **Partner Solutions**. You can pin Redis Enterprise for easy access.

1.  Select the **Subscribe** button. This redirects you to the subscription details page.

1. Review the subscription details, accept the terms, and select **Subscribe**.

1. When you subscribe for the first time, select **Register with Redis**. This will redirect you to the Redis Cloud [admin console](https://app.redislabs.com).

1. Create a Redis Cloud admin account or sign in to an existing account.

1.  Use the **GCP Marketplace** dialog to select the Redis account you want to map to your Google Cloud Marketplace account. You only need to do this once.

    {{<image filename="images/rc/gcp-marketplace-map-account-dialog.png" alt="Use the GCP Marketplace dialog to map your Redis Cloud account to your Google Cloud Marketplace account." width="75%">}}{{< /image >}}

1.  Select **Map account** to confirm your choice.

1.  After you map your Redis account to your Google Cloud Marketplace account, a message appears in the upper left corner of the account panel.

    {{<image filename="images/rc/gcp-marketplace-billing-badge.png" alt="The Google Cloud Marketplace badge appears when your Redis Cloud account is mapped to a Google Cloud Marketplace account.">}}{{< /image >}}

1. On the Google Cloud Marketplace listing, select **Manage on provider** to go to the Redis Cloud [admin console](https://app.redislabs.com).

    {{<image filename="images/rc/gcp-marketplace-manage-on-provider.png" alt="The Manage on Provider button" >}}{{< /image >}}

At this point, you can create a new Flexible subscription using the [standard workflow]({{<relref "/rc/subscriptions/create-flexible-subscription">}}), with one important change. You don't need to enter a payment method, as it automatically uses your Google Cloud Marketplace account.

To confirm this, review the payment method associated with your subscription.

If your Google Cloud Marketplace account is deactivated or otherwise unavailable, you can't use your Flexible subscription until you update the billing method.  For help, [contact support](https://redis.com/company/support/).
