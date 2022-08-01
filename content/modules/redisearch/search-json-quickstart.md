---
Title: RediSearch with JSON quick start
linkTitle: Quick start (with JSON)
description: Quick start for indexing and searching JSON documents.
weight: 22
alwaysopen: false
categories: ["Modules"]
module: RediSearch
aliases: /modules/redisearch/search-json-quickstart/
---

## Prerequisites

For this quick start tutorial, you need:

- A Redis database with the RediSearch and [RedisJSON]({{<relref "/modules/redisjson">}}) modules enabled. You can use either:

    - A [Redis Cloud]({{<relref "/modules/modules-quickstart.md">}}) database

    - A [Redis Enterprise Software]({{<relref "/modules/install/add-module-to-database">}}) database

- [`redis-cli`]({{<relref "/rs/references/cli-utilities/redis-cli">}}) command-line tool

- [`redis-py`](https://github.com/redis/redis-py) client library v4.0.0 or greater

## Search JSON with `redis-cli`

The [`redis-cli`]({{<relref "/rs/references/cli-utilities/redis-cli">}}) command-line tool comes packaged with Redis. You can use it to connect to your Redis database and test the following RediSearch commands.

### Connect to a database

```sh
$ redis-cli -h <endpoint> -p <port> -a <password>
127.0.0.1:12543>
```

### Create an index

The schema for this example has three fields: 
- `name` (`TEXT`)
- `description` (`TEXT`)
- `price` (`NUMERIC`)

<!-- TODO: mention/link to JSONPath -->

Use [`FT.CREATE`](https://redis.io/commands/ft.create) to create an index and define the schema:

```sh
127.0.0.1:12543> FT.CREATE itemIdx ON JSON PREFIX 1 item: SCHEMA $.name AS name TEXT $.description as description TEXT $.price AS price NUMERIC
```

See [Index limitations](https://redis.io/docs/stack/search/indexing_json/#index-limitations) for more details about JSON index SCHEMA restrictions.

### Add JSON documents

The following examples use these JSON documents to represent individual inventory items.

Item 1 JSON document:

```json
{
  "name": "Noise-cancelling Bluetooth headphones",
  "description": "Wireless Bluetooth headphones with noise-cancelling technology",
  "connection": {
    "wireless": true,
    "type": "Bluetooth"
  },
  "price": 99.98,
  "stock": 25,
  "colors": [
    "black",
    "silver"
  ]
}
```

Item 2 JSON document:

```json
{
  "name": "Wireless earbuds",
  "description": "Wireless Bluetooth in-ear headphones",
  "connection": {
    "wireless": true,
    "type": "Bluetooth"
  },
  "price": 64.99,
  "stock": 17,
  "colors": [
    "black",
    "white"
  ]
}
```

Use [`JSON.SET`](https://redis.io/commands/json.set) to store these documents in the database:

```sh
127.0.0.1:12543> JSON.SET item:1 $ '{"name":"Noise-cancelling Bluetooth headphones","description":"Wireless Bluetooth headphones with noise-cancelling technology","connection":{"wireless":true,"type":"Bluetooth"},"price":99.98,"stock":25,"colors":["black","silver"]}'
"OK"
127.0.0.1:12543> JSON.SET item:2 $ '{"name":"Wireless earbuds","description":"Wireless Bluetooth in-ear headphones","connection":{"wireless":true,"type":"Bluetooth"},"price":64.99,"stock":17,"colors":["black","white"]}'
"OK"
```

### Search the index

TBA

## Search JSON with Python

If you want to use RediSearch within an application, you can use one of these [client libraries](https://oss.redis.com/redisearch/Clients/).

The following example uses the Redis Python client library [`redis-py`](https://github.com/redis/redis-py), which supports RediSearch commands as of v4.0.0.

This Python code creates an index, adds documents to the index, displays search results, and then deletes the index:

```python
import redis
from redis.commands.search.field import TextField, NumericField
from redis.commands.search.indexDefinition import IndexDefinition
from redis.commands.search.query import Query

# Connect to a database
r = redis.Redis(host="<endpoint>", port="<port>", 
                password="<password>")

# Options for index creation
index_def = IndexDefinition(
                prefix = ["item:"],
                score = 0.5,
                score_field = "doc_score"
)

# Schema definition
schema = ( TextField("name"),
           TextField("description"),
           NumericField("price")
)

# Create an index and pass in the schema
r.ft("py_idx").create_index(schema, definition = index_def)

# A dictionary that represents a JSON document
doc1 = {
  "name": "Noise-cancelling Bluetooth headphones",
  "description": "Wireless Bluetooth headphones with noise-cancelling technology",
  "connection": {
    "wireless": true,
    "type": "Bluetooth"
  },
  "price": 99.98,
  "stock": 25,
  "colors": [
    "black",
    "silver"
  ]
}

doc2 = {
  "name": "Wireless earbuds",
  "description": "Wireless Bluetooth in-ear headphones",
  "connection": {
    "wireless": true,
    "type": "Bluetooth"
  },
  "price": 64.99,
  "stock": 17,
  "colors": [
    "black",
    "white"
  ]
}

# Add documents to the database and index them
r.hset("item:1", mapping = doc1)
r.hset("item:2", mapping = doc2)

# Search the index for a string; paging limits the search results to 10
result = r.ft("py_idx").search(Query("search engine").paging(0, 10))

# The result has the total number of search results and a list of documents
print(result.total)
print(result.docs)

# Delete the index; set delete_documents to True to delete indexed documents as well
r.ft("py_idx").dropindex(delete_documents=False)
```

Example output:
```sh
$ python3 quick_start.py 
TBA
```

## More info

- [RediSearch commands]({{<relref "/modules/redisearch/commands">}})
- [RedisJSON commands]({{<relref "/modules/redisjson/commands">}})
- [RediSearch query syntax](https://redis.io/docs/stack/search/reference/query_syntax/)
- [Details about RediSearch query features](https://redis.io/docs/stack/search/reference/)
- [RediSearch client libraries](https://redis.io/docs/stack/search/clients/)
