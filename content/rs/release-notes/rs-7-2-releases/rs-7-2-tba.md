---
Title: Redis Enterprise Software release notes 7.2-TBA (July 2023)
linkTitle: 7.2-TBA (July 2023)
description: 
compatibleOSSVersion: Redis 7.2
weight: 72
alwaysopen: false
categories: ["RS"]
aliases: 
---

​[​Redis Enterprise Software version 7.2](https://redis.com/redis-enterprise-software/download-center/software/) is now available!

This version offers:

- TBA

The following table shows the MD5 checksums for the available packages:

| Package | MD5 checksum (7.2-TBA July release) |
|---------|---------------------------------------|
| Ubuntu 16 |  |
| Ubuntu 18 |  |
| Ubuntu 20 |  |
| RedHat Enterprise Linux (RHEL) 7<br/>Oracle Enterprise Linux (OL) 7 |  |
| RedHat Enterprise Linux (RHEL) 8<br/>Oracle Enterprise Linux (OL) 8 <br/>Rocky Enterprise Linux |  |
| Amazon Linux 2 |  |

## New features and enhancements

TBA

#### Redis modules 

Redis Enterprise Software v7.2 includes the new features delivered in the latest [Redis Stack release (TBA)](https://redis.com/blog/introducing-redis-stack-6-2-6-and-7-0-6/):

- TBA

See [Upgrade modules](https://docs.redis.com/latest/stack/install/upgrade-module/) to learn how to upgrade a module for a database.

## Version changes 

### Breaking changes

- TBA

### Deprecations

TBA

## Resolved issues

- TBA

## Known limitations

### Feature limitations

- TBA

### Upgrade limitations

TBA

### Operating system limitations

TBA

## Security

#### Open source Redis security fixes compatibility

As part of Redis's commitment to security, Redis Enterprise Software implements the latest [security fixes](https://github.com/redis/redis/releases) available with [open source Redis](https://github.com/redis/redis). The following open source Redis [CVEs](https://github.com/redis/redis/security/advisories) do not affect Redis Enterprise:

- [CVE-2021-32625](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-32625) — Redis Enterprise is not impacted by the CVE that was found and fixed in open source Redis since Redis Enterprise does not implement LCS. Additional information about the open source Redis fix is on the [Redis GitHub page](https://github.com/redis/redis/releases) (Redis 6.2.4, Redis 6.0.14)

- [CVE-2021-32672](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-32672) — Redis Enterprise is not impacted by the CVE that was found and fixed in open source Redis because the LUA debugger is unsupported in Redis Enterprise. Additional information about the open source Redis fix is on the [Redis GitHub page](https://github.com/redis/redis/releases) (Redis 6.2.6, Redis 6.0.16)

- [CVE-2021-32675](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-32675) — Redis Enterprise is not impacted by the CVE that was found and fixed in open source Redis because the proxy in Redis Enterprise does not forward unauthenticated requests. Additional information about the open source Redis fix is on the [Redis GitHub page](https://github.com/redis/redis/releases) (Redis 6.2.6, Redis 6.0.16)

- [CVE-2021-32762](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-32762) — Redis Enterprise is not impacted by the CVE that was found and fixed in open source Redis because the memory allocator used in Redis Enterprise is not vulnerable. Additional information about the open source Redis fix is on the [Redis GitHub page](https://github.com/redis/redis/releases) (Redis 6.2.6, Redis 6.0.16)

- [CVE-2021-41099](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-41099) — Redis Enterprise is not impacted by the CVE that was found and fixed in open source Redis because the `proto-max-bulk-len CONFIG` is blocked in Redis Enterprise. Additional information about the open source Redis fix is on the [Redis GitHub page](https://github.com/redis/redis/releases) (Redis 6.2.6, Redis 6.0.16)

Redis Enterprise has already included the fixes for the relevant CVEs. Some CVEs announced for open source Redis do not affect Redis Enterprise due to different and additional functionality available in Redis Enterprise that is not available in open source Redis.
