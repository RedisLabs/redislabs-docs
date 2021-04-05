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

    To learn more, see [Redis Enterprise Cloud Pricing](https://redislabs.com/redis-enterprise-cloud/pricing/).

## Create a new subscription

To create a new subscription:

1. In the Redis Cloud menu, click **Subscriptions**.
1. At the bottom of the page, click ![Add](/images/rs/icon_add.png#no-click "Add").
1. Select your subscription configuration:

    1. Select a cloud provider: **Amazon AWS**, **Microsoft Azure**, **Google Cloud Platform**
    1. Select a region for your subscription, such as `us-central1`.
    1. In the Redis Cloud service levels, select the memory or throughput limit for your subscription.  To learn about your options, see [Cloud Pricing](https://redislabs.com/redis-enterprise-cloud/pricing/).
<!--
        - Fixed - You can also select either [Replication]({{< relref "/rc/concepts/clustering.md" >}}) or Multi-Availability Zone (Multi-AZ)
        - Flexible - You can also select a subscription with [Redis on Flash (RoF)]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}}) support
        - Customize - You can:
            - [**Build a Plan**]({{< relref "/rc/administration/setup/customize-pro.md" >}}) to follow a sizing process where you tell us your requirements and we give you a subscription that's just right for you.
            - **Request Pricing** to customize an Ultimate subscription that includes annual payments, premium support, and customer success packages.
-->
4. Update technical details:

    1. Review the subscription configuration.
    1. Update technical details according to your needs, such as **Deployment CIDR** and other values as prompted.
    1. Enter your **Credit card** information.
    1. Enter a name for the subscription.
1. Click **Create**.

    The cluster for your selected subscription is created.
    You can change the name and credit card information of the subscription after it is created.

{{< embed-md "create-subscription-next-steps.md"  >}}