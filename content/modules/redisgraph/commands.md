---
Title: RedisGraph commands 
linkTitle: Commands 
description: Lists RedisGraph commands and provides links to the command reference pages.
weight: 25
alwaysopen: false
toc: "false"
categories: ["Modules"]
---

The following table lists RedisGraph commands. See the command links for more information about each command's syntax, arguments, and examples.

| Command | Description |
|---------|-------------|
| [GRAPH.CONFIG GET](https://redis.io/commands/graph.config-get/) | Returns the current value of a [RedisGraph configuration parameter](https://redis.io/docs/stack/graph/configuration/#redisgraph-configuration-parameters). |
| [GRAPH.CONFIG SET](https://redis.io/commands/graph.config-set/) | Changes the value of a [RedisGraph configuration parameter](https://redis.io/docs/stack/graph/configuration/#redisgraph-configuration-parameters). |
| [GRAPH.DELETE](https://redis.io/commands/graph.delete/) | Removes the graph and its entities. |
| [GRAPH.EXPLAIN](https://redis.io/commands/graph.explain/) | Displays the query execution plan but does not run the query. |
| [GRAPH.LIST](https://redis.io/commands/graph.list/) | Lists all graph keys. |
| [GRAPH.PROFILE](https://redis.io/commands/graph.profile/) | Runs a query and displays the execution plan with metrics for each operation. |
| [GRAPH.QUERY](https://redis.io/commands/graph.query/) | Runs a query against a graph. Supports a variety of [clauses](https://redis.io/commands/graph.query/#query-structure) and [functions](https://redis.io/commands/graph.query/#functions). |
| [GRAPH.RO_QUERY](https://redis.io/commands/graph.ro_query/) | Runs a read-only query against a graph. |
| [GRAPH.SLOWLOG](https://redis.io/commands/graph.slowlog/) | Returns the slowest 10 queries run against a specific graph. |
