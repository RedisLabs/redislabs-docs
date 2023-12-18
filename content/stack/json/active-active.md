---
Title: Store JSON in Active-Active databases
linkTitle: Active-Active databases
description: JSON support and conflict resolution rules for Active-Active databases.
weight: 50
alwaysopen: false
categories: ["Modules"]
aliases: /modules/redisjson/active-active/
---

RedisJSON v2.2 adds support for JSON in [Active-Active Redis Enterprise databases]({{<relref "/rs/databases/active-active">}}).

The design is based on [A Conflict-Free Replicated JSON Datatype](https://arxiv.org/abs/1608.03960) by Kleppmann and Beresford, but the implementation includes some changes. Several [conflict resolution rule](#conflict-resolution-rules) examples were adapted from this paper as well.

{{<embed-md "json-active-active-command-differences.md">}}

{{<embed-md "json-active-active-conflict-resolution.md">}}