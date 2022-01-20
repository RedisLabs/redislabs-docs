---
Title: LocalAccumulateBy
linkTitle: localAccumulateBy
description: Groups records and reduces each group to a single record per group locally on each shard.
weight: 50
alwaysopen: false
categories: ["Modules"]
---

```java
public <I extends java.io.Serializable> GearsBuilder<I> localAccumulateBy​(
	gears.operations.ExtractorOperation<T> extractor, 
	gears.operations.AccumulateByOperation<T,​I> accumulator)
```

The localAccumulateBy function is similar to [accumulateBy]({{<relref "/modules/redisgears/jvm/classes/gearsbuilder/accumulateby">}}), except it performs the operation locally on each shard without moving data between shards.

On each shard, iterates through the records in the pipe, groups them based on the provided extractor, and then reduces each group to a single record per group with the accumulator function.

The initial value of the accumulator is null.

## Parameters
 
Type parameters:

| Name | Description |
|------|-------------|
| I | The template type of the returned builder |

Function parameters:

| Name | Type | Description |
|------|------|-------------|
| extractor | ExtractorOperation<T> | Extracts a specific value from each record |
| accumulator | <nobr>AccumulateByOperation<T,​I></nobr> | A function with logic to update the accumulator value with each record |

## Returns

Returns a GearsBuilder object with a new template type.

## Example

```java
GearsBuilder.CreateGearsBuilder(reader).
   	localAccumulateBy(r->{
   		return r.getStringVal();
   	},(k, a, r)->{
   		Integer ret = null;
   		if(a == null) {
   			ret = 0;
   		}else {
   			ret = (Integer)a;
   		}
   		return ret + 1;
});
```
