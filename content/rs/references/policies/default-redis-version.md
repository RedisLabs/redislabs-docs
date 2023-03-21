---
Title: Default Redis version
linkTitle: default_redis_version
description: The default Redis version used when you create or upgrade databases.
weight: $weight
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: 
---

When you [upgrade an existing database]({{<relref "/rs/installing-upgrading/upgrading#upgrade-a-database">}}) or [create a new one]({{<relref "/rs/databases/create">}}), it uses the default Redis version (`default_redis_version`) unless you specify the database version explicitly with `redis_version` in the [REST API]({{<relref "/rs/references/rest-api/requests/bdbs">}}) or [`rladmin upgrade db`]({{<relref "/rs/references/cli-utilities/rladmin/upgrade#upgrade-db">}}).

## Policy values

| Redis<br />Enterprise | Bundled Redis<br />DB versions | Default DB version<br />(upgraded/new databases) |
|-------|----------|-----|
| 6.2.x | 6.0, 6.2 | 6.0 |
| 6.4.2 | 6.0, 6.2 | 6.2 |

The version number should be in the form of "x.y" where _x_ represents the major version number and _y_ represents the minor version number.

You cannot set `default_redis_version` to a value higher than that supported by the current [`redis_upgrade_policy`]({{<relref "/rs/references/policies/redis-upgrade-policy">}}) value.

## Examples

To change the default Redis database version, use [`rladmin tune cluster`]({{<relref "/rs/references/cli-utilities/rladmin/tune#tune-cluster">}}):

```sh
rladmin tune cluster default_redis_version 6.2
```