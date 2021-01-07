---
Title: Redis Enterprise Software Release Notes 6.0.12 (January 2020)
description:
weight: 78
alwaysopen: false
categories: ["RS"]
---
[Redis Enterprise Software (RS) 6.0.12](https://redislabs.com/download-center/#downloads) is now available!
This version includes the following new features and improvements:

- [Synchronization](https://docs.redislabs.com/latest/rs/administering/designing-production/active-active/#syncer-process) can now be [distributed across the nodes](https://docs.redislabs.com/latest/rs/administering/cluster-operations/synchronization-mode/) of Active-Active or Active-Passive databases
- You can [disable several internal RS services](https://docs.redislabs.com/latest/rs/administering/troubleshooting/disabling-services/) to free up more memory
- User accounts can have multiple passwords to allow for [password rotation](https://docs.redislabs.com/latest/rs/administering/access-control/password-rotation/)
- [Dependencies are automatically installed](https://docs.redislabs.com/latest/modules/add-module-to-cluster/#adding-a-module-using-the-rest-api) when you add modules to a cluster
- [Envoy replaces nginx](https://docs.redislabs.com/latest/rs/administering/designing-production/networking/port-configurations/) for internal cluster administration
- Automatic recovery of the [syncer process](https://docs.redislabs.com/latest/rs/administering/designing-production/active-active/#syncer-process) from out-of-memory (preview mode)

And other functional and stability improvements.

### Version information

#### Upgrade instructions

- Follow [these instructions](https://docs.redislabs.com/latest/rs/installing-upgrading/upgrading/) for upgrading to RS 6.0.12 from RS 5.4.0 and above.
- For Active-Active deployments, this release requires that you [upgrade the CRDB featureset version](https://docs.redislabs.com/latest/rs/installing-upgrading/upgrading/#upgrading-activeactive-databases).

#### Product lifecycle information

- End of Life (EOL) for Redis Enterprise Software 6.0 and previous RS versions, can be found [here](https://docs.redislabs.com/latest/rs/administering/product-lifecycle/).
- EOL for Redis modules can be found [here](https://docs.redislabs.com/latest/modules/modules-lifecycle/#modules-endoflife-schedule).

#### Deprecation Notice

- Support for RS 5.4.X ended on December 31, 2020.
- Support for Red Hat Enterprise Linux 6 and Oracle Linux 6 and Ubuntu 14.04 (Trusty) operating systems platforms ended on November 30, 2020.
- This is the last RS version that supports direct upgrades from versions below 5.6.0.
- This is the last RS version that supports Active-Active protocol version below 1 and featureset version below 1.

### New Features

#### Distributed Syncer

The syncer process now supports running in a [distributed mode](https://docs.redislabs.com/latest/rs/administering/cluster-operations/synchronization-mode/). This option can improve the latency for Active-Active databases with a very high throughput profile. You can configure a replicated database to use distributed synchronization so that any available proxy endpoint can manage synchronization traffic.

#### Disabling RS services to free memory

Redis Software users can now use the REST API to [disable the following services](https://docs.redislabs.com/latest/rs/administering/troubleshooting/disabling-services/):

- cm_server
- mdns_server
- pdns_server
- stats_archiver
- saslauthd
- crdb_coordinator
- crdb_worker

Once disabled, services will not be monitored and controlled by the supervisord.

{{< warning >}}
This feature can cause unintended results if the cluster relies on the disabled services.
Make sure you understand the impact of disabled services and test the system in a lab environment before you deploy in production.
{{< /warning >}}

#### Support for multiple passwords

For users of Redis 6 and RS 6.0 and above, you can now add more security to your password management by maintaining multiple passwords for a user to allow seamless password rotation.

As of RS 6.0, you can assign specific data access permissions (Redis ACLs) and cluster administration permissions to users.
Password rotation is especially helpful so that you can do a rolling update of the passwords in the application clients that connect to the Redis databases.

In this version, you can only configure multiple passwords [using the REST API](https://docs.redislabs.com/latest/rs/administering/access-control/password-rotation/).

#### Redis Modules dependencies management

RedisGears GA and RedisAI GA require Redis Software to fetch and manage external dependencies.
Modules declare dependencies at release time in their ramp file.

In this version of RS, these dependencies are installed by Redis Software when the module is added to the cluster.
The master node downloads the required dependencies and prompts the other nodes to copy the dependencies from the master node.
When all dependency requirements are satisfied, the module installation is complete.
New nodes to the cluster also automatically install the dependencies.

#### Syncer automatic recovery from out-of-memory (Preview mode)

For Active-Active databases, the syncer process gracefully recovers from an out of memory (OOM) state.

Although Active-Active synchronization is bi-directional, in each direction we can define a source instance and a destination instance.
When a destination instance (that is, the instance running the syncer process) gets OOM, the syncer process attempts to automatically recover the data synchronization when memory becomes available.

This is a configurable option and currently under preview mode. This behavior will be GA and set as default in the next RS version.

### Redis modules

The following GA releases of Redis modules are bundled with RS 6.0.12:

- [RediSearch](https://redislabs.com/redis-enterprise/redis-search/), version [2.0.5](https://docs.redislabs.com/latest/modules/redisearch/release-notes/redisearch-2.0-release-notes/)
- [RedisJSON](https://redislabs.com/redis-enterprise/redis-json/), version [1.0.4](https://docs.redislabs.com/latest/modules/redisjson/release-notes/redisjson-1.0-release-notes/)
- [RedisGraph](https://redislabs.com/redis-enterprise/redis-graph/), version [2.2.11](https://docs.redislabs.com/latest/modules/redisgraph/release-notes/)
- [RedisTimeSeries](https://redislabs.com/redis-enterprise/redis-time-series/), version [1.4.7](https://docs.redislabs.com/latest/modules/redistimeseries/release-notes/)
- [RedisBloom](https://redislabs.com/redis-enterprise/redis-bloom/), version [2.2.4](https://docs.redislabs.com/latest/modules/redisbloom/release-notes/redisbloom-2.2-release-notes/)

To use the updated modules with a database, you must [upgrade the module on the database](https://docs.redislabs.com/latest/modules/upgrading-rs/#upgrading-the-module-for-the-database).

### Additional capabilities

- RS 6.0.12 includes open source Redis 6.0.6. For more information about Redis 6.0.6, check out the [release notes](https://raw.githubusercontent.com/redis/redis/6.0.6/00-RELEASENOTES).
- The bundled Nginx version was updated from version 1.16.0 to 1.18.0.

### Important fixes

- RS45627, RS47382 - Fixed bugs causing clients to disconnect when using XREAD and XREADGROUP commands in blocking mode on other clients’ connections.
- RS44656 - Fixed a bug causing TLS mode for clients connections to toggle between ‘all communication’ to ‘for crdb communication only’ when performing a global configuration change.
- RS42587 - Fixed a bug in the web UI console if the FQDN of the cluster is a substring of the FQDN of a participating cluster
- RS49404 - Fixed a bug in for upgrades with custom directories that prevent users from creating databases via the web UI console.
- RS43961 - bigkeys command fixed to handle non-printable key names
- RS45707 - Fixed a bug that caused RCP (Redis Cloud Pro) databases to reject connections while resharding the database.

### Known limitations

#### Upgrade

- [RS 5.4.2](https://docs.redislabs.com/latest/rs/release-notes/rs-5-4-2-april-2019/) introduced new Active-Active Redis Database capabilities that improve its compatibility with open source Redis. Now the string data-type in Active-Active Redis Database is implicitly and dynamically typed, just like open source Redis. To use the new capabilities on nodes that are upgraded from version RS 5.4.2 or lower, you must [upgrade the Active-Active Redis Database protocol](https://docs.redislabs.com/latest/rs/installing-upgrading/upgrading/#upgrading-crdbs).
- When you upgrade an Active-Active Redis with active AOF from version [RS 5.4.2](https://docs.redislabs.com/latest/rs/release-notes/rs-5-4-2-april-2019/) or earlier to version [RS 5.4.4](https://docs.redislabs.com/latest/rs/release-notes/rs-5-4-4-june-2019/) or later:
    - If replication is enabled, you must run the BGREWRITEAOF command on all slave shards after the upgrade.
    - If replication is not enabled, you must run the BGREWRITEAOF command on all shards after the upgrade.
- Node upgrade fails if the SSL certificates were configured in version 5.0.2 or above by manually updating the certificates on the disk instead of [updating them through the API](https://docs.redislabs.com/latest/rs/administering/cluster-operations/updating-certificates/). For assistance with this issue, contact Support.
- Starting from [RS 5.4.2](https://docs.redislabs.com/latest/rs/release-notes/rs-5-4-2-april-2019/), to preserve the current Redis major.minor version during database upgrade you must use the keep_redis_version option instead of keep_current_version.

#### Redis commands

- The capability of disabling specific Redis commands does not work on commands specific to Redis modules.
- CLIENT UNBLOCK command is not supported in RS 5.4 and above
- Starting from RS 5.4.2 and after upgrading the CRDB, TYPE commands for string data-type in CRDBs return "string" (OSS Redis standard).
