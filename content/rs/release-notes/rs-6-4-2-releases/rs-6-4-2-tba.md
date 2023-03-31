---
Title: Redis Enterprise Software release notes 6.4.2-TBA (April 2023)
linkTitle: 6.4.2-TBA (April 2023)
description: Amazon Linux 2 support. Fixed known limitations for custom installation on RHEL 7 and RHEL 8, running rl_rdbconvert manually, and resharding rack-aware databases with no replication.
compatibleOSSVersion: Redis 6.2.6
weight: 70
alwaysopen: false
categories: ["RS"]
aliases: 
---

This is a maintenance release for ​[​Redis Enterprise Software version 6.4.2](https://redis.com/redis-enterprise-software/download-center/software/).

The following table shows the MD5 checksums for the available packages:

| Package | MD5 checksum (6.4.2-TBA April release) |
|---------|---------------------------------------|
| Ubuntu 16 |  |
| Ubuntu 18 |  |
| Ubuntu 20 |  |
| RedHat Enterprise Linux (RHEL) 7<br/>Oracle Enterprise Linux (OL) 7 |  |
| RedHat Enterprise Linux (RHEL) 8<br/>Oracle Enterprise Linux (OL) 8 <br/>Rocky Enterprise Linux |  |
| Amazon Linux 2 (RC) |  |

## New features and enhancements

- Amazon Linux 2 supported as a release candidate (RC)

    {{<note>}}
A database with modules cannot reside on an Amazon Linux 2 (release candidate) node. Support will be added in a future maintenance release.
    {{</note>}}

- Add node ID indication to [`debug_info` package]({{<relref "/rs/references/cli-utilities/rladmin/cluster/debug_info">}}) (RS95360)

- Add support for underscore ‘_’ as a valid character for [rack awareness]({{<relref "/rs/clusters/configure/rack-zone-awareness">}}) (RS87458)

- When updating a [BDB object]({{<relref "/rs/references/rest-api/objects/bdb">}}), the version property is immutable. Any validation will be performed according to the BDB object version that was set during upgrade or install (RS93294)

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

#### Ubuntu 16.04

Ubuntu 16 support is deprecated and will be removed in a future release.

#### Active-Active database persistence

The RDB snapshot option for [Active-Active database persistence]({{<relref "/rs/databases/active-active/manage#data-persistence">}}) is deprecated and will be removed in a future release.

Please plan to reconfigure any Active-Active databases to use AOF (Append Only File) persistence with the following command:

```sh
crdb-cli crdb update --crdb-guid <CRDB_GUID> \
    --default-db-config '{"data_persistence": "aof", "aof_policy":"appendfsync-every-sec"}'
```

## Resolved issues

- RS95344 - Fixed known limitation for RHEL 7 and RHEL 8 where CRDB databases fail to start when installed using custom installation paths

- RS88010 - Roll back node configuration when the [remove node]({{<relref "/rs/clusters/remove-node">}}) operation fails

- RS95824 - Fixed an issue with running `rl_rdbconvert` on Ubuntu

- RS97971 - Fixed known limitation for the edge case where resharding fails for rack-aware databases with no replication

## Known limitations

### Operating system limitations

#### Ubuntu 20.04

By default, you cannot use the SHA1 hash algorithm ([OpenSSL’s default security level is set to 2](https://manpages.ubuntu.com/manpages/focal/man3/SSL_CTX_set_security_level.3ssl.html#notes)). The operating system will reject SHA1 certificates even if the `mtls_allow_weak_hashing` option is enabled. You need to replace SHA1 certificates with newer certificates that use SHA-256. Note that the certificates provided with Redis Enterprise Software use SHA-256.

#### Modules not supported for Amazon Linux 2 release candidate

A database with modules cannot reside on an Amazon Linux 2 (release candidate) node. Support will be added in a future maintenance release.
