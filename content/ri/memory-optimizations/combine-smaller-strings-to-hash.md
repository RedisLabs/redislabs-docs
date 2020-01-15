---
Title: Combine Smaller Strings to Hashes
date: 2018-03-26 16:49:29 +0530
weight: 60
categories: ["RI"]
path: memory-optimizations/combine-smaller-strings-to-hashes/
altTag: Combine Smaller Strings to Hashes
---
Strings data type has an overhead of about about 90 bytes on a 64 bit machine. In other words, calling set foo bar uses about 96 bytes, of which 90 bytes is overhead. You should use the String data type only if:

1. The value is at least greater than 100 bytes
1. You are storing encoded data in the string - JSON encoded or Protocol buffer
1. You are using the string data type as an array or a bitset

If you are not doing any of the above, then use **Hashes**.

## How to convert Strings to Hashes

Suppose we have to store the number of comments on the posts of a user, we can have a key names like `user:{userId}:post:{postId}:comments`.

This way we have a key per post for each user. So now if we need to find the total number of comments for whole application we can do

```bash
Redis::mget("user:{$userId}:post:1", "user:{$userId}:post:2", ...);
```

For converting this to Hash you can do something like this-

```bash
Redis::hmset("user:{$userId}:comments", "post:1", 20, "post:2", 50);
```

This builds a Redis hash with two fields post:1 and post:2 holding the values 20 and 50.

## Advantages

Combining small strings to Hashes reduces the memory used and in return save a cost.

Hashes can be encoded efficiently in a very small memory space, so Redis makers recommend that we use hashes whenever possible since "a few keys use a lot more memory than a single key containing a hash with a few fields", a key represents a Redis Object holds a lot more information than just its value, on the other hand a hash field only hold the value assigned, thus why it's much more efficient.

## Trade Offs

Performance comes with a cost. By converting the strings to hash, we conserve memory because it saves only the string value and no extra information like: `idle time`, `expiration`, `object reference count`, and `encoding` related to it.
But if we want the key with the expiration value, we can't associate it with a hash structure as expiration is not available.

## When to Avoid Combining Strings to Hashes

The decision depends on the number of strings, if it less than 1 million and the memory consumption is not high, the conversion is not effected much and there is no point in increasing the complexity of code.

But if the strings are more than 1 million and the memory consumption is high then this approach should definitely be followed.
