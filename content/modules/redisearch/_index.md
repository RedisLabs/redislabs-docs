---
Title: RediSearch
linkTitle: RediSearch
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
---
The [RediSearch 2.x module](https://redis.com/blog/introducing-redisearch-2-0/) is a source-available project that lets you build powerful search queries for open source Redis databases.
When combined with Redis Enterprise Software, you can use the same RediSearch protocols and commands
to run geo-replicated queries and full-text searches over efficient in-memory indexes.

You can index more than one field per document, and these fields can represent text, numeric, or geospatial data types.
With RediSearch indexes you can do language-aware fuzzy matching, fast auto-complete, exact phrase matching, numeric filtering, and geo-radius queries.

As the documents in your database change, the index automatically processes these changes to keep your searches updated.
You can also limit the index to only contain the index structure so that the results return a unique docID.

For full-text searches, you can customize the field queries and ranking of the search results.
When querying, you can use multiple predicates that query text, numeric, and geospatial fields in one query.
You can also sort by a specific field and limit the results with an offset to easily produce customized results pages.

RediSearch supports [over 15 natural languages](https://redis.io/docs/stack/search/reference/stemming#supported-languages) for stemming and includes auto-complete engines with specific commands that can provide real-time [interactive search suggestions](https://redis.io/commands/ft.sugadd/).

## Store documents

The RediSearch engine indexes documents, which are lists of field-value pairs.
Although the index knows how to index each field, we also need to store the data for retrieval.
In a simple use case, you can just push documents to the database, and RediSearch creates a complete index and document database.

You can store documents as Redis [hashes](https://redis.io/docs/manual/data-types/#hashes) or JSON if you also have the [RedisJSON]({{<relref "/modules/redisjson">}}) module enabled.

### JSON documents

With [RedisJSON]({{<relref "/modules/redisjson">}}) enabled, you can store documents as JSON and retrieve them with search queries.

### Hash documents

With Redis [hashes](https://redis.io/docs/manual/data-types/#hashes), each document is represented by a single key, and each property and its value by a hash key and element.
You can run [`HGETALL`](https://redis.io/commands/hgetall/) for each retrieved document to return its entire data.
To retrieve a specific document by its ID, run `HGETALL`.

## RediSearch in Active-Active databases

As a result of the new RediSearch architecture and methodology, [RediSearch 2.x supports Active-Active databases]({{<relref "/modules/redisearch/redisearch-active-active">}}).
You can now serve your index information from geo-distributed database instances.

## Resharding and RediSearch

By moving the index out of the keyspace and structuring the data as hashes, RediSearch 2.x makes it possible to reshard the database.
When half of the data moves to the new shard, the index related to that data is created synchronously and RediSearch removes the keys from the index when it detects that the keys were deleted.
Because the index on the new shard is created synchronously though, it's expected that the resharding process will take longer than resharding of a database without RediSearch.

## Limitations

- You cannot use RediSearch with the [OSS Cluster API]({{<relref "/rs/databases/configure/enable-oss-cluster-api">}}).

## More info

- [Getting Started with RediSearch 2.0](https://redis.com/blog/getting-started-with-redisearch-2-0/)
- [RediSearch quick start]({{<relref "/modules/redisearch/redisearch-quickstart">}})
- [Configure RediSearch](https://redis.io/docs/stack/search/configuring/)
- [RediSearch commands](https://redis.io/docs/stack/search/commands/)
- [RediSearch source](https://github.com/RediSearch/RediSearch)
