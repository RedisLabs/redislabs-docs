---
Title: RedisJSON
description:
weight: 30
alwaysopen: false
categories: ["Modules"]
aliases:
  - /redisjson/
  - /redis-json/
  - /redis_json/
  - /rs/developing/modules/redisjson/
---
Applications developed with the open source version of RedisJSON are 100%
compatible with RedisJSON in Redis Enterprise Software.

## RedisJSON path syntax

Since there is no standard for [JSON path](https://redis.io/docs/stack/json/path/) syntax, RedisJSON implements its
own. RedisJSON's syntax is a subset of common best practices and resembles
[JSONPath](https://goessner.net/articles/JsonPath/) not by accident.

Paths always begin at the root of a RedisJSON value. The root is denoted by
the period character (.). For paths referencing the root's children,
prefixing the path with the root is optional.

Dotted and square-bracketed, single-or-double-quoted-child notation are
both supported for object keys, so the following paths all refer to bar,
child of foo under the root:

- *.foo.bar*
- *foo\["bar"\]*
- *\['foo'\]\["bar"\]*

Array elements are accessed by their index enclosed by a pair of square
brackets. The index is 0-based, with 0 being the first element of the
array, 1 being the next element and so on. These offsets can also be
negative numbers, indicating indices starting at the end of the array.
For example, -1 is the last element in the array, -2 the penultimate,
and so on.

## JSON key names and path compatibility

Although a JSON key can be any valid JSON string, paths are traditionally based on JavaScript's (and Java's) variable-naming conventions. Therefore, while it is possible to
have RedisJSON store objects containing arbitrary key names, accessing
these keys with a path is only possible if they follow the name
syntax rules.

### Name syntax rules

- Names must begin with a letter, a dollar sign ($), or an underscore (_)
- Names can contain letters, digits, dollar signs, and underscores
- Names are case-sensitive

### Path evaluation time complexity

The complexity of searching (navigating to) an element in the path is
made of:

- Child level - every level along the path adds an additional search
- Key search - O(N)\*\*, where N is the number of keys in the parent
object
- Array search - O(1)

This means that the overall time complexity of searching a path is
O(N\*M), where N is the depth and M is the number of parent object keys.

\*\* While this is acceptable for objects where N is small, access can
be optimized for larger objects.

## Example

Sign in to a RedisJSON-enabled database with [`redis-cli`]({{<relref "/rs/references/cli-utilities/redis-cli">}}). Use the --raw switch to see the raw output:

```sh
$ redis-cli --raw
127.0.0.1:6379>
```

The example uses this JSON document:

```sh
{"foo": "bar"}
```

Add a new entity to the example1 document called test2 and set it to an
array called test3:

```sh
127.0.0.1:6379> json.set example1 .test2 '{"test3":[1,2,3]}'
OK
```

Retrieve the object with [`JSON.GET`](https://redis.io/commands/json.get/) to see what it looks like:

```sh
127.0.0.1:6379> JSON.GET example1
{"foo":"bar","test2":{"test3":[1,2,3]}}
```

Retrieve the second array value from the test2 sub-document in the test3
object's array:

```sh
127.0.0.1:6379> JSON.GET example1 .test2.test3[1]
2
```

Paths let you traverse the document structure and interact only with the data you want. You can also use paths to perform operations on specific objects.

## More info

- [RedisJSON commands]({{<relref "/modules/redisjson/commands">}})
- [RedisJSON source](https://github.com/RedisJSON/RedisJSON)
