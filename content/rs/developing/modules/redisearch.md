---
Title: Developing Fast Search and Query with In-Memory Indexing
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
The RediSearch Enterprise Module combined with Redis Enterprise Software
(RS) provides a high performance, integrated query, and full-text search
over efficient in-memory indexes under high-speed data update rates.

RediSearch is a powerful search engine utilizing Redis Enterprise
Software as its storage engine, but unlike other Redis search libraries,
RediSearch does not use internal data structures like sorted sets. This
enables advanced features, such as language-aware fuzzy matching, fast
auto-complete, exact phrase matching, numeric filtering and geo-radius
queries.

You can build compound indexes, indexing multiple fields with text,
numeric or geo types. RediSearch can be used to index a few types of
data:

- Indexing new data stored in Redis: If you want to keep all data and
    index in Redis, this is the best approach. Do this using the ADD
    command.
- Indexing existing data in Redis hashes: If you have your data stored
    in hashes, that is the most convenient way to index your data. Do
    this through ADDHASH command.
- Index data that is stored in another database: If you already have
    the data in another database and all you want is a fast, lightweight
    in-memory index, this can reduce the data redundancy.
- The RediSearch index only keeps index data and not the full document
    in Redis. Do this using ADD command with NOSAVE option.

Applications developed with open source version of RediSearch are 100%
compatible with RediSearch in Redis Enterprise. The primary difference
between Enterprise RediSearch and the open source version is the
enterprise version is fully distributed when indexing and processing
queries, whereas the open source version is not. To understand this
better, read more below how RediSearch partitions work with RS's
sharding.

Indexing with RediSearch: RediSearch provides a highly functional index.
You can build compound indexes that index multiple fields in documents.
Text, numeric and geospatial data types are supported.

The indexing is done incrementally. As the documents change, you can
feed the changes to the index. You can keep the copy of documents that
are indexed to return them as part of the search results. However, this
is optional. You can limit the index to only contain the index structure
and results return the unique docID you feed in to help retrieve the
results from another database that contains the full document.

Search and Query with RediSearch: For full-text searches, developers can
customize the fields queries and ranking of the search results. When
querying, developers can use multiple predicates that query both text,
numeric, and geospatial fields in one query. Sorting can be done by a
given field as well and can be limited with an offset for simplified
result-paging support.

RediSearch is language aware and support the following languages for
stemming. The following list of languages are currently supported with
RediSearch: "arabic", "danish", "dutch", "english", "finnish", "french",
"german", "hungarian", "italian", "norwegian", "portuguese", "romanian",
"russian", "spanish", "swedish", "tamil", "turkish"

The index specifically supports auto-complete engines with specific
commands that can provide real-time interactive search suggestions.

## RediSearch Index

The fundamental part of any search engine is what's called an Inverted
Index. In very simple terms, a search index is a map between words or
terms, to the respective documents they appear in.

If we have two documents, one titled _Hello World_ and the other titled
"Hello Kitty", a search engine would keep an Inverted Index of the word
"hello" that contains two records, one for each of the aforementioned
documents.

Searching consists of loading, traversing, intersecting (if needed) and
sorting these indexes in order to produce the most relevant results. It
gets much more complicated, of course, as those indexes contain relevant
scores, term positions in the document and more - but that's beyond the
scope of this document.

Until now, Inverted Indexes on top of a Redis database were always
modeled with Redis native data types, usually Sorted Sets, where the
document ID was stored as the "element" and the relevance as the
"score." This worked great because it allowed developers to use Redis
intersection and union to perform multi-word searches, but the approach
has its limitations: it doesn't support exact phrase search, it has a
big memory overhead, and can be very slow with big records
intersections.

## Storing Documents

The RediSearch engine indexes "documents", which are a list of
field-value pairs. The index knows how to index each field, but that's
not enough. We need to actually store the data for retrieval. In a
simple use case, you can just push documents to RediSearch, and it
creates a complete index and document database, from which you retrieve
whole documents.

For storing documents, the RediSearch engine uses simple Redis HASH
keys, where each document is represented by a single key, and each
property and its value by a HASH key and element. For retrieval, we
simply perform an HGETALL query on each retrieved document, returning
its entire data. If the user needs to retrieve a specific document by
its id, a simple HGETALL can be performed by the user.

It is not mandatory to save the raw document content when indexing a
document, and you can even use the Redis database as a search index for
another database. In that case, you simply tell Redis not to store the
data by adding the NOSAVE modifier to the indexing command.

## Configuring

### Partitioning and Shards In Regards to RediSearch Enterprise

RediSearch Enterprise differs from its open source brother in one key
aspect. The enterprise version can work with multiple shards on a
distributed cluster such as Redis Enterprise Software and the open
source version is limited to using only one shard. When a RediSearch
enabled database in Redis Enterprise Software is created, the number of
partitions and shards the data will be spread across is set.

It is critical to understand that **this value can only be configured
when creating the database**. That makes it imperative in a production
cluster to set this value according to how many shards you will have. As
of RediSearch Enterprise 1.0.1, the default is **PARTITIONS AUTO**. So
the value will be set by the cluster on your behalf and matched to the
number of shards. Once you create the database, you will not be able to
edit this value or the number of shards the database has. If at a later
point you need to expand the database with more shards, you must create
a new database with the settings you need, then [replicate the
data]({{< relref "/rs/administering/active-passive.md" >}})
from the current database to the new one.

If you need to create a database that has a PARTITIONS value that is not
AUTO, this is not typical, you select the **Redis Modules** checkbox,
then the settings icon, the alter the number of partitions.

![redisearch_partitions](/images/rs/redisearch_partitions.png?width=700&height=119)

### Other Configurations

For other configurations, please see the [RediSearch site on
configuring](http://redisearch.io/Configuring/). To change these, please
use the settings icon and add configurations there.

## RediSearch Commands

For the authoritative list of RediSearch commands, please go
[here](http://redisearch.io/).
