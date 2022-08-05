---
Title: RedisJSON 2.2 release notes
linkTitle: v2.2 (July 2022)
description: Preview of Active-Active support for JSON.
min-version-db: "6.0.0"
min-version-rs: "6.2.12"
weight: 98
alwaysopen: false
categories: ["Modules"]
---
## Requirements

RedisJSON v2.2.0 requires:

- Minimum Redis compatibility version (database): 6.0.0
- Minimum Redis Enterprise Software version (cluster): 6.2.12

## v2.2.0 (July 2022)

A preview of RedisJSON 2.2 is available for Free and Fixed subscription plans in Redis Cloud.

### Headlines

This release adds support for the JSON data structure as a CRDT (Conflict-free Replicated Data Type) when used with Redis Enterprise [Active-Active databases](https://docs.redis.com/latest/rs/databases/active-active/).

Active-Active JSON requires Redis Enterprise Software v6.2.12. Contact your account manager or support to access the preview of Redis Enterprise v6.2.12.

### Details

- Enhancements:

  - [#758](https://github.com/RedisJSON/RedisJSON/pull/758) Add support for [`COPY`](https://redis.io/commands/copy/)
