---
Title: Filter
linkTitle: filter
description: Add a filter operation to the pipe.
weight: 50
alwaysopen: false
categories: ["Modules"]
---

Add a filter operation to the pipe. The filter should return true if RedisGears should continue process the record and otherwise false.

## Parameters
 
foreach - The foreach operation

## Returns

Returns a GearsBuilder object with the same template type as the input builder. The return object might be the same as the previous.

## Example

Get all strings that contain the substring "hello":

```java
GearsBuilder.CreateGearsBuilder(reader).
    filter(r->{
        return r.getStringVal().contains("hello");
});
```