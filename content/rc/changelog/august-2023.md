---
Title: Redis Enterprise Cloud changelog (August 2023)
linktitle: August 2023
description: New features, enhancements, and other changes added to Redis Enterprise Cloud during August 2023.
highlights: Triggers and functions preview
weight: 80
alwaysopen: false
categories: ["RC"]
aliases: []
---

This changelog lists new features, enhancements, and other changes added to Redis Enterprise Cloud during August 2023.

## New features

### Triggers and functions preview

A preview of [triggers and functions]({{<relref "/stack/triggers-functions">}}) (previously known as RedisGears) is now available in the following regions:

- AWS Asia Pacific - Singapore (`ap-southeast-1`)
- GCP Asia Pacific - Tokyo (`asia-northeast1`)

To use it, [create a fixed subscription]({{<relref "/rc/subscriptions/create-fixed-subscription">}}) with [Redis 7.2]({{<relref "/rc/changelog/june-2023##redis-72-opt-in">}}). Then, [create your database]({{<relref "/rc/databases/create-database">}}) and set the database Type to Redis and select Triggers and Functions in the drop-down. Or, set the database Type to Redis Stack to get all of our advanced capabilities.

If you'd like to use triggers and functions with a [Flexible subscription]({{<relref "/rc/subscriptions/create-flexible-subscription">}}), contact [support](https://redis.com/company/support/).

For more information about triggers and functions, see the [triggers and functions documentation](https://redis.io/docs/interact/programmability/triggers-and-functions).
