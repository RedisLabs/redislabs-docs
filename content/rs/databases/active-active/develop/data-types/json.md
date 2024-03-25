---
Title: JSON in Active-Active databases
linkTitle: JSON
description: Information about using JSON with an Active-Active database.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: [
        /rs/references/developing-for-active-active/developing-json-active-active.md,
        /rs/references/developing-for-active-active/developing-json-active-active/,
        /rs/developing/crdbs/json/,
        /rs/databases/active-active/data-types/json-active-active.md,
        /rs/databases/active-active/data-types/json-active-active/,
        /rs/databases/active-active/develop/json.md,
        /rs/databases/active-active/develop/json/,
        /rs/databases/active-active/develop/data-types/json.md,
        /rs/databases/active-active/develop/data-types/json/

]
---
Active-Active databases support JSON data structures.

The design is based on [A Conflict-Free Replicated JSON Datatype](https://arxiv.org/abs/1608.03960) by Kleppmann and Beresford, but the implementation includes some changes. Several [conflict resolution rule](#conflict-resolution-rules) examples were adapted from this paper as well.

## Prerequisites

To use JSON in an Active-Active database, you must enable JSON during database creation.

Active-Active Redis Cloud databases add JSON by default. See [Create an Active-Active subscription]({{<relref "/rc/databases/create-active-active-database#select-capabilities">}}) in the Redis Cloud documentation for details.

In Redis Enterprise Software, JSON is not enabled by default for Active-Active databases. See [Create an Active-Active JSON database]({{<relref "/stack/json/active-active#create-an-active-active-json-database">}}) in the Redis Stack and Redis Enterprise documentation for instructions.

{{<embed-md "json-active-active-command-differences.md">}}

{{<embed-md "json-active-active-conflict-resolution.md">}}