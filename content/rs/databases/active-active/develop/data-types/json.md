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

## Create an Active-Active JSON database

To use JSON in an Active-Active database, you must enable JSON during database creation:

1. See [Create an Active-Active geo-replicated database ]({{<relref "/rs/databases/active-active/create">}}) for prerequisites and detailed steps.

1. In the **Capabilities** section of the **Create Active-Active database** screen, select **JSON**:

    {{<image filename="images/rs/screenshots/databases/active-active-databases/create-a-a-db-json-search.png" alt="Select JSON from the Capabilities section.">}}{{</image>}}

    {{<note>}}
When you select **JSON**, **Search and Query** is also selected by default to allow you to index and query JSON documents. If you do not want to use these additional features, you can clear the **Search and Query** check box.
    {{</note>}}

1. Configure additional database settings.

1. Select **Create**.

{{<embed-md "json-active-active-command-differences.md">}}

{{<embed-md "json-active-active-conflict-resolution.md">}}