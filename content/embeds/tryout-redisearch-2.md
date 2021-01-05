### Creating indexes

Let's create a new index called "`database_idx`".
When you define the index, you must pass in the structure of the data you are adding to the index.
In this example, we have four fields: `title` (`TEXT`), `body` (`TEXT`), `url` (`TEXT`) and `visits` (`NUMERIC`), with the title field having a higher weight than the others (`5.0`).

1. Connect to Redis (replace 12543 with the port number your RediSearch is running on).

    ```sh
    $ redis-cli -p 12543
    127.0.0.1:12543>
    ```

2. Create the schema:

    ```sh
    127.0.0.1:12543> FT.CREATE database_idx PREFIX 1 "doc:" SCORE 0.5 SCORE_FIELD "doc_score" SCHEMA title TEXT body TEXT url TEXT visits NUMERIC
    ```

    This command indexes all of the hashes with the prefix "`doc:`" as well as all the future ones that will be created with that prefix.

    By default, all hashes get a score of 1.0, but we can configure that value through the `SCORE` directive. If we need to assign a document-specific score to documents, we can do that too. 
    We only need to specify the name of the document element in which we will define the document score which will override the default. This is done by using the `SCORE_FIELD` directive.
    
    In our example the default document score is `0.5` and we can have a document-specific score by setting a value between 0 and 1 in the  "`doc_score`" field of the hash.

### Testing the index

Now add some data to this index. Here we add a hash with the key "`doc:1`" and the fields:

- title: "Redis Labs"
- body: "Primary and caching"
- url: <https://redislabs.com/primary-caching>
- visits: 108

```sh
127.0.0.1:12543> HSET doc:1 title "Redis Labs" body "Primary and caching" url "<https://redislabs.com/primary-caching>" visits 108
OK
```

To add a document specific score, that causes the document to appear higher or lower in results, set a value for the `doc_score` field.
We specified the `SCORE_FIELD` in the schema definition to hold the document weight value.

```sh
127.0.0.1:12543> HSET doc:2 title "Redis Labs" body "Modules" url "<https://redislabs.com/modules>" visits 102 doc_score 0.8
OK
```


### Search the index

Do a search on this index for any documents with the word "primary":

```sh
127.0.0.1:12543> FT.SEARCH database_idx "primary" LIMIT 0 10
1) (integer) 1
2) "doc:1"
3) 1) "title"
   2) "Redis Labs"
   3) "body"
   4) "primary and caching"
   5) "url"
   6) "https://redislabs.com/"
   7) "value"
   8) "10"
```

### Drop the index

You can drop the index without deleting the underlying hash with the `FT.DROPINDEX` command:

```sh
127.0.0.1:12543> FT.DROPINDEX database_idx
OK
```

### Auto-complete

You can use RediSearch suggestion commands to implement [auto-complete](https://oss.redislabs.com/redisearch/master/Overview/#auto-completion).

{{< note >}}
Active-Active databases do not support RediSearch suggestions.
{{< /note >}}

Let's add a suggestion for the search engine to use:

```sh
127.0.0.1:12543> FT.SUGADD autocomplete "primary and caching" 100
"(integer)" 1
```

Make sure the suggestion is there:

```sh
127.0.0.1:12543> FT.SUGGET autocomplete "pri"
1) "primary and caching"
```
