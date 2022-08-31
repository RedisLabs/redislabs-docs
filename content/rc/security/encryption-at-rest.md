---
Title: Encryption at rest
description: Describes when data is encrypted at rest.
weight: 40
alwaysopen: false
categories: ["RC"]
aliases: /rc/security/database-security/encryption-at-rest/
         /rc/security/database-security/encryption-at-rest.md
---
Redis Cloud databases write their data to disk whenever [persistence]({{<relref "/rc/databases/configuration/data-persistence.md">}}) is enabled. 

Redis Cloud deployments are always encrypted at rest. 

## Encryption at rest on AWS {#aws}

Persistent data is written to [encrypted EBS volumes](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html). 

When Redis on Flash is enabled, the flash memory data is written to [encrypted NVMe SSD volumes](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ssd-instance-store.html).

## Disk encryption on GCP {#gcp}

All data written to disk on GCP-based Redis Cloud deployments is encrypted by default. When deploying
a Redis Cloud database on GCP, you don't need to take any actions to enable this encryption.

To learn more, see the [GCP encryption at rest documentation](https://cloud.google.com/security/encryption-at-rest).

## Disk encryption on Azure {#azure}

All data written to disk on Azure-based Redis Cloud deployments is encrypted by default. When deploying
a Redis Cloud database on Azure, you don't need to take any actions to enable this encryption.

To learn more, see the [Azure encryption at rest documentation](https://docs.microsoft.com/en-us/azure/security/fundamentals/encryption-atrest).
