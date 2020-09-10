## Creating indexes

Let's create a new index called "myIdx". When you define the index, you
must pass in the structure of the data you are adding to the index.
In this example, we have four things we input: title, body, url, and
value. In this example, we have three TEXT and one NUMERIC values. The
title has a weight of 5.0.

1. Connect to redis.

    ```sh
    $ redis-cli -p 12543
    127.0.0.1:12543>
    ```

1. Create the schema with the command:

    ```sh
    127.0.0.1:12543> FT.CREATE myIdx PREFIX 1 "doc:" SCORE_FIELD "value" SCHEMA title TEXT body TEXT url TEXT value NUMERIC
    ```

    This command indexes the hashes that have the prefix "doc".
    By default, all hashes get a score of 1.0 but here the index uses the `value` field as the score for this hash.

{{< note >}}
For databases in a Redis Cloud Essentials subscription, you need to add the index name to the document key as a tag to make sure that the index and the documents are located on the same shard:

```sh
FT.CREATE myIdx ...
HSET myIdx {myIdx}:docid ...
```

{{< /note >}}

### Add data to test index

Now add some data to this index. Here we add an object with the key
doc1 and then add a title of "hello world", body of "my favorite
object", url of [https://redislabs.com/](https://redislabs.com/), and value 1000 to the object as follows:

```sh
127.0.0.1:12543> HSET doc:1 title "hello world" body "My first object" url "https://redislabs.com/" value 10
OK
```

### Search the index

Do a search on this index for any object with the word "first":

```sh
127.0.0.1:12543> FT.SEARCH myIdx "first" LIMIT 0 10
1) (integer) 1
2) "doc:1"
3) 1) "title"
   2) "hello world"
   3) "body"
   4) "My first object"
   5) "url"
   6) "https://redislabs.com/"
   7) "value"
   8) "10"
```

### Drop the index

Now that we are done with it, we can drop the index without dropping the data.

```sh
127.0.0.1:12543> FT.DROPINDEX myIdx
OK
```

### Auto-complete and search engine suggestions

You can use suggestions to return a list of closely matching results.

{{< note >}}
Suggestions are not supported for Active-Acitve databases.
{{< /note >}}

Let's add a suggestion for the search engine to use:

```sh
127.0.0.1:12543> FT.SUGADD autocomplete "hello world" 100
"(integer)" 1
```

Make sure the suggestion is there:

```sh
127.0.0.1:12543> FT.SUGGET autocomplete "he"
1) "hello world"
```
