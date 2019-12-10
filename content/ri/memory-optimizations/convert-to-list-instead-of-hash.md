---
Title: Convert to a List Instead of Hash
date: 2018-03-26 16:49:29 +0530
weight: 110
categories: ["RI"]
path: memory-optimizations/convert-to-list-instead-of-hash/
altTag: Convert to a List Instead of Hash
---
A Redis Hash stores field names and values. If you have thousands of small hash objects with similar field names, the memory used by field names adds up. To prevent this, consider using a list instead of a hash. The field names become indexes into the list.

While this may save memory, you should only use this approach if you have thousands of hashes, and if each of those hashes have similar fields.
[Compressed Field Names]({{< relref "/ri/memory-optimizations/compress-field-names.md" >}}) are another way to reduce memory used by field names.

Let's take an example. Suppose you want to set user details in Redis. You do something like this:

```bash
hmset user:123 id 123 firstname Bob lastname Lee
location CA twitter bob_lee
```

Now, Redis 2.6 stores this internally as a Zip List; you can confirm by running debug object user:123 and look at the encoding field. In this encoding, key value pairs are stored sequentially, so the user object we created above would roughly look like this ``["firstname", "Bob", "lastname", "Lee", "location", "CA", "twitter", "bob_lee"]``

Now, if you create a second user, the keys are duplicated. If you have a million users, well, its a big waste repeating the keys again. To get around this, we can borrow a concept from Python - NamedTuples.

## How does NamedTuple Work

A NamedTuple is simply a read-only list, but with some magic to make that list look like a dictionary. Your application needs to maintain a mapping from field names to indexes,like
`"firstname" => 0, "lastname" => 1 and so on`.

Then, you simply create a list instead of a hash, like- `lpush user:123 Bob Lee CA bob_lee`. With the right abstractions in your application, you can save significant memory.

## Trade Offs

The only tradeoffs are related to code complexity. Redis internally uses the same encoding (ziplist) for small hashes and small lists, so there is no performance impact when you switch to a list. However, if you have more than 512 fields in your hash, this approach is not recommended.

## When to Avoid Converting List to Hash

Following are the situations when conversion of list to hash should be avoided:

1. When you have less than 50,000 objects.
1. Your objects are not regular i.e. some users have lots of information, others very little.
