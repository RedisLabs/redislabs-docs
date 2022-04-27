---
Title: RedisGraph quick start tutorial
linkTitle: Quick start
description: RedisGraph quick start tutorial
weight: 20
alwaysopen: false
categories: ["Modules"]
aliases: /rs/getting-started/creating-database/redisgraph-quick-start/
---

## Prerequisites

For this quick start tutorial, you need:

- A Redis database with the RedisGraph module enabled. You can use either:

    - A [Redis Cloud]({{<relref "/modules/modules-quickstart.md">}}) database

    - A [Redis Enterprise Software]({{<relref "/modules/install/add-module-to-database">}}) database

- redis-cli command line tool

- [redis-py](https://github.com/redis/redis-py) client library v4.0.0 or greater

## RedisGraph with `redis-cli`

The `redis-cli` command line tool comes packaged with Redis. You can use it to connect to your Redis database and test the following RedisGraph commands.

### Connect to a database

```sh
$ redis-cli -h <endpoint> -p <port> -a <password>
127.0.0.1:12543>
```

### Create a graph

Create a new graph with the `GRAPH.QUERY` command:

```sh
127.0.0.1:12543> GRAPH.QUERY MotoGP "CREATE (:Rider {name:'Valentino Rossi'})-[:rides]->(:Team {name:'Yamaha'}), (:Rider {name:'Dani Pedrosa'})-[:rides]->(:Team {name:'Honda'}), (:Rider {name:'Andrea Dovizioso'})-[:rides]->(:Team {name:'Ducati'})"
1) 1) "Labels added: 2"
   2) "Nodes created: 6"
   3) "Properties set: 6"
   4) "Relationships created: 3"
   5) "Cached execution: 0"
   6) "Query internal execution time: 10.036638 milliseconds"
```

This graph represents a subset of motorcycle riders and teams participating in the MotoGP league.

### Insert data

If you want to add more data to a previously created graph:

```sh

```

### Add relationships

To create relationshps between the nodes of a graph:

```sh

```

### Query the graph

After you create a graph, you can run queries against it.

The following example returns which motorcycle riders are part of team Yamaha:

```sh
127.0.0.1:12543> GRAPH.QUERY MotoGP "MATCH (r:Rider)-[:rides]->(t:Team) WHERE t.name = 'Yamaha' RETURN r,t"
1) 1) "r"
   2) "t"
2) 1) 1) 1) 1) "id"
            2) "0"
         2) 1) "labels"
            2) 1) "Rider"
         3) 1) "properties"
            2) 1) 1) "name"
                  2) "Valentino Rossi"
      2) 1) 1) "id"
            2) "1"
         2) 1) "labels"
            2) 1) "Team"
         3) 1) "properties"
            2) 1) 1) "name"
                  2) "Yamaha"
3) 1) "Cached execution: 0"
   2) "Query internal execution time: 6.655681 milliseconds"
```

Use `count` to check how many riders represent team Ducati:

```sh
127.0.0.1:12543> GRAPH.QUERY MotoGP "MATCH (r:Rider)-[:rides]->(t:Team {name:'Ducati'}) RETURN count(r)"
1) 1) "count(r)"
2) 1) 1) "1"
3) 1) "Cached execution: 0"
   2) "Query internal execution time: 0.356560 milliseconds"
```

## RedisGraph with Python

You can interact with RedisGraph using your client's ability to send raw Redis commands.
The exact method for doing that depends on your client of choice.

This code snippet shows how to use RedisGraph with raw Redis commands from Python with [redis-py](https://github.com/redis/redis-py):

```python
import redis

r = redis.StrictRedis()
reply = r.execute_command('GRAPH.QUERY', 'social', 
         "CREATE (:person {name:'roi', age:33, gender:'male', status:'married')")
```

## Visualize graphs with RedisInsight

You can use RedisInsight to visualize your graphs.

## More info

- [RedisGraph commands](https://redis.io/docs/stack/graph/commands/)
- [RedisGraph client libraries](https://redis.io/docs/stack/graph/clients/)