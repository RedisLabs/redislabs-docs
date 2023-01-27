---
Title: Redis upgrade policy
linkTitle: redis_upgrade_policy
description: Redis Enterprise upgrade policy 
weight: $weight
alwaysopen: false
toc: "true"
headerRange: "[1-2]"
categories: ["RS"]
aliases: 
---

In version 6.2.4, Redis Enterprise Software introduced the Redis database compatibility upgrade policy (`redis_upgrade_policy`). This policy controls the default value for the Redis database compatibility when creating or updating databases.

<!-- TODO: explain default_redis_version since this policy limits it -->

Changes to the upgrade policy do not affect existing databases. The policy is used only when you create a new database, upgrade a database, or change its configuration.

For best results, we recommend changing the policy value only after upgrading to a major release of Redis Enterprise Software.

## Values

| Value | Description |
|-------|-------------|
| latest | Limits compatibility to the latest (most recent) version of open source Redis supported by your copy of Redis Enterprise Software (default behavior for Redis Enterprise versions earlier than v6.2.4) |
| major  | Limits Redis compatibility to major releases (default policy for Redis Enterprise v6.2.4 and later) |

As of v6.2.4, `redis_upgrade_policy` defaults to `major`, which limits Redis database compatibility to the most recent major release.

If you change the policy to `latest`, you need to upgrade Redis Enterprise Software every time there’s a minor release. Further, you’ll need to leave the policy set to `latest` until the next major release of Redis Enterprise Software, which generally happens every 18-24 months.

## Example

To demonstrate: The Redis Enterprise Software 6.2.4 package included compatibility with the most recent major Redis release (v6.0 at the time) and the latest (most recent) update to Redis (v6.2.3 at the time).

By default, compatibility with v6.0 was installed with the upgrade.

To change this to use the latest release available, use [`rladmin tune cluster`]({{<relref "/rs/references/cli-utilities/rladmin/tune#tune-cluster">}}) to set the upgrade policy and the default Redis version:

```sh
$ rladmin tune cluster redis_upgrade_policy latest
$ rladmin tune cluster default_redis_version 6.2
```