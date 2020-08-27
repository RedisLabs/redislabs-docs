---
Title: Write-Behind Caching
description:
weight: 70
alwaysopen: false
categories: ["Modules"]
---

## Write-behind caching

Write-behind is a caching strategy in which the cache layer itself connects to the backing database. This means that your applications need only ever connect to your cache layer, and the cache then reads from or updates the backing database as needed. Redis Labs currently supports write-behind caching in [Redis Enterprise Software]({{< relref "/rs" >}}).

Here's how these caching patterns work:

1. Your application uses the cache for reads and writes.
1. The cache syncs any changed data to the backing database asynchronously.

<!-- ### Read-through caching

1. Your application reads from the cache. If there's a cache hit, the data is returned.
1. If there's cache miss, the cache retrieves the data from your backing database (think Oracle, PostgreSQL, etc.). The data is then stored in the cache and returned. -->

## Write-behind caching with RedisGears

[RGSync](https://github.com/RedisGears/rgsync) is a RedisGears recipe that uses the write-behind pattern to synchronize Redis data structures to a backing data store (Oracle, MySQL, Cassandra, and Snowflake are currently supported).

Here's how you can create a write-behind function using the `RGSync` recipe against MySQL. This function will synchronize a set of fields in a Redis hash to the columns in a MySQL row. The key name for the Redis hash must have the form `{name}:{id}`, where `id` is the primary key for the row we want to keep in sync with. So, for example, suppose our hashes look like this:

```sh
redis.cloud:6379> HSET person:5 first_name Marek last_name Michalski age 27
(integer) 2
```

The data in this hash would correspond to a row with ID of 5. But we need to define the mapping from our hash field to our columns. In our function, we do this using a Python dictionary:

```py
personsMappings = {
	'first_name':'first',
	'last_name':'last',
	'age':'age'
}
```

This is saying that the `last_name` field in our hash should be synchronized with the 'last' field in our row. So, now we're ready to write our RedisGears function.

First, load the necessary libraries and connect to MySQL:

```py
from rgsync import RGWriteBehind
from rgsync.Connectors import MySqlConnector, MySqlConnection

connection = MySqlConnection('myapplication', 'Password123!', 'localhost:3306/test')
```

Next, create a connector object, specifying the table name and the name of the column storing the primary key:

```py
personConnector = MySqlConnector(mySqlConnection, 'persons', 'id')
```

After that, define your field-column mappings:

```py
personsMappings = {
	'first_name':'first',
	'last_name':'last',
	'age':'age'
}
```

Finally, use these initialized objects to create an `RGWRiteBehind` object:

```py
RGWriteBehind(GB,
              name='PersonsWriteBehind',
              version='1',
              connector=personsConnector,
              keysPrefix='person',
              mappings=personsMappings)
```

Notice here that you can version this function registration with the `version` argument, as newer versions with the same `name` will replace the old one.

If you've placed all of this code into a file (`example.py`), then you can load it into your Redis deployment using the [`gears-cli`](https://github.com/RedisGears/gears-cli) tool:

```sh
gears-cli --host <host>
          --port <post>
          --password <password>
          example.py
          REQUIREMENTS rgsync
```

### Secret management

You may not want to store database credentials in your RedisGears functions. To avoid this, you can pass these credentials as module parameters and then reference them from your functions.

The code below shows how to reference these credentials when creating a backing database connection.

```py
def User():
	return configGet('MySqlUser')
def Password():
	return configGet('MySqlPassword')
def DB():
	return configGet('MySqlDB')

connection = MySqlConnection(User, Password, DB)
```

Notice that for each credential, we define a Python function that returns the specified module parameter. We then provide each function reference when we instantiate `MySqlConnection`.

This code references three parameters: `MySqlUser`, `MySqlPassword`, and `MySqlDB`. In Redis Enterprise, you can set these parameters using the `rladmin` tool. The command to set these parameters takes the following form:

```sh
rladmin> tune db [DB-NAME] module_name rg module_config_params "[PARAM-NAME] [PARAM-VALUE]"
```

To set the `MySqlPassword` parameter to "Password123!" on a database named "user-api", you would run the this `rladmin` command:

```sh
rladmin> tune db user-api module_name rg module_config_params "MySqlPassword Password123!"
```

Once a connection is successfully established, RedisGears will not attempt to reconnect until a disconnect occurs.
This means that updates to the parameters that store the secrets will not take effect immediately,
but they will be used for all subsequent connection attempts.
