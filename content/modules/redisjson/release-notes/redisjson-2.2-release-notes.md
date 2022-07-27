---
Title: RedisJSON 2.2 release notes
linkTitle: v2.2 (July 2022)
description: Active-Active support for JSON.
min-version-db: "6.0.0"
min-version-rs: "6.0.0"
weight: 98
alwaysopen: false
categories: ["Modules"]
---
## Requirements

RedisJSON v2.2.0 requires:

- Minimum Redis compatibility version (database): 6.0.0
- Minimum Redis Enterprise Software version (cluster): 6.0.0

## v2.2.0 (July 2022)

This is the General Availability release of RedisJSON 2.2.

### Headlines

This release adds support for the JSON data structure as a CRDT (Conflict-free Replicated Data Type) when used with Redis Enterprise [Active-Active databases](https://docs.redis.com/latest/rs/databases/active-active/develop/).

### Details

- Enhancements:

  - [#758](https://github.com/RedisJSON/RedisJSON/pull/758) Add support for [`COPY`](https://redis.io/commands/copy/)
