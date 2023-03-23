---
Title: Redis upgrade policy
linkTitle: redis_upgrade_policy
description: Redis Enterprise upgrade policy. 
weight: $weight
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: 
---

In version 6.2.4, Redis Enterprise Software introduced the Redis database compatibility upgrade policy (`redis_upgrade_policy`). This policy limits the [default Redis version]({{<relref "/rs/references/policies/default-redis-version">}}) when creating or updating databases.

Changes to the upgrade policy do not affect existing databases. The policy is used only when you create a new database, upgrade a database, or change its configuration.

For best results, change the policy value only after upgrading to a major release of Redis Enterprise Software.

## Policy values

| Value | Description |
|-------|-------------|
| latest | Limits compatibility to the latest (most recent) version of open source Redis supported by your copy of Redis Enterprise Software (default behavior for Redis Enterprise versions earlier than v6.2.4) |
| major  | Limits Redis compatibility to major releases (default policy for Redis Enterprise v6.2.4 and later) |

As of v6.2.4, `redis_upgrade_policy` defaults to `major`, which limits Redis database compatibility to the most recent major release.

If you change the policy to `latest`, you need to upgrade Redis Enterprise Software with each minor release. Furthermore, leave the policy set to `latest` until the next major release of Redis Enterprise Software, which generally happens every 18-24 months.

## Examples

The Redis Enterprise Software 6.2.4 package included compatibility with the most recent major Redis release (v6.0 at the time) and the most recent update to Redis (v6.2.3 at the time).

By default, the upgrade included compatibility with v6.0.

To change this to use the latest release available, use [`rladmin tune cluster`]({{<relref "/rs/references/cli-utilities/rladmin/tune#tune-cluster">}}) to set the upgrade policy:

```sh
rladmin tune cluster redis_upgrade_policy latest
```