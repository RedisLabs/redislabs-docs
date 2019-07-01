---
Title: RedisGraph Quick Start Tutorial
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
For this quick start, you will need the following:

- [A Redis Enterprise Software cluster with set up already
    complete]({{< relref "/rs/getting-started/quick-setup.md" >}})
- redis-cli

## Create a new database that uses the module

1. In the Redis Modules field, click ![Add](/images/rs/icon_add.png#no-click "Add").
1. Select the RedisGraph module.
1. If you want the module to use a custom configuration,
click **Add configuration** and enter the optional custom configuration.
1. Click ![Save](/images/rs/icon_save.png#no-click "Save").

    For example:
    {{< video "/images/rs/multiple-modules.mp4" "Adding multiple modules" >}}

1. Click **Activate**.

## Give it a try

After you load RedisGraph, you can interact with it using redis-cli.

Here we'll quickly create a small graph representing a subset of motorcycle riders and teams
taking part in the MotoGP league. Once created, we'll start querying our data.

### With `redis-cli`

Connect to redis using --raw to maintain file formatting.

```src
$ redis-cli --raw -p 12543
127.0.0.1:12543>
```

Run these commands:

```sh
127.0.0.1:12543> GRAPH.QUERY MotoGP "CREATE (:Rider {name:'Valentino Rossi'})-[:rides]->(:Team {name:'Yamaha'}), (:Rider {name:'Dani Pedrosa'})-[:rides]->(:Team {name:'Honda'}), (:Rider {name:'Andrea Dovizioso'})-[:rides]->(:Team {name:'Ducati'})"
1) (empty list or set)
2) 1) Labels added: 2
   2) Nodes created: 6
   3) Properties set: 6
   4) Relationships created: 3
   5) "Query internal execution time: 0.399000 milliseconds"
```

Now that our MotoGP graph is created, we can start asking questions. For example:
Who's riding for team Yamaha?

```sh
127.0.0.1:12543> GRAPH.QUERY MotoGP "MATCH (r:Rider)-[:rides]->(t:Team) WHERE t.name = 'Yamaha' RETURN r,t"
1) 1) 1) "r.name"
      2) "t.name"
   2) 1) "Valentino Rossi"
      2) "Yamaha"
2) 1) "Query internal execution time: 0.122000 milliseconds"
```

How many riders represent team Ducati?

```sh
127.0.0.1:12543> GRAPH.QUERY MotoGP "MATCH (r:Rider)-[:rides]->(t:Team {name:'Ducati'}) RETURN count(r)"
1) 1) 1) "count(r)"
   2) 1) "1.000000"
2) 1) "Query internal execution time: 0.129000 milliseconds"
```
