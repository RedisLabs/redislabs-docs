---
Title: Redis Enterprise Software release notes 6.4.2-TBA (May 2023)
linkTitle: 6.4.2-TBA (May 2023)
description: Amazon Linux 2 support. Configure envoy ports using rladmin. Added option to avoid specific nodes when using the optimized shards placement API.
compatibleOSSVersion: Redis 6.2.6
weight: 69
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: 
---

This is a maintenance release for ​[​Redis Enterprise Software version 6.4.2](https://redis.com/redis-enterprise-software/download-center/software/).

The following table shows the MD5 checksums for the available packages:

| Package | MD5 checksum (6.4.2-tba May release) |
|---------|---------------------------------------|
| Ubuntu 16 |  |
| Ubuntu 18 |  |
| Ubuntu 20 |  |
| RedHat Enterprise Linux (RHEL) 7<br/>Oracle Enterprise Linux (OL) 7 |  |
| RedHat Enterprise Linux (RHEL) 8<br/>Oracle Enterprise Linux (OL) 8 <br/>Rocky Enterprise Linux |  |
| Amazon Linux 2 |  |

## New features and enhancements

- Amazon Linux 2 support

- Enhanced installation logs (RS69079, RS69571, RS89760)

- Added support for `rladmin` envoy port configuration (RS95483)

- Support the option to avoid specific nodes when using optimized shards placement API  (RS98795)

#### Redis Stack v6.2.6

Redis Enterprise Software v6.4.2 includes the new features delivered in the latest [Redis Stack release (6.2.6 v6)](https://redis.com/blog/introducing-redis-stack-6-2-6-and-7-0-6/):

- [RediSearch v2.6.6](https://docs.redis.com/latest/modules/redisearch)

- [RedisJSON v2.4.6](https://docs.redis.com/latest/modules/redisjson)

- [RedisBloom v2.4.5](https://docs.redis.com/latest/modules/redisbloom)

- [RedisGraph v2.10.9](https://docs.redis.com/latest/modules/redisgraph)

- [RedisTimeSeries v1.8.9](https://docs.redis.com/latest/modules/redistimeseries)

See [Upgrade modules](https://docs.redis.com/latest/modules/install/upgrade-module/) to learn how to upgrade a module for a database.

## Version changes

### Deprecations

#### watchdog_profile

The `watchdog_profile` setting is deprecated and will be removed in a future release. Instead, use the `failure_detection_sensitivity` policy for predefined thresholds and timeouts:

```sh
rladmin tune cluster failure_detection_sensitivity [ high | low ]
```

The `failure_detection_sensitivity` policy has the following options:

- `high` (previously known as `local-network watchdog_profile`) – high failure detection sensitivity, lower thresholds, and faster failure detection and failover

- `low` (previously known as `cloud watchdog_profile`) – low failure detection sensitivity and higher tolerance for latency variance (also called network jitter)

#### Ubuntu 16.04

Ubuntu 16 support is deprecated and will be removed in a future release.

#### Active-Active database persistence

The RDB snapshot option for [Active-Active database persistence]({{<relref "/rs/databases/active-active/manage#data-persistence">}}) is deprecated and will be removed in a future release.

Please plan to reconfigure any Active-Active databases to use append-only file (AOF) persistence with the following command:

```sh
crdb-cli crdb update --crdb-guid <CRDB_GUID> \
    --default-db-config '{"data_persistence": "aof", "aof_policy":"appendfsync-every-sec"}'
```

## Resolved issues

- RS97528 - Prevent [self-signed certificate]({{<relref "/rs/security/certificates/create-certificates">}}) script error on Ubuntu 20.04 by changing the user instructions.

- RS99643 - Fix [`cipher_suites`]({{<relref "/rs/security/tls/ciphers">}}) configuration to allow default values: `HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH`

## Known limitations

### Operating system limitations

#### Ubuntu 20.04

By default, you cannot use the SHA1 hash algorithm ([OpenSSL’s default security level is set to 2](https://manpages.ubuntu.com/manpages/focal/man3/SSL_CTX_set_security_level.3ssl.html#notes)). The operating system will reject SHA1 certificates even if the `mtls_allow_weak_hashing` option is enabled. You need to replace SHA1 certificates with newer certificates that use SHA-256. Note that the certificates provided with Redis Enterprise Software use SHA-256.
