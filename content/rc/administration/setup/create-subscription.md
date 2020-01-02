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
    - **Essentials** - For development environments and low-throughput applications
    - **Pro** - For high-throughput applications, many databases or large datasets
    - **Ultimate** - For a more complete support experience (Contact [Redis Labs Sales](https://redislabs.com/redis-enterprise-cloud/pricing/))

## Create a New Subscription

To create a new subscription:

1. In the Redis Cloud menu, click **Subscriptions**.
1. At the bottom of the page, click ![Add](/images/rs/icon_add.png#no-click "Add").
1. Select your subscription configuration:
    1. Select a cloud provider: **Amazon AWS**, **Microsoft Azure**, **Google Cloud Platform**
    1. Select the region that you want the subscription to use, for example: `us-central1`
    1. In the Redis Cloud service levels, select the memory or throughput limit for your subscription:
        - Essentials - You can also select either [Replication]({{< relref "/rc/concepts/clustering.md" >}}) or Multi-Availability Zone (Multi-AZ)
        - Pro - You can also select a subscription with [Redis on Flash (RoF)]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}}) support
        - Customize - You can:
            - [**Build a Plan**]({{< relref "/rc/administration/setup/customize-pro.md" >}}) to follow a sizing process where you tell us your requirements and we give you a subscription that's just right for you.
            - **Request Pricing** to customize an Ultimate subscription that includes annual payments, premium support, and customer success packages.
1. After you select a subscription configuration:
    1. Review the subscription configuration.

        For Pro subscriptions only:
            1. Enable **Multi-AZ** to get improved high availability when multiple availability zones are available.
            1. Enable **Persistent Storage Encryption** to attach encrypted EBS volumes to your instances so that the persistent storage for your subscription is encrypted.
    1. Enter the IP range for the subscription in **Deployment CIDR**.
    1. Enter your **Credit card** information.
    1. Enter a name for the subscription.
1. Click **Create**.

    The cluster for your selected subscription is created.
    You can change the name and credit card information of the subscription after it is created.

{{< embed-md "create-subscription-next-steps.md"  >}}