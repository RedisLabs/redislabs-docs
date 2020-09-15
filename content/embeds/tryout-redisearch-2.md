## Creating indexes

Let's create a new index called "database_idx".
When you define the index, you must pass in the structure of the data you are adding to the index.
In this example, we have four fields: title (TEXT), body (TEXT), url (TEXT), and weight (NUMERIC), and the title has a weight of 5.0.

1. Connect to Redis.

    ```sh
    $ redis-cli -p 12543
    127.0.0.1:12543>
    ```

1. Create the schema:

    ```sh
    127.0.0.1:12543> FT.CREATE database_idx PREFIX 1 "doc:" SCORE_FIELD "weight" SCHEMA title TEXT body TEXT url TEXT weight NUMERIC
    ```

    This command indexes all of the hashes with the prefix "doc:".
    By default, all hashes get a score of 1.0.
    In this example, the SCORE_FIELD directive specifies a "weight" field whose value can override the default score for a document.

{{< note >}}
For databases in a Redis Cloud Essentials subscription, you need to add the index name to the document key as a tag to make sure that the index and the documents are located on the same shard:

```sh
FT.CREATE database_idx ...
HSET database_idx {doc}:1 ...
```

{{< /note >}}

### Testing the index

Now add some data to this index. Here we add a hash with the key
"doc:1" and the fields:

- Title: "Redis Labs"
- Body: "primary and caching"
- URL: <https://redislabs.com>
- Weight: 10

```sh
127.0.0.1:12543> HSET doc:1 title "Redis Labs" body "primary and caching" url "<https://redislabs.com>" value 10
OK
```

### Search the index

Do a search on this index for any documents with the word "first":

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

You can drop the index without deleting the underlying hash with the FT.DROPINDEX command:

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
