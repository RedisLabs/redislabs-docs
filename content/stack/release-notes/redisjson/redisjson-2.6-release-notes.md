---
Title: RedisJSON 2.6 release notes
linkTitle: v2.6 (July 2023)
description: RESP3 support. New commands JSON.MERGE and JSON.MSET.
min-version-db: "7.1"
min-version-rs: "7.2"
weight: 96
alwaysopen: false
toc: "true"
categories: ["Modules"]
aliases: 
---
## Requirements

RedisJSON v2.6.4 requires:

- Minimum Redis compatibility version (database): 7.1
- Minimum Redis Enterprise Software version (cluster): 7.2

## v2.6 GA (v2.6.4) (July 2023)

This is the General Availability release of RedisJSON 2.6.

### Headlines

RedisJSON 2.6 introduces support for RESP3 and new commands.

### What's new in 2.6

- Introduce [`JSON.MERGE`](https://redis.io/commands/json.merge) in compliance with [RFC 7396](https://datatracker.ietf.org/doc/html/rfc7396), supporting:

  - Creating new attributes on an existing JSON document

  - Updating and replacing values in parent and child attributes

  - Deleting existing attributes (by setting the value to `null`)

  - Array update - replacing an entire array with the new value

- Introduce [`JSON.MSET`](https://redis.io/commands/json.mset/), supporting atomic multiple sets for keys in the same hash slot

- New `FORMAT` argument in `JSON.ARRPOP` and `JSON.GET` to retrieve the results as JSON strings or RESP3 hierarchical structures (RESP3 only)

- `JSON.RESP` is now regarded as deprecated

- Legacy paths (paths that don't start with either `$.` or `$[` or equal to `$`) are now regarded as deprecated

{{<note>}}
- The version inside Redis will be 2.6.4 in semantic versioning. Since the version of a module in Redis is numeric, we could not add a GA flag.

- Minimal Redis version: 7.2
{{</note>}}
