---
Title: Encryption at rest
description:
weight: 40
alwaysopen: false
categories: ["RC"]
---

Redis Cloud databases write their data to disk whenever [persistence]({{<relref "/rc/concepts/data-persistence.md">}}) is enabled. For deployments on [GCP](#gcp) and [Azure](#azure), this data is always encrypted by default. For [AWS](#aws),
all pre-configured subscriptions encrypt data by default. For custom Redis Cloud Pro subscriptions, see the
[documentation below](#aws-pro) for how to enable encryption.

## Disk encryption on AWS {#aws}

Persisted data for Redis Cloud databases on AWS is written to [encrypted EBS volumes](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html). When Redis on Flash is enabled, the data stored in flash memory is written to [encrypted NVMe SSD volumes](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ssd-instance-store.html).

Almost all deployments of Redis Cloud Essentials, Pro, and Ultimate enable encryption by default. The one
exception to this rule is custom plans. See below for how to enable encryption on these plans.

### Enabling encryption for custom Redis Cloud Pro subscriptions {#aws-pro}

If you're creating a custom Redis Cloud Pro subscription, then you need to make sure that you enable
encryption. You create a customer subscription when you select **Build a Plan**, as seen here:

![Build a Plan](/images/rc/build-a-plan.png "Build a Plan")

This will take you to the **Create Customer Subscription** screen:

![Create Custom Subscription](/images/rc/create-custom-subscription.png "Create Custom Subscription")

From here, scroll down to where it says **Advanced Options**, and ensure that the **Persistent Storage Encryption** slider
is set to **Yes**:

![Persistent Storage Encryption](/images/rc/persistent-storage-encryption.png "Persistent Storage Encryption")

Once this is set, all databases created from this subscription will use encrypted volumes to store their persistent data.

## Disk encryption on GCP {#gcp}

All data written to disk on GCP-based Redis Cloud deployments is encrypted by default. When deloying
a Redis Cloud database on GCP, you don't need to take any actions to enable this encryption.

To learn more, see the [GCP encryption at rest documentation](https://cloud.google.com/security/encryption-at-rest).

## Disk encryption on Azure {#azure}

All data written to disk on Azure-based Redis Cloud deployments is encrypted by default. When deloying
a Redis Cloud database on Azure, you don't need to take any actions to enable this encryption.

To learn more, see the [Azure encryption at rest documentation](https://docs.microsoft.com/en-us/azure/security/fundamentals/encryption-atrest).
