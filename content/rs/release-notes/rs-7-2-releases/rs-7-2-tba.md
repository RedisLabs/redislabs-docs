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

- Redis 7.0 and 7.2 features

- Three Redis database versions: 7.2, 6.2, 6.0

- Enhanced Auto Tiering (Redis on Flash) with Speedb and license updates

- Redis ACL selectors and enhanced key-based permissions

- RESP3 support

- Sharded pub/sub

- A preview of the redesigned cluster management UI (admin console)

- Triggers and Functions preview

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

#### Redis 7.0 features

The following Redis 7.0 features are now supported:

- [Redis functions](https://redis.io/docs/interact/programmability/functions-intro/)

    In Redis Enterprise Software, [`FUNCTION STATS`](https://redis.io/commands/function-stats/) returns an extra parameter, an array called `all_running_scripts`, to reflect multiple functions running at the same time.

- [Multipart AOF](https://redis.io/docs/management/persistence/#append-only-file) (append-only files)

- New commands

- Sharded `PUBSUB` (see [Sharded pub/sub](#sharded-pubsub) for details)

#### Redis 7.2 features

The following Redis 7.2 features are now supported:

- Various performance improvements

- `CONFIG SET` for locale

- Module API improvements

- Connection layer modularization

- Encoding improvements: listpack for sets and lists

- Observability: authentication metrics (exposed by `INFO` command)

- Stream consumer group improvements

- Commands: `ZRANK`, `ZREVRANK` new `WITHSCORE` option

- Shard IDs in cluster shards topology

- Introduce shard ID to Redis cluster

- Support `CLIENT NO-TOUCH` command

- `WAIT AOF`

#### Three Redis database versions

TBA

7.2, 6.2, 6.0

#### Auto Tiering (Redis on Flash) enhancements

TBA

#### Redis ACL selectors and key-based permissions

TBA

#### RESP3 support

TBA

#### Sharded pub/sub

TBA

#### New cluster management UI preview

A preview of the redesigned cluster management UI (admin console) is available in Redis Enterprise Software version 7.2.

To try out the new UI:

- On the sign in screen:

    1. Enter your credentials.

    1. Select **Sign in the new interface**.

- If you are currently signed in to the legacy UI:

    1. Select **Switch to the new Admin Console** to expand the banner at the top of the screen.
    
    1. Click the **Try it now** button to open the new UI in another tab.

##### New UI benefits

- User-driven design

- Provides full functionality to complete tasks entirely in the UI

- New attributes and improved feature visibility

- Provides configuration flexibility while highlighting the recommended path

- Addresses the needs of different personas and use cases

- Quicker troubleshooting and easier maintenance

##### New UI highlights

- More configurable database attributes, including replica high availability, shards placement, and proxy policy.

- Nodes indicate whether it’s a primary or secondary node.

- Modules show the databases that are using them.

- Certificates show expiration and validity, and you can upload and copy certificates.

- Cluster license displays the number of shards that are used out of the number of shards that are licensed to the cluster. The new UI allows you to paste or upload a new license.

- Role-based access control (RBAC) has explanations to improve clarity. 

- Access Control List (ACLs) now support defining ACLs for modules.

- The databases screen has more information per database for faster troubleshooting. It also allows you to filter databases and compare database metrics.

- The cluster name, user, and user role are shown in the upper right for quickly identifying the cluster from any screen. You can also **Change user password** from the dropdown menu.

- Auto Tiering licensing and an emergency switch for the flash engine (available only in the new UI).

- Input validations.

##### New UI limitations

The following features are not supported in this preview but will be added in future releases. Until then, temporarily switch to the legacy UI to do the following:

- Provision and configure Active-Active databases (viewing is available).

- Search and export the event log.

- Remove a node from the UI.

Additional limitations:

- Although Redis supports memcached databases, the new UI only allows view and delete. Memcached users are advised to migrate to Redis to enjoy the full benefits of Redis and its UI.

To open the legacy admin console when signed in to the new UI, select your username, then select **Switch to legacy Admin Console** from the list:

{{<image filename="images/rs/screenshots/switch-to-legacy-ui.png"  width="300px" alt="Select switch to legacy admin console from the dropdown.">}}{{</image>}}

##### Future UI enhancements

- Configure default database settings and database upgrade settings

- Security preferences related to password and login management

- LDAP improvements

- IPv6 support

- ACL improvements, such as ACLv2 smart validations

- And more


#### Triggers and Functions preview

TBA

#### Redis modules 

Redis Enterprise Software v7.2 includes the new features delivered in the latest [Redis Stack release (TBA)](https://redis.com/blog/introducing-redis-stack-6-2-6-and-7-0-6/):

- TBA

See [Upgrade modules](https://docs.redis.com/latest/stack/install/upgrade-module/) to learn how to upgrade a module for a database.

## Version changes 

### Breaking changes

- TBA

### Deprecations


#### Access control deprecations

The following predefined roles and Redis ACLs are not available after upgrading to Redis Enterprise Software version 7.2 if they are not associated with any users or databases in the cluster:

- Custom roles (not management roles): Cluster Member, Cluster Viewer, DB Member, DB Viewer, None.

- Redis ACLs: Not Dangerous and Read Only.

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
