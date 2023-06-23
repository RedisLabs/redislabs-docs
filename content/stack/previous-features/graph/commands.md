---
Title: Graph commands 
linkTitle: Commands 
description: Lists graph commands and provides links to the command reference pages.
weight: 25
alwaysopen: false
toc: "false"
categories: ["Modules"]
aliases: /modules/redisgraph/commands/
---

The following table lists graph commands. See the command links for more information about each command's syntax, arguments, and examples.

| Command | Redis Enterprise Software | Redis Cloud<br />Flexible & Annual | Redis Cloud<br />Free & Fixed | Description |
|:--------|:----------------------|:-----------------|:-----------------|:------|
| [GRAPH.CONFIG GET](https://redis.io/commands/graph.config-get/) | <span title="Not supported"><nobr>&#x274c; Not supported</span> | <span title="Not supported"><nobr>&#x26A0;&#xFE0F; Not supported</span><sup>[2](#table-note-2)</sup> | <span title="Not supported"><nobr>&#x274c; Not supported</nobr></span> | Returns the current value of a [RedisGraph configuration parameter](https://redis.io/docs/stack/graph/configuration/#redisgraph-configuration-parameters). |
| [GRAPH.CONFIG SET](https://redis.io/commands/graph.config-set/) | <span title="Not supported"><nobr>&#x26A0;&#xFE0F; Not supported</span><sup>[1](#table-note-1)</sup> | <span title="Not supported"><nobr>&#x26A0;&#xFE0F; Not supported</span><sup>[2](#table-note-2)</sup> | <span title="Not supported"><nobr>&#x274c; Not supported</nobr></span> | Changes the value of a [RedisGraph configuration parameter](https://redis.io/docs/stack/graph/configuration/#redisgraph-configuration-parameters). |
| [GRAPH.DELETE](https://redis.io/commands/graph.delete/) | <span title="Supported">&#x2705; Supported</span> | <span title="Supported">&#x2705; Supported</span> | <span title="Supported">&#x2705; Supported</nobr></span> | Removes the graph and its entities. |
| [GRAPH.EXPLAIN](https://redis.io/commands/graph.explain/) | <span title="Supported">&#x2705; Supported</span> | <span title="Supported">&#x2705; Supported</span> | <span title="Supported">&#x2705; Supported</nobr></span> | Displays the query execution plan but does not run the query. |
| [GRAPH.LIST](https://redis.io/commands/graph.list/) | <span title="Supported">&#x2705; Supported</span> | <span title="Supported">&#x2705; Supported</span> | <span title="Supported">&#x2705; Supported</nobr></span> | Lists all graph keys. |
| [GRAPH.PROFILE](https://redis.io/commands/graph.profile/) | <span title="Supported">&#x2705; Supported</span> | <span title="Supported">&#x2705; Supported</span> | <span title="Supported">&#x2705; Supported</nobr></span> | Runs a query and displays the execution plan with metrics for each operation. |
| [GRAPH.QUERY](https://redis.io/commands/graph.query/) | <span title="Supported">&#x2705; Supported</span> | <span title="Supported">&#x2705; Supported</span> | <span title="Supported">&#x2705; Supported</nobr></span> | Runs a query against a graph. Supports a variety of [clauses](https://redis.io/commands/graph.query/#query-structure) and [functions](https://redis.io/commands/graph.query/#functions). |
| [GRAPH.RO_QUERY](https://redis.io/commands/graph.ro_query/) | <span title="Supported">&#x2705; Supported</span> | <span title="Supported">&#x2705; Supported</span> | <span title="Supported">&#x2705; Supported</nobr></span> | Runs a read-only query against a graph. |
| [GRAPH.SLOWLOG](https://redis.io/commands/graph.slowlog/) | <span title="Supported">&#x2705; Supported</span> | <span title="Supported">&#x2705; Supported</span> | <span title="Supported">&#x2705; Supported</nobr></span> | Returns the slowest 10 queries run against a specific graph. |

1. <a name="table-note-1" style="display: block; height: 80px; margin-top: -80px;"></a>Use [`rladmin`]({{<relref "/rs/references/cli-utilities/rladmin">}}) or the [REST API]({{<relref "/rs/references/rest-api">}}) to change RedisGraph configuration for Redis Enterprise Software. See [RedisGraph configuration compatibility with Redis Enterprise]({{<relref "/stack/previous-features/graph/config">}}) for more information and examples.

2. <a name="table-note-2" style="display: block; height: 80px; margin-top: -80px;"></a>[Contact support](https://redis.com/company/support/) to view the current RedisGraph configuration values or request configuration changes for Flexible or Annual Redis Enterprise Cloud subscriptions.