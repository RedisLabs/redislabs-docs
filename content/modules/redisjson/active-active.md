---
Title: RedisJSON in Active-Active databases
linkTitle: Active-Active databases
description: RedisJSON support for Active-Active databases.
weight: 30
alwaysopen: false
categories: ["Modules"]
---

RedisJSON v2.x added support for using RedisJSON commands in Active-Active databases.

## Command differences

Several RedisJSON commands work differently for Active-Active databases.

`JSON.CLEAR`

`JSON.NUMMULTBY` is not supported in Active-Active databases.

## Conflict resolution

The following conflict resolution rules show how Active-Active databases resolve conflicts when RedisJSON commands run on different replicas and then attempt to sync.

There are two types of conflict resolution:

- Merge
- Win over

### Conflict resolution rules

TBA