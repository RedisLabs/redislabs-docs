---
Title: Key commands compatibility
linkTitle: Keys (generic)
description: Generic key commands compatible with Redis Enterprise.
weight: 10
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: 
---

| Command | Redis<br />Enterprise | Redis<br />Cloud | Notes |
|:--------|:----------------------|:-----------------|:------|
| [COPY](https://redis.io/commands/copy) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes\* | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes\* | \*Not supported for stream consumer group info. |
| [DEL](https://redis.io/commands/del) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [DUMP](https://redis.io/commands/dump) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [EXISTS](https://redis.io/commands/exists) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [EXPIRE](https://redis.io/commands/expire) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [EXPIREAT](https://redis.io/commands/expireat) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [EXPIRETIME](https://redis.io/commands/expiretime) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [KEYS](https://redis.io/commands/keys) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [MIGRATE](https://redis.io/commands/migrate) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [MOVE](https://redis.io/commands/move) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [OBJECT](https://redis.io/commands/object) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [PERSIST](https://redis.io/commands/persist) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [PEXPIRE](https://redis.io/commands/pexpire) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [PEXPIREAT](https://redis.io/commands/pexpireat) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [PEXPIRETIME](https://redis.io/commands/pexpiretime) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [PTTL](https://redis.io/commands/pttl) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [RANDOMKEY](https://redis.io/commands/randomkey) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [RENAME](https://redis.io/commands/rename) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [RENAMENX](https://redis.io/commands/renamenx) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [RESTORE](https://redis.io/commands/restore) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [SCAN](https://redis.io/commands/scan) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [SORT](https://redis.io/commands/sort) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [TOUCH](https://redis.io/commands/touch) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [TTL](https://redis.io/commands/ttl) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [TYPE](https://redis.io/commands/type) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [UNLINK](https://redis.io/commands/unlink) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes |  |
| [WAIT](https://redis.io/commands/wait) | &#x2705; Yes\*<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | \*Blocked by default, but you can change the CCS flag to enable it. |
