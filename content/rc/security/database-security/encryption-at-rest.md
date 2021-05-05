---
Title: Encryption at rest
description: Describes when data is encypted at rest and how to enable it for AWS subscriptions.
weight: 40
alwaysopen: false
categories: ["RC"]
---
Redis Cloud databases write their data to disk whenever [persistence]({{<relref "/rc/concepts/data-persistence.md">}}) is enabled. 

On [Google Cloud Platform](#gcp) (GCP) and [Microsoft Azure](#azure), Redis Cloud deployments are always encrypted at rest. 

For [Amazon Web Services](#aws) (AWS), Redis Cloud Flexible (and Annual) subscriptions can be encrypted at rest when you create the subscription.  

## Encryption at rest on AWS {#aws}

When encrypted, persistent data is written to [encrypted EBS volumes](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html). 

When Redis on Flash is enabled, the flash memory data is written to [encrypted NVMe SSD volumes](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ssd-instance-store.html).

Encryption can only be enabled when a subscription is created.

### Enable encryption when creating Flexible plans {#aws-flexible}

To enable encryption when creating a Flexible plan on AWS:

1.  Create a new AWS subscription.

1.  In the Flexible plan section, select the Create button.

    {{<image filename="/images/rc/subscription-create-flexible.png" width="75%" alt="Create Flexible Plan" >}}{{< /image >}}

    This takes you to the **Create Custom Subscription** screen:

    {{<image filename="/images/rc/create-custom-subscription.png" width="75%" 
    alt="Create Custom Subscription screen" >}}{{< /image >}}

1.  Expand the **Advanced Options** and then verify that **Persistent Storage Encryption** is set to **Yes**.

    {{<image filename="/images/rc/persistent-storage-encryption.png" width="75%" 
    alt="Persistent Storage Encryption setting" >}}{{< /image >}}

When you create the subscription, all databases will be encrypted at rest.

## Disk encryption on GCP {#gcp}

All data written to disk on GCP-based Redis Cloud deployments is encrypted by default. When deploying
a Redis Cloud database on GCP, you don't need to take any actions to enable this encryption.

To learn more, see the [GCP encryption at rest documentation](https://cloud.google.com/security/encryption-at-rest).

## Disk encryption on Azure {#azure}

All data written to disk on Azure-based Redis Cloud deployments is encrypted by default. When deploying
a Redis Cloud database on Azure, you don't need to take any actions to enable this encryption.

To learn more, see the [Azure encryption at rest documentation](https://docs.microsoft.com/en-us/azure/security/fundamentals/encryption-atrest).
