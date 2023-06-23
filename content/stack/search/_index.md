---
Title: Search and query
linkTitle: Search and query
description:
weight: 20
alwaysopen: false
categories: ["Modules"]
aliases:
  - /redisearch/
  - /redissearch/
  - /redis-search/
  - /redis_search/
  - /rs/developing/modules/redisearch/
  - /rs/getting-started/creating-database/redisearch/
  - /modules/redisearch/redisearch-quickstart/
  - /modules/redisearch/search-json-quickstart/
  - /modules/redisearch/
---
The [RediSearch 2.x module](https://redis.com/blog/introducing-redisearch-2-0/) is a source-available project that lets you build powerful search queries for open source Redis databases.
When combined with Redis Enterprise Software, you can use the same protocols and [commands]({{<relref "/stack/search/commands">}})
to run geo-replicated queries and full-text searches over efficient in-memory indexes.

## Index documents

The search and query engine indexes documents, which are objects that represent data as field-value pairs. You can index more than one field per document, and these fields can represent text, numeric, or geospatial data types.

As the documents in your database change, the index automatically processes these changes to keep the search results up to date.

With indexes, you can do:
- Language-aware [fuzzy matching](https://redis.io/docs/stack/search/reference/query_syntax/#fuzzy-matching)
- Fast [auto-complete](https://redis.io/docs/stack/search/design/overview/#auto-completion)
- [Exact phrase matching](https://redis.io/docs/stack/search/reference/query_syntax/)
- [Numeric filtering](https://redis.io/docs/stack/search/reference/query_syntax/#numeric-filters-in-query)
- [Geo-radius queries](https://redis.io/docs/stack/search/reference/query_syntax/#geo-filters-in-query)

## Supported document types

You can store documents as Redis [hashes](https://redis.io/docs/manual/data-types/#hashes) or [JSON](http://www.json.org/). To search and query JSON documents, you also need to enable [JSON]({{<relref "/stack/json">}}) in your database.

### Hash documents

With Redis [hashes](https://redis.io/docs/manual/data-types/#hashes), each document is assigned to a single key and uses field-value pairs to represent the document's contents.

You can run [`HGETALL`](https://redis.io/commands/hgetall/) to retrieve the entire hash document.

### JSON documents

You can index, search, and query JSON documents stored in your database.

For more information about how to search and query JSON documents, see the [quick start](https://redis.io/docs/stack/search/indexing_json/).

## Search features

For full-text searches, you can customize the field queries and ranking of the search results.
When querying, you can use multiple predicates that query text, numeric, and geospatial fields in one query.
You can also sort by a specific field and limit the results with an offset to produce customized results pages.

Redis search and query supports [over 15 natural languages](https://redis.io/docs/stack/search/reference/stemming#supported-languages) for stemming and includes auto-complete engines with specific commands that can provide real-time [interactive search suggestions](https://redis.io/commands/ft.sugadd/).

## Search and query Active-Active databases

As a result of the new RediSearch architecture and methodology, [RediSearch 2.x supports Active-Active databases]({{<relref "/stack/search/search-active-active">}}).
You can now serve your index information from geo-distributed database instances.

## Resharding indexed data

By moving the index out of the keyspace and structuring the data as hashes, RediSearch 2.x makes it possible to reshard the database.
When half of the data moves to the new shard, the index related to that data is created synchronously and Redis removes the keys from the index when it detects that the keys were deleted.
Because the index on the new shard is created synchronously though, it's expected that the resharding process will take longer than resharding of a database without search and query enabled.

## Limitations

- You cannot use search and query capabilities with the [OSS Cluster API]({{<relref "/rs/databases/configure/oss-cluster-api">}}).

## More info

- [Getting Started with RediSearch 2.0](https://redis.com/blog/getting-started-with-redisearch-2-0/)
- [Search and query quick start](https://redis.io/docs/stack/search/quick_start/)
- [Search and query configuration]({{<relref "/stack/search/config">}})
- [Search and query commands]({{<relref "/stack/search/commands">}})
- [Search and query references](https://redis.io/docs/stack/search/reference/)
- [RediSearch source](https://github.com/RediSearch/RediSearch)
