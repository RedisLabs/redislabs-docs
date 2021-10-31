---
Title: Redis Enterprise Software Release Notes 6.0.8 (September 2020)
linkTitle: 6.0.8 (September 2020)
description: RediSearch 2.0 support. Improved rladmin support for module upgrades. Compatible with open source Redis 6.0.5 
weight: 79
alwaysopen: false
categories: ["RS"]
---
[Redis Enterprise Software (RS) 6.0.8](https://redislabs.com/download-center/#downloads) is now available!
This version includes the new RediSearch 2.0 module, open source Redis 6.0.5, changes the rladmin tool for upgrading modules, and includes bug fixes.

## Version information

### Upgrade instructions

Follow [these instructions]({{< relref "/rs/installing-upgrading/upgrading.md" >}}) for upgrading to RS 6.0.8 from RS 5.4.0 and above.
For Active-Active deployments, this release requires that you [upgrade the CRDB featureset version]({{< relref "/rs/installing-upgrading/upgrading#upgrade-activeactive-databases" >}}).

### End of life

End of Life (EOL) for Redis Enterprise Software 6.0 and previous RS versions, can be found [here]({{< relref "/rs/administering/product-lifecycle.md" >}}).
EOL for Redis Modules can be found [here]({{< relref "/rs/administering/product-lifecycle.md" >}}).

- Support for Red Hat Enterprise Linux 6 and Oracle Linux 6 [operating systems platforms]({{< relref "/rs/installing-upgrading/supported-platforms.md" >}}) will end on November 30, 2020.
- Support for Ubuntu 14.04 (Trusty Tahr) [operating systems platforms]({{< relref "/rs/installing-upgrading/supported-platforms.md" >}}) will end on November 30, 2020.

## New features

### Open source Redis 6

RS 6.0 includes open source Redis 6.0.5.
For more information about Redis 6.0.5, check out the [release notes](https://raw.githubusercontent.com/redis/redis/6.0.5/00-RELEASENOTES).

### Upgrading Redis modules via rladmin

The [rladmin CLI]({{<relref "/rs/references/rladmin.md">}}) introduces several updates to the commands for upgrading modules.
It is now easier to upgrade your modules to the latest module version.
Find out more [here]({{<relref "/modules/add-module-to-cluster#upgrading-the-module-for-the-database">}}).

## Redis modules

The following GA releases of Redis Modules are bundled in RS 6.0:

- [RediSearch](https://redislabs.com/redis-enterprise/redis-search/), version [2.0]({{< relref "/modules/redisearch/release-notes/_index.md" >}}) (updated)
- [RedisJSON](https://redislabs.com/redis-enterprise/redis-json/), version [1.0.4]({{< relref "/modules/redisjson/release-notes/redisjson-1.0-release-notes.md" >}})
- [RedisGraph](https://redislabs.com/redis-enterprise/redis-graph/), version [2.0.19]({{< relref "/modules/redisgraph/release-notes/redisgraph-2.0-release-notes.md" >}}) (updated)
- [RedisTimeSeries](https://redislabs.com/redis-enterprise/redis-time-series/), version [1.2.7]({{< relref "/modules/redistimeseries/release-notes/redistimeseries-1.2-release-notes.md" >}}) (updated)
- [RedisBloom](https://redislabs.com/redis-enterprise/redis-bloom/), version [2.2.4]({{< relref "/modules/redisbloom/release-notes/redisbloom-2.2-release-notes.md" >}}) (updated)

To use the updated modules with a database, you must [upgrade the module on the database]({{< relref "/modules/add-module-to-cluster#upgrading-the-module-for-the-database" >}}).

## Additional capabilities

- [Shard level metrics]({{< relref "/rs/administering/monitoring-metrics/prometheus-metrics-definitions#shard-metrics" >}}) have been added to the metrics_exporter and are now available from Prometheus. You can find all of the metrics [here]({{< relref "/rs/administering/monitoring-metrics/prometheus-metrics-definitions" >}}).

- RS DEB packages (for Ubuntu) and RPM packages (for RHEL) are now signed with a GPG key so customers can verify that the package is authentic and has not been tampered with. You can access the GPG on the [installaion page]({{<relref "/rs/installing-upgrading#installing-rs-on-linux">}}).

- The [crdb-cli]({{<relref "/rs/references/crdb-cli-reference.md">}}) history log is now being added to support packages.

## Important fixes

- RS33193 - Improved log files handling in the proxy for large files.
- RS43572 - Fixed a bug causing the UI to fail when enabling SMTP STARTLS.
- RS46062 - Fixed missing metrics of Active-Active databases in Grafana.
- RS44758 - Fixed non responding button for saving a new user via the UI.
With build 6.0.8-32:
- RS45627, RS47382 - Fixed bugs causing clients to disconnect when using XREAD and XREADGROUP commands in blocking mode on other clients’ connections.

## Known limitations

### Active-Active databases
- RS44656 - A bug causing TLS mode for clients connections to toggle between ‘all communication’ to ‘for crdb communication only’ when performing a global configuration change. ***TBD***
- RS51359 - Active-Active databases, using replication and Append Only File (AOF) for [Database Persistence]({{< relref "rs/concepts/data-access/persistence.md" >}}) are suffering from memory leak on slave the shards causing them to grow bigger than the master shards. Customers are advised to upgrade to RS 6.0.12 ***TBD***. Meanwhile you can use snapshot for Database Persistence or restart the slave shards ***TBD***.

### Upgrade

- [RS 5.4.2]({{< relref "rs/release-notes/legacy-release-notes/rs-5-4-2-april-2019.md" >}}) introduced new Active-Active Redis Database capabilities that improve its compatibility with open source Redis. Now the string data-type in Active-Active Redis Database is implicitly and dynamically typed, just like open source Redis. To use the new capabilities on nodes that are upgraded from version RS 5.4.2 or lower, you must [upgrade the Active-Active Redis Database protocol]({{< relref "/rs/installing-upgrading/upgrading#upgrading-crdbs" >}}).
- When you upgrade an Active-Active Redis with active AOF from version [RS 5.4.2]({{< relref "rs/release-notes/legacy-release-notes/rs-5-4-2-april-2019.md" >}}) or lower to version [RS 5.4.2]({{< relref "rs/release-notes/legacy-release-notes/rs-5-4-4-june-2019.md" >}}) or higher:
    - If replication is enabled, you must run the BGREWRITEAOF command on all slave shards after the upgrade.
    - If replication is not enabled, you must run the BGREWRITEAOF command on all shards after the upgrade.
- Node upgrade fails if the SSL certificates were configured in version 5.0.2 or above by manually updating the certificates on the disk instead of [updating them through the API]({{< relref "/rs/administering/cluster-operations/updating-certificates.md" >}}).
    For assistance with this issue, contact [Support](https://redislabs.com/support).
- Starting from [RS 5.4.2]({{< relref "rs/release-notes/legacy-release-notes/rs-5-4-2-april-2019.md" >}}), to preserve the current Redis major.minor version during database upgrade you must use the keep_redis_version option instead of keep_current_version.

### Redis commands

- The capability of disabling specific Redis commands does not work on commands specific to Redis Modules.
- Starting from RS 5.4.2 and after you upgrade an Active-Active database, TYPE commands for string data-type in Active-Active databases return "string" (OSS Redis standard).
