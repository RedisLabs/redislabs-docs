---
Title: Redis Enterprise Software Release Notes 6.2.10 (February 2022)
linkTitle: 6.2.10 (February 2022)
description: Python 3 support.
compatibleOSSVersion: Redis 6.2.5
weight: 75
alwaysopen: false
categories: ["RS"]
aliases: /rs/release-notes/rs-6-2-8-october-2021/
         /rs/release-notes/rs-6-2-8-october-2021.md
---

[Redis Enterprise Software version 6.2.10](https://redislabs.com/redis-enterprise-software/download-center/software/) is now available! 

## Features and enhancements

- Upgrade the Redis Enterprise infrastructure to [Python v3.9](https://www.python.org/).

-  Compatibility with [open source Redis 6.2.5](https://github.com/redis/redis).

- Compatibility with the [security fixes](https://github.com/redis/redis/releases/tag/6.2.6) of the latest [open source Redis 6.2.6](https://github.com/redis/redis/releases/tag/6.2.6).

-  Enhancements and bug fixes.

## Version changes 

### Prerequisites and notes 

-  You can [upgrade to v6.2.10](https://docs.redis.com/latest/rs/installing-upgrading/upgrading/) from Redis Enterprise Software v6.0 and later. 

- Refer to [v6.2.4 release notes](https://docs.redis.com/latest/rs/release-notes/rs-6-2-4-august-2021/) for important notes regarding changes made to the upgrade. 

- Upgrades from versions earlier than v6.0 are not supported.

### Product lifecycle updates 

Redis Enterprise Software v5.6.0 reached end of life (EOF) on October 31, 2021.

To learn more, see the Redis Enterprise Software [product lifecycle](https://docs.redis.com/latest/rs/administering/product-lifecycle/), which details the release number and the end-of-life schedule for Redis Enterprise Software.

For Redis modules information and lifecycle, see [Module lifecycle](https://docs.redis.com/latest/modules/modules-lifecycle/).


## Redis modules 

Redis Enterprise Software v6.2.10 includes the following Redis modules:

- [RediSearch v2.2.5](https://docs.redis.com/latest/modules/redisearch/release-notes/redisearch-2.2-release-notes/)
- [RedisJSON v2.0.6](https://docs.redis.com/latest/modules/redisjson/release-notes/redisjson-2.0-release-notes/)
- [RedisBloom v2.2.9](https://docs.redis.com/latest/modules/redisbloom/release-notes/redisbloom-2.2-release-notes/)
- [RedisGraph v2.4.12](https://docs.redis.com/latest/modules/redisgraph/release-notes/redisgraph-2.4-release-notes/)
- [RedisTimeSeries v1.4.13](https://docs.redis.com/latest/modules/redistimeseries/release-notes/redistimeseries-1.4-release-notes/)

For help upgrading a module, see [Add a module to a cluster](https://docs.redis.com/latest/modules/add-module-to-cluster/#upgrading-the-module-for-the-database). 

## Interface enhancements

- When choosing RedisJSON, the user interface (UI) now suggests RedisSearch as well. To learn more, see the [RedisJSON preview announcement](https://redis.com/blog/redisjson-public-preview-performance-benchmarking/), which details the benefits of combining [RedisJSON](http://redisjson.io/) and [RediSearch](http://redisearch.io/).
- Adds the ability to sort the columns of the node list (RS48256).
- When creating a new geo-distributed (Active-Active) database, an endpoint is no longer required.  The system assigns one if none if provided (RS27632).

## Additional enhancements

- MD5 checksum values are now displayed in the Download Center.



* Providing the MD5 value in the download center.
* Added an option to run a connectivity health check for the management layer of Active-Active databases. Run the following REST API command:

    ```
    curl -k -X GET -u "demo@example.com:123456" https://127.0.0.1:9443/v1/crdb/<crdb_guid>/health_report
    ```

- Added the TLS handshake error messages to the DMC proxy log (RS59346).

## Resolved issues 

- RS58219 - Fix a UI error message that showed a path instead of a relevant error message.
- RS44958 - Fix incorrect description for the graph "incoming traffic" in Active-Active (geo-distributed) database UI Metrics.
- RS66280 - Fixed the lexicographically [SORT](https://redis.io/commands/sort) command on Active-Active databases (e.g. `SORT mylist ALPHA`). The SORT command should only run on keys mapped to the same slot.
- RS64575 - Fixed a bug in the replication between primary and replica shards of a destination Active-active database in the scenario of using Replica-Of from a single to an Active-Active database, where the syncer process went down during the full sync.
- RS65370 - Added logic to remove old syncer entries in the cluster configuration during upgrades.

## Security

### Syncer validation for the proxy certificate

Release 6.2.10 fixes a latent bug in which the syncer accepts an invalid leaf proxy certificate (RS67434). Following the fix, we added a new flag that enables the syncer of the target database to accept a dummy or invalid certificate from the proxy of the source database. This feature can be used for development and test environments where you replicate the production configuration without access to the  production certificates. It is disabled by default for new databases.

For seamless upgrade, the feature will be automatically enabled upon upgrade for replica-of and active-active TLS enabled target databases. We advise you to review and validate your certificates in your production environments and then to disable the feature via the API.

### Open Source Redis Security fixes compatibility

As part of Redis commitment to security, Redis Enterprise Software implements the latest [security fixes](https://github.com/redis/redis/releases) available with open source Redis. The following [Open Source Redis](https://github.com/redis/redis) [CVE’s](https://github.com/redis/redis/security/advisories) do not affect Redis Enterprise:

- [CVE-2021-32625](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-32625) - Redis Enterprise is not impacted by the CVE that was found and fixed in open source Redis since Redis Enterprise does not implement LCS. Additional information about the open source Redis fix is on [the Redis GitHub page](https://github.com/redis/redis/releases) (Redis 6.2.4, Redis 6.0.14)

- [CVE-2021-32672](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-32672) - Redis Enterprise is not impacted by the CVE that was found and fixed in open source Redis because the LUA debugger is unsupported in Redis Enterprise. Additional information about the open source Redis fix is on [the Redis GitHub page](https://github.com/redis/redis/releases) (Redis 6.2.6, Redis 6.0.16)

- [CVE-2021-32675](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-32675) - Redis Enterprise is not impacted by the CVE that was found and fixed in open source Redis because the proxy in Redis Enterprise does not forward unauthenticated requests. Additional information about the open source Redis fix is on [the Redis GitHub page](https://github.com/redis/redis/releases) (Redis 6.2.6, Redis 6.0.16)

- [CVE-2021-32762](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-32762) - Redis Enterprise is not impacted by the CVE that was found and fixed in open source Redis because the memory allocator used in Redis Enterprise is not vulnerable. Additional information about the open source Redis fix is on [the Redis GitHub page](https://github.com/redis/redis/releases) (Redis 6.2.6, Redis 6.0.16)

- [CVE-2021-41099](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-41099) - Redis Enterprise is not impacted by the CVE that was found and fixed in open source Redis because the proto-max-bulk-len CONFIG is blocked in Redis Enterprise. Additional information about the open source Redis fix is on [the Redis GitHub page](https://github.com/redis/redis/releases) (Redis 6.2.6, Redis 6.0.16)security fixes for [recent CVE’s](https://github.com/redis/redis/security/advisories). Redis Enterprise has already included the fixes for the relevant CVE’s. Some CVE’s announced for Open Source Redis do not affect Redis Enterprise due to different and additional functionality available in Redis Enterprise that is not available in Open Source Redis.

