---
Title: Redis Cloud changelog (November 2023)
linktitle: November 2023
description: New features, enhancements, and other changes added to Redis Cloud during November 2023.
highlights: Low-cost Fixed plans, Redis 7.2 Fixed region support
weight: 74
alwaysopen: false
categories: ["RC"]
aliases: []
---

## New features

### Low-cost Fixed plans

Redis is introducing new low-cost [fixed subscriptions]({{<relref "/rc/subscriptions/create-fixed-subscription">}}) on Redis Cloud. These plans increase the capacity and lower the price compared to our previous fixed plans.

See [Fixed plan subscription tiers]({{<relref "/rc/subscriptions/create-fixed-subscription#fixed-plan-subscription-tiers">}}) to see an updated list of all Fixed plans.

### Redis 7.2 Fixed region support

You can now use Redis 7.2 on [fixed subscriptions]({{<relref "/rc/subscriptions/create-fixed-subscription">}}) in `us-east-1` on Amazon Web Services.

Redis 7.2 introduces several changes to existing Redis commands; see the [list of breaking changes]({{<relref "/rc/changelog/june-2023#redis-72-breaking-changes">}}) published in June's changelog for more details.

## Deprecations

### Heroku add-on free database limit

Heroku add-ons for [Redis Cloud](https://elements.heroku.com/addons/rediscloud) and [Memcached Cloud](https://elements.heroku.com/addons/memcachedcloud) are limited to one free database per Heroku account. As of November 1st, users will not be able to add a new free database if they already have one or more free databases. There will be no impact to existing free and paid databases.

Additionally, Heroku Review and CI Apps will provision a 100MB database for the [Redis Cloud](https://elements.heroku.com/addons/rediscloud) and [Memcached Cloud](https://elements.heroku.com/addons/memcachedcloud) add-on selections.

