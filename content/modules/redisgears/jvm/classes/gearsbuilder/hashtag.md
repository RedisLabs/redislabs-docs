---
Title: Hashtag
linkTitle: hashtag
description: Returns a string that maps to the current shard.
weight: 50
alwaysopen: false
categories: ["Modules"]
---

```java
public static java.lang.String hashtag()
```

Returns a string that maps to the current shard according to the cluster slot mapping.

{{<note>}}
You can use the `hashtag` function when you need to create a key that resides on the current shard. 
{{</note>}}

## Parameters

None

## Returns

Returns a string that maps to the current shard.

## Example

The following example uses the `hashtag` function to calculate the hslot. The string maps to the current shard.

```java
GearsBuilder.execute(
    "SET", 
    String.format("key{%s}", GearsBuilder.hashtag()), 
    "1"
);
```
