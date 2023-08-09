---
Title: Redis Enterprise Software release notes 7.2-TBA (August 2023)
linkTitle: 7.2-TBA (August 2023)
description: Redis 7.0 and 7.2 features. Three Redis database versions. Auto Tiering (enhanced Redis on Flash with Speedb) and license updates. Redis ACL selectors and enhanced key-based permissions. RESP3 support. Sharded pub/sub. Preview of the redesigned Cluster Manager UI. New INFO fields. Log rotation enhancements. Triggers and functions preview. Multi-OS upgrade support for clusters with modules.
compatibleOSSVersion: Redis 7.2
weight: 72
alwaysopen: false
categories: ["RS"]
aliases: 
---

​[​Redis Enterprise Software version 7.2](https://redis.com/redis-enterprise-software/download-center/software/) is now available!

This version offers:

- Redis 7.0 and 7.2 features

- Three Redis database versions: 7.2, 6.2, 6.0

- Auto Tiering (enhanced successor to Redis on Flash)

- License file structure updates

- Redis ACL selectors and enhanced key-based permissions

- RESP3 support

- Sharded pub/sub

- A preview of the redesigned Cluster Manager UI (admin console)

- New INFO fields

- Log rotation enhancements

- Triggers and functions preview

- Multi-OS upgrade support for clusters with modules

The following table shows the MD5 checksums for the available packages:

| Package | MD5 checksum (7.2-TBA July release) |
|---------|---------------------------------------|
| Ubuntu 18 |  |
| Ubuntu 20 |  |
| RedHat Enterprise Linux (RHEL) 7<br/>Oracle Enterprise Linux (OL) 7 |  |
| RedHat Enterprise Linux (RHEL) 8<br/>Oracle Enterprise Linux (OL) 8 <br/>Rocky Enterprise Linux |  |
| Amazon Linux 2 |  |

## New features and enhancements

#### Redis 7.0 features

The following Redis 7.0 features are now supported:

- [Redis functions](https://redis.io/docs/interact/programmability/functions-intro/)

    In Redis Enterprise Software, [`FUNCTION STATS`](https://redis.io/commands/function-stats/) returns an extra parameter, an array called `all_running_scripts`, to reflect multiple functions running at the same time.

- [Multipart AOF](https://redis.io/docs/management/persistence/#append-only-file) (append-only files)

- New commands

- Sharded `PUBSUB` (see [Sharded pub/sub](#sharded-pubsub) for details)

#### Redis 7.2 features

The following Redis 7.2 features are now supported:

- Various performance improvements

- `CONFIG SET` for locale

- Connection layer modularization

- Encoding improvements: listpack for sets and lists

- Observability: authentication metrics (exposed by `INFO` command)

- Stream consumer group improvements

- Commands: `ZRANK`, `ZREVRANK` new `WITHSCORE` option

- Shard IDs in cluster shards topology

- Introduce shard ID to Redis cluster

- Support `CLIENT NO-TOUCH` command

- `WAIT AOF`

#### Three Redis database versions

Redis Enterprise Software version 6.x includes two Redis database versions: 6.0 and 6.2. As of version 7.2, Redis Enterprise Software includes three Redis database versions: 6.0, 6.2, and 7.2.

To view available Redis database versions:

- In the Cluster Manager UI, see **Redis database versions** on the **Cluster > Configuration** screen.

- Send a [`GET /nodes` REST API request]({{<relref "/rs/references/rest-api/requests/nodes">}}) and see `supported_database_versions` in the response.

The default Redis database version, which is used when you upgrade an existing database or create a new one, differs between Redis Enterprise releases as follows:

| Redis<br />Enterprise | Bundled Redis<br />DB versions | Default DB version<br />(upgraded/new databases) |
|-------|----------|-----|
| 7.2 | 6.0, 6.2, 7.2 | 7.2 |
| 6.4.2 | 6.0, 6.2 | 6.2 |
| 6.2.x | 6.0, 6.2 | 6.0 |

For Redis Enterprise Software version 7.2, `default_redis_version` is 7.2 for both `major` and `latest` upgrade policies.

#### Auto Tiering - Redis on Flash evolution doubling throughput while cutting latencies in half {#auto-tiering}

Redis Enterprise version 7.2 introduces Auto Tiering as an enhanced successor to Redis on Flash, which allows you to provision larger databases at a lower cost by extending the RAM with flash drives.

Redis Enterprise Auto Tiering replaces RocksDB with [Speedb](https://www.speedb.io/) as its storage engine, doubling the throughput and cutting latencies, achieved using the same infrastructure resources. For example, a 1 TB database with 50K ops/sec can now serve 100K ops/sec based on the same infrastructure.

To switch existing databases to use Speedb for Auto Tiering and improve performance:

1. Upgrade the cluster to Redis Enterprise Software version 7.2.

1. Upgrade each database with Auto Tiering enabled to Redis database version 7.2.

For more information about Auto Tiering, see:

- [Auto Tiering overview]({{<relref "/rs/databases/auto-tiering">}})

- [Auto Tiering quick start]({{<relref "/rs/databases/auto-tiering/quickstart">}})

#### Updated Redis Enterprise license format

Redis Enterprise Software version 7.2 includes updates to its license format, which add separate shard limits for RAM and flash shards used for Auto Tiering.

For more information, see [Cluster license keys]({{<relref "/rs/clusters/configure/license-keys">}}).

#### Redis ACL selectors and key-based permissions

Redis ACLs in Redis Enterprise version 7.2 support key permissions and selectors.

Key permissions:

- `%R~<pattern>`: Grants read access to keys that match the given pattern.

- `%W~<pattern>`: Grants write access to keys that match the given pattern.

- `%RW~<pattern>`: Alias for `~<pattern>`. Grants read and write access to keys that match the given pattern.

    See [key permissions](https://redis.io/docs/management/security/acl/#key-permissions) for more information.

Selectors let you define multiple sets of rules in a single Redis ACL (only supported for databases with Redis version 7.2 or later). A command is allowed if it matches the base rule or any selector in the Redis ACL. See [selectors](https://redis.io/docs/management/security/acl/#selectors) for more information.

- `(<rule list>)`: Creates a new selector.

- `clearselectors`: Deletes all existing selectors for a user. This action does not delete the base ACL rule.

Redis ACLs have the following differences in Redis Enterprise Software:

- Nested selectors are not supported.

    For example, the following selectors are not valid in Redis Enterprise: <nobr>`+GET ~key1 (+SET (+SET ~key2) ~key3)`</nobr>

- Key and pub/sub patterns do not allow the following characters: `'(', ')'`

- The following password configuration syntax is not supported: `'>', '<', '#!', 'resetpass'`

    To configure passwords in Redis Enterprise Software, use one of the following methods:

    - [`rladmin cluster reset_password`]({{<relref "/rs/references/cli-utilities/rladmin/cluster/reset_password">}}):
    
        ```sh
        rladmin cluster reset_password <user email>
        ```

    - REST API [`PUT /v1/users`]({{<relref "/rs/references/rest-api/requests/users#put-user">}}) request and provide `password`

- The **ACL builder** does not support selectors and key permissions. Use **Free text command** to manually define them instead.

#### RESP3 support

Support for RESP3 and the [`HELLO`](https://redis.io/commands/hello/) command was added in Redis Enterprise 7.2.

To use RESP3 with Redis Enterprise:

1. Upgrade Redis servers to version 7.2 or later.

    For Active-Active and Replica Of databases:
 
    1. Upgrade all participating clusters to Redis Enterprise version 7.2.x or later.
 
    1. Upgrade all databases to version 7.x or later.

1. Enable RESP3 support for your database (`enabled` by default):

    ```sh
    rladmin tune db db:<ID> resp3 enabled
    ```

If you run Redis Stack commands with Redis clients [Go-Redis](https://redis.uptrace.dev/) version 9 or [Lettuce](https://lettuce.io/) versions 6 and later, see [client prerequisites](#client-prerequisites-for-redis-72-upgrade) before you upgrade to Redis 7.2 to learn how to prevent potential application issues due to RESP3 breaking changes.

#### Sharded pub/sub

[Sharded pub/sub](https://redis.io/docs/interact/pubsub/#sharded-pubsub) is now supported.

You cannot use sharded pub/sub if you [deactivate RESP3 support]({{<relref "/rs/references/compatibility/resp#deactivate-resp3">}}).

#### New Cluster Manager UI preview

A preview of the redesigned Cluster Manager UI (admin console) is available in Redis Enterprise Software version 7.2.

To try out the new UI:

- On the sign-in screen:

    1. Enter your credentials.

    1. Select **Sign in the new interface**.

- Sign in directly from the new UI's sign-in screen at <nobr>`https://<hostname or IP address>:8443/new`</nobr>

- If you are currently signed in to the legacy UI:

    1. Select **Switch to the new Admin Console** to expand the banner at the top of the screen.
    
    1. Click the **Try it now** button to open the new UI in another tab.

##### New UI benefits

- User-driven design

- Provides full functionality to complete tasks entirely in the UI

- New attributes and improved feature visibility

- Provides configuration flexibility while highlighting the recommended path

- Addresses the needs of different personas and use cases

- Quicker troubleshooting and easier maintenance

##### New UI highlights

- More configurable database attributes, including replica high availability, shards placement, and proxy policy.

- Nodes indicate whether it’s a primary or secondary node.

- Modules show the databases that are using them.

- Certificates show expiration and validity, and you can upload and copy certificates.

- Cluster license displays the number of shards that are used out of the number of shards that are licensed to the cluster. The new UI allows you to paste or upload a new license.

- Role-based access control (RBAC) has explanations to improve clarity. 

- Access Control List (ACLs) now support defining ACLs for modules.

- The databases screen has more information per database for faster troubleshooting. It also allows you to filter databases and compare database metrics.

- The cluster name, user, and user role are shown in the upper right for quickly identifying the cluster from any screen. You can also **Change user password** from the dropdown menu.

- Auto Tiering licensing and a toggle for the storage engine used in Auto Tiering enabled databases (available only in the new UI).

- Input validations.

##### New UI limitations

The following features are not supported in this preview but will be added in future releases. Until then, temporarily switch to the legacy UI to do the following:

- Provision and configure Active-Active databases (viewing is available).

- Search and export the event log.

- Remove a node from the UI.

Additional limitations:

- Although Redis supports memcached databases, the new UI only allows view and delete. Memcached users are advised to migrate to Redis to enjoy the full benefits of Redis and its UI.

To open the legacy admin console when signed in to the new UI, select your username, then select **Switch to legacy Admin Console** from the list:

{{<image filename="images/rs/screenshots/switch-to-legacy-ui.png"  width="300px" alt="Select switch to legacy admin console from the dropdown.">}}{{</image>}}

##### Future UI enhancements

- Configure default database settings and database upgrade settings

- Security preferences related to password and login management

- LDAP improvements

- IPv6 support

- ACL improvements, such as ACLv2 smart validations

- And more

#### New INFO fields

The [`INFO`](https://redis.io/commands/info/) command includes new fields:

- Under the `STATS` section:

    - `current_eviction_exceeded_time` - Redis Enterprise reply is always “0”

    - `total_eviction_exceeded_time` - Redis Enterprise reply is always “0”

    - `current_active_defrag_time` - Redis Enterprise reply is always “0”

    - `total_active_defrag_time` - Redis Enterprise reply is always “0”

- Under the `MEMORY` section:

    - `maxmemory_policy` - The value of the `maxmemory-policy` configuration directive

The `INFO` command can now accept multiple section arguments (requires Redis database version 7 or later).

#### Log rotation enhancements

- The `logrotate` tool rotates logs that exceed 200 MB.

- `logrotate` runs every five minutes instead of once a day.

- The job scheduler runs `logrotate` instead of the OS.

- Every cluster upgrade overwrites the log rotation configuration.

- You can edit the log rotation configuration at `$pkgconfdir/logrotate.conf` (`pkgconfdir` is `/opt/redislabs/config` by default, but can be changed in a custom installation). Note that the configuration file moved since last version.

- You can change how often the `logrotate` tool runs using the job scheduler REST API request <nobr>`PUT /v1/job_scheduler`</nobr>.

#### Triggers and functions preview

A preview of triggers and functions is available in Redis Enterprise version 7.2. The triggers and functions feature provides for running JavaScript functions inside the Redis Process. These functions can be executed on-demand, by an event-driven trigger, or by a stream processing trigger.

The preview version of triggers and functions is not intended for production use since the API might change in the future and potentially cause application issues when upgrading to a later version. During preview, triggers and functions is not supported for databases with Auto Tiering enabled (previously known as Redis on Flash).

For the full terms, see the [Redis Enterprise Software Agreement](https://redis.com/software-subscription-agreement/).

#### Multi-OS upgrade support for clusters with modules {#os-upgrades-with-modules}

Starting from Redis Enterprise version 7.2, all future 7.2.x upgrades are supported for clusters containing databases with modules in combination with with Operating System (OS) upgrades.

#### Redis modules 

Redis Enterprise Software v7.2 includes the new features delivered in the latest [Redis Stack release 7.2](https://redis.com/blog/introducing-redis-stack-6-2-6-and-7-0-6/):

- TBA

See [Upgrade modules](https://docs.redis.com/latest/stack/install/upgrade-module/) to learn how to upgrade a module for a database.

## Version changes 

### Breaking changes

- Differences when using the `UNWATCH` command within a `MULTI` command sequence:

    - Redis Enterprise: `UNWATCH` is not allowed within a `MULTI` command sequence and returns an error.

    - OSS: `UNWATCH` is allowed within a `MULTI` sequence but has no effect.

- When sending a `PUBSUB SHARDNUMSUB` command in OSS Cluster mode in Redis Enterprise, Redis Enterprise checks the hash slots of the requested channels. Redis Enterprise responds with a `CROSSSLOT` error if the channels don’t hash to the same slot, or a `MOVED` error if the channels hash to a different node.

{{<embed-md "r7.2-combined-breaking-changes.md">}}

### Client prerequisites for Redis 7.2 upgrade

The Redis clients [Go-Redis](https://redis.uptrace.dev/) version 9 and [Lettuce](https://lettuce.io/) versions 6 and later use RESP3 by default. If you use either client to run Redis Stack commands, you should set the client's protocol version to RESP2 before upgrading your database to Redis version 7.2 to prevent potential application issues due to RESP3 breaking changes.

For applications using Go-Redis v9.0.5 or later, set the protocol version to RESP2:

```go
client := redis.NewClient(&redis.Options{
    Addr:     "<database_endpoint>",
    Protocol: 2, // Pin the protocol version
})
```

To set the protocol version to RESP2 with Lettuce v6 or later:

```java
import io.lettuce.core.*;
import io.lettuce.core.api.*;
import io.lettuce.core.protocol.ProtocolVersion;

// ...
RedisClient client = RedisClient.create("<database_endpoint>");
client.setOptions(ClientOptions.builder()
        .protocolVersion(ProtocolVersion.RESP2) // Pin the protocol version 	
        .build());
// ...
```

If you are using [LettuceMod](https://github.com/redis-developer/lettucemod/), you need to upgrade to [v3.6.0](https://github.com/redis-developer/lettucemod/releases/tag/v3.6.0).

### Upcoming changes

#### Prepare for restrictive pub/sub permissions

Redis database version 6.2 introduced pub/sub ACL rules that determine which [pub/sub channels](https://redis.io/docs/manual/pubsub/) a user can access.

The configuration option `acl-pubsub-default`, added in Redis Enterprise Software version 6.4.2, determines the cluster-wide default level of access for all pub/sub channels. Redis Enterprise Software uses the following pub/sub permissions by default:

- For versions 6.4.2 and 7.2, `acl-pubsub-default` is permissive (`allchannels` or `&*`) by default to accommodate earlier Redis versions.

- In future versions, `acl-pubsub-default` will change to restrictive (`resetchannels`). Restrictive permissions block all pub/sub channels by default, unless explicitly permitted by an ACL rule.

If you use ACLs and pub/sub channels, you should review your databases and ACL settings and plan to transition your cluster to restrictive pub/sub permissions in preparation for future Redis Enterprise Software releases.

When you change the cluster's default pub/sub permissions to restrictive, `&*` is added to the **Full Access** ACL. Before you make this change, consider the following:

- Because pub/sub ACL syntax was added in Redis 6.2, you can't associate the **Full Access** ACL with database versions 6.0 or lower after this change.

- The **Full Access** ACL is not reverted if you change `acl-pubsub-default` to permissive again.

- Every database with the default user enabled uses the **Full Access** ACL.

To secure pub/sub channels and prepare your cluster for future Redis Enterprise Software releases that default to restrictive pub/sub permissions:

1. Upgrade Redis databases:

    - For Redis Enterprise Software version 6.4.2, upgrade all databases in the cluster to Redis DB version 6.2.

    - For Redis Enterprise Software version 7.2, upgrade all databases in the cluster to Redis DB version 7.2 or 6.2.

1. Create or update ACLs with permissions for specific channels using the `resetchannels &channel` format.

1. Associate the ACLs with relevant databases.

1. Set default pub/sub permissions (`acl-pubsub-default`) to restrictive. See [Change default pub/sub permissions](#change-default-pubsub-permissions) for details.

1. If any issues occur, you can temporarily change the default pub/sub setting back to permissive. Resolve any problematic ACLs before making pub/sub permissions restrictive again.

#### Upcoming command request and reponse changes

Open source Redis version 7.2 changes the request and response policies for several commands. Because the GA release of Redis Enterprise version 7.2 does not include these policy changes, commands might behave differently from open source Redis. However, these changes will be included in a future Redis Enterprise maintenance release:

- [`RANDOMKEY`](https://redis.io/commands/randomkey/) and [`SCAN`](https://redis.io/commands/scan/) will change from no response policy to a `SPECIAL` response policy.

- [`MSETNX`](https://redis.io/commands/msetnx/) currently has a `MULTI_SHARD` request policy and `AGG_MIN` response policy. Both will change to no policy.

For more information about request and response policies, see [Redis command tips](https://redis.io/docs/reference/command-tips/).

### Deprecations

#### Command deprecations

- [`CLUSTER SLOTS`](https://redis.io/commands/cluster-slots) is deprecated as of Redis 7.0

- [`JSON.RESP`](https://redis.io/commands/json.resp/) is deprecated as of Redis Stack 7.2.

- [`QUIT`](https://redis.io/commands/quit/) is deprecated as of Redis 7.2

#### API deprecations

Deprecated fields:

- `smtp_use_tls` (replaced with `smtp_tls_mode`)

- `dns_address_master`

- `endpoint_node`

- `endpoint_ip`

- `public_addr` (replaced with `external_addr`)

- `default_shards_overbooking` (replaced with `shards_overbooking`)

- `bdb_high_syncer_lag` (replaced with `replica_src_high_syncer_lag` and `crdt_src_high_syncer_lag`)

- `bdb_syncer_connection_error`

- `bdb_syncer_general_error`

- `sync_sources` (replaced with `replica_sources` and `crdt_sources`)

- `sync` (replaced with `replica_sync` and `crdt_sync`)

- `ssl` (replaced with `tls_mode`)

- `node.bigstore_driver` (replaced with `cluster.bigstore_driver`)

- `auth_method`

- `use_ipv6` (replaced with `use_external_ipv6`)

- `redis_cleanup_job_settings` (replaced with `persistence_cleanup_scan_interval`)

- `import/rdb_url`

- `authentication_redis_pass` (replaced with multiple passwords feature in version 6.0.X)

- `logrotate_dir` (to be replaced with `logrotate_config` or removed)

Deprecated CLI commands:

- `rlutil change_master` (replaced with `rladmin change_master`)

- `rlutil reserved_ports` (replaced with `rladmin cluster config reserved_ports`)

Deprecated REST API requests:

- `POST /v1/modules` (replaced with `POST /v2/modules`)

#### Access control deprecations

- The following predefined roles and Redis ACLs are not available after upgrading to Redis Enterprise Software version 7.2 if they are not associated with any users or databases in the cluster:

    - Custom roles (not management roles): Cluster Member, Cluster Viewer, DB Member, DB Viewer, None.

    - Redis ACLs: Not Dangerous and Read Only.

- A deprecation notice for SASL-based LDAP was included in [previous Redis Enterprise Software release notes](https://docs.redis.com/latest/rs/release-notes/rs-6-2-4-august-2021/#deprecation-notices). When you upgrade to Redis Enterprise Software version 7.2, all existing "external" users (previously used to support SASL-based LDAP) will be removed.

#### RedisGraph

Redis has announced the end of life for RedisGraph. Redis will continue to support all RedisGraph customers, including releasing patch versions until January 31, 2025.

See the [RedisGraph end-of-life announcement](https://redis.com/blog/redisgraph-eol/) for more details.

#### RHEL and CentOS 7.0-7.9

Support for RHEL and CentOS 7.0-7.9 is considered deprecated and will be removed in a future release.

#### Oracle Linux 7

Oracle Linux 7 support is considered deprecated and will be removed in a future release.

#### Amazon Linux 1

Amazon Linux 1 support is considered deprecated and will be removed in a future release.

#### Ubuntu 16.04

The deprecation of Ubuntu 16.04 was announced in the [Redis Enterprise Software 6.4.2 release notes](http://localhost:1313/rs/release-notes/rs-6-4-2-releases/#deprecations). As of Redis Enterprise Software 7.2, Ubuntu 16.04 is no longer supported.

#### RC4 encryption cipher

The RC4 encryption cipher is considered deprecated in favor of stronger ciphers. Support for RC4 by the [discovery service]({{<relref "/rs/databases/durability-ha/discovery-service">}}) will be removed in a future release.

#### 3DES encryption cipher

The 3DES encryption cipher is considered deprecated in favor of stronger ciphers like AES.
Please verify that all clients, apps, and connections support the AES cipher. Support for 3DES will be removed in a future release.
Certain operating systems, such as RHEL 8, have already removed support for 3DES. Redis Enterprise Software cannot support cipher suites that are not supported by the underlying operating system.

#### TLS 1.0 and TLS 1.1

TLS 1.0 and TLS 1.1 connections are considered deprecated in favor of TLS 1.2 or later.
Please verify that all clients, apps, and connections support TLS 1.2. Support for the earlier protocols will be removed in a future release.
Certain operating systems, such as RHEL 8, have already removed support for the earlier protocols. Redis Enterprise Software cannot support connection protocols that are not supported by the underlying operating system.

## Resolved issues

- RS54131 - `+OK` reply not received on TLS-enabled database

- RS101525 - Cluster provides wrong number of database connections on Grafana

- RS104028 - Fix the self-signed certificate script: error generating certificates with multiple FQDNs

- RS87920 - Proxy log is full of the warning message “Failed to check status of running child syncer process 0 : No child processes“

## Known limitations

### Feature limitations

#### Command limitations

- [`CLIENT NO-TOUCH`](https://redis.io/commands/client-no-touch/) might not run correctly in the following cases:

    - The Redis database version is earlier than 7.2.0.

    - The `CLIENT NO-TOUCH` command is forbidden by ACL rules.

    Before sending this command, clients should verify the database version is 7.2.0 or later and that using this command is allowed. 

- You cannot use [`SUNSUBSCRIBE`](https://redis.io/commands/sunsubscribe/) to unsubscribe from a shard channel if the regex changed while subscribed.

- Using [`XREADGROUP BLOCK`](https://redis.io/commands/xreadgroup/) with `>` to return all new streams will cause the Redis database to freeze until the shard is restarted. ([#12031](https://github.com/redis/redis/pull/12301))

- Because a rejected command does not record the duration for command stats, an error will appear after it is reprocessed that will cause the Redis database to freeze until the shard is restarted. ([#12247](https://github.com/redis/redis/pull/12247))

#### Pub/sub channel ACL limitations

In Redis Enterprise Software version 6.4.2, you could use `&channel` syntax in Redis ACL rules to allow access to specific pub/sub channels even when default pub/sub permissions were permissive (`&allchannels` or `&*`), allowing all channels by default. However, `&allchannels &channel` is not valid syntax.

As of Redis Enterprise Software version 7.2, you cannot create Redis ACLs with this combination of rules. You can only use `&channel` to allow access to specific channels if the default pub/sub permissions are restrictive (`resetchannels`).

Associating an ACL that contains the invalid syntax <nobr>`&allchannels &channel`</nobr> (created before version 7.2) with a user and database might leave the database in a pending state, unable to function.

To prevent this issue:

1. Review all existing ACL rules.

1. For each rule containing `&channel`, either:

    - Add the `resetchannels` prefix to restrict access to all channels by default.
    
    - Delete the rule if not needed.

## Security

#### Open source Redis security fixes compatibility

As part of Redis's commitment to security, Redis Enterprise Software implements the latest [security fixes](https://github.com/redis/redis/releases) available with [open source Redis](https://github.com/redis/redis). The following open source Redis [CVEs](https://github.com/redis/redis/security/advisories) do not affect Redis Enterprise:

- [CVE-2021-32625](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-32625) — Redis Enterprise is not impacted by the CVE that was found and fixed in open source Redis since Redis Enterprise does not implement LCS. Additional information about the open source Redis fix is on the [Redis GitHub page](https://github.com/redis/redis/releases) (Redis 6.2.4, Redis 6.0.14)

- [CVE-2021-32672](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-32672) — Redis Enterprise is not impacted by the CVE that was found and fixed in open source Redis because the LUA debugger is unsupported in Redis Enterprise. Additional information about the open source Redis fix is on the [Redis GitHub page](https://github.com/redis/redis/releases) (Redis 6.2.6, Redis 6.0.16)

- [CVE-2021-32675](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-32675) — Redis Enterprise is not impacted by the CVE that was found and fixed in open source Redis because the proxy in Redis Enterprise does not forward unauthenticated requests. Additional information about the open source Redis fix is on the [Redis GitHub page](https://github.com/redis/redis/releases) (Redis 6.2.6, Redis 6.0.16)

- [CVE-2021-32762](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-32762) — Redis Enterprise is not impacted by the CVE that was found and fixed in open source Redis because the memory allocator used in Redis Enterprise is not vulnerable. Additional information about the open source Redis fix is on the [Redis GitHub page](https://github.com/redis/redis/releases) (Redis 6.2.6, Redis 6.0.16)

- [CVE-2021-41099](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-41099) — Redis Enterprise is not impacted by the CVE that was found and fixed in open source Redis because the `proto-max-bulk-len CONFIG` is blocked in Redis Enterprise. Additional information about the open source Redis fix is on the [Redis GitHub page](https://github.com/redis/redis/releases) (Redis 6.2.6, Redis 6.0.16)

Redis Enterprise has already included the fixes for the relevant CVEs. Some CVEs announced for open source Redis do not affect Redis Enterprise due to different and additional functionality available in Redis Enterprise that is not available in open source Redis.
