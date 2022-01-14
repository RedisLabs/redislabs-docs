---
Title: Filter
linkTitle: filter
description: Add a filter operation to the pipe.
weight: 50
alwaysopen: false
categories: ["Modules"]
---

```java
public GearsBuilder<T> filter​(
    gears.operations.FilterOperation<T> filter)
```

Add a filter operation to the pipe. The filter should return true if RedisGears should continue process the record and otherwise false.

## Parameters

| Name | Type | Description |
|------|------|-------------|
| filter | gears.operations.FilterOperation<T> | The filter operation |

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