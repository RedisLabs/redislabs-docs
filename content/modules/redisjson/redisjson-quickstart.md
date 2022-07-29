---
Title: RedisJSON quick start
linkTitle: Quick start
description: RedisJSON quick start
weight: 20
alwaysopen: false
categories: ["Modules"]
aliases: /rs/getting-started/creating-database/redisjson-quick-start/
---

## Prerequisites

For this quick start tutorial, you need:

- A Redis database with the RedisJSON module enabled. You can use either:
    - A [Redis Cloud]({{<relref "/modules/modules-quickstart.md">}}) database

    - A [Redis Enterprise Software]({{<relref "/modules/install/add-module-to-database">}}) database

- [`redis-cli`](https://redis.io/docs/manual/cli/) command-line tool

- [`redis-py`](https://github.com/redis/redis-py) client library v4.0.0 or greater

## RedisJSON with `redis-cli`

The [`redis-cli`](https://redis.io/docs/manual/cli/) command-line tool comes packaged with Redis. You can use it to connect to your Redis database and test RedisJSON commands.

### Connect to a database

```sh
$ redis-cli --raw -h <endpoint> -p <port> -a <password>
127.0.0.1:12543>
```

The `--raw` option forces the command to return raw output.

### Create JSON documents

To create a [JSON](https://www.json.org) document in a Redis database, you can use the [`JSON.SET`](https://redis.io/commands/json.set) command.

Here's an example JSON document that represents a shopping list:

```json
{
  "list_date": "05/05/2022",
  "stores": {
    "grocery_store": {
      "items": [
        {
          "name": "apples",
          "count": 5
        }
      ]
    }
  }
}
```

To create this JSON document in your database, run [`JSON.SET`](https://redis.io/commands/json.set):

```sh
127.0.0.1:12543> JSON.SET shopping_list $ '{ "list_date": "05/05/2022", "stores": { "grocery_store": { "items": [ { "name": "apples", "count": 5 } ] } } }'
OK
```

[`JSON.SET`](https://redis.io/commands/json.set) accepts a [JSON path](https://redis.io/docs/stack/json/path) as a parameter. Paths must start with a `$` ([JSONPath syntax](https://redis.io/docs/stack/json/path/#jsonpath-syntax)) or `.` ([legacy path syntax](https://redis.io/docs/stack/json/path/#legacy-path-syntax)) character, which represents the root of the JSON document. All elements within a JSON document are relative to the root.

### Modify JSON documents

You can also use [`JSON.SET`](https://redis.io/commands/json.set) to modify existing JSON documents and elements. To modify a specific JSON element, you need to provide the [path](https://redis.io/docs/stack/json/path) to the element as a parameter.

Add a new store named `clothing_store` to the shopping list and provide an array of `items` that you need to buy from there:

``` sh
127.0.0.1:12543> JSON.SET shopping_list $.stores.clothing_store '{ "items": [ { "name": "socks", "count": 2 } ] }'
OK
```

You can use [`JSON.ARRAPPEND`](https://redis.io/commands/json.arrappend) to add a new element to an existing array.

For example, add a new item named `pears` to the `grocery_store` list:

``` sh
127.0.0.1:12543> JSON.ARRAPPEND shopping_list $.stores.grocery_store.items '{ "name" : "pears", "count" : 3 }'    
2
```

The output number indicates how many items are currently in the array.

[`JSON.NUMINCRBY`](https://redis.io/commands/json.numincrby) lets you increase (or decrease) a number by a specified value.

Increase the `count` of the first item on the `clothing_store` list by 2:

```sh
127.0.0.1:12543> JSON.NUMINCRBY shopping_list $.stores.clothing_store.items[0].count 2    
[4]
```

You can also use filter expressions `?()` in the JSONPath to modify JSON elements that match some condition.

The following example filters on `grocery_store` item names to decrease the `count` of `pears` by 1:

```sh
127.0.0.1:12543> JSON.NUMINCRBY shopping_list '$.stores.grocery_store.items.*[?(@.name=="pears")].count' -1
[2]
```

To use double quotes in a filter expression, you must enclose the path within single quotes.

### Read JSON elements

The [`JSON.GET`](https://redis.io/commands/json.get) command lets you retrieve JSON documents stored in the database. If you run `redis-cli` with the `--raw` option, you can format the response with the `INDENT`, `NEWLINE`, and `SPACE` options.

To retrieve the entire JSON document, run [`JSON.GET`](https://redis.io/commands/json.get) with root `$` as the path:

```sh
127.0.0.1:12543> JSON.GET shopping_list $ INDENT "\t" NEWLINE "\n" SPACE " "     
[
  {
    "list_date": "05/05/2022",
    "stores": {
      "grocery_store": {
        "items": [
          {
            "name": "apples",
            "count": 5
          },
          {
            "name": "pears",
            "count": 2
          }
        ]
      },
      "clothing_store": {
        "items": [
          {
            "name": "socks",
            "count": 4
          }
        ]
      }
    }
  }
]
```

You can also use [`JSON.GET`](https://redis.io/commands/json.get) to retrieve specific elements within a JSON document.

To return only the items from the `grocery_store` list, run [`JSON.GET`](https://redis.io/commands/json.get) with the path `$.stores.grocery_store`:

```sh
127.0.0.1:12543> JSON.GET shopping_list $.stores.grocery_store INDENT "\t" NEWLINE "\n"    
[
  {
    "items": [
      {
        "name": "apples",
        "count": 5
      },
      {
        "name": "pears",
        "count": 2
      }
    ]
  }
]
```

To return all items from all stores on the shopping list, use the path `$..items[*]`:

```sh
127.0.0.1:12543> JSON.GET shopping_list $..items[*] INDENT "\t" NEWLINE "\n"
[
  {
    "name": "apples",
    "count": 5
  },
  {
    "name": "pears",
    "count": 2
  },
  {
    "name": "socks",
    "count": 4
  }
]
```

### Verify JSON type

If you want to verify a JSON element's type, use the [`JSON.TYPE`](https://redis.io/commands/json.type) command:

```sh
127.0.0.1:12543> JSON.TYPE shopping_list $.stores
object
127.0.0.1:12543> JSON.TYPE shopping_list $.stores.grocery_store.items
array
127.0.0.1:12543> JSON.TYPE shopping_list $.stores.grocery_store.items[0].name
string
127.0.0.1:12543> JSON.TYPE shopping_list $.stores.grocery_store.items[0].count
integer
```

### Delete JSON elements

Use [`JSON.DEL`](https://redis.io/commands/json.del) to delete parts of the JSON document.

Remove the `clothing_store` JSON object:

```sh
127.0.0.1:12543> JSON.DEL shopping_list $.stores.clothing_store
1
```

Then remove the second item from the `grocery_store` list:

```sh
127.0.0.1:12543> JSON.DEL shopping_list $.stores.grocery_store.items[1]
1
```

If you run [`JSON.GET`](https://redis.io/commands/json.get), you can verify the removal of the expected JSON elements:

```sh
127.0.0.1:12543> JSON.GET shopping_list $ INDENT "\t" NEWLINE "\n"
[
  {
    "list_date": "05/05/2022",
    "stores": {
      "grocery_store": {
        "items": [
          {
            "name": "apples",
            "count": 5
          }
        ]
      }
    }
  }
]
```

If you run [`JSON.DEL`](https://redis.io/commands/json.del) but don't specify a path, it will delete the entire JSON document:

```sh
127.0.0.1:12543> JSON.DEL shopping_list
1
127.0.0.1:12543> EXISTS shopping_list
0
```

## RedisJSON with Python

If you want to use RedisJSON within an application, you can use one of the [client libraries](https://redis.io/docs/stack/json/clients/).

The following example uses the Redis Python client library [`redis-py`](https://github.com/redis/redis-py), which supports RedisJSON commands as of v4.0.0.

This Python code creates a JSON document in a Redis database, modifies the JSON document, and then deletes the document:

```python
import redis
import json

# Connect to a database
r = redis.Redis(host="<endpoint>", port="<port>",
    password="<password>")

# Initial JSON document data
list_data = {
    "list_date": "05/05/2022",
    "stores": {
        "grocery_store" : {
            "items" : [ { "name": "apples", "count": 5 } ]
        }
    }
}

# Create the JSON document in the database
print("Creating shopping list...")
r.json().set('shopping_list:py', '$', list_data)

# Add a new field to the existing JSON document
r.json().set('shopping_list:py', '$.stores.grocery_store.items[0].variety', 'Honeycrisp')

# New item data
pears_obj = {
    "name" : "pears",
    "count" : 3
}

# Add a new item to the grocery_store items array
r.json().arrappend('shopping_list:py', '$.stores.grocery_store.items',
                    pears_obj)

# Get all items on the shopping list
reply = r.json().get('shopping_list:py', '$..items[*]')

print("Current list of all items:")
print(json.dumps(reply, indent=4) + "\n")

# Delete specific parts of the JSON document
r.json().delete('shopping_list:py', '$.stores.grocery_store.items[1]')
print("Deleted pears from the grocery list.")

# Get the updated JSON document
reply = r.json().get('shopping_list:py', '.')
print("The JSON document now contains:")
print(json.dumps(reply, indent=4) + "\n")

# Delete the entire JSON document
r.json().delete('shopping_list:py')
print("Deleted shopping_list:py JSON document.")
```

Example output:

```sh
$ python3 quick_start.py
Creating shopping list...
Current list of all items:
[
    {
        "name": "apples",
        "count": 5,
        "variety": "Honeycrisp"
    },
    {
        "name": "pears",
        "count": 3
    }
]

Deleted pears from the grocery list.
The JSON document now contains:
{
    "list_date": "05/05/2022",
    "stores": {
        "grocery_store": {
            "items": [
                {
                    "name": "apples",
                    "count": 5,
                    "variety": "Honeycrisp"
                }
            ]
        }
    }
}

Deleted shopping_list:py JSON document.
```

## More info

- [RedisJSON commands]({{<relref "/modules/redisjson/commands">}})
- [RedisJSON client libraries](https://redis.io/docs/stack/json/clients/)
