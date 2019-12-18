---
Title: Creating a Subscription
description:
weight: 30
alwaysopen: false
categories: ["RC"]
aliases: /rv/administration/setup_and_editing/create-subscription/
         /rc/administration/setup_and_editing/create-subscription/
         /rc/administration/setup-and-editing/create-subscription/
---
When you create a Redis Cloud subscription, you must choose:

- A cloud provider: Amazon AWS, Microsoft Azure, Google Cloud Platform
- The provider region
- Redis Cloud service level:
    - Essentials - Select high availability options and memory size limit
    - Pro - Select memory size or throughput limit in standard Redis on RAM, or storage size limit in Redis on Flash (RoF)
    - Ultimate - Contact [Redis Labs Support](https://redislabs.com/redis-enterprise-cloud/pricing/) for assistance.

## Create a New Subscription

To create a new subscription:

1. In the Redis Cloud menu, click **Subscriptions**.
1. At the bottom of the page, click ![Add](/images/rs/icon_add.png#no-click "Add").
1. Select your subscription configuration:
    1. Select a cloud provider: Amazon AWS, Microsoft Azure, Google Cloud Platform
    1. Select the region that you want the subscription to use, for example: `us-central1`
    1. In the Redis Cloud service levels, select the subscriptions limits:
        - Essentials:
            - Select a high availability option: Off, [Replication]({{< relref "/rc/concepts/clustering.md" >}}), Multi-AZ
            - Select the memory limit for your subscription
        - Pro:
            - For high throughput databases, select a throughput limit.
            - For large datasets that require high throughput, select a memory limit.
            - For very large datasets that can have lower throughput, select a memory limit for Redis on Flash (RoF).
        - To customize your subscription:
            - Click **Build a Plan** to [customize a Pro subscription]({{< relref "/rc/administration/setup/customize-pro.md" >}}).
            - Click **Request Pricing** to customize an Ultimate subscription that includes annual payments, premium support, and customer success packages.
1. After you select a subscription configuration:
    1. Review the subscription configuration.
    1. For Pro subscriptions only:
        1. If you want to host your subscription on multiple availability zones (multi-AZ) for high availability, enable **Multi-AZ**.
            We recommend that you use a cloud region that has at least 3 availability zones.
        1. If you want to attach encrypted EBS volumes to your instances so that the persistent storage for your subscription is encrypted, enable **Persistent Storage Encryption**.
    1. Enter the IP range for the subscription in **Deployment CIDR**.
    1. Enter your **Credit card** information.
    1. Enter a name for the subscription.
1. Click **Create**.

    The cluster for your selected subscription is created.
    You can change the name and credit card information of the subscription after it is created.

{{< embed-md "create-subscription-next-steps.md"  >}}