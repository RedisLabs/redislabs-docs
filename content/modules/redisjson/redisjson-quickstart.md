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

- `redis-cli` command-line tool

- [`redis-py`](https://github.com/redis/redis-py) client library v4.0.0 or greater

## RedisJSON with redis-cli

The [`redis-cli`](https://redis.io/docs/manual/cli/) command-line tool comes packaged with Redis. You can use it to connect to your Redis database and test RedisJSON commands.

### Connect to a database

```sh
$ redis-cli --raw -h <endpoint> -p <port> -a <password>
127.0.0.1:12543>
```

The `--raw` option forces the command to return raw output.

### Create JSON documents

You can use the [`JSON.SET`](https://redis.io/commands/json.set) command to create a JSON document.

Create a JSON document that represents a `shopping_list`:

```sh
127.0.0.1:12543> JSON.SET shopping_list $ '{"list_date" : "05/05/2022", "stores": {}'
OK
```

The second argument in `JSON.SET` is the [JSON path](https://redis.io/docs/stack/json/path/). The `$` or `.` character represents the root of the JSON document. All elements with a JSON document are relative to the root.

### Modify JSON documents

You can also use [`JSON.SET`](https://redis.io/commands/json.set) to modify existing JSON documents and elements.

Add each store with an array of `items` that you need to buy:

``` sh
127.0.0.1:12543> JSON.SET shopping_list $.stores.grocery_store '{ "items": [ { "name": "apples", "count": 5 } ] }'
OK
127.0.0.1:12543> JSON.SET shopping_list $.stores.clothing_store '{ "items": [ { "name": "socks", "count": 2 } ] }'
OK
```

Use [`JSON.ARRAPPEND`](https://redis.io/commands/json.arrappend) to add more items to the `items` arrays. `JSON.ARRAPPEND` returns the number of objects in the array.

``` sh
127.0.0.1:12543> JSON.ARRAPPEND shopping_list $.stores.grocery_store.items '{ "name" : "pears", "count" : 3 }'    
2
```

Use [`JSON.NUMINCRBY`](https://redis.io/commands/json.numincrby) to change the number of a specific item that you need. This returns the new value of the item.

```sh
127.0.0.1:12543> JSON.NUMINCRBY shopping_list $.stores.clothing_store.items[0].count 2    
4
127.0.0.1:12543> JSON.NUMINCRBY shopping_list $.stores.grocery_store.items[1].count -1
2
```

### Read JSON elements

Use [`JSON.GET`](https://redis.io/commands/json.get) to read the JSON object from the database. If you connected to `redis-cli` with the `--raw` option, you can format the response to `JSON.GET` with the `INDENT`, `NEWLINE`, and `SPACE` options.

Run `JSON.GET` and pass the JSON root `$` as the path to retrieve the contents of the entire JSON document:

```sh
127.0.0.1:12543> JSON.GET shopping_list $ INDENT "\t" NEWLINE "\n" SPACE " "     
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
```

You can also use `JSON.GET` to read a single entity or multiple entities with the same name from the JSON object.

To only return the items from the `grocery_store` list, run:

```sh
127.0.0.1:12543> JSON.GET shopping_list $.stores.grocery_store INDENT "\t" NEWLINE "\n"    
{
    "items":[
        {
            "name":"apples",
            "count":5
        },
        {
            "name":"pears",
            "count":2
        }
    ]
}
```

To return all items from all stores on the shopping list, run:

```sh
127.0.0.1:12543> JSON.GET shopping_list $..items[*] INDENT "\t" NEWLINE "\n"
[
	{
		"name":"apples",
		"count":5
	},
	{
		"name":"pears",
		"count":2
	},
	{
		"name":"hammers",
		"count":1
	},
	{
		"name":"socks",
		"count":4
	}
]
```

### Verify JSON type

Use [`JSON.TYPE`](https://redis.io/commands/json.type) to check the JSON type of the key or an entity inside the key.

```sh
127.0.0.1:12543> JSON.TYPE shopping_list
object
127.0.0.1:12543> JSON.TYPE shopping_list $.stores.grocery_store.items
array
127.0.0.1:12543> JSON.TYPE shopping_list $.stores.grocery_store.items[0].name
string
```

### Delete JSON elements

Use [`JSON.DEL`](https://redis.io/commands/json.del) to delete parts of the JSON document.

```sh
127.0.0.1:12543> JSON.DEL shopping_list $.stores.clothing_store
1
127.0.0.1:12543> JSON.DEL shopping_list $.stores.grocery_store.items[1]
1
127.0.0.1:12543> JSON.GET shopping_list INDENT "\t" NEWLINE "\n"
{
    "list_date":"05/05/2022",
    "stores":{
        "grocery_store":{
            "items":[
                {
                    "name":"apples",
                    "count":5
                }
            ]
        }
    }
}
```

If you run `JSON.DEL` and don't specify a path, it will delete the entire JSON document.

```sh
127.0.0.1:12543> JSON.DEL shopping_list
1
127.0.0.1:12543> EXISTS shopping_list
0
```

## RedisJSON with Python

If you want to use RedisJSON within an application, you can use one of the [client libraries](https://redis.io/docs/stack/json/clients/).

The following example uses the Redis Python client library [redis-py](https://github.com/redis/redis-py), which supports RedisJSON commands as of v4.0.0.

This Python code creates a JSON document in Redis, adds and updates information to the JSON document, and then deletes the document.

``` python
import redis
import json

# Connect to a database
r = redis.Redis(host="<endpoint>", port="<port>",
    password="<password>")

# Create a JSON document
print("Creating shopping list...")
list_obj = {
    'list_date': '05/05/2022'
}

r.json().set('shopping_list:py', '.', list_obj)
reply = r.json().get('shopping_list:py', '.')
print(json.dumps(reply, indent=4) + "\n")

# Add info to the JSON document
print("Adding stores and starting items...")
stores_obj = {
    "grocery_store" : {
        "items" : [ { "name": "apples", "count": 5 } ]
    },
    "clothing_store" : {
        "items": [ { "name": "socks", "count": 2 } ]
    }
}

r.json().set('shopping_list:py', '.stores', stores_obj)
reply = r.json().get('shopping_list:py', '.')
print(json.dumps(reply, indent=4) + "\n")

# Add new items to the list
print("Adding pears...")
pears_obj = {
    "name" : "pears",
    "count" : 3
}

r.json().arrappend('shopping_list:py', '.stores.grocery_store.items',
                    pears_obj)
reply = r.json().get('shopping_list:py', '.')
print(json.dumps(reply, indent=4) + "\n")

# Increment item counts
print("Changing item counts...")
r.json().numincrby('shopping_list:py',
                    '.stores.clothing_store.items[0].count', 2)
r.json().numincrby('shopping_list:py',
                    '.stores.grocery_store.items[1].count', -1)
reply = r.json().get('shopping_list:py', '.')
print(json.dumps(reply, indent=4) + "\n")

# Get all items no matter which heading they're under
print("Getting all items...")
reply = r.json().get('shopping_list:py', '$..items')
print(json.dumps(reply, indent=4) + "\n")

# Delete specific parts of the document
print("Deleting clothing store and pears...")
r.json().delete('shopping_list:py', '.stores.clothing_store')
r.json().delete('shopping_list:py', '.stores.grocery_store.items[1]')
reply = r.json().get('shopping_list:py', '.')
print(json.dumps(reply, indent=4) + "\n")

# Delete the JSON document key
print("Deleting shopping_list:py key...")
r.json().delete('shopping_list:py')
print("Done!")
```

Example output:
```sh
$ python3 quick_start.py
Creating shopping list...
{
    "list_date": "05/05/2022"
}

Adding stores and starting items...
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
        },
        "clothing_store": {
            "items": [
                {
                    "name": "socks",
                    "count": 2
                }
            ]
        }
    }
}

Adding pears...
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
                    "count": 3
                }
            ]
        },
        "clothing_store": {
            "items": [
                {
                    "name": "socks",
                    "count": 2
                }
            ]
        }
    }
}

Changing item counts...
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

Getting all items...
[
    [
        {
            "name": "apples",
            "count": 5
        },
        {
            "name": "pears",
            "count": 2
        }
    ],
    [
        {
            "name": "hammers",
            "count": 1
        }
    ],
    [
        {
            "name": "socks",
            "count": 4
        }
    ]
]

Deleting clothing store and pears...
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

Deleting shopping_list:py key...
Done!
```

## More info

- [RedisJSON commands]({{<relref "/modules/redisjson/commands">}})
- [RedisJSON client libraries](https://redis.io/docs/stack/json/clients/)
