---
Title: Redis Enterprise Cloud changelog (August 2023)
linktitle: August 2023
description: New features, enhancements, and other changes added to Redis Enterprise Cloud during August 2023.
highlights: Redis 7.2 Opt-in for Flexible subscriptions
weight: 80
alwaysopen: false
categories: ["RC"]
aliases: []
---

This changelog lists new features, enhancements, and other changes added to Redis Enterprise Cloud during August 2023.

## New features

### Redis 7.2 flexible opt-in

You can opt in to Redis 7.2 on [Flexible subscriptions]({{<relref "/rc/subscriptions/create-flexible-subscription">}}). Redis 7.2 introduces several changes to existing Redis commands; see the [list of breaking changes]({{<relref "/rc/changelog/june-2023#redis-72-breaking-changes">}}) published in June's changelog for more details.

### Triggers and Functions support

[Triggers and Functions](https://redis.com/redis-enterprise/triggers-and-functions/) (previously known as RedisGears) is now available when you select Redis Stack when you [create a database]({{<relref "/rc/databases/create-database">}}) and use [Redis 7.2]({{<relref "/rc/changelog/june-2023##redis-72-opt-in">}}).

For more information about Triggers and Functions, see the [Triggers and Functions documentation](https://redis.io/docs/interact/triggers-and-functions/).

### Maintenance windows

You can now [set manual maintenance windows]({{<relref "/rc/subscriptions/maintenance/set-maintenance-windows">}}) if you want to control when Redis can perform [maintenance]({{<relref "/rc/subscriptions/maintenance">}}) for a Flexible subscription.

## Known issues

#### Incorrect ACL rule causes failed state machine

Applying an invalid ACL rule to a database may cause a failed state machine. If this happens, use the [`PUT /v1/acl/redisRules/{aclRedisRuleId}`](https://api.redislabs.com/v1/swagger-ui/index.html#/Access%20Control%20List/updateRedisRule) API call to update the rule, and then delete it if necessary.