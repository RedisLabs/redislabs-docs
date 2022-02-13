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

The following table shows the MD5 checksums for the available packages.

|Package| MD5 Checksum |
|:------|:-------------|
| Ubuntu 16 | `96878e07195fe13addacb667ad0ac2af` |
| Ubuntu 18 | `6d45d1768de50fc939c7f876a7601089` |
| RedHat Enterprise Linux (RHEL) 7<br/>Oracle Enterprise Linux (OEL) 7 | `4fefb86f403e1df41af9b3d20a6699f9` |
| RHEL 8 | `b5bac4f870042260bc1565eb8eac2d94` |

## Features and enhancements

- Upgrade the Redis Enterprise infrastructure to [Python v3.9](https://www.python.org/).

-  Compatibility with [open source Redis 6.2.5](https://raw.githubusercontent.com/redis/redis/6.2/00-RELEASENOTES).

- Compatibility with the [security fixes](https://github.com/redis/redis/releases/tag/6.2.6) of the latest [open source Redis 6.2.6](https://github.com/redis/redis/releases/tag/6.2.6).

-  Enhancements and bug fixes.

## Version changes 

### Prerequisites and notes 

-  You can [upgrade to v6.2.10](https://docs.redis.com/latest/rs/installing-upgrading/upgrading/) from Redis Enterprise Software v6.0 and later. 

- Refer to [v6.2.4 release notes](https://docs.redis.com/latest/rs/release-notes/rs-6-2-4-august-2021/) for important notes regarding changes made to the upgrade. 

- Upgrades from versions earlier than v6.0 are not supported.

### Product lifecycle updates 

Redis Enterprise Software v6.0.x will reach end of life (EOF) on May 31, 2022.

To learn more, see the Redis Enterprise Software [product lifecycle](https://docs.redis.com/latest/rs/administering/product-lifecycle/), which details the release number and the end-of-life schedule for Redis Enterprise Software.

For Redis modules information and lifecycle, see [Module lifecycle](https://docs.redis.com/latest/modules/modules-lifecycle/).


## Redis modules 

Redis Enterprise Software v6.2.10 includes the following Redis modules:

- [RediSearch v2.2.6](https://docs.redis.com/latest/modules/redisearch/release-notes/redisearch-2.2-release-notes/)
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

- Added an option to run a connectivity health check for the management layer of Active-Active databases. Run the following REST API command:

    ```
    curl -k -X GET -u "demo@example.com:123456" https://127.0.0.1:9443/v1/crdb/<crdb_guid>/health_report
    ```

- Added TLS handshake error messages to the DMC proxy log (RS59346).

## Resolved issues 

- RS58219 - Fix a UI error message that showed a path instead of a relevant error message.
- RS44958 - Fix incorrect description for the graph "incoming traffic" in Active-Active (geo-distributed) database UI Metrics.
- RS66280 - Fixed the lexicographic [SORT](https://redis.io/commands/sort) command on Active-Active databases (e.g. `SORT mylist ALPHA`). The SORT command should only run on keys mapped to the same slot.
- RS64575 - Fixed a bug in the replication between primary and replica shards of a destination Active-active database in the scenario of using Replica-Of from a single to an Active-Active database, where the syncer process went down during the full sync.
- RS65370 - Added logic to remove old syncer entries in the cluster configuration during upgrades.
- RS67434 - Version 6.2.10 fixes the mTLS handshake between the [syncer process](https://docs.redis.com/latest/rs/administering/designing-production/active-active/#syncer-process) and the [proxy (DMC)](https://docs.redis.com/latest/rs/concepts/terminology/#proxy), where the proxy presented a leaf certificate without its full chain to the syncer. After upgrading to 6.2.10, syncer connections using invalid certificates will break the synchronization between Active-Active instances or deployments using Replica Of when TLS is enabled. To ensure certificates are valid before upgrading do the following: 

    - For Active-Active databases, run from one of the clusters:
       
    ``` shell
    crdb-cli crdb update --crdb-guid <CRDB-GUID> --force
    ```
    
    - For Active-Passive (Replica Of) databases: use the admin console to verify that the destination syncer has the correct certificate for the source proxy (DMC).  For details, see [Configure TLS for Replica Of](https://docs.redis.com/latest/rs/administering/creating-databases/create-active-passive/#configuring-tls-for-replica-of-traffic-on-the-destination-database).

## Security

### Open Source Redis Security fixes compatibility

As part of Redis commitment to security, Redis Enterprise Software implements the latest [security fixes](https://github.com/redis/redis/releases) available with open source Redis. The following [Open Source Redis](https://github.com/redis/redis) [CVE’s](https://github.com/redis/redis/security/advisories) do not affect Redis Enterprise:

- [CVE-2021-32625](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-32625) - Redis Enterprise is not impacted by the CVE that was found and fixed in open source Redis since Redis Enterprise does not implement LCS. Additional information about the open source Redis fix is on [the Redis GitHub page](https://github.com/redis/redis/releases) (Redis 6.2.4, Redis 6.0.14)

- [CVE-2021-32672](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-32672) - Redis Enterprise is not impacted by the CVE that was found and fixed in open source Redis because the LUA debugger is unsupported in Redis Enterprise. Additional information about the open source Redis fix is on [the Redis GitHub page](https://github.com/redis/redis/releases) (Redis 6.2.6, Redis 6.0.16)

- [CVE-2021-32675](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-32675) - Redis Enterprise is not impacted by the CVE that was found and fixed in open source Redis because the proxy in Redis Enterprise does not forward unauthenticated requests. Additional information about the open source Redis fix is on [the Redis GitHub page](https://github.com/redis/redis/releases) (Redis 6.2.6, Redis 6.0.16)

- [CVE-2021-32762](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-32762) - Redis Enterprise is not impacted by the CVE that was found and fixed in open source Redis because the memory allocator used in Redis Enterprise is not vulnerable. Additional information about the open source Redis fix is on [the Redis GitHub page](https://github.com/redis/redis/releases) (Redis 6.2.6, Redis 6.0.16)

- [CVE-2021-41099](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-41099) - Redis Enterprise is not impacted by the CVE that was found and fixed in open source Redis because the proto-max-bulk-len CONFIG is blocked in Redis Enterprise. Additional information about the open source Redis fix is on [the Redis GitHub page](https://github.com/redis/redis/releases) (Redis 6.2.6, Redis 6.0.16)security fixes for [recent CVE’s](https://github.com/redis/redis/security/advisories). Redis Enterprise has already included the fixes for the relevant CVE’s. Some CVE’s announced for Open Source Redis do not affect Redis Enterprise due to different and additional functionality available in Redis Enterprise that is not available in Open Source Redis.

