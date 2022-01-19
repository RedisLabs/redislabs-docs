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

Moves records between the shards. The extracted data determines the new shard location for each record.

## Parameters

| Name | Type | Description |
|------|------|-------------|
| extractor | <nobr>gears.operations.ExtractorOperation<T></nobr> | Extracts a specific value from each record |

## Returns

Returns a GearsBuilder object with a new template type.

## Example

Repartition by value:

```java
GearsBuilder.CreateGearsBuilder(reader).
   	repartition(r->{
   		return r.getStringVal();
});
```