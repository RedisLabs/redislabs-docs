---
Title: Redis Cloud changelog (November 2023)
linktitle: November 2023
description: New features, enhancements, and other changes added to Redis Cloud during November 2023.
highlights: Heroku add-on free database limit
weight: 74
alwaysopen: false
categories: ["RC"]
aliases: []
---

## Deprecations

### Heroku add-on free database limit

Heroku add-ons for [Redis Cloud](https://elements.heroku.com/addons/rediscloud) and [Memcached Cloud](https://elements.heroku.com/addons/memcachedcloud) are limited to one free database per Heroku account. As of November 1st, users will not be able to add a new free database if they already have one or more free databases. There will be no impact to existing free and paid databases.

Additionally, Heroku Review and CI Apps will provision a 100MB database for the [Redis Cloud](https://elements.heroku.com/addons/rediscloud) and [Memcached Cloud](https://elements.heroku.com/addons/memcachedcloud) add-on selections.