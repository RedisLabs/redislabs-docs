---
Title: Map
linkTitle: map
description: Maps records one-to-one.
weight: 50
alwaysopen: false
categories: ["Modules"]
---

```java
public <I extends java.io.Serializable> GearsBuilder<I> map​(
	gears.operations.MapOperation<T,​I> mapper)
```

Add a map operation to the pipe. It maps records one-to-one. 

## Parameters
 
Type parameters:

| Name | Description |
|------|-------------|
| I | The template type of the returned builder |

Function parameters:

| Name | Type | Description |
|------|------|-------------|
| mapper | gears.operations.MapOperation<T,​I> | The map operation |

## Returns

Returns a GearsBuilder object with a new template type. The returned object might be the same as the previous.

## Example

Map each record to its string value:

```java
GearsBuilder.CreateGearsBuilder(reader).
 		map(r->{
    		return r.getStringVal();
});
```
