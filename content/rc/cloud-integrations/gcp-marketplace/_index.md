---
Title: Flexible subscriptions with GCP Marketplace
LinkTitle: GCP Marketplace subscription
description: Shows how to subscribe to Redis Cloud using GCP Marketplace
weight: $weight
alwaysopen: false
categories: ["RC"]
aliases: /rc/cloud-integrations/gcp-marketplace/
         /rc/cloud-integrations/gcp-marketplace.md
---

You can use Google Cloud Platform (GCP) Marketplace to subscribe to Redis Enterprise Cloud. This lets you provision according to your needs and pay using your GCP account.

Here's how to create a new Flexible subscription as part of your GCP Marketplace commitment.

1.  Sign in to the [GCP console](https://console.cloud.google.com/).

1.  Search GCP Marketplace for [Redis Enterprise Cloud Flexible - Pay as You Go](https://console.cloud.google.com/marketplace/product/redis-marketplace-isaas/redis-enterprise-cloud-flexible-plan).

    {{<image filename="images/rc/gcp-marketplace-rc-payg-plan.png" alt="The Redis Enterprise Cloud Flexible - Pay as You Go plan listing on GCP Marketplace" >}}{{< /image >}}

1.  Select **Subscribe** to be redirected to the details page.

1. Review the subscription details, accept the terms, and select **Subscribe**.

1. GCP sends a request to Redis to approve the subscription, which may take a few seconds. Until the subscription is approved, the listing will show that the purchase is pending provider approval.

    {{<image filename="images/rc/gcp-marketplace-rc-payg-pending-approval.png" alt="The Redis Enterprise Cloud Flexible - Pay as You Go plan listing on GCP Marketplace, with the Purchase pending provider approval" >}}{{< /image >}}

    Refresh the listing page if the **Manage on Provider** button is not shown.

1. Select **Manage on Provider** to be redirected to the Redis Cloud admin console.

    {{<image filename="images/rc/gcp-marketplace-manage-on-provider.png" alt="The Manage on Provider button" >}}{{< /image >}}

1.  Create a Redis Cloud admin account or sign in to an existing account.

1.  Use the Google Cloud Marketplace dialog to select the Redis account to be mapped to your GCP Marketplace account. You only need to do this once.

    {{<image filename="images/rc/gcp-marketplace-map-account-dialog.png" alt="Use the GCP Marketplace dialog to map your Redis Cloud account to your GCP Marketplace account." width="75%">}}{{< /image >}}

1.  Select **Map account** to confirm your choice.

1.  Once your Redis account is mapped to your GCP Marketplace account, a message appears in the upper left corner of the account panel.

    {{<image filename="images/rc/gcp-marketplace-billing-badge.png" alt="The GCP Marketplace badge appears when your Redis Cloud account is mapped to an GCP Marketplace account.">}}{{< /image >}}

    In addition, GCP Marketplace is reported as the selected payment method.

At this point, you can create a new Flexible subscription using the [standard workflow]({{<relref "/rc/subscriptions/create-flexible-subscription">}}), with one important change. You don't need to enter a payment method, as it's automatically assigned to your GCP Marketplace account.

To confirm this, review the payment method associated with your subscription.

If your GCP Marketplace account is disabled or otherwise unavailable, you won't be able to use your Flexible subscription until the billing method is updated.  For help, [contact support](https://redis.com/company/support/).
