---
Title: Redis Enterprise Software release notes 7.2
linkTitle: 7.2 releases
description: Redis 7.0 and 7.2 features. Three Redis database versions. Auto Tiering (enhanced successor to Redis on Flash). License file structure updates. Redis ACL selectors and enhanced key-based permissions. RESP3 support. Sharded pub/sub. Preview of the redesigned Cluster Manager UI. New INFO fields. Log rotation enhancements. Triggers and functions preview. Multi-OS upgrade support for clusters with modules.
compatibleOSSVersion: Redis 7.2
weight: 71
alwaysopen: false
toc: "true"
headerRange: "[1-2]"
categories: ["RS"]
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

## Detailed release notes

For more detailed release notes, select a build version from the following table:

{{<table-children columnNames="Version&nbsp;(Release&nbsp;date)&nbsp;,Major changes,OSS&nbsp;Redis compatibility" columnSources="LinkTitle,Description,compatibleOSSVersion" enableLinks="LinkTitle">}}

## Deprecations

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

## Supported platforms

<span title="Check mark icon">&#x2705;</span> Supported – The platform is supported for this version of Redis Enterprise Software.

<span title="Warning icon">&#x26A0;&#xFE0F;</span> Deprecated – The platform is still supported for this version of Redis Enterprise Software, but support will be removed in a future release.

<span title="X icon">&#x274c;</span> End of life – Platform support ended in this version of Redis Enterprise Software.

| Redis Enterprise | 7.2.0 | 6.4.2 | 6.2.18 | 6.2.12 | 6.2.10 | 6.2.8 | 6.2.4 |
|------------------|-------|-------|--------|--------|--------|--------|-------|
| **Ubuntu**<sup>[1](#table-note-1)</sup> |
| 20.04 | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span><sup>[6](#table-note-6)</sup> | – | – | – | – | – |
| 18.04 | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported"><span title="Supported">&#x2705;</span></span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| 16.04 | <span title="End of life">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| **RHEL & CentOS**<sup>[2](#table-note-2)</sup>
| 8.8 | <span title="Supported">&#x2705;</span> | – | – | – | – | – | – |
| 8.7 | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | – | – | – | – | – |
| 8.5-8.6 | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | – | – |
| 8.0-8.4 | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | – |
| 7.0-7.9 | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| **Oracle Linux**<sup>[3](#table-note-3)</sup> |
| 8 | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | – | – |
| 7 | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| **Rocky Linux**<sup>[3](#table-note-3)</sup> |
| 8 | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | – | – | – | – |
| **Amazon Linux** |
| 2 | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span><sup>[7](#table-note-7)</sup> | – | – | – | – | – |
| 1 | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| **Docker**<sup>[4](#table-note-4)</sup> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| **Kubernetes**<sup>[5](#table-note-5)</sup> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |

1. <a name="table-note-1" style="display: block; height: 80px; margin-top: -80px;"></a>The server version of Ubuntu is recommended for production installations. The desktop version is only recommended for development deployments.

2. <a name="table-note-2" style="display: block; height: 80px; margin-top: -80px;"></a>RHEL and CentOS deployments require OpenSSL 1.0.2 and [firewall configuration]({{<relref "/rs/installing-upgrading/configuring/centos-rhel-firewall">}}).

3. <a name="table-note-3" style="display: block; height: 80px; margin-top: -80px;"></a>Based on the corresponding RHEL version.

4. <a name="table-note-4" style="display: block; height: 80px; margin-top: -80px;"></a>
[Docker images]({{<relref "/rs/installing-upgrading/quickstarts/docker-quickstart">}}) of Redis Enterprise Software are certified for development and testing only.

5. <a name="table-note-5" style="display: block; height: 80px; margin-top: -80px;"></a>See the [Redis Enterprise for Kubernetes documentation]({{<relref "/kubernetes">}}).

6. <a name="table-note-6" style="display: block; height: 80px; margin-top: -80px;"></a>Ubuntu 20.04 support was added in Redis Enterprise Software [6.4.2-43]({{<relref "/rs/release-notes/rs-6-4-2-releases/rs-6-4-2-43">}}).

7. <a name="table-note-7" style="display: block; height: 80px; margin-top: -80px;"></a>A release candidate for Amazon Linux 2 support was added in Redis Enterprise Software [6.4.2-61]({{<relref "/rs/release-notes/rs-6-4-2-releases/rs-6-4-2-61">}}). Official support for Amazon Linux 2 was added in Redis Enterprise Software [6.4.2-69]({{<relref "/rs/release-notes/rs-6-4-2-releases/rs-6-4-2-69">}}).