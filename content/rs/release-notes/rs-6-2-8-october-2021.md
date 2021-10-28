---
Title: Redis Enterprise Software Release Notes 6.2.8 (October 2021)
linkTitle: 6.2.8 (October 2021)
description: RHEL 8 support. Set backup start time. Compatible with open source Redis 6.2.3.
weight: 75
alwaysopen: false
categories: ["RS"]
aliases: /rs/release-notes/rs-6-2-8-october-2021/
         /rs/release-notes/rs-6-2-8-october-2021.md
---

[Redis Enterprise Software version 6.2.8](https://redislabs.com/redis-enterprise-software/download-center/software/) is now available! 

## Features and enhancements

This version features:

- Support for Red Hat Linux Edition 8
- You can now set the start time for [12- and 24-hour backups]({{<relref "/rs/administering/import-export/database-backup.md">}}) 
- Compatibility with version of [open source Redis 6.2.3](https://github.com/redis/redis/releases/tag/6.2.3) (starting with [Redis Enterprise Software v6.2.4]({{<relref "/rs/release-notes/rs-6-2-4-august-2021.md">}})
- Compatibility with the security fixes of the latest [open source Redis 6.2.6](https://github.com/redis/redis/releases/tag/6.2.6)
- Enhancements and bug fixes

## Version changes

### Prerequisites and notes

- You can [upgrade to v6.2.8]({{<relref "/rs/installing-upgrading/upgrading.md">}}) from Redis Enterprise Software v6.0 and later. 

- Refer to the [v6.2.4 release notes]({{<relref "/rs/release-notes/rs-6-2-4-august-2021.md">}}) for important notes regarding the upgrade process.

- Upgrades from versions earlier than v6.0 are not supported

### Product lifecycle updates

Redis Enterprise Software v5.6.0 will reach end of life (EOF) on October 31, 2021.

To learn more, see the Redis Enterprise Software [product lifecycle]({{<relref "/rs/administering/product-lifecycle.md">}}), which details the release number and the end-of-life schedule for Redis Enterprise Software.

Redis Enterprise modules have individual release numbers [and lifecycles]({{<relref "/modules/modules-lifecycle.md">}}).

### Redis modules

Redis Enterprise Software v6.2.8 includes the following Redis modules:

- [RediSearch v2.0.11]({{<relref "/modules/redisearch/release-notes/redisearch-2.0-release-notes.md">}})
- [RedisJSON v1.0.8]({{<relref "/modules/redisjson/release-notes/redisjson-1.0-release-notes.md">}})
- [RedisBloom v2.2.6]({{<relref "/modules/redisbloom/release-notes/redisbloom-2.2-release-notes.md">}}) 
- [RedisGraph v2.4.7]({{<relref "/modules/redisgraph/release-notes/redisgraph-2.4-release-notes.md">}})
- [RedisTimeSeries v1.4.10]({{<relref "/modules/redistimeseries/release-notes/redistimeseries-1.4-release-notes.md">}})

To learn more, see [Upgrade the module for a database]({{<relref "/modules/add-module-to-cluster.md#upgrading-the-module-for-the-database.md#upgrading-the-module-for-the-database">}}).

## Resolved issues

- RS58804 - Fixed the UI to display an error message in case of a login attempt with an LDAP user
- RS56680 - Fixed the UI to notify that SASLAUTHD should be disabled prior to enabling LDAP 
- RS55844 - Fixed the UI to use the correct password and mask it on LDAP password update
- RS60877 - Fixed the UI console from resetting an Active-Active database compression level, in cases where the compression level wasn’t set to default, when changing any other configuration via the DB configuration page
- RS43999 - Fixed UI database configuration to allow changes when SFTP SSH key is customized
- RS59861 - Fixed the UI to display an explanation error message when password complexity does not meet requirements
- RS57734 - Fixed inaccessible UI after cluster upgrade due to missing certificate
- RS43041 - Mask secret keys for backup destination for view and edit in the UI
- RS60068 / RS59146 - Fixed unresolve endpoint due to PDNS issues
- RS52812 - Expand API wrapper to return API 405 errors as JSON/XML
- RS57666 - Fixed false shard migration message when the shard fails to bind the port
- RS57444, RS55294, RS4903 - Fixed false “backup finished successfully” message when the backup failed due to restricted access to the backup destination

## Security

### FIPS-enabled Red Hat Linux Edition 8 support

When deploying Redis Enterprise Software 6.2.8 on Red Hat Linux Edition 8 with FIPS, verify that FIPS is enabled _before_ installing Redis Enterprise Software. 

Enabling FIPS after Redis Enterprise Software installation causes changes in system-generated keys and may result in failure to open SSH to the cluster or access the UI via port 8443.

### Open source Redis security fix compatibility

As part of Redis commitment to security, Redis Enterprise Software implements the latest [security fixes](https://github.com/redis/redis/releases) available with open source Redis.

The following [open source Redis](https://github.com/redis/redis) [CVEs](https://github.com/redis/redis/security/advisories) do not affect Redis Enterprise:

- [CVE-2021-32625](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-32625) - Redis Enterprise is not impacted by the CVE that was found and fixed in open source Redis since Redis Enterprise does not implement `LCS`. Additional information about the open source Redis fix is on [the Redis GitHub page](https://github.com/redis/redis/releases) (Redis 6.2.4, Redis 6.0.14)

- [CVE-2021-32672](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-32672) - Redis Enterprise is not impacted by the CVE that was found and fixed in open source Redis because the LUA debugger is unsupported in Redis Enterprise. Additional information about the open source Redis fix is on [the Redis GitHub page](https://github.com/redis/redis/releases) (Redis 6.2.6, Redis 6.0.16)

- [CVE-2021-32675](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-32675) - Redis Enterprise is not impacted by the CVE that was found and fixed in open source Redis because the proxy in Redis Enterprise does not forward unauthenticated requests. Additional information about the open source Redis fix is on [the Redis GitHub page](https://github.com/redis/redis/releases) (Redis 6.2.6, Redis 6.0.16)

- [CVE-2021-32762](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-32762) - Redis Enterprise is not impacted by the CVE that was found and fixed in open source Redis because the memory allocator used in Redis Enterprise is not vulnerable. Additional information about the open source Redis fix is on [the Redis GitHub page](https://github.com/redis/redis/releases) (Redis 6.2.6, Redis 6.0.16)

- [CVE-2021-41099](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-41099) - Redis Enterprise is not impacted by the CVE that was found and fixed in open source Redis because the proto-max-bulk-len CONFIG is blocked in Redis Enterprise. Additional information about the open source Redis fix is on [the Redis GitHub page](https://github.com/redis/redis/releases) (Redis 6.2.6, Redis 6.0.16)

Some CVEs announced for Open Source Redis do not affect Redis Enterprise due to different and additional functionality available in Redis Enterprise that is not available in open source Redis.