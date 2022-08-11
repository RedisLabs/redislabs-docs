---
Title: RediSearch commands 
linkTitle: Commands 
description: Lists RediSearch commands and provides links to the command reference pages.
weight: 25
alwaysopen: false
toc: "false"
categories: ["Modules"]
---

The following table lists RediSearch commands. See the command links for more information about each command's syntax, arguments, and examples.

| Command | Description |
|---------|-------------|
| [FT.AGGREGATE](https://redis.io/commands/ft.aggregate/) | Runs a search query on an index and groups, sorts, transforms, limits, and/or filters the results. |
| [FT.ALIASADD](https://redis.io/commands/ft.aliasadd/) | Adds an alias to an index.  |
| [FT.ALIASDEL](https://redis.io/commands/ft.aliasdel/) | Removes an alias from an index. |
| [FT.ALIASUPDATE](https://redis.io/commands/ft.aliasupdate/) | Adds an alias to an index. If the alias already exists for a different index, it updates the alias to point to the specified index instead. |
| [FT.ALTER](https://redis.io/commands/ft.alter/) | Adds a new field to an index. |
| [FT.CONFIG GET](https://redis.io/commands/ft.config-get/) | Displays configuration options. |
| [FT.CONFIG HELP](https://redis.io/commands/ft.config-help/) | Describes configuration options. |
| [FT.CONFIG SET](https://redis.io/commands/ft.config-set/) | Sets configuration options. |
| [FT.CREATE](https://redis.io/commands/ft.create/) | Creates an index. |
| [FT.CURSOR DEL](https://redis.io/commands/ft.cursor-del/) | Deletes a cursor. |
| [FT.CURSOR&nbsp;READ](https://redis.io/commands/ft.cursor-read/) | Reads the next results from an existing cursor. |
| [FT.DICTADD](https://redis.io/commands/ft.dictadd/) | Adds terms to a dictionary. |
| [FT.DICTDEL](https://redis.io/commands/ft.dictdel/) | Deletes terms from a dictionary. |
| [FT.DICTDUMP](https://redis.io/commands/ft.dictdump/) | Returns all terms in the specified dictionary. |
| [FT.DROPINDEX](https://redis.io/commands/ft.dropindex/) | Deletes an index. |
| [FT.EXPLAIN](https://redis.io/commands/ft.explain/) | Returns the execution plan for a complex query as a string. |
| [FT.EXPLAINCLI](https://redis.io/commands/ft.explaincli/) | Returns the execution plan for a complex query as an [array](https://redis.io/docs/reference/protocol-spec#resp-arrays). |
| [FT.INFO](https://redis.io/commands/ft.info/) | Returns index information and statistics.  |
| [FT._LIST](https://redis.io/commands/ft._list/) | Lists all indexes. |
| [FT.PROFILE](https://redis.io/commands/ft.profile/) | Runs [FT.SEARCH](https://redis.io/commands/ft.search/) or [FT.AGGREGATE](https://redis.io/commands/ft.aggregate/) and reports performance information. |
| [FT.SEARCH](https://redis.io/commands/ft.search/) | Searches an index for a text query and returns matching documents or document IDs. |
| [FT.SPELLCHECK](https://redis.io/commands/ft.spellcheck/) | Suggests spelling corrections for misspelled terms in a query. |
| [FT.SYNDUMP](https://redis.io/commands/ft.syndump/) | Returns a list of synonym terms and their synonym group IDs. |
| [FT.SYNUPDATE](https://redis.io/commands/ft.synupdate/) | Creates or updates a synonym group with additional terms. |
| [FT.TAGVALS](https://redis.io/commands/ft.tagvals/) | Returns all distinct values indexed in a tag field. |
