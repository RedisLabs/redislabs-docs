---
Title: FlatMap
linkTitle: flatMap
description: Maps a single input record to one or more output records.
weight: 50
alwaysopen: false
categories: ["Modules"]
---

```java
public <I extends java.io.Serializable> GearsBuilder<I> flatMap​(
	gears.operations.FlatMapOperation<T,​I> flatmapper)
```

Add a flatmap operation to the pipe. The record mapping is one-to-many (1:N), so it maps a single input record to one or more output records.

The operation must return an Iterable object. The RedisGears module iterates over the elements in the Iterable object and passes them one by one through the pipe.

## Parameters
 
Type parameters:

| Name | Description |
|------|-------------|
| I | The template type of the returned builder object |

Function parameters:

| Name | Type | Description |
|------|------|-------------|
| flatmapper | gears.operations.FlatMapOperation<T,​I> | The flatmap operation |

## Returns

Returns a GearsBuilder object with a new template type.

## Example

```java
GearsBuilder.CreateGearsBuilder(reader).flatMap(r->{
   	return r.getListVal();
}); 
```