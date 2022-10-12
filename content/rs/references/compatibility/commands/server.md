---
Title: Server management commands compatibility
linkTitle: Server management
description: Server management commands compatible with Redis Enterprise.
weight: 10
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: 
---

## Access control commands

Several access control list (ACL) commands are not available in Redis Enterprise. Instead, you can manage access controls from the admin consoles for [Redis Enterprise Software]({{<relref "/rs/security/access-control">}}) and [Redis Cloud]({{<relref "/rc/security/database-security/passwords-users-roles#role-based-access-control">}}).

| Command | Redis<br />Enterprise | Redis<br />Cloud | Notes |
|:--------|:----------------------|:-----------------|:------|
| [ACL CAT](https://redis.io/commands/acl-cat) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ACL DELUSER](https://redis.io/commands/acl-deluser) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [ACL GENPASS](https://redis.io/commands/acl-genpass) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [ACL GETUSER](https://redis.io/commands/acl-getuser) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ACL HELP](https://redis.io/commands/acl-help) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ACL LIST](https://redis.io/commands/acl-list) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ACL LOAD](https://redis.io/commands/acl-load) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [ACL LOG](https://redis.io/commands/acl-log) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [ACL SAVE](https://redis.io/commands/acl-save) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [ACL SETUSER](https://redis.io/commands/acl-setuser) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [ACL USERS](https://redis.io/commands/acl-users) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [ACL WHOAMI](https://redis.io/commands/acl-whoami) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |


## Monitoring commands

| Command | Redis<br />Enterprise | Redis<br />Cloud | Notes |
|:--------|:----------------------|:-----------------|:------|
| [INFO](https://redis.io/commands/info) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [LATENCY DOCTOR](https://redis.io/commands/latency-doctor) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [LATENCY GRAPH](https://redis.io/commands/latency-graph) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [LATENCY HELP](https://redis.io/commands/latency-help) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [LATENCY HISTORY](https://redis.io/commands/latency-history) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [LATENCY LATEST](https://redis.io/commands/latency-latest) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [LATENCY RESET](https://redis.io/commands/latency-reset) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [MEMORY DOCTOR](https://redis.io/commands/memory-doctor) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [MEMORY HELP](https://redis.io/commands/memory-help) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [MEMORY MALLOC-STATS](https://redis.io/commands/memory-malloc-stats) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [MEMORY PURGE](https://redis.io/commands/memory-purge) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [MEMORY STATS](https://redis.io/commands/memory-stats) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [MEMORY USAGE](https://redis.io/commands/memory-usage) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [MONITOR](https://redis.io/commands/monitor) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [SLOWLOG](https://redis.io/commands/slowlog) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |


## Persistence commands

Data persistence and backup commands are not available in Redis Enterprise. Instead, you can [manage data persistence]({{<relref "/rs/databases/configure/database-persistence">}}) and [backups]({{<relref "/rs/databases/import-export/schedule-backups">}}) from the admin consoles for Redis Enterprise Software and [Redis Cloud]({{<relref "/rc/databases/view-edit-database#durability-section">}}).

| Command | Redis<br />Enterprise | Redis<br />Cloud | Notes |
|:--------|:----------------------|:-----------------|:------|
| [BGREWRITEAOF](https://redis.io/commands/bgrewriteaof) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [BGSAVE](https://redis.io/commands/bgsave) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [LASTSAVE](https://redis.io/commands/lastsave) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [SAVE](https://redis.io/commands/save) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |


## Replication commands

Redis Enterprise automatically manages [replication]({{<relref "/rs/databases/durability-ha/replication">}}).

| Command | Redis<br />Enterprise | Redis<br />Cloud | Notes |
|:--------|:----------------------|:-----------------|:------|
| [MIGRATE](https://redis.io/commands/migrate) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [PSYNC](https://redis.io/commands/psync) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [REPLICAOF](https://redis.io/commands/replicaof) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [SLAVEOF](https://redis.io/commands/slaveof) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | Deprecated as of Redis v5.0.0. |
| [SYNC](https://redis.io/commands/sync) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
