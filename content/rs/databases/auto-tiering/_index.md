---
Title: Auto Tiering
linktitle: Auto Tiering
description: Auto Tiering enables your data to span both RAM and dedicated flash memory.
weight: 50
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/concepts/memory-architecture/redis-flash/,
    /rs/concepts/memory-architecture/redis-flash.md,
    /rs/concepts/memory-performance/redis-flash,
    /rs/concepts/memory-performance/redis-flash.md,
    /rs/databases/redis-flash/,
    /rs/databases/redis-flash.md,
    /rs/databases/redis-flash.md,
    /rs/databases/redis-flash/,
    /rs/databases/redis-on-flash/,
    /rs/databases/auto-tiering/,

]
---
Auto Tiering offers Redis Enterprise users the unique ability to
have large Redis databases but at significant cost savings. Where
standard Redis databases must all be in RAM, Auto Tiering enables your databases to span both RAM and dedicated flash memory in the form of SSDs (solid state drives).

Your data is distributed between RAM and flash memory so that your frequently used data is accessible in RAM, while the values you need less often are stored on the flash memory. Since flash memory usually comes with more storage space and less cost than RAM, this can result in significant savings for large datasets.

Just like all-RAM databases, RoF is compatible with existing Redis applications. Databases that employ RoF are identical to all-RAM Redis Enterprise Software databases in characteristics and features.

Auto Tiering is also supported on [Redis Cloud]({{<relref "/rc/">}}) and [Redis Enterprise Software for Kubernetes]({{<relref "/rs/">}}).

## Use cases

The benefits associated with Auto Tiering are dependent on the use case.

Auto Tiering is ideal when your:

- working set is significantly smaller than your dataset
- average key size is smaller than average value size
- most recent data is the most frequently used

Auto Tiering is not recommended for:

- Long key names (all key names are stored in RAM)
- Broad access patterns (any value could be pulled into RAM)
- Large working sets (working set is stored in RAM)
- Frequently moved data (moving to and from RAM too often can impact performance)

Auto Tiering is not intended to be used for persistent storage. Redis Enterprise Software database persistent and ephemeral storage should be on different disks, either local or attached.

## Where is my data?

When using Auto Tiering, RAM storage holds:
- All keys (names)
- Key indexes
- Dictionaries
- Hot data (working set)

All data is accessed through RAM. If a value in flash memory is accessed, it becomes part of the working set and is moved to RAM. These values are referred to as “hot data”.

Inactive or infrequently accessed data is referred to as “warm data” and stored in flash memory. When more space is needed in RAM, warm data is moved from RAM to flash storage.

{{<note>}} When using Auto Tiering with RediSearch, it’s important to note that RediSearch indexes are also stored in RAM.{{</note>}}

## RAM to Flash ratio

You can easily configure or tune the ratio of RAM-to-Flash for each database independently, optimizing performance for your specific use case. This is an online operation requiring no downtime for your database.

The RAM size cannot be smaller than 10% or larger than 60% of the total memory. We recommend you keep at least 20% of all values in RAM.

## Flash memory

Implementing Auto Tiering requires preplanning around memory and sizing. Considerations and requirements for Auto Tiering include:

- Flash memory must be locally attached (as opposed to network attached.
- Flash memory must be dedicated to RoF and not shared with other parts of the database, such as durability, binaries, or persistence.
- For the best performance, the SSDs should be NVMe based, but SATA can also be used.

{{<note>}} The Redis Enterprise Software database persistent and ephemeral storage should be on different disks, either local or attached. {{</note>}}

Once these requirements are met, you can create and manage both Auto Tiering databases and
all-RAM databases in the same cluster.

When you begin planning the deployment of Auto Tiering in production,
we recommend working closely with the Redis technical team for
sizing and performance tuning.

### Cloud environments

When running in a cloud environment:

- Flash memory is on the ephemeral SSDs of the cloud instance.
- Persistent database storage needs to be network attached (for example, AWS EBS for AWS).

{{<note>}}
We specifically recommend "[Storage Optimized I4i - High I/O Instances](https://aws.amazon.com/ec2/instance-types/#storage-optimized)" because of the performance of NVMe for flash memory. {{</note>}}

### On-premises environments

When you begin planning the deployment of Auto Tiering in production, we recommend working closely with the Redis technical team for sizing and performance tuning.

On-premises environments support more deployment options than other environments such as:

- Using Active-Active distributed databases
- Using Redis Stack features:
  - [Search and query]({{<relref "/stack/search">}})
  - [JSON]({{<relref "/stack/json">}})
  - [Time series]({{<relref "/stack/timeseries">}})
  - [Probabilistic data structures]({{<relref "/stack/bloom">}})

{{<warning>}} Auto Tiering is not supported running on network attached storage (NAS), storage area network (SAN), or with local HDD drives. {{</warning>}}

## Next steps

- [Auto Tiering metrics]({{< relref "/rs/references/metrics/redis-on-flash" >}})
- [Auto Tiering quick start]({{<relref "/rs/databases/auto-tiering/quickstart.md">}})

- [Ephemeral and persistent storage]({{<relref "/rs/installing-upgrading/install/plan-deployment/persistent-ephemeral-storage">}})
- [Hardware requirements]({{<relref "/rs/installing-upgrading/install/plan-deployment/hardware-requirements.md" >}})
