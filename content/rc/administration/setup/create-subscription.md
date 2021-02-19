---
Title: Creating a Subscription
description:
weight: 30
alwaysopen: false
categories: ["RC"]
aliases: /rv/administration/setup_and_editing/create-subscription/
         /rv/administration/setup_and_editing/creating-subscription/
         /rc/administration/setup_and_editing/create-subscription/
         /rc/administration/setup-and-editing/create-subscription/
---
When you create a Redis Cloud subscription, you must choose:

- A cloud provider: **Amazon AWS**, **Microsoft Azure**, **Google Cloud Platform**
- The provider region
- Redis Cloud service level:
    - **Fixed** - Set pricing designed for low-throughput applications  
    - **Flexible**  - "Pay as you go" plans for any dataset size or throughput  
    - **Annual** - Predefined annual consumption commitments that provide substantial discounts over Flexible plans  

    For full details, see [Redis Enterprise Cloud Pricing](https://redislabs.com/redis-enterprise-cloud/pricing/).

## Create a new subscription

To create a new subscription:

1. In the Redis Cloud menu, select **Subscriptions**.

1. At the bottom of the page, select the **Add Subscription** button (![Add Subscription button](/images/rs/icon_add.png#no-click)).

1. Select your subscription configuration:
    1. Select a cloud provider: **Amazon AWS**, **Microsoft Azure**, **Google Cloud Platform**.
    1. Select the region that you want the subscription to use, for example: `us-central1`.
    1. Select the plan that best reflects your needs.

        - _Fixed_ plans support low-throughput scenarios for datasets up to 10 GB.  You can choose high availability and multi-region deployments.
    
        - _Flexible_ plans are tailored to your dataset size and throughput requirements.  When you create one, you customize the feature to suit your specific needs.  To learn more, see [Customize a Flexible plan]({{<relref "rc/administration/setup/customize-flexible-plan.md">}}).

         - _Annual_ plans commit to specific thresholds and provide significant savings over Flexible plans.  To learn more, click the **Request Pricing** button to receive an individual quote.



{{< embed-md "create-subscription-next-steps.md"  >}}