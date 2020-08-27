## Creating indexes

Let's create a new index called "myidx". When you define the index, you
must pass in the structure of the data you are adding to the index.
In this example, we have four things we input, the title, body, url, and
value. In this example, we have three TEXT and one NUMERIC values. The
title has a weight of 5.0.

Connect to redis.

```sh
$ redis-cli -p 12543
127.0.0.1:12543>
```

Run this command:

```sh
127.0.0.1:12543> FT.CREATE myIdx SCHEMA title TEXT WEIGHT 5.0 body TEXT url TEXT value NUMERIC
```

{{< note >}}
For databases in a Redis Cloud Essentials subscription, you need to tag the index key and the document key so that they are stored on the same shard:

```sh
FT.CREATE {idx} ...
FT.ADD {idx} {idx}:docid ...
```

{{< /note >}}

### Add info to test index

Now add some data to this index. Here we add an object with the key
doc1 and then add a title of "hello world", body of "my favorite
object", and url of [https://redislabs.com/](https://redislabs.com/) to the object as follows:

```sh
127.0.0.1:12543> FT.ADD myIdx doc1 1.0 FIELDS title "hello world" body "My first object" url "https://redislabs.com/"
OK
```

### Search the index

Do a search on this index for any object with the word "first":

```sh
127.0.0.1:12543> FT.SEARCH myIdx "first" LIMIT 0 10
1) (integer) 1
2) "doc1"
3) 1) "title"
2) "hello world"
3) "body"
4) "My first object"
5) "url"
6) "https://redislabs.com/"
```

### Drop the index

Now that we are done with it, we can drop the index.

```sh
127.0.0.1:12543> FT.DROP myIdx
OK
```

### Auto-complete and search engine suggestions

Let's add a suggestion for the search engine to use

```sh
127.0.0.1:12543> FT.SUGADD autocomplete "hello world" 100
"(integer)" 1
```

Make sure the suggestion is there:

```sh
127.0.0.1:12543> FT.SUGGET autocomplete "he"
1) "hello world"
```
