---
Title: RediSearch
description:
weight: 10
alwaysopen: false
categories: ["Modules"]
aliases:
  - /rs/developing/modules/redisearch/
---
The RediSearch 2.x module is a source-available project that lets you build powerful searches for Redis databases.
When combined with Redis Enterprise Software (RS), you can use the same RediSearch protocols and commands
to get a geo-replicated, integrated query, and full-text search over efficient in-memory indexes.

You can build compound indexes that index multiple fields in documents with text, numeric, and geospatial data types.
With those indexes you can do language-aware fuzzy matching, fast auto-complete, exact phrase matching, numeric filtering, and geo-radius queries.

As the documents in your database change, the index automatically processes these changes to keep your searches updated.
You can also limit the index to only contain the index structure so that the results return a unique docID.

For full-text searches, developers can customize the field queries and ranking of the search results.
When querying, developers can use multiple predicates that query both text, numeric, and geospatial fields in one query.
Sorting can be done by a given field as well and can be limited with an offset for simplified support for results pages.

RediSearch is language aware and support the following languages for stemming:

    "arabic", "danish", "dutch", "english", "finnish", "french", "german", "hungarian", "italian", "norwegian", "portuguese", "romanian", "russian", "spanish", "swedish", "tamil", "turkish"

The index supports auto-complete engines with specific commands that can provide real-time interactive search suggestions.

## RediSearch Index

The fundamental part of any search engine is the inverted index.
The search index is a map between words or terms to the respective documents they appear in.

If we have two documents, one titled _Hello World_ and the other titled "Hello Kitty",
a search engine would keep an inverted index of the word "hello" that contains two records, one for each of these documents.

Searching consists of loading, traversing, intersecting (if needed) and sorting these indexes in order to produce the most relevant results.
The index gets more complex as the indexes contain relevant scores, term positions in the document, and other fine details.

Until now, inverted indexes on top of a Redis database were always modeled with Redis native data types, usually sorted sets,
where the document ID was stored as the "element" and the relevance as the "score."
This worked great because it allowed developers to use Redis intersection and union to perform multi-word searches,
but this approach doesn't support exact phrase search, it has a high memory overhead, and can be slow with big record intersections.

## Storing documents

The RediSearch engine indexes "documents", which are a list of field-value pairs.
The index knows how to index each field, but that's not enough.
We need to actually store the data for retrieval.
In a simple use case, you can just push documents to the database and RediSearch creates a complete index and document database.

For storing documents, the RediSearch engine relies on Redis hash keys,
where each document is represented by a single key, and each property and its value by a hash key and element.
For retrieval, we simply perform an HGETALL query on each retrieved document, returning its entire data.
If the user needs to retrieve a specific document by its ID, a simple HGETALL can be performed by the user.

## RediSearch in Active-Active databases

As a result of the new RediSearch architecture and methodology, [RediSearch 2.x supports Active-Active databases]({{< relref "/modules/redisearch/redisearch-active-active.md" >}}).
You can now serve your index information from geo-distributed database instances.

## Resharding and RediSearch

By moving the index out of the keyspace and structuring the data as hashes, we made it possible to reshard the database.
When half of the data moves to the new shard, the index related to that data is created synchronously and RediSearch removes the keys from the index when it detects that the keys were deleted.
Because the index on the new shard is created synchronously though, it's expected that the resharding process will take longer than resharding of a database without RediSearch.

## Related links

- [RediSearch Quick Start Guide]({{< relref "/modules/redisearch/redisearch-quickstart.md" >}})
- [Configuring RediSearch](https://oss.redislabs.com/redisearch/Configuring/)
- [RediSearch commands](http://redisearch.io/)
