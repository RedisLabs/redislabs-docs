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

Maps a single input record to one or more output records.

The FlatMap operation must return an [Iterable](https://docs.oracle.com/javase/8/docs/api/java/lang/Iterable.html) object. RedisGears 
splits the elements from the Iterable object and processes them as individual records.

## Parameters
 
Type parameters:

| Name | Description |
|------|-------------|
| I | The template type of the returned builder object |

Function parameters:

| Name | Type | Description |
|------|------|-------------|
| flatmapper | <nobr>FlatMapOperation<T,​I></nobr> | For each input record, returns one or more output records |

## Returns

Returns a GearsBuilder object with a new template type.

## Example

```java
GearsBuilder.CreateGearsBuilder(reader).flatMap(r->{
   	return r.getListVal();
}); 
```