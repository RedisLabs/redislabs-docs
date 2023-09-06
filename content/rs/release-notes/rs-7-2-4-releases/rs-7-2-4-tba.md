---
Title: Redis Enterprise Software release notes 7.2.4-TBA (September 2023)
linkTitle: 7.2.4-TBA (September 2023)
description: Improved cluster recovery with manually uploaded modules. Support package contains supervisorctl status.
compatibleOSSVersion: Redis 7.2.0
weight: 71
alwaysopen: false
categories: ["RS"]
aliases: 
---

This is a maintenance release for ​[​Redis Enterprise Software version 7.2.4](https://redis.com/redis-enterprise-software/download-center/software/).

## Highlights

This version offers:

- Improved cluster recovery with manually uploaded modules

- Support package enhancements

## New in this release

### New features

- TBA

### Enhancements

- Cluster recovery with manually uploaded modules 

    For clusters containing databases with manually uploaded modules, [cluster recovery]({{<relref "/rs/clusters/cluster-recovery">}}) is now seamlessly integrated

- Support package now contains `supervisorctl` status when created by the [`rladmin` command]({{<relref "/rs/installing-upgrading/creating-support-package#command-line-method">}}) (RS107879)

#### Redis modules

Redis Enterprise Software version 7.2.4-TBA includes the following Redis Stack modules (no changes since [Redis Enterprise Software version 7.2.4-52]({{<relref "/rs/release-notes/rs-7-2-4-releases/rs-7-2-4-52">}}):

- [RediSearch 2.8.4](https://github.com/RediSearch/RediSearch/releases/tag/v2.8.4)

- [RedisJSON 2.6.6](https://github.com/RedisJSON/RedisJSON/releases/tag/v2.6.6)

- [RedisTimeSeries 1.10.4](https://github.com/RedisTimeSeries/RedisTimeSeries/releases/tag/v1.10.4)

- [RedisBloom 2.6.3](https://github.com/RedisBloom/RedisBloom/releases/tag/v2.6.3)

- [RedisGears 2.0.11](https://github.com/RedisGears/RedisGears/releases/tag/v2.0.11-m12)

### Resolved issues

- RS107986 - Allow ports lower than 1024 when configuring audits using `rladmin`

- RS105335 - Add error handling to [`CLIENT NO-TOUCH`](https://redis.io/commands/client-no-touch/) to return an error if the Redis database version is earlier than 7.2.0 or the command is [restricted by ACL rules](https://docs.redis.com/latest/rs/release-notes/rs-7-2-4-releases/rs-7-2-4-52/#command-limitations)

- RS105137 - Fix audit reconnect issue: sometimes the proxy failed to reconnect to a restarted audit listener

- RS108394 - Invalid `replicaSources` property in REDB manifest causes repeated `dmcproxy` crashes

- RS108233 - Empty saslauthd configuration file causes upgrade checks to fail

- RS107730 - Include client IP address in `failed_authentication_attempt` errors

- RS107727 - `/etc/cron.d/redislabs` file is owned by `redislabs` user instead of `root`

- RS108230 - Remove test key and certificate files in Python dist installed in Redis Enterprise Software

- RS107718 - Disabling `cm_server` leaves port TCP/8443 in `LISTEN` state

## Version changes 

### Deprecations

- TBA?

### Supported platforms

<span title="Check mark icon">&#x2705;</span> Supported – The platform is supported for this version of Redis Enterprise Software.

<span title="Warning icon">&#x26A0;&#xFE0F;</span> Deprecated – The platform is still supported for this version of Redis Enterprise Software, but support will be removed in a future release.

<span title="X icon">&#x274c;</span> End of life – Platform support ended in this version of Redis Enterprise Software.

| Redis Enterprise | 7.2.4 | 6.4.2 | 6.2.18 | 6.2.12 | 6.2.10 | 6.2.8 | 6.2.4 |
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

## Downloads

The following table shows the MD5 checksums for the available packages:

| Package | MD5 checksum (7.2.4-TBA September release) |
|---------|---------------------------------------|
| Ubuntu 18 |  |
| Ubuntu 20 |  |
| RedHat Enterprise Linux (RHEL) 7<br/>Oracle Enterprise Linux (OL) 7 |  |
| RedHat Enterprise Linux (RHEL) 8<br/>Oracle Enterprise Linux (OL) 8 <br/>Rocky Enterprise Linux |  |
| Amazon Linux 2 |  |

## Known issues

- TBA

## Known limitations

- TBA

## Security

#### Open source Redis security fixes compatibility

As part of Redis's commitment to security, Redis Enterprise Software implements the latest [security fixes](https://github.com/redis/redis/releases) available with [open source Redis](https://github.com/redis/redis). The following open source Redis [CVEs](https://github.com/redis/redis/security/advisories) do not affect Redis Enterprise:

- [CVE-2021-32625](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-32625) — Redis Enterprise is not impacted by the CVE that was found and fixed in open source Redis since Redis Enterprise does not implement LCS. Additional information about the open source Redis fix is on the [Redis GitHub page](https://github.com/redis/redis/releases) (Redis 6.2.4, Redis 6.0.14)

- [CVE-2021-32672](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-32672) — Redis Enterprise is not impacted by the CVE that was found and fixed in open source Redis because the LUA debugger is unsupported in Redis Enterprise. Additional information about the open source Redis fix is on the [Redis GitHub page](https://github.com/redis/redis/releases) (Redis 6.2.6, Redis 6.0.16)

- [CVE-2021-32675](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-32675) — Redis Enterprise is not impacted by the CVE that was found and fixed in open source Redis because the proxy in Redis Enterprise does not forward unauthenticated requests. Additional information about the open source Redis fix is on the [Redis GitHub page](https://github.com/redis/redis/releases) (Redis 6.2.6, Redis 6.0.16)

- [CVE-2021-32762](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-32762) — Redis Enterprise is not impacted by the CVE that was found and fixed in open source Redis because the memory allocator used in Redis Enterprise is not vulnerable. Additional information about the open source Redis fix is on the [Redis GitHub page](https://github.com/redis/redis/releases) (Redis 6.2.6, Redis 6.0.16)

- [CVE-2021-41099](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-41099) — Redis Enterprise is not impacted by the CVE that was found and fixed in open source Redis because the `proto-max-bulk-len CONFIG` is blocked in Redis Enterprise. Additional information about the open source Redis fix is on the [Redis GitHub page](https://github.com/redis/redis/releases) (Redis 6.2.6, Redis 6.0.16)

Redis Enterprise has already included the fixes for the relevant CVEs. Some CVEs announced for open source Redis do not affect Redis Enterprise due to different and additional functionality available in Redis Enterprise that is not available in open source Redis.
