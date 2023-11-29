---
Title: Redis Cloud changelog (August 2023)
linktitle: August 2023
description: New features, enhancements, and other changes added to Redis Cloud during August 2023.
highlights: Redis 7.2 Opt-in for Flexible subscriptions, Triggers and functions preview
weight: 80
alwaysopen: false
categories: ["RC"]
aliases: []
---

This changelog lists new features, enhancements, and other changes added to Redis Cloud during August 2023.

## New features

### Redis 7.2 flexible opt-in

You can opt in to Redis 7.2 on [Flexible subscriptions]({{<relref "/rc/subscriptions/create-flexible-subscription">}}). Redis 7.2 introduces several changes to existing Redis commands; see the [list of breaking changes]({{<relref "/rc/changelog/june-2023#redis-72-breaking-changes">}}) published in June's changelog for more details.

### Triggers and functions preview

A preview of [triggers and functions]({{<relref "/stack/triggers-functions">}}) (previously known as RedisGears) is now available in the following regions:

- AWS Asia Pacific - Singapore (`ap-southeast-1`)
- GCP Asia Pacific - Tokyo (`asia-northeast1`)

To use it, [create a fixed subscription]({{<relref "/rc/subscriptions/create-fixed-subscription">}}) in one of these regions. Then, [create your database]({{<relref "/rc/databases/create-database">}}) and set the database Type to Redis and select Triggers and Functions in the drop-down. Or, set the database Type to Redis Stack to get all of our advanced capabilities.

If you'd like to use triggers and functions with a [Flexible subscription]({{<relref "/rc/subscriptions/create-flexible-subscription">}}), contact [support](https://redis.com/company/support/).

For more information about triggers and functions, see the [triggers and functions documentation](https://redis.io/docs/interact/programmability/triggers-and-functions).

### Maintenance windows

You can now [set manual maintenance windows]({{<relref "/rc/subscriptions/maintenance/set-maintenance-windows">}}) if you want to control when Redis can perform [maintenance]({{<relref "/rc/subscriptions/maintenance">}}) for a Flexible subscription.

## Known issues

#### Invalid ACL rule causes failed state machine

Applying an invalid ACL rule to a database may cause a failed state machine. If this happens, use the [`PUT /v1/acl/redisRules/{aclRedisRuleId}`](https://api.redislabs.com/v1/swagger-ui/index.html#/Access%20Control%20List/updateRedisRule) API call to update the rule, and then delete it if necessary.

