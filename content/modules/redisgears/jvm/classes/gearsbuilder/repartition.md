---
Title: Repartition
linkTitle: repartition
description: Moves records between shards according to the extracted data.
weight: 50
alwaysopen: false
categories: ["Modules"]
---

```java
public GearsBuilder<T> repartition​(
	gears.operations.ExtractorOperation<T> extractor)
```

Add a repartition operation to the operation pipe. The repartition moves the records between the shards according to the extracted data.

## Parameters

| Name | Type | Description |
|------|------|-------------|
| extractor | gears.operations.ExtractorOperation<T> | The extractor operation |

## Returns

Returns a GearsBuilder object with a new template type. The return object might be the same as the previous.

## Example

Repartition by value:

```java
GearsBuilder.CreateGearsBuilder(reader).
   	repartition(r->{
   		return r.getStringVal();
});
```