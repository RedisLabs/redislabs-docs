---
Title: Redis Enterprise Software release notes 7.4.2-tba (January 2024)
linkTitle: 7.4.2-tba (January 2024)
description: New Cluster Manager UI enhancements, including Active-Active database management. Full TLS 1.3 support. Automatic recovery configuration. IPv6 support for internal traffic. Maintenance mode enhancements. Module management enhancements.
compatibleOSSVersion: Redis 7.2.0
weight: 72
alwaysopen: false
categories: ["RS"]
aliases: 
---

​[​Redis Enterprise Software version 7.4.2](https://redis.com/redis-enterprise-software/download-center/software/) is now available!

## Highlights

This version offers:

- New Cluster Manager UI enhancements, including Active-Active database management

- Full TLS 1.3 support

- Automatic recovery configuration

- IPv6 support for internal traffic

- Maintenance mode enhancements

- Module management enhancements

## New in this release

### New features

- Added full support for TLS 1.3:

    - TLS 1.3 cipher suites are now configurable for database connections. See [Configure cipher suites]({{<relref "/rs/security/encryption/tls/ciphers">}}) for details.

    - TLS 1.3 can be set as the minimum TLS version. See [Configure TLS protocol]({{<relref "/rs/security/encryption/tls/tls-protocols">}}) for details.

- Automatic recovery of databases from persistence files is configurable using the REST API.

- New clusters support IPv6 for internal traffic.

### Enhancements

- New Cluster Manager UI enhancements:

    - Create and manage Active-Active databases.

    - Configure database defaults: endpoint configuration, database proxy, and shards placement.

    - Configure [TLS cipher suites]({{<relref "/rs/security/encryption/tls/ciphers#edit-ciphers-ui">}}) and [minimum TLS protocol]({{<relref "/rs/security/encryption/tls/tls-protocols#edit-tls-ui">}}).

    - Configure LDAP authentication timeout.

- Maintenance mode enhancements:

    - Only the latest maintenance mode snapshot is kept.
    
    - Use the `overwrite_snapshot` option to create a new snapshot when you turn on maintenance mode.

    - `keep_slave_shards` is deprecated. Use `evict_ha_replica` and `evict_active_active_replica` instead.
    
    - View or delete node snapshots using `/v1/nodes/{node_uid}/snapshots` REST API requests.

- Improved `actions` REST API:

    - Improved `progress` fields returned by `GET /v1/actions` requests.

    - New request to get the status of all currently executing, pending, or completed actions for a specific database: `GET /v1/actions/bdb/<bdb_uid>`

- [`GET /v1/users`]({{<relref "/rs/references/rest-api/requests/users#get-all-users">}}) REST API requests include a new `status` field in the response, which indicates whether the user can sign in:

    - `active`: user can sign in

    - `locked`: user cannot sign in

- Replaced the use of processes for `job_scheduler`, `cnm_http`, and `crdb_coordinator` with threads, which results in significant memory optimization.

#### Redis module feature sets

Redis Enterprise comes packaged with several modules. As of version 7.4.2, Redis Enterprise includes two feature sets, compatible with different Redis database versions.

Bundled Redis modules compatible with Redis database version 7.2:

- [RediSearch 2.8.9](https://github.com/RediSearch/RediSearch/releases/tag/v2.8.9)

- [RedisJSON 2.6.8](https://github.com/RedisJSON/RedisJSON/releases/tag/v2.6.8)

- [RedisTimeSeries 1.10.9](https://github.com/RedisTimeSeries/RedisTimeSeries/releases/tag/v1.10.9)

- [RedisBloom 2.6.10](https://github.com/RedisBloom/RedisBloom/releases/tag/v2.6.10)

- [RedisGears 2.0.17](https://github.com/RedisGears/RedisGears/releases/tag/v2.0.17-m18)

Bundled Redis modules compatible with Redis database versions 6.0 and 6.2:

- [RediSearch 2.6.12](https://github.com/RediSearch/RediSearch/releases/tag/v2.6.12)

- [RedisJSON 2.4.7](https://github.com/RedisJSON/RedisJSON/releases/tag/v2.4.7)

- [RedisTimeSeries 1.8.11](https://github.com/RedisTimeSeries/RedisTimeSeries/releases/tag/v1.8.11)

- [RedisBloom 2.4.7](https://github.com/RedisBloom/RedisBloom/releases/tag/v2.4.7)

- [RedisGraph v2.10.12](https://github.com/RedisGraph/RedisGraph/releases/tag/v2.10.12)

### Resolved issues

- RS57417: Azure OSS cluster with Private Link should no longer return public IPs in response to `CLUSTER` commands.

- RS106159: If RESP3 is not supported, `HELLO` requests now return an unknown command error instead of a protocol error.

- RS107538: Fixed an issue where DMC proxy perpetually restarted due to a CCS inconsistency.

## Version changes 

### Breaking changes

- Renamed `sentinel_ssl_policy` field. The new name is `sentinel_tls_mode`.

    - You can only change the discovery service policy using `sentinel_tls_mode`.

    - When retrieving the value of the current policy using `GET /v1/cluster`, both fields are returned for backward compatibility.

- Port 3345 is now reserved for internal use.

### Deprecations

#### API deprecations

- The replica HA cluster policy is deprecated.

- The maintenance mode option `keep_slave_shards` is deprecated in `rladmin` and the REST API. Use `evict_ha_replica` and `evict_active_active_replica` instead.

- `/v1/debuginfo` REST API paths are deprecated. Use the new paths [`/v1/cluster/debuginfo`]({{<relref "/rs/references/rest-api/requests/cluster/debuginfo">}}), [`/v1/nodes/debuginfo`]({{<relref "/rs/references/rest-api/requests/nodes/debuginfo">}}), and [`/v1/bdbs/debuginfo`]({{<relref "/rs/references/rest-api/requests/bdbs/debuginfo">}}) instead.

#### Security deprecations

- The RC4 encryption cipher, which was previously deprecated in favor of stronger ciphers, is no longer supported.

- The 3DES encryption cipher, which was previously deprecated in favor of stronger ciphers like AES, is no longer supported. Verify that all clients, applications, and connections support the AES cipher.

- TLS 1.0 and TLS 1.1 connections, which were previously deprecated in favor of TLS 1.2 or later, are no longer supported. Verify that all clients, applications, and connections support TLS 1.2 or later.

### Supported platforms

<span title="Check mark icon">&#x2705;</span> Supported – The platform is supported for this version of Redis Enterprise Software.

<span title="Warning icon">&#x26A0;&#xFE0F;</span> Deprecated – The platform is still supported for this version of Redis Enterprise Software, but support will be removed in a future release.

<span title="X icon">&#x274c;</span> End of life – Platform support ended in this version of Redis Enterprise Software.

| Redis Enterprise | 7.4.2 | 7.2.4 | 6.4.2 | 6.2.18 | 6.2.12 | 6.2.10 | 6.2.8 | 6.2.4 |
|------------------|-------|-------|-------|--------|--------|--------|--------|-------|
| **Release date** | Jan<br />2024 | Aug<br />2023 | Feb<br />2023 | Sept<br />2022 | Aug<br />2022 | Feb<br />2022 | Oct<br />2021 | Aug<br />2021 |
| [**End-of-life date**]({{<relref "/rs/installing-upgrading/product-lifecycle#endoflife-schedule">}}) | – | July<br />2025 | Feb<br />2025 | Aug<br />2024 | Aug<br />2024 | Aug<br />2024 | Aug<br />2024 | Aug<br />2024 |
| **Ubuntu**<sup>[1](#table-note-1)</sup> |
| 20.04 | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span><sup>[6](#table-note-6)</sup> | – | – | – | – | – |
| 18.04 | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported"><span title="Supported">&#x2705;</span></span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| 16.04 | – | <span title="End of life">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| **RHEL & CentOS**<sup>[2](#table-note-2)</sup>
| 8.9| <span title="Supported">&#x2705;</span> | – | – | – | – | – | – | – |
| 8.8 | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span><sup>[8](#table-note-8)</sup> | – | – | – | – | – |
| 8.7 | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | – | – | – | – | – |
| 8.5-8.6 | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | – | – |
| 8.0-8.4 | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | – |
| 7.0-7.9 | <span title="End of life">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| **Oracle Linux**<sup>[3](#table-note-3)</sup> |
| 8 | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | – | – |
| 7 | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| **Rocky Linux**<sup>[3](#table-note-3)</sup> |
| 8 | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | – | – | – | – |
| **Amazon Linux** |
| 2 | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span><sup>[7](#table-note-7)</sup> | – | – | – | – | – |
| 1 | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| **Docker**<sup>[4](#table-note-4)</sup> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| **Kubernetes**<sup>[5](#table-note-5)</sup> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |

1. <a name="table-note-1" style="display: block; height: 80px; margin-top: -80px;"></a>The server version of Ubuntu is recommended for production installations. The desktop version is only recommended for development deployments.

2. <a name="table-note-2" style="display: block; height: 80px; margin-top: -80px;"></a>RHEL and CentOS deployments require OpenSSL 1.0.2 and [firewall configuration]({{<relref "/rs/installing-upgrading/configuring/centos-rhel-firewall">}}).

3. <a name="table-note-3" style="display: block; height: 80px; margin-top: -80px;"></a>Based on the corresponding RHEL version.

4. <a name="table-note-4" style="display: block; height: 80px; margin-top: -80px;"></a>
[Docker images]({{<relref "/rs/installing-upgrading/quickstarts/docker-quickstart">}}) of Redis Enterprise Software are certified for development and testing only.

5. <a name="table-note-5" style="display: block; height: 80px; margin-top: -80px;"></a>See the [Redis Enterprise for Kubernetes documentation]({{<relref "/kubernetes">}}).

6. <a name="table-note-6" style="display: block; height: 80px; margin-top: -80px;"></a>Ubuntu 20.04 support was added in Redis Enterprise Software [6.4.2-43]({{<relref "/rs/release-notes/rs-6-4-2-releases/rs-6-4-2-43">}}).

7. <a name="table-note-7" style="display: block; height: 80px; margin-top: -80px;"></a>A release candidate for Amazon Linux 2 support was added in Redis Enterprise Software [6.4.2-61]({{<relref "/rs/release-notes/rs-6-4-2-releases/rs-6-4-2-61">}}). Official support for Amazon Linux 2 was added in Redis Enterprise Software [6.4.2-69]({{<relref "/rs/release-notes/rs-6-4-2-releases/rs-6-4-2-69">}}).

8. <a name="table-note-8" style="display: block; height: 80px; margin-top: -80px;"></a>Redis Enterprise Software [6.4.2-103]({{<relref "/rs/release-notes/rs-6-4-2-releases/rs-6-4-2-103">}}) and later supports RHEL 8.8.

## Downloads

The following table shows the MD5 checksums for the available packages:

| Package | MD5 checksum (7.4.2-tba January release) |
|---------|---------------------------------------|
| Ubuntu 18 |  |
| Ubuntu 20 |  |
| RedHat Enterprise Linux (RHEL) 7<br/>Oracle Enterprise Linux (OL) 7 |  |
| RedHat Enterprise Linux (RHEL) 8<br/>Oracle Enterprise Linux (OL) 8 <br/>Rocky Enterprise Linux |  |
| Amazon Linux 2 |  |

## Known issues

TBA?

## Known limitations

#### OpenSSL compatibility issue for 7.4.2 modules on Amazon Linux 2

Due to an OpenSSL 1.1 compatibility issue between modules and clusters, Redis Enterprise Software version 7.4.2-tba is not fully supported on Amazon Linux 2 clusters with databases that use the following modules: RedisGears, RediSearch, or RedisTimeSeries.

This issue will be fixed in a future maintenance release.

## Security

#### Open source Redis security fixes compatibility

As part of Redis's commitment to security, Redis Enterprise Software implements the latest [security fixes](https://github.com/redis/redis/releases) available with [open source Redis](https://github.com/redis/redis). Redis Enterprise has already included the fixes for the relevant CVEs.

Some CVEs announced for open source Redis do not affect Redis Enterprise due to different or additional functionality available in Redis Enterprise that is not available in open source Redis.

Redis Enterprise 7.2.4-92 and 7.2.4-86 support open source Redis 7.2, 6.2, and 6.0. Below is the list of open source Redis CVEs fixed by version.

Redis 7.2.x:

- (CVE-2023-41056) In some cases, Redis may incorrectly handle resizing of memory buffers, which can result in incorrect accounting of buffer sizes and lead to heap overflow and potential remote code execution.

- (CVE-2023-41053) Redis does not correctly identify keys accessed by `SORT_RO` and, as a result, may grant users executing this command access to keys that are not explicitly authorized by the ACL configuration. (Redis 7.2.1)

Redis 7.0.x:

- (CVE-2023-41056) In some cases, Redis may incorrectly handle resizing of memory buffers, which can result in incorrect accounting of buffer sizes and lead to heap overflow and potential remote code execution.

- (CVE-2023-41053) Redis does not correctly identify keys accessed by `SORT_RO` and, as a result, may grant users executing this command access to keys that are not explicitly authorized by the ACL configuration. (Redis 7.0.13)

- (CVE-2023-36824) Extracting key names from a command and a list of arguments may, in some cases, trigger a heap overflow and result in reading random heap memory, heap corruption, and potentially remote code execution. Specifically: using `COMMAND GETKEYS*` and validation of key names in ACL rules. (Redis 7.0.12)

- (CVE-2023-28856) Authenticated users can use the `HINCRBYFLOAT` command to create an invalid hash field that will crash Redis on access. (Redis 7.0.11)

- (CVE-2023-28425) Specially crafted `MSETNX` command can lead to assertion and denial-of-service. (Redis 7.0.10)

- (CVE-2023-25155) Specially crafted `SRANDMEMBER`, `ZRANDMEMBER`, and `HRANDFIELD` commands can trigger an integer overflow, resulting in a runtime assertion and termination of the Redis server process. (Redis 7.0.9)

- (CVE-2023-22458) Integer overflow in the Redis `HRANDFIELD` and `ZRANDMEMBER` commands can lead to denial-of-service. (Redis 7.0.8)

- (CVE-2022-36021) String matching commands (like `SCAN` or `KEYS`) with a specially crafted pattern to trigger a denial-of-service attack on Redis, causing it to hang and consume 100% CPU time. (Redis 7.0.9)

- (CVE-2022-35977) Integer overflow in the Redis `SETRANGE` and `SORT`/`SORT_RO` commands can drive Redis to OOM panic. (Redis 7.0.8)

- (CVE-2022-35951) Executing an `XAUTOCLAIM` command on a stream key in a specific state, with a specially crafted `COUNT` argument, may cause an integer overflow, a subsequent heap overflow, and potentially lead to remote code execution. The problem affects Redis versions 7.0.0 or newer. (Redis 7.0.5)

- (CVE-2022-31144) A specially crafted `XAUTOCLAIM` command on a stream key in a specific state may result in heap overflow and potentially remote code execution. The problem affects Redis versions 7.0.0 or newer. (Redis 7.0.4)

- (CVE-2022-24834) A specially crafted Lua script executing in Redis can trigger a heap overflow in the cjson and cmsgpack libraries, and result in heap corruption and potentially remote code execution. The problem exists in all versions of Redis with Lua scripting support, starting from 2.6, and affects only authenticated and authorized users. (Redis 7.0.12)

- (CVE-2022-24736) An attacker attempting to load a specially crafted Lua script can cause NULL pointer dereference which will result in a crash of the `redis-server` process. This issue affects all versions of Redis. (Redis 7.0.0)

- (CVE-2022-24735) By exploiting weaknesses in the Lua script execution environment, an attacker with access to Redis can inject Lua code that will execute with the (potentially higher) privileges of another Redis user. (Redis 7.0.0)

Redis 6.2.x:

- (CVE-2023-28856) Authenticated users can use the `HINCRBYFLOAT` command to create an invalid hash field that will crash Redis on access. (Redis 6.2.12)

- (CVE-2023-25155) Specially crafted `SRANDMEMBER`, `ZRANDMEMBER`, and `HRANDFIELD` commands can trigger an integer overflow, resulting in a runtime assertion and termination of the Redis server process. (Redis 6.2.11)

- (CVE-2023-22458) Integer overflow in the Redis `HRANDFIELD` and `ZRANDMEMBER` commands can lead to denial-of-service. (Redis 6.2.9)

- (CVE-2022-36021) String matching commands (like `SCAN` or `KEYS`) with a specially crafted pattern to trigger a denial-of-service attack on Redis, causing it to hang and consume 100% CPU time. (Redis 6.2.11)

- (CVE-2022-35977) Integer overflow in the Redis `SETRANGE` and `SORT`/`SORT_RO` commands can drive Redis to OOM panic. (Redis 6.2.9)

- (CVE-2022-24834) A specially crafted Lua script executing in Redis can trigger a heap overflow in the cjson and cmsgpack libraries, and result in heap corruption and potentially remote code execution. The problem exists in all versions of Redis with Lua scripting support, starting from 2.6, and affects only authenticated and authorized users. (Redis 6.2.13)

- (CVE-2022-24736) An attacker attempting to load a specially crafted Lua script can cause NULL pointer dereference which will result in a crash of the `redis-server` process. This issue affects all versions of Redis. (Redis 6.2.7)

- (CVE-2022-24735) By exploiting weaknesses in the Lua script execution environment, an attacker with access to Redis can inject Lua code that will execute with the (potentially higher) privileges of another Redis user. (Redis 6.2.7)

- (CVE-2021-41099) Integer to heap buffer overflow handling certain string commands and network payloads, when `proto-max-bulk-len` is manually configured to a non-default, very large value. (Redis 6.2.6)

- (CVE-2021-32762) Integer to heap buffer overflow issue in `redis-cli` and `redis-sentinel` parsing large multi-bulk replies on some older and less common platforms. (Redis 6.2.6)

- (CVE-2021-32761) An integer overflow bug in Redis version 2.2 or newer can be exploited using the `BITFIELD` command to corrupt the heap and potentially result with remote code execution. (Redis 6.2.5)

- (CVE-2021-32687) Integer to heap buffer overflow with intsets, when `set-max-intset-entries` is manually configured to a non-default, very large value. (Redis 6.2.6)

- (CVE-2021-32675) Denial Of Service when processing RESP request payloads with a large number of elements on many connections. (Redis 6.2.6)

- (CVE-2021-32672) Random heap reading issue with Lua Debugger. (Redis 6.2.6)

- (CVE-2021-32628) Integer to heap buffer overflow handling ziplist-encoded data types, when configuring a large, non-default value for `hash-max-ziplist-entries`, `hash-max-ziplist-value`, `zset-max-ziplist-entries` or `zset-max-ziplist-value`. (Redis 6.2.6)

- (CVE-2021-32627) Integer to heap buffer overflow issue with streams, when configuring a non-default, large value for `proto-max-bulk-len` and `client-query-buffer-limit`. (Redis 6.2.6)

- (CVE-2021-32626) Specially crafted Lua scripts may result with Heap buffer overflow. (Redis 6.2.6)

- (CVE-2021-32625) An integer overflow bug in Redis version 6.0 or newer can be exploited using the STRALGO LCS command to corrupt the heap and potentially result with remote code execution. This is a result of an incomplete fix by CVE-2021-29477. (Redis 6.2.4)

- (CVE-2021-29478) An integer overflow bug in Redis 6.2 could be exploited to corrupt the heap and potentially result with remote code execution. The vulnerability involves changing the default set-max-intset-entries configuration value, creating a large set key that consists of integer values and using the COPY command to duplicate it. The integer overflow bug exists in all versions of Redis starting with 2.6, where it could result with a corrupted RDB or DUMP payload, but not exploited through COPY (which did not exist before 6.2). (Redis 6.2.3)

- (CVE-2021-29477) An integer overflow bug in Redis version 6.0 or newer could be exploited using the STRALGO LCS command to corrupt the heap and potentially result in remote code execution. The integer overflow bug exists in all versions of Redis starting with 6.0. (Redis 6.2.3)

Redis 6.0.x:

- (CVE-2022-24834) A specially crafted Lua script executing in Redis can trigger a heap overflow in the cjson and cmsgpack libraries, and result in heap corruption and potentially remote code execution. The problem exists in all versions of Redis with Lua scripting support, starting from 2.6, and affects only authenticated and authorized users. (Redis 6.0.20)

- (CVE-2023-28856) Authenticated users can use the `HINCRBYFLOAT` command to create an invalid hash field that will crash Redis on access. (Redis 6.0.19)

- (CVE-2023-25155) Specially crafted `SRANDMEMBER`, `ZRANDMEMBER`, and `HRANDFIELD` commands can trigger an integer overflow, resulting in a runtime assertion and termination of the Redis server process. (Redis 6.0.18)

- (CVE-2022-36021) String matching commands (like `SCAN` or `KEYS`) with a specially crafted pattern to trigger a denial-of-service attack on Redis, causing it to hang and consume 100% CPU time. (Redis 6.0.18)

- (CVE-2022-35977) Integer overflow in the Redis `SETRANGE` and `SORT`/`SORT_RO` commands can drive Redis to OOM panic. (Redis 6.0.17)
