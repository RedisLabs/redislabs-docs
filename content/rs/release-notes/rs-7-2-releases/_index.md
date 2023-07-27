---
Title: Redis Enterprise Software release notes 7.2
linkTitle: 7.2 releases
description: 
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

- Enhanced Auto Tiering (Redis on Flash) with Speedb and license updates

- Redis ACL selectors and enhanced key-based permissions

- RESP3 support

- Sharded pub/sub

- A preview of the redesigned cluster management UI (admin console)

- Triggers and Functions preview

## Detailed release notes

For more detailed release notes, select a build version from the following table:

{{<table-children columnNames="Version&nbsp;(Release&nbsp;date)&nbsp;,Major changes,OSS&nbsp;Redis compatibility" columnSources="LinkTitle,Description,compatibleOSSVersion" enableLinks="LinkTitle">}}

## Deprecations

#### Command deprecations

- [`CLUSTER SLOTS`](https://redis.io/commands/cluster-slots) is deprecated as of Redis 7.0

- [`QUIT`](https://redis.io/commands/quit/) is deprecated as of Redis 7.2

#### Access control deprecations

The following predefined roles and Redis ACLs are not available after upgrading to Redis Enterprise Software version 7.2 if they are not associated with any users or databases in the cluster:

- Custom roles (not management roles): Cluster Member, Cluster Viewer, DB Member, DB Viewer, None.

- Redis ACLs: Not Dangerous and Read Only.

### RedisGraph

Redis has announced the end of life of RedisGraph. Redis will continue to support all RedisGraph customers, including releasing patch versions until January 31, 2025.

See the [RedisGraph end-of-life announcement](https://redis.com/blog/redisgraph-eol/) for more details.

#### Ubuntu 16.04

The deprecation of Ubuntu 16.04 was announced in the [Redis Enterprise Software 6.4.2 release notes](http://localhost:1313/rs/release-notes/rs-6-4-2-releases/#deprecations). As of Redis Enterprise Software 7.2, Ubuntu 16.04 is no longer supported.

#### RC4 cipher suites

RC4 cipher suites are deprecated.

## Known limitations

### Feature limitations

- TBA

### Upgrade limitations

TBA

### Operating system limitations

TBA
