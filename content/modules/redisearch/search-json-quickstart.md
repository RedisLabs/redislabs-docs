---
Title: Search JSON quick start
linkTitle: Quick start (with JSON)
description: RediSearch quick start on how to index JSON documents and run search queries.
weight: 22
alwaysopen: false
categories: ["Modules"]
module: RediSearch
aliases: /modules/redisearch/search-json-quickstart/
---

This quick start shows you how to index JSON documents and run search queries against the index.

## Prerequisites

For this quick start tutorial, you need:

- Either:

    - A [Redis Cloud]({{<relref "/modules/modules-quickstart.md">}}) database with [Redis Stack]({{<relref "/modules/redis-stack">}})

    - A [Redis Enterprise Software]({{<relref "/modules/install/add-module-to-database">}}) database with RediSearch (v2.2 or later) and RedisJSON (v2.0 or later)

- And:
  - [`redis-cli`]({{<relref "/rs/references/cli-utilities/redis-cli">}}) command-line tool

  - [`redis-py`](https://github.com/redis/redis-py) client library v4.0.0 or later

## Search JSON with `redis-cli`

To begin, [connect to your database]({{<relref "/rs/references/cli-utilities/redis-cli#connect-to-a-database">}}) with `redis-cli`.

### Create an index

To create an index for JSON documents with [`FT.CREATE`](https://redis.io/commands/ft.create), use the <nobr>`ON JSON`</nobr> keyword.

You also need to include a schema definition that indicates which JSON elements to index. When you define the schema, use a [JSON path]({{<relref "/modules/redisjson#redisjson-paths">}}) expression to map a specific JSON element to a schema field:

```sql
SCHEMA <JSONPath> AS <field_name> <TYPE>
```

The examples in this tutorial use the extended [JSONPath syntax]({{<relref "/modules/redisjson#jsonpath-syntax">}}).

The schema for this example includes four fields: 
- `name` (`TEXT`)
- `description` (`TEXT`)
- `connectionType` (`TEXT`)
- `price` (`NUMERIC`)

This example defines the schema and creates the index:

```sh
127.0.0.1:12543> FT.CREATE itemIdx ON JSON PREFIX 1 item: SCHEMA $.name AS name TEXT $.description as description TEXT $.connection.type AS connectionType TEXT $.price AS price NUMERIC
```

After you create the index, RediSearch automatically adds all existing and future JSON documents prefixed with `item:` to the index.

See [Index limitations](https://redis.io/docs/stack/search/indexing_json/#index-limitations) for more details about schema restrictions for JSON document indexes.

### Add JSON documents

You can create and store JSON documents in the database with the [`JSON.SET`](https://redis.io/commands/json.set) command.

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

To store these JSON documents in the database, run the following commands:

```sh
127.0.0.1:12543> JSON.SET item:1 $ '{"name":"Noise-cancelling Bluetooth headphones","description":"Wireless Bluetooth headphones with noise-cancelling technology","connection":{"wireless":true,"type":"Bluetooth"},"price":99.98,"stock":25,"colors":["black","silver"]}'
"OK"
127.0.0.1:12543> JSON.SET item:2 $ '{"name":"Wireless earbuds","description":"Wireless Bluetooth in-ear headphones","connection":{"wireless":true,"type":"Bluetooth"},"price":64.99,"stock":17,"colors":["black","white"]}'
"OK"
```

### Search the index

To search the index for JSON documents that match a specified condition, use the [`FT.SEARCH`](https://redis.io/commands/ft.search) command. You can search any field defined in the index schema.

For more information about search queries, see [Search query syntax](https://redis.io/docs/stack/search/reference/query_syntax).

#### Return the entire document

Search query results include entire JSON documents by default.

For example, search for Bluetooth headphones with a price less than 70:

```sh
127.0.0.1:6379> FT.SEARCH itemIdx '@description:(headphones) @connectionType:(bluetooth) @price:[0 70]'
1) "1"
2) "item:2"
3) 1) "$"
   2) "{\"name\":\"Wireless earbuds\",\"description\":\"Wireless Bluetooth in-ear headphones\",\"connection\":{\"wireless\":true,\"connection\":\"Bluetooth\"},\"price\":64.99,\"stock\":17,\"colors\":[\"black\",\"white\"]}"
```

#### Return specific fields

If you want to limit the search results to include only specific parts of a JSON document, use [field projection](https://redis.io/docs/stack/search/indexing_json/#field-projection). The `RETURN` option lets you specify which fields to include.

The following query uses the JSONPath expression `$.stock` to return each item's stock in addition to the name and price:

```sh
127.0.0.1:6379> FT.SEARCH itemIdx '@description:(headphones)' RETURN 5 name price $.stock AS stock
1) "2"
2) "item:1"
3) 1) "name"
   2) "Noise-cancelling Bluetooth headphones"
   3) "price"
   4) "99.98"
   5) "stock"
   6) "25"
4) "item:2"
5) 1) "name"
   2) "Wireless earbuds"
   3) "price"
   4) "64.99"
   5) "stock"
   6) "17"
```
### Aggregate search results

The [`FT.AGGREGATE`](https://redis.io/commands/ft.aggregate) command lets you run a search query and modify the results with operations such as `SORTBY`, `REDUCE`, `LIMIT`, `FILTER`, and more. For a detailed list of available operations and examples, see [Aggregations](https://redis.io/docs/stack/search/reference/aggregations).

To run aggregations on JSON documents, pass [JSON path]({{<relref "/modules/redisjson#redisjson-paths">}}) expressions to the `LOAD` option. You can use any JSON element, even elements that are not included in the index schema.

This example uses aggregation operations to calculate a 10% price discount for each item and then sorts the items from least expensive to most expensive:

```sh
127.0.0.1:6379> FT.AGGREGATE itemIdx '*' LOAD 4 name $.price AS originalPrice APPLY '@originalPrice - (@originalPrice * 0.10)' AS salePrice SORTBY 2 @salePrice ASC
1) "2"
2) 1) "name"
   2) "Wireless earbuds"
   3) "originalPrice"
   4) "64.99"
   5) "salePrice"
   6) "58.491"
3) 1) "name"
   2) "Noise-cancelling Bluetooth headphones"
   3) "originalPrice"
   4) "99.98"
   5) "salePrice"
   6) "89.982"
```

### Drop the index

To remove the index without deleting any associated documents, run the [`FT.DROPINDEX`](https://redis.io/commands/ft.dropindex) command:

```sh
127.0.0.1:12543> FT.DROPINDEX itemIdx
OK
```

## Search JSON with Python

If you want to use RediSearch within an application, these [client libraries](https://oss.redis.com/redisearch/Clients/) are available.

The following example uses the Redis Python client library [`redis-py`](https://github.com/redis/redis-py), which supports RediSearch commands as of v4.0.0.

This Python code indexes JSON documents, runs [search](https://redis.io/docs/stack/search/reference/query_syntax) and [aggregation](https://redis.io/docs/stack/search/reference/aggregations) queries, and then deletes the index:

```python
import redis
from redis.commands.search.field import TextField, NumericField
from redis.commands.search.indexDefinition import IndexDefinition, IndexType
from redis.commands.search.query import Query
from redis.commands.search.aggregation import AggregateRequest, Asc

# Connect to a database
r = redis.Redis(host="<endpoint>", port="<port>", 
                password="<password>")

# Options for index creation
index_def = IndexDefinition(
                index_type=IndexType.JSON,
                prefix = ['item:'],
                score = 0.5,
                score_field = 'doc_score'
)

# Schema definition
schema = ( TextField('$.name', as_name='name'),
           TextField('$.description', as_name='description'),
           TextField('$.connection.type', as_name='connectionType'),
           NumericField('$.price', as_name='price')
)

# Create an index and pass in the schema
r.ft('py_item_idx').create_index(schema, definition = index_def)

# Dictionaries that represent JSON documents
doc1 = {
  "name": "Noise-cancelling Bluetooth headphones",
  "description": "Wireless Bluetooth headphones with noise-cancelling technology",
  "connection": {
    "wireless": True,
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
    "wireless": True,
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
r.json().set('item:1', '$', doc1)
r.json().set('item:2', '$', doc2)

# Search the index for a string
search_result = r.ft('py_item_idx').search(Query('@name:(earbuds)')
          .return_field('name')
          .return_field('price')
          .return_field('$.stock', as_field='stock'))

# The result has the total number of search results and a list of documents
print('Results for "earbuds":')
print(search_result.total)
for doc in search_result.docs:
    print(doc)
print()

# Use aggregation to calculate a 10% price discount for each item and sort them from least expensive to most expensive
aggregate_query = AggregateRequest('*').load('name', 'price').apply(salePrice='@price - (@price * 0.10)').sort_by(Asc('@salePrice'))
aggregate_result = r.ft('py_item_idx').aggregate(aggregate_query).rows

# Display the aggregation result
print('Aggregation result:')
for result in aggregate_result:
    print(result)

# Delete the index; set delete_documents to True to delete indexed documents as well
r.ft('py_item_idx').dropindex(delete_documents=False)
```

Example output:

```sh
$ python3 quick_start.py 
Results for "earbuds":
1
Document {'id': 'item:2', 'payload': None, 'name': 'Wireless earbuds', 'price': '64.99', 'stock': '17'}

Aggregation result:
[b'name', b'Wireless earbuds', b'price', b'64.99', b'salePrice', b'58.491']
[b'name', b'Noise-cancelling Bluetooth headphones', b'price', b'99.98', b'salePrice', b'89.982']
```

## More info

- [RediSearch commands]({{<relref "/modules/redisearch/commands">}})
- [RedisJSON commands]({{<relref "/modules/redisjson/commands">}})
- [RediSearch query syntax](https://redis.io/docs/stack/search/reference/query_syntax/)
- [Details about RediSearch query features](https://redis.io/docs/stack/search/reference/)
- [RediSearch client libraries](https://redis.io/docs/stack/search/clients/)
