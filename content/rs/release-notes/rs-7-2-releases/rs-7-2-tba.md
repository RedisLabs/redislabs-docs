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

Redis ACLs in Redis Enterprise version 7.2 support key permissions and selectors.

Key permissions:

- `%R~<pattern>`: Grants read access to keys that match the given pattern.

- `%W~<pattern>`: Grants write access to keys that match the given pattern.

- `%RW~<pattern>`: Alias for `~<pattern>`. Grants read and write access to keys that match the given pattern.

    See [key permissions](https://redis.io/docs/management/security/acl/#key-permissions) for more information.

Selectors let you define multiple sets of rules in a single Redis ACL (only supported for databases with Redis version 7.2 or later). A command is allowed if it matches the base rule or any selector in the Redis ACL. See [selectors](https://redis.io/docs/management/security/acl/#selectors) for more information.

- `(<rule list>)`: Creates a new selector.

- `clearselectors`: Deletes all existing selectors for a user. This action does not delete the base ACL rule.

Redis ACLs have the following differences in Redis Enterprise Software:

- Nested selectors are not supported.

    For example, the following selectors are not valid in Redis Enterprise: <nobr>`+GET ~key1 (+SET (+SET ~key2) ~key3)`</nobr>

- Key and pub/sub patterns do not allow the following characters: `'(', ')'`

- The following password configuration syntax is not supported: `'>', '<', '#!', 'resetpass'`

    To configure passwords in Redis Enterprise Software, use one of the following methods:

    - [`rladmin cluster reset_password`]({{<relref "/rs/references/cli-utilities/rladmin/cluster/reset_password">}}):
    
        ```sh
        rladmin cluster reset_password <user email>
        ```

    - REST API [`PUT /v1/users`]({{<relref "/rs/references/rest-api/requests/users#put-user">}}) request and provide `password`

- The **ACL builder** does not support selectors and key permissions. Use **Free text command** to manually define them instead.

#### RESP3 support

Support for RESP3 and the [`HELLO`](https://redis.io/commands/hello/) command was added in Redis Enterprise 7.2.

To use RESP3 with Redis Enterprise:

1. Upgrade Redis servers to version 7.2 or later.

    For Active-Active and Replica Of databases:
 
    1. Upgrade all participating clusters to Redis Enterprise version 7.2.x or later.
 
    1. Upgrade all databases to version 7.x or later.

1. Enable RESP3 support for your database (`enabled` by default):

    ```sh
    rladmin tune db db:<ID> resp3 enabled
    ```

If you run Redis Stack commands with Redis clients [Go-Redis](https://redis.uptrace.dev/) version 9 or [Lettuce](https://lettuce.io/) versions 6 and later, see [client prerequisites](#client-prerequisites-for-redis-72-upgrade) before you upgrade to Redis 7.2 to learn how to prevent potential application issues due to RESP3 breaking changes.

#### Sharded pub/sub

[Sharded pub/sub](https://redis.io/docs/interact/pubsub/#sharded-pubsub) is now supported.

You cannot use sharded pub/sub if you [deactivate RESP3 support]({{<relref "/rs/references/compatibility/resp#deactivate-resp3">}}).

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

#### Client prerequisites for Redis 7.2 upgrade

The Redis clients [Go-Redis](https://redis.uptrace.dev/) version 9 and [Lettuce](https://lettuce.io/) versions 6 and later use RESP3 by default. If you use either client to run Redis Stack commands, you should set the client's protocol version to RESP2 before upgrading your database to Redis version 7.2 to prevent potential application issues due to RESP3 breaking changes.

For applications using Go-Redis v9.0.5 or later, set the protocol version to RESP2:

```go
client := redis.NewClient(&redis.Options{
    Addr:     "<database_endpoint>",
    Protocol: 2, // Pin the protocol version
})
```

To set the protocol version to RESP2 with Lettuce v6 or later:

```java
import io.lettuce.core.*;
import io.lettuce.core.api.*;
import io.lettuce.core.protocol.ProtocolVersion;

// ...
RedisClient client = RedisClient.create("<database_endpoint>");
client.setOptions(ClientOptions.builder()
        .protocolVersion(ProtocolVersion.RESP2) // Pin the protocol version 	
        .build());
// ...
```

If you are using [LettuceMod](https://github.com/redis-developer/lettucemod/), you need to upgrade to [v3.6.0](https://github.com/redis-developer/lettucemod/releases/tag/v3.6.0).

### Upcoming changes

#### Prepare for restrictive pub/sub permissions

Redis database version 6.2 introduced pub/sub ACL rules that determine which [pub/sub channels](https://redis.io/docs/manual/pubsub/) a user can access.

The configuration option `acl-pubsub-default`, added in Redis Enterprise Software version 6.4.2, determines the cluster-wide default level of access for all pub/sub channels. Redis Enterprise Software uses the following pub/sub permissions by default:

- For versions 6.4.2 and 7.2, `acl-pubsub-default` is permissive (`allchannels` or `&*`) by default to accommodate earlier Redis versions.

- In future versions, `acl-pubsub-default` will change to restrictive (`resetchannels`). Restrictive permissions block all pub/sub channels by default, unless explicitly permitted by an ACL rule.

If you use ACLs and pub/sub channels, you should review your databases and ACL settings and plan to transition your cluster to restrictive pub/sub permissions in preparation for future Redis Enterprise Software releases.

When you change the cluster's default pub/sub permissions to restrictive, `&*` is added to the **Full Access** ACL. Before you make this change, consider the following:

- Because pub/sub ACL syntax was added in Redis 6.2, you can't associate the **Full Access** ACL with database versions 6.0 or lower after this change.

- The **Full Access** ACL is not reverted if you change `acl-pubsub-default` to permissive again.

- Every database with the default user enabled uses the **Full Access** ACL.

To secure pub/sub channels and prepare your cluster for future Redis Enterprise Software releases that default to restrictive pub/sub permissions:

1. Upgrade Redis databases:

    - For Redis Enterprise Software version 6.4.2, upgrade all databases in the cluster to Redis DB version 6.2.

    - For Redis Enterprise Software version 7.2, upgrade all databases in the cluster to Redis DB version 7.2 or 6.2.

1. Create or update ACLs with permissions for specific channels using the `resetchannels &channel` format.

1. Associate the ACLs with relevant databases.

1. Set default pub/sub permissions (`acl-pubsub-default`) to restrictive. See [Change default pub/sub permissions](#change-default-pubsub-permissions) for details.

1. If any issues occur, you can temporarily change the default pub/sub setting back to permissive. Resolve any problematic ACLs before making pub/sub permissions restrictive again.

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
